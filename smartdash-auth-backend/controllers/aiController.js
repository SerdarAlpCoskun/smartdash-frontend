// controllers/aiController.js

const suggestKpis = (req, res) => {
  const { department, currentKpis } = req.body;

  const kpiSuggestions = {
    "Satış": [
      "Dönüşüm Oranı",
      "Satış Başına Maliyet",
      "Müşteri Başına Gelir",
      "Yeni Müşteri Sayısı"
    ],
    "Pazarlama": [
      "Tıklama Oranı",
      "Lead Maliyeti",
      "Kampanya Başarı Oranı"
    ],
    "İK": [
      "Çalışan Devri",
      "Eğitim Saati",
      "Mülakat Başarı Oranı"
    ],
    "Finans": [
      "Kâr Marjı",
      "Nakit Akışı",
      "Bütçe Sapması"
    ]
  };

  const userKpis = currentKpis.map(kpi => kpi.toLowerCase());

  const suggestions = (kpiSuggestions[department] || []).filter(
    kpi => !userKpis.includes(kpi.toLowerCase())
  );

  res.status(200).json(suggestions);
};

module.exports = {
  suggestKpis,
};
