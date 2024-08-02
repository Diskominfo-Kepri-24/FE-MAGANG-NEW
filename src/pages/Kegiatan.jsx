import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

export default function Kegiatan() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activity, setActivity] = useState('');
  const [activityList, setActivityList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("user_id");
  const apiUrl = `${import.meta.env.VITE_APP_LINK_API}/kegiatan`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchActivityData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setActivityList(response.data);
      } catch (error) {
        console.error('Error fetching activities:', error.response ? error.response.data : error.message);
        alert('Gagal mendapatkan data kegiatan.');
      }
    };

    fetchActivityData();
  }, [apiUrl]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 100);
  };

  const handleSubmit = async () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    if (isSubmitted) {
      alert('Catatan kegiatan untuk hari ini sudah disubmit.');
      return;
    }

    const newActivity = {
      user_id: userId,
      tanggal: formattedDate,
      catatan: activity,
      status: 'Menunggu'
    };

    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(apiUrl, newActivity, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setActivityList([...activityList, response.data]);
      setActivity('');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting activity', error.response ? error.response.data : error.message);
      alert('Gagal menambahkan kegiatan. Silakan coba lagi.');
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
                <HomeIcon className="h-6 w-6" />
                <NavLink to="/dashboard/mahasiswa" activeclassname="text-blue-300" className="ml-4">
                  Beranda
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CalendarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/absen" activeclassname="text-blue-300" className="ml-4">
                  Absen
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <NavLink to="/dashboard/kegiatan" activeclassname="text-blue-300" className="ml-4">
                  Kegiatan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentTextIcon className="h-6 w-6" />
                <NavLink to="/dashboard/laporan" activeclassname="text-blue-300" className="ml-4">
                  Laporan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <StarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/penilaian" activeclassname="text-blue-300" className="ml-4">
                  Penilaian
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentChartBarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/riwayat" activeclassname="text-blue-300" className="ml-4">
                  Riwayat
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
            <h1 className="text-2xl font-bold mb-6">KEGIATAN</h1>
            <div className="flex flex-col items-center mb-6">
              <div className="text-lg font-semibold mb-4">
                {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="text-4xl font-bold mb-4">
                {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <textarea
                className="w-full h-64 p-2 border mb-4 rounded-md shadow-sm"
                placeholder="Catatan kegiatan..."
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                disabled={isSubmitted}
              ></textarea>
              <button
                className={`bg-blue-950 text-white py-2 px-4 mb-4 rounded-md shadow-sm ${isSubmitted ? 'bg-gray-500 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={isSubmitted}
              >
                {isSubmitted ? 'Sudah Disubmit' : 'Submit'}
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-full border border-gray-300 rounded-md">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="border px-4 py-2">No</th>
                    <th className="border px-4 py-2">Tanggal</th>
                    <th className="border px-4 py-2">Catatan Kegiatan</th>
                    <th className="border px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activityList.map((activity, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 text-center">{index + 1}</td>
                      <td className="border p-2">{activity.tanggal}</td>
                      <td className="border p-2">{activity.catatan}</td>
                      <td className={`border p-2 ${getStatusBackgroundColor(activity.status)}`}>{activity.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
