import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TRACKS } from '../data/catalog';
import { ROADMAP, getWeekContent } from '../data/roadmap';
import { AppContext } from '../App';

export default function TrackPage() {
  const { trackId } = useParams();
  const navigate = useNavigate();
  const { progress } = useContext(AppContext);

  const track = TRACKS.find((t) => t.id === trackId || t.alias === trackId || t.aliases?.includes(trackId)) || TRACKS[0];

  // Resolve phases from ROADMAP
  const phases = (track.phases || []).filter(Boolean);

  return (
    <div className="app-container">
      <div className="syllabus-view">
        <button
          type="button"
          className="syllabus-back-btn"
          onClick={() => navigate('/')}
        >
          ← Back to courses
        </button>

        {/* Course Hero */}
        <section className="syllabus-hero">
          <div className="syllabus-hero__icon-title">
            <span className="syllabus-hero__icon">{track.icon || '💻'}</span>
            <h1 className="syllabus-hero__title">{track.title}</h1>
          </div>
          <p className="syllabus-hero__desc">
            {track.description || track.heroDescription}
          </p>
          <div className="syllabus-hero__stats">
            <span>{track.timeToComplete || '20h'} of practice</span>
            <span>·</span>
            <span>{phases.reduce((acc, p) => acc + (p.weeks?.length || 0), 0)} chapters</span>
            <span>·</span>
            <span>Self-paced</span>
          </div>
        </section>

        {/* Chapters & Lessons */}
        <main>
          {phases.map((phase, pIdx) => {
            const weeks = phase.weeks || [];
            return (
              <div key={phase.id || pIdx} style={{ marginBottom: 36 }}>
                <div style={{ marginBottom: 16, paddingLeft: 4 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {phase.title}
                  </h2>
                  {phase.subtitle && (
                    <p style={{ fontSize: 14, color: 'var(--text-dim)', fontWeight: 500 }}>
                      {phase.subtitle}
                    </p>
                  )}
                </div>

                {weeks.map((week, wIdx) => {
                  const weekContent = getWeekContent(week.id);
                  const lessons = weekContent?.lessons || [];

                  return (
                    <div key={week.id} className="chapter-block">
                      <div className="chapter-block__header">
                        <div className="chapter-block__info">
                          <div className="chapter-number-pill">
                            {wIdx + 1}
                          </div>
                          <div>
                            <h3 className="chapter-block__title">{week.title}</h3>
                            <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 2, fontWeight: 500 }}>
                              {lessons.length} lessons
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="chapter-lessons-list">
                        {lessons.map((lesson, lIdx) => {
                          const itemId = `${week.id}-lesson-${lIdx}`;
                          const isDone = !!progress[itemId];

                          return (
                            <Link
                              key={lIdx}
                              to={`/lesson/${week.id}/${lIdx}`}
                              className="lesson-row-card"
                            >
                              <div className="lesson-row-card__left">
                                <div className={`lesson-status-icon ${isDone ? 'lesson-status-icon--done' : ''}`}>
                                  {isDone ? '✓' : lIdx + 1}
                                </div>
                                <span className="lesson-row-card__title">
                                  {lesson.title}
                                </span>
                              </div>

                              <span className="lesson-row-card__meta">
                                {lesson.starterCode ? 'Interactive' : 'Concept'} →
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
