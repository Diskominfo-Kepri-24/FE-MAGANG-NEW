/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function Kegiatan() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activity, setActivity] = useState('');
  const [activityList, setActivityList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const existingActivity = activityList.find(activity => activity.tanggal === today);
    setIsSubmitted(!!existingActivity);
  }, [activityList]);

  const handleSubmit = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    if (isSubmitted) {
      alert('Catatan kegiatan untuk hari ini sudah disubmit.');
      return;
    }

    const newActivity = {
      tanggal: formattedDate,
      catatan: activity,
      status: 'Menunggu'
    };

    setActivityList([...activityList, newActivity]);
    setActivity('');
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Kegiatan Harian</h1>
      <p className="mb-4 text-lg font-medium">
        <span className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-gray-600" />
          {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </p>
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
      <table className="mt-4 w-full border border-gray-300 rounded-md">
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
            <tr key={index} className="bg-gray-100 hover:bg-gray-200">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{activity.tanggal}</td>
              <td className="border px-4 py-2">{activity.catatan}</td>
              <td className={`border px-4 py-2 text-center ${getStatusBackgroundColor(activity.status)}`}>{activity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
