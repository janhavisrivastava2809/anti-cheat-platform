const Assessment = require('../models/Assessment');
const User = require('../models/User');

// @desc    Get admin dashboard metrics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    const totalAssessments = await Assessment.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });

    res.status(200).json({
      success: true,
      stats: {
        totalAssessments,
        totalStudents,
        flaggedViolations: 0, // Cheating module ke sath update hoga
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new assessment
// @route   POST /api/admin/assessments
// @access  Private (Admin only)
exports.createAssessment = async (req, res) => {
  try {
    const { title, description, duration, totalMarks } = req.body;

    const assessment = await Assessment.create({
      title,
      description,
      duration,
      totalMarks,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all assessments
// @route   GET /api/admin/assessments
// @access  Private (Admin only)
exports.getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: assessments.length, data: assessments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// @desc    Add a question to an assessment
// @route   POST /api/admin/assessments/:id/questions
// @access  Private (Admin)
exports.addQuestion = async (req, res) => {
  try {
    const { questionText, options, correctOptionIndex, marks } = req.body;
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ success: false, message: 'Assessment not found' });
    }

    const newQuestion = {
      questionText,
      options,
      correctOptionIndex: Number(correctOptionIndex),
      marks: Number(marks) || 1,
    };

    assessment.questions.push(newQuestion);
    // Recalculate total marks
    assessment.totalMarks = assessment.questions.reduce((acc, q) => acc + q.marks, 0);

    await assessment.save();

    res.status(201).json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single assessment with its questions
// @route   GET /api/admin/assessments/:id
// @access  Private (Admin)
exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ success: false, message: 'Assessment not found' });
    }
    res.status(200).json({ success: true, data: assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};