/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, CalendarIcon, ClipboardDocumentIcon, DocumentTextIcon, StarIcon, ArrowLeftOnRectangleIcon, CogIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
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
              <CalendarIcon className="h-6 w-6" />
              <NavLink to="/absen" activeClassName="text-blue-300" className="ml-4">
                Absen
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <ClipboardDocumentIcon className="h-6 w-6" />
              <NavLink to="/kegiatan" activeClassName="text-blue-300" className="ml-4">
                Kegiatan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentTextIcon className="h-6 w-6" />
              <NavLink to="/laporan" activeClassName="text-blue-300" className="ml-4">
                Laporan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <StarIcon className="h-6 w-6" />
              <NavLink to="/penilaian" activeClassName="text-blue-300" className="ml-4">
                Penilaian
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentChartBarIcon className="h-6 w-6" />
              <NavLink to="/riwayat" activeClassName="text-blue-300" className="ml-4">
                Riwayat
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
        <li className="flex items-center p-2 hover:bg-gray-700">
          <ArrowLeftOnRectangleIcon className="h-6 w-6" />
          <NavLink to="/login" activeClassName="text-blue-300" className="ml-4">
            Logout
          </NavLink>
        </li>
      </div>
    </aside>
  );
};

export default Sidebar;
