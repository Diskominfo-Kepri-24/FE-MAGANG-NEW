/* eslint-disable-next-line no-unused-vars */
import React from 'react';

// Assuming you have a way to get the logged-in user's name, e.g., from a global state or context
const userName = "Nama Pengguna"; // Replace this with actual method to retrieve logged-in user's name

export default function Beranda() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-950">Beranda 2</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Selamat Datang, {userName}!</h2>
        <p className="text-md text-gray-500">Anda dapat melakukan absensi, mencatat kegiatan harian, dan melihat riwayat absen dan riwayat catatan kegiatan.</p>
      </div>
    </div>
  );
}
