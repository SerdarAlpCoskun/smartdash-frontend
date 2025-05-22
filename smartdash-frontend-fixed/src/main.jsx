// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./NotificationContext"; // ← burası önemli
import "./index.css"; // tailwind stilleri

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <NotificationProvider> {/* 💡 Sadece App değil, tüm içerik bunun içinde olacak */}
        <App />
      </NotificationProvider>
    </BrowserRouter>
  </React.StrictMode>
);
