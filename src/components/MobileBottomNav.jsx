import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../App';
import PixelSprite from './PixelSprite';
import { ROADMAP } from '../data/roadmap';

export default function MobileBottomNav() {
  const location = useLocation();
  const { stats, currentUser, openAuthModal, progress, isPhaseUnlocked, getPhaseProgress } = useContext(AppContext);

  // Find next incomplete target
  let continueTarget = '/';
  for (const phase of ROADMAP.phases) {
    const pp = getPhaseProgress(phase);
    if (pp.pct < 100) {
      continueTarget = `/phase/${phase.id}`;
      break;
    }
  }

  const isHome = location.pathname === '/';
  const isPhase = location.pathname.startsWith('/phase');
  const isCoding = location.pathname.startsWith('/exercise') || location.pathname.startsWith('/lesson');

  return (
    <nav className="mobile-bottom-nav">
      <Link to="/" className={`mobile-bottom-nav__item ${isHome ? 'active' : ''}`}>
        <span className="mobile-bottom-nav__icon">🏠</span>
        <span className="mobile-bottom-nav__label">Home</span>
      </Link>

      <Link to={continueTarget} className={`mobile-bottom-nav__item ${isPhase ? 'active' : ''}`}>
        <span className="mobile-bottom-nav__icon">🗺️</span>
        <span className="mobile-bottom-nav__label">Roadmap</span>
      </Link>

      <Link to={continueTarget} className={`mobile-bottom-nav__item mobile-bottom-nav__item--play ${isCoding ? 'active' : ''}`}>
        <span className="mobile-bottom-nav__icon">⚡</span>
        <span className="mobile-bottom-nav__label">Continue</span>
      </Link>

      <button
        onClick={currentUser ? () => {} : openAuthModal}
        className="mobile-bottom-nav__item mobile-bottom-nav__item--btn"
      >
        <span className="mobile-bottom-nav__icon">
          <PixelSprite name="bot" size={16} />
        </span>
        <span className="mobile-bottom-nav__label">
          {currentUser ? currentUser.username.slice(0, 7) : 'Sign In'}
        </span>
      </button>
    </nav>
  );
}
