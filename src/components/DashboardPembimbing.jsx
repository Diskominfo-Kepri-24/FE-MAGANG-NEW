import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardDocumentIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function DashboardPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  // Simulasi data statistik (ini perlu diganti dengan data nyata dari backend)
  const [stats, setStats] = useState({
    pesertaPerKampus: [
      { kampus: 'Universitas A', jumlah: 50 },
      { kampus: 'Universitas B', jumlah: 30 },
      { kampus: 'Universitas C', jumlah: 20 },
    ],
  });

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 100);
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
                <NavLink to="/dashboard/pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-4">Beranda</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/data-peserta" className="flex items-center text-white hover:text-blue-300">
                  <UserIcon className="h-6 w-6" />
                  <span className="ml-4">Data Peserta</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/lihat-laporan" className="flex items-center text-white hover:text-blue-300">
                  <ClipboardDocumentIcon className="h-6 w-6" />
                  <span className="ml-4">Lihat Laporan</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/penilaian-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <ClipboardDocumentIcon className="h-6 w-6" />
                  <span className="ml-4">Penilaian</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/lihat-penilaian" className="flex items-center text-white hover:text-blue-300">
                  <ClipboardDocumentIcon className="h-6 w-6" />
                  <span className="ml-4">Lihat Penilaian</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#03306C]">
                <NavLink to="/dashboard/pengaturan-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <CogIcon className="h-6 w-6" />
                  <span className="ml-4">Pengaturan</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <div className="flex items-center p-2 hover:bg-[#03306C] cursor-pointer" onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="ml-4">Logout</span>
          </div>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-56">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Selamat Datang di Dashboard Pembimbing</h1>
            <p className="text-lg text-gray-700 mb-4">Di sini Anda dapat mengelola data peserta, melihat laporan, dan melakukan penilaian.</p>
          </div>

          {/* Statistik Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Statistik Peserta</h2>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 text-center">Peserta per Kampus</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.pesertaPerKampus}>
                  <XAxis dataKey="kampus" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="jumlah" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
