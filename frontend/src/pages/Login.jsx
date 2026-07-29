import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', height: '100vh', background: '#f5f5f5'
    }}>
      <div style={{
        background: 'white', padding: '40px', borderRadius: '8px',
        width: '360px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>🔔 Admin Login</h2>

        {error && (
          <p style={{
            color: 'red', textAlign: 'center',
            background: '#ffebee', padding: '10px', borderRadius: '4px'
          }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label>Username</label>
            <input
              type="text" value={form.username} required
              onChange={e => setForm({ ...form, username: e.target.value })}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Password</label>
            <input
              type="password" value={form.password} required
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
            />
          </div>

          <button type="submit" style={{
            width: '100%', padding: '12px', background: '#1976d2',
            color: 'white', border: 'none', borderRadius: '4px',
            cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'
          }}>
            Login
          </button>
        </form>

        {/* Register link */}
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#1976d2', fontWeight: 'bold' }}>
            Register here
          </Link>
        </p>

      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block', width: '100%', padding: '10px',
  marginTop: '4px', border: '1px solid #ccc',
  borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px'
};

export default Login;