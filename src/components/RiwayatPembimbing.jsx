import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function RiwayatPembimbing() {
  const [userData, setUserData] = useState({});
  const [detailData, setDetailData] = useState([]);
  const { id } = useParams(); // id di sini adalah user_id

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("access_token");
      try {
        // Fetch all users data
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/user-magang`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter the user based on user_id (id)
        const user = response.data.users.find((user) => user.id_user.toString() === id);

        if (user) {
          setUserData(user);
        } else {
          console.error("User not found");
        }

        // Fetch Absensi Data
        const absensiResponse = await axios.get(
          `http://127.0.0.1:8000/api/v1/absen/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Fetch Kegiatan Data
        const kegiatanResponse = await axios.get(
          `http://127.0.0.1:8000/api/v1/kegiatan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Combine Absensi and Kegiatan data
        const absensiData = absensiResponse.data.absen || [];
        const kegiatanData = kegiatanResponse.data || [];

        const combinedData = absensiData.map((absenItem) => {
          const relatedCatatan = kegiatanData.find(
            (catatanItem) => catatanItem.tanggal === absenItem.tanggal
          );
          return {
            ...absenItem,
            catatan: relatedCatatan ? relatedCatatan.catatan : "Tidak ada catatan",
            id_kegiatan: relatedCatatan ? relatedCatatan.id : null,
            presensiMasuk: absenItem.jam_masuk || "Tidak ada presensi",
            presensiPulang: absenItem.jam_pulang || "Tidak ada presensi",
            status: absenItem.status || "Tidak ada status",
            tanggal: absenItem.tanggal || "Tidak ada tanggal",
          };
        });

        setDetailData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // Function to export data as PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    // Center the "Detail Presensi" title on the page
    doc.setFontSize(16);
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleText = "Detail Presensi";
    const titleX = (pageWidth - doc.getTextWidth(titleText)) / 2;
    doc.text(titleText, titleX, 10);

    // Set a smaller font size for user details
    doc.setFontSize(12);
    doc.text(`Nama: ${userData.nama || ""}`, 12, 20);
    doc.text(
      `Periode Magang: ${userData.mulai_magang || ""} - ${userData.akhir_magang || ""}`,
      12,
      30
    );
    doc.text(`Asal Sekolah/Univ: ${userData.instansi || ""}`, 12, 40);

    // Create the table with presensi details
    doc.autoTable({
      startY: 50,
      head: [["No", "Tanggal", "Jam Masuk", "Jam Pulang", "Catatan", "Status"]],
      body: detailData.map((data, index) => [
        index + 1,
        data.tanggal,
        data.presensiMasuk,
        data.presensiPulang,
        data.catatan,
        data.status,
      ]),
    });

    doc.save(`riwayat_presensi_${id}_${userData.nama}.pdf`);
  };

  return (
    <div className="flex flex-col ml-52 py-10 px-10 space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Informasi Peserta Magang</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">Nama:</span>
            <span className="text-gray-800">{userData.nama || "Tidak ada data"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">Periode Magang:</span>
            <span className="text-gray-800">{userData.mulai_magang || "Tidak ada data"} - {userData.akhir_magang || "Tidak ada data"}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-600 font-medium">Asal Sekolah/Univ:</span>
            <span className="text-gray-800">{userData.instansi || "Tidak ada data"}</span>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 flex justify-end">
          <button onClick={exportPDF} className="px-4 py-2 bg-green-500 text-white rounded-lg">Export PDF</button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tanggal
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jam Masuk
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Jam Pulang
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Catatan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {detailData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {data.tanggal || "Tidak ada tanggal"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {data.presensiMasuk}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {data.presensiPulang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {data.catatan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {data.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
