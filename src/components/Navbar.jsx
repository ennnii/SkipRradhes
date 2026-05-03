import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 24px', height:'56px', background:'#fff',
      borderBottom:'1px solid #e2e8f0', position:'sticky', top:0, zIndex:100
    }}>
      <div style={{fontSize:'18px', fontWeight:'700', color:'#2563EB'}}>
        Skip<span style={{color:'#0F172A'}}>Rradhes</span>
      </div>
      <div style={{display:'flex', gap:'8px'}}>
        <Link to="/" style={{padding:'6px 14px', borderRadius:'6px',
          textDecoration:'none', color:'#64748B', fontWeight:'500'}}>
          Klient
        </Link>
        <Link to="/business" style={{padding:'6px 14px', borderRadius:'6px',
          textDecoration:'none', color:'#64748B', fontWeight:'500'}}>
          Biznes
        </Link>
        <Link to="/login" style={{padding:'6px 14px', borderRadius:'6px',
          textDecoration:'none', background:'#2563EB', color:'#fff', fontWeight:'500'}}>
          Hyr
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;