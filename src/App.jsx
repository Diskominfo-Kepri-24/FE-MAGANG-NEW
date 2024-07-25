import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Absen from "./pages/Absen";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/absen" element={<Absen />} />
      </Routes>
    </>
  );
}

export default App;
