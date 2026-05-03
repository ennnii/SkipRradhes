import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/api';

function LoginPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('businessId', res.data.businessId);
      navigate('/business');
    } catch (err) {
      console.log('ERROR:', err.response?.data, err.response?.status);
      setError('Kredencialet janë të gabuara!');
    }
  };

  return (
    <div style={{ maxWidth:'400px', margin:'60px auto', padding:'0 16px' }}>
      <div style={{ background:'#fff', borderRadius:'12px',
        border:'1px solid #e2e8f0', padding:'32px' }}>
        <h2 style={{ fontSize:'20px', fontWeight:'700',
          marginBottom:'20px', textAlign:'center' }}>Hyrje Biznesi</h2>

        {error && (
          <div style={{ background:'#FEF2F2', border:'1px solid #FECACA',
            color:'#DC2626', padding:'10px 14px', borderRadius:'8px',
            marginBottom:'16px', fontSize:'13px' }}>{error}</div>
        )}

        <div style={{ marginBottom:'12px' }}>
          <label style={{ display:'block', fontSize:'12px', fontWeight:'600',
            color:'#64748B', marginBottom:'4px', textTransform:'uppercase' }}>
            Përdoruesi
          </label>
          <input type="text" value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
            placeholder="admin.bank1"
            style={{ width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0',
              borderRadius:'8px', fontSize:'14px', boxSizing:'border-box' }}
          />
        </div>

        <div style={{ marginBottom:'20px' }}>
          <label style={{ display:'block', fontSize:'12px', fontWeight:'600',
            color:'#64748B', marginBottom:'4px', textTransform:'uppercase' }}>
            Fjalëkalimi
          </label>
          <input type="password" value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
            placeholder="••••••••"
            style={{ width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0',
              borderRadius:'8px', fontSize:'14px', boxSizing:'border-box' }}
          />
        </div>

        <button onClick={handleSubmit}
          style={{ width:'100%', padding:'12px', background:'#2563EB',
            color:'#fff', border:'none', borderRadius:'8px',
            fontSize:'14px', fontWeight:'600', cursor:'pointer' }}>
          Hyr
        </button>

        <div style={{ marginTop:'16px', fontSize:'12px',
          color:'#64748B', textAlign:'center' }}>
          Demo: <strong>admin.bank1</strong> / <strong>admin123</strong>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;