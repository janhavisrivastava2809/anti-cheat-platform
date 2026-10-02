const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getDashboardStats,
  createAssessment,
  getAssessments,
  getAssessmentById,
  addQuestion,
} = require('../controllers/adminController');

router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.route('/assessments').get(getAssessments).post(createAssessment);
router.route('/assessments/:id').get(getAssessmentById);
router.post('/assessments/:id/questions', addQuestion);

module.exports = router;