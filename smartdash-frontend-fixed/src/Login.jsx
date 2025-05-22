import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Giriş başarısız. Bilgileri kontrol edin.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/background-pattern.jpg')",
        backgroundColor: "#0f1c2e",
      }}
    >
      {/* ÜST LOGO BAR */}
      <div className="w-full py-6 bg-white bg-opacity-90 flex justify-center shadow-md">
        <img
          src="/smartiks-logo.png"
          alt="Smartiks"
          className="h-14 md:h-16"
        />
      </div>

      {/* ORTALANMIŞ FORM */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white bg-opacity-95 rounded-lg shadow-xl p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[#003366] mb-1">Smartdash Giriş</h1>
          <p className="text-sm text-gray-600 mb-6">
            Hoş geldiniz! Lütfen bilgilerinizi girin.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            <input
              type="text"
              name="username"
              placeholder="Kullanıcı Adı"
              value={formData.username}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded transition"
            >
              Giriş Yap
            </button>
          </form>

          <p className="text-sm mt-4">
            Hesabınız yok mu?{" "}
            <a href="/signup" className="text-orange-500 hover:underline">
              Kayıt Ol
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
