import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP } from '../data/roadmap';
import { TRACKS, getTrack } from '../data/catalog';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

const PHASE_DESCRIPTIONS = {
  'phase-1': 'Master the fundamentals of Java — from JVM architecture and memory models to OOP and collections. ☕',
  'phase-2': 'Level up with high-yield LeetCode core patterns: Two Pointers, Sliding Window, Linked Lists, and Stacks. 🧩',
  'phase-3': 'Conquer advanced LeetCode patterns: Binary Trees, Heaps/PriorityQueues, Graph traversals, and Dynamic Programming. 🧠',
  'phase-4': 'Design enterprise database schemas, write complex SQL queries, optimize indexes, and connect backend apps. 🗄️',
  'phase-5': 'Build production-ready enterprise REST APIs with Spring Boot 3, Spring Data JPA, and Spring Security. ⚙️',
  'phase-6': 'Create responsive, modern user interfaces with Semantic HTML5, CSS Grid/Flexbox, ES6+ JavaScript, and React. 🎨',
  'phase-7': 'Ship like a senior engineer! Master Git workflows, containerize with Docker, automate CI/CD, and defend your Capstone. 🚀',
  'phase-py-1': 'Master Python 3 foundations, clean syntax, dictionaries, list comprehensions, and Pythonic OOP with magic methods. 🐍',
  'phase-sys-1': 'Master low-level C programming, memory addressing, pointers, heap allocation with malloc/free, and stack frames. ⚙️',
};

