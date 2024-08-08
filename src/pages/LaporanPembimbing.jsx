import { useState, useEffect } from 'react';


export default function LaporanPembimbing() {

  const [laporanList, setLaporanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data laporan
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/laporan', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLaporanList(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []);

  const filteredLaporanList = Array.isArray(laporanList)
    ? laporanList.filter((laporan) =>
        laporan.nama.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-52">
     
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
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
          {filteredLaporanList.length > 0 ? (
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
          ) : (
            <p className="text-gray-500 text-center mt-4">Tidak ada laporan yang tersedia.</p>
          )}
        </main>
      </div>
    </div>
  );
}
