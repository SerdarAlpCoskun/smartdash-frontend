const KPI = require("../models/Kpi");

const getAllKPIs = async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.json(kpis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createKPI = async (req, res) => {
  const { name, department, unit, target, actual, frequency } = req.body; // ✅ actual dahil
  try {
    const newKPI = new KPI({ name, department, unit, target, actual, frequency });
    await newKPI.save();
    res.status(201).json(newKPI);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateKPI = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedKPI = await KPI.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedKPI);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteKPI = async (req, res) => {
  const { id } = req.params;
  try {
    await KPI.findByIdAndDelete(id);
    res.json({ message: "KPI silindi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllKPIs,
  createKPI,
  updateKPI,
  deleteKPI,
};
