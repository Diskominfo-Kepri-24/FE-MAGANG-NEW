import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
  DocumentTextIcon,
  StarIcon,
  ArrowLeftOnRectangleIcon,
  CogIcon,
  DocumentChartBarIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify'; 
export default function Absen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [absenList, setAbsenList] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("access_token");
  const name = localStorage.getItem("name");
  console.log (name)


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_LINK_API}/absen/magang`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const userData = response.data.user;

        const result = userData.map(item => ({
          tanggal: item.tanggal,
          jam_masuk: item.jam_masuk,
          jam_pulang: item.jam_pulang,
          status: item.status,
          hari: item.hari
        }));

        setData(result); // Simpan data di state
      } catch (error) {
        toast.error('Gagal mengambil data. Silakan coba lagi.');
      }
    }

    fetchData();
  }, [token]);

  const handleLogout = () => {
    fetch('/api/v1/logout', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          // Hapus data dari localStorage setelah logout berhasil
          localStorage.removeItem("access_token");
          localStorage.removeItem("role");
          localStorage.removeItem("user_id");

          // Redirect user setelah logout
          setTimeout(() => {
            navigate("/login");
            window.location.reload();
          }, 100);
          toast.success('Berhasil logout.');
        } else {
          // Tangani error jika logout tidak berhasil
          console.error('Logout gagal');
          toast.error('Logout gagal.');
        }
      })
      .catch(error => {
        // Tangani error network atau lainnya
        console.error('Terjadi kesalahan:', error);
        toast.error('Terjadi kesalahan saat logout.');
      });
  };

  const handleAbsen = async (type) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const formattedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\./g, ':');
  
    const dayOfWeek = now.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  
    if (isWeekend) {
      toast.error('Absensi hanya dapat dilakukan dari hari Senin hingga hari Jumat.');
      return;
    }
  
    const existingAbsenIndex = absenList.findIndex(absen => absen.tanggal === formattedDate);
  
    if ((type === 'masuk' && now.getHours() >= 7 && now.getHours() <= 8) ||
        (type === 'pulang' && now.getHours() >= 15 && now.getHours() < 16)) {
      if (existingAbsenIndex !== -1) {
        if (absenList[existingAbsenIndex][type === 'masuk' ? 'jam_masuk' : 'jam_pulang']) {
          alert(`Anda sudah melakukan absen ${type} hari ini.`);
        } else {
          // Update the existing absen entry
          const updatedAbsenList = [...absenList];
          updatedAbsenList[existingAbsenIndex][type === 'masuk' ? 'jam_masuk' : 'jam_pulang'] = formattedTime;
          setAbsenList(updatedAbsenList);
        }
      } else {
        // Add a new absen entry
        const newAbsen = { 
          tanggal: formattedDate, 
          [type === 'masuk' ? 'jam_masuk' : 'jam_pulang']: formattedTime 
        };
        setAbsenList([...absenList, newAbsen]);
      }
      
      const token = localStorage.getItem('access_token'); // Get token from local storage
      console.log('Token:', token); // Debug: check if token is retrieved properly
  
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/absen/jam-${type}`,
          {
            tanggal: formattedDate,
            [type === 'masuk' ? 'jam_masuk' : 'jam_pulang']: formattedTime
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success('Absen berhasil dikirim.');
        setTimeout(() => {
         
          window.location.reload();
        }, 3000);
        console.log('Response Data:', response.data); 
        // Debug: check response data
      } catch (error) {
        console.error('Error submitting absen:', error.response ? error.response.data : error.message);
        toast.error('Terjadi kesalahan saat mengirim data absen. Silakan coba lagi.');

      }
    } else {
      toast.error('Absensi hanya dapat dilakukan pada jam yang ditentukan');
    }
  };

  console.log(absenList)

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 w-52 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
        <div className="flex flex-col flex-1">
          <div className="p-4 flex flex-col items-center border-b border-gray-700">
            <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
              <UserIcon className="h-16 w-16 text-gray-800" />
            </div>
            <div className="text-center mb-4">
              <p className="text-xs font-bold capitalize">{name}</p>
              <p className="text-xs text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <HomeIcon className="h-5 w-5" />
                <NavLink to="/dashboard/magang" activeClassName="text-blue-300" className="ml-3 text-sm">
                  Beranda
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CalendarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/absen" activeClassName="text-blue-300" className="ml-4">
                  Absen
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <NavLink to="/dashboard/kegiatan" activeClassName="text-blue-300" className="ml-4">
                  Kegiatan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentTextIcon className="h-6 w-6" />
                <NavLink to="/dashboard/laporan" activeClassName="text-blue-300" className="ml-4">
                  Laporan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <StarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/penilaian" activeClassName="text-blue-300" className="ml-4">
                  Penilaian
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentChartBarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/riwayat" activeClassName="text-blue-300" className="ml-4">
                  Riwayat
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CogIcon className="h-6 w-6" />
                <NavLink to="/dashboard/pengaturan" activeClassName="text-blue-300" className="ml-4">
                  Pengaturan
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="ml-4">Logout</span>
          </li>
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

        <div className="flex flex-col flex-1 p-6 overflow-y-auto">
          <div className="text-center w-full max-w-screen-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">ABSENSI</h1>
            <div className="flex flex-col items-center mb-6">
              <div className="text-lg font-semibold mb-4">
                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-4xl font-bold mb-4">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAbsen('masuk')}
                >
                  Absen Masuk
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleAbsen('pulang')}
                >
                  Absen Pulang
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DataTable({ data }) {
  const getStatusBackgroundColor = (status) => {
    switch (status) {
      case 'menunggu':
        return 'bg-yellow-200 text-yellow-800';
      case 'dikonfirmasi':
        return 'bg-green-200 text-green-800';
      case 'ditolak':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  return (
    <table className="mt-4 w-full border border-gray-300 rounded-md">
      <thead className="bg-gray-700 text-white">
        <tr>
          <th className="border px-4 py-2">No</th>
          <th className="border px-4 py-2">Tanggal</th>
          <th className="border px-4 py-2">Jam Masuk</th>
          <th className="border px-4 py-2">Jam Pulang</th>
          <th className="border px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="bg-gray-100 hover:bg-gray-200">
            <td className="border px-4 py-2 text-center">{index + 1}</td>
            <td className="border px-4 py-2 text-center">{item.hari}, {item.tanggal}</td>
            <td className="border px-4 py-2 text-center">{item.jam_masuk}</td>
            <td className="border px-4 py-2 text-center">{item.jam_pulang}</td>
            <td className={`border p-2 ${getStatusBackgroundColor(item.status)}`}>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      tanggal: PropTypes.string.isRequired,
      jam_masuk: PropTypes.string,
      jam_pulang: PropTypes.string,
      status: PropTypes.string.isRequired,
      hari: PropTypes.string.isRequired
    })
  ).isRequired,
};
