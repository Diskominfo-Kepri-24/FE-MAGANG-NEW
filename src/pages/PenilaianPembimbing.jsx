/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';


export default function PenilaianPembimbing() {

  const [penilaianList, setPenilaianList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data penilaian
    // Contoh fetch data dari API atau server
    // setPenilaianList(dataDariServer);
  }, []);

  const getDescription = (nilai) => {
    if (nilai > 90) {
      return 'Sangat Baik';
    } else if (nilai > 80) {
      return 'Baik';
    } else if (nilai > 70) {
      return 'Cukup';
    } else if (nilai > 60) {
      return 'Sedang';
    } else {
      return 'Kurang';
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(penilaianList[index].nilai);
  };

  const handleSave = (index) => {
    if (editValue >= 0 && editValue <= 100) {
      const updatedList = [...penilaianList];
      updatedList[index].nilai = editValue;
      setPenilaianList(updatedList);
      setEditingIndex(null);
    } else {
      alert('Nilai harus antara 0 dan 100');
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditValue("");
  };

  const filteredPenilaianList = penilaianList.filter((penilaian) =>
    penilaian.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

 

  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 ml-52">
        <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Penilaian</h1>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Cari Nama"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <table className="min-w-full bg-white border border-gray-300 rounded-md">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">Nilai</th>
                <th className="py-2 px-4 border">Grade</th>
                <th className="py-2 px-4 border">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredPenilaianList.map((penilaian, index) => (
                <tr key={index} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{penilaian.nama}</td>
                  <td className="py-2 px-4 border">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editValue}
                        onChange={(e) => setEditValue(Math.max(0, Math.min(100, Number(e.target.value))))}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      penilaian.nilai
                    )}
                  </td>
                  <td className="py-2 px-4 border">{getDescription(penilaian.nilai)}</td>
                  <td className="py-2 px-4 border">
                    {editingIndex === index ? (
                      <div>
                        <button className="text-green-500 mr-2" onClick={() => handleSave(index)}>Save</button>
                        <button className="text-red-500" onClick={handleCancel}>Cancel</button>
                      </div>
                    ) : (
                      <button className="text-blue-500" onClick={() => handleEdit(index)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
