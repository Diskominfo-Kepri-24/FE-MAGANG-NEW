import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Absen from './pages/Absen';
import Kegiatan from './pages/Kegiatan';
import Laporan from './pages/Laporan';
import Penilaian from './pages/Penilaian';
import Riwayat from './pages/Riwayat';
import Pengaturan from './pages/Pengaturan';
import DataPeserta from './pages/DataPeserta';
import LihatAbsen from './pages/LihatAbsen';
import LaporanPembimbing from './pages/LaporanPembimbing';
import PenilaianPembimbing from './pages/PenilaianPembimbing';
import PengaturanPembimbing from './pages/PengaturanPembimbing';
import DashboardPembimbing from './components/DashboardPembimbing';
import DashboardMahasiswa from './components/DashboardMahasiswa';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/mahasiswa"
        element={
          <ProtectedRoute role="mahasiswa">
            <DashboardMahasiswa />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/absen"
        element={
          <ProtectedRoute role="mahasiswa">
            <Absen />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/kegiatan"
        element={
          <ProtectedRoute role="mahasiswa">
            <Kegiatan />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/laporan"
        element={
          <ProtectedRoute role="mahasiswa">
            <Laporan />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/penilaian"
        element={
          <ProtectedRoute role="mahasiswa">
            <Penilaian />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/riwayat"
        element={
          <ProtectedRoute role="mahasiswa">
            <Riwayat />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/pengaturan"
        element={
          <ProtectedRoute role="mahasiswa">
            <Pengaturan />
          </ProtectedRoute>
        }
      >
      </Route>

      
      <Route
        path="/dashboard/pembimbing"
        element={
          <ProtectedRoute role="pembimbing">
            <DashboardPembimbing />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/data-peserta"
        element={
          <ProtectedRoute role="pembimbing">
            <DataPeserta />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/lihat-absen"
        element={
          <ProtectedRoute role="pembimbing">
            <LihatAbsen />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/laporan-pembimbing"
        element={
          <ProtectedRoute role="pembimbing">
            <LaporanPembimbing />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/penilaian-pembimbing"
        element={
          <ProtectedRoute role="pembimbing">
            <PenilaianPembimbing />
          </ProtectedRoute>
        }
      >
      </Route>
      <Route
        path="/dashboard/pengaturan-pembimbing"
        element={
          <ProtectedRoute role="pembimbing">
            <PengaturanPembimbing />
          </ProtectedRoute>
        }
      >
      </Route>

        {/* <Route path="beranda" element={<Beranda />} />
        <Route path="absen" element={<Absen />} />
        <Route path="kegiatan" element={<Kegiatan />} />
        <Route path="laporan" element={<Laporan />} />
        <Route path="penilaian" element={<Penilaian />} />
        <Route path="riwayat" element={<Riwayat />} />
        <Route path="pengaturan" element={<Pengaturan />} /> */}
        {/* <Route path="beranda-pembimbing" element={<BerandaPembimbing />} />
        <Route path="data-peserta" element={<DataPeserta />} />
        <Route path="lihat-absen" element={<LihatAbsen />} />
        <Route path="laporan-pembimbing" element={<LaporanPembimbing />} />
        <Route path="penilaian-pembimbing" element={<PenilaianPembimbing />} />
        <Route path="pengaturan" element={<Pengaturan />} /> */}
    </Routes>
  );
}

export default App;
