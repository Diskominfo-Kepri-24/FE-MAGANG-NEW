/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';



export default function LihatAbsen() {
  const [absenList, setAbsenList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAbsenList = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/absen', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.user);
        setAbsenList(response.data.user);
      } catch (error) {
        console.error('Error fetching absen list:', error);
      }
    };

    fetchAbsenList();
  }, []);



  const handleStatusChange = (index, newStatus) => {
    const updatedAbsenList = [...absenList];
    updatedAbsenList[index].status = newStatus;
    setAbsenList(updatedAbsenList);
  };



  return (
    <div className="flex h-screen">

      <div className="flex flex-col flex-1 ml-64">
        
        <main className="flex-1 p-4">
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
              {absenList.map((absen, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{absen.name}</td>
                  <td className="py-2 px-4 border">{absen.tanggal}</td>
                  <td className="py-2 px-4 border">{absen.jam_masuk || '-'}</td>
                  <td className="py-2 px-4 border">{absen.jam_pulang || '-'}</td>
                  <td className="py-2 px-4 border">
                    
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
        </main>
      </div>
    </div>
  );
}
