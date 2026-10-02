import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const LaunchPortal = () => {
  const navigate = useNavigate();

  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPortal();
  }, []);

  const loadPortal = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/portal/info");

      if (response.data.success) {
        setPortal(response.data.data);
      } else {
        setError("Unable to load portal information.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    navigate("/assessment-login");
  };

  const handleHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="launch-loading">
        <div className="loading-spinner"></div>
        <h3>Loading Assessment Portal...</h3>
        <p>Please wait</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="launch-error">
        <div className="error-card">
          <div className="error-symbol">!</div>

          <h2>Unable to Load Portal</h2>

          <p>{error}</p>

          <button
            className="blue-button"
            onClick={loadPortal}
          >
            Try Again
          </button>

          <button
            className="text-button"
            onClick={handleHome}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="launch-portal">

      {/* NAVBAR */}

      <nav className="launch-navbar">

        <div className="brand-section">

          <div className="brand-logo">
            🛡
          </div>

          <div className="brand-text">
            <h2>AssessGuard</h2>
            <p>Secure Assessment Platform</p>
          </div>

        </div>

        <div className="system-status">
          <span className="status-circle"></span>
          System Operational
        </div>

      </nav>


      {/* HERO SECTION */}

      <section className="launch-hero">

        <div className="hero-content">

          <div className="hero-badge">
            <span>✦</span>
            SECURE ASSESSMENT ENVIRONMENT
          </div>

          <h1>
            Your Assessment.
            <br />
            <span>Fair &amp; Secure.</span>
          </h1>

          <p className="hero-description">
            Welcome to the secure assessment portal. Complete your
            examination in a monitored environment designed to ensure
            fairness, integrity and accurate evaluation.
          </p>

          <div className="hero-buttons">

            <button
              className="start-button"
              onClick={handleStart}
            >
              Enter Assessment Portal
              <span>→</span>
            </button>

            <button
              className="home-button"
              onClick={handleHome}
            >
              Back to Home
            </button>

          </div>

          <div className="trust-section">

            <div className="trust-item">
              <strong>100%</strong>
              <span>Secure Environment</span>
            </div>

            <div className="trust-item">
              <strong>24/7</strong>
              <span>Platform Availability</span>
            </div>

            <div className="trust-item">
              <strong>AI</strong>
              <span>Anti-Cheat Monitoring</span>
            </div>

          </div>

        </div>


        {/* SECURITY CARD */}

        <div className="security-wrapper">

          <div className="security-card">

            <div className="security-header">

              <div className="security-logo">
                🛡
              </div>

              <div>
                <small>PORTAL STATUS</small>
                <h3>Ready to Begin</h3>
              </div>

              <span className="ready-status"></span>

            </div>

            <div className="security-divider"></div>

            <div className="security-list">

              <div className="security-item">

                <div className="check-icon">✓</div>

                <div>
                  <h4>Secure Assessment</h4>
                  <p>Protected testing environment</p>
                </div>

              </div>


              <div className="security-item">

                <div className="check-icon">✓</div>

                <div>
                  <h4>Anti-Cheat Monitoring</h4>
                  <p>Assessment activity is monitored</p>
                </div>

              </div>


              <div className="security-item">

                <div className="check-icon">✓</div>

                <div>
                  <h4>Automatic Submission</h4>
                  <p>Your answers are safely recorded</p>
                </div>

              </div>

            </div>

            <div className="security-footer">
              🔒 Your assessment data is protected
            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features-section">

        <div className="section-title">

          <span>WHY ASSESSGUARD</span>

          <h2>Built for secure and fair assessments</h2>

          <p>
            Everything you need for a reliable online assessment
            experience.
          </p>

        </div>


        <div className="features-container">

          <div className="feature-card">

            <div className="feature-icon">
              🔐
            </div>

            <h3>Secure Assessment</h3>

            <p>
              Your assessment session is protected with
              secure examination controls.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              👁
            </div>

            <h3>Anti-Cheat Monitoring</h3>

            <p>
              Suspicious activities can be detected during
              the assessment session.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ⏱
            </div>

            <h3>Timed Assessment</h3>

            <p>
              Complete every assessment within its assigned
              time limit.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              📊
            </div>

            <h3>Accurate Evaluation</h3>

            <p>
              Assessment responses are recorded for reliable
              performance evaluation.
            </p>

          </div>

        </div>

      </section>


      {/* INSTRUCTIONS */}

      <section className="instructions-section">

        <div className="instructions-box">

          <div className="instructions-heading">

            <div className="warning-icon">
              !
            </div>

            <div>
              <span>IMPORTANT</span>
              <h2>Before You Begin</h2>
            </div>

          </div>


          <div className="instructions-grid">

            <div className="instruction">
              <span>01</span>
              <p>Make sure you have a stable internet connection.</p>
            </div>

            <div className="instruction">
              <span>02</span>
              <p>Do not refresh or close the assessment window.</p>
            </div>

            <div className="instruction">
              <span>03</span>
              <p>Do not switch tabs during the assessment.</p>
            </div>

            <div className="instruction">
              <span>04</span>
              <p>Keep your camera and microphone ready if required.</p>
            </div>

            <div className="instruction">
              <span>05</span>
              <p>Submit your assessment before the timer expires.</p>
            </div>

            <div className="instruction">
              <span>06</span>
              <p>Follow all assessment rules during the test.</p>
            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="final-section">

        <div>

          <span>READY TO BEGIN?</span>

          <h2>Start your assessment journey</h2>

          <p>
            Login to access your available assessments.
          </p>

        </div>

        <button
          onClick={handleStart}
        >
          Continue to Login →
        </button>

      </section>


      {/* FOOTER */}

      <footer className="launch-footer">

        <div>
          <strong>🛡 AssessGuard</strong>
          <span>Secure • Fair • Reliable</span>
        </div>

        <p>
          © 2026 Anti-Cheat Assessment Platform
        </p>

      </footer>

    </div>
  );
};

export default LaunchPortal;
