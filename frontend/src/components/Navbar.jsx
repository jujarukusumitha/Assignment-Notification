import { useNavigate } from 'react-router-dom';
import { logout } from '../services/api';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(localStorage.getItem('refresh_token'));
    } catch (e) {
      // ignore — logging out locally regardless
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{
      background: '#1976d2', color: 'white', padding: '16px 24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <h2 style={{ margin: 0 }}>🔔 Notification Management</h2>
      <button onClick={handleLogout} style={{
        background: 'white', color: '#1976d2', border: 'none',
        padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
      }}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;