const Assessment = require('../models/Assessment');

// @desc    Get all active assessments for students
// @route   GET /api/student/assessments
// @access  Private (Student)
exports.getAvailableAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ isActive: true })
      .select('title description duration totalMarks createdAt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: assessments.length,
      data: assessments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Start test & get sanitized questions (Correct options stripped out)
// @route   GET /api/student/assessments/:id/start
// @access  Private (Student)
exports.startAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment || !assessment.isActive) {
      return res.status(404).json({ success: false, message: 'Assessment not found or inactive' });
    }

    // Anti-Cheat Measure: correctOptionIndex frontend par nahi bhejna
    const sanitizedQuestions = assessment.questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
      marks: q.marks,
    }));

    res.status(200).json({
      success: true,
      data: {
        _id: assessment._id,
        title: assessment.title,
        duration: assessment.duration,
        totalMarks: assessment.totalMarks,
        questions: sanitizedQuestions,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};