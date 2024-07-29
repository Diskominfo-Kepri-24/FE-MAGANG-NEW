/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';

export default function LihatAbsen() {
  const [absenList, setAbsenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data absen dari server atau API
    // setAbsenList(dataDariServer);
  }, []);

  const filteredAbsenList = absenList.filter((absen) =>
    absen.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (index, newStatus) => {
    const updatedAbsenList = [...absenList];
    updatedAbsenList[index].status = newStatus;
    setAbsenList(updatedAbsenList);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lihat Absensi</h1>
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
            <th className="py-2 px-4 border">Tanggal</th>
            <th className="py-2 px-4 border">Jam Masuk</th>
            <th className="py-2 px-4 border">Jam Pulang</th>
            <th className="py-2 px-4 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAbsenList.map((absen, index) => (
            <tr key={index} className="hover:bg-gray-200">
              <td className="py-2 px-4 border">{index + 1}</td>
              <td className="py-2 px-4 border">{absen.nama}</td>
              <td className="py-2 px-4 border">{absen.tanggal}</td>
              <td className="py-2 px-4 border">{absen.jamMasuk || '-'}</td>
              <td className="py-2 px-4 border">{absen.jamPulang || '-'}</td>
              <td className="py-2 px-4 border">
                {absen.status}
                <div className="flex space-x-2 mt-2">
                  <button
                    className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-700 transition"
                    onClick={() => handleStatusChange(index, 'Dikonfirmasi')}
                  >
                    Konfirmasi
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition"
                    onClick={() => handleStatusChange(index, 'Ditolak')}
                  >
                    Ditolak
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
