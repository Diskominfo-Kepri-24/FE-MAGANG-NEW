import logo from "../assets/logo.png";

export default function Login() {
  return (
    <>
      <div className="h-screen bg-no-repeat bg-cover bg-hero-login ">
        <div className="flex flex-col md:flex-row text-center items-center md:text-start md:items-start p-4">
          <img src={logo} alt="Logo" className="w-[100px] mb-4 text-center" />
          <div className="flex flex-col ml-4 mt-4">
            <h2 className="text-xl font-bold text-white">
              Halo, Selamat Datang di Website Pelayanan Magang
            </h2>
            <h3 className="text-lg font-bold text-blue-300">
              Dinas Komunikasi dan Informatika Kepulauan Riau
            </h3>
          </div>
        </div>
        <div className="container mx-auto p-4">
          <div className="max-w-md mx-auto  shadow-lg rounded-lg">
            <div className="p-6">
              <h2 className="text-center text-2xl font-bold mb-4 text-white">
                Login
              </h2>
              <form>
                <div className="mb-4 text-center">
                  <input
                    type="text"
                    name="login"
                    className="w-9/12 px-4 py-2 border rounded-3xl focus:outline-none focus:border-blue-500 bg-white bg-opacity-30 placeholder-gray-700"
                    placeholder="Username or Email"
                    required
                  />
                </div>
                <div className="mb-4 text-center">
                  <input
                    type="password"
                    name="password"
                    className="w-9/12 px-4 py-2 border rounded-3xl  focus:outline-none focus:border-blue-500 bg-white bg-opacity-30 placeholder-gray-700"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-9/12 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-700 transition duration-300"
                  >
                    Login
                  </button>
                </div>
              </form>
              <p className="font-normal text-center text-white text-sm">
                Don’t Have Account?{" "}
                <span className="text-blue-200">Click here to register</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
