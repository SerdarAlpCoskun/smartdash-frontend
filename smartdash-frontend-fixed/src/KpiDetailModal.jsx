import { useEffect } from "react";
import { format } from "date-fns";

function KpiDetailModal({ kpi, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!kpi) return null;

  const ratio =
    kpi.target > 0 && typeof kpi.actual === "number"
      ? ((kpi.actual / kpi.target) * 100).toFixed(1)
      : "-";

  const durum =
    ratio === "-"
      ? "Veri Yok"
      : ratio >= 100
      ? "🎯 Hedef Aşıldı"
      : ratio >= 75
      ? "⚠️ İyi Gidiyor"
      : "❗ Geri Kalıyor";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
        >
          ×
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">{kpi.name}</h2>

          <div className="space-y-2 text-sm text-gray-800">
            <p><strong>Departman:</strong> {kpi.department}</p>
            <p><strong>Birim:</strong> {kpi.unit}</p>
            <p><strong>Hedef:</strong> {kpi.target}</p>
            <p><strong>Gerçekleşen:</strong> {kpi.actual || "-"}</p>
            <p><strong>Başarı Oranı:</strong> {ratio === "-" ? "-" : `${ratio}%`}</p>
            <p><strong>Durum:</strong> {durum}</p>
            <p><strong>Sıklık:</strong> {kpi.frequency}</p>
            <p><strong>Oluşturulma:</strong> {kpi.createdAt ? format(new Date(kpi.createdAt), "dd.MM.yyyy HH:mm") : "-"}</p>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KpiDetailModal;
