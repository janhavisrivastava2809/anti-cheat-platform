const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true,
  },
  options: {
    type: [String],
    validate: [val => val.length >= 2, 'At least 2 options are required'],
    required: true,
  },
  correctOptionIndex: {
    type: Number, // 0, 1, 2, or 3
    required: [true, 'Correct option index is required'],
  },
  marks: {
    type: Number,
    default: 1,
  },
});

const assessmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a test title'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    duration: {
      type: Number, // in minutes
      required: [true, 'Please specify test duration in minutes'],
    },
    totalMarks: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questions: [questionSchema], // Array of MCQs
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assessment', assessmentSchema);