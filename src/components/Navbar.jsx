import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { buildSequence } from '../data/flow';
import { xpSummary } from '../data/xp';
import { getStreak } from '../utils/activity';
import Bit from './art/Bit';
import LevelRing from './LevelRing';
import { Icon } from './art/Illustrations';
import { SettingsButton } from './Settings';
import { useAuth } from './AuthProvider';

function AccountButton() {
  const { configured, user, loading, signOut } = useAuth();
  const { syncError } = useContext(AppContext);
  if (!configured || loading) return null;
  if (!user) {
    return (
      <div className="account">
        <Link to="/login" className="account__login">Log in</Link>
        <Link to="/login?mode=signup" className="account__signup">Sign up</Link>
      </div>
    );
  }
  const initial = (user.email || '?').slice(0, 1).toUpperCase();
  return (
    <details className="account account--menu">
      <summary aria-label="Account menu"><span className="account__avatar">{initial}</span></summary>
      <div className="account__pop">
        <p className="account__email">{user.email}</p>
        <p className="account__sync">{syncError ? 'Could not save to your account. Retrying when you make progress.' : 'Progress saved to your account'}</p>
        <button type="button" className="account__out" onClick={signOut}>Log out</button>
      </div>
    </details>
  );
}

export default function Navbar() {
  const { progress } = useContext(AppContext);
  const seq = useMemo(() => buildSequence(), []);
  const xp = xpSummary(progress, seq);
  const streak = getStreak();
  return (
    <header className="topnav">
      <Link to="/" className="topnav__brand" aria-label="StepCode home">
        <Bit mood="idle" size={30} />
        <span className="wordmark">StepCode</span>
      </Link>
      <Link to="/python" className="stats" title={`${xp.earned} of ${xp.total} XP earned`}>
        <span className="stats__item stats__item--streak" title="Day streak"><Icon name="flame" size={18} />{streak}</span>
        <span className="stats__item stats__item--xp"><Icon name="bolt" size={18} />{xp.earned}</span>
        <LevelRing level={xp.level} pct={xp.intoLevel} size={34} stroke={3.5} />
      </Link>
      <AccountButton />
      <SettingsButton />
    </header>
  );
}
