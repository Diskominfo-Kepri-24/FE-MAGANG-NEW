/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  StarIcon,
  ArrowLeftOnRectangleIcon,
  CogIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

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

export default function LihatAbsen() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [absenList, setAbsenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAbsenList = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/absen', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.user);
        setAbsenList(response.data.user);
      } catch (error) {
        console.error('Error fetching absen list:', error);
      }
    };

    fetchAbsenList();
  }, []);



  const handleStatusChange = (index, newStatus) => {
    const updatedAbsenList = [...absenList];
    updatedAbsenList[index].status = newStatus;
    setAbsenList(updatedAbsenList);
  };

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
                <HomeIcon className="h-6 w-6" />
                <NavLink to="/dashboard/pembimbing" activeclassname="text-blue-300" className="ml-4">
                  Beranda
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <UserIcon className="h-6 w-6" />
                <NavLink to="/dashboard/data-peserta" activeclassname="text-blue-300" className="ml-4">
                  Data Peserta
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
                <DocumentTextIcon className="h-6 w-6" />
                <NavLink to="/dashboard/laporan-pembimbing" activeclassname="text-blue-300" className="ml-4">
                  Data Laporan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <StarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/penilaian-pembimbing" activeclassname="text-blue-300" className="ml-4">
                  Penilaian
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
          <li className="flex items-center p-2 hover:bg-gray-700">
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <NavLink to="/login" activeclassname="text-blue-300" className="ml-4" onClick={handleLogout}>
              Logout
            </NavLink>
          </li>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-64">
        <Navbar />
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">Lihat Absensi</h1>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Cari Nama"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">Tanggal</th>
                <th className="py-2 px-4 border">Jam Masuk</th>
                <th className="py-2 px-4 border">Jam Pulang</th>
                <th className="py-2 px-4 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {absenList.map((absen, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{absen.name}</td>
                  <td className="py-2 px-4 border">{absen.tanggal}</td>
                  <td className="py-2 px-4 border">{absen.jam_masuk || '-'}</td>
                  <td className="py-2 px-4 border">{absen.jam_pulang || '-'}</td>
                  <td className="py-2 px-4 border">
                    
                    <div className="flex space-x-2 mt-2">
                      <button
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700 transition"
                        onClick={() => handleStatusChange(index, 'Dikonfirmasi')}
                      >
                        Konfirmasi
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                        onClick={() => handleStatusChange(index, 'Ditolak')}
                      >
                        Ditolak
                      </button>
                    </div>
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
