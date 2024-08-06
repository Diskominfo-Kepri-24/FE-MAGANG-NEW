/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, CalendarIcon, ClipboardDocumentIcon, DocumentTextIcon, StarIcon, ArrowLeftOnRectangleIcon, CogIcon, DocumentChartBarIcon, UserIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <header className="bg-[#28205C] text-white p-2 flex items-center">
      <img src="/src/assets/logo.png" alt="Logo" className="h-10 w-10 rounded-full border-4 border-white" />
      <div className="ml-2">
        <h2 className="text-lg font-bold">Portal Pelayanan Magang</h2>
        <h3 className="text-md font-bold" style={{ color: '#8bd9ff' }}>
          Dinas Komunikasi dan Informatika Provinsi Kepulauan Riau
        </h3>
      </div>
    </header>
  );
}

export default function Laporan() {
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 100);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/laporan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ link }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Laporan submitted successfully:', result);
        // Optionally, navigate to another page or show a success message
      } else {
        const errorText = await response.text(); // Read the error message from the response
        console.error('Failed to submit laporan:', response.status, errorText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting laporan:', error);
      // Handle error
    }
  };

  return (
    <div className="flex h-screen font-poppins">
      <aside className="fixed top-0 left-0 w-56 bg-[#013E7F] text-white h-screen overflow-y-auto flex flex-col">
        <div className="flex flex-col flex-1">
          <div className="p-4 flex flex-col items-center border-b border-gray-700">
            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
              <UserIcon className="h-20 w-20 text-gray-800" />
            </div>
            <div className="text-center mb-4">
              <p className="text-lg font-bold">User Name</p>
              <p className="text-sm text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/magang" className="flex items-center text-white hover:text-blue-300">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-4">Beranda</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/absen" className="flex items-center text-white hover:text-blue-300">
                  <CalendarIcon className="h-6 w-6" />
                  <span className="ml-4">Absen</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/kegiatan" className="flex items-center text-white hover:text-blue-300">
                  <ClipboardDocumentIcon className="h-6 w-6" />
                  <span className="ml-4">Kegiatan</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/laporan" className="flex items-center text-white hover:text-blue-300">
                  <DocumentTextIcon className="h-6 w-6" />
                  <span className="ml-4">Laporan</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/penilaian" className="flex items-center text-white hover:text-blue-300">
                  <StarIcon className="h-6 w-6" />
                  <span className="ml-4">Penilaian</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/riwayat" className="flex items-center text-white hover:text-blue-300">
                  <DocumentChartBarIcon className="h-6 w-6" />
                  <span className="ml-4">Riwayat</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/pengaturan" className="flex items-center text-white hover:text-blue-300">
                  <CogIcon className="h-6 w-6" />
                  <span className="ml-4">Pengaturan</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <li className="flex items-center p-2 hover:bg-[#03306C] cursor-pointer" onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="ml-4">Logout</span>
          </li>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-56">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Laporan</h1>
          <input type="text" className="w-full p-2 border rounded-md mb-2" placeholder="Link Gdrive Laporan Magang" value={link} onChange={(e) => setLink(e.target.value)} />
          <button className="bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>
            Submit
          </button>
        </main>
      </div>
    </div>
  );
}
