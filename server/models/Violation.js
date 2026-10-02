const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  assessmentId: { type: String, required: true },
  violationType: { 
    type: String, 
    enum: ['TAB_SWITCH', 'FULLSCREEN_EXIT', 'DEVTOOLS_OPEN', 'FACE_NOT_DETECTED', 'MULTIPLE_FACES'],
    required: true 
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Violation', violationSchema);