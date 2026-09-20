import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import ThemePicker from './ThemePicker';
import PixelSprite from './PixelSprite';
import GlitchHeader from './GlitchHeader';

export default function Navbar() {
  const { stats, currentUser, openAuthModal, logout } = useContext(AppContext);
  const xpInLevel = stats.totalXp % 200;
  const xpPct = (xpInLevel / 200) * 100;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <span className="navbar__icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <PixelSprite name="bot" size={22} animated />
        </span>
        <GlitchHeader as="span" className="navbar__title" text="CodeQuest" scramble={false} />
      </Link>
      <div className="navbar__stats">
        <div className="navbar__stat">
          <ThemePicker />
        </div>
        <div className="navbar__stat">
          <PixelSprite name="chip" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--cyan">{stats.totalXp} XP</span>
          <div className="navbar__xp-bar">
            <div className="navbar__xp-fill" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
        <div className="navbar__stat">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-bright)', display: 'inline-block' }} />
        </div>
        <div className="navbar__stat">
          <PixelSprite name="trophy" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--yellow">Lv.{stats.level}</span>
        </div>
        <div className="navbar__stat">
          <PixelSprite name="heart" size={13} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--green">{stats.currentStreak}</span>
        </div>

        {/* User Auth Action */}
        <div className="navbar__stat" style={{ marginLeft: 6 }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--cyan)' }}>
                👾 {currentUser.username}
              </span>
              <button
                className="btn btn-secondary btn--reset"
                onClick={logout}
                style={{ padding: '4px 10px', fontSize: 11 }}
                title="Sign Out"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={openAuthModal}
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 8,
                padding: '6px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
