/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';



export default function DashboardMahasiswa() {
  

  return (
    <div className="flex h-screen">
    
      <div className="flex flex-col flex-1 ml-52">
        
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Selamat Datang di Dashboard Mahasiswa</h1>
            <p className="text-lg text-gray-700 mb-4">
              Di sini Anda dapat mengelola kegiatan harian Anda, memeriksa kehadiran, mengirim laporan, dan banyak lagi.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <NavLink to="/dashboard/laporan" className="bg-blue-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-700 transition">
                <h3 className="text-lg font-semibold mb-2">Kirim Laporan</h3>
                <p className="text-sm">Kirim laporan Anda dengan cepat dari sini.</p>
              </NavLink>
              <NavLink to="/dashboard/riwayat" className="bg-yellow-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-yellow-700 transition">
                <h3 className="text-lg font-semibold mb-2">Lihat Kehadiran</h3>
                <p className="text-sm">Periksa catatan kehadiran Anda.</p>
              </NavLink>
              <NavLink to="/dashboard/umpan-balik" className="bg-red-600 text-white p-4 rounded-lg shadow-md text-center hover:bg-red-700 transition">
                <h3 className="text-lg font-semibold mb-2">Lihat Umpan Balik</h3>
                <p className="text-sm">Tinjau umpan balik yang telah Anda terima.</p>
              </NavLink>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
