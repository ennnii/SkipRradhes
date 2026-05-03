import { useState } from 'react';
import { joinQueue } from '../api/api';
import Ticket from '../components/Ticket';

const BRANCHES = {
  BANK: [
    'Bank Example1 - Qendër',
    'Bank Example1 - Bllok',
    'Bank Example1 - Kamëz',
    'Bank Example2 - Qendër',
    'Bank Example2 - Bllok',
    'Bank Example2 - Kombinat',
    'Bak Example3 - Qendër',
    'Bank Example3- Vizion Plus',
    'Bank Example4- Qendër',
    'Bank Example5  - Qendër',
  ],
  CLINIC: [
    'Poliklinika Qendrore',
    'Poliklinika Nr. 1',
    'Poliklinika Nr. 2',
    'Poliklinika Nr. 3',
    'Poliklinika e Specialiteteve',
    'Poliklinika Kombinat',
    'Spitali Amerikan - Qendër',
  ],
  ADMIN: [
    'Njësia Administrative Nr. 1',
    'Njësia Administrative Nr. 2',
    'Njësia Administrative Nr. 3',
    'Njësia Administrative Nr. 4',
    'Njësia Administrative Nr. 5',
    'Njësia Administrative Nr. 11',
    'Njësia Administrative Nr. 17',
    'DPGJC - Rruga e Kavajës',
    'Gjendja Civile - Qendër',
  ],
};

const SERVICES = {
  BANK:   ['Llogari bankare', 'Transfertë', 'Kredi', 'Depozitë', 'Kartë debiti/krediti'],
  CLINIC: ['Vizitë mjekësore', 'Analizë gjaku', 'Radiografi', 'Recetë', 'Vaksinim'],
  ADMIN:  ['Certifikatë lindjeje', 'Certifikatë familjare', 'Dokument identiteti', 'Regjistrim', 'Çregjistrim'],
};

const HOURS = [
  '08:00','08:30','09:00','09:30','10:00','10:30',
  '11:00','11:30','12:00','12:30','13:00','13:30',
  '14:00','14:30','15:00','15:30','16:00','16:30','17:00',
];

