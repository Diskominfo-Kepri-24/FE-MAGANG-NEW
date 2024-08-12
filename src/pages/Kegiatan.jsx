import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Kegiatan() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activity, setActivity] = useState('');
  const [activityList, setActivityList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const userId = localStorage.getItem("user_id");
  const name = localStorage.getItem("name");
  // console.log(activityList);
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
        // console.log(response.data);
        const filteredActivities = response.data.filter(activity => activity.user_id == userId);
        console.log(userId);
      setActivityList(filteredActivities);
      } catch (error) {
        console.error('Error fetching activities:', error.response ? error.response.data : error.message);
        alert('Gagal mendapatkan data kegiatan.');
      }
    };

    fetchActivityData();
  }, [apiUrl]);

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
      <div className="flex flex-col flex-1 ml-64">
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
                className="w-full h-20 p-2 border mb-4 rounded-md shadow-sm resize-none"
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

            <div className="w-full overflow-x-auto overflow-y-scroll max-h-64">
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
