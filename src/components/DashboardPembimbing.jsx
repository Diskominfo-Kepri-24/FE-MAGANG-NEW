/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from 'react';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';

export default function DashboardPembimbing() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [
        { name: 'SMKN 1 Tanjungpinang', jumlah: 12 },
        { name: 'STTI', jumlah: 19 },
        { name: 'SMKN 4 Tanjungpinang', jumlah: 13 },
        { name: 'UMRAH', jumlah: 15 },
        { name: 'STIE', jumlah: 8 },
      ];
      setChartData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 ml-52">
        <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Selamat Datang di Dashboard Pembimbing</h1>
            <p className="text-lg text-gray-700 mb-4">
              Di sini Anda dapat mengelola data peserta, melihat laporan, dan melakukan penilaian.
            </p>
          </div>
          {/* Statistik Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Statistik Peserta</h2>
            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 text-center">Peserta per Kampus</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
