/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Laporan() {
  const [link, setLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLaporanExists, setIsLaporanExists] = useState(false);

  useEffect(() => {
    // Fetch laporan yang sudah ada
    const fetchLaporan = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/laporan/magang', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.laporan) {
            setLink(data.laporan.link_laporan);  // Set link laporan yang sudah ada
            setIsLaporanExists(true);  // Set flag bahwa laporan sudah ada
          }
        } else if (response.status === 404) {
          console.log('Laporan tidak ditemukan.');
        } else if (response.status === 401) {
          console.error('Unauthorized:', response.statusText);
          toast.error('Anda tidak memiliki izin untuk mengakses data ini.');
        }
      } catch (error) {
        console.error('Error fetching laporan:', error);
        toast.error('Gagal mengambil data laporan.');
      }
    };

    fetchLaporan();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const method = isLaporanExists ? 'PUT' : 'POST';  // Jika laporan sudah ada, gunakan PUT untuk update
      const response = await fetch('http://localhost:8000/api/v1/laporan', {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ link_laporan: link }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Laporan berhasil ditambahkan/diperbarui:', result);
        toast.success(result.status);
        setTimeout(() => {
          window.location.reload();  // Reload halaman setelah submit berhasil
        }, 1500);  // Give time for the toast to be visible before reloading
      } else if (response.status === 422) {
        const errorData = await response.json();
        console.error('Validasi gagal:', errorData.errors);
        toast.error(`Validasi gagal: ${errorData.message}`);
      } else if (response.status === 401) {
        const errorData = await response.json();
        console.error('Tidak terautentikasi:', errorData.message);
        toast.error(`Error: ${errorData.message}`);
      } else {
        const errorText = await response.text();
        console.error('Error tidak terduga:', errorText);
        toast.error(`Error tidak terduga: ${errorText}`);
      }
    } catch (error) {
      console.error('Error submitting laporan:', error);
      toast.error("Terjadi kesalahan saat submit laporan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Laporan</h1>
          <input
            type="text"
            className="w-full p-2 border rounded-md mb-2"
            placeholder="Link Gdrive Laporan Magang"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            disabled={isLoading}  // Disable input selama proses loading
          />
          <button
            className="bg-blue-950 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
            disabled={isLoading || (!link && isLaporanExists)}  // Disable jika loading atau tidak ada input link
          >
            {isLoading ? 'Submitting...' : isLaporanExists ? 'Update Laporan' : 'Submit'}
          </button>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