function ClientPage() {
  const [form, setForm] = useState({
    clientName: '', clientPhone: '',
    serviceType: 'BANK',
    serviceDetail: SERVICES.BANK[0],
    branchName: BRANCHES.BANK[0],
    preferredHour: '',
  });
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleServiceType = (type) => {
    setForm({
      ...form,
      serviceType: type,
      serviceDetail: SERVICES[type][0],
      branchName: BRANCHES[type][0],
    });
  };

  const handleSubmit = async () => {
    if (!form.clientName || !form.clientPhone) {
      setError('Ju lutem plotësoni emrin dhe telefonin!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await joinQueue(form);
      setTicket(res.data);
    } catch {
      setError('Gabim — kontrollo që serveri është duke punuar.');
    } finally {
      setLoading(false);
    }
  };

  if (ticket) return (
    <div style={{ maxWidth:'500px', margin:'32px auto', padding:'0 16px' }}>
      <div style={{ background:'#F0FDF4', border:'1px solid #BBF7D0',
        color:'#14532D', padding:'12px 14px', borderRadius:'8px',
        marginBottom:'16px', fontSize:'13px' }}>
        ✅ U regjistruat me sukses! Do të njoftoheni 5 min para radhës.
      </div>
      <Ticket ticket={ticket} />
      <button onClick={() => setTicket(null)}
        style={{ width:'100%', marginTop:'16px', padding:'10px',
          background:'transparent', border:'1px solid #e2e8f0',
          borderRadius:'8px', cursor:'pointer', fontSize:'14px' }}>
        Regjistro radhë tjetër
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth:'500px', margin:'32px auto', padding:'0 16px' }}>

      {/* Hero */}
      <div style={{ background:'linear-gradient(135deg,#1e3a5f,#1e40af)',
        borderRadius:'12px', padding:'24px', color:'#fff',
        textAlign:'center', marginBottom:'20px' }}>
        <h1 style={{ fontSize:'22px', fontWeight:'700', marginBottom:'6px' }}>
          Rezervo rradhën tënde
        </h1>
        <p style={{ fontSize:'13px', opacity:.8 }}>
          Pa pritje. Pa tarifa. Me njoftime në kohë reale.
        </p>
      </div>

      {/* Lloji shërbimit */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
        gap:'10px', marginBottom:'20px' }}>
        {[
          { type:'BANK',   icon:'🏦', name:'Bankë',        wait:'~12 min' },
          { type:'CLINIC', icon:'🏥', name:'Poliklinikë',  wait:'~18 min' },
          { type:'ADMIN',  icon:'🏛️', name:'Administratë', wait:'~25 min' },
        ].map(s => (
          <div key={s.type} onClick={() => handleServiceType(s.type)}
            style={{
              background: form.serviceType===s.type ? 'rgba(37,99,235,.1)' : '#fff',
              border: `2px solid ${form.serviceType===s.type ? '#2563EB' : '#e2e8f0'}`,
              borderRadius:'10px', padding:'14px 8px', textAlign:'center',
              cursor:'pointer', transition:'all .15s'
            }}>
            <div style={{ fontSize:'24px' }}>{s.icon}</div>
            <div style={{ fontSize:'13px', fontWeight:'600', margin:'4px 0 2px' }}>{s.name}</div>
            <div style={{ fontSize:'11px', color:'#64748B' }}>{s.wait}</div>
          </div>
        ))}
      </div>

      {/* Forma */}
      <div style={{ background:'#fff', borderRadius:'12px',
        border:'1px solid #e2e8f0', padding:'20px' }}>
        <h2 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'14px' }}>
          Të dhënat tuaja
        </h2>

        {error && (
          <div style={{ background:'#FEF2F2', border:'1px solid #FECACA',
            color:'#DC2626', padding:'10px 14px', borderRadius:'8px',
            marginBottom:'12px', fontSize:'13px' }}>{error}</div>
        )}

        {/* Emri + Telefoni */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'10px' }}>
          {[
            ['Emri', 'clientName', 'Emri  Mbiemri', 'text'],
            ['Telefoni', 'clientPhone', '+355 69...', 'tel'],
          ].map(([label, key, ph, type]) => (
            <div key={key}>
              <label style={{ display:'block', fontSize:'12px', fontWeight:'600',
                color:'#64748B', marginBottom:'4px', textTransform:'uppercase' }}>
                {label}
              </label>
              <input type={type} placeholder={ph} value={form[key]}
                onChange={e => setForm({...form, [key]: e.target.value})}
                style={{ width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0',
                  borderRadius:'8px', fontSize:'14px', boxSizing:'border-box' }}
              />
            </div>
          ))}
        </div>

        {/* Dega */}
        <div style={{ marginBottom:'10px' }}>
          <label style={{ display:'block', fontSize:'12px', fontWeight:'600',
            color:'#64748B', marginBottom:'4px', textTransform:'uppercase' }}>
            Dega / Njësia
          </label>
          <select value={form.branchName}
            onChange={e => setForm({...form, branchName: e.target.value})}
            style={{ width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0',
              borderRadius:'8px', fontSize:'14px', boxSizing:'border-box' }}>
            {BRANCHES[form.serviceType].map(b => <option key={b}>{b}</option>)}
          </select>
        </div>

        {/* Shërbimi + Ora */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px', marginBottom:'16px' }}>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:'600',
              color:'#64748B', marginBottom:'4px', textTransform:'uppercase' }}>
              Shërbimi
            </label>
            <select value={form.serviceDetail}
              onChange={e => setForm({...form, serviceDetail: e.target.value})}
              style={{ width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0',
                borderRadius:'8px', fontSize:'14px', boxSizing:'border-box' }}>
              {SERVICES[form.serviceType].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:'block', fontSize:'12px', fontWeight:'600',
              color:'#64748B', marginBottom:'4px', textTransform:'uppercase' }}>
              Ora e preferuar
            </label>
            <select value={form.preferredHour}
              onChange={e => setForm({...form, preferredHour: e.target.value})}
              style={{ width:'100%', padding:'9px 12px', border:'1px solid #e2e8f0',
                borderRadius:'8px', fontSize:'14px', boxSizing:'border-box' }}>
              <option value=''>Sa më shpejt</option>
              {HOURS.map(h => <option key={h}>{h}</option>)}
            </select>
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading}
          style={{ width:'100%', padding:'12px',
            background: loading ? '#94A3B8' : '#2563EB', color:'#fff',
            border:'none', borderRadius:'8px', fontSize:'14px',
            fontWeight:'600', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Duke u regjistruar...' : 'Hyj në radhë pa pagesë'}
        </button>
      </div>
    </div>
  );
}

export default ClientPage;