import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // 'student' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Change Password Modal States
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeLoading, setChangeLoading] = useState(false);
  const [changeSuccess, setChangeSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Main Login
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    }, 1200);
  };

  // Handle Change Password Submission
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Validations
    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('New password & Confirm password do not match!');
      return;
    }

    setChangeLoading(true);

    // Simulated API Call to update password
    setTimeout(() => {
      setChangeLoading(false);
      setChangeSuccess(true);
    }, 1500);
  };

  // Reset Change Password Modal State
  const openModal = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrorMsg('');
    setChangeSuccess(false);
    setIsChangeOpen(true);
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0 }} className="bg-slate-950 text-slate-100 flex flex-col justify-center items-center relative overflow-x-hidden p-4">
      
      {/* Background Accent Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-indigo-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-2 cursor-pointer transition-colors bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg z-20"
      >
        ← Back to Home
      </button>

      {/* Login Card Container */}
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800/90 rounded-3xl p-8 backdrop-blur-xl shadow-2xl shadow-indigo-950/40 z-10 relative">
        
        {/* Top Glow Accent Bar */}
        <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 mb-3 text-3xl shadow-inner">
            🛡️
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white">
            Welcome to Verifex
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Sign in to access your proctored dashboard
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1.5 bg-slate-950/80 border border-slate-800/80 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              role === 'student'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🎓 Candidate
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              role === 'admin'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ⚡ Admin
          </button>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email / ID Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Email Address / User ID
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@verifex.com"
              className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Password
              </label>
              
              {/* Change Password Button */}
              <button
                type="button"
                onClick={openModal}
                className="text-[11px] font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                Change password?
              </button>
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
            />
            <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer select-none">
              Keep me signed in
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              `Sign In as ${role === 'admin' ? 'Admin' : 'Candidate'} →`
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
          <p className="text-xs text-slate-400">
            Don't have credentials?{' '}
            <span 
              onClick={() => navigate('/assessment-login')}
              className="text-indigo-400 hover:underline cursor-pointer font-medium"
            >
              Enter Assessment Passcode
            </span>
          </p>
        </div>
      </div>

      {/* ================= CHANGE PASSWORD MODAL ================= */}
      {isChangeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button
              onClick={() => setIsChangeOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center text-sm cursor-pointer"
            >
              ✕
            </button>

            {!changeSuccess ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-2xl flex items-center justify-center mx-auto mb-3">
                    🔐
                  </div>
                  <h3 className="text-xl font-bold text-white">Update Your Password</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your old password to authorize setting up a new password.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                  {/* Old Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current (Old) Password
                    </label>
                    <input
                      type="password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={changeLoading}
                    className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
                  >
                    {changeLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      "Update Password →"
                    )}
                  </button>
                </form>
              </>
            ) : (
              /* Success Screen */
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-3xl flex items-center justify-center mx-auto mb-4">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Password Updated!</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Your password has been changed successfully. You can now log in using your new password.
                </p>
                <button
                  onClick={() => setIsChangeOpen(false)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
                >
                  Back to Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <p className="mt-8 text-xs text-slate-500 relative z-10">
        © {new Date().getFullYear()} Verifex Platform. Encrypted Session.
      </p>
    </div>
  );
};

export default Login;