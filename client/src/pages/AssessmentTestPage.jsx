import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function AssessmentTestPage() {
  const { testId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Assessment Mode Activated</h2>
      <p style={{ color: '#64748b' }}>Test ID: <strong>{testId}</strong></p>

      <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0', margin: '20px 0' }}>
        <h3>Instructions:</h3>
        <ul style={{ textAlign: 'left', color: '#475569', lineHeight: '1.8' }}>
          <li>Do not switch tabs during the assessment (Anti-Cheat Active).</li>
          <li>Ensure stable internet connection.</li>
          <li>Total Duration: 30 Minutes.</li>
        </ul>

        <button 
          onClick={() => alert("Test Started!")}
          style={{ padding: '12px 24px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', marginTop: '15px' }}
        >
          Begin Test Now
        </button>
      </div>

      <button 
        onClick={() => navigate('/student-dashboard')}
        style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #ccc', borderRadius: '6px', cursor: 'pointer' }}
      >
        Cancel & Exit
      </button>
    </div>
  );
}