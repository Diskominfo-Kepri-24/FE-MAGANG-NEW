import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  UserIcon,
  DocumentTextIcon,
  StarIcon,
  ArrowLeftOnRectangleIcon,
  CogIcon,
} from '@heroicons/react/24/outline';

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

export default function LaporanPembimbing() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const [laporanList, setLaporanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data laporan
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/laporan', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLaporanList(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const filteredLaporanList = Array.isArray(laporanList)
    ? laporanList.filter((laporan) =>
        laporan.nama.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
    // Redirect to login page
    setTimeout(() => {
      navigate("/login");
      window.location.reload(); // Force page reload
    }, 100);
  };

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
          <h1 className="text-2xl font-bold mb-4">Pengumpulan Laporan Peserta Magang</h1>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Cari Nama"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {filteredLaporanList.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Nama</th>
                  <th className="py-2 px-4 border">Periode Magang</th>
                  <th className="py-2 px-4 border">Asal Sekolah/Universitas</th>
                  <th className="py-2 px-4 border">Link Laporan</th>
                </tr>
              </thead>
              <tbody>
                {filteredLaporanList.map((laporan, index) => (
                  <tr key={index} className="hover:bg-gray-200">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{laporan.nama}</td>
                    <td className="py-2 px-4 border">{laporan.periode}</td>
                    <td className="py-2 px-4 border">{laporan.asalSekolah}</td>
                    <td className="py-2 px-4 border">
                      <a href={laporan.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">Lihat Laporan</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center mt-4">Tidak ada laporan yang tersedia.</p>
          )}
        </main>
      </div>
    </div>
  );
}
