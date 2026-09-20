import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { getTrack, TRACKS } from '../data/catalog';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

export default function TrackPage() {
  const { trackId } = useParams();
  const { progress, getPhaseProgress, changeActiveTrack, activeTrackId } = useContext(AppContext);
  const track = getTrack(trackId);
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | level.id

  const isEnrolled = activeTrackId === track.id || activeTrackId === track.alias;

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

      {/* Track Hero Banner */}
      <div className="course-hero track-hero" style={{ borderLeft: `4px solid ${track.color || 'var(--cyan)'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div className="course-hero__badge" style={{ color: track.color || 'var(--cyan)' }}>
              <span style={{ fontSize: 13, marginRight: 6 }}>{track.icon}</span>
              {track.badge || 'CAREER TRACK'}
            </div>
            <div className="hero-companion-badge">
              <PixelSprite name="bot" size={14} animated />
              <span className="hero-companion-badge__bubble">100% Unlocked</span>
            </div>
          </div>

          <button
            onClick={() => changeActiveTrack(track.id)}
            className={isEnrolled ? "btn-catalog-enrolled" : "btn btn-primary"}
            style={{ width: 'auto', padding: '8px 18px', fontSize: 12 }}
          >
            {isEnrolled ? '✓ Active Primary Track' : '⚡ Set as Primary Track'}
          </button>
        </div>

        <GlitchHeader as="h1" className="course-hero__title" text={track.title} />

        <p className="course-hero__desc">
          {track.description}
        </p>

        {/* Tech tags */}
        <div className="track-tags-list">
          {track.tags.map(t => (
            <span key={t} className="track-tag-pill">{t}</span>
          ))}
        </div>

        {/* Primary Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginTop: 18 }}>
          {continueLink && (
            <Link to={continueLink} className="course-hero__cta" style={{ margin: 0 }}>
              {doneItems > 0 ? '▶ Continue Learning' : '🚀 Start First Lesson'}
            </Link>
          )}
        </div>

        {/* Metadata stats */}
        <div className="course-hero__meta" style={{ marginTop: 22 }}>
          <span>⏱ {track.duration.toUpperCase()}</span>
          <span>📈 {track.difficulty.toUpperCase()}</span>
          <span>📘 {totalItems} TOTAL MODULES</span>
          <span>📊 {overallPct}% COMPLETE</span>
        </div>

        {/* Progress bar */}
        <div className="track-hero-progress-bar">
          <div className="track-hero-progress-fill" style={{ width: `${overallPct}%`, background: track.color || 'var(--cyan)' }} />
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

        {/* Right: Sidebar with Stats & Outcomes */}
        <div className="course-sidebar">
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
  const [isOpen, setIsOpen] = useState(true);
  const lessonCount = week.lessons?.length || 0;
  const exerciseCount = week.exercises?.length || 0;
  const hasQuiz = week.quiz && week.quiz.length > 0;
  const hasProject = !!week.project;

  return (
    <div className="track-week-item">
      <div className="track-week-item__header" onClick={() => setIsOpen(!isOpen)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="track-week-item__badge">
            {isElective ? 'ELECTIVE' : `MODULE ${week.number}`}
          </span>
          <span className="track-week-item__title">{week.title}</span>
        </div>
        <span className={`chapter-chevron ${isOpen ? 'chapter-chevron--open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="track-week-item__body">
          <div className="chapter-items">
            {/* Lessons */}
            {Array.from({ length: lessonCount }, (_, i) => {
              const done = progress[`${week.id}-lesson-${i}`];
              return (
                <Link
                  key={`lesson-${i}`}
                  to={`/lesson/${week.id}/${i}`}
                  className={`chapter-item ${done ? 'chapter-item--done' : ''}`}
                >
                  <span className="chapter-item__type">Lesson {i + 1}</span>
                  <span className="chapter-item__name">
                    {week.lessons?.[i]?.title || `Lesson ${i + 1}`}
                  </span>
                  {done ? (
                    <span className="chapter-item__status">✅</span>
                  ) : (
                    <span className="chapter-item__btn chapter-item__btn--start">Start →</span>
                  )}
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
                  className={`chapter-item ${done ? 'chapter-item--done' : ''}`}
                >
                  <span className="chapter-item__type">Exercise {i + 1}</span>
                  <span className="chapter-item__name">
                    {week.exercises?.[i]?.title || 'Practice Challenge'}
                  </span>
                  {done ? (
                    <span className="chapter-item__status">✅</span>
                  ) : (
                    <span className="chapter-item__btn chapter-item__btn--start">Code →</span>
                  )}
                </Link>
              );
            })}

            {/* Quiz */}
            {hasQuiz && (
              <Link
                to={`/quiz/${week.id}`}
                className={`chapter-item ${progress[`${week.id}-quiz`] ? 'chapter-item--done' : ''}`}
              >
                <span className="chapter-item__type">Quiz</span>
                <span className="chapter-item__name">Knowledge Check</span>
                {progress[`${week.id}-quiz`] ? (
                  <span className="chapter-item__status">✅</span>
                ) : (
                  <span className="chapter-item__btn chapter-item__btn--start">Quiz →</span>
                )}
              </Link>
            )}

            {/* Project */}
            {hasProject && (
              <Link
                to={`/project/${week.id}`}
                className={`chapter-item ${progress[`${week.id}-project`] ? 'chapter-item--done' : ''}`}
              >
                <span className="chapter-item__type">Project</span>
                <span className="chapter-item__name">Capstone Assignment</span>
                {progress[`${week.id}-project`] ? (
                  <span className="chapter-item__status">✅</span>
                ) : (
                  <span className="chapter-item__btn chapter-item__btn--start">Build →</span>
                )}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
