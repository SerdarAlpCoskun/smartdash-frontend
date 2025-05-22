import React, { useState } from 'react';
import axios from 'axios';

const KpiAssistant = ({ currentKpis }) => {
  const [department, setDepartment] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSuggest = async () => {
    if (!department) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/ai/suggestions', {
        department,
        currentKpis,
      });
      setSuggestions(res.data);
    } catch (err) {
      console.error('❌ Öneri alınamadı:', err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">🎯 KPI Asistanı</h2>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="">Departman Seçin</option>
        <option value="Satış">Satış</option>
        <option value="Pazarlama">Pazarlama</option>
        <option value="İK">İK</option>
        <option value="Finans">Finans</option>
      </select>

      <button
        onClick={handleSuggest}
        disabled={!department || loading}
        className="bg-indigo-500 text-white w-full py-2 rounded hover:bg-indigo-600 disabled:opacity-50"
      >
        {loading ? 'Yükleniyor...' : 'KPI Önerisi Al'}
      </button>

      {/* Önerilen KPI'ları göster */}
      {suggestions.length > 0 && (
        <div className="mt-4 bg-gray-50 p-4 rounded border border-gray-300">
          <h3 className="font-semibold mb-2">✅ Önerilen KPI’lar:</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default KpiAssistant;
