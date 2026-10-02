import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const AssessmentInstructions = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const assessments = {
    "js-basic": {
      title: "JavaScript Fundamentals",
      duration: 30,
      questions: 20,
      difficulty: "Beginner",
    },

    "mern-basic": {
      title: "MERN Stack Assessment",
      duration: 45,
      questions: 30,
      difficulty: "Intermediate",
    },

    aptitude: {
      title: "Technical Aptitude Test",
      duration: 40,
      questions: 25,
      difficulty: "Intermediate",
    },
  };

  const assessment = assessments[id];

  if (!assessment) {
    return (
      <div className="error-page">
        <h2>Assessment Not Found</h2>

        <button onClick={() => navigate("/student-dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="instructions-page">

      <div className="instructions-card">

        <div className="shield">
          🛡️
        </div>

        <h1>{assessment.title}</h1>

        <p className="subtitle">
          Secure Assessment Environment
        </p>

        <div className="assessment-summary">

          <div>
            <strong>{assessment.duration}</strong>
            <span>Minutes</span>
          </div>

          <div>
            <strong>{assessment.questions}</strong>
            <span>Questions</span>
          </div>

          <div>
            <strong>{assessment.difficulty}</strong>
            <span>Difficulty</span>
          </div>

        </div>

        <h2>Before You Begin</h2>

        <ul className="instructions-list">
          <li>Make sure you have a stable internet connection.</li>
          <li>Do not switch tabs during the assessment.</li>
          <li>Do not open developer tools.</li>
          <li>Do not copy or paste content.</li>
          <li>Keep your browser window active.</li>
          <li>The assessment timer will start once you begin.</li>
          <li>All security violations will be recorded.</li>
        </ul>

        <div className="warning-box">
          ⚠️ This is a monitored assessment. Your activity
          may be recorded for integrity verification.
        </div>

        <div className="instruction-buttons">

          <button
            className="secondary-btn"
            onClick={() =>
              navigate("/student-dashboard")
            }
          >
            ← Back
          </button>

          <button
            className="start-btn"
            onClick={() =>
              navigate(`/assessment/${id}/start`)
            }
          >
            Start Assessment →
          </button>

        </div>

      </div>

    </div>
  );
};

export default AssessmentInstructions;