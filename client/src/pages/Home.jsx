import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }} className="bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-black tracking-wider text-white">
              VERIFEX
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Sign In
            </button>
            {/* 1. GET STARTED BUTTON -> /get-started PAGE */}
            <button
              onClick={() => navigate('/get-started')}
              className="text-sm font-semibold px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ maxWidth: '950px', margin: '0 auto' }} className="flex-1 flex flex-col justify-center items-center px-6 py-16 text-center z-10 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide uppercase mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          Next-Gen AI Anti-Cheat Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Integrity-First Assessments.{' '}
          <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Zero Compromise.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          A robust assessment environment built to detect unauthorized browser activity, tab switching, and hardware interventions in real-time.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 w-full">
          {/* 2. LAUNCH PORTAL BUTTON -> SEEDHE /assessment-login PAGE */}
          <button
            onClick={() => navigate('/assessment-login')}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Launch Assessment Portal →
          </button>

          {/* 3. EXPLORE PROTECTION SPECS -> /protection-specs PAGE */}
          <button
            onClick={() => navigate('/protection-specs')}
            className="px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 font-medium text-sm transition-all cursor-pointer"
          >
            Explore Protection Specs
          </button>
        </div>

        {/* Feature Cards Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all">
            <div className="text-2xl mb-3">👁️</div>
            <h3 className="font-bold text-white text-base mb-1.5">Tab & Focus Guard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Detects window blur, tab switching, and dual-monitor multitasking with automated violation logging.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition-all">
            <div className="text-2xl mb-3">⌨️</div>
            <h3 className="font-bold text-white text-base mb-1.5">Clipboard Lockdown</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Restricts copy-paste events, keyboard shortcuts (Inspect Element, DevTools, Alt+Tab), and right-clicks.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-bold text-white text-base mb-1.5">Real-Time Proctoring</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Instant telemetry updates send test anomaly flags directly to the Admin Dashboard for evaluation.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Verifex Platform. Built with MERN Stack.
      </footer>
    </div>
  );
};

export default Home;