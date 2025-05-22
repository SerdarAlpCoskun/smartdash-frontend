const mongoose = require("mongoose");

const kpiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  unit: { type: String, default: "" },
  target: { type: Number, required: true },
  actual: { type: Number, default: 0 }, // ✅ BUNU EKLE
  frequency: {
    type: String,
    enum: ["daily", "weekly", "monthly"],
    default: "monthly",
    comment: { type: String, default: "" }, // yeni alan

  }
}, { timestamps: true });

module.exports = mongoose.model("KPI", kpiSchema);
