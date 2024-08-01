/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  StarIcon,
  ArrowLeftOnRectangleIcon,
  CogIcon,
  CalendarIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

export default function KegiatanPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [activities, setActivities] = useState([]);
  const apiUrl = process.env.VITE_APP_LINK_API + '/kegiatan';

  useEffect(() => {
    axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error fetching activities', error);
      });
  }, [apiUrl]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 100);
  };

  const handleConfirm = (id) => {
    axios.post(`${apiUrl}/${id}/confirm`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        setActivities(activities.map(activity => activity.id === id ? response.data : activity));
      })
      .catch(error => {
        console.error('Error confirming activity', error);
      });
  };

  const handleReject = (id) => {
    axios.post(`${apiUrl}/${id}/reject`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
      .then(response => {
        setActivities(activities.map(activity => activity.id === id ? response.data : activity));
      })
      .catch(error => {
        console.error('Error rejecting activity', error);
      });
  };

  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'Menunggu':
        return 'bg-yellow-200 text-yellow-800';
      case 'Dikonfirmasi':
        return 'bg-green-200 text-green-800';
      case 'Ditolak':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
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
              <li className="flex items-center p-2 hover:bg-gray-700">
                <HomeIcon className="h-6 w-6" />
                <NavLink
                  to="/dashboard/mahasiswa"
                  className={({ isActive }) => `ml-4 ${isActive ? 'text-blue-300' : 'text-white'}`}
                >
                  Beranda
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CalendarIcon className="h-6 w-6" />
                <NavLink
                  to="/dashboard/absen"
                  className={({ isActive }) => `ml-4 ${isActive ? 'text-blue-300' : 'text-white'}`}
                >
                  Absen
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <NavLink
                  to="/dashboard/kegiatan"
                  className={({ isActive }) => `ml-4 ${isActive ? 'text-blue-300' : 'text-white'}`}
                >
                  Kegiatan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentTextIcon className="h-6 w-6" />
                <NavLink
                  to="/dashboard/laporan"
                  className={({ isActive }) => `ml-4 ${isActive ? 'text-blue-300' : 'text-white'}`}
                >
                  Laporan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <StarIcon className="h-6 w-6" />
                <NavLink
                  to="/dashboard/penilaian"
                  className={({ isActive }) => `ml-4 ${isActive ? 'text-blue-300' : 'text-white'}`}
                >
                  Penilaian
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentChartBarIcon className="h-6 w-6" />
                <NavLink
                  to="/dashboard/riwayat"
                  className={({ isActive }) => `ml-4 ${isActive ? 'text-blue-300' : 'text-white'}`}
                >
                  Riwayat
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CogIcon className="h-6 w-6" />
                <NavLink
                  to="/dashboard/pengaturan"
                  className={({ isActive }) => `ml-4 ${isActive ? 'text-blue-300' : 'text-white'}`}
                >
                  Pengaturan
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <div
            className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
            onClick={handleLogout}
          >
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="ml-4">Logout</span>
          </div>
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
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Daftar Kegiatan</h1>
          <table className="mt-4 w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Tanggal</th>
                <th className="border px-4 py-2">Catatan Kegiatan</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id} className="bg-gray-100 hover:bg-gray-200">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{activity.tanggal}</td>
                  <td className="border px-4 py-2">{activity.catatan}</td>
                  <td className={`border px-4 py-2 text-center ${getStatusBackgroundColor(activity.status)}`}>{activity.status}</td>
                  <td className="border px-4 py-2 text-center">
                    <button onClick={() => handleConfirm(activity.id)} className="bg-green-500 text-white py-1 px-2 rounded mr-2">Konfirmasi</button>
                    <button onClick={() => handleReject(activity.id)} className="bg-red-500 text-white py-1 px-2 rounded">Tolak</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
