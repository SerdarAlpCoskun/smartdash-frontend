const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
mongoose.set("strictQuery", true);

// ✅ CORS AYARI
const corsOptions = {
  origin: ["http://localhost:5173", "https://smartdash-frontend.vercel.app"],
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ JSON desteği
app.use(express.json());

// ✅ Rotalar
const authRoutes = require("./routes/authRoutes");
const kpiRoutes = require("./routes/kpiRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/kpis", kpiRoutes);
app.use("/api/ai", aiRoutes);

// ✅ MongoDB Bağlantısı
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
