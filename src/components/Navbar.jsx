import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { getTrack } from '../data/catalog';
import ThemePicker from './ThemePicker';
import PixelSprite from './PixelSprite';
import GlitchHeader from './GlitchHeader';

export default function Navbar() {
  const { stats, currentUser, openAuthModal, logout, activeTrackId } = useContext(AppContext);
  const currentTrack = getTrack(activeTrackId);
  const xpInLevel = stats.totalXp % 200;
  const xpPct = (xpInLevel / 200) * 100;

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Link to="/" className="navbar__brand">
          <span className="navbar__icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <PixelSprite name="bot" size={20} animated />
          </span>
          <GlitchHeader as="span" className="navbar__title" text="CodeQuest" scramble={false} />
        </Link>
        <a
          href="/#catalog-section"
          className="navbar__track-badge"
          title="Click to view all career tracks catalog"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(0, 229, 255, 0.08)',
            border: '1px solid rgba(0, 229, 255, 0.25)',
            borderRadius: 4,
            padding: '3px 10px',
            fontSize: 12,
            color: 'var(--cyan)',
            fontFamily: 'var(--font-mono)',
            textDecoration: 'none',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <span>{currentTrack.icon} {currentTrack.title.split('&')[0]}</span>
          <span style={{ fontSize: 9, color: 'var(--text-dim)', letterSpacing: 0.5 }}>▼ CATALOG</span>
        </a>
      </div>
      <div className="navbar__stats">
        <div className="navbar__stat navbar__stat--theme">
          <ThemePicker />
        </div>
        <div className="navbar__stat navbar__stat--xp">
          <PixelSprite name="chip" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--cyan">{stats.totalXp} XP</span>
          <div className="navbar__xp-bar">
            <div className="navbar__xp-fill" style={{ width: `${xpPct}%` }} />
          </div>
        </div>
        <div className="navbar__stat navbar__stat--level">
          <PixelSprite name="trophy" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--yellow">Lv.{stats.level}</span>
        </div>
        <div className="navbar__stat navbar__stat--streak">
          <PixelSprite name="heart" size={13} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--green">{stats.currentStreak}</span>
        </div>

        {/* User Auth Action */}
        <div className="navbar__stat navbar__stat--user" style={{ marginLeft: 2 }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="navbar__user-name" style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--cyan)' }}>
                👾 {currentUser.username}
              </span>
              <button
                className="btn btn-secondary btn--reset navbar__logout-btn"
                onClick={logout}
                style={{ padding: '4px 8px', fontSize: 10 }}
                title="Sign Out"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary navbar__signin-btn"
              onClick={openAuthModal}
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 8,
                padding: '5px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
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
