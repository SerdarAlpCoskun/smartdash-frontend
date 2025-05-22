require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
mongoose.set("strictQuery", true);

// ✅ Middleware'ler
app.use(cors());
app.use(express.json());

// ✅ Route dosyalarını dahil et
const authRoutes = require("./routes/authRoutes");
const kpiRoutes = require("./routes/kpiRoutes");
const aiRoutes = require("./routes/aiRoutes");

// ✅ Route'lara yol tanımları
app.use("/api/auth", authRoutes);
app.use("/api/kpis", kpiRoutes);
app.use("/api/ai", aiRoutes);

// ✅ MongoDB bağlantısı ve sunucuyu başlat
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB bağlantısı başarılı");
    app.listen(process.env.PORT || 5000, () => {
      console.log(`✅ Sunucu ${process.env.PORT || 5000} portunda çalışıyor`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB bağlantı hatası:", err);
  });
