import QRCode from 'qrcode.react';

function Ticket({ ticket }) {
  if (!ticket) return null;
  return (
    <div style={{
      background:'#fff', borderRadius:'12px', border:'2px solid #2563EB',
      padding:'24px', textAlign:'center', maxWidth:'400px', margin:'0 auto'
    }}>
      <div style={{fontSize:'11px', fontWeight:'700', color:'#64748B',
        textTransform:'uppercase', letterSpacing:'1px'}}>Numri juaj</div>
      <div style={{fontSize:'52px', fontWeight:'800', color:'#2563EB',
        lineHeight:1}}>{ticket.ticketCode}</div>
      <div style={{fontSize:'13px', color:'#64748B', margin:'4px 0 16px'}}>
        {ticket.serviceDetail} — {ticket.branchName}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr',
        gap:'10px', margin:'16px 0', textAlign:'left'}}>
        {[
          ['Radhë para jush', ticket.positionInQueue - 1],
          ['Pritja', `~${ticket.estimatedWaitMinutes} min`],
          ['Ora e thirrjes', ticket.estimatedCallTime],
          ['Statusi', ticket.status],
        ].map(([label, val]) => (
          <div key={label} style={{background:'#F1F5F9',
            borderRadius:'8px', padding:'10px 12px'}}>
            <div style={{fontSize:'11px', color:'#64748B',
              fontWeight:'600', textTransform:'uppercase'}}>{label}</div>
            <div style={{fontSize:'15px', fontWeight:'700',
              color:'#0F172A', marginTop:'2px'}}>{val}</div>
          </div>
        ))}
      </div>

      <div style={{borderTop:'2px dashed #e2e8f0', margin:'16px 0'}}/>
      <div style={{fontSize:'12px', color:'#64748B', marginBottom:'8px'}}>
        QR Kodi juaj unik
      </div>
      <div style={{display:'flex', justifyContent:'center'}}>
        <QRCode value={ticket.qrCode} size={120} />
      </div>
    </div>
  );
}

export default Ticket;