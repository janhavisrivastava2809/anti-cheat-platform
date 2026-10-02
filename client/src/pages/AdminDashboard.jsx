import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [stats, setStats] = useState({ totalAssessments: 0, totalStudents: 0, flaggedViolations: 0 });
  const [assessments, setAssessments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', duration: 30, totalMarks: 100 });
  const [loading, setLoading] = useState(false);

  // Fetch stats and assessments from backend
  const fetchData = async () => {
    try {
      const [statsRes, assessRes] = await Promise.all([
        API.get('/admin/stats'),
        API.get('/admin/assessments'),
      ]);
      setStats(statsRes.data.stats);
      setAssessments(assessRes.data.data);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/admin/assessments', formData);
      setShowModal(false);
      setFormData({ title: '', description: '', duration: 30, totalMarks: 100 });
      fetchData(); // Refresh list & stats
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛡️</span>
          <span className="font-bold tracking-wide">SecureAssess Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">Admin: <strong className="text-white">{user.name || 'Admin'}</strong></span>
          <button
            onClick={handleLogout}
            className="text-xs bg-slate-800 hover:bg-rose-600/20 hover:text-rose-400 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto p-8">
        {/* Title & Action */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
            <p className="text-slate-400 mt-1">Live metrics and test management</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
          >
            + Create Assessment
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Total Assessments</span>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalAssessments}</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Enrolled Students</span>
            <p className="text-3xl font-bold text-white mt-2">{stats.totalStudents}</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Flagged Violations</span>
            <p className="text-3xl font-bold text-rose-400 mt-2">{stats.flaggedViolations}</p>
          </div>
        </div>

        {/* Assessments List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Assessments</h2>
          {assessments.length === 0 ? (
            <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-2xl text-slate-500">
              No assessments created yet. Click "+ Create Assessment" above to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {assessments.map((test) => (
                <div
                  key={test._id}
                  className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg text-white">{test.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{test.description || 'No description provided'}</p>
                    <div className="flex gap-4 mt-3 text-xs text-slate-500 font-mono">
                      <span>⏱️ {test.duration} mins</span>
                      <span>🎯 {test.totalMarks} marks</span>
                      <span>📝 {test.questions?.length || 0} questions</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/admin/assessments/${test._id}/questions`)}
                    className="text-xs bg-indigo-600/20 hover:bg-indigo-600 hover:text-white text-indigo-400 border border-indigo-500/30 px-3.5 py-2 rounded-xl transition-all font-medium cursor-pointer"
                  >
                    Manage Questions →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal Popup for Creating Test */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Create New Assessment</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Computer Networks Midterm"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Description</label>
                <textarea
                  rows="2"
                  placeholder="Topics covered..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Duration (Mins)</label>
                  <input
                    type="number"
                    min="5"
                    required
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Total Marks</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({ ...formData, totalMarks: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-md shadow-indigo-600/20 cursor-pointer disabled:opacity-60"
                >
                  {loading ? 'Creating...' : 'Save Assessment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;