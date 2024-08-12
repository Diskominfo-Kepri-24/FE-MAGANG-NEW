import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export default function Absen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [absenList, setAbsenList] = useState([]);
  const [data, setData] = useState([]);

  const token = localStorage.getItem("access_token");

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
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data.user;

        const result = userData.map(item => ({
          tanggal: item.tanggal,
          jam_masuk: item.jam_masuk,
          jam_pulang: item.jam_pulang,
          status: item.status,
          hari: item.hari,
        }));

        setData(result);
        setAbsenList(result); // Simpan data di state absenList juga
      } catch (error) {
        toast.error('Gagal mengambil data. Silakan coba lagi.');
      }
    }

    fetchData();
  }, [token]);

  const handleAbsen = async (type) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const formattedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\./g, ':');

    const dayOfWeek = now.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
        alert('Absensi hanya dapat dilakukan dari hari Senin hingga hari Jumat.');
        return;
    }

    const existingAbsenIndex = absenList.findIndex(absen => absen.tanggal === formattedDate);

    if (existingAbsenIndex !== -1) {
      const existingAbsen = absenList[existingAbsenIndex];

      // Cek apakah user sudah absen pada hari yang sama
    if (type === 'masuk' && existingAbsen.jam_masuk) {
      toast.warning('Anda sudah melakukan absen masuk hari ini.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      return;
    } else if (type === 'pulang' && existingAbsen.jam_pulang) {
      toast.warning('Anda sudah melakukan absen pulang hari ini.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      return;
    }

      // Update entry pada tanggal yang sama
      const updatedAbsen = {
        ...existingAbsen,
        [type === 'masuk' ? 'jam_masuk' : 'jam_pulang']: formattedTime,
      };

      const updatedAbsenList = [...absenList];
      updatedAbsenList[existingAbsenIndex] = updatedAbsen;
      setAbsenList(updatedAbsenList);
      setData(updatedAbsenList); // Update juga pada state data

    } else {
      // Buat entry baru jika belum ada absen pada tanggal tersebut
      const newAbsen = { tanggal: formattedDate, jam_masuk: type === 'masuk' ? formattedTime : '', jam_pulang: type === 'pulang' ? formattedTime : '', status: 'Menunggu' };
      const newAbsenList = [...absenList, newAbsen];
      setAbsenList(newAbsenList);
      setData(newAbsenList); // Update juga pada state data
    }

    const data = {
      tanggal: formattedDate,
      ...(type === 'masuk' ? { jam_masuk: formattedTime } : { jam_pulang: formattedTime }),
    };

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/v1/absen/jam-${type}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('Absensi berhasil dilakukan.');
      } else {
        toast.error('Gagal melakukan absensi. Silakan coba lagi.');
      }
    } catch (error) {
      console.error('Error submitting absen:', error);
      toast.error('Terjadi kesalahan saat mengirim data absen. Silakan coba lagi.');
    }
  };

  console.log(absenList);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-64">
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
      hari: PropTypes.string.isRequired,
    })
  ).isRequired,
};
