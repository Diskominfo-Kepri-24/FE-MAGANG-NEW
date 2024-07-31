/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, CalendarIcon, ClipboardDocumentIcon, DocumentTextIcon, StarIcon, ArrowLeftOnRectangleIcon, CogIcon, DocumentChartBarIcon, UserIcon } from '@heroicons/react/24/outline';

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
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 100);
  };

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
        <div className="flex flex-col flex-1">
          <div className="p-4 flex flex-col items-center border-b border-gray-700">
            < div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
              <UserIcon className="h-20 w-20 text-gray-800" />
            </div>
            <div className="text-center mb-4">
              <p className="text-lg font-bold">User Name</p>
              <p className="text-sm text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <HomeIcon className="h-6 w-6" />
                <NavLink to="/dashboard/mahasiswa" activeclassname="text-blue-300" className="ml-4">
                  Beranda
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CalendarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/absen" activeclassname="text-blue-300" className="ml-4">
                  Absen
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <NavLink to="/dashboard/kegiatan" activeclassname="text-blue-300" className="ml-4">
                  Kegiatan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentTextIcon className="h-6 w-6" />
                <NavLink to="/dashboard/laporan" activeclassname="text-blue-300" className="ml-4">
                  Laporan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <StarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/penilaian" activeclassname="text-blue-300" className="ml-4">
                  Penilaian
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentChartBarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/riwayat" activeclassname="text-blue-300" className="ml-4">
                  Riwayat
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CogIcon className="h-6 w-6" />
                <NavLink to="/dashboard/pengaturan" activeclassname="text-blue-300" className="ml-4">
                  Pengaturan
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="ml-4">Logout</span>
          </li>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-64">
        <header className="bg-gray-800 text-white p-4 flex items-center">
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="h-14 w-14 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">Portal Magang</h2>
            <h3 className="text-lg font-bold" style={{ color: '#8bd9ff' }}>
              Dinas Komunikasi dan Informatika Provinsi Kepulauan Riau
            </h3>
          </div>
        </header>
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
