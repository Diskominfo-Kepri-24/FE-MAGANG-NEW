import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, UserIcon, ClipboardDocumentIcon, ArrowLeftOnRectangleIcon, CogIcon, CalendarIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const BASE_API_URL = 'http://127.0.0.1:8000/api/v1';

function Navbar() {
  return (
    <header className="bg-[#28205C] text-white p-2 flex items-center shadow-lg">
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

export default function LihatAbsen() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('access_token');
  const [absenList, setAbsenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const fetchAbsenList = useCallback(async () => {
    console.log('Access Token:', token); // Debugging token
    try {
      const response = await axios.get(`${BASE_API_URL}/absen`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Daftar Absen:', response.data.user); // Debugging data
      setAbsenList(response.data.user);
    } catch (error) {
      console.error('Kesalahan saat mengambil daftar absen:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchAbsenList();
  }, [fetchAbsenList]);

  const handleStatusChange = (index, newStatus) => {
    const updatedAbsenList = [...absenList];
    updatedAbsenList[index].status = newStatus;
    setAbsenList(updatedAbsenList);
  };

  const handleLogout = () => {
    fetch(`${BASE_API_URL}/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('role');
          setTimeout(() => {
            navigate('/login');
            window.location.reload();
          }, 100);
        } else {
          console.error('Logout gagal');
        }
      })
      .catch((error) => {
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
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please check your token');
          }
          throw new Error('Error confirming activity');
        }

        const data = await response.json();
        setAbsenList(absenList.map((absen) => (absen.id === id ? data : absen)));
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
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please check your token');
          }
          throw new Error('Error rejecting activity');
        }

        const data = await response.json();
        setAbsenList(absenList.map((absen) => (absen.id === id ? data : absen)));
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

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = absenList.slice(offset, offset + itemsPerPage);

  return (
    <div className="flex h-screen font-poppins bg-gray-100">
      <aside className="fixed top-0 left-0 w-56 bg-[#013E7F] text-white h-screen overflow-y-auto flex flex-col shadow-lg">
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
              <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
                <NavLink to="/dashboard/pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <HomeIcon className="h-6 w-6" />
                  <span className="ml-4">Beranda</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
                <NavLink to="/dashboard/data-peserta" className="flex items-center text-white hover:text-blue-300">
                  <UserIcon className="h-6 w-6" />
                  <span className="ml-4">Data Peserta</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
                <NavLink to="/dashboard/lihat-absen" className="flex items-center text-white hover:text-blue-300">
                  <CalendarIcon className="h-6 w-6" />
                  <span className="ml-4">Lihat Presensi</span>
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300">
                <NavLink to="/dashboard/pengaturan-pembimbing" className="flex items-center text-white hover:text-blue-300">
                  <CogIcon className="h-6 w-6" />
                  <span className="ml-4">Pengaturan</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <div className="flex items-center p-2 hover:bg-[#00448F] rounded transition duration-300 cursor-pointer" onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="ml-4">Logout</span>
          </div>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-56">
        <Navbar />
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-[#00448F]">Lihat Absensi dan Catatan Kegiatan</h1>
            <div className="mb-4 flex justify-between items-center">
              <input type="text" className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#00448F]" placeholder="Cari Nama" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
              <thead className="bg-[#00448F] text-white">
                <tr>
                  <th className="py-3 px-4 border">No</th>
                  <th className="py-3 px-4 border">Nama</th>
                  <th className="py-3 px-4 border">Tanggal</th>
                  <th className="py-3 px-4 border">Jam Masuk</th>
                  <th className="py-3 px-4 border">Jam Pulang</th>
                  <th className="py-3 px-4 border">Status</th>
                  <th className="py-3 px-4 border">Catatan Kegiatan</th>
                  <th className="py-3 px-4 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((absen, index) => (
                  <tr key={absen.id} className="hover:bg-gray-100 transition duration-300">
                    <td className="py-3 px-4 border">{offset + index + 1}</td>
                    <td className="py-3 px-4 border">{absen.name}</td>
                    <td className="py-3 px-4 border">{absen.tanggal}</td>
                    <td className="py-3 px-4 border">{absen.jam_masuk || '-'}</td>
                    <td className="py-3 px-4 border">{absen.jam_pulang || '-'}</td>
                    <td className={`py-3 px-4 border ${getStatusBackgroundColor(absen.status)}`}>{absen.status}</td>
                    <td className="py-3 px-4 border">{absen.catatan || 'Tidak ada catatan'}</td>
                    <td className="py-3 px-4 border">
                      <div className="flex space-x-2">
                        <button className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300" onClick={() => handleConfirm(absen.id)}>
                          Konfirmasi
                        </button>
                        <button className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-300" onClick={() => handleReject(absen.id)}>
                          Ditolak
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-center">
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(absenList.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                pageClassName="inline-block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 rounded-md"
                activeLinkClassName="bg-[#00448F] text-white"
                previousClassName="inline-block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 rounded-md"
                nextClassName="inline-block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 rounded-md"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
