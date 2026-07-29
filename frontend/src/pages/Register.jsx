import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: '',
    is_admin: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      setSuccess('Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.username?.[0] || 'Registration failed. Try again.');
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center',
      alignItems: 'center', height: '100vh', background: '#f5f5f5'
    }}>
      <div style={{
        background: 'white', padding: '40px', borderRadius: '8px',
        width: '400px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2' }}>🔔 Create Account</h2>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', background: '#ffebee',
            padding: '10px', borderRadius: '4px' }}>{error}</p>
        )}
        {success && (
          <p style={{ color: 'green', textAlign: 'center', background: '#e8f5e9',
            padding: '10px', borderRadius: '4px' }}>{success}</p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: '16px' }}>
            <label>Username *</label>
            <input
              type="text" required value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              style={inputStyle} placeholder="Enter username"
            />
          </div>

          {/* Email */}
          <div style={{ marginBottom: '16px' }}>
            <label>Email *</label>
            <input
              type="email" required value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle} placeholder="Enter email"
            />
          </div>

          {/* Phone */}
          <div style={{ marginBottom: '16px' }}>
            <label>Phone Number (WhatsApp)</label>
            <input
              type="text" value={form.phone_number}
              onChange={e => setForm({ ...form, phone_number: e.target.value })}
              style={inputStyle} placeholder="+91XXXXXXXXXX"
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: '16px' }}>
            <label>Password *</label>
            <input
              type="password" required value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={inputStyle} placeholder="Enter password"
            />
          </div>

          {/* Admin checkbox */}
          <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox" id="is_admin"
              checked={form.is_admin}
              onChange={e => setForm({ ...form, is_admin: e.target.checked })}
            />
            <label htmlFor="is_admin">Register as Admin</label>
          </div>

          <button type="submit" style={{
            width: '100%', padding: '12px', background: '#1976d2',
            color: 'white', border: 'none', borderRadius: '4px',
            cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'
          }}>
            Create Account
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '16px', color: '#666' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', fontWeight: 'bold' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block', width: '100%', padding: '10px',
  marginTop: '4px', border: '1px solid #ccc', borderRadius: '4px',
  boxSizing: 'border-box', fontSize: '14px'
};

export default Register;