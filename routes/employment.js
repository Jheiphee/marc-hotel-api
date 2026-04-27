const express = require('express');
const router = express.Router();

const getEmployment = require('../functions/employment/getEmployment');
const searchEmployment = require('../functions/employment/searchEmployment');

// 🔹 GET ALL
router.get('/', async (req, res) => {
  try {
    const data = await getEmployment();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// 🔹 SEARCH
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    const data = await searchEmployment(q);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;