/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export default function Riwayat() {
  const absenList = JSON.parse(localStorage.getItem('absenList') || '[]');
  const kegiatanList = JSON.parse(localStorage.getItem('kegiatanList') || '[]');
  const userName = localStorage.getItem('userName') || 'Pengguna'; // Assuming userName is stored in localStorage
  const name = localStorage.getItem("name");
  console.log (name)

  const handleExportExcel = () => {
    const worksheetAbsen = XLSX.utils.json_to_sheet(absenList);
    const worksheetKegiatan = XLSX.utils.json_to_sheet(kegiatanList);
    const workbook = XLSX.utils.book_new();

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(workbook, worksheetAbsen, 'Riwayat Absen');
    XLSX.utils.book_append_sheet(workbook, worksheetKegiatan, 'Riwayat Kegiatan');

    // Save the workbook
    XLSX.writeFile(workbook, 'riwayat.xlsx');
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Riwayat Absen dan Kegiatan untuk ${userName}`, 10, 10);

    let y = 20;
    doc.text('Riwayat Absen:', 10, y);
    y += 10;

    absenList.forEach((item, index) => {
      doc.text(`Absen ${index + 1}: ${item.tanggal} - Masuk: ${item.masuk || 'Tidak Hadir'}, Pulang: ${item.pulang || 'Tidak Hadir'}`, 10, y);
      y += 10;
    });

    y += 10;
    doc.text('Riwayat Kegiatan:', 10, y);
    y += 10;

    kegiatanList.forEach((item, index) => {
      doc.text(`Kegiatan ${index + 1}: ${item.tanggal} - Catatan: ${item.catatan}`, 10, y);
      y += 10;
    });

    doc.save('riwayat.pdf');
  };



  return (
    <div className="flex h-screen">

      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Riwayat</h1>
          <p className="mb-4 text-lg font-medium">Nama Pengguna: {userName}</p>
          <button className="bg-blue-950 text-white py-2 px-4 mr-2 rounded-md hover:bg-blue-700 transition" onClick={handleExportExcel}>Export to Excel</button>
          <button className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition" onClick={handleExportPDF}>Export to PDF</button>

          <h2 className="text-xl font-semibold mt-4">Riwayat Absen</h2>
          <table className="mt-4 w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Tanggal</th>
                <th className="border px-4 py-2">Jam Masuk</th>
                <th className="border px-4 py-2">Jam Pulang</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {absenList.map((absen, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{absen.tanggal}</td>
                  <td className="border px-4 py-2">{absen.masuk || '-'}</td>
                  <td className="border px-4 py-2">{absen.pulang || '-'}</td>
                  <td className="border px-4 py-2">{absen.masuk && absen.pulang ? 'Hadir' : 'Belum Lengkap'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-xl font-semibold mt-4">Riwayat Kegiatan</h2>
          <table className="mt-4 w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border px-4 py-2">No</th>
                <th className="border px-4 py-2">Tanggal</th>
                <th className="border px-4 py-2">Catatan</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {kegiatanList.map((kegiatan, index) => (
                <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{kegiatan.tanggal}</td>
                  <td className="border px-4 py-2">{kegiatan.catatan}</td>
                  <td className={`border px-4 py-2 ${getStatusBackgroundColor(kegiatan.status)}`}>{kegiatan.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}

// Helper function for status background color
const getStatusBackgroundColor = (status) => {
  switch (status) {
    case 'Menunggu':
      return 'bg-yellow-200 text-yellow-800';
    case 'Dikonfirmasi':
      return 'bg-green-200 text-green-800';
    case 'Ditolak':
      return 'bg-red-200 text-red-800';
    default:
      return '';
  }
};
