const express = require('express');
const router = express.Router();
const { exportToPDF, exportToWord } = require('../controllers/exportController');

// POST /api/export/pdf
router.post('/pdf', exportToPDF);

// POST /api/export/word
router.post('/word', exportToWord);

module.exports = router;