import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LaporanPembimbing() {
  const [laporanList, setLaporanList] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState(""); // Filter by date

  useEffect(() => {
    // Fetch laporan data
    const fetchLaporan = async () => {
      try {
        const laporanResponse = await axios.get('http://localhost:8000/api/v1/laporan', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (laporanResponse.status === 200) {
          const laporanData = laporanResponse.data.laporan;
          setLaporanList(laporanData);
          console.log("Laporan Data:", laporanData); // Debugging
        } else {
          console.error('Unexpected error:', laporanResponse.statusText);
          alert('Terjadi kesalahan saat mengambil data laporan.');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    // Fetch user data
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get('http://127.0.0.1:8000/api/v1/user-magang', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });

        if (usersResponse.status === 200) {
          setUsers(usersResponse.data.users);
          console.log("Users Data:", usersResponse.data.users); // Debugging
        } else {
          console.error('Unexpected error:', usersResponse.statusText);
          alert('Terjadi kesalahan saat mengambil data pengguna.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchLaporan();
    fetchUsers();
  }, []);

  // Function to get username by user_id
  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id || user.id_user === id); // Adjust the property name if necessary
    return user ? user.nama : 'Unknown User';
  };

  const filteredLaporanList = Array.isArray(laporanList)
    ? laporanList.filter((laporan) => {
        const isMatchLink = laporan.link_laporan.toLowerCase().includes(searchTerm.toLowerCase());
        const isMatchDate = filterDate
          ? new Date(laporan.created_at).toLocaleDateString() === new Date(filterDate).toLocaleDateString()
          : true;
        return isMatchLink && isMatchDate;
      })
    : [];

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-52">
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Pengumpulan Laporan Peserta Magang</h1>
          <div className="mb-4 flex space-x-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Cari Link Laporan"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              type="date"
              className="p-2 border rounded"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          {filteredLaporanList.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-2 px-4 border text-center">No</th>
                  <th className="py-2 px-4 border text-center">Nama</th>
                  <th className="py-2 px-4 border text-center">Link</th>
                  <th className="py-2 px-2 border text-center">Tanggal Pengumpulan</th>
                </tr>
              </thead>
              <tbody>
                {filteredLaporanList.map((laporan, index) => (
                  <tr key={laporan.id} className="hover:bg-gray-200">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border text-center">{getUserNameById(laporan.user_id)}</td>
                    <td className="py-2 px-4 border text-center">
                      <a href={laporan.link_laporan} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        Url Laporan
                      </a>
                    </td>
                    <td className="py-2 px-4 border text-center">{new Date(laporan.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center mt-4">Tidak ada laporan yang tersedia.</p>
          )}
        </main>
      </div>
    </div>
  );
}
