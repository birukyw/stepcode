import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { getTrack, TRACKS } from '../data/catalog';
import PixelSprite from '../components/PixelSprite';

export default function TrackPage() {
  const { trackId } = useParams();
  const { progress, getPhaseProgress, currentUser, stats, openAuthModal } = useContext(AppContext);
  const track = getTrack(trackId);
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | level.id

  // Calculate track progress
  let totalItems = 0;
  let doneItems = 0;
  let totalEx = 0;
  let doneEx = 0;
  let totalProj = 0;
  let doneProj = 0;

  track.phases.forEach(phase => {
    const pProg = getPhaseProgress(phase);
    totalItems += pProg.total;
    doneItems += pProg.done;

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

  const overallPct = totalItems ? Math.round((doneItems / totalItems) * 100) : 0;

  // Determine phases to display based on level filter
  let displayPhases = track.phases;
  if (track.levels && selectedLevel !== 'all') {
    const lvl = track.levels.find(l => l.id === selectedLevel);
    if (lvl && lvl.phases) {
      displayPhases = lvl.phases;
    }
  }

  // Find first incomplete item to continue
  let continueLink = null;
  for (const phase of track.phases) {
    for (const week of phase.weeks) {
      const lessons = week.lessons || [];
      for (let i = 0; i < lessons.length; i++) {
        if (!progress[`${week.id}-lesson-${i}`]) {
          continueLink = `/lesson/${week.id}/${i}`;
          break;
        }
      }
      if (continueLink) break;
    }
    if (continueLink) break;
  }
  if (!continueLink && track.phases.length > 0 && track.phases[0].weeks.length > 0) {
    continueLink = `/lesson/${track.phases[0].weeks[0].id}/0`;
  }

  return (
    <div className="track-page-container">
      {/* Back to Catalog Breadcrumb */}
      <div style={{ marginBottom: 18 }}>
        <Link to="/" className="phase-page__back" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          ← Back to All Career Specializations
        </Link>
      </div>

      {/* ── Panoramic Retro Pixel Heading Section ── */}
      <div
        className="codedex-hero-banner"
        style={{
          backgroundImage: `url(${track.heroImage || '/images/custom_pixel_python_sage.png'})`,
        }}
      >
        <div className="codedex-hero-overlay" />
        <div className="codedex-hero-scanline" />

        {/* Top Controls: Coin/Brand & Skip */}
        <div className="codedex-top-controls">
          <div className="codedex-top-brand">
            <span>🪙 {stats.totalXp} XP</span>
            <span>CodeQuest</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {continueLink && (
              <Link to={continueLink} className="codedex-top-btn" title="Skip directly to next lesson">
                <span>Skip</span>
                <span>&gt;</span>
              </Link>
            )}
          </div>
        </div>

        {/* Main Left Content Overlay */}
        <div className="codedex-hero-content">
          <div className="codedex-badge">
            <span style={{ fontSize: 11 }}>📶</span>
            <span>{track.heroBadge || 'CAREER TRACK'}</span>
          </div>

          <h1 className="codedex-hero-title">
            {track.shortTitle || track.title}
          </h1>

          <p className="codedex-hero-desc">
            {track.heroDescription || track.description}
          </p>

          {/* Yellow 3D CTA Button */}
          <div>
            {continueLink ? (
              <Link to={continueLink} className="codedex-start-btn">
                <span>{doneItems > 0 ? 'Continue Learning' : 'Start Learning for Free'}</span>
              </Link>
            ) : (
              <button className="codedex-start-btn" disabled>
                <span>Track Completed 🎉</span>
              </button>
            )}
          </div>

          {/* Clean Metadata Row: Duration & Total Modules */}
          <div className="codedex-hero-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>⏱</span>
              <span>Time to complete: {track.timeToComplete || '22h'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📘</span>
              <span>{totalItems} Total Modules</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>📊</span>
              <span>{overallPct}% Completed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Level Filter Tabs (for courses with multi-level tiers like Python) */}
      {track.levels && track.levels.length > 0 && (
        <div className="track-level-tabs">
          <button
            className={`track-level-tab ${selectedLevel === 'all' ? 'track-level-tab--active' : ''}`}
            onClick={() => setSelectedLevel('all')}
          >
            All Curriculum ({totalItems} Modules)
          </button>
          {track.levels.map(level => {
            const isSelected = selectedLevel === level.id;
            return (
              <button
                key={level.id}
                className={`track-level-tab ${isSelected ? 'track-level-tab--active' : ''}`}
                onClick={() => setSelectedLevel(level.id)}
              >
                <span style={{ marginRight: 6 }}>{level.icon}</span>
                {level.title}
                <span className="track-level-tab__badge">{level.badge}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Syllabus Layout */}
      <div className="course-layout" style={{ marginTop: 24 }}>
        {/* Left: Syllabus Modules & Lessons */}
        <div className="course-main">
          {displayPhases.map((phase, pIdx) => {
            const phaseProg = getPhaseProgress(phase);
            const isIntermediate = phase.id.includes('intermediate');
            return (
              <div key={phase.id} className="track-phase-card">
                <div className="track-phase-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 16 }}>{phase.icon || '📘'}</span>
                      <span className="track-phase-tag">
                        {isIntermediate ? 'STANDALONE ELECTIVES (PICK & CHOOSE)' : `PHASE ${pIdx + 1}`}
                      </span>
                    </div>
                    <h2 className="track-phase-title">{phase.title}</h2>
                    <p className="track-phase-subtitle">{phase.subtitle}</p>
                  </div>
                  <div className="track-phase-pct">
                    <span>{phaseProg.pct}%</span>
                  </div>
                </div>

                <div className="track-weeks-container">
                  {phase.weeks.map(week => (
                    <TrackWeekItem key={week.id} week={week} progress={progress} isElective={isIntermediate} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Sidebar with Character Card & Stats */}
        <div className="course-sidebar">
          {/* Character Profile Card (matches Codédex right column) */}
          <div className="codedex-profile-card">
            <div className="codedex-profile-card__header">
              <div style={{
                width: 44,
                height: 44,
                borderRadius: 6,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <PixelSprite name="mascot" size={28} animated />
              </div>
              <div>
                <div className="codedex-profile-card__name">
                  {currentUser ? currentUser.username : 'Your Name'}
                </div>
                <div className="codedex-profile-card__level">
                  Level {stats.level}
                </div>
              </div>
            </div>

            <div className="codedex-profile-card__desc">
              {currentUser
                ? `Active Explorer. ${stats.totalXp} XP earned · ${stats.currentStreak} Day Streak 🔥`
                : 'Create an account to save your progress.'}
            </div>

            {currentUser ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                padding: '7px 12px',
                background: 'rgba(0, 229, 255, 0.08)',
                border: '1px solid rgba(0, 229, 255, 0.25)',
                borderRadius: 4,
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                color: 'var(--cyan)'
              }}>
                <span>✓ Character Saved to Cloud</span>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="codedex-profile-card__btn"
              >
                Create Account / Sign In
              </button>
            )}
          </div>

          {/* Syllabus Progress Card */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Track Overview</div>
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Completion</span>
                <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>{overallPct}%</span>
              </div>
              <div className="sidebar-progress-bar">
                <div className="sidebar-progress-fill" style={{ width: `${overallPct}%`, background: track.color || 'var(--cyan)' }} />
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>✅ Completed Modules:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{doneItems} / {totalItems}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>⚔️ Coding Exercises:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{doneEx} / {totalEx}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>🚀 Capstone Projects:</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{doneProj} / {totalProj}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Level Breakdown Info */}
          {track.levels && (
            <div className="sidebar-card">
              <div className="sidebar-card__title">Curriculum Structure</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
                {track.levels.map(lvl => (
                  <div key={lvl.id} style={{ padding: '10px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>{lvl.icon} {lvl.title}</span>
                      <span style={{ fontSize: 9, color: 'var(--cyan)', fontFamily: 'var(--font-pixel)' }}>{lvl.badge}</span>
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text-dim)', margin: 0 }}>{lvl.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Tracks Shortcut */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Other Specializations</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {TRACKS.filter(t => t.id !== track.id).map(t => (
                <Link
                  key={t.id}
                  to={`/track/${t.id}`}
                  className="sidebar-track-pill"
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>{t.icon}</span>
                    <span className="sidebar-track-pill__name">{t.title.split('&')[0]}</span>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackWeekItem({ week, progress, isElective }) {
  const [isOpen, setIsOpen] = useState(false);
  const lessonCount = week.lessons?.length || 0;
  const exerciseCount = week.exercises?.length || 0;
  const hasQuiz = week.quiz && week.quiz.length > 0;
  const hasProject = !!week.project;
  const totalTasks = lessonCount + exerciseCount + (hasQuiz ? 1 : 0) + (hasProject ? 1 : 0);

  let doneTasks = 0;
  for (let i = 0; i < lessonCount; i++) if (progress[`${week.id}-lesson-${i}`]) doneTasks++;
  for (let i = 0; i < exerciseCount; i++) if (progress[`${week.id}-exercise-${i}`]) doneTasks++;
  if (hasQuiz && progress[`${week.id}-quiz`]) doneTasks++;
  if (hasProject && progress[`${week.id}-project`]) doneTasks++;

  return (
    <div className="track-week-item">
      <div className="track-week-item__header" onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 0 }}>
          <span className="track-week-item__badge">
            {`MODULE ${week.moduleNumber || week.number}`}
          </span>
          <span className="track-week-item__title">
            {week.title}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <span style={{ fontSize: 11, color: doneTasks === totalTasks && totalTasks > 0 ? 'var(--green-bright)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            {doneTasks}/{totalTasks} Done
          </span>
          <span className={`chapter-chevron ${isOpen ? 'chapter-chevron--open' : ''}`}>▼</span>
        </div>
      </div>

      {isOpen && (
        <div className="track-week-item__body" style={{ padding: '10px 14px' }}>
          <div className="track-compact-grid">
            {/* Lessons */}
            {Array.from({ length: lessonCount }, (_, i) => {
              const done = progress[`${week.id}-lesson-${i}`];
              return (
                <Link
                  key={`lesson-${i}`}
                  to={`/lesson/${week.id}/${i}`}
                  className={`track-compact-item ${done ? 'track-compact-item--done' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <span className="track-compact-tag">L{i + 1}</span>
                    <span className="track-compact-name">{week.lessons?.[i]?.title || `Lesson ${i + 1}`}</span>
                  </div>
                  <span className="track-compact-status">{done ? '✅' : '▶'}</span>
                </Link>
              );
            })}

            {/* Exercises */}
            {Array.from({ length: exerciseCount }, (_, i) => {
              const done = progress[`${week.id}-exercise-${i}`];
              return (
                <Link
                  key={`exercise-${i}`}
                  to={`/exercise/${week.id}/${i}`}
                  className={`track-compact-item ${done ? 'track-compact-item--done' : ''}`}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <span className="track-compact-tag track-compact-tag--ex">⚔️ E{i + 1}</span>
                    <span className="track-compact-name">{week.exercises?.[i]?.title || 'Challenge'}</span>
                  </div>
                  <span className="track-compact-status">{done ? '✅' : '▶'}</span>
                </Link>
              );
            })}

            {/* Quiz */}
            {hasQuiz && (
              <Link
                to={`/quiz/${week.id}`}
                className={`track-compact-item ${progress[`${week.id}-quiz`] ? 'track-compact-item--done' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                  <span className="track-compact-tag track-compact-tag--quiz">❓ Quiz</span>
                  <span className="track-compact-name">Knowledge Check</span>
                </div>
                <span className="track-compact-status">{progress[`${week.id}-quiz`] ? '✅' : '▶'}</span>
              </Link>
            )}

            {/* Project */}
            {hasProject && (
              <Link
                to={`/project/${week.id}`}
                className={`track-compact-item ${progress[`${week.id}-project`] ? 'track-compact-item--done' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                  <span className="track-compact-tag track-compact-tag--proj">🚀 Project</span>
                  <span className="track-compact-name">Capstone Assignment</span>
                </div>
                <span className="track-compact-status">{progress[`${week.id}-project`] ? '✅' : '▶'}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
