/* eslint-disable-next-line no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PenilaianPembimbing() {
  const [penilaianList, setPenilaianList] = useState([]);
  const [peserta, setPeserta] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [combinedData, setCombinedData] = useState([]);
  const [ratedUsers, setRatedUsers] = useState(new Set()); 
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackPage, setFeedbackPage] = useState(1);
  const itemsPerPage = 10;
  const feedbackItemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPenilaian = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://localhost:8000/api/v1/penilaian', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPenilaianList(response.data);
        setRatedUsers(new Set(response.data.map(p => p.user_id)));
      } catch (error) {
        console.error('There was a problem fetching penilaian data:', error);
        alert('Terjadi kesalahan saat mengambil data penilaian.');
      }
    };

    const fetchPeserta = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/user-magang', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPeserta(response.data.users);
      } catch (error) {
        console.error('Error fetching peserta data:', error);
      }
    };

    const fetchFeedback = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get('http://localhost:8000/api/v1/feedback', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchPenilaian();
    fetchPeserta();
    fetchFeedback();
  }, []);

  useEffect(() => {
    const combined = peserta.map((user) => {
      const penilaian = penilaianList.find((penilaian) => penilaian.user_id === user.id_user);
      return penilaian ? { ...user, ...penilaian } : { ...user, nilai: "Belum dinilai", grade: "Belum dinilai" };
    });

    setCombinedData(combined);
  }, [penilaianList, peserta]);

  const handleTambah = (id) => {
    navigate(`/dashboard/penilaian-pembimbing/nilai/${id}/add`);
  };

  const handleEdit = (id) => {
    navigate(`/dashboard/penilaian-pembimbing/nilai/${id}/edit`);
  };

  // Pagination logic for penilaian
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = combinedData
    .filter(penilaian => penilaian.nama.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(combinedData.length / itemsPerPage);

  // Pagination logic for feedback
  const paginateFeedback = (pageNumber) => {
    setFeedbackPage(pageNumber);
  };

  const goToNextFeedbackPage = () => {
    if (feedbackPage < totalFeedbackPages) {
      setFeedbackPage(feedbackPage + 1);
    }
  };

  const goToPreviousFeedbackPage = () => {
    if (feedbackPage > 1) {
      setFeedbackPage(feedbackPage - 1);
    }
  };

  const indexOfLastFeedbackItem = feedbackPage * feedbackItemsPerPage;
  const indexOfFirstFeedbackItem = indexOfLastFeedbackItem - feedbackItemsPerPage;
  const currentFeedbackItems = feedbackList.slice(indexOfFirstFeedbackItem, indexOfLastFeedbackItem);
  const totalFeedbackPages = Math.ceil(feedbackList.length / feedbackItemsPerPage);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col flex-1 ml-52 overflow-hidden">
        <main className="flex-1 p-6 bg-gray-100 overflow-y-scroll min-h-screen">
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
              {currentItems.map((penilaian, index) => (
                <tr key={penilaian.id_user} className="hover:bg-gray-200">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{penilaian.nama}</td>
                  <td className="py-2 px-4 border">{penilaian.nilai}</td>
                  <td className="py-2 px-4 border">
                    {penilaian.nilai === "Belum dinilai" ? "Belum dinilai" : (penilaian.nilai > 90 ? 'Amat Baik' : penilaian.nilai > 80 ? 'Baik' : penilaian.nilai > 70 ? 'Cukup' : penilaian.nilai > 60 ? 'Sedang' : 'Kurang')}
                  </td>
                  <td className="py-2 px-4 border">
                    {!ratedUsers.has(penilaian.id_user) && (
                      <button
                        className="text-blue-500"
                        onClick={() => handleTambah(penilaian.id_user)}
                      >
                        Tambah
                      </button>
                    )}
                    {ratedUsers.has(penilaian.id_user) && (
                      <button
                        className="ml-5 text-blue-500"
                        onClick={() => handleEdit(penilaian.id)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination for penilaian */}
          <div className="flex justify-between items-center mt-4 px-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing <span className="font-semibold">{indexOfFirstItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastItem, combinedData.length)}</span> of <span className="font-semibold">{combinedData.length}</span> results
              </span>
            </div>
            <nav>
              <ul className="inline-flex -space-x-px">
                <li>
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 leading-tight ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-2 leading-tight ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-2 leading-tight ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* New Feedback Table */}
          <h2 className="text-xl font-bold mt-8">Feedback dari Peserta</h2>
          <table className="min-w-full bg-white border border-gray-300 rounded-md mt-4">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="py-2 px-4 border">No</th>
                <th className="py-2 px-4 border">Nama</th>
                <th className="py-2 px-4 border">Rating</th>
                <th className="py-2 px-4 border">Kritik & Saran</th>
              </tr>
            </thead>
            <tbody>
              {currentFeedbackItems.length > 0 ? (
                currentFeedbackItems.map((feedback, index) => {
                  const pesertaDetail = peserta.find(p => p.id_user === feedback.user_id) || {};
                  return (
                    <tr key={feedback.id} className="hover:bg-gray-200">
                      <td className="py-2 px-4 border">{indexOfFirstFeedbackItem + index + 1}</td>
                      <td className="py-2 px-4 border">{pesertaDetail.nama || 'Tidak diketahui'}</td>
                      <td className="py-2 px-4 border">{feedback.rating}</td>
                      <td className="py-2 px-4 border">{feedback.feedback}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">Tidak ada feedback.</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination for feedback */}
          <div className="flex justify-between items-center mt-4 px-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing <span className="font-semibold">{indexOfFirstFeedbackItem + 1}</span> to <span className="font-semibold">{Math.min(indexOfLastFeedbackItem, feedbackList.length)}</span> of <span className="font-semibold">{feedbackList.length}</span> results
              </span>
            </div>
            <nav>
              <ul className="inline-flex -space-x-px">
                <li>
                  <button
                    onClick={goToPreviousFeedbackPage}
                    disabled={feedbackPage === 1}
                    className={`px-3 py-2 leading-tight ${feedbackPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalFeedbackPages)].map((_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => paginateFeedback(i + 1)}
                      className={`px-3 py-2 leading-tight ${feedbackPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={goToNextFeedbackPage}
                    disabled={feedbackPage === totalFeedbackPages}
                    className={`px-3 py-2 leading-tight ${feedbackPage === totalFeedbackPages ? 'bg-gray-300 text-gray-500' : 'bg-white text-blue-500'} border border-gray-300 hover:bg-blue-500 hover:text-white`}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </main>
      </div>
    </div>
  );
}