/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
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
} from '@heroicons/react/24/outline';

const BASE_API_URL = 'http://127.0.0.1:8000/api/v1';

export default function KegiatanPembimbing() {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access_token");

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = `${BASE_API_URL}/kegiatan`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please check your token');
        }
        throw new Error('Error fetching activities');
      }

      const data = await response.json();
      setActivities(data); // Simpan data di state
    } catch (error) {
      console.error(error.message); // Menangani error jika ada
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    fetch(`${BASE_API_URL}/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("role");
          setTimeout(() => {
            navigate("/login");
            window.location.reload();
          }, 100);
        } else {
          console.error('Logout gagal');
        }
      })
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };

  const handleConfirm = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin mengkonfirmasi kegiatan ini?')) {
      try {
        const apiUrl = `${BASE_API_URL}/kegiatan/${id}/confirm`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please check your token');
          }
          throw new Error('Error confirming activity');
        }

        const data = await response.json();
        setActivities(activities.map(activity => activity.id === id ? data : activity));
      } catch (error) {
        console.error('Error confirming activity', error.message);
      }
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menolak kegiatan ini?')) {
      try {
        const apiUrl = `${BASE_API_URL}/kegiatan/${id}/reject`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please check your token');
          }
          throw new Error('Error rejecting activity');
        }

        const data = await response.json();
        setActivities(activities.map(activity => activity.id === id ? data : activity));
      } catch (error) {
        console.error('Error rejecting activity', error.message);
      }
    }
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
                  <CalendarIcon className="h-6 w-6" />
                  <span className="ml-4">Lihat Absen</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <NavLink to="/dashboard/kegiatan-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <ClipboardDocumentIcon className="h-6 w-6" />
                  <span className="ml-4">Lihat Catatan</span>
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
                    <button
                      onClick={() => handleConfirm(activity.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded mr-2 touchable"
                    >
                      Konfirmasi
                    </button>
                    <button
                      onClick={() => handleReject(activity.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded touchable"
                    >
                      Tolak
                    </button>
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
