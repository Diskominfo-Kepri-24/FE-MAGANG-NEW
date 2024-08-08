import { NavLink, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  ClipboardDocumentIcon, 
  DocumentTextIcon, 
  StarIcon, 
  ArrowLeftOnRectangleIcon, 
  CogIcon, 
  DocumentChartBarIcon, 
  UserIcon 
} from '@heroicons/react/24/outline';

export default function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 100);
  };

  const commonSidebarContent = (
    <>
      <div className="p-4 flex flex-col items-center border-b border-gray-700">
        <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full mb-2">
          <UserIcon className="h-16 w-16 text-gray-800" />
        </div>
        <div className="text-center mb-2">
          <p className="text-xs font-bold capitalize">{name}</p>
          <p className="text-xs text-gray-400 capitalize">{role}</p>
        </div>
      </div>
    </>
  );

  const magangSidebar = (
    <aside className="fixed top-0 left-0 w-52 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
      <div className="flex flex-col flex-1">
        {commonSidebarContent}
        <nav className="mt-4 flex-1">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <HomeIcon className="h-5 w-5" />
              <NavLink to="/dashboard/magang" className="ml-3 text-sm text-white hover:text-blue-300">
                Beranda
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <CalendarIcon className="h-5 w-5" />
              <NavLink to="/dashboard/absen" className="ml-3 text-sm text-white hover:text-blue-300">
                Absen
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <ClipboardDocumentIcon className="h-5 w-5" />
              <NavLink to="/dashboard/kegiatan" className="ml-3 text-sm text-white hover:text-blue-300">
                Kegiatan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentTextIcon className="h-5 w-5" />
              <NavLink to="/dashboard/laporan" className="ml-3 text-sm text-white hover:text-blue-300">
                Laporan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <StarIcon className="h-5 w-5" />
              <NavLink to="/dashboard/penilaian" className="ml-3 text-sm text-white hover:text-blue-300">
                Penilaian
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentChartBarIcon className="h-5 w-5" />
              <NavLink to="/dashboard/riwayat" className="ml-3 text-sm text-white hover:text-blue-300">
                Riwayat
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <CogIcon className="h-5 w-5" />
              <NavLink to="/dashboard/pengaturan" className="ml-3 text-sm text-white hover:text-blue-300">
                Pengaturan
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span className="ml-3 text-sm text-white hover:text-blue-300">Logout</span>
        </li>
      </div>
    </aside>
  );

  const pembimbingSidebar = (
    <aside className="fixed top-0 left-0 w-52 bg-gray-800 text-white h-screen overflow-y-auto flex flex-col">
      <div className="flex flex-col flex-1">
        {commonSidebarContent}
        <nav className="mt-4 flex-1">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <HomeIcon className="h-5 w-5" />
              <NavLink to="/dashboard/pembimbing" className="ml-3 text-sm text-white hover:text-blue-300">
                Beranda
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <UserIcon className="h-5 w-5" />
              <NavLink to="/dashboard/data-peserta" className="ml-3 text-sm text-white hover:text-blue-300">
                Data Peserta
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <DocumentTextIcon className="h-5 w-5" />
              <NavLink to="/dashboard/laporan-pembimbing" className="ml-3 text-sm text-white hover:text-blue-300">
                Data Laporan
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <StarIcon className="h-5 w-5" />
              <NavLink to="/dashboard/penilaian-pembimbing" className="ml-3 text-sm text-white hover:text-blue-300">
                Penilaian
              </NavLink>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-700">
              <CogIcon className="h-5 w-5" />
              <NavLink to="/dashboard/pengaturan-pembimbing" className="ml-3 text-sm text-white hover:text-blue-300">
                Pengaturan
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-700 mt-auto">
        <li className="flex items-center p-2 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
          <span className="ml-3 text-sm text-white hover:text-blue-300">Logout</span>
        </li>
      </div>
    </aside>
  );

  return role === "magang" ? magangSidebar : pembimbingSidebar;
}
