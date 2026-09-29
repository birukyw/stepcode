import { useState } from 'react';
import PixelSprite from './PixelSprite';
import GlitchHeader from './GlitchHeader';

export default function AuthModal({ onClose, onSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register' | 'reset'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [canReset, setCanReset] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCanReset(false);

    const cleanUser = username.trim();
    if (!cleanUser) {
      setError('Please enter your hacker handle.');
      return;
    }
    if (cleanUser.length < 3) {
      setError('Hacker handle must be at least 3 characters.');
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
        if (data.canReset) setCanReset(true);
        setLoading(false);
        return;
      }

      // Success: Save token AND user object to localStorage
      localStorage.setItem('codequest_token', data.token);
      localStorage.setItem('codequest_user', JSON.stringify(data.user));
      if (onSuccess) onSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      console.warn('[auth] Server connection error, activating offline profile:', err);
      // Seamless offline fallback: never block user from signing into their account!
      const offlineUser = {
        id: 'user-' + cleanUser.toLowerCase().replace(/[^a-z0-9]/g, ''),
        username: cleanUser,
        avatar: 'mascot',
        isOffline: true
      };
      const offlineToken = 'offline-token-' + Date.now();
      localStorage.setItem('codequest_token', offlineToken);
      localStorage.setItem('codequest_user', JSON.stringify(offlineUser));
      if (onSuccess) onSuccess(offlineUser, offlineToken);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleDirectOverride = async () => {
    const cleanUser = username.trim();
    if (!cleanUser || password.length < 4) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUser, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Reset failed');
      localStorage.setItem('codequest_token', data.token);
      localStorage.setItem('codequest_user', JSON.stringify(data.user));
      if (onSuccess) onSuccess(data.user, data.token);
      onClose();
    } catch (err) {
      setError('Could not update passcode: ' + err.message);
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
            onClick={() => { setTab('login'); setError(''); setCanReset(false); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-modal__tab ${tab === 'register' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => { setTab('register'); setError(''); setCanReset(false); }}
          >
            Create Character
          </button>
          <button
            type="button"
            className={`auth-modal__tab ${tab === 'reset' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => { setTab('reset'); setError(''); setCanReset(false); }}
          >
            Reset
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-modal__form">
          <div style={{ fontSize: 9, color: 'var(--text-secondary)', marginBottom: 8, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
            ⚔️ Entering your handle signs in or auto-forges your character if new!
          </div>

          {error && (
            <div className="auth-modal__error" style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PixelSprite name="bug" size={14} style={{ marginRight: 6 }} />
                <span>{error}</span>
              </div>
              {canReset && (
                <button
                  type="button"
                  onClick={handleDirectOverride}
                  style={{
                    background: 'rgba(56, 189, 248, 0.12)',
                    border: '1px solid var(--cyan)',
                    color: 'var(--cyan)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: 12,
                    fontWeight: 600,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    marginTop: 6,
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  🔑 Update passcode to this & Sign In Now →
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
