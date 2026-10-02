import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student")) || {
    name: "Student",
    email: "student@example.com",
  };

  const handleLogout = () => {
    localStorage.removeItem("student");
    navigate("/");
  };

  return (
    <div className="student-dashboard">
      <aside className="student-sidebar">
        <div className="dashboard-brand" style={{ cursor: "pointer" }} onClick={() => navigate("/student-dashboard")}>
          <div className="dashboard-logo">AC</div>
          <div>
            <h3>Assessment</h3>
            <span>Student Portal</span>
          </div>
        </div>

        {/* Sidebar Profile - Click karne par Profile page open hoga */}
        <div 
          className="student-profile" 
          onClick={() => navigate("/profile")} 
          style={{ cursor: "pointer" }}
        >
          <div className="student-avatar">
            {student.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{student.name}</strong>
            <span>Student</span>
          </div>
        </div>

        {/* Sidebar Navigation Menu */}
        <nav className="dashboard-menu">
          <button 
            className="menu-active" 
            onClick={() => navigate("/student-dashboard")}
          >
            <span>▣</span>
            Dashboard
          </button>

          <button onClick={() => navigate("/my-assessments")}>
            <span>📝</span>
            My Assessments
          </button>

          <button onClick={() => navigate("/results")}>
            <span>📊</span>
            Results
          </button>

          <button onClick={() => navigate("/profile")}>
            <span>👤</span>
            Profile
          </button>
        </nav>

        {/* Logout Button */}
        <button className="logout-button" onClick={handleLogout}>
          ↪ Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Welcome, {student.name.split(" ")[0]}! 👋</h1>
            <p>Here is your assessment overview.</p>
          </div>

          {/* Top Right Profile Section - Click karne par Profile open hoga */}
          <div 
            className="header-user" 
            onClick={() => navigate("/profile")} 
            style={{ cursor: "pointer" }}
          >
            <div className="header-avatar">
              {student.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{student.name}</strong>
              <span>{student.email}</span>
            </div>
          </div>
        </header>

        <section className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-icon blue">📝</div>
            <div>
              <span>Total Assessments</span>
              <strong>05</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">✓</div>
            <div>
              <span>Completed</span>
              <strong>02</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⏳</div>
            <div>
              <span>Pending</span>
              <strong>03</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon purple">🏆</div>
            <div>
              <span>Average Score</span>
              <strong>82%</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="assessment-section">
            <div className="section-title">
              <div>
                <h2>Available Assessments</h2>
                <p>Assessments assigned to you</p>
              </div>

              {/* View All Button */}
              <button onClick={() => navigate("/my-assessments")}>
                View All →
              </button>
            </div>

            <div className="assessment-list">
              {/* Card 1: DSA */}
              <div className="assessment-card">
                <div className="assessment-icon">💻</div>

                <div className="assessment-details">
                  <h3>Data Structures & Algorithms</h3>
                  <p>20 Questions • 30 Minutes</p>

                  <div className="assessment-tags">
                    <span>Technical</span>
                    <span>Medium</span>
                  </div>
                </div>

                <button
                  className="start-assessment"
                  onClick={() => navigate("/assessment/dsa")}
                >
                  Start Assessment →
                </button>
              </div>

              {/* Card 2: Web Dev */}
              <div className="assessment-card">
                <div className="assessment-icon">🌐</div>

                <div className="assessment-details">
                  <h3>Web Development</h3>
                  <p>25 Questions • 40 Minutes</p>

                  <div className="assessment-tags">
                    <span>Technical</span>
                    <span>Easy</span>
                  </div>
                </div>

                <button
                  className="start-assessment"
                  onClick={() => navigate("/assessment/web-dev")}
                >
                  Start Assessment →
                </button>
              </div>

              {/* Card 3: Logical Reasoning */}
              <div className="assessment-card">
                <div className="assessment-icon">🧠</div>

                <div className="assessment-details">
                  <h3>Logical Reasoning</h3>
                  <p>15 Questions • 20 Minutes</p>

                  <div className="assessment-tags">
                    <span>Aptitude</span>
                    <span>Medium</span>
                  </div>
                </div>

                <button
                  className="start-assessment"
                  onClick={() => navigate("/assessment/logical-reasoning")}
                >
                  Start Assessment →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Results Section */}
          <div className="recent-section">
            <div className="section-title">
              <div>
                <h2>Recent Results</h2>
                <p>Your latest performance</p>
              </div>
            </div>

            <div 
              className="result-card" 
              onClick={() => navigate("/results")}
              style={{ cursor: "pointer" }}
            >
              <div>
                <strong>JavaScript Fundamentals</strong>
                <span>Completed on 20 Sep 2026</span>
              </div>

              <div className="result-score">85%</div>
            </div>

            <div 
              className="result-card" 
              onClick={() => navigate("/results")}
              style={{ cursor: "pointer" }}
            >
              <div>
                <strong>DBMS Assessment</strong>
                <span>Completed on 18 Sep 2026</span>
              </div>

              <div className="result-score">79%</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;