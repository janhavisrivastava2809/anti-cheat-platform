import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectionSpecs = () => {
  const navigate = useNavigate();

  const specs = [
    {
      icon: "👁️",
      title: "Tab & Blur Detection",
      desc: "Tracks tab switching, window minimizing, and blurring during assessments."
    },
    {
      icon: "⌨️",
      title: "Clipboard Lockdown",
      desc: "Blocks Ctrl+C, Ctrl+V, inspect element, and right-clicks."
    },
    {
      icon: "🖥️",
      title: "Multi-Monitor Guard",
      desc: "Detects secondary screens and blocks multi-display usage."
    },
    {
      icon: "⚡",
      title: "Real-Time Telemetry",
      desc: "Sends violation flags directly to the proctoring dashboard."
    }
  ];

  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }} className="bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

      <header className="w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl">🛡️</span>
            <span className="text-xl font-black tracking-wider text-white">VERIFEX</span>
          </div>

          <button
            onClick={() => navigate('/assessment-login')}
            className="text-sm font-semibold px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Launch Portal →
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto' }} className="flex-1 px-6 py-12 z-10 w-full">
        <button
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-slate-400 hover:text-white mb-6 inline-flex items-center gap-2 cursor-pointer"
        >
          ← Back to Home
        </button>

        <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
          Protection Specifications
        </h1>
        <p className="text-slate-400 max-w-2xl mb-12 text-sm sm:text-base leading-relaxed">
          Detailed technical overview of security guards operating in real-time during Verifex proctored sessions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specs.map((item, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-indigo-500/40 transition-all">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Verifex Security Architecture.
      </footer>
    </div>
  );
};

// Line below fixes the syntax error
export default ProtectionSpecs;