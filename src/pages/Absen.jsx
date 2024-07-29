/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Absen() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [absenList, setAbsenList] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAbsen = (type) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedTime = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const dayOfWeek = now.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    if (isWeekend) {
      alert('Absensi hanya dapat dilakukan dari hari Senin hingga hari Jumat.');
      return;
    }

    const existingAbsenIndex = absenList.findIndex(absen => absen.tanggal === formattedDate);

    if ((type === 'masuk' && now.getHours() >= 7 && now.getHours() <= 9) ||
        (type === 'pulang' && now.getHours() >= 15 && now.getHours() <= 16)) {
      if (existingAbsenIndex !== -1) {
        if (absenList[existingAbsenIndex][type]) {
          alert(`Anda sudah melakukan absen ${type} hari ini.`);
        } else {
          // Update the existing absen entry
          const updatedAbsenList = [...absenList];
          updatedAbsenList[existingAbsenIndex][type] = formattedTime;
          setAbsenList(updatedAbsenList);
        }
      } else {
        // Add a new absen entry
        setAbsenList([...absenList, { tanggal: formattedDate, [type]: formattedTime, status: 'Menunggu' }]);
      }
    } else {
      alert('Absensi hanya dapat dilakukan pada jam yang ditentukan');
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
    <div>
      <h1 className="text-2xl font-bold mb-4">Absensi</h1>
      <p className="mb-4 text-lg font-medium">
        <span className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-gray-600" />
          {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <span className="flex items-center">
          <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
          {currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
      </p>
      <div className="mb-4">
        <button className="bg-blue-950 text-white py-2 px-4 mr-2 rounded hover:bg-blue-700 transition" onClick={() => handleAbsen('masuk')}>Absen Masuk</button>
        <button className="bg-blue-950 text-white py-2 px-4 rounded hover:bg-blue-700 transition" onClick={() => handleAbsen('pulang')}>Absen Pulang</button>
      </div>
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
          {absenList.map((absen, index) => (
            <tr key={index} className="bg-gray-100 hover:bg-gray-200">
              <td className="border px-4 py-2 text-center">{index + 1}</td>
              <td className="border px-4 py-2 text-center">{absen.tanggal}</td>
              <td className="border px-4 py-2 text-center">{absen.masuk || '-'}</td>
              <td className="border px-4 py-2 text-center">{absen.pulang || '-'}</td>
              <td className={`border px-4 py-2 text-center ${getStatusBackgroundColor(absen.status)}`}>{absen.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
