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

export default function PenilaianPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [penilaianList, setPenilaianList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data penilaian
    // Contoh fetch data dari API atau server
    // setPenilaianList(dataDariServer);
  }, []);

  const getDescription = (nilai) => {
    if (nilai > 90) {
      return 'Sangat Baik';
    } else if (nilai > 80) {
      return 'Baik';
    } else if (nilai > 70) {
      return 'Cukup';
    } else if (nilai > 60) {
      return 'Sedang';
    } else {
      return 'Kurang';
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(penilaianList[index].nilai);
  };

  const handleSave = (index) => {
    if (editValue >= 0 && editValue <= 100) {
      const updatedList = [...penilaianList];
      updatedList[index].nilai = editValue;
      setPenilaianList(updatedList);
      setEditingIndex(null);
    } else {
      alert('Nilai harus antara 0 dan 100');
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const filteredPenilaianList = penilaianList.filter((penilaian) =>
    penilaian.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <NavLink to="/dashboard/laporan-pembimbing" className="flex items-center text-white hover:text-blue-300">
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
                <NavLink to="/dashboard/pengaturan-pembimbing" activeclassname="text-blue-300" className="ml-4">
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
          <h1 className="text-2xl font-bold mb-4">Penilaian</h1>
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
                <th className="py-2 px-4 border">Nilai</th>
                <th className="py-2 px-4 border">Grade</th>
                <th className="py-2 px-4 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPenilaianList.map((penilaian, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{penilaian.nama}</td>
                  <td className="py-2 px-4 border">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(Math.max(0, Math.min(100, Number(e.target.value))))}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      penilaian.nilai
                    )}
                  </td>
                  <td className="py-2 px-4 border">{getDescription(penilaian.nilai)}</td>
                  <td className="py-2 px-4 border">
                    {editingIndex === index ? (
                      <div>
                        <button className="text-green-500 mr-2" onClick={() => handleSave(index)}>Save</button>
                        <button className="text-red-500" onClick={handleCancel}>Cancel</button>
                      </div>
                    ) : (
                      <button className="text-blue-500" onClick={() => handleEdit(index)}>Edit</button>
                    )}
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
