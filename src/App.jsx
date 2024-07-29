/* eslint-disable-next-line no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PembimbingSidebar from './components/PembimbingSidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Beranda from './pages/Beranda';
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

function LayoutSidebar({ sidebar: SidebarComponent, navbar: NavbarComponent }) {
  return (
    <div className="flex h-screen">
      <SidebarComponent />
      <div className="flex flex-col flex-1 ml-64">
        <NavbarComponent />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

LayoutSidebar.propTypes = {
  sidebar: PropTypes.elementType.isRequired,
  navbar: PropTypes.elementType.isRequired,
};

function App() {
  const location = useLocation();

  // Example to get user role; replace with actual implementation
  const userRole = location.state?.role || 'Peserta Magang'; // or 'Pembimbing Lapangan'

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          userRole === 'Pembimbing Lapangan' ? (
            <LayoutSidebar sidebar={PembimbingSidebar} navbar={Navbar} />
          ) : (
            <LayoutSidebar sidebar={Sidebar} navbar={Navbar} />
          )
        }
      >
        <Route path="beranda" element={<Beranda />} />
        <Route path="absen" element={<Absen />} />
        <Route path="kegiatan" element={<Kegiatan />} />
        <Route path="laporan" element={<Laporan />} />
        <Route path="penilaian" element={<Penilaian />} />
        <Route path="riwayat" element={<Riwayat />} />
        <Route path="pengaturan" element={<Pengaturan />} />
        <Route path="data-peserta" element={<DataPeserta />} />
        <Route path="lihat-absen" element={<LihatAbsen />} />
        <Route path="laporan-pembimbing" element={<LaporanPembimbing />} />
        <Route path="penilaian-pembimbing" element={<PenilaianPembimbing />} />
      </Route>
    </Routes>
  );
}

export default App;
