import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Penilaian() {
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const [penilaianList, setPenilaianList] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState(null);

  const userName = localStorage.getItem('name');
  const userId = localStorage.getItem('user_id');

  const apiBaseUrl = import.meta.env.VITE_APP_LINK_API;
  const penilaianApiUrl = `${apiBaseUrl}/penilaian/magang`;
  const feedbackApiUrl = `${apiBaseUrl}/feedback`; // Gunakan URL dasar tanpa {id}

  const grades = [
    { value: 'E', title: 'Tidak Memuaskan', stars: 1 },
    { value: 'D', title: 'Kurang Memuaskan', stars: 2 },
    { value: 'C', title: 'Cukup', stars: 3 },
    { value: 'B', title: 'Baik', stars: 4 },
    { value: 'A', title: 'Sangat Memuaskan atau Luar Biasa', stars: 5 }
  ];

  const fetchPenilaianData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Token tidak ditemukan, silakan login ulang.");
      return;
    }

    try {
      const response = await axios.get(penilaianApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const filteredPenilaian = response.data.filter(
        (penilaian) => penilaian.user_id == userId
      );

      setPenilaianList(filteredPenilaian);
    } catch (error) {
      console.error(
        "Error fetching penilaian:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 403) {
        toast.error("Anda tidak memiliki izin untuk mengakses data penilaian.");
      } else {
        toast.error("Gagal mendapatkan data penilaian.");
      }
    }
  }, [penilaianApiUrl, userId]);

  const fetchFeedbackData = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Token tidak ditemukan, silakan login ulang.");
      return;
    }

    try {
      const response = await axios.get(feedbackApiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        const filteredFeedback = response.data.filter(
          (feedback) => feedback.user_id == userId
        );

        setFeedbackList(filteredFeedback);
      } else {
        console.error('No feedback data found.');
        toast.error("Tidak ada data feedback yang ditemukan.");
      }
    } catch (error) {
      console.error(
        "Error fetching feedback:",
        error.response ? error.response.data : error.message
      );
      if (error.response && error.response.status === 403) {
        toast.error("Anda tidak memiliki izin untuk mengakses data feedback.");
      } else {
        toast.error("Gagal mendapatkan data feedback. Periksa kembali koneksi dan API Anda.");
      }
    }
  }, [feedbackApiUrl, userId]);

  useEffect(() => {
    fetchPenilaianData();
    fetchFeedbackData();
  }, [fetchPenilaianData, fetchFeedbackData]);

  const handleSubmit = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Token tidak ditemukan, silakan login ulang.");
      return;
    }

    try {
      const feedbackData = {
        rating: parseInt(rating, 10),
        feedback: feedback,
      };

      if (editMode) {
        await axios.put(`${feedbackApiUrl}/${currentFeedbackId}`, feedbackData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Feedback berhasil diperbarui!');
      } else {
        await axios.post(feedbackApiUrl, feedbackData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success('Feedback berhasil dikirim!');
      }

      setRating('');
      setFeedback('');
      setEditMode(false);
      setCurrentFeedbackId(null);
      fetchFeedbackData();
    } catch (error) {
      console.error('Error submitting feedback:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 403) {
        toast.error("Anda tidak memiliki izin untuk mengirim feedback.");
      } else {
        toast.error('Gagal mengirim feedback. Silakan coba lagi.');
      }
    }
  };

  const handleEdit = (feedbackItem) => {
    setRating(feedbackItem.rating.toString());
    setFeedback(feedbackItem.feedback);
    setEditMode(true);
    setCurrentFeedbackId(feedbackItem.id);
  };

  const handleDelete = async (feedbackId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("Token tidak ditemukan, silakan login ulang.");
      return;
    }

    try {
      await axios.delete(`${feedbackApiUrl}/${feedbackId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast.success('Feedback berhasil dihapus!');
      setFeedbackList(feedbackList.filter(fb => fb.id !== feedbackId));
    } catch (error) {
      console.error('Error deleting feedback:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 403) {
        toast.error("Anda tidak memiliki izin untuk menghapus feedback.");
      } else {
        toast.error('Gagal menghapus feedback. Silakan coba lagi.');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-64 overflow-y-scroll max-h-screen">
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
                  value={grade.stars}
                  className="hidden"
                  checked={rating === grade.stars.toString()}
                  onChange={() => setRating(grade.stars.toString())}
                />
                <label
                  htmlFor={`star${grade.value}`}
                  className={`cursor-pointer text-5xl relative ${grade.stars <= parseInt(rating, 10) ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                  <span className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap opacity-0 transition-opacity duration-300 tooltip">
                    {grade.title}
                  </span>
                </label>
              </React.Fragment>
            ))}
          </div>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Kritik & Saran"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="flex space-x-4">
            <button
              className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              onClick={handleSubmit}
            >
              {editMode ? 'Update' : 'Submit'}
            </button>
            {editMode && (
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
                onClick={() => {
                  setEditMode(false);
                  setRating('');
                  setFeedback('');
                  setCurrentFeedbackId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <h2 className="text-xl font-bold mt-8">Kritik & Saran Anda</h2>
          <ul className="mt-4">
            {feedbackList.length > 0 ? (
              feedbackList.map((fb) => (
                <li key={fb.id} className="mb-4 p-4 border border-gray-300 rounded-md bg-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <p><strong>Rating:</strong> {fb.rating}</p>
                      <p><strong>Feedback:</strong> {fb.feedback}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="bg-yellow-500 text-white py-1 px-2 rounded-md hover:bg-yellow-600 transition"
                        onClick={() => handleEdit(fb)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition"
                        onClick={() => handleDelete(fb.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">Anda belum memberikan kritik & saran.</p>
            )}
          </ul>

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
      <ToastContainer />
    </div>
  );
}

