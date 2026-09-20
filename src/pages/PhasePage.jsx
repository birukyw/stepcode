import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP } from '../data/roadmap';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

const PHASE_DESCRIPTIONS = {
  'phase-1': 'Welcome to the beginning of your quest! ☕ You\'ll learn the fundamentals of Java — from how the JVM works under the hood to writing classes, using collections, and handling errors like a pro.',
  'phase-2': 'Time to sharpen your LeetCode problem-solving blade! 🧩 Master core algorithmic patterns: Two Pointers, Sliding Window, Linked Lists, Stacks, Queues, and Binary Search.',
  'phase-3': 'Advance into elite algorithmic territory! 🧠 Conquer Binary Trees, BSTs, Priority Queues/Heaps, Graph traversals (BFS/DFS/Dijkstra), Backtracking, and Dynamic Programming.',
  'phase-4': 'Data is the lifeblood of enterprise software. 🗄️ Master PostgreSQL schema modeling, multi-table joins, B-Tree indexes, ACID transaction isolation, and Java JDBC connectivity.',
  'phase-5': 'Build production-grade enterprise backend APIs with Spring Boot 3 🌱 — the framework powering Netflix, Amazon, and Fortune 500 engineering teams.',
  'phase-6': 'Bring your applications to life! 🎨 Master modern full-stack web engineering: Semantic HTML5, CSS Grid/Flexbox, ES6+ JavaScript, and component-driven React.',
  'phase-7': 'The final boss! 🚀 Master professional Git collaboration, containerize with Docker & Compose, automate with GitHub Actions CI/CD, and defend your Capstone in technical interviews.',
};

export default function PhasePage() {
  const { phaseId } = useParams();
  const { progress, getPhaseProgress } = useContext(AppContext);
  const phase = ROADMAP.phases.find(p => p.id === phaseId);

  if (!phase) return <div style={{ padding: 40 }}>Phase not found.</div>;

  const { done, total, pct } = getPhaseProgress(phase);

  return (
    <div>
      <Link to="/" className="phase-page__back">← Back to Map</Link>

      {/* Phase Hero */}
      <div className="course-hero" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
          <div className="course-hero__badge">
            <PixelSprite name="sword" size={12} style={{ marginRight: 6 }} />
            {phase.months.toUpperCase()} · {phase.weekRange.toUpperCase()}
          </div>
          <div className="hero-companion-badge">
            <PixelSprite name="bot" size={16} animated />
            <span className="hero-companion-badge__bubble">Sector {phase.number} Active</span>
          </div>
        </div>

        <GlitchHeader as="h1" className="course-hero__title" text={phase.title} />

        <p className="course-hero__desc">
          {PHASE_DESCRIPTIONS[phase.id] || phase.subtitle}
        </p>
        <div className="course-hero__meta">
          <span>📊 {pct}% complete</span>
          <span>✅ {done} / {total} items</span>
          <span>📅 4 weeks</span>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="course-layout">
        <div className="course-main">
          <div className="chapter-list">
            {phase.weeks.map(week => (
              <WeekChapter key={week.id} week={week} phase={phase} progress={progress} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="course-sidebar">
          {/* Cyber Companion Card */}
          <div className="companion-card">
            <img src="/images/pixel_cyber_mascot.jpg" alt="Bit-Bot" className="companion-card__avatar" />
            <div className="companion-card__info">
              <div className="companion-card__name">
                <PixelSprite name="bot" size={14} animated /> Bit-Bot 3000
              </div>
              <div className="companion-card__msg">
                {pct === 100
                  ? "Incredible work! Phase conquered! 🏆"
                  : pct > 50
                  ? "Over halfway through this sector! Keep your compiler hot!"
                  : "Booting quest parameters. Write clean code and conquer bugs!"}
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card__title">
              Phase Progress
              <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-dim)' }}>
                {pct}%
              </span>
            </div>
            <div style={{ marginTop: 12 }}>
              <div className="sidebar-progress-bar" style={{ height: 6 }}>
                <div className="sidebar-progress-fill" style={{ width: `${pct}%`, background: phase.color }} />
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="sidebar-card__title">Quick Tips</div>
            <div className="sidebar-card__subtitle" style={{ marginTop: 8 }}>
              Complete lessons first, then try exercises to practice. Quizzes test your knowledge — no coding required!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WeekChapter({ week, phase, progress }) {
  const [isOpen, setIsOpen] = useState(true);

  const lessonCount = week.lessons?.length || 0;
  const exerciseCount = week.exercises?.length || 0;
  const hasQuiz = week.quiz && week.quiz.length > 0;
  const hasProject = !!week.project;

  let doneCount = 0;
  let totalCount = 0;
  for (let i = 0; i < lessonCount; i++) { totalCount++; if (progress[`${week.id}-lesson-${i}`]) doneCount++; }
  for (let i = 0; i < exerciseCount; i++) { totalCount++; if (progress[`${week.id}-exercise-${i}`]) doneCount++; }
  if (hasQuiz) { totalCount++; if (progress[`${week.id}-quiz`]) doneCount++; }
  if (hasProject) { totalCount++; if (progress[`${week.id}-project`]) doneCount++; }

  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  let numberClass = 'chapter-number';
  if (pct === 100) numberClass += ' chapter-number--done';
  else if (doneCount > 0) numberClass += ' chapter-number--active';

  return (
    <div className="chapter">
      <div className="chapter-header" onClick={() => setIsOpen(!isOpen)}>
        <div className={numberClass}>{week.number}</div>
        <div className="chapter-title">{week.title}</div>
        <span style={{ fontFamily: 'var(--font-pixel)', fontSize: 8, color: 'var(--text-dim)' }}>
          {doneCount}/{totalCount}
        </span>
        {pct === 100 && <span style={{ color: 'var(--green-bright)', fontSize: 14 }}>✅</span>}
        <span className={`chapter-chevron ${isOpen ? 'chapter-chevron--open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="chapter-body">
          <div className="chapter-items">
            {Array.from({ length: lessonCount }, (_, i) => {
              const done = progress[`${week.id}-lesson-${i}`];
              const isFirst = i === 0 && !done;
              return (
                <Link key={`l-${i}`} to={`/lesson/${week.id}/${i}`}
                  className={`chapter-item ${done ? 'chapter-item--done' : ''}`}>
                  <span className="chapter-item__type">Lesson {i + 1}</span>
                  <span className="chapter-item__name">{week.title.split(',')[0]}</span>
                  {done ? <span className="chapter-item__status">✅</span>
                    : isFirst ? <span className="chapter-item__btn chapter-item__btn--start">Start</span>
                    : <span className="chapter-item__btn">? ? ?</span>}
                </Link>
              );
            })}

            {Array.from({ length: exerciseCount }, (_, i) => {
              const done = progress[`${week.id}-exercise-${i}`];
              return (
                <Link key={`e-${i}`} to={`/exercise/${week.id}/${i}`}
                  className={`chapter-item ${done ? 'chapter-item--done' : ''}`}>
                  <span className="chapter-item__type">Exercise {i + 1}</span>
                  <span className="chapter-item__name">Practice Challenge</span>
                  {done ? <span className="chapter-item__status">✅</span> : <span className="chapter-item__btn">? ? ?</span>}
                </Link>
              );
            })}

            {hasQuiz && (
              <Link to={`/quiz/${week.id}`}
                className={`chapter-item ${progress[`${week.id}-quiz`] ? 'chapter-item--done' : ''}`}>
                <span className="chapter-item__type">Quiz</span>
                <span className="chapter-item__name">Knowledge Check</span>
                {progress[`${week.id}-quiz`] ? <span className="chapter-item__status">✅</span> : <span className="chapter-item__btn">? ? ?</span>}
              </Link>
            )}

            {hasProject && (
              <Link to={`/project/${week.id}`}
                className={`chapter-item ${progress[`${week.id}-project`] ? 'chapter-item--done' : ''}`}>
                <span className="chapter-item__type">Project</span>
                <span className="chapter-item__name">Build Challenge</span>
                {progress[`${week.id}-project`] ? <span className="chapter-item__status">✅</span> : <span className="chapter-item__btn">? ? ?</span>}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
