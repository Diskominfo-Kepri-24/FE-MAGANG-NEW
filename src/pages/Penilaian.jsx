import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Penilaian() {
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const [penilaianList, setPenilaianList] = useState([]);
  const userName = localStorage.getItem('name'); // Get the user's name from localStorage
  const userId = localStorage.getItem('user_id'); // Get the user's ID from localStorage

  const apiUrl = `${import.meta.env.VITE_APP_LINK_API}/penilaian/magang`;

  const grades = [
    { value: 'E', title: 'Tidak Memuaskan', stars: 1 },
    { value: 'D', title: 'Kurang Memuaskan', stars: 2 },
    { value: 'C', title: 'Cukup', stars: 3 },
    { value: 'B', title: 'Baik', stars: 4 },
    { value: 'A', title: 'Sangat Memuaskan atau Luar Biasa', stars: 5 }
  ];

  useEffect(() => {
    const fetchPenilaianData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Memfilter penilaian berdasarkan userId
        const filteredPenilaian = response.data.filter(
          (penilaian) => penilaian.user_id == userId
        );
        console.log("User ID:", userId);
        console.log("Filtered Penilaian:", filteredPenilaian);

        setPenilaianList(filteredPenilaian);
      } catch (error) {
        console.error(
          "Error fetching penilaian:",
          error.response ? error.response.data : error.message
        );
        alert("Gagal mendapatkan data penilaian.");
      }
    };

    fetchPenilaianData();
  }, [apiUrl, userId]);

  const handleSubmit = () => {
    axios.post(`${apiUrl}/feedback`, {
      rating,
      feedback,
    })
    .then(() => {
      alert('Feedback submitted successfully!');
      setRating('');
      setFeedback('');
    })
    .catch(() => {
      alert('Error submitting feedback.');
    });
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Penilaian</h1>
          <label className="block mb-2 text-lg">Pilih Grade:</label>
          <div className="star-rating flex mb-4 relative">
            {grades.map((grade) => (
              <React.Fragment key={grade.value}>
                <input
                  type="radio"
                  id={`star${grade.value}`}
                  name="grade"
                  value={grade.value}
                  className="hidden"
                  checked={rating === grade.value}
                  onChange={() => setRating(grade.value)}
                />
                <label
                  htmlFor={`star${grade.value}`}
                  className={`cursor-pointer text-5xl relative ${grade.stars <= grades.find(g => g.value === rating)?.stars ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                  <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 transition-opacity duration-300 tooltip">
                    {grade.title}
                  </span>
                </label>
              </React.Fragment>
            ))}
          </div>
          <p className="mb-4 text-lg">
            {rating && `Anda telah memilih grade: ${grades.find(g => g.value === rating)?.title}`}
          </p>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Kritik & Saran"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button
            className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
          
          <h2 className="text-xl font-bold mt-8">Penilaian dari Pembimbing</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-md mt-4">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">Nilai</th>
                <th className="py-2 px-4 border">Grade</th>
              </tr>
            </thead>
            <tbody>
              {penilaianList.length > 0 ? (
                penilaianList.map((penilaian) => (
                  <tr key={penilaian.id} className="hover:bg-gray-200">
                    <td className="py-2 px-4 border">{userName}</td>
                    <td className="py-2 px-4 border">
                      {penilaian.nilai || 'Tidak ada nilai'}
                    </td>
                    <td className="py-2 px-4 border">
                      {penilaian.nilai === "Belum dinilai"
                        ? "Belum dinilai"
                        : penilaian.nilai > 90
                        ? "Amat Baik"
                        : penilaian.nilai > 80
                        ? "Baik"
                        : penilaian.nilai > 70
                        ? "Cukup"
                        : penilaian.nilai > 60
                        ? "Sedang"
                        : "Kurang"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center text-gray-500">Tidak ada data penilaian.</td>
                </tr>
              )}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}