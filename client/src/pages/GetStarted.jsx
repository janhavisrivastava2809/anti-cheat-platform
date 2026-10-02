import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
  const navigate = useNavigate();
  const [systemChecked, setSystemChecked] = useState(false);
  const [checking, setChecking] = useState(false);

  // System Diagnostics Simulator
  const runSystemCheck = () => {
    setChecking(true);
    setTimeout(() => {
      setChecking(false);
      setSystemChecked(true);
    }, 1500);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }} className="bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-black tracking-wider text-white">VERIFEX</span>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-slate-400 hover:text-white px-4 py-2 rounded-lg border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto' }} className="flex-1 px-6 py-12 z-10 w-full flex flex-col items-center text-center justify-center">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-6">
          ✨ Onboarding & Role Selection
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
          How would you like to proceed?
        </h1>
        <p className="text-slate-400 max-w-xl text-sm sm:text-base mb-12">
          Choose your destination to begin your proctored assessment experience or manage platform settings.
        </p>

        {/* 3 Main Unique Portal Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left mb-12">
          
          {/* Card 1: Candidate / Student */}
          <div 
            onClick={() => navigate('/assessment-login')}
            className="group p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🎓</div>
              <h3 className="text-xl font-bold text-white mb-2">Student Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Enter your test credentials to start your proctored exam with real-time anti-cheat protection.
              </p>
            </div>
            <div className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 flex items-center gap-1">
              Enter Candidate Portal →
            </div>
          </div>

          {/* Card 2: Administrator */}
          <div 
            onClick={() => navigate('/login')}
            className="group p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/60 hover:bg-slate-900 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Admin Console</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                For educators and administrators to create assessments, manage questions, and view telemetry flags.
              </p>
            </div>
            <div className="text-xs font-semibold text-purple-400 group-hover:text-purple-300 flex items-center gap-1">
              Access Admin Console →
            </div>
          </div>

          {/* Card 3: Interactive Diagnostics */}
          <div className="group p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/60 hover:bg-slate-900 transition-all flex flex-col justify-between">
            <div>
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">Pre-Exam Check</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Test your browser compatibility, camera, clipboard, and tab-focus guards before taking a test.
              </p>
            </div>
            <div>
              {!systemChecked ? (
                <button
                  onClick={runSystemCheck}
                  disabled={checking}
                  className="w-full py-2.5 rounded-xl bg-cyan-600/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-600/30 font-semibold text-xs transition-all cursor-pointer"
                >
                  {checking ? "Checking Readiness..." : "Run Compatibility Test"}
                </button>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold text-center">
                  ✅ System Ready for Exam!
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Verifex Platform. Secured Environment.
      </footer>
    </div>
  );
};

export default GetStarted;