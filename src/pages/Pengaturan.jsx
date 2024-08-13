/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';

export default function Pengaturan() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Konfirmasi password tidak cocok dengan password baru.');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.put(
        'http://localhost:8000/api/v1/ubah-password',
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Password berhasil diubah.');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      if (err.response.status === 422) {
        setError(err.response.data.message || 'Validasi Gagal');
      } else if (err.response.status === 401) {
        setError('Unauthenticated. Please log in again.');
      } else {
        setError('Terjadi kesalahan saat mengubah password.');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-64">
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
          {message && <p className="text-green-500 mb-4">{message}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Password Saat Ini:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Password Baru:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-lg">Konfirmasi Password Baru:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
              Ubah Password
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
