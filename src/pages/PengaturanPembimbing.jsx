/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';



export default function PengaturanPembimbing() {

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to change password here
    console.log('Password changed:', { currentPassword, newPassword, confirmPassword });
  };

 

  return (
    <div className="flex h-screen">
      <div className="flex-1 ml-52 bg-gray-100">
        <main className="p-4">
          <h1 className="text-xl font-semibold mb-4 text-blue-800">Pengaturan</h1>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="mb-3">
              <label className="block mb-1 text-md font-medium">Password Saat Ini:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-md font-medium">Password Baru:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-md font-medium">Konfirmasi Password Baru:</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button className="bg-blue-950 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition">
              Ubah Password
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
