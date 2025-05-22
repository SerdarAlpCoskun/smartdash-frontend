import { useEffect, useState } from "react";
import axios from "axios";
import AddKpiForm from "./AddKpiForm";
import KpiChart from "./KpiChart";
import { format } from "date-fns";
import { CSVLink } from "react-csv";
import KpiDetailModal from "./KpiDetailModal";
import { useNavigate } from "react-router-dom";
import KpiAssistant from "./KpiAssistant";

function Dashboard({ username, role }) {
  const [kpis, setKpis] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("desc");
  const [kpiToEdit, setKpiToEdit] = useState(null);
  const [selectedKpi, setSelectedKpi] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchKpis = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/kpis", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKpis(res.data);
    } catch (err) {
      console.error("Veriler alınamadı:", err);
      setError("KPI verileri yüklenemedi.");
    }
  };

  useEffect(() => {
    fetchKpis();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu KPI silinsin mi?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/kpis/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchKpis();
    } catch (err) {
      alert("Silme başarısız.");
    }
  };

  const handleEdit = (kpi) => setKpiToEdit(kpi);
  const handleView = (kpi) => setSelectedKpi(kpi);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getArrow = (field) =>
    sortField === field ? (sortDirection === "asc" ? "▲" : "▼") : "";

  const filteredKpis = kpis
    .filter((kpi) =>
      [kpi.name, kpi.department, kpi.frequency]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (typeof valA === "string") {
        return sortDirection === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortDirection === "asc" ? valA - valB : valB - valA;
    });

  const csvHeaders = [
    { label: "KPI Adı", key: "name" },
    { label: "Departman", key: "department" },
    { label: "Hedef", key: "target" },
    { label: "Gerçekleşen", key: "actual" },
    { label: "Birim", key: "unit" },
    { label: "Sıklık", key: "frequency" },
    { label: "Tarih", key: "createdAt" },
  ];

  const csvData = filteredKpis.map((kpi) => ({
    ...kpi,
    createdAt: kpi.createdAt
      ? format(new Date(kpi.createdAt), "dd.MM.yyyy HH:mm")
      : "-",
  }));

  const getDurumRozeti = (oran) => {
    if (oran === "-") return <span className="text-gray-400">Yok</span>;
    const value = parseFloat(oran);
    if (value >= 100)
      return <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-xs">🎯 Hedef Aşıldı</span>;
    if (value >= 75)
      return <span className="text-yellow-800 bg-yellow-100 px-2 py-1 rounded text-xs">⚠️ İyi Gidiyor</span>;
    return <span className="text-red-700 bg-red-100 px-2 py-1 rounded text-xs">❗ Geri Kalıyor</span>;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 relative">
      
      {/* Sağ üst köşeye sabit KPI Asistanı */}
      <div className="hidden md:block absolute top-6 right-6 z-10">
        <KpiAssistant currentKpis={kpis.map(kpi => kpi.name)} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-blue-700">
            SmartDash
            KPI Yönetim Paneli 
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Çıkış Yap
          </button>
        </div>

        {role === "admin" && (
  <div className="bg-white p-6 rounded shadow-md mb-6">

            <h2 className="text-xl font-semibold mb-4">
              {kpiToEdit ? "KPI Güncelle" : "Yeni KPI Ekle"}
            </h2>
            <AddKpiForm
              onSuccess={fetchKpis}
              kpiToEdit={kpiToEdit}
              clearEdit={() => setKpiToEdit(null)}
            />
          </div>
        )}

        <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-6">
          <input
            type="text"
            placeholder="Ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded w-full md:w-1/2"
          />
          <CSVLink
            data={csvData}
            headers={csvHeaders}
            filename="kpi-raporu.csv"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow text-center"
          >
            CSV İndir
          </CSVLink>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {filteredKpis.length === 0 ? (
          <p className="text-center text-gray-500">Kayıt bulunamadı.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded mb-6">
            <table className="min-w-full text-sm text-left text-gray-800">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>
                    Ad {getArrow("name")}
                  </th>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("department")}>
                    Departman {getArrow("department")}
                  </th>
                  <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("target")}>
                    Hedef {getArrow("target")}
                  </th>
                  <th className="px-4 py-3">Gerçekleşen</th>
                  <th className="px-4 py-3">Oran</th>
                  <th className="px-4 py-3">Durum</th>
                  <th className="px-4 py-3">Birim</th>
                  <th className="px-4 py-3">Sıklık</th>
                  <th className="px-4 py-3">Tarih</th>
                  {role === "admin" && <th className="px-4 py-3 text-center">İşlem</th>}
                </tr>
              </thead>
              <tbody>
                {filteredKpis.map((kpi) => {
                  const target = Number(kpi.target);
                  const actual = Number(kpi.actual);
                  const oran =
                    target > 0 && typeof actual === "number"
                      ? ((actual / target) * 100).toFixed(1)
                      : "-";
                  return (
                    <tr
                      key={kpi._id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleView(kpi)}
                    >
                      <td className="px-4 py-3">{kpi.name}</td>
                      <td className="px-4 py-3">{kpi.department}</td>
                      <td className="px-4 py-3">{kpi.target}</td>
                      <td className="px-4 py-3">{actual || "-"}</td>
                      <td className="px-4 py-3">{oran === "-" ? "-" : `${oran}%`}</td>
                      <td className="px-4 py-3">{getDurumRozeti(oran)}</td>
                      <td className="px-4 py-3">{kpi.unit}</td>
                      <td className="px-4 py-3">{kpi.frequency}</td>
                      <td className="px-4 py-3">
                        {kpi.createdAt
                          ? format(new Date(kpi.createdAt), "dd.MM.yyyy HH:mm")
                          : "-"}
                      </td>
                      {role === "admin" && (
                        <td
                          className="px-4 py-3 flex gap-2 justify-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => handleEdit(kpi)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                          >
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(kpi._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Sil
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <KpiChart kpis={filteredKpis} />
        {selectedKpi && (
          <KpiDetailModal kpi={selectedKpi} onClose={() => setSelectedKpi(null)} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
