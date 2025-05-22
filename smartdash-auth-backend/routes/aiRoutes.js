const express = require('express');
const router = express.Router();
const { suggestKpis } = require('../controllers/aiController');

// POST /api/ai/suggestions
router.post('/suggestions', suggestKpis);

module.exports = router;
