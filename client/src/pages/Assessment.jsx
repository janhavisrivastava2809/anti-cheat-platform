import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import WebcamMonitor from "../components/WebcamMonitor";

const Assessment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [violations, setViolations] = useState([]);

  const questions = [
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "define", "variable", "int"],
    },
    {
      question: "Which method is used to add an element to an array?",
      options: ["push()", "add()", "insert()", "append()"],
    },
    {
      question: "Which symbol is used for strict equality?",
      options: ["=", "==", "===", "!="],
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Apple"],
    },
    {
      question: "Which method converts JSON into a JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.convert()",
        "JSON.object()",
        "JSON.toObject()",
      ],
    },
  ];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitAssessment();
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle webcam violations
  const handleViolation = (type) => {
    console.log("Violation detected:", type);

    setViolations((prev) => [
      ...prev,
      {
        type,
        time: new Date().toLocaleTimeString(),
      },
    ]);

    if (type === "NO_FACE") {
      console.warn("No face detected.");
    }

    if (type === "MULTIPLE_FACES") {
      console.warn("Multiple faces detected.");
    }
  };

  const submitAssessment = () => {
    alert("Assessment submitted successfully!");
    navigate("/student-dashboard");
  };

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer,
    });
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="assessment-page">

      {/* HEADER */}
      <header className="assessment-header">
        <div>
          <h2>VERIFEX</h2>
          <span>Secure Assessment</span>
        </div>

        <div className="timer">
          ⏱ {formatTime()}
        </div>
      </header>

      {/* MAIN */}
      <main className="assessment-main">

        {/* WEBCAM MONITOR */}
        <div className="webcam-section">
          <WebcamMonitor onViolation={handleViolation} />

          <div className="camera-status">
            <span className="status-dot"></span>
            Camera Monitoring Active
          </div>
        </div>

        {/* VIOLATION WARNING */}
        {violations.length > 0 && (
          <div className="violation-warning">
            ⚠️ Monitoring Alert: {violations[violations.length - 1].type}
          </div>
        )}

        {/* QUESTION HEADER */}
        <div className="question-header">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>

          <span>
            Answered: {Object.keys(answers).length}
          </span>
        </div>

        {/* QUESTION CARD */}
        <div className="question-card">

          <h2>
            {questions[currentQuestion].question}
          </h2>

          <div className="options">
            {questions[currentQuestion].options.map(
              (option, index) => (
                <button
                  key={index}
                  className={
                    answers[currentQuestion] === option
                      ? "option selected"
                      : "option"
                  }
                  onClick={() => handleAnswer(option)}
                >
                  <span>
                    {String.fromCharCode(65 + index)}
                  </span>

                  {option}
                </button>
              )
            )}
          </div>

        </div>

        {/* NAVIGATION */}
        <div className="question-navigation">

          <button
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion(currentQuestion - 1)
            }
          >
            ← Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              className="submit-btn"
              onClick={submitAssessment}
            >
              Submit Assessment
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentQuestion(currentQuestion + 1)
              }
            >
              Next →
            </button>
          )}

        </div>

      </main>
    </div>
  );
};

export default Assessment;