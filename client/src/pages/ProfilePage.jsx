import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/student-dashboard')}
        style={{ padding: '8px 16px', cursor: 'pointer', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ccc' }}
      >
        ← Back to Dashboard
      </button>

      <h2>Student Profile</h2>

      <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 'bold' }}>
            S
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Student</h3>
            <p style={{ margin: '4px 0 0 0', color: '#64748b' }}>student@example.com</p>
          </div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }} onSubmit={(e) => e.preventDefault()}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', color: '#475569', marginBottom: '5px' }}>Full Name</label>
            <input type="text" defaultValue="Student" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', color: '#475569', marginBottom: '5px' }}>Email Address</label>
            <input type="email" defaultValue="student@example.com" disabled style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f1f5f9' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', color: '#475569', marginBottom: '5px' }}>Role</label>
            <input type="text" defaultValue="Student Portal User" disabled style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f1f5f9' }} />
          </div>

          <button type="submit" style={{ padding: '10px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '10px' }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}