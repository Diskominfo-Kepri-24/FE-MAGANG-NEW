/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DataPeserta() {
  const [peserta, setPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchGetMagang = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/user-magang',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPeserta(response.data.users);
      } catch (error) {
        console.error('Error fetching magang data:', error);
      }
    };
    fetchGetMagang();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-52">
        <main className="flex-1 p-4 bg-gray-100">
          <h1 className="text-xl font-bold mb-4">Data Peserta</h1>
          <div className="mb-4 flex flex-wrap justify-between items-center space-y-2">
            <input
              type="text"
              className="p-2 border rounded w-full md:w-1/3"
              placeholder="Cari Nama atau Asal Sekolah/Univ"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap items-center space-x-2">
              <div className="flex items-center space-x-2">
                <label className="text-sm">Start Date:</label>
                <input
                  type="date"
                  className="p-2 border rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm">End Date:</label>
                <input
                  type="date"
                  className="p-2 border rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode Magang</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asal Sekolah/Univ</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periksa Absen dan Catatan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {peserta.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${data.mulai_magang} / ${data.akhir_magang}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.instansi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline cursor-pointer">
                      <Link to={`/dashboard/data-peserta/presensi/${data.id_user}`} className='px-3 py-2 rounded-full bg-blue-500 text-white'>
                        Detail
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline cursor-pointer">
                      <Link to={`/dashboard/data-peserta/detail/${data.id_user}`} className='px-3 py-2 rounded-full bg-blue-500 text-white'>
                        Riwayat
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

