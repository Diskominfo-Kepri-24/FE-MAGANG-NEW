/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  StarIcon,
  ArrowLeftOnRectangleIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

function Navbar() {
  return (
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
  );
}

export default function DashboardPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    // Redirect to login page
    setTimeout(() => {
      navigate("/login");
      window.location.reload(); // Force page reload
    }, 100);
  };

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
        <div className="flex flex-col flex-1">
          <div className="p-4 flex flex-col items-center border-b border-gray-700">
            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
              <img src="/src/assets/user-logo.jpg" alt="User Logo" className="h-20 w-20 rounded-full" />
            </div>
            <div className="text-center mb-4">
              <p className="text-lg font-bold">User Name</p>
              <p className="text-sm text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-4">Beranda</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/data-peserta" className="flex items-center text-white hover:text-blue-300">
                  <UserIcon className="h-6 w-6" />
                  <span className="ml-4">Data Peserta</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/laporan-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <ClipboardDocumentIcon className="h-6 w-6" />
                  <span className="ml-4">Lihat Absen dan Catatan</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/laporan-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <DocumentTextIcon className="h-6 w-6" />
                  <span className="ml-4">Data Laporan</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/penilaian-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <StarIcon className="h-6 w-6" />
                  <span className="ml-4">Penilaian</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/pengaturan-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <CogIcon className="h-6 w-6" />
                  <span className="ml-4">Pengaturan</span>
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
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Selamat Datang di Dashboard Pembimbing</h1>
            <p className="text-lg text-gray-700 mb-4">
              Di sini Anda dapat mengelola data peserta, melihat laporan, dan melakukan penilaian.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <NavLink to="/dashboard/laporan-pembimbing" className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700 transition">
                <h3 className="text-lg font-semibold mb-2">Lihat Laporan</h3>
                <p className="text-sm">Lihat dan kelola laporan yang ada.</p>
              </NavLink>
              <NavLink to="/dashboard/data-peserta" className="bg-yellow-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-yellow-700 transition">
                <h3 className="text-lg font-semibold mb-2">Kelola Data Peserta</h3>
                <p className="text-sm">Kelola dan lihat data peserta magang.</p>
              </NavLink>
              <NavLink to="/dashboard/penilaian-pembimbing" className="bg-red-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-red-700 transition">
                <h3 className="text-lg font-semibold mb-2">Penilaian</h3>
                <p className="text-sm">Akses dan kelola penilaian peserta.</p>
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
