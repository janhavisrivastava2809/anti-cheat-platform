const mongoose = require('mongoose');

const ViolationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['TAB_SWITCH', 'FULLSCREEN_EXIT', 'NO_FACE', 'MULTIPLE_FACES', 'KEYBOARD_SHORTCUT'],
    required: true
  },
  timestamp: { type: Date, default: Date.now },
  severity: { type: Number, required: true }
});

const ExamSessionSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  examId: { type: String, required: true },
  integrityScore: { type: Number, default: 100 },
  violations: [ViolationSchema],
  status: { type: String, enum: ['IN_PROGRESS', 'SUBMITTED', 'DISQUALIFIED'], default: 'IN_PROGRESS' }
});

module.exports = mongoose.model('ExamSession', ExamSessionSchema);