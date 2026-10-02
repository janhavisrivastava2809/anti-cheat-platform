import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResultsPage() {
  const navigate = useNavigate();

  const results = [
    { title: 'JavaScript Fundamentals', date: '20 Sep 2026', score: '85%', status: 'Passed' },
    { title: 'DBMS Assessment', date: '18 Sep 2026', score: '79%', status: 'Passed' },
    { title: 'Python Basics', date: '10 Sep 2026', score: '92%', status: 'Passed' },
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/student-dashboard')}
        style={{ padding: '8px 16px', cursor: 'pointer', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        ← Back to Dashboard
      </button>

      <h2>Assessment Results</h2>

      <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
        {results.map((res, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: index !== results.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
            <div>
              <h4 style={{ margin: '0 0 4px 0' }}>{res.title}</h4>
              <span style={{ color: '#64748b', fontSize: '13px' }}>Completed on {res.date}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ fontWeight: 'bold', color: '#16a34a', fontSize: '18px' }}>{res.score}</span>
              <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '20px', fontSize: '12px' }}>{res.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}