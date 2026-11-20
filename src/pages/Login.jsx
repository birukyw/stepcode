import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/AuthProvider';
import Bit from '../components/art/Bit';

const MIN_PASSWORD = 8;

export default function Login() {
  const { configured, user, loading, recovering, signIn, signUp, signOut, sendReset, updatePassword } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = params.get('next') && params.get('next').startsWith('/') ? params.get('next') : '/python';

  const [mode, setMode] = useState(params.get('mode') === 'signup' ? 'signup' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => { setError(''); setNotice(''); }, [mode]);

  if (!configured) {
    return (
      <main className="auth">
        <div className="auth__card">
          <h1>Accounts are not switched on</h1>
          <p className="auth__sub">You can still learn as a guest. Your progress is saved on this device.</p>
          <Link to="/python" className="cx-btn">Start learning</Link>
        </div>
      </main>
    );
  }

  if (loading) return <main className="auth"><div className="auth__card"><p className="auth__sub">Loading…</p></div></main>;

  // Arrived from a password reset email: choose a new password.
  if (recovering && user) {
    const submitNew = async (e) => {
      e.preventDefault();
      if (password.length < MIN_PASSWORD) { setError(`Use at least ${MIN_PASSWORD} characters.`); return; }
      setBusy(true);
      const { error: err } = await updatePassword(password);
      setBusy(false);
      if (err) setError(err); else navigate(next, { replace: true });
    };
    return (
      <main className="auth">
        <form className="auth__card" onSubmit={submitNew}>
          <h1>Choose a new password</h1>
          <label className="auth__field">New password
            <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={MIN_PASSWORD} required />
          </label>
          {error && <p className="auth__error" role="alert">{error}</p>}
          <button type="submit" className="cx-btn" disabled={busy}>{busy ? 'Saving…' : 'Save password'}</button>
        </form>
      </main>
    );
  }

  if (user) {
    return (
      <main className="auth">
        <div className="auth__card">
          <Bit mood="happy" size={56} />
          <h1>You are logged in</h1>
          <p className="auth__sub">{user.email}</p>
          <p className="auth__sub">Your progress is saved to your account and follows you to any device.</p>
          <div className="auth__row">
            <Link to="/python" className="cx-btn">Keep learning</Link>
            <button type="button" className="cx-btn cx-btn--ghost" onClick={signOut}>Log out</button>
          </div>
        </div>
      </main>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setNotice('');
    if (mode !== 'reset' && password.length < MIN_PASSWORD && mode === 'signup') { setError(`Use a password with at least ${MIN_PASSWORD} characters.`); return; }
    setBusy(true);
    if (mode === 'signin') {
      const { error: err } = await signIn(email, password);
      setBusy(false);
      if (err) setError(err); else navigate(next, { replace: true });
    } else if (mode === 'signup') {
      const { error: err, needsConfirm } = await signUp(email, password);
      setBusy(false);
      if (err) setError(err);
      else if (needsConfirm) setNotice(`We sent a confirmation link to ${email.trim()}. Open it, then come back and log in.`);
      else navigate(next, { replace: true });
    } else {
      const { error: err } = await sendReset(email);
      setBusy(false);
      if (err) setError(err); else setNotice('If that email has an account, a reset link is on its way.');
    }
  };

  const title = mode === 'signup' ? 'Create your account' : mode === 'reset' ? 'Reset your password' : 'Welcome back';

  return (
    <main className="auth">
      <form className="auth__card" onSubmit={submit} noValidate={false}>
        <Bit mood={error ? 'sad' : 'idle'} size={56} />
        <h1>{title}</h1>
        <p className="auth__sub">
          {mode === 'signup' ? 'Save your progress, XP and streak, and pick up on any device.' : mode === 'reset' ? 'Enter your email and we will send you a link.' : 'Log in to sync your progress.'}
        </p>

        <label className="auth__field">Email
          <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        {mode !== 'reset' && (
          <label className="auth__field">Password
            <input type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
            {mode === 'signup' && <small>At least {MIN_PASSWORD} characters.</small>}
          </label>
        )}

        {error && <p className="auth__error" role="alert">{error}</p>}
        {notice && <p className="auth__notice" role="status">{notice}</p>}

        <button type="submit" className="cx-btn" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : mode === 'reset' ? 'Send reset link' : 'Log in'}
        </button>

        <div className="auth__links">
          {mode !== 'signin' && <button type="button" onClick={() => setMode('signin')}>I already have an account</button>}
          {mode !== 'signup' && <button type="button" onClick={() => setMode('signup')}>Create an account</button>}
          {mode === 'signin' && <button type="button" onClick={() => setMode('reset')}>Forgot password?</button>}
        </div>
        <p className="auth__guest"><Link to="/python">Continue as a guest</Link></p>
      </form>
    </main>
  );
}
