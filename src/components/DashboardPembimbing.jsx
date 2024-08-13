/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, Legend } from 'recharts';

export default function DashboardPembimbing() {
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('2024'); // Default year selection
  const [availableYears] = useState(['2022', '2023', '2024', '2025']); // Year options
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(true); // Check if data exists

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setHasData(true);
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/user-magang',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Filter data based on the selected year
        const filteredData = response.data.users.filter((item) => {
          const magangYear = new Date(item.mulai_magang).getFullYear();
          return magangYear === parseInt(selectedYear, 10);
        });

        if (filteredData.length === 0) {
          setHasData(false);
          setChartData([]);
          return;
        }

        const schoolData = filteredData.reduce((acc, curr) => {
          const { instansi } = curr;
          acc[instansi] = (acc[instansi] || 0) + 1;
          return acc;
        }, {});

        const formattedData = Object.keys(schoolData).map((school) => ({
          name: school,
          jumlah: schoolData[school],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching magang data:', error);
        setChartData([]); // Reset the chart data in case of an error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedYear]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 ml-52">
        <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">Selamat Datang di Dashboard Pembimbing</h1>
            <p className="text-lg text-gray-700 mb-4">
              Di sini Anda dapat mengelola data peserta, melihat laporan, dan melakukan penilaian.
            </p>
          </div>
          {/* Statistik Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">Statistik Peserta</h2>

            {/* Year Filtering */}
            <div className="mb-4">
              <label className="text-lg font-medium text-gray-700">Pilih Tahun:</label>
              <select
                className="ml-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-blue-800 text-center">Peserta per Kampus</h3>
              {loading ? (
                <p className="text-center text-gray-700">Memuat data...</p>
              ) : hasData ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="jumlah" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-700">Data tidak tersedia untuk tahun {selectedYear}</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
