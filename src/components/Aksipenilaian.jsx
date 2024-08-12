import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Aksipenilaian() {
  const navigate = useNavigate();
  const { id, action } = useParams(); // Get the action from the URL
  const [editValue, setEditValue] = useState('');
  console.log(id);
  console.log(action);
  useEffect(() => {
    if (action === 'edit') {
      // Fetch current value for editing if needed
      const fetchPenilaian = async () => {
        const token = localStorage.getItem('access_token');
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/penilaian/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setEditValue(response.data.nilai);
        } catch (error) {
          console.error('Error fetching penilaian data:', error);
        }
      };
      fetchPenilaian();
    }
  }, [id, action]);

  const handleSave = async () => {
    if (editValue >= 0 && editValue <= 100) {
      const token = localStorage.getItem('access_token');
      try {
        if (action === 'add') {
          await axios.post('http://localhost:8000/api/v1/penilaian', 
            { user_id: id, nilai: editValue }, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (action === 'edit') {
          await axios.put(`http://localhost:8000/api/v1/penilaian/${id}`, 
            { nilai: editValue }, 
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        alert('Nilai berhasil disimpan.');
        navigate('/dashboard/penilaian-pembimbing');
      } catch (error) {
        console.error('Error saving penilaian:', error);
        alert('Terjadi kesalahan saat menyimpan nilai. Silakan coba lagi.');
      }
    } else {
      alert('Nilai harus antara 0 dan 100');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/penilaian-pembimbing');
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">{action === 'edit' ? 'Edit Nilai' : 'Tambah Nilai'}</h2>
        <input
          type="number"
          value={editValue}
          onChange={(e) => setEditValue(Math.max(0, Math.min(100, Number(e.target.value))))}
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex justify-end">
          <button className="text-green-500 mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="text-red-500" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
