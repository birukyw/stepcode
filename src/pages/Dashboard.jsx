import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { TRACKS } from '../data/catalog';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

export default function Dashboard() {
  const { stats, getPhaseProgress, progress, activeTrackId } = useContext(AppContext);

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

        {/* Global User Metric Quick-Bar */}
        <div className="catalog-global-stats">
          <div className="catalog-global-stat-item">
            <PixelSprite name="chip" size={14} />
            <span><strong>{stats.totalXp}</strong> XP Earned</span>
          </div>
          <div className="catalog-global-stat-item">
            <PixelSprite name="trophy" size={14} />
            <span>Level <strong>{stats.level}</strong> Hacker</span>
          </div>
          <div className="catalog-global-stat-item">
            <PixelSprite name="heart" size={14} />
            <span><strong>{stats.currentStreak}</strong> Day Streak</span>
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
              <div
                key={track.id}
                className={`catalog-card ${isPython ? 'catalog-card--flagship' : ''}`}
                style={{ '--track-color': track.color || 'var(--cyan)' }}
              >
                {/* Top header */}
                <div className="catalog-card__top">
                  <div className="catalog-card__icon-box">
                    <span className="catalog-card__icon">{track.icon}</span>
                  </div>
                  <span className="catalog-card__badge" style={{ color: track.color || 'var(--cyan)' }}>
                    {track.badge}
                  </span>
                </div>

                <h3 className="catalog-card__title">{track.title}</h3>
                <p className="catalog-card__tagline">{track.tagline}</p>
                <p className="catalog-card__desc">{track.description}</p>

                {/* Level Breakdown Pills (e.g. for Python track) */}
                {track.levels && (
                  <div className="catalog-card__levels-box">
                    {track.levels.map(lvl => (
                      <div key={lvl.id} className="catalog-card__level-row">
                        <span style={{ fontSize: 12 }}>{lvl.icon}</span>
                        <span style={{ fontWeight: 600, color: '#fff', fontSize: 11 }}>{lvl.title}:</span>
                        <span style={{ color: 'var(--text-dim)', fontSize: 11 }}>{lvl.modulesCount} Modules</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech tags */}
                <div className="catalog-card__tags">
                  {track.tags.map(t => (
                    <span key={t} className="catalog-pill">{t}</span>
                  ))}
                </div>

                {/* Metadata */}
                <div className="catalog-card__meta">
                  <span>⏱ {track.duration}</span>
                  <span>📈 {track.difficulty}</span>
                  <span>📘 {tStats.total} Modules</span>
                </div>

                {/* Progress bar */}
                <div className="catalog-card__progress">
                  <div className="catalog-card__progress-info">
                    <span>Progress</span>
                    <span style={{ fontWeight: 700 }}>{tStats.pct}%</span>
                  </div>
                  <div className="sidebar-progress-bar">
                    <div className="sidebar-progress-fill" style={{ width: `${tStats.pct}%`, background: track.color || 'var(--cyan)' }} />
                  </div>
                </div>

                {/* Action button */}
                <div className="catalog-card__action">
                  <Link
                    to={`/track/${track.id}`}
                    className="btn-catalog-switch"
                    style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
                  >
                    📖 View Track Syllabus & Modules →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
