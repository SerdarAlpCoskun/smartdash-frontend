import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale
);

function LineChart({ kpis = [] }) {
  if (!Array.isArray(kpis) || kpis.length === 0) return null;

  const sortedKpis = [...kpis].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const data = {
    labels: sortedKpis.map(kpi => new Date(kpi.createdAt)),
    datasets: [
      {
        label: "🎯 Hedef",
        data: sortedKpis.map(kpi => kpi.target),
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        fill: true,
      },
      {
        label: "✅ Gerçekleşen",
        data: sortedKpis.map(kpi => kpi.actual || 0),
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.3)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          tooltipFormat: "dd MMM yyyy",
        },
        title: {
          display: true,
          text: "Tarih",
        },
      },
      y: {
        title: {
          display: true,
          text: "Değer",
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        KPI Zaman Serisi Grafiği
      </h2>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default LineChart;
