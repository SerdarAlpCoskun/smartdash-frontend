import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Kayıt Ol</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Kullanıcı Adı"
          value={form.username}
          onChange={handleChange}
          required
          className="border w-full p-2 rounded mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={form.password}
          onChange={handleChange}
          required
          className="border w-full p-2 rounded mb-2"
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="border w-full p-2 rounded mb-4"
        >
          <option value="user">Kullanıcı</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded">
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}

export default Signup;
