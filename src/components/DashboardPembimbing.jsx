/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ArrowLeftOnRectangleIcon, CogIcon, StarIcon, DocumentTextIcon} from '@heroicons/react/24/outline';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';

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
        <h3 className="text-sm font-bold" style={{ color: '#8bd9ff' }}>
          Dinas Komunikasi dan Informatika Provinsi Kepulauan Riau
        </h3>
      </div>
    </header>
  );
}

export default function DashboardPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 100);
  };

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { name: 'SMKN 1 Tanjungpinang', jumlah: 12 },
        { name: 'STTI', jumlah: 19 },
        { name: 'SMKN 4 Tanjungpinang', jumlah: 13 },
        { name: 'UMRAH', jumlah: 15 },
        { name: 'STIE', jumlah: 8 },
      ];
      setChartData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 w-52 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
        <div className="flex flex-col flex-1">
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
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <li className="flex items-center p-2 hover:bg-gray-700">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <NavLink to="/login" activeclassname="text-blue-300" className="ml-3 text-sm" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-52">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Selamat Datang di Dashboard Pembimbing</h1>
            <p className="text-lg text-gray-700 mb-4">
              Di sini Anda dapat mengelola data peserta, melihat laporan, dan melakukan penilaian.
            </p>
          </div>
          {/* Statistik Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Statistik Peserta</h2>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 text-center">Peserta per Kampus</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
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