export default function Dashboard() {
  const { stats, isPhaseUnlocked, getPhaseProgress, progress, activeTrackId, changeActiveTrack } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeTrack = getTrack(activeTrackId);
  const activePhases = activeTrack.phases;

  // Track progress calculation helper
  const getTrackStats = (track) => {
    let total = 0;
    let done = 0;
    let totalEx = 0;
    let doneEx = 0;
    let totalProj = 0;
    let doneProj = 0;

    track.phases.forEach(phase => {
      const pProg = getPhaseProgress(phase);
      total += pProg.total;
      done += pProg.done;

      phase.weeks.forEach(w => {
        const exCount = w.exercises?.length || 0;
        totalEx += exCount;
        for (let i = 0; i < exCount; i++) {
          if (progress[`${w.id}-exercise-${i}`]) doneEx++;
        }
        if (w.project) {
          totalProj++;
          if (progress[`${w.id}-project`]) doneProj++;
        }
      });
    });

    const pct = total ? Math.round((done / total) * 100) : 0;
    return { total, done, pct, totalEx, doneEx, totalProj, doneProj };
  };

  const activeStats = getTrackStats(activeTrack);

  // Find continue target within the active track
  let continueTarget = null;
  for (const phase of activePhases) {
    const pp = getPhaseProgress(phase);
    if (pp.pct < 100) {
      continueTarget = `/phase/${phase.id}`;
      break;
    }
  }
  if (!continueTarget && activePhases.length > 0) {
    continueTarget = `/phase/${activePhases[0].id}`;
  }

  const scrollToCatalog = (e) => {
    e.preventDefault();
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dashboard-container">
      {/* ── Active Track Hero Banner (Codédex Hybrid Header) ── */}
      <div className="course-hero track-hero" style={{ borderLeft: `4px solid ${activeTrack.color || 'var(--cyan)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div className="course-hero__badge" style={{ color: activeTrack.color || 'var(--cyan)' }}>
              <span style={{ fontSize: 13, marginRight: 6 }}>{activeTrack.icon}</span>
              {activeTrack.badge || 'CAREER TRACK'}
            </div>
            <div className="hero-companion-badge">
              <PixelSprite name="bot" size={14} animated />
              <span className="hero-companion-badge__bubble">Active Quest</span>
            </div>
          </div>
          <button onClick={scrollToCatalog} className="btn-track-switch-pill">
            🔀 Switch Track ({TRACKS.length} Available)
          </button>
        </div>

        <GlitchHeader as="h1" className="course-hero__title" text={activeTrack.title} />

        <p className="course-hero__desc">
          {activeTrack.tagline}
        </p>

        {/* Tags */}
        <div className="track-tags-list">
          {activeTrack.tags.map(tag => (
            <span key={tag} className="track-tag-pill">{tag}</span>
          ))}
        </div>

        {/* Action Buttons & Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 16 }}>
          {continueTarget && (
            <Link to={continueTarget} className="course-hero__cta" style={{ margin: 0 }}>
              ▶ Continue {activeTrack.title.split('&')[0]}
            </Link>
          )}
          <button onClick={scrollToCatalog} className="btn btn-secondary" style={{ padding: '12px 20px', fontSize: 13, fontWeight: 700 }}>
            🗺️ Browse All Tracks
          </button>
        </div>

        <div className="course-hero__meta" style={{ marginTop: 20 }}>
          <span>⏱ {activeTrack.duration.toUpperCase()}</span>
          <span>📘 {activeStats.total} MODULES</span>
          <span>📊 {activeStats.pct}% COMPLETE</span>
          <span>⚡ {stats.totalXp} TOTAL XP</span>
        </div>

        {/* Track Completion Bar */}
        <div className="track-hero-progress-bar">
          <div className="track-hero-progress-fill" style={{ width: `${activeStats.pct}%`, background: activeTrack.color || 'var(--cyan)' }} />
        </div>
      </div>

      {/* ── Two-column layout on desktop: Left = Chapters, Right = Sidebar ── */}
      <div className="course-layout">
        {/* Left: Active Track Chapter list */}
        <div className="course-main">
          <div className="track-roadmap-header">
            <h2 style={{ fontFamily: 'var(--font-pixel)', fontSize: 13, color: 'var(--white)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{activeTrack.icon}</span> {activeTrack.title} Roadmap
            </h2>
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              {activePhases.length} Phases · {activeStats.done} / {activeStats.total} Completed
            </span>
          </div>

          <ChapterList
            phases={activePhases}
            progress={progress}
            isPhaseUnlocked={isPhaseUnlocked}
            getPhaseProgress={getPhaseProgress}
            isMobile={isMobile}
          />
        </div>

        {/* Right: Sidebar */}
        <div className="course-sidebar">
          {/* User Profile Card */}
          <div className="sidebar-card user-card">
            <img src="/images/pixel_cyber_mascot.jpg" alt="Byte Knight" className="user-card__pixel-avatar" />
            <div className="user-card__name">ByteKnight</div>
            <div className="user-card__level" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <PixelSprite name="trophy" size={12} /> Level {stats.level} Cyber Hacker
            </div>
          </div>

          {/* Active Track Progress Breakdown */}
          <div className="sidebar-card">
            <div className="sidebar-card__title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Track Progress</span>
              <span style={{ color: activeTrack.color || 'var(--cyan)', fontSize: 12 }}>{activeStats.pct}%</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <ProgressRow icon="📘" label="Exercises" done={activeStats.doneEx} total={activeStats.totalEx} color="var(--cyan)" />
              <ProgressRow icon="🚀" label="Projects" done={activeStats.doneProj} total={activeStats.totalProj} color="var(--green-bright)" />
              <ProgressRow icon="⚡" label="Track Modules" done={activeStats.done} total={activeStats.total} color="var(--yellow)" />
            </div>
          </div>

          {/* Quick Track Switcher Widget */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Quick Switch Track</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {TRACKS.map(t => {
                const isCur = t.id === activeTrack.id;
                const tStats = getTrackStats(t);
                return (
                  <button
                    key={t.id}
                    onClick={() => changeActiveTrack(t.id)}
                    className={`sidebar-track-pill ${isCur ? 'sidebar-track-pill--active' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{t.icon}</span>
                      <span className="sidebar-track-pill__name">{t.title.split('&')[0]}</span>
                    </div>
                    <span className="sidebar-track-pill__pct">{tStats.pct}%</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Global Stats Card */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Global Career Stats</div>
            <div style={{ marginTop: 12 }}>
              <StatRow icon="🔥" label="Day Streak" value={stats.currentStreak} />
              <StatRow icon="⭐" label="Hacker Level" value={stats.level} />
              <StatRow icon="⚡" label="Total XP" value={stats.totalXp} />
            </div>
          </div>
        </div>
      </div>

      {/* ── Codédex-style Course Catalog Grid Section ── */}
      <div id="catalog-section" className="catalog-section">
        <div className="catalog-header">
          <div className="catalog-badge">
            <PixelSprite name="sparkle" size={12} style={{ marginRight: 6 }} />
            5 CAREER TRACKS CATALOG
          </div>
          <GlitchHeader as="h2" className="catalog-title" text="Choose Your Career Specialization" />
          <p className="catalog-desc">
            Learn at your own pace. All 5 tracks feature interactive coding environments, multi-language compiler support, quizzes, and portfolio-ready capstones.
          </p>
        </div>

        <div className="catalog-grid">
          {TRACKS.map(track => {
            const isCur = track.id === activeTrack.id;
            const tStats = getTrackStats(track);
            return (
              <div
                key={track.id}
                className={`catalog-card ${isCur ? 'catalog-card--enrolled' : ''}`}
                style={{ '--track-color': track.color || 'var(--cyan)' }}
              >
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

                {/* Tech Tags */}
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
                  {isCur ? (
                    <button
                      className="btn-catalog-enrolled"
                      disabled
                    >
                      ✓ Currently Enrolled
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        changeActiveTrack(track.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="btn-catalog-switch"
                    >
                      🚀 Switch to this Track
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ProgressRow({ icon, label, done, total, color }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="sidebar-progress-item">
      <div className="sidebar-progress-item__icon">{icon}</div>
      <div className="sidebar-progress-item__info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="sidebar-progress-item__label">{label}</span>
          <span className="sidebar-progress-item__count">{done} / {total}</span>
        </div>
        <div className="sidebar-progress-bar">
          <div className="sidebar-progress-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span style={{ flex: 1, fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--white)' }}>{value}</span>
    </div>
  );
}

function ChapterList({ phases, progress, isPhaseUnlocked, getPhaseProgress, isMobile }) {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [openPhase, setOpenPhase] = useState(0);

  useEffect(() => {
    setSelectedPhase(0);
    setOpenPhase(0);
  }, [phases]);

  if (isMobile) {
    const activePhase = phases[selectedPhase] || phases[0];
    const activeProgress = activePhase ? getPhaseProgress(activePhase) : { pct: 0 };

    if (!activePhase) return null;

    return (
      <div className="mobile-phase-container">
        {/* Horizontal Scrollable Phase Switcher Tabs */}
        <div className="mobile-phase-tabs-wrapper">
          <div className="mobile-phase-tabs">
            {phases.map((phase, i) => {
              const unlocked = isPhaseUnlocked(i, phases);
              const { pct } = getPhaseProgress(phase);
              const isSelected = selectedPhase === i;
              return (
                <button
                  key={phase.id}
                  className={`mobile-phase-tab ${isSelected ? 'mobile-phase-tab--active' : ''} ${!unlocked ? 'mobile-phase-tab--locked' : ''}`}
                  onClick={() => unlocked && setSelectedPhase(i)}
                  disabled={!unlocked}
                >
                  <span className="mobile-phase-tab__num">Phase {i + 1}</span>
                  <span className="mobile-phase-tab__name">{phase.title.split(':')[0]}</span>
                  {!unlocked ? (
                    <span className="mobile-phase-tab__status">🔒</span>
                  ) : pct === 100 ? (
                    <span className="mobile-phase-tab__status">✅</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Phase View */}
        <div className="mobile-selected-phase-card">
          <div className="mobile-phase-banner">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <span className="mobile-phase-tag">PHASE {selectedPhase + 1} OF {phases.length}</span>
              <span className="mobile-phase-pct">{activeProgress.pct}% COMPLETED</span>
            </div>
            <h2 className="mobile-phase-title">{activePhase.title}</h2>
            <p className="mobile-phase-desc">{PHASE_DESCRIPTIONS[activePhase.id] || activePhase.subtitle}</p>
            <div className="sidebar-progress-bar" style={{ height: 5, margin: '12px 0 16px' }}>
              <div className="sidebar-progress-fill" style={{ width: `${activeProgress.pct}%`, background: 'var(--cyan)' }} />
            </div>
          </div>

          <div className="mobile-phase-weeks">
            {activePhase.weeks.map(week => (
              <WeekSection key={week.id} week={week} phase={activePhase} progress={progress} />
            ))}
          </div>

          {/* Prev/Next Phase Nav */}
          <div className="mobile-phase-pager">
            <button
              className="btn btn-secondary"
              disabled={selectedPhase === 0}
              onClick={() => setSelectedPhase(p => Math.max(0, p - 1))}
            >
              ← Prev Phase
            </button>
            <button
              className="btn btn-secondary"
              disabled={selectedPhase === phases.length - 1 || !isPhaseUnlocked(selectedPhase + 1, phases)}
              onClick={() => setSelectedPhase(p => Math.min(phases.length - 1, p + 1))}
            >
              Next Phase →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chapter-list">
      {phases.map((phase, i) => {
        const unlocked = isPhaseUnlocked(i, phases);
        const { done, total, pct } = getPhaseProgress(phase);
        const isOpen = openPhase === i;

        let numberClass = 'chapter-number';
        if (pct === 100) numberClass += ' chapter-number--done';
        else if (done > 0) numberClass += ' chapter-number--active';

        return (
          <div className="chapter" key={phase.id}>
            <div
              className="chapter-header"
              onClick={() => unlocked && setOpenPhase(isOpen ? -1 : i)}
            >
              <div className={numberClass}>{i + 1}</div>
              <div className="chapter-title">{phase.title}</div>
              {!unlocked ? (
                <span className="chapter-tag chapter-tag--locked">🔒</span>
              ) : pct === 100 ? (
                <span style={{ color: 'var(--green-bright)', fontSize: 14 }}>✅</span>
              ) : null}
              {unlocked && (
                <span className={`chapter-chevron ${isOpen ? 'chapter-chevron--open' : ''}`}>▼</span>
              )}
            </div>

            {isOpen && unlocked && (
              <div className="chapter-body">
                <div className="chapter-desc">
                  {PHASE_DESCRIPTIONS[phase.id] || phase.subtitle}
                </div>
                {phase.weeks.map(week => (
                  <WeekSection key={week.id} week={week} phase={phase} progress={progress} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function WeekSection({ week, phase, progress }) {
  const lessonCount = week.lessons?.length || 0;
  const exerciseCount = week.exercises?.length || 0;
  const hasQuiz = week.quiz && week.quiz.length > 0;
  const hasProject = !!week.project;

  return (
    <div className="week-section-wrapper">
      <div className="week-section-header">
        <span className="week-section-badge">WEEK {week.number}</span>
        <span className="week-section-title">{week.title}</span>
      </div>
      <div className="chapter-items">
        {Array.from({ length: lessonCount }, (_, i) => {
          const done = progress[`${week.id}-lesson-${i}`];
          const isFirst = i === 0 && !done;
          return (
            <Link
              key={`lesson-${i}`}
              to={`/lesson/${week.id}/${i}`}
              className={`chapter-item ${done ? 'chapter-item--done' : ''}`}
            >
              <span className="chapter-item__type">Lesson {i + 1}</span>
              <span className="chapter-item__name">
                {week.lessons?.[i]?.title || week.title.split(',')[0]}
              </span>
              {done ? (
                <span className="chapter-item__status">✅</span>
              ) : isFirst ? (
                <span className="chapter-item__btn chapter-item__btn--start">Start →</span>
              ) : (
                <span className="chapter-item__btn chapter-item__btn--locked" title="Locked">🔒</span>
              )}
            </Link>
          );
        })}

        {Array.from({ length: exerciseCount }, (_, i) => {
          const done = progress[`${week.id}-exercise-${i}`];
          return (
            <Link
              key={`exercise-${i}`}
              to={`/exercise/${week.id}/${i}`}
              className={`chapter-item ${done ? 'chapter-item--done' : ''}`}
            >
              <span className="chapter-item__type">Exercise {i + 1}</span>
              <span className="chapter-item__name">
                {week.exercises?.[i]?.title || 'Practice Challenge'}
              </span>
              {done ? (
                <span className="chapter-item__status">✅</span>
              ) : (
                <span className="chapter-item__btn chapter-item__btn--locked" title="Locked">🔒</span>
              )}
            </Link>
          );
        })}

        {hasQuiz && (
          <Link
            to={`/quiz/${week.id}`}
            className={`chapter-item ${progress[`${week.id}-quiz`] ? 'chapter-item--done' : ''}`}
          >
            <span className="chapter-item__type">Quiz</span>
            <span className="chapter-item__name">Weekly Knowledge Check</span>
            {progress[`${week.id}-quiz`] ? (
              <span className="chapter-item__status">✅</span>
            ) : (
              <span className="chapter-item__btn chapter-item__btn--locked" title="Locked">🔒</span>
            )}
          </Link>
        )}

        {hasProject && (
          <Link
            to={`/project/${week.id}`}
            className={`chapter-item ${progress[`${week.id}-project`] ? 'chapter-item--done' : ''}`}
          >
            <span className="chapter-item__type">Project</span>
            <span className="chapter-item__name">Portfolio Capstone</span>
            {progress[`${week.id}-project`] ? (
              <span className="chapter-item__status">✅</span>
            ) : (
              <span className="chapter-item__btn chapter-item__btn--locked" title="Locked">🔒</span>
            )}
          </Link>
        )}
      </div>
    </div>
  );
}
