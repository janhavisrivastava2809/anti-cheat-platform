import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. React Router se useNavigate import karein
import './AssessmentLogin.css';

export default function AssessmentLogin() {
  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('••••••••••••');

  const navigate = useNavigate(); // 2. Navigate hook initialize karein

  const handleSubmit = (e) => {
    e.preventDefault();

    // 3. Button click hone par Student Dashboard page khulega
    navigate('/student-dashboard'); 
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8s0 0 0 0z" />
            </svg>
          </div>
          <span className="brand-name">VERIFEX</span>
        </div>

        {/* Titles */}
        <h1 className="portal-title">Assessment Portal</h1>
        <p className="portal-subtitle">Please enter your credentials to proceed</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
              required
            />
          </div>

          <div className="input-field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            <span>Enter Assessment Portal</span>
            <span className="btn-arrow">→</span>
          </button>
        </form>

        {/* Footer Link Inside Box */}
        <div className="box-footer">
          <a href="/" className="back-link">
            ← Back to Home
          </a>
        </div>

      </div>
    </div>
  );
}