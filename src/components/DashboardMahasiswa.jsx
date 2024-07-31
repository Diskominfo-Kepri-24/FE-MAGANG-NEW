/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, CalendarIcon, ClipboardDocumentIcon, DocumentTextIcon, StarIcon, ArrowLeftOnRectangleIcon, CogIcon, DocumentChartBarIcon, UserIcon } from '@heroicons/react/24/outline';

export default function DashboardMahasiswa() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
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
            < div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
              <UserIcon className="h-20 w-20 text-gray-800" />
            </div>
            <div className="text-center mb-4">
              <p className="text-lg font-bold capitalize">User Name</p>
              <p className="text-sm text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/mahasiswa" className="flex items-center text-white hover:text-blue-300">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-4">Beranda</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/absen" className="flex items-center text-white hover:text-blue-300">
                  <CalendarIcon className="h-6 w-6" />
                  <span className="ml-4">Absen</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/kegiatan" className="flex items-center text-white hover:text-blue-300">
                  <ClipboardDocumentIcon className="h-6 w-6" />
                  <span className="ml-4">Kegiatan</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/laporan" className="flex items-center text-white hover:text-blue-300">
                  <DocumentTextIcon className="h-6 w-6" />
                  <span className="ml-4">Laporan</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/penilaian" className="flex items-center text-white hover:text-blue-300">
                  <StarIcon className="h-6 w-6" />
                  <span className="ml-4">Penilaian</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/riwayat" className="flex items-center text-white hover:text-blue-300">
                  <DocumentChartBarIcon className="h-6 w-6" />
                  <span className="ml-4">Riwayat</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/pengaturan" className="flex items-center text-white hover:text-blue-300">
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
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Selamat Datang di Dashboard Mahasiswa</h1>
            <p className="text-lg text-gray-700 mb-4">
              Di sini Anda dapat mengelola kegiatan harian Anda, memeriksa kehadiran, mengirim laporan, dan banyak lagi.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <NavLink to="/dashboard/laporan" className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700 transition">
                <h3 className="text-lg font-semibold mb-2">Kirim Laporan</h3>
                <p className="text-sm">Kirim laporan Anda dengan cepat dari sini.</p>
              </NavLink>
              <NavLink to="/dashboard/riwayat" className="bg-yellow-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-yellow-700 transition">
                <h3 className="text-lg font-semibold mb-2">Lihat Kehadiran</h3>
                <p className="text-sm">Periksa catatan kehadiran Anda.</p>
              </NavLink>
              <NavLink to="/dashboard/umpan-balik" className="bg-red-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-red-700 transition">
                <h3 className="text-lg font-semibold mb-2">Lihat Umpan Balik</h3>
                <p className="text-sm">Tinjau umpan balik yang telah Anda terima.</p>
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
