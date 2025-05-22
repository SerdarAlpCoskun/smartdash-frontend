// src/NotificationContext.jsx
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("info"); // info | success | error

  const showNotification = (msg, msgType = "info") => {
    setMessage(msg);
    setType(msgType);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {message && (
        <div
          className={`
            fixed top-6 right-6 z-50 px-5 py-3 rounded shadow-lg text-white font-medium
            ${type === "success" ? "bg-green-600"
            : type === "error" ? "bg-red-600"
            : "bg-blue-600"}
          `}
        >
          {message}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
