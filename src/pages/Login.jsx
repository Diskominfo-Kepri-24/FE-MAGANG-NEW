import logo from "../assets/logo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check for token and role on component mount
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "mahasiswa") {
        navigate("/dashboard/mahasiswa");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      }
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://192.168.43.229:8000/api/v1/login",
        loginData
      );

      const { access_token, role } = response.data;

      // Save access token to local storage
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "mahasiswa") {
        navigate("/dashboard/mahasiswa");
      } else if (role === "admin") {
        navigate("/dashboard/admin");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="h-screen bg-no-repeat bg-cover bg-hero-login">
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
        <div className="max-w-md mx-auto shadow-lg rounded-lg">
          <div className="p-10">
            <h2 className="text-center text-4xl font-bold mb-10 text-white" style={{ marginTop: '40px' }}>
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 text-center">
                <input
                  type="email"
                  name="email"
                  className="w-9/12 px-4 py-2 border rounded-3xl focus:outline-none focus:border-blue-500 bg-white bg-opacity-30 placeholder-white"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4 text-center">
                <input
                  type="password"
                  name="password"
                  className="w-9/12 px-4 py-2 border rounded-3xl focus:outline-none focus:border-blue-500 bg-white bg-opacity-30 placeholder-white"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}
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
              <a href="/register" className="text-blue-200">Click here to register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
