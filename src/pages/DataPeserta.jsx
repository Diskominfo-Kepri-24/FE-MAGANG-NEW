/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function DataPeserta() {
  const [peserta, setPeserta] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const itemsPerPage = 10;
  // const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  console.log(peserta);
  useEffect(() => {
    const fetchGetMagang = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/user-magang',
         
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

         setPeserta(response.data.users);
        // Process the data as needed
      } catch (error) {
        console.error('Error fetching magang data:', error);
      }
    };
    fetchGetMagang();
  }, []);


  // const filteredPeserta = peserta.filter((data) => {
  //   const searchTermMatch = data.nama.toLowerCase().includes(searchTerm.toLowerCase()) || data.asalSekolah.toLowerCase().includes(searchTerm.toLowerCase());
  //   const startDateMatch = startDate ? new Date(data.mulaiMagang) >= new Date(startDate) : true;
  //   const endDateMatch = endDate ? new Date(data.akhirMagang) <= new Date(endDate) : true;
  //   return searchTermMatch && startDateMatch && endDateMatch;
  // });

  // const pageCount = Math.ceil(filteredPeserta.length / itemsPerPage);
  // const offset = currentPage * itemsPerPage;
  // const currentItems = filteredPeserta.slice(offset, offset + itemsPerPage);



  // const handlePageClick = (selectedItem) => {
  //   setCurrentPage(selectedItem.selected);
  // };

  // const exportPDF = () => {
  //   const doc = new jsPDF();
  //   autoTable(doc, {
  //     head: [['No', 'Nama', 'Periode Magang', 'Asal Sekolah/Univ', 'Periksa Absen dan Catatan']],
  //     body: filteredPeserta.map((data, index) => [
  //       index + 1,
  //       data.nama,
  //       `${data.mulaiMagang} - ${data.akhirMagang}`,
  //       data.asalSekolah,
  //       '', // Placeholder for action buttons
  //       '', // Placeholder for report link
  //       data.nilai || '' // Placeholder for nilai
  //     ])
  //   });
  //   doc.save('data-peserta.pdf');
  // };

  // const exportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(filteredPeserta.map((data, index) => ({
  //     No: index + 1,
  //     Nama: data.nama,
  //     Periode_Magang: `${data.mulaiMagang} - ${data.akhirMagang}`,
  //     Asal_Sekolah: data.asalSekolah,
  //     Periksa_Absen_dan_Catatan: '', // Placeholder for action buttons
  //     Laporan: '', // Placeholder for report link
  //     Penilaian: data.nilai || '' // Placeholder for nilai
  //   })));
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Peserta');
  //   XLSX.writeFile(workbook, 'data-peserta.xlsx');
  // };

  // const handleEdit = (index) => {
  //   setEditingIndex(index);
  //   setEditValue(filteredPeserta[index].nilai || "");
  // };

  // const handleSave = (index) => {
  //   const updatedPeserta = [...filteredPeserta];
  //   updatedPeserta[index].nilai = editValue;
  //   setPeserta(updatedPeserta);
  //   setEditingIndex(null);
  // };

  // const handleCancel = () => {
  //   setEditingIndex(null);
  //   setEditValue("");
  // };

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
            {/* <div className="flex items-center space-x-2">
              <button
                onClick={exportPDF}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Export PDF
              </button>
              <button
                onClick={exportExcel}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
              >
                Export Excel
              </button>
            </div> */}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index+1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{`${data.mulai_magang
} / ${data.akhir_magang
}`}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.instansi
                    }</td>
                   
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
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {editingIndex === offset + index ? (
                        <>
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="p-1 border rounded"
                          />
                          <button
                            onClick={() => handleSave(offset + index)}
                            className="ml-2 bg-green-500 text-white p-1 rounded hover:bg-green-600"
                          >
                            Simpan
                          </button>
                          <button
                            onClick={handleCancel}
                            className="ml-2 bg-red-500 text-white p-1 rounded hover:bg-red-600"
                          >
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <span>{data.nilai || "Belum Dinilai"}</span>
                          <button
                            onClick={() => handleEdit(offset + index)}
                            className="ml-2 bg-yellow-500 text-white p-1 rounded hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </td> */}
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600"
                      >
                        Aksi
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600">
              Menampilkan {offset + 1}-{Math.min(offset + itemsPerPage, filteredPeserta.length)} dari {filteredPeserta.length} peserta
            </div>
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageClassName={"inline-block px-3 py-1 border rounded text-gray-500 hover:bg-gray-200"}
              previousClassName={"inline-block px-3 py-1 border rounded text-gray-500 hover:bg-gray-200"}
              nextClassName={"inline-block px-3 py-1 border rounded text-gray-500 hover:bg-gray-200"}
              activeLinkClassName={"bg-blue-500 text-white"}
            />
          </div> */}
        </main>
      </div>
    </div>
  );
}

