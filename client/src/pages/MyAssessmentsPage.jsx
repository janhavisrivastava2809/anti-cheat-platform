import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyAssessmentsPage() {
  const navigate = useNavigate();

  const assessments = [
    { id: 'dsa', name: 'Data Structures & Algorithms', questions: 20, time: '30 Minutes', category: 'Technical', difficulty: 'Medium' },
    { id: 'web-dev', name: 'Web Development', questions: 25, time: '40 Minutes', category: 'Technical', difficulty: 'Easy' },
    { id: 'logical', name: 'Logical Reasoning', questions: 15, time: '20 Minutes', category: 'Aptitude', difficulty: 'Medium' },
    { id: 'dbms', name: 'Database Management Systems', questions: 20, time: '30 Minutes', category: 'Technical', difficulty: 'Hard' },
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/student-dashboard')}
        style={{ padding: '8px 16px', cursor: 'pointer', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        ← Back to Dashboard
      </button>

      <h2>My Assigned Assessments</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {assessments.map((item) => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px', background: '#fff' }}>
            <div>
              <h3 style={{ margin: '0 0 6px 0' }}>{item.name}</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
                {item.questions} Questions • {item.time}
              </p>
              <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{item.category}</span>
                <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: '4px', fontSize: '12px' }}>{item.difficulty}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate(`/assessment/${item.id}`)}
              style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer' }}
            >
              Start Assessment →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}