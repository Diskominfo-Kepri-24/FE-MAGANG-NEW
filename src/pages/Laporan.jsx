/* eslint-disable-next-line no-unused-vars */
import React, { useState } from 'react';


export default function Laporan() {
  const [link, setLink] = useState('');
  const name = localStorage.getItem("name");
  console.log (name)


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/laporan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ link }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Laporan submitted successfully:', result);
        // Optionally, navigate to another page or show a success message
      } else {
        const errorText = await response.text();  // Read the error message from the response
        console.error('Failed to submit laporan:', response.status, errorText);
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting laporan:', error);
      // Handle error
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
          />
          <button
            className="bg-blue-950 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </main>
      </div>
    </div>
  );
}
