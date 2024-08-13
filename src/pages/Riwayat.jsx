/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import axios from 'axios';

export default function Riwayat() {
  const [combinedList, setCombinedList] = useState([]);
  const name = localStorage.getItem("name"); // Get the name directly from localStorage

  const token = localStorage.getItem("access_token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchAbsenData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_LINK_API}/absen/magang`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const absenData = response.data.user.map(item => ({
          tanggal: item.tanggal,
          jam_masuk: item.jam_masuk,
          jam_pulang: item.jam_pulang,
          catatan: '',
          status: item.status,
        }));

        return absenData;
      } catch (error) {
        console.error('Failed to fetch absen data:', error);
        return [];
      }
    };

    const fetchKegiatanData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_LINK_API}/kegiatan`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const kegiatanData = response.data.filter(activity => activity.user_id == userId).map(item => ({
          tanggal: item.tanggal,
          jam_masuk: '',
          jam_pulang: '',
          catatan: item.catatan,
          status: item.status,
        }));

        return kegiatanData;
      } catch (error) {
        console.error('Failed to fetch kegiatan data:', error);
        return [];
      }
    };

    const fetchData = async () => {
      const absenData = await fetchAbsenData();
      const kegiatanData = await fetchKegiatanData();
      const combinedData = mergeData([...absenData, ...kegiatanData]);
      setCombinedList(combinedData);
    };

    fetchData();
  }, [token, userId]);

  const mergeData = (data) => {
    const merged = {};

    data.forEach(item => {
      if (!merged[item.tanggal]) {
        merged[item.tanggal] = {
          tanggal: item.tanggal,
          jam_masuk: item.jam_masuk || '',
          jam_pulang: item.jam_pulang || '',
          catatan: item.catatan || '',
          status: item.status || '',
        };
      } else {
        if (item.jam_masuk) merged[item.tanggal].jam_masuk = item.jam_masuk;
        if (item.jam_pulang) merged[item.tanggal].jam_pulang = item.jam_pulang;
        if (item.catatan) merged[item.tanggal].catatan = item.catatan;
        if (item.status && merged[item.tanggal].status !== 'Dikonfirmasi') {
          merged[item.tanggal].status = item.status;
        }
      }
    });

    return Object.values(merged).sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Add Title
    doc.setFontSize(16);
    const titleText = "Detail Presensi";
    const titleX = (pageWidth - doc.getTextWidth(titleText)) / 2;
    doc.text(titleText, titleX, 10);

    // Add User Information
    doc.setFontSize(12);
    doc.text(`Nama: ${name}`, 14, 20);

    // Add Table Headers
    doc.autoTable({
      startY: 30,
      head: [['No', 'Tanggal', 'Jam Masuk', 'Jam Pulang', 'Catatan', 'Status']],
      body: combinedList.map((item, index) => [
        index + 1,
        item.tanggal,
        item.jam_masuk,
        item.jam_pulang,
        item.catatan,
        item.status,
      ]),
    });

    doc.save(`riwayat_presensi_${userId}_${name || 'Pengguna'}.pdf`);
  };

  return (
    <div className="flex flex-col ml-52 py-10 px-10 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Informasi Peserta Magang</h2>
        <div className="flex items-center">
          <span className="text-gray-600 font-medium">Nama:</span>
          <span className="ml-2 text-gray-800">{name || "Tidak ada data"}</span>
        </div>
      </div>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 flex justify-end">
          <button onClick={handleExportPDF} className="px-4 py-2 bg-green-500 text-white rounded-lg">Export to PDF</button>
        </div>
        <h2 className="text-xl font-semibold mt-4">Riwayat Absen dan Kegiatan</h2>
        <table className="mt-4 w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Tanggal</th>
              <th className="border px-4 py-2">Jam Masuk</th>
              <th className="border px-4 py-2">Jam Pulang</th>
              <th className="border px-4 py-2">Catatan</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {combinedList.map((item, index) => (
              <tr key={index} className="bg-gray-100 hover:bg-gray-200">
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{item.tanggal}</td>
                <td className="border px-4 py-2 text-center">{item.jam_masuk || '-'}</td>
                <td className="border px-4 py-2 text-center">{item.jam_pulang || '-'}</td>
                <td className="border px-4 py-2 text-center">{item.catatan || '-'}</td>
                <td className={`border px-4 py-2 text-center ${getStatusBackgroundColor(item.status)}`}>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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

