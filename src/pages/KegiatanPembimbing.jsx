/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';


const BASE_API_URL = 'http://127.0.0.1:8000/api/v1';

export default function KegiatanPembimbing() {
  const [activities, setActivities] = useState([]);
  const token = localStorage.getItem("access_token");

  const fetchData = useCallback(async () => {
    try {
      const apiUrl = `${BASE_API_URL}/kegiatan`;
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized: Please check your token');
        }
        throw new Error('Error fetching activities');
      }

      const data = await response.json();
      setActivities(data); // Simpan data di state
    } catch (error) {
      console.error(error.message); // Menangani error jika ada
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  const handleConfirm = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin mengkonfirmasi kegiatan ini?')) {
      try {
        const apiUrl = `${BASE_API_URL}/kegiatan/${id}/confirm`;
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please check your token');
          }
          throw new Error('Error confirming activity');
        }

        const data = await response.json();
        setActivities(activities.map(activity => activity.id === id ? data : activity));
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
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Please check your token');
          }
          throw new Error('Error rejecting activity');
        }

        const data = await response.json();
        setActivities(activities.map(activity => activity.id === id ? data : activity));
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

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-64">
        
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Daftar Kegiatan</h1>
          <table className="mt-4 w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Tanggal</th>
                <th className="border px-4 py-2">Catatan Kegiatan</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id} className="bg-gray-100 hover:bg-gray-200">
                  <td className="border px-4 py-2 text-center">{index + 1}</td>
                  <td className="border px-4 py-2 text-center">{activity.tanggal}</td>
                  <td className="border px-4 py-2">{activity.catatan}</td>
                  <td className={`border px-4 py-2 text-center ${getStatusBackgroundColor(activity.status)}`}>{activity.status}</td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleConfirm(activity.id)}
                      className="bg-green-500 text-white py-2 px-4 rounded mr-2 touchable"
                    >
                      Konfirmasi
                    </button>
                    <button
                      onClick={() => handleReject(activity.id)}
                      className="bg-red-500 text-white py-2 px-4 rounded touchable"
                    >
                      Tolak
                    </button>
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
