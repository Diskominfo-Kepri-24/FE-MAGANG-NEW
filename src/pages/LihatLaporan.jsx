import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardDocumentIcon, CogIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

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

function Sidebar({ handleLogout }) {
  const role = localStorage.getItem('role');

  return (
    <aside className="fixed top-0 left-0 w-56 bg-[#013E7F] text-white h-screen overflow-y-auto flex flex-col">
      <div className="flex flex-col flex-1">
        <div className="p-4 flex flex-col items-center border-b border-gray-700">
          <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
            <UserIcon className="h-20 w-20 text-gray-800" />
          </div>
          <div className="text-center mb-4">
            <p className="text-lg font-bold capitalize">User Name</p>
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
  );
}

export default function LihatLaporan() {
  const navigate = useNavigate();
  const [laporan, setLaporan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch data laporan dari server
    const fetchLaporan = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/laporan', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLaporan(data.laporan);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchLaporan();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 100);
  };

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = laporan.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(laporan.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen font-poppins">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex flex-col flex-1 ml-56">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4 text-[#00448F]">Laporan Magang</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead className="bg-[#00448F] text-white">
                <tr>
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Nama</th>
                  <th className="py-2 px-4 border">Tanggal Laporan</th>
                  <th className="py-2 px-4 border">Isi Laporan</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="py-2 px-4 border text-center">{indexOfFirstItem + index + 1}</td>
                      <td className="py-2 px-4 border">{data.nama}</td>
                      <td className="py-2 px-4 border">{new Date(data.tanggalLaporan).toLocaleDateString('id-ID')}</td>
                      <td className="py-2 px-4 border">{data.isiLaporan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-2 px-4 border text-center">
                      Tidak ada laporan yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <nav className="flex justify-center mt-4">
              <ul className="inline-flex items-center -space-x-px">
                {pageNumbers.map((number) => (
                  <li key={number} className="px-2">
                    <button onClick={() => paginate(number)} className={`px-3 py-1 rounded-md border ${currentPage === number ? 'bg-[#00448F] text-white' : 'bg-white text-[#00448F] hover:bg-gray-200'}`}>
                      {number}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}
