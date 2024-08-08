/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';
export default function Pengaturan() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const name = localStorage.getItem("name");
  console.log (name)

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika untuk mengubah password di sini
    console.log('Password diubah:', { currentPassword, newPassword, confirmPassword });
  };



  return (
    <div className="flex h-screen">

      <div className="flex flex-col flex-1 ml-64">

        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-4">Pengaturan</h1>
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
