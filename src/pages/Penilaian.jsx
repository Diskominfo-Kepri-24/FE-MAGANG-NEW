/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';
export default function Penilaian() {
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');
  const grades = [
    { value: 'A', title: 'Tidak Memuaskan' },
    { value: 'B', title: 'Kurang Memuaskan' },
    { value: 'C', title: 'Cukup atau Memadai' },
    { value: 'D', title: 'Baik' },
    { value: 'E', title: 'Sangat Memuaskan atau Luar Biasa' }
  ];
  const name = localStorage.getItem("name");
  console.log (name)


  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-64">
       
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Penilaian</h1>
          <label className="block mb-2 text-lg">Pilih Grade:</label>
          <div className="star-rating flex mb-4">
            {grades.map((grade) => (
              <React.Fragment key={grade.value}>
                <input
                  type="radio"
                  id={`star${grade.value}`}
                  name="grade"
                  value={grade.value}
                  className="hidden"
                  onClick={() => setRating(grade.value)}
                />
                <label
                  htmlFor={`star${grade.value}`}
                  title={grade.title}
                  className={`cursor-pointer text-5xl ${grade.value <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                >
                  ★
                </label>
              </React.Fragment>
            ))}
          </div>
          <p className="mb-4 text-lg">{grades.find((g) => g.value === rating)?.title}</p>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md mb-4"
            placeholder="Kritik & Saran"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            Submit
          </button>
        </main>
      </div>
    </div>
  );
}
