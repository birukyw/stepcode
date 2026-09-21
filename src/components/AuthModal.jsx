import { useState } from 'react';
import PixelSprite from './PixelSprite';
import GlitchHeader from './GlitchHeader';

export default function AuthModal({ onClose, onSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'reset'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim();
    if (!cleanUser) {
      setError('Please enter your hacker handle.');
      return;
    }
    if (password.length < 4) {
      setError('Passcode must be at least 4 characters.');
      return;
    }

    setLoading(true);

    // Retrieve any guest progress or XP to migrate
    let initialXp = 0;
    let localProgress = {};
    try {
      const fallback = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
      if (fallback.stats && typeof fallback.stats.totalXp === 'number') {
        initialXp = fallback.stats.totalXp;
      }
      if (fallback.progress) {
        localProgress = fallback.progress;
      }
    } catch {}

    let endpoint = '/api/auth/login';
    let body = { username: cleanUser, password, initialXp, localProgress };

    if (tab === 'register') {
      endpoint = '/api/auth/register';
    } else if (tab === 'reset') {
      endpoint = '/api/auth/reset';
      body = { username: cleanUser, newPassword: password };
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      // Success: Save token AND user object to localStorage
      localStorage.setItem('codequest_token', data.token);
      localStorage.setItem('codequest_user', JSON.stringify(data.user));
      if (onSuccess) onSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setError('Could not connect to server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header with mascot */}
        <div className="auth-modal__header">
          <PixelSprite name="bot" size={32} animated />
          <GlitchHeader
            as="h2"
            className="auth-modal__title"
            text={
              tab === 'login'
                ? 'ACCESS TERMINAL'
                : tab === 'register'
                ? 'INITIALIZE BYTE'
                : 'OVERRIDE PASSCODE'
            }
          />
          <button className="auth-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* Tab switch */}
        <div className="auth-modal__tabs">
          <button
            type="button"
            className={`auth-modal__tab ${tab === 'login' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-modal__tab ${tab === 'register' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => { setTab('register'); setError(''); }}
          >
            Create Character
          </button>
          <button
            type="button"
            className={`auth-modal__tab ${tab === 'reset' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => { setTab('reset'); setError(''); }}
          >
            Reset
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-modal__form">
          {error && (
            <div className="auth-modal__error" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PixelSprite name="bug" size={14} style={{ marginRight: 6 }} />
                <span>{error}</span>
              </div>
              {tab === 'login' && error.includes('not found') && (
                <button
                  type="button"
                  onClick={() => { setTab('register'); setError(''); }}
                  style={{
                    background: 'transparent',
                    border: '1px dashed var(--yellow)',
                    color: 'var(--yellow)',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 8,
                    padding: '4px 8px',
                    cursor: 'pointer',
                    marginTop: 4,
                  }}
                >
                  ⚡ Register "{username.trim()}" now →
                </button>
              )}
              {tab === 'login' && error.includes('Incorrect passcode') && (
                <button
                  type="button"
                  onClick={() => { setTab('reset'); setError(''); }}
                  style={{
                    background: 'transparent',
                    border: '1px dashed var(--cyan)',
                    color: 'var(--cyan)',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 8,
                    padding: '4px 8px',
                    cursor: 'pointer',
                    marginTop: 4,
                  }}
                >
                  🔑 Reset passcode for "{username.trim()}" →
                </button>
              )}
            </div>
          )}

          <div className="auth-modal__field">
            <label>HACKER HANDLE</label>
            <input
              type="text"
              placeholder="e.g. NeoCoder"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              maxLength={20}
            />
          </div>

          <div className="auth-modal__field">
            <label>
              {tab === 'reset' ? 'NEW SECURITY PASSCODE' : 'SECURITY PASSCODE'}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-modal__submit" disabled={loading}>
            {loading
              ? 'AUTHENTICATING...'
              : tab === 'login'
              ? 'ENTER CODEQUEST →'
              : tab === 'register'
              ? 'FORGE CHARACTER →'
              : 'UPDATE PASSCODE →'}
          </button>
        </form>

        <div className="auth-modal__footer">
          <PixelSprite name="sword" size={12} style={{ marginRight: 6 }} />
          <span>Progress & XP sync permanently across all your devices once logged in!</span>
        </div>
      </div>
    </div>
  );
}
