export default function Navbar() {
  return (
    <>
      <style>{`body { overflow: hidden; }`}</style>
      <header className="bg-gray-800 fixed top-0 left-52 right-0 text-white p-4 flex items-center z-10">
        <img
          src="/src/assets/logo.png"
          alt="Logo"
          className="h-14 w-14 rounded-full border-4 border-white"
        />
        <div className="ml-4">
          <h2 className="text-xl font-bold">Portal Magang</h2>
          <h3 className="text-lg font-bold" style={{ color: '#8bd9ff' }}>
            Dinas Komunikasi dan Informatika Provinsi Kepulauan Riau
          </h3>
        </div>
      </header>
      <div className="ml-52 pt-20">
        {/* Main content goes here */}
      </div>
    </>
  );
}
