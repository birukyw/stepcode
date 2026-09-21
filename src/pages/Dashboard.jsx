import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { TRACKS } from '../data/catalog';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

export default function Dashboard() {
  const { stats, getPhaseProgress, progress, activeTrackId, openShopModal, MAX_LEVEL = 50, MAX_COURSE_XP = 6000 } = useContext(AppContext);
  const hearts = stats.hearts !== undefined ? stats.hearts : 1;
  const coins = stats.coins || 0;
  const maxLevelPct = Math.min(100, Math.round((stats.totalXp / MAX_COURSE_XP) * 100));

  // Helper to compute stats per track
  const getTrackStats = (track) => {
    let total = 0;
    let done = 0;
    let totalEx = 0;
    let doneEx = 0;
    let nextItem = null;

    track.phases.forEach(phase => {
      const pProg = getPhaseProgress(phase);
      total += pProg.total;
      done += pProg.done;

      phase.weeks.forEach(w => {
        const exCount = w.exercises?.length || 0;
        totalEx += exCount;
        for (let i = 0; i < exCount; i++) {
          if (progress[`${w.id}-exercise-${i}`]) doneEx++;
          else if (!nextItem) nextItem = { title: w.exercises[i]?.title || 'Practice Exercise', link: `/exercise/${w.id}/${i}` };
        }
        (w.lessons || []).forEach((l, lIdx) => {
          if (!progress[`${w.id}-lesson-${lIdx}`] && !nextItem) {
            nextItem = { title: l.title || 'Lesson', link: `/lesson/${w.id}/${lIdx}` };
          }
        });
      });
    });

    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, pct, totalEx, doneEx, nextItem };
  };

  // Find tracks user has tried/progressed in
  const startedTracks = TRACKS
    .map(track => ({ track, stats: getTrackStats(track) }))
    .filter(item => item.stats.done > 0 || item.track.id === activeTrackId && stats.totalXp > 0)
    .sort((a, b) => b.stats.pct - a.stats.pct);

  return (
    <div className="catalog-hub-container">
      {/* ── Main Catalog Header ── */}
      <div className="catalog-hub-hero">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 12 }}>
          <div className="catalog-badge">
            <PixelSprite name="sparkle" size={12} style={{ marginRight: 6 }} />
            CAREER SPECIALIZATION CATALOG
          </div>
        </div>

        <GlitchHeader as="h1" className="catalog-hub-hero__title" text="Choose Your Career Specialization" />

        <p className="catalog-hub-hero__desc">
          Master computer science and modern engineering from scratch. Every specialization is <strong>100% unlocked</strong> with browser-based compilers, LeetCode multi-language challenges, quizzes, and portfolio projects.
        </p>

        {/* Global User Metric Quick-Bar & Level Progression */}
        <div className="catalog-global-stats">
          <div className="catalog-global-stat-item">
            <PixelSprite name="chip" size={14} />
            <span><strong>{stats.totalXp}</strong> / {MAX_COURSE_XP} XP</span>
          </div>
          <div className="catalog-global-stat-item">
            <PixelSprite name="trophy" size={14} />
            <span>Level <strong>{stats.level}</strong> <span style={{ opacity: 0.65 }}>/ {MAX_LEVEL}</span></span>
          </div>
          <div className="catalog-global-stat-item" title="Streaks are shielded by hearts!">
            <span style={{ fontSize: 13, marginRight: 2 }}>🔥</span>
            <span><strong>{stats.currentStreak}</strong>d Streak</span>
          </div>
          <div
            className="catalog-global-stat-item catalog-global-stat-item--clickable"
            onClick={openShopModal}
            title="Click to visit Tiny Shop and buy more hearts!"
            style={{ cursor: 'pointer' }}
          >
            <PixelSprite name="heart" size={14} />
            <span style={{ color: 'var(--red, #f43f5e)' }}><strong>{hearts}/5</strong> Hearts</span>
          </div>
          <div
            className="catalog-global-stat-item catalog-global-stat-item--clickable"
            onClick={openShopModal}
            title="Click to open The Pixel Bazaar shop!"
            style={{ cursor: 'pointer' }}
          >
            <PixelSprite name="coin" size={14} />
            <span style={{ color: 'var(--yellow, #facc15)' }}><strong>{coins}</strong> Coins</span>
            <span className="navbar__shop-badge" style={{ marginLeft: 6 }}>SHOP 🛒</span>
          </div>
        </div>

        {/* Overall Mastery Progress Bar toward Max Level 50 */}
        <div className="catalog-level-progress-bar-container">
          <div className="catalog-level-progress-bar-header">
            <span>Course Mastery Progress to Max Level {MAX_LEVEL}</span>
            <span style={{ color: 'var(--cyan)' }}>{maxLevelPct}% Complete</span>
          </div>
          <div className="sidebar-progress-bar" style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)' }}>
            <div
              className="sidebar-progress-fill"
              style={{
                width: `${Math.max(2, maxLevelPct)}%`,
                background: 'linear-gradient(90deg, var(--cyan) 0%, var(--green-bright) 50%, var(--yellow) 100%)',
                boxShadow: '0 0 8px rgba(0, 240, 255, 0.4)'
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Section: "Continue From Where You Left Off" ── */}
      {startedTracks.length > 0 ? (
        <div className="continue-section">
          <div className="section-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>⚡</span>
              <h2 className="section-title">Continue From Where You Left Off</h2>
            </div>
            <span className="section-subtitle">Jump back into your active quests</span>
          </div>

          <div className="continue-grid">
            {startedTracks.map(({ track, stats: tStats }) => (
              <div key={track.id} className="continue-card" style={{ '--card-color': track.color || 'var(--cyan)' }}>
                <div className="continue-card__header">
                  <div className="continue-card__icon-box">
                    <span>{track.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span className="continue-card__badge" style={{ color: track.color || 'var(--cyan)' }}>
                        {track.badge}
                      </span>
                      <span className="continue-card__pct">{tStats.pct}% DONE</span>
                    </div>
                    <h3 className="continue-card__title">{track.title}</h3>
                  </div>
                </div>

                <div className="sidebar-progress-bar" style={{ margin: '14px 0 10px' }}>
                  <div className="sidebar-progress-fill" style={{ width: `${tStats.pct}%`, background: track.color || 'var(--cyan)' }} />
                </div>

                <div className="continue-card__next">
                  <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>NEXT UP:</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 500 }}>
                    {tStats.nextItem?.title || 'Track Capstone Review'}
                  </span>
                </div>

                <div className="continue-card__actions">
                  <Link
                    to={tStats.nextItem?.link || `/track/${track.id}`}
                    className="btn btn-primary continue-card__resume-btn"
                  >
                    ▶ Resume Course
                  </Link>
                  <Link
                    to={`/track/${track.id}`}
                    className="btn btn-secondary continue-card__syllabus-btn"
                  >
                    Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Welcome Quickstart when user has 0 progress */
        <div className="welcome-quickstart-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="welcome-quickstart-icon">🚀</div>
            <div>
              <h3 style={{ fontSize: 15, color: '#fff', margin: '0 0 4px', fontFamily: 'var(--font-pixel)' }}>
                New Quest Initiated!
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)' }}>
                Select a career specialization below to view the syllabus and begin your first interactive lesson.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Section: All Career Specialization Options ── */}
      <div className="all-tracks-section">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 18 }}>🗺️</span>
            <h2 className="section-title">All Career Specializations</h2>
          </div>
          <span className="section-subtitle">
            5 full-length career tracks · 100% unlocked · Self-paced learning
          </span>
        </div>

        <div className="catalog-grid">
          {TRACKS.map(track => {
            const tStats = getTrackStats(track);
            const isPython = track.id === 'python-intro';

            return (
              <Link
                key={track.id}
                to={`/track/${track.id}`}
                className={`catalog-card catalog-card--clickable ${isPython ? 'catalog-card--flagship' : ''}`}
                style={{ '--track-color': track.color || 'var(--cyan)' }}
              >
                {/* Retro Pixel Art Card Banner */}
                {track.heroImage && (
                  <div
                    className="catalog-card__hero-banner"
                    style={{ backgroundImage: `url(${track.heroImage})` }}
                  >
                    <div className="catalog-card__hero-overlay" />
                    <div style={{ position: 'absolute', top: 8, right: 10, zIndex: 2 }}>
                      <span className="catalog-card__badge" style={{ color: track.color || 'var(--cyan)', background: 'rgba(10, 15, 29, 0.85)', backdropFilter: 'blur(4px)' }}>
                        {track.badge}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Title & Icon Header */}
                <div className="catalog-card__top" style={{ marginBottom: 8 }}>
                  <div className="catalog-card__icon-box">
                    <span className="catalog-card__icon">{track.icon}</span>
                  </div>
                  <h3 className="catalog-card__title" style={{ flex: 1, margin: 0 }}>
                    {track.title}
                  </h3>
                </div>

                {/* Concise Punchy Tagline (No long bloated descriptions) */}
                <p className="catalog-card__tagline" style={{ marginBottom: 12 }}>
                  {track.tagline}
                </p>

                {/* Tech tags */}
                <div className="catalog-card__tags" style={{ marginBottom: 14 }}>
                  {track.tags.slice(0, 4).map(t => (
                    <span key={t} className="catalog-pill">{t}</span>
                  ))}
                </div>

                {/* Metadata & Progress */}
                <div className="catalog-card__meta" style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <span>⏱ {track.duration}</span>
                  <span>📘 {tStats.total} Modules</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--cyan)', fontWeight: 600 }}>
                    {tStats.pct > 0 ? `${tStats.pct}% Done` : 'Explore →'}
                  </span>
                </div>

                {/* Progress bar */}
                {tStats.pct > 0 && (
                  <div className="sidebar-progress-bar" style={{ marginTop: 8 }}>
                    <div className="sidebar-progress-fill" style={{ width: `${tStats.pct}%`, background: track.color || 'var(--cyan)' }} />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
