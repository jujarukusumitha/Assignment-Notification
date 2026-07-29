function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return (
    <div>
      <h2>Welcome, {user.username} 👋</h2>
      <p>Use <strong>Notification Settings</strong> to manage triggers and templates.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '24px' }}>
        {[
          { title: 'Go to Notification Settings', desc: 'Manage triggers, templates, and channels', link: '/notifications' }
        ].map(card => (
          <div key={card.title} style={{ background: 'white', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '24px', width: '280px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
            <h3 style={{ margin: '0 0 8px', color: '#1976d2' }}>{card.title}</h3>
            <p style={{ margin: '0 0 16px', color: '#666' }}>{card.desc}</p>
            <a href={card.link} style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>Open →</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;