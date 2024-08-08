/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ArrowLeftOnRectangleIcon, CogIcon, StarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <header className="bg-gray-800 text-white p-4 flex items-center">
      <img
        src="/src/assets/logo.png"
        alt="Logo"
        className="h-12 w-12 rounded-full border-2 border-white"
      />
      <div className="ml-4">
        <h2 className="text-lg font-bold">Portal Magang</h2>
        <h3 className="text-sm font-bold text-blue-300">
          Dinas Komunikasi dan Informatika Provinsi Kepulauan Riau
        </h3>
      </div>
    </header>
  );
}

export default function PengaturanPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to change password here
    console.log('Password changed:', { currentPassword, newPassword, confirmPassword });
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 100);
  };

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 w-52 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
        <div className="p-4 flex flex-col items-center border-b border-gray-700">
          <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mb-2">
            <UserIcon className="h-16 w-16 text-gray-800" />
          </div>
          <div className="text-center mb-2">
            <p className="text-xs font-bold capitalize">{name}</p>
            <p className="text-xs text-gray-400 capitalize">{role}</p>
          </div>
        </div>
        <nav className="mt-4 flex-1">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <HomeIcon className="h-5 w-5" />
              <NavLink to="/dashboard/pembimbing" activeclassname="text-blue-300" className="ml-3 text-sm">
                Beranda
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <UserIcon className="h-5 w-5" />
              <NavLink to="/dashboard/data-peserta" activeclassname="text-blue-300" className="ml-3 text-sm">
                Data Peserta
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentTextIcon className="h-5 w-5" />
                <NavLink to="/dashboard/laporan-pembimbing" activeclassname="text-blue-300" className="ml-3 text-sm">
                  Data Laporan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <StarIcon className="h-5 w-5" />
                <NavLink to="/dashboard/penilaian-pembimbing" activeclassname="text-blue-300" className="ml-3 text-sm">
                  Penilaian
                </NavLink>
              </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <CogIcon className="h-5 w-5" />
              <NavLink to="/dashboard/pengaturan-pembimbing" activeclassname="text-blue-300" className="ml-3 text-sm">
                Pengaturan
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span className="ml-3 text-sm">Logout</span>
          </li>
        </div>
      </aside>

      <div className="flex-1 ml-52 bg-gray-100">
        <Navbar />
        <main className="p-4">
          <h1 className="text-xl font-semibold mb-4 text-blue-800">Pengaturan</h1>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-3">
              <label className="block mb-1 text-md font-medium">Password Saat Ini:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-md font-medium">Password Baru:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-md font-medium">Konfirmasi Password Baru:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="bg-blue-950 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition">
              Ubah Password
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
