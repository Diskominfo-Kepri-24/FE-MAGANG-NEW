/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardDocumentIcon, DocumentTextIcon, StarIcon, ArrowLeftOnRectangleIcon, CogIcon } from '@heroicons/react/24/outline';

export default function DashboardMahasiswa() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
      <div className="flex flex-col flex-1">
        <div className="p-4 flex flex-col items-center border-b border-gray-700">
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
            <img src="/src/assets/user-logo.jpg" alt="User Logo" className="h-20 w-20 rounded-full" />
          </div>
          <div className="text-center mb-4">
            <p className="text-lg font-bold">User Name</p>
            <p className="text-sm text-gray-400">User Role</p>
          </div>
        </div>
        <nav className="mt-4 flex-1">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <HomeIcon className="h-6 w-6" />
              <NavLink to="/beranda" activeClassName="text-blue-300" className="ml-4">
                Beranda
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <UserIcon className="h-6 w-6" />
              <NavLink to="/data-peserta" activeClassName="text-blue-300" className="ml-4">
                Data Peserta
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <ClipboardDocumentIcon className="h-6 w-6" />
              <NavLink to="/lihat-absen" activeClassName="text-blue-300" className="ml-4">
                Lihat Absen dan Catatan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentTextIcon className="h-6 w-6" />
              <NavLink to="/laporan-pembimbing" activeClassName="text-blue-300" className="ml-4">
                Data Laporan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <StarIcon className="h-6 w-6" />
              <NavLink to="/penilaian-pembimbing" activeClassName="text-blue-300" className="ml-4">
                Penilaian
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <CogIcon className="h-6 w-6" />
              <NavLink to="/pengaturan" activeClassName="text-blue-300" className="ml-4">
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
  );
}
