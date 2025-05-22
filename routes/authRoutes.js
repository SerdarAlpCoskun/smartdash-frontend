const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// ✅ Kayıt ol
router.post("/signup", register);

// ✅ Giriş yap
router.post("/login", login);

module.exports = router; // 🔥 Router NESNESİ döndürülmeli
