import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailPresensi() {
  const [absensi, setAbsensi] = useState([]);
  const [kegiatan, setKegiatan] = useState([]);
  const { id } = useParams(); // id di sini adalah user_id

  useEffect(() => {
    const fetchAbsensi = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/absen/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAbsensi(response.data.absen || []);
      } catch (error) {
        console.error("Error fetching absensi data:", error);
      }
    };
    fetchAbsensi();
  }, [id]);

  useEffect(() => {
    const fetchKegiatan = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/kegiatan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        setKegiatan(response.data || []);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn("Data kegiatan tidak ditemukan:", error.message);
        } else {
          console.error("Error fetching kegiatan data:", error.message);
        }
      }
    };
    fetchKegiatan();
  }, [id]);

  const confirmAction = (id_absen, id_kegiatan, action) => {
    toast.info(
      <div>
        <p>Apakah Anda yakin ingin {action === 'confirm' ? 'mengonfirmasi' : 'menolak'} absensi ini?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              if (action === 'confirm') {
                handleConfirm(id_absen, id_kegiatan);
              } else {
                handleReject(id_absen, id_kegiatan);
              }
              toast.dismiss();
            }}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Ya
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Tidak
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleConfirm = async (id_absen, id_kegiatan) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/kegiatan/${id_kegiatan}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.post(
        `http://127.0.0.1:8000/api/v1/absen/terima-absen/${id_absen}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Absensi berhasil dikonfirmasi!");
      window.location.reload();
    } catch (error) {
      toast.error("Gagal mengonfirmasi absensi!");
      console.error("Error confirming kegiatan or accepting absen:", error);
    }
  };

  const handleReject = async (id_absen, id_kegiatan) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/kegiatan/${id_kegiatan}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await axios.post(
        `http://127.0.0.1:8000/api/v1/absen/tolak-absen/${id_absen}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Absensi berhasil ditolak!");
      window.location.reload();
    } catch (error) {
      toast.error("Gagal menolak absensi!");
      console.error("Error rejecting kegiatan:", error);
    }
  };

  // Gabungkan data absensi dan catatan berdasarkan tanggal
const combinedData = absensi.map(absenItem => {
  const relatedCatatan = Array.isArray(kegiatan) ? kegiatan.find(catatanItem => catatanItem.tanggal === absenItem.tanggal) : null;
  return {
    ...absenItem,
    catatan: relatedCatatan ? relatedCatatan.catatan : 'Tidak ada catatan',
    id_kegiatan: relatedCatatan ? relatedCatatan.id : null, // Menambahkan id kegiatan di sini
    presensiMasuk: absenItem.jam_masuk || "Tidak ada presensi",
    presensiPulang: absenItem.jam_pulang || "Tidak ada presensi",
    status: absenItem.status || 'Tidak ada status'
  };
});

// console.log(combinedData);

  
  return (
    <div className="flex ml-52 py-10 px-10">
      <div className="overflow-x-auto bg-white rounded shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                No
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {combinedData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {index + 1}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline cursor-pointer">
                  <button
                    className="px-3 py-2 rounded-full bg-blue-500 text-white mr-2"
                    onClick={() => confirmAction(data.id_absen, data.id_kegiatan, 'confirm')}
                  >
                    Dikonfirmasi
                  </button>
                  <button
                    className="px-3 py-2 rounded-full bg-red-500 text-white"
                    onClick={() => confirmAction(data.id_absen, data.id_kegiatan, 'reject')}
                  >
                    Tolak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
}