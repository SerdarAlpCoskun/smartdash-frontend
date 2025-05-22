const express = require("express");
const router = express.Router();
const {
  getAllKPIs,
  createKPI,
  updateKPI,
  deleteKPI,
} = require("../controllers/kpiController");

const verifyToken = require("../middleware/authMiddleware");

// 🔐 Bu endpoint artık sadece token ile erişilebilir
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Merhaba ${req.user.username}, bu gizli bir veri!` });
});

router.get("/", getAllKPIs);
router.post("/", createKPI);
router.put("/:id", updateKPI);
router.delete("/:id", deleteKPI);

module.exports = router;
