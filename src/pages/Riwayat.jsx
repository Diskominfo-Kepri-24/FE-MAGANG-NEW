/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { HomeIcon, CalendarIcon, ClipboardDocumentIcon, DocumentTextIcon, StarIcon, ArrowLeftOnRectangleIcon, CogIcon, DocumentChartBarIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Riwayat() {
  const absenList = JSON.parse(localStorage.getItem('absenList') || '[]');
  const kegiatanList = JSON.parse(localStorage.getItem('kegiatanList') || '[]');
  const userName = localStorage.getItem('userName') || 'Pengguna'; // Assuming userName is stored in localStorage
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

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

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 100);
  };

  return (
    <div className="flex h-screen">
      <aside className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
        <div className="flex flex-col flex-1">
          <div className="p-4 flex flex-col items-center border-b border-gray-700">
            < div className="w-24 h-24 flex items-center justify-center bg-white rounded-full mb-4">
              <UserIcon className="h-20 w-20 text-gray-800" />
            </div>
            <div className="text-center mb-4">
              <p className="text-lg font-bold">User Name</p>
              <p className="text-sm text-gray-400 capitalize">{role}</p>
            </div>
          </div>
          <nav className="mt-4 flex-1">
            <ul>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <HomeIcon className="h-6 w-6" />
                <NavLink to="/dashboard/mahasiswa" activeclassname="text-blue-300" className="ml-4">
                  Beranda
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CalendarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/absen" activeclassname="text-blue-300" className="ml-4">
                  Absen
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <ClipboardDocumentIcon className="h-6 w-6" />
                <NavLink to="/dashboard/kegiatan" activeclassname="text-blue-300" className="ml-4">
                  Kegiatan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentTextIcon className="h-6 w-6" />
                <NavLink to="/dashboard/laporan" activeclassname="text-blue-300" className="ml-4">
                  Laporan
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <StarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/penilaian" activeclassname="text-blue-300" className="ml-4">
                  Penilaian
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <DocumentChartBarIcon className="h-6 w-6" />
                <NavLink to="/dashboard/riwayat" activeclassname="text-blue-300" className="ml-4">
                  Riwayat
                </NavLink>
              </li>
              <li className="flex items-center p-2 hover:bg-gray-700">
                <CogIcon className="h-6 w-6" />
                <NavLink to="/dashboard/pengaturan" activeclassname="text-blue-300" className="ml-4">
                  Pengaturan
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="p-4 border-t border-gray-700 mt-auto">
          <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <span className="ml-4">Logout</span>
          </li>
        </div>
      </aside>
      <div className="flex flex-col flex-1 ml-64">
        <header className="bg-gray-800 text-white p-4 flex items-center">
          <img
            src="/src/assets/logo.png"
            alt="Logo"
            className="h-14 w-14 rounded-full border-4 border-white"
          />
          <div className="ml-4">
            <h2 className="text-xl font-bold">Portal Magang</h2>
            <h3 className="text-lg font-bold" style={{ color: '#8bd9ff' }}>
              Dinas Komunikasi dan Informatika Provinsi Kepulauan Riau
            </h3>
          </div>
        </header>
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
