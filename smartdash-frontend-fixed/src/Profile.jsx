import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function Profile() {
  const [user, setUser] = useState({ username: "", role: "", loginTime: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        username: decoded.username,
        role: decoded.role,
        loginTime: new Date(decoded.iat * 1000).toLocaleString(),
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">👤 Profil Bilgileri</h2>
        <div className="space-y-4 text-sm">
          <p><strong>Kullanıcı Adı:</strong> {user.username}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p><strong>Giriş Zamanı:</strong> {user.loginTime}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
