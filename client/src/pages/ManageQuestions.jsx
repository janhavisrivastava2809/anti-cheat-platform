import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const ManageQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [marks, setMarks] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Fetch assessment & questions
  const fetchAssessment = async () => {
    try {
      const res = await API.get(`/admin/assessments/${id}`);
      setAssessment(res.data.data);
    } catch (err) {
      alert('Failed to load assessment questions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssessment();
  }, [id]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (options.some((opt) => opt.trim() === '')) {
      return alert('Please fill in all 4 options.');
    }

    setSubmitting(true);
    try {
      await API.post(`/admin/assessments/${id}/questions`, {
        questionText,
        options,
        correctOptionIndex: Number(correctOptionIndex),
        marks: Number(marks),
      });

      // Reset form
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectOptionIndex(0);
      setMarks(1);

      fetchAssessment(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding question.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-slate-400 p-8">Loading assessment...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-xs text-indigo-400 hover:text-indigo-300 mb-4 inline-flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        <div className="flex justify-between items-baseline mb-6 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold">{assessment?.title}</h1>
            <p className="text-slate-400 text-sm">{assessment?.description || 'No description'}</p>
          </div>
          <div className="text-sm text-slate-400 font-mono">
            Total Questions: <span className="text-white font-bold">{assessment?.questions?.length || 0}</span> | 
            Marks: <span className="text-white font-bold">{assessment?.totalMarks || 0}</span>
          </div>
        </div>

        {/* Add Question Form */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 mb-8 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4">Add Multiple Choice Question (MCQ)</h2>
          <form onSubmit={handleAddQuestion} className="space-y-4">
            <div>
              <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Question Statement</label>
              <textarea
                rows="2"
                required
                placeholder="e.g., Which layer of the OSI model does IP address belong to?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {options.map((opt, idx) => (
                <div key={idx}>
                  <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">
                    Option {idx + 1}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={`Option ${idx + 1} value`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Correct Option</label>
                <select
                  value={correctOptionIndex}
                  onChange={(e) => setCorrectOptionIndex(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value={0}>Option 1</option>
                  <option value={1}>Option 2</option>
                  <option value={2}>Option 3</option>
                  <option value={3}>Option 4</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Marks for Question</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 disabled:opacity-60"
              >
                {submitting ? 'Adding...' : '+ Add Question'}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Questions List */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-white">Questions in this Test</h2>
          {assessment?.questions?.length === 0 ? (
            <p className="text-slate-500 text-sm">No questions added yet. Use the form above to add the first question.</p>
          ) : (
            <div className="space-y-4">
              {assessment?.questions?.map((q, qIndex) => (
                <div key={q._id || qIndex} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex justify-between items-start mb-3">
                    <p className="font-medium text-white text-sm">
                      <span className="text-indigo-400 font-bold mr-2">Q{qIndex + 1}.</span> {q.questionText}
                    </p>
                    <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 border border-slate-700">
                      {q.marks} Mark{q.marks > 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`text-xs px-3 py-2 rounded-lg border ${
                          oIdx === q.correctOptionIndex
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-medium'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="font-bold mr-1">({String.fromCharCode(65 + oIdx)})</span> {opt}
                        {oIdx === q.correctOptionIndex && '  ✓'}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageQuestions;