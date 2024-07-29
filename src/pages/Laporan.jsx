/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';

export default function Laporan() {
  const [link, setLink] = useState('');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Laporan</h1>
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-2"
        placeholder="Link Gdrive Laporan Magang"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button className="bg-blue-950 text-white py-2 px-4 rounded-md">Submit</button>
    </div>
  );
}
