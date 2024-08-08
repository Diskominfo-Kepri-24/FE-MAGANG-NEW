import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardDocumentIcon, CogIcon, ArrowLeftOnRectangleIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useReactToPrint } from 'react-to-print';

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
  );
}

export default function DataPeserta() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const [peserta, setPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const componentRef = useRef(); // Reference for printing

  useEffect(() => {
    // Fetch data peserta dari server
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/peserta', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPeserta(data.peserta);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const filteredPeserta = peserta.filter((data) => {
    const mulaiMagang = new Date(data.mulaiMagang);
    const akhirMagang = new Date(data.akhirMagang);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const matchesSearchTerm = data.nama.toLowerCase().includes(searchTerm.toLowerCase()) || data.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase());
    const isWithinDateRange = (!start || mulaiMagang >= start) && (!end || akhirMagang <= end);

    return matchesSearchTerm && isWithinDateRange;
  });

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPeserta.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPeserta.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    setTimeout(() => {
      navigate('/login');
      window.location.reload();
    }, 100);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const formatDate = (date) => {
    if (!date) return '';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="flex h-screen font-poppins">
      <Sidebar handleLogout={handleLogout} />
      <div className="flex flex-col flex-1 ml-56">
        <Navbar />
        <main className="flex-1 p-4 bg-gray-100 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-4 text-[#00448F]">Data Peserta</h1>
          <div className="mb-4 flex justify-between items-center">
            <input type="text" className="w-1/3 p-2 border rounded" placeholder="Cari Nama atau Asal Sekolah/Univ" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="flex space-x-2 items-center">
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Awal Periode Magang</label>
                <input type="date" className="p-2 border rounded" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600">Akhir Periode Magang</label>
                <input type="date" className="p-2 border rounded" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>
          </div>
          <button onClick={handlePrint} className="bg-[#00448F] text-white py-2 px-4 rounded hover:bg-[#003366] transition mb-4">
            Cetak Data
          </button>
          <div ref={componentRef} className="bg-white p-4 rounded-lg shadow-md">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead className="bg-[#00448F] text-white">
                <tr>
                  <th className="py-1 px-2 border">No</th>
                  <th className="py-1 px-2 border">Nama</th>
                  <th className="py-1 px-2 border">Periode Magang</th>
                  <th className="py-1 px-2 border">Asal Sekolah/Univ</th>
                  <th className="py-1 px-2 border">Presensi</th>
                  <th className="py-1 px-2 border">Catatan</th>
                  <th className="py-1 px-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((data, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="py-1 px-2 border text-center">{indexOfFirstItem + index + 1}</td>
                      <td className="py-1 px-2 border">{data.nama}</td>
                      <td className="py-1 px-2 border">
                        {formatDate(data.mulaiMagang)} / {formatDate(data.akhirMagang)}
                      </td>
                      <td className="py-1 px-2 border">{data.asalSekolah}</td>
                      <td className="py-1 px-2 border">{data.presensi || 'Belum ada'}</td>
                      <td className="py-1 px-2 border">{data.catatan || 'Belum ada'}</td>
                      <td className="py-1 px-2 border text-center">
                        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">Edit</button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600 transition">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-2 px-4 border text-center">
                      Tidak ada peserta yang ditemukan.
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
