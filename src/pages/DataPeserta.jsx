/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function DataPeserta() {
  /* eslint-disable-next-line no-unused-vars */
  const [peserta, setPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data peserta yang diampuh oleh Pembimbing Lapangan
    // Contoh fetch data dari API atau server
    // setPeserta(dataDariServer);
  }, []);

  const filteredPeserta = peserta.filter((data) =>
    data.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Peserta</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Cari Nama atau Asal Sekolah/Univ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="py-2 px-4 border">No</th>
            <th className="py-2 px-4 border">Nama</th>
            <th className="py-2 px-4 border">Mulai Magang</th>
            <th className="py-2 px-4 border">Akhir Magang</th>
            <th className="py-2 px-4 border">Asal Sekolah/Univ</th>
          </tr>
        </thead>
        <tbody>
          {filteredPeserta.map((data, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{data.nama}</td>
              <td className="py-2 px-4 border">{data.mulaiMagang}</td>
              <td className="py-2 px-4 border">{data.akhirMagang}</td>
              <td className="py-2 px-4 border">{data.asalSekolah}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
