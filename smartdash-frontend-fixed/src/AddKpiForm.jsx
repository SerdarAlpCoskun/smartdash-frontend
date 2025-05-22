import { useState, useEffect } from "react";
import axios from "axios";
import { useNotification } from "./NotificationContext";

function AddKpiForm({ onSuccess, kpiToEdit, clearEdit }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    unit: "",
    target: "",
    actual: "",
    frequency: "monthly",
  });

  const { showNotification } = useNotification();

  // Düzenleme modunda formu doldur
  useEffect(() => {
    if (kpiToEdit) {
      setForm({
        name: kpiToEdit.name || "",
        department: kpiToEdit.department || "",
        unit: kpiToEdit.unit || "",
        target: kpiToEdit.target || "",
        actual: kpiToEdit.actual || "",
        frequency: kpiToEdit.frequency || "monthly",
      });
    }
  }, [kpiToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = kpiToEdit
        ? `http://localhost:5000/api/kpis/${kpiToEdit._id}`
        : "http://localhost:5000/api/kpis";
      const method = kpiToEdit ? "put" : "post";

      await axios[method](url, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showNotification(
        kpiToEdit ? "✅ KPI başarıyla güncellendi!" : "✅ KPI başarıyla eklendi!",
        "success"
      );

      onSuccess(); // Listeyi güncelle
      setForm({
        name: "",
        department: "",
        unit: "",
        target: "",
        actual: "",
        frequency: "monthly",
      });
      clearEdit && clearEdit(); // Düzenleme modunu kapat
    } catch (err) {
      console.error("Hata oluştu:", err);
      showNotification("❌ Bir hata oluştu, lütfen tekrar deneyin.", "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row flex-wrap gap-3 items-start md:items-end"
    >
      <input
        type="text"
        name="name"
        placeholder="KPI Adı"
        value={form.name}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full md:w-48"
      />
      <input
        type="text"
        name="department"
        placeholder="Departman"
        value={form.department}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full md:w-48"
      />
      <input
        type="text"
        name="unit"
        placeholder="Birim"
        value={form.unit}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full md:w-32"
      />
      <input
        type="number"
        name="target"
        placeholder="Hedef"
        value={form.target}
        onChange={handleChange}
        required
        className="border p-2 rounded w-full md:w-32"
      />
      <input
        type="number"
        name="actual"
        placeholder="Gerçekleşen"
        value={form.actual}
        onChange={handleChange}
        className="border p-2 rounded w-full md:w-32"
      />
      <select
        name="frequency"
        value={form.frequency}
        onChange={handleChange}
        className="border p-2 rounded w-full md:w-32"
      >
        <option value="monthly">Aylık</option>
        <option value="quarterly">Üç Aylık</option>
        <option value="yearly">Yıllık</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        {kpiToEdit ? "Güncelle" : "Ekle"}
      </button>
    </form>
  );
}

export default AddKpiForm;
