import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const { pathname } = useLocation();
  const links = [
    { to: '/', label: '🏠 Dashboard' },
    { to: '/notifications', label: '🔔 Notification Settings' },
  ];
  return (
    <div style={{
      width: '220px', minHeight: 'calc(100vh - 54px)',
      borderRight: '1px solid #e0e0e0', padding: '20px', background: '#fafafa'
    }}>
      {links.map(({ to, label }) => (
        <div key={to} style={{ marginBottom: '12px' }}>
          <Link to={to} style={{
            textDecoration: 'none',
            color: pathname === to ? '#1976d2' : '#333',
            fontWeight: pathname === to ? 'bold' : 'normal',
          }}>{label}</Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;