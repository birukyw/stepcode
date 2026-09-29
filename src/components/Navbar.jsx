import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { getTrack } from '../data/catalog';
import ThemePicker from './ThemePicker';
import PixelSprite from './PixelSprite';
import GlitchHeader from './GlitchHeader';

export default function Navbar() {
  const { stats, currentUser, openAuthModal, logout, openShopModal, MAX_LEVEL = 50, MAX_COURSE_XP = 6000 } = useContext(AppContext);
  const hearts = stats.hearts !== undefined ? stats.hearts : 1;
  const coins = stats.coins || 0;
  const xpPct = Math.min(100, Math.round((stats.totalXp / MAX_COURSE_XP) * 100));

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Link to="/" className="navbar__brand">
          <span className="navbar__icon" style={{ display: 'inline-flex', alignItems: 'center' }}>
            <PixelSprite name="bot" size={20} animated />
          </span>
          <GlitchHeader as="span" className="navbar__title" text="CodeQuest" scramble={false} />
        </Link>
      </div>
      <div className="navbar__stats">
        <div className="navbar__stat navbar__stat--theme">
          <ThemePicker />
        </div>

        {/* Level & XP toward Max Level 50 */}
        <div className="navbar__stat navbar__stat--xp" title={`${stats.totalXp} / ${MAX_COURSE_XP} XP to Max Level ${MAX_LEVEL}`}>
          <PixelSprite name="chip" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--cyan">{stats.totalXp} XP</span>
          <div className="navbar__xp-bar" title={`${xpPct}% towards Max Level ${MAX_LEVEL}`}>
            <div className="navbar__xp-fill" style={{ width: `${Math.max(4, xpPct)}%` }} />
          </div>
        </div>

        <div className="navbar__stat navbar__stat--level" title={`Level ${stats.level} of ${MAX_LEVEL}`}>
          <PixelSprite name="trophy" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--yellow">Lv.{stats.level}<span style={{ fontSize: 9, opacity: 0.7 }}>/{MAX_LEVEL}</span></span>
        </div>

        {/* Streak Counter */}
        <div className="navbar__stat navbar__stat--streak" title={`${stats.currentStreak} Day Streak!`}>
          <span style={{ fontSize: 13, marginRight: 4 }}>🔥</span>
          <span className="navbar__stat-value navbar__stat-value--green">{stats.currentStreak}d</span>
        </div>

        {/* Hearts & Streak Shield (Clickable to open Tiny Shop) */}
        <button
          className="navbar__stat navbar__stat--clickable navbar__stat--hearts"
          onClick={openShopModal}
          title={`${hearts}/5 Hearts. Hearts protect your streak if you miss a day! Click to visit Tiny Shop.`}
        >
          <PixelSprite name="heart" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--red">{hearts}/5</span>
        </button>

        {/* Gold Coins & Tiny Shop Trigger */}
        <button
          className="navbar__stat navbar__stat--clickable navbar__stat--coins"
          onClick={openShopModal}
          title={`${coins} Gold Coins. Click to open The Pixel Bazaar shop!`}
        >
          <PixelSprite name="coin" size={14} style={{ marginRight: 4 }} />
          <span className="navbar__stat-value navbar__stat-value--gold">{coins}</span>
          <span className="navbar__shop-badge">SHOP 🛒</span>
        </button>

        {/* User Auth Action */}
        <div className="navbar__stat navbar__stat--user" style={{ marginLeft: 2 }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="navbar__user-name" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600, color: 'var(--cyan)' }}>
                👾 {currentUser.username}
              </span>
              <button
                className="btn btn-secondary btn--reset navbar__logout-btn"
                onClick={logout}
                style={{ padding: '4px 10px', fontSize: 12 }}
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
                fontFamily: 'var(--font-heading)',
                fontSize: 12,
                fontWeight: 700,
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
