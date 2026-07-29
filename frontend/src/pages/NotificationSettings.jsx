import { useEffect, useState } from 'react';
import { getTriggers, createTemplate, updateTemplate, toggleTemplate, testSend } from '../services/api';

const CHANNELS = ['whatsapp', 'email', 'webpush'];
const CHANNEL_ICONS = { whatsapp: '📱', email: '📧', webpush: '🌐' };

function NotificationSettings() {
  const [triggers, setTriggers] = useState([]);
  const [modal, setModal] = useState(null); // { template, trigger, channel }
  const [testModal, setTestModal] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await getTriggers();
    setTriggers(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getTemplate = (trigger, channel) =>
    trigger.templates?.find(t => t.channel === channel);

  const handleToggle = async (template) => {
    await toggleTemplate(template.id);
    load();
  };

  const handleSave = async (data) => {
    if (data.id) {
      await updateTemplate(data.id, data);
    } else {
      await createTemplate(data);
    }
    setModal(null);
    load();
  };

  const handleTest = async (templateId, extra) => {
    const res = await testSend(templateId, extra);
    alert(res.data.message || res.data.status);
    setTestModal(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>🔔 Notification Settings</h2>
      <p style={{ color: '#666' }}>Manage triggers and channels from one place.</p>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ background: '#1976d2', color: 'white' }}>
              <th style={{ padding: '14px 20px', textAlign: 'left' }}>Trigger</th>
              {CHANNELS.map(ch => (
                <th key={ch} style={{ padding: '14px 20px', textAlign: 'center' }}>
                  {CHANNEL_ICONS[ch]} {ch.charAt(0).toUpperCase() + ch.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {triggers.map((trigger, idx) => (
              <tr key={trigger.id} style={{ background: idx % 2 === 0 ? '#fafafa' : 'white', borderBottom: '1px solid #e0e0e0' }}>
                <td style={{ padding: '16px 20px', fontWeight: 'bold' }}>
                  <div>{trigger.label}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>{trigger.description}</div>
                </td>
                {CHANNELS.map(channel => {
                  const tmpl = getTemplate(trigger, channel);
                  return (
                    <td key={channel} style={{ padding: '14px 20px', textAlign: 'center' }}>
                      {tmpl ? (
                        <div>
                          <div style={{ marginBottom: '8px' }}>
                            <span style={{
                              display: 'inline-block', padding: '2px 10px', borderRadius: '12px',
                              fontSize: '12px', fontWeight: 'bold',
                              background: tmpl.is_active ? '#e8f5e9' : '#ffebee',
                              color: tmpl.is_active ? '#2e7d32' : '#c62828'
                            }}>
                              {tmpl.is_active ? '🟢 ON' : '🔴 OFF'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button onClick={() => setModal({ template: tmpl, trigger, channel })}
                              style={btnStyle('#1976d2')}>Edit</button>
                            <button onClick={() => handleToggle(tmpl)}
                              style={btnStyle(tmpl.is_active ? '#f57c00' : '#388e3c')}>
                              {tmpl.is_active ? 'Disable' : 'Enable'}
                            </button>
                            <button onClick={() => setTestModal({ template: tmpl })}
                              style={btnStyle('#7b1fa2')}>Test</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setModal({ template: null, trigger, channel })}
                          style={btnStyle('#1976d2')}>+ Create</button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <TemplateModal
          modal={modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {testModal && (
        <TestModal
          template={testModal.template}
          onTest={handleTest}
          onClose={() => setTestModal(null)}
        />
      )}
    </div>
  );
}

function btnStyle(bg) {
  return {
    background: bg, color: 'white', border: 'none',
    padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
  };
}

function TemplateModal({ modal, onSave, onClose }) {
  const { template, trigger, channel } = modal;
  const [form, setForm] = useState({
    id: template?.id || null,
    trigger: trigger.id,
    channel,
    subject: template?.subject || '',
    body: template?.body || '',
    is_active: template?.is_active ?? true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>{template ? 'Edit Template' : 'Create Template'}</h3>
        <p style={{ color: '#666', marginTop: 0 }}>
          {trigger.label} → {CHANNEL_ICONS[channel]} {channel}
        </p>
        <form onSubmit={handleSubmit}>
          {(channel === 'email' || channel === 'webpush') && (
            <div style={{ marginBottom: '14px' }}>
              <label>Subject / Title</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                style={inputStyle} placeholder="Notification subject or title" />
            </div>
          )}
          <div style={{ marginBottom: '14px' }}>
            <label>Message Body</label>
            <textarea value={form.body} required onChange={e => setForm({ ...form, body: e.target.value })}
              rows={5} style={{ ...inputStyle, resize: 'vertical' }}
              placeholder="Use {{username}}, {{email}} as variables" />
          </div>
          <p style={{ fontSize: '12px', color: '#888' }}>Variables: {'{{username}}'}, {'{{email}}'}</p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="button" onClick={onClose} style={btnStyle('#757575')}>Cancel</button>
            <button type="submit" style={btnStyle('#1976d2')}>Save Template</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TestModal({ template, onTest, onClose }) {
  const [extra, setExtra] = useState({ phone: '', email: '', subscription_id: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSubmit = (e) => {
    e.preventDefault();
    onTest(template.id, {
      phone: extra.phone || user.phone_number,
      email: extra.email || user.email,
      subscription_id: extra.subscription_id || user.push_subscription_id,
    });
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>🧪 Test Send — {template.channel}</h3>
        <form onSubmit={handleSubmit}>
          {template.channel === 'whatsapp' && (
            <div style={{ marginBottom: '14px' }}>
              <label>Phone (international format)</label>
              <input value={extra.phone} onChange={e => setExtra({ ...extra, phone: e.target.value })}
                style={inputStyle} placeholder="+919876543210" />
            </div>
          )}
          {template.channel === 'email' && (
            <div style={{ marginBottom: '14px' }}>
              <label>Email address</label>
              <input value={extra.email} onChange={e => setExtra({ ...extra, email: e.target.value })}
                style={inputStyle} placeholder="you@example.com" />
            </div>
          )}
          {template.channel === 'webpush' && (
            <div style={{ marginBottom: '14px' }}>
              <label>OneSignal Subscription ID</label>
              <input value={extra.subscription_id} onChange={e => setExtra({ ...extra, subscription_id: e.target.value })}
                style={inputStyle} placeholder="your-onesignal-player-id" />
            </div>
          )}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
            <button type="button" onClick={onClose} style={btnStyle('#757575')}>Cancel</button>
            <button type="submit" style={btnStyle('#7b1fa2')}>Send Test</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
};
const modalStyle = {
  background: 'white', borderRadius: '8px', padding: '28px', width: '480px',
  maxWidth: '95vw', boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
};
const inputStyle = {
  display: 'block', width: '100%', padding: '10px', marginTop: '4px',
  border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box', fontSize: '14px'
};

export default NotificationSettings;