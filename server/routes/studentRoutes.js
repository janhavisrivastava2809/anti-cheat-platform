const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAvailableAssessments,
  startAssessment,
} = require('../controllers/studentController');

router.use(protect);

router.get('/assessments', getAvailableAssessments);
router.get('/assessments/:id/start', startAssessment);

module.exports = router;