import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailPresensi() {
  const [absensi, setAbsensi] = useState([]);
  const [catatan, setCatatan] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchAbsensi = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/absen/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setAbsensi(response.data.absen || []); // Set default value as an empty array
      } catch (error) {
        console.error('Error fetching absensi data:', error);
      }
    };
    fetchAbsensi();
  }, [id]);

  useEffect(() => {
    const fetchCatatan = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/kegiatan/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setCatatan(response.data); // Ensure catatan is an array
      } catch (error) {
        console.error('Error fetching catatan data:', error);
      }
    };
    fetchCatatan();
  }, [id]);

  const handleConfirm = async (id_absen, id_kegiatan) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v1/kegiatan/${id_kegiatan}/confirm`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      await axios.post(
        `http://127.0.0.1:8000/api/v1/absen/terima-absen/${id_absen}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      window.location.reload();
      // Optionally update UI or refetch data
    } catch (error) {
      console.error('Error confirming kegiatan or accepting absen:', error);
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
            Authorization: `Bearer ${token}`
          }
        }
      );
      await axios.post(
        `http://127.0.0.1:8000/api/v1/absen/tolak-absen/${id_absen}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      window.location.reload();
      // Optionally update UI or refetch data
    } catch (error) {
      console.error('Error rejecting kegiatan:', error);
    }
  };

  // Gabungkan data absensi dan catatan berdasarkan tanggal
  const combinedData = absensi.map(absenItem => {
    const relatedCatatan = Array.isArray(catatan) ? catatan.find(catatanItem => catatanItem.tanggal === absenItem.tanggal) : null;
    return {
      ...absenItem,
      catatan: relatedCatatan ? relatedCatatan.catatan : 'Tidak ada catatan',
      presensi: absenItem.jam_masuk || 'Tidak ada presensi',
      status: absenItem.status || 'Tidak ada status'
    };
  });
//   console.log(combinedData);
  return (
    <>
      <div className="flex ml-52 py-10 px-10">
        <div className="overflow-x-auto bg-white rounded shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presensi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {combinedData.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.tanggal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.presensi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.catatan}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline cursor-pointer">
                    <button 
                      className='px-3 py-2 rounded-full bg-blue-500 text-white'
                      onClick={() => handleConfirm(data.id_absen, id)}
                    >
                      Dikonfirmasi
                    </button>
                    <button 
                      className='px-3 py-2 rounded-full bg-blue-500 text-white'
                      onClick={() => handleReject(data.id_absen, id)}
                    >
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
