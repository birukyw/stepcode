import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Bit from '../components/art/Bit';
import Ambient from '../components/art/Ambient';
import { Icon, HeroArt } from '../components/art/Illustrations';
import { ALL_LESSONS, MODULES, COURSES, getCourse } from '../data/curriculum';

const WORDS = ['computer scientist', 'web developer', 'data scientist', 'game designer', 'problem solver'];

function Typewriter() {
  const [state, setState] = useState({ i: 0, n: 0, dir: 1 });
  useTyper(state, setState);
  return (
    <p className="cx-typer" aria-live="off">
      Become a <span>{WORDS[state.i].slice(0, state.n)}</span><i className="cx-caret" />
    </p>
  );
}
function useTyper({ i, n, dir }, set) {
  useEffect(() => {
    const word = WORDS[i];
    const t = setTimeout(() => {
      if (dir === 1) {
        if (n < word.length) set({ i, n: n + 1, dir });
        else set({ i, n, dir: -2 });
      } else if (dir === -2) set({ i, n, dir: -1 });
      else if (n > 0) set({ i, n: n - 1, dir });
      else set({ i: (i + 1) % WORDS.length, n: 0, dir: 1 });
    }, dir === 1 ? 85 : dir === -2 ? 1200 : 40);
    return () => clearTimeout(t);
  }, [i, n, dir, set]);
}

const TABS = [
  { id: 'learn', label: 'Learn', title: 'Short lessons you can finish', text: 'Each lesson is a few minutes of reading, split into small parts, with a quick check along the way.', rows: ['Read one idea', 'Try the example', 'Answer a quick check'] },
  { id: 'practice', label: 'Practice', title: 'Quizzes that explain themselves', text: 'Every module ends with a quiz. A wrong answer tells you why, so the quiz teaches as well as tests.', rows: ['10 questions per module', 'Instant explanations', 'Retake any time'] },
  { id: 'build', label: 'Build', title: 'A project in every module', text: 'You build something real and run checks that say exactly which requirement is still missing.', rows: ['Starter code provided', 'Automatic checks', 'Earn bonus XP'] },
];


const FACE = { read: 'read', think: 'think', cheer: 'cheer', sad: 'sad' };
const CHECKS = ['hours is 27', 'minutes is 26', 'duration is 27h 26m 05s', 'fuel_cost is 49.35', 'receipt prints correctly'];

