import { useState } from 'react';
import PixelSprite from './PixelSprite';
import GlitchHeader from './GlitchHeader';

export default function AuthModal({ onClose, onSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your hacker handle.');
      return;
    }
    if (password.length < 4) {
      setError('Passcode must be at least 4 characters.');
      return;
    }

    setLoading(true);
    const endpoint = tab === 'login' ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        setLoading(false);
        return;
      }

      // Success
      localStorage.setItem('codequest_token', data.token);
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
          <GlitchHeader as="h2" className="auth-modal__title" text={tab === 'login' ? 'ACCESS TERMINAL' : 'INITIALIZE BYTE'} />
          <button className="auth-modal__close" onClick={onClose}>✕</button>
        </div>

        {/* Tab switch */}
        <div className="auth-modal__tabs">
          <button
            className={`auth-modal__tab ${tab === 'login' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
          >
            Sign In
          </button>
          <button
            className={`auth-modal__tab ${tab === 'register' ? 'auth-modal__tab--active' : ''}`}
            onClick={() => { setTab('register'); setError(''); }}
          >
            Create Character
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-modal__form">
          {error && (
            <div className="auth-modal__error">
              <PixelSprite name="bug" size={14} style={{ marginRight: 6 }} />
              {error}
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
            <label>SECURITY PASSCODE</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-modal__submit" disabled={loading}>
            {loading ? 'AUTHENTICATING...' : tab === 'login' ? 'ENTER CODEQUEST →' : 'FORGE CHARACTER →'}
          </button>
        </form>

        <div className="auth-modal__footer">
          <PixelSprite name="sword" size={12} style={{ marginRight: 6 }} />
          <span>Progress syncs across all your devices once logged in!</span>
        </div>
      </div>
    </div>
  );
}
