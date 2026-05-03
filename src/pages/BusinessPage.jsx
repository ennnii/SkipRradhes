import { useState, useEffect } from 'react';
import { getLiveQueue, callTicket, blockTicket } from '../api/api';

function BusinessPage() {
  const [queue, setQueue] = useState([]);
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const token = localStorage.getItem('token');
  const bizId = localStorage.getItem('businessId');

  const fetchQueue = async () => {
    try {
      const res = await getLiveQueue(bizId);
      const data = Array.isArray(res.data) ? res.data : [];
      setQueue(data);
    } catch {
      setError('Nuk u lidh me serverin.');
      setQueue([]);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleCall = async (id, code) => {
    try {
      await callTicket(id);
      setMsg(`✅ ${code} u thirr!`);
      fetchQueue();
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setError('Gabim gjatë thirrjes.');
    }
  };

  const handleBlock = async (id, code) => {
    try {
      await blockTicket(id);
      setMsg(`🚫 ${code} u bllokua!`);
      fetchQueue();
      setTimeout(() => setMsg(''), 3000);
    } catch {
      setError('Gabim gjatë bllokimit.');
    }
  };

  if (!token) return (
    <div style={{ maxWidth:'400px', margin:'60px auto', padding:'0 16px',
      textAlign:'center' }}>
      <div style={{ background:'#FEF2F2', border:'1px solid #FECACA',
        color:'#DC2626', padding:'20px', borderRadius:'12px' }}>
        ⚠️ Duhet të hyni si biznes.{' '}
        <a href="/login" style={{ color:'#2563EB' }}>Klikoni këtu</a>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth:'900px', margin:'0 auto', padding:'20px 16px' }}>

      <div style={{ background:'#0F172A', color:'#fff', borderRadius:'12px',
        padding:'20px 24px', marginBottom:'20px',
        display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:'20px', fontWeight:'700' }}>Panel Biznesi</h1>
          <p style={{ fontSize:'13px', opacity:.6, marginTop:'2px' }}>
            Radha live — përditësohet çdo 15 sekonda
          </p>
        </div>
        <span style={{ background:'#16A34A', color:'#fff', padding:'4px 12px',
          borderRadius:'20px', fontSize:'12px', fontWeight:'600' }}>
          ● Live
        </span>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)',
        gap:'12px', marginBottom:'20px' }}>
        {[
          { label:'Në radhë', val: queue.filter(t=>t.status==='WAITING').length, color:'#2563EB' },
          { label:'Aktiv',    val: queue.filter(t=>t.status==='ACTIVE').length,  color:'#16A34A' },
          { label:'Vonesë',   val: queue.filter(t=>t.status==='DELAYED').length, color:'#D97706' },
        ].map(s => (
          <div key={s.label} style={{ background:'#fff', borderRadius:'10px',
            border:'1px solid #e2e8f0', padding:'16px', textAlign:'center' }}>
            <div style={{ fontSize:'28px', fontWeight:'800', color:s.color }}>{s.val}</div>
            <div style={{ fontSize:'12px', color:'#64748B', marginTop:'2px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {msg && (
        <div style={{ background:'#F0FDF4', border:'1px solid #BBF7D0',
          color:'#14532D', padding:'10px 14px', borderRadius:'8px',
          marginBottom:'12px', fontSize:'13px' }}>{msg}</div>
      )}
      {error && (
        <div style={{ background:'#FEF2F2', border:'1px solid #FECACA',
          color:'#DC2626', padding:'10px 14px', borderRadius:'8px',
          marginBottom:'12px', fontSize:'13px' }}>{error}</div>
      )}

      <div style={{ background:'#fff', borderRadius:'12px',
        border:'1px solid #e2e8f0', overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#F8FAFC' }}>
              {['Nr.','Klienti','Shërbimi','Pritja','Statusi','Veprime'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'10px 14px',
                  fontSize:'11px', fontWeight:'700', color:'#64748B',
                  textTransform:'uppercase', borderBottom:'1px solid #e2e8f0' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {queue.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign:'center', padding:'32px',
                  color:'#64748B', fontSize:'14px' }}>
                  Radha është bosh
                </td>
              </tr>
            ) : queue.map(t => (
              <tr key={t.id} style={{ borderBottom:'1px solid #F1F5F9' }}>
                <td style={{ padding:'10px 14px', fontWeight:'700', fontSize:'13px' }}>
                  {t.ticketCode}
                </td>
                <td style={{ padding:'10px 14px', fontSize:'13px',
                  textDecoration: t.blocked ? 'line-through':'' }}>
                  {t.clientName}
                </td>
                <td style={{ padding:'10px 14px', fontSize:'13px' }}>{t.serviceDetail}</td>
                <td style={{ padding:'10px 14px', fontSize:'13px' }}>{t.estimatedWaitMinutes} min</td>
                <td style={{ padding:'10px 14px' }}>
                  <span style={{
                    padding:'3px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'600',
                    background: t.blocked ? '#FEF2F2' :
                      t.status==='ACTIVE'  ? '#F0FDF4' :
                      t.status==='DELAYED' ? '#FFFBEB' : '#EFF6FF',
                    color: t.blocked ? '#DC2626' :
                      t.status==='ACTIVE'  ? '#16A34A' :
                      t.status==='DELAYED' ? '#D97706' : '#2563EB',
                  }}>
                    {t.blocked ? 'Bllokuar' :
                      t.status==='ACTIVE'  ? 'Aktiv' :
                      t.status==='DELAYED' ? 'Vonesë' :
                      t.status==='CALLED'  ? 'Thirrur' : 'Pret'}
                  </span>
                </td>
                <td style={{ padding:'10px 14px' }}>
                  <div style={{ display:'flex', gap:'6px' }}>
                    <button onClick={() => handleCall(t.id, t.ticketCode)}
                      style={{ padding:'5px 10px', background:'#16A34A',
                        color:'#fff', border:'none', borderRadius:'6px',
                        fontSize:'12px', fontWeight:'600', cursor:'pointer' }}>
                      ✓ Thirr
                    </button>
                    <button onClick={() => handleBlock(t.id, t.ticketCode)}
                      style={{ padding:'5px 10px', background:'transparent',
                        color:'#64748B', border:'1px solid #e2e8f0',
                        borderRadius:'6px', fontSize:'12px', cursor:'pointer' }}>
                      {t.blocked ? '🔓' : '🚫'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={fetchQueue}
        style={{ marginTop:'12px', padding:'8px 16px', background:'transparent',
          border:'1px solid #e2e8f0', borderRadius:'8px', cursor:'pointer',
          fontSize:'13px', color:'#64748B' }}>
        🔄 Përditëso manualisht
      </button>
    </div>
  );
}

export default BusinessPage;