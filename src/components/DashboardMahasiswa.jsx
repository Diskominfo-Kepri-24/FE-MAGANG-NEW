/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, CalendarIcon, ClipboardDocumentIcon, DocumentTextIcon, StarIcon, ArrowLeftOnRectangleIcon, CogIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

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
              <HomeIcon className="h-6 w-6" />
              <NavLink to="/beranda" activeclassname="text-blue-300" className="ml-4">
                Beranda
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <CalendarIcon className="h-6 w-6" />
              <NavLink to="/absen" activeclassname="text-blue-300" className="ml-4">
                Absen
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <ClipboardDocumentIcon className="h-6 w-6" />
              <NavLink to="/kegiatan" activeclassname="text-blue-300" className="ml-4">
                Kegiatan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentTextIcon className="h-6 w-6" />
              <NavLink to="/laporan" activeclassname="text-blue-300" className="ml-4">
                Laporan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <StarIcon className="h-6 w-6" />
              <NavLink to="/penilaian" activeclassname="text-blue-300" className="ml-4">
                Penilaian
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentChartBarIcon className="h-6 w-6" />
              <NavLink to="/riwayat" activeclassname="text-blue-300" className="ml-4">
                Riwayat
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <CogIcon className="h-6 w-6" />
              <NavLink to="/pengaturan" activeclassname="text-blue-300" className="ml-4">
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
        <main className="flex-1 p-4">
          {/* Main content goes here */}
        </main>
      </div>
    </div>
  );
}
