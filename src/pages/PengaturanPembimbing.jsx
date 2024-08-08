import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardDocumentIcon, ArrowLeftOnRectangleIcon, CogIcon, CalendarIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <header className="bg-[#28205C] text-white p-2 flex items-center shadow-lg">
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

function Sidebar({ handleLogout }) {
  const role = localStorage.getItem('role');

  return (
    <aside className="fixed top-0 left-0 w-56 bg-[#013E7F] text-white h-screen overflow-y-auto flex flex-col shadow-lg">
      <div className="flex flex-col flex-1">
        <div className="p-4 flex flex-col items-center border-b border-gray-700">
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
            <UserIcon className="h-20 w-20 text-gray-800" />
          </div>
          <div className="text-center mb-4">
            <p className="text-lg font-bold capitalize">User Name</p>
            <p className="text-sm text-gray-400 capitalize">{role}</p>
          </div>
        </div>
        <nav className="mt-4 flex-1">
          <ul>
            <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
              <NavLink to="/dashboard/pembimbing" className="flex items-center text-white hover:text-blue-300">
                <HomeIcon className="h-6 w-6" />
                <span className="ml-4">Beranda</span>
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
              <NavLink to="/dashboard/data-peserta" className="flex items-center text-white hover:text-blue-300">
                <UserIcon className="h-6 w-6" />
                <span className="ml-4">Data Peserta</span>
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
              <NavLink to="/dashboard/lihat-laporan" className="flex items-center text-white hover:text-blue-300">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <span className="ml-4">Lihat Laporan</span>
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
              <NavLink to="/dashboard/penilaian-pembimbing" className="flex items-center text-white hover:text-blue-300">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <span className="ml-4">Penilaian</span>
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
              <NavLink to="/dashboard/lihat-penilaian" className="flex items-center text-white hover:text-blue-300">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <span className="ml-4">Lihat Penilaian</span>
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
              <NavLink to="/dashboard/pengaturan-pembimbing" className="flex items-center text-white hover:text-blue-300">
                <CogIcon className="h-6 w-6" />
                <span className="ml-4">Pengaturan</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <div className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300 cursor-pointer" onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          <span className="ml-4">Logout</span>
        </div>
      </div>
    </aside>
  );
}

export default function PengaturanPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika untuk mengubah password di sini
    console.log('Password diubah:', { currentPassword, newPassword, confirmPassword });
  };

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    // Redirect to login page
    setTimeout(() => {
      navigate('/login');
      window.location.reload(); // Force page reload
    }, 100);
  };

  return (
    <div className="flex h-screen font-poppins bg-gray-100">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex flex-col flex-1 ml-56">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-[#00448F]">Pengaturan</h1>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-lg text-gray-700">Password Saat Ini:</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00448F]"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-lg text-gray-700">Password Baru:</label>
                <input type="password" className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00448F]" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-lg text-gray-700">Konfirmasi Password Baru:</label>
                <input
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00448F]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="bg-[#00448F] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">Ubah Password</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
