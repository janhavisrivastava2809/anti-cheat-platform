const express = require('express');
const router = express.Router();
const Violation = require('../models/Violation');

// Violation record karne ke liye
router.post('/log-violation', async (req, res) => {
  try {
    const { userId, assessmentId, violationType } = req.body;
    const newViolation = new Violation({ userId, assessmentId, violationType });
    await newViolation.save();

    // Total violations count check karein
    const count = await Violation.countDocuments({ userId, assessmentId });
    res.status(200).json({ success: true, totalViolations: count });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin dashboard ke liye report
router.get('/report/:userId/:assessmentId', async (req, res) => {
  try {
    const { userId, assessmentId } = req.params;
    const violations = await Violation.find({ userId, assessmentId }).sort({ timestamp: -1 });
    res.status(200).json({ success: true, violations, count: violations.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;