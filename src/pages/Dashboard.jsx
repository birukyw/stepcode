import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP } from '../data/roadmap';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

const PHASE_DESCRIPTIONS = {
  'phase-1': 'Master the fundamentals of Java — from JVM architecture and memory models to OOP and collections. ☕',
  'phase-2': 'Level up with high-yield LeetCode core patterns: Two Pointers, Sliding Window, Linked Lists, and Stacks. 🧩',
  'phase-3': 'Conquer advanced LeetCode patterns: Binary Trees, Heaps/PriorityQueues, Graph traversals, and Dynamic Programming. 🧠',
  'phase-4': 'Design enterprise database schemas, write complex SQL queries, optimize indexes, and connect Java via JDBC. 🗄️',
  'phase-5': 'Build production-ready enterprise REST APIs with Spring Boot 3, Spring Data JPA, and Spring Security. ⚙️',
  'phase-6': 'Create responsive, modern user interfaces with Semantic HTML5, CSS Grid/Flexbox, ES6+ JavaScript, and React. 🎨',
  'phase-7': 'Ship like a senior engineer! Master Git workflows, containerize with Docker, automate CI/CD, and defend your Capstone. 🚀',
};

export default function Dashboard() {
  const { stats, isPhaseUnlocked, getPhaseProgress, progress } = useContext(AppContext);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = ROADMAP.phases.reduce((sum, p) => {
    return sum + p.weeks.reduce((ws, w) => {
      return ws + (w.lessons?.length || 0) + (w.exercises?.length || 0) + (w.quiz?.length ? 1 : 0) + (w.project ? 1 : 0);
    }, 0);
  }, 0);

  const globalDone = ROADMAP.phases.reduce((sum, p) => sum + getPhaseProgress(p).done, 0);
  const globalPct = totalItems ? Math.round((globalDone / totalItems) * 100) : 0;
  const totalExercises = ROADMAP.phases.reduce((sum, p) => sum + p.weeks.reduce((ws, w) => ws + (w.exercises?.length || 0), 0), 0);
  const doneExercises = ROADMAP.phases.reduce((sum, p) => sum + p.weeks.reduce((ws, w) => {
    return ws + Array.from({ length: w.exercises?.length || 0 }, (_, i) => progress[`${w.id}-exercise-${i}`] ? 1 : 0).reduce((a, b) => a + b, 0);
  }, 0), 0);
  const totalProjects = ROADMAP.phases.reduce((sum, p) => sum + p.weeks.filter(w => w.project).length, 0);
  const doneProjects = ROADMAP.phases.reduce((sum, p) => sum + p.weeks.filter(w => w.project && progress[`${w.id}-project`]).length, 0);

  // Find continue target
  let continueTarget = null;
  for (const phase of ROADMAP.phases) {
    const pp = getPhaseProgress(phase);
    if (pp.pct < 100) {
      continueTarget = `/phase/${phase.id}`;
      break;
    }
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="course-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
          <div className="course-hero__badge">
            <PixelSprite name="sword" size={12} style={{ marginRight: 4 }} /> 7-MONTH MASTER QUEST
          </div>
          <div className="hero-companion-badge">
            <PixelSprite name="bot" size={14} animated />
            <span className="hero-companion-badge__bubble">Bit-Bot Companion</span>
          </div>
        </div>

        <GlitchHeader as="h1" className="course-hero__title" text="CodeQuest" />

        <p className="course-hero__desc">
          Master software engineering in 28 weeks (7 months) by building real projects, solving LeetCode coding challenges, and conquering quizzes — from Java foundations to full-stack cloud deployment!
        </p>

        {continueTarget && (
          <Link to={continueTarget} className="course-hero__cta">
            ▶ Continue Quest
          </Link>
        )}

        <div className="course-hero__meta">
          <span>⏱ 28 WEEKS</span>
          <span>📘 {totalItems} MODULES</span>
          <span>⚡ {stats.totalXp} XP EARNED</span>
        </div>
      </div>

      {/* Two-column layout on desktop, Single column on mobile */}
      <div className="course-layout">
        {/* Left: Chapter list / Mobile Phase Tabs */}
        <div className="course-main">
          <ChapterList
            progress={progress}
            isPhaseUnlocked={isPhaseUnlocked}
            getPhaseProgress={getPhaseProgress}
            isMobile={isMobile}
          />
        </div>

        {/* Right: Sidebar (hidden on small mobile or stacked at bottom) */}
        <div className="course-sidebar">
          {/* User Card */}
          <div className="sidebar-card user-card">
            <img src="/images/pixel_cyber_mascot.jpg" alt="Byte Knight" className="user-card__pixel-avatar" />
            <div className="user-card__name">ByteKnight</div>
            <div className="user-card__level" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <PixelSprite name="trophy" size={12} /> Level {stats.level} Cyber Hacker
            </div>
          </div>

          {/* Course Progress */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Course Progress</div>
            <div style={{ marginTop: 12 }}>
              <ProgressRow icon="📘" label="Exercises" done={doneExercises} total={totalExercises} color="var(--cyan)" />
              <ProgressRow icon="🚀" label="Projects" done={doneProjects} total={totalProjects} color="var(--green-bright)" />
              <ProgressRow icon="⚡" label="XP Earned" done={stats.totalXp} total={totalItems * 15} color="var(--yellow)" />
            </div>
          </div>

          {/* Stats */}
          <div className="sidebar-card">
            <div className="sidebar-card__title">Your Stats</div>
            <div style={{ marginTop: 12 }}>
              <StatRow icon="🔥" label="Day Streak" value={stats.currentStreak} />
              <StatRow icon="⭐" label="Level" value={stats.level} />
              <StatRow icon="✅" label="Completed" value={`${globalDone} / ${totalItems}`} />
              <StatRow icon="📊" label="Progress" value={`${globalPct}%`} />
            </div>
          </div>
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

function ChapterList({ progress, isPhaseUnlocked, getPhaseProgress, isMobile }) {
  const initialPhase = ROADMAP.phases.findIndex((p, i) => isPhaseUnlocked(i) && getPhaseProgress(p).pct < 100);
  const [selectedPhase, setSelectedPhase] = useState(initialPhase !== -1 ? initialPhase : 0);
  const [openPhase, setOpenPhase] = useState(initialPhase !== -1 ? initialPhase : 0);

  if (isMobile) {
    const activePhase = ROADMAP.phases[selectedPhase] || ROADMAP.phases[0];
    const activeProgress = getPhaseProgress(activePhase);

    return (
      <div className="mobile-phase-container">
        {/* Horizontal Scrollable Phase Switcher Tabs */}
        <div className="mobile-phase-tabs-wrapper">
          <div className="mobile-phase-tabs">
            {ROADMAP.phases.map((phase, i) => {
              const unlocked = isPhaseUnlocked(i);
              const { pct } = getPhaseProgress(phase);
              const isSelected = selectedPhase === i;
              return (
                <button
                  key={phase.id}
                  className={`mobile-phase-tab ${isSelected ? 'mobile-phase-tab--active' : ''} ${!unlocked ? 'mobile-phase-tab--locked' : ''}`}
                  onClick={() => unlocked && setSelectedPhase(i)}
                  disabled={!unlocked}
                >
                  <span className="mobile-phase-tab__num">Phase {phase.number}</span>
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
              <span className="mobile-phase-tag">PHASE {activePhase.number} OF 7</span>
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
              disabled={selectedPhase === ROADMAP.phases.length - 1 || !isPhaseUnlocked(selectedPhase + 1)}
              onClick={() => setSelectedPhase(p => Math.min(ROADMAP.phases.length - 1, p + 1))}
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
      {ROADMAP.phases.map((phase, i) => {
        const unlocked = isPhaseUnlocked(i);
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
              <div className={numberClass}>{phase.number}</div>
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
