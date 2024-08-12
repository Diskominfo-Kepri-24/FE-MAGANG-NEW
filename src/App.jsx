import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Absen from './pages/Absen';
import Kegiatan from './pages/Kegiatan';
import Laporan from './pages/Laporan';
import Penilaian from './pages/Penilaian';
import Riwayat from './pages/Riwayat';
import Pengaturan from './pages/Pengaturan';
import DataPeserta from './pages/DataPeserta';
import LihatAbsen from './pages/LihatAbsen';
import KegiatanPembimbing from './pages/KegiatanPembimbing';
import LaporanPembimbing from './pages/LaporanPembimbing';
import PenilaianPembimbing from './pages/PenilaianPembimbing';
import PengaturanPembimbing from './pages/PengaturanPembimbing';
import DashboardPembimbing from './components/DashboardPembimbing';
import DashboardMahasiswa from './components/DashboardMahasiswa';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DetailPresensi from './components/DetailPresensi';
import Aksipenilaian from './components/Aksipenilaian';

function App() {
  const location = useLocation();

  // Kondisi untuk menampilkan Sidebar dan Navbar kecuali di halaman login
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {!isLoginPage && <Sidebar />}
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/magang"
          element={
            <ProtectedRoute role="magang">
              <DashboardMahasiswa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/absen"
          element={
            <ProtectedRoute role="magang">
              <Absen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/kegiatan"
          element={
            <ProtectedRoute role="magang">
              <Kegiatan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/laporan"
          element={
            <ProtectedRoute role="magang">
              <Laporan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/penilaian"
          element={
            <ProtectedRoute role="magang">
              <Penilaian />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/riwayat"
          element={
            <ProtectedRoute role="magang">
              <Riwayat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pengaturan"
          element={
            <ProtectedRoute role="magang">
              <Pengaturan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pembimbing"
          element={
            <ProtectedRoute role="pembimbing">
              <DashboardPembimbing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/data-peserta"
          element={
            <ProtectedRoute role="pembimbing">
              <DataPeserta />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/lihat-absen"
          element={
            <ProtectedRoute role="pembimbing">
              <LihatAbsen />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/kegiatan-pembimbing"
          element={
            <ProtectedRoute role="pembimbing">
              <KegiatanPembimbing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/laporan-pembimbing"
          element={
            <ProtectedRoute role="pembimbing">
              <LaporanPembimbing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/penilaian-pembimbing"
          element={
            <ProtectedRoute role="pembimbing">
              <PenilaianPembimbing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/pengaturan-pembimbing"
          element={
            <ProtectedRoute role="pembimbing">
              <PengaturanPembimbing />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/data-peserta/presensi/:id"
          element={
            <ProtectedRoute role="pembimbing">
              <DetailPresensi />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/penilaian-pembimbing/nilai/:id/:action"
          element={
            <ProtectedRoute role="pembimbing">
              <Aksipenilaian />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