/** The product panel. Each tab shows a different view, and Bit changes face to match. */
function Shot({ tab }) {
  const [face, setFace] = useState('read');
  const [picked, setPicked] = useState(null);
  const [checks, setChecks] = useState(0);

  useEffect(() => {
    setPicked(null);
    setChecks(0);
    if (tab === 'learn') { setFace('read'); return undefined; }
    if (tab === 'practice') { setFace('think'); return undefined; }
    setFace('think');
    let n = 0;
    const iv = setInterval(() => {
      n += 1;
      setChecks(n);
      if (n >= CHECKS.length) { clearInterval(iv); setFace('cheer'); }
    }, 520);
    return () => clearInterval(iv);
  }, [tab]);

  const answer = (i) => {
    if (picked !== null) return;
    setPicked(i);
    setFace(i === 0 ? 'cheer' : 'sad');
  };

  const title = { learn: '1.1.1 The Sequential Machine', practice: 'Module 1.1 quiz · Question 3 of 10', build: 'Project: Trip Receipt' }[tab];
  const chips = {
    learn: ['Opens with a challenge', 'Short parts', 'Quick check inside'],
    practice: ['Instant feedback', 'Wrong answers explain themselves'],
    build: ['Automatic checks', '+50 XP'],
  }[tab];

  return (
    <div className="cx-shot" role="img" aria-label={`${tab} preview`}>
      <div className="cx-shot__bar"><i /><i /><i /><span>{title}</span></div>

      {tab === 'learn' && (
        <div className="cx-shot__body">
          <div className="cx-shot__left">
            <b />
            <div className="cx-shot__hook"><em>Challenge</em><p /><p className="s" /></div>
            <p /><p /><p className="s" />
            <div className="cx-shot__code">print("Hello")</div>
          </div>
          <div className="cx-shot__right">
            <div className="cx-shot__ed"><span><em>def</em> greet(name):</span><span>{'    '}<em>return</em> f"Hello, {'{'}name{'}'}"</span><span>print(greet("Ada"))</span></div>
            <div className="cx-shot__term">Hello, Ada</div>
          </div>
        </div>
      )}

      {tab === 'practice' && (
        <div className="cx-shot__quiz">
          <p className="cx-shot__qlabel">Quick check</p>
          <p className="cx-shot__q">What does this print?</p>
          <div className="cx-shot__code">print(2 + 3 * 4)</div>
          {['14', '20', '24'].map((o, i) => (
            <button key={o} type="button" disabled={picked !== null} onClick={() => answer(i)}
              className={`cx-shot__opt ${picked === null ? '' : i === 0 ? 'is-right' : i === picked ? 'is-wrong' : 'is-dim'}`}>
              <span>{'ABC'[i]}</span>{o}
            </button>
          ))}
          <p className="cx-shot__hint">{picked === null ? 'Tap an answer.' : picked === 0 ? 'Correct. Multiplication runs first, so it is 2 + 12.' : 'Not quite. Multiplication runs first: 2 + (3 * 4) = 14.'}</p>
        </div>
      )}

      {tab === 'build' && (
        <div className="cx-shot__body">
          <div className="cx-shot__left">
            <b />
            <p /><p /><p className="s" />
            <div className="cx-shot__code">duration = f"{'{'}hours{'}'}h ..."</div>
            <p /><p className="s" />
          </div>
          <div className="cx-shot__right">
            <div className="cx-shot__runbar"><span>Run checks</span><i style={{ width: `${(checks / CHECKS.length) * 100}%` }} /></div>
            <div className="cx-shot__checks">
              {CHECKS.slice(0, checks).map((c) => <div key={c}><em>PASS</em> {c}</div>)}
              {checks >= CHECKS.length && <div className="cx-shot__done">ALL CHECKS PASSED</div>}
            </div>
          </div>
        </div>
      )}

      <ul className="cx-shot__chips">{chips.map((c) => <li key={c}>{c}</li>)}</ul>
      <span className="cx-shot__bit" key={`${tab}-${face}`}><Bit mood={FACE[face]} size={76} /></span>
    </div>
  );
}

