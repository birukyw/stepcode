import { useContext, useMemo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../App';
import { buildSequence } from '../data/flow';
import { xpSummary } from '../data/xp';
import { getStreak } from '../utils/activity';
import Bit from './art/Bit';
import LevelRing from './LevelRing';
import { Icon } from './art/Illustrations';
import { SettingsButton } from './Settings';

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
      <nav className="topnav__links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/python">Learn Python</NavLink>
        <NavLink to="/further">Speak Python</NavLink>
      </nav>
      <Link to="/python" className="stats" title={`${xp.earned} of ${xp.total} XP earned`}>
        <span className="stats__item stats__item--streak" title="Day streak"><Icon name="flame" size={18} />{streak}</span>
        <span className="stats__item stats__item--xp"><Icon name="bolt" size={18} />{xp.earned}</span>
        <LevelRing level={xp.level} pct={xp.intoLevel} size={34} stroke={3.5} />
      </Link>
      <SettingsButton />
    </header>
  );
}
