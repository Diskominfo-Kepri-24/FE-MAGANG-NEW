/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function LaporanPembimbing() {
  /* eslint-disable-next-line no-unused-vars */
  const [laporanList, setLaporanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data laporan
    // Contoh fetch data dari API atau server
    // setLaporanList(dataDariServer);
  }, []);

  const filteredLaporanList = laporanList.filter((laporan) =>
    laporan.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pengumpulan Laporan Peserta Magang</h1>
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          placeholder="Cari Nama"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="py-2 px-4 border">No</th>
            <th className="py-2 px-4 border">Nama</th>
            <th className="py-2 px-4 border">Periode Magang</th>
            <th className="py-2 px-4 border">Asal Sekolah/Universitas</th>
            <th className="py-2 px-4 border">Link Laporan</th>
          </tr>
        </thead>
        <tbody>
          {filteredLaporanList.map((laporan, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{laporan.nama}</td>
              <td className="py-2 px-4 border">{laporan.periode}</td>
              <td className="py-2 px-4 border">{laporan.asalSekolah}</td>
              <td className="py-2 px-4 border">
                <a href={laporan.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">Lihat Laporan</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