export default function Home() {
  const [tab, setTab] = useState('learn');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const active = TABS.find((t) => t.id === tab);

  const learn = getCourse('python');
  const speak = getCourse('further');
  const stats = (c) => `${c.sections.reduce((n, t) => n + t.modules.reduce((m, mod) => m + mod.lessons.length, 0), 0)} lessons · ${c.sections.reduce((n, t) => n + t.modules.length, 0)} modules`;
  const matches = (c) => (filter === 'all' || (filter === 'open' ? c.open : !c.open)) && (c.title + c.text).toLowerCase().includes(query.toLowerCase());
  const courses = [
    { id: 'python', open: true, to: learn.path, art: 'python', title: learn.title, text: learn.tagline + '. Variables, loops, functions, data and a real project.', level: learn.level, meta: stats(learn) },
    { id: 'java', open: false, art: 'java', title: 'Learn Java', text: 'Object-oriented programming, collections and the tools behind large codebases.', level: 'Beginner', meta: 'Coming soon' },
    { id: 'web', open: false, art: 'web', title: 'Web development', text: 'HTML, CSS and JavaScript, from a blank page to a working app.', level: 'Beginner', meta: 'Coming soon' },
  ].filter(matches);
  const extras = [
    { id: 'further', open: true, to: speak.path, art: 'python', title: speak.title, text: speak.tagline + '.', level: speak.level, meta: stats(speak) },
    { id: 'java-further', open: false, art: 'java', title: 'Speak Java', text: 'Further on Java: concurrency, the JVM and building services.', level: 'Intermediate to advanced', meta: 'Coming soon' },
  ].filter(matches);

  const renderCard = (c) => {
    const inner = (
      <>
        <div className={`cx-card__art cx-card__art--${c.id}`}>
          {c.art !== 'web' && <Ambient kind={c.art} />}
        </div>
        <div className="cx-card__body">
          <span className="cx-card__tag">{c.id.includes('further') ? 'Extra' : 'Course'}</span>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <div className="cx-card__foot">
            <span className="cx-pill">{c.level}</span>
            <span className="cx-card__meta">{c.meta}</span>
          </div>
        </div>
      </>
    );
    return c.open ? (
      <Link key={c.id} to={c.to} className="cx-card">{inner}</Link>
    ) : (
      <div key={c.id} className="cx-card cx-card--soon" aria-disabled="true">{inner}</div>
    );
  };

  return (
    <main className="home cx">
      <section className="hero" data-say="bit|Welcome. I'm Bit, your guide. Drag me anywhere you like.">
        <div className="hero__copy">
          <p className="eyebrow">An interactive coding school</p>
          <h1>Learn to code by writing code.</h1>
          <p className="hero__lede">
            Short lessons with a live editor beside every one, quizzes that explain themselves, and a project at the end of each
            module. It all runs in your browser, so there is nothing to install.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href="#courses" onClick={(e) => { e.preventDefault(); document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }); }}>Browse courses</a>
            <a className="btn btn--ghost btn--lg" href="#how" onClick={(e) => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }); }}>How it works</a>
          </div>
          <ul className="hero__facts">
            <li><strong>{ALL_LESSONS.length}</strong> lessons</li>
            <li><strong>{MODULES.length}</strong> modules</li>
            <li><strong>{COURSES.length}</strong> Python courses</li>
            <li>No install</li>
          </ul>
        </div>
        <HeroArt />
      </section>

      <section className="cx-band" data-say="bit|Whatever you want to become, it starts with one first lesson.">
        <Typewriter />
        <p className="cx-band__sub">Beginner-friendly courses with an editor built in, so you learn by doing from the first minute.</p>
      </section>

      <section className="cx-sec" id="how" data-solo="bit" data-say="bit|Learn, practice, build. That is the whole loop. Try the tabs.">
        <div className="cx-tabs">
          <div className="cx-tabs__shot"><Shot tab={tab} /></div>
          <div className="cx-tabs__list" role="tablist">
            {TABS.map((t) => (
              <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className={`cx-tab ${tab === t.id ? 'is-on' : ''}`} onClick={() => setTab(t.id)}>
                <span className="cx-tab__label">{t.label}</span>
                <span className="cx-tab__title">{t.title}</span>
                {tab === t.id && <span className="cx-tab__text">{t.text}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="cx-sec" id="courses" data-say="bit|This is the first course. Open it and we'll start with lesson 1.1.1.">
        <h2 className="cx-h2">Guided paths for your goals in tech</h2>
        <p className="cx-sub">Beginner-friendly courses written from scratch, with a live editor, quizzes and projects built in.</p>
        <div className="cx-filters">
          <label className="cx-search">
            <Icon name="search" size={16} />
            <input type="search" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search courses" />
          </label>
          {[['all', 'All'], ['open', 'Open now'], ['soon', 'Coming soon']].map(([id, label]) => (
            <button key={id} type="button" className={`cx-chip ${filter === id ? 'is-on' : ''}`} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>
        <div className="cx-grid">
          {courses.map(renderCard)}
          {!courses.length && !extras.length && <p className="cx-empty">No course matches that search.</p>}
        </div>
      </section>

      {extras.length > 0 && (
        <section className="cx-sec cx-sec--extras" id="extras" data-say="bit|Extras are for later. Finish the basics first, then come back here.">
          <h2 className="cx-h2">Extras: go further</h2>
          <p className="cx-sub">Pick these up once the basics feel comfortable. Each one continues a course above, with harder topics and bigger projects.</p>
          <div className="cx-grid">
            {extras.map(renderCard)}
          </div>
        </section>
      )}

      <section className="cx-final" data-say="bit|Ready when you are. Pick a course above.">
        <div className="cx-final__copy">
          <h2>Ready when you are</h2>
          <p>Bit will tag along and point things out.</p>
          <Link className="cx-btn" to="/python">Start Learn Python</Link>
        </div>
      </section>

      <footer className="foot">
        <span className="wordmark">StepCode</span>
        <span>Learn to code in your browser.</span>
      </footer>
    </main>
  );
}
