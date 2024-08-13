/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function DataPeserta() {
  const [peserta, setPeserta] = useState([]);
  const [filteredPeserta, setFilteredPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        setFilteredPeserta(response.data.users);
      } catch (error) {
        console.error('Error fetching magang data:', error);
      }
    };
    fetchGetMagang();
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filtered = peserta;

      if (searchTerm) {
        filtered = filtered.filter(
          (item) =>
            item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.instansi.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (startDate) {
        filtered = filtered.filter(
          (item) => new Date(item.mulai_magang) >= new Date(startDate)
        );
      }

      if (endDate) {
        filtered = filtered.filter(
          (item) => new Date(item.akhir_magang) <= new Date(endDate)
        );
      }

      setFilteredPeserta(filtered);
    };

    filterData();
  }, [searchTerm, startDate, endDate, peserta]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPeserta.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPeserta.length / itemsPerPage);

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
                {currentItems.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{indexOfFirstItem + index + 1}</td>
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


            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 px-4">
              <div>
                <span className="text-sm text-gray-700">
                  Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, filteredPeserta.length)}</span> of <span className="font-semibold">{filteredPeserta.length}</span> results
                </span>
              </div>
              <nav>
                <ul className="inline-flex -space-x-px">
                  <li>
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 leading-tight ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-2 leading-tight ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 leading-tight ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
