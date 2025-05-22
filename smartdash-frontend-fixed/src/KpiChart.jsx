import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function KpiChart({ kpis = [] }) {
  if (!Array.isArray(kpis) || kpis.length === 0) return null;

  const data = {
    labels: kpis.map((kpi) => kpi.department),
    datasets: [
      {
        label: "🎯 Hedef",
        data: kpis.map((kpi) => Number(kpi.target)),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "✅ Gerçekleşen",
        data: kpis.map((kpi) => {
          const actual = Number(kpi.actual);
          return !isNaN(actual) ? actual : 0;
        }),
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (context) {
            const actual = context.raw;
            const target = Number(kpis[context.dataIndex]?.target || 0);
            const diff = actual - target;
            const isPassed = actual >= target;
            const baseLabel = `${context.dataset.label}: ${actual}`;
            return isPassed
              ? `${baseLabel} ✅ Hedef Aşıldı`
              : `${baseLabel} 🔻 ${Math.abs(diff)} eksik`;
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        KPI Karşılaştırmalı Bar Grafiği
      </h2>
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          height: "350px",
          margin: "0 auto",
        }}
      >
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default KpiChart;
