import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourse, COURSES, TRACKS } from '../data/curriculum';
import { getLessonContent, getModuleContent, getTrackFinal } from '../content/lessons';
import { buildSequence } from '../data/flow';
import { xpSummary, XP, XP_PER_LEVEL } from '../data/xp';
import { getStreak } from '../utils/activity';
import { AppContext } from '../App';
import Bit from '../components/art/Bit';
import LevelRing from '../components/LevelRing';
import Ambient from '../components/art/Ambient';
import { Icon } from '../components/art/Illustrations';

const TRACK_ICONS = ['code', 'graph', 'layers', 'cpu'];

function FinalPanel({ section, progress }) {
  const fin = section.final;
  if (!fin) return null;
  const ready = !!getTrackFinal(fin.id);
  const done = !!progress[`${fin.id}-final`];
  return (
    <article className="cx-chapter cx-chapter--final is-open">
      <span className={`cx-chapter__num cx-chapter__num--trophy ${done ? 'is-done' : ''}`}><Icon name="trophy" size={20} /></span>
      <div className="cx-panel cx-panel--final">
        <div className="cx-final-card">
          <div>
            <p className="cx-final-card__kicker">Track final project · {XP.final} XP</p>
            <h3>{fin.title}</h3>
            <p>{fin.tagline}</p>
          </div>
          {ready ? (
            <Link to={`/final/${fin.id}`} className={`cx-rowbtn ${done ? 'is-done' : 'is-start'}`}>{done ? 'Review' : 'Start'}</Link>
          ) : (
            <span className="cx-rowbtn is-locked" aria-label="Coming soon">Soon</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function CoursePage({ slug = 'python' }) {
  const { progress } = useContext(AppContext);
  const course = getCourse(slug);
  const seq = useMemo(() => buildSequence(slug), [slug]);
  const xp = xpSummary(progress, seq);
  const total = xpSummary(progress, useMemo(() => buildSequence(), []));
  const lessonCount = course.sections.reduce((n, s) => n + s.modules.reduce((m, mod) => m + mod.lessons.length, 0), 0);
  const other = COURSES.find((c) => c.id !== course.id);
  const streak = getStreak();
  const nextUp = seq.find((e) => !progress[e.key]) || seq[0];
  const moduleCount = course.sections.reduce((n, s) => n + s.modules.length, 0);
  const [open, setOpen] = useState(() => new Set(nextUp ? [nextUp.moduleId] : []));
  const toggle = (id) => setOpen((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  let chapter = 0;
  const bar = (done, total) => (total ? Math.round((done / total) * 100) : 0);

  return (
    <main className="cx cx-coursepage">
      <section className={`cx-course-hero cx-course-hero--${slug}`}>
        <div className="cx-course-hero__art" aria-hidden="true"><Ambient kind="python" /></div>
        <div className="cx-course-hero__copy">
          <span className="cx-pill cx-pill--glass">{course.level}</span>
          <h1>{course.title}</h1>
          <p className="cx-course-hero__tag">{course.tagline}</p>
          <p>{course.description}</p>
          {nextUp && (
            <Link className="cx-btn cx-btn--lg" to={nextUp.url}>{xp.earned === 0 ? 'Start learning for free' : 'Continue learning'}</Link>
          )}
          <p className="cx-course-hero__meta"><span>{lessonCount} lessons</span><span>{moduleCount} modules</span><span>{course.sections.length} {course.sections.length === 1 ? 'track' : 'tracks'}</span>{slug === 'python' && <span>Interactive mode soon</span>}</p>
        </div>
      </section>

      <div className="cx-course-main">
        <div className="cx-chapters">
          {course.sections.map((section) => {
            const sIdx = TRACKS.indexOf(section);
            return (
            <section key={section.id} className={`cx-track cx-track--${sIdx}`}>
              <header className="cx-track__head">
                <div>
                  <p className="cx-track__kicker">{section.level}</p>
                  <h2>{section.title}</h2>
                  <p>{section.subtitle}</p>
                </div>
                <span className="cx-track__art" aria-hidden="true"><Icon name={TRACK_ICONS[sIdx % 4]} size={64} /></span>
              </header>
              <div className="cx-timeline">
                {section.modules.map((mod) => {
                  chapter += 1;
                  const extra = getModuleContent(mod.id);
                  const items = [];
                  mod.lessons.forEach((l, i) => items.push({ kind: 'lesson', icon: 'book', id: l.id, title: l.title, url: `/lesson/${mod.id}/${i}`, ready: !!getLessonContent(l.id), done: !!progress[`${mod.id}-lesson-${i}`], label: `Lesson ${i + 1}` }));
                  items.push({ kind: 'quiz', icon: 'quiz', id: `${mod.id}-quiz`, title: 'Module quiz', url: `/quiz/${mod.id}`, ready: !!extra?.quiz, done: !!progress[`${mod.id}-quiz`], label: 'Quiz' });
                  items.push({ kind: 'project', icon: 'folder', id: `${mod.id}-project`, title: extra?.project ? extra.project.title : 'Module project', url: `/project/${mod.id}`, ready: !!extra?.project, done: !!progress[`${mod.id}-project`], label: 'Project' });
                  const doneCount = items.filter((x) => x.done).length;
                  const firstTodo = items.find((x) => x.ready && !x.done);
                  const isOpen = open.has(mod.id);
                  const complete = doneCount === items.length;
                  return (
                    <article key={mod.id} className={`cx-chapter ${isOpen ? 'is-open' : ''}`}>
                      <span className={`cx-chapter__num ${complete ? 'is-done' : ''}`}>{complete ? <Icon name="check" size={18} /> : chapter}</span>
                      <div className="cx-panel">
                        <button type="button" className="cx-panel__head" aria-expanded={isOpen} aria-controls={`panel-${mod.id}`} onClick={() => toggle(mod.id)}>
                          <span className="cx-panel__title">{mod.title}</span>
                          <span className="cx-panel__count">{doneCount}/{items.length}</span>
                          <span className="cx-chev" aria-hidden="true" />
                        </button>
                        <div className="cx-panel__body" id={`panel-${mod.id}`}>
                          <div className="cx-panel__inner">
                            <ul className="cx-rows">
                              {items.map((it) => (
                                <li key={it.id} className={`cx-row ${it.done ? 'is-done' : ''} ${it.ready ? '' : 'is-locked'}`}>
                                  <span className={`cx-row__icon cx-row__icon--${it.kind}`}>{it.done ? <Icon name="check" size={15} /> : <Icon name={it.icon} size={15} />}</span>
                                  <span className="cx-row__main">
                                    <span className="cx-row__label">{it.label}</span>
                                    <span className="cx-row__title">{it.title}</span>
                                  </span>
                                  <span className="cx-row__xp">{it.ready ? `${XP[it.kind]} XP` : ''}</span>
                                  {it.ready ? (
                                    <Link to={it.url} className={`cx-rowbtn ${it.done ? 'is-done' : it === firstTodo ? 'is-start' : ''}`}>{it.done ? 'Review' : it === firstTodo ? 'Start' : 'Open'}</Link>
                                  ) : (
                                    <span className="cx-rowbtn is-locked" aria-label="Coming soon">Soon</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
                <FinalPanel section={section} progress={progress} />
              </div>
            </section>
            );
          })}
          {slug === 'python' && (
            <aside className="cx-next">
              <h3>Finished the foundations?</h3>
              <p>{other.title} picks up where this course ends: {other.tagline.toLowerCase()}.</p>
              <Link to={other.path} className="cx-btn cx-btn--sm">Go to {other.title}</Link>
            </aside>
          )}
          {slug === 'further' && (
            <aside className="cx-next">
              <h3>New to Python?</h3>
              <p>These tracks assume you are comfortable with variables, loops, functions, lists and dictionaries. If not, start with {other.title}.</p>
              <Link to={other.path} className="cx-btn cx-btn--sm cx-btn--ghost">Open {other.title}</Link>
            </aside>
          )}
        </div>

        <aside className="cx-side">
          <div className="cx-panel cx-card-side cx-me-card">
            <div className="cx-me">
              <span className="cx-me__avatar"><Bit mood="happy" size={44} /></span>
              <div>
                <p className="cx-me__name">Your progress</p>
                <p className="cx-me__lv">Level {total.level}</p>
              </div>
              <LevelRing level={total.level} pct={total.intoLevel} size={52} stroke={5} className="cx-me__ring" />
            </div>
            <div className="cx-me__stats">
              <span><Icon name="flame" size={17} /><b>{streak}</b> day streak</span>
              <span><Icon name="bolt" size={17} /><b>{total.earned}</b> XP</span>
            </div>
            <p className="cx-meter__label">{XP_PER_LEVEL - total.intoLevel} XP to level {total.level + 1}</p>
          </div>

          <div className="cx-panel cx-card-side">
            <h3>{course.title} progress</h3>
            {[['Lessons completed', 'lesson', 'book'], ['Quizzes done', 'quiz', 'quiz'], ['Projects completed', 'project', 'folder']].map(([label, key, icon]) => (
              <div className="cx-stat" key={key}>
                <span className={`cx-stat__icon cx-stat__icon--${key}`}><Icon name={icon} size={17} /></span>
                <div className="cx-stat__main">
                  <p><span>{label}</span><b>{xp.counts[key].done} / {xp.counts[key].total}</b></p>
                  <div className="cx-meter cx-meter--sm"><i style={{ width: `${bar(xp.counts[key].done, xp.counts[key].total)}%` }} /></div>
                </div>
              </div>
            ))}
            <div className="cx-stat">
              <span className="cx-stat__icon cx-stat__icon--xp"><Icon name="bolt" size={17} /></span>
              <div className="cx-stat__main">
                <p><span>XP earned</span><b>{xp.earned} / {xp.total}</b></p>
                <div className="cx-meter cx-meter--sm cx-meter--xp"><i style={{ width: `${xp.pct}%` }} /></div>
              </div>
            </div>
            <p className="cx-note">Lessons are worth {XP.lesson} XP, quizzes {XP.quiz}, projects {XP.project} and final projects {XP.final}.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
