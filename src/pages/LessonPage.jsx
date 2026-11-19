import { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate, useLocation, useMatch, Link } from 'react-router-dom';
import Split from 'react-split';
import { AppContext } from '../App';
import { getModule, courseOfModule } from '../data/curriculum';
import { buildSequence, afterUrl, courseHome } from '../data/flow';
import { xpSummary, XP, XP_PER_LEVEL } from '../data/xp';
import { getStreak } from '../utils/activity';
import { getLessonContent, getModuleContent, getTrackFinal } from '../content/lessons';
import Markdown from '../components/Markdown';
import IdePanel from '../components/IdePanel';
import { Icon } from '../components/art/Illustrations';
import Reward from '../components/Reward';
import Bit from '../components/art/Bit';
import { SettingsButton } from '../components/Settings';
import { runCode } from '../utils/api';
import { preloadPython, isPythonReady, cancelPython } from '../utils/pyRunner';
import { buildCheckScript } from '../utils/checkHarness';
import { splitPages } from '../utils/pages';

const DEFAULT_STARTER = {
  python: '# Write your code here\nprint("Hello, world!")\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, world!");\n    }\n}\n',
};

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};

export default function LessonPage() {
  const params = useParams();
  const finalDef = params.trackId ? getTrackFinal(params.trackId) : null;
  const moduleId = finalDef ? finalDef.moduleId : params.moduleId;
  const lessonIndex = params.lessonIndex;
  const isProject = !!useMatch('/project/:moduleId') || !!finalDef;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { progress, completeLesson } = useContext(AppContext);

  const mod = getModule(moduleId);
  const idx = parseInt(lessonIndex, 10);
  const lesson = isProject ? null : mod?.lessons?.[idx];
  const project = finalDef ? finalDef.project : isProject ? getModuleContent(moduleId)?.project : null;
  const content = useMemo(() => (isProject ? project : lesson ? getLessonContent(lesson.id) : null), [isProject, project, lesson]);

  const entryId = finalDef ? `${params.trackId}-final` : isProject ? `${moduleId}-project` : lesson?.id;
  const progressKey = finalDef ? `${params.trackId}-final` : isProject ? `${moduleId}-project` : `${moduleId}-lesson-${idx}`;
  const title = isProject ? project?.title : lesson?.title;

  const seq = useMemo(() => buildSequence(), []);
  const at = seq.findIndex((e) => e.url === pathname);
  const prev = at > 0 ? seq[at - 1] : null;
  const next = at >= 0 && at < seq.length - 1 ? seq[at + 1] : null;
  const kindXp = finalDef ? XP.final : isProject ? XP.project : XP.lesson;

  const pages = useMemo(() => (content ? splitPages(content.body) : []), [content]);
  const [page, setPage] = useState(0);

  const [language, setLanguage] = useState(() => store.get('stepcode_lang') || 'python');
  const [codes, setCodes] = useState({});
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [tab, setTab] = useState('lesson');
  const [reward, setReward] = useState(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 820);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 820);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const starterFor = useCallback((lang) => content?.starter?.[lang] ?? DEFAULT_STARTER[lang], [content]);

  useEffect(() => {
    if (!entryId) return;
    const saved = {};
    ['python', 'java'].forEach((l) => { saved[l] = store.get(`stepcode_code_${entryId}_${l}`); });
    setCodes(saved);
    setStdin(content?.stdin || '');
    setOutput('');
    setTab('lesson');
    setPage(0);
  }, [entryId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { document.querySelector('.lesson-article')?.scrollTo(0, 0); }, [page, entryId]);

  const code = codes[language] || starterFor(language);
  const changeCode = (v) => { setCodes((c) => ({ ...c, [language]: v })); store.set(`stepcode_code_${entryId}_${language}`, v); };
  const changeLanguage = (l) => { setLanguage(l); store.set('stepcode_lang', l); };
  const reset = () => { setCodes((c) => ({ ...c, [language]: '' })); store.set(`stepcode_code_${entryId}_${language}`, ''); setOutput(''); };
  const openSnippet = (text, lang) => {
    const target = lang === 'java' ? 'java' : 'python';
    setLanguage(target);
    setCodes((c) => ({ ...c, [target]: text }));
    setTab('code');
  };

  // Warm up the in-browser Python as soon as a lesson opens, so the first Run is quick.
  useEffect(() => { preloadPython(); }, []);

  const execute = async (source, opts) => {
    if (isMobile) setTab('terminal');
    setIsRunning(true);
    setOutput(language === 'python' && !isPythonReady() ? 'Loading Python (first run only)…' : 'Running…');
    const res = await runCode(source, language, stdin, opts);
    const text = res.error ? `Error: ${res.error}` : res.output;
    setOutput(text);
    setIsRunning(false);
    return text;
  };
  const stop = () => { cancelPython(); };
  const run = () => execute(code);
  const check = async () => {
    if (!project?.checks) return;
    const text = await execute(buildCheckScript(code, project.checks, { interactive: !!project.interactive }), { timeoutMs: 40000 });
    if (/ALL CHECKS PASSED/.test(text)) award();
  };

  const isDone = !!progress[progressKey];
  const xp = xpSummary(progress, seq);
  const lastPage = page >= pages.length - 1;

  const award = () => {
    if (progress[progressKey]) return;
    const before = xpSummary(progress, seq);
    const earned = before.earned + kindXp;
    completeLesson(progressKey);
    setReward({
      kind: finalDef ? 'final' : isProject ? 'project' : 'lesson',
      xp: kindXp,
      before: { level: before.level, intoLevel: before.intoLevel },
      after: { level: Math.floor(earned / XP_PER_LEVEL) + 1, intoLevel: earned % XP_PER_LEVEL },
      streak: Math.max(1, getStreak()),
    });
  };
  const home = courseHome(moduleId);
  const leave = () => navigate(afterUrl(next, moduleId));
  const finish = () => { if (isDone) leave(); else award(); };
  const goNext = () => { if (!lastPage) setPage(page + 1); else finish(); };
  const goBack = () => { if (page > 0) setPage(page - 1); else if (prev) navigate(prev.url); else navigate(home); };

  if (!mod || (!lesson && !project)) {
    return (
      <div className="notfound">
        <h1>Page not found</h1>
        <Link to="/python" className="cx-btn">Back to course</Link>
      </div>
    );
  }

  const article = (
    <div className="lesson-article">
      <div className="lesson-article__head">
        <span className="lesson-article__kind">{finalDef ? 'Final project' : isProject ? 'Project' : 'Lesson'}</span>
        {pages.length > 1 && (
          <span className="lesson-article__dots" aria-label={`Part ${page + 1} of ${pages.length}`}>
            {pages.map((_, i) => <button key={i} type="button" className={i === page ? 'is-on' : i < page ? 'is-past' : ''} onClick={() => setPage(i)} aria-label={`Go to part ${i + 1}`} />)}
          </span>
        )}
      </div>
      <div className="lesson-article__inner">
        {content ? (
          <Markdown source={pages[page] || ''} onRunSnippet={openSnippet} />
        ) : (
          <div className="article">
            <h1>{title}</h1>
            <aside className="callout callout--tip"><span>This lesson is still being written. The editor is ready if you want to experiment.</span></aside>
          </div>
        )}
      </div>
    </div>
  );

  const ide = (
    <IdePanel
      language={language}
      onLanguageChange={changeLanguage}
      code={code}
      onCodeChange={changeCode}
      onReset={reset}
      onRun={run}
      onStop={language === 'python' ? stop : undefined}
      isRunning={isRunning}
      output={output}
      stdin={stdin}
      onStdinChange={setStdin}
      onCheck={isProject ? check : undefined}
      canCheck={language === 'python'}
      view={isMobile ? (tab === 'terminal' ? 'terminal' : 'code') : 'both'}
    />
  );

  return (
    <div className="workspace">
      {reward && <Reward reward={reward} onContinue={() => { setReward(null); leave(); }} onStay={() => setReward(null)} />}
      <header className="workspace__bar">
        <Link to="/" className="workspace__brand" aria-label="StepCode home"><Bit mood="idle" size={30} /><span className="wordmark">StepCode</span></Link>
        <Link to={home} className="workspace__crumb"><span>{courseOfModule(moduleId)?.short || 'Python'}</span><i>/</i><b>{mod.title.split('—')[0].trim()}</b></Link>
        <div className="workspace__xp" title={`${xp.earned} of ${xp.total} XP`}>
          <div className="workspace__progress" role="progressbar" aria-valuenow={xp.pct} aria-valuemin={0} aria-valuemax={100} aria-label="XP earned"><span style={{ width: `${xp.pct}%` }} /></div>
          <span className="workspace__pct">{xp.pct}%</span>
        </div>
        <SettingsButton />
      </header>

      {isMobile ? (
        <>
          <div className="workspace__tabs" role="tablist">
            <button role="tab" aria-selected={tab === 'lesson'} onClick={() => setTab('lesson')}><Icon name="book" size={16} />{isProject ? 'Brief' : 'Read'}</button>
            <button role="tab" aria-selected={tab === 'code'} onClick={() => setTab('code')}><Icon name="code" size={16} />Code</button>
            <button role="tab" aria-selected={tab === 'terminal'} onClick={() => setTab('terminal')}>
              <Icon name="terminal" size={16} />Terminal
              {isRunning ? <i className="workspace__dot workspace__dot--run" /> : output ? <i className={`workspace__dot ${/Traceback|Error|FAIL  |checks failed/.test(output) ? 'workspace__dot--bad' : 'workspace__dot--ok'}`} /> : null}
            </button>
          </div>
          <div className="workspace__body">{tab === 'lesson' ? article : ide}</div>
        </>
      ) : (
        <Split className="split split--h workspace__body" sizes={[46, 54]} minSize={[320, 380]} gutterSize={8} snapOffset={0}>
          {article}
          {ide}
        </Split>
      )}

      <footer className="workspace__foot">
        <Link to={home} className="workspace__menu" aria-label="Back to course outline"><Icon name="layers" size={18} /></Link>
        <div className="workspace__where">
          <b>{title}</b>
          <span>
            {finalDef ? 'Final project' : isProject ? 'Project' : `Lesson ${idx + 1} of ${mod.lessons.length}`}
            {pages.length > 1 && <> · Part {page + 1} of {pages.length}</>}
            <em className="workspace__xpgain">{isDone ? 'Completed' : `+${kindXp} XP`}</em>
          </span>
        </div>
        <div className="workspace__nav">
          <button type="button" className="cx-btn cx-btn--ghost cx-btn--sm" onClick={goBack}>Back</button>
          <button type="button" className="cx-btn cx-btn--sm cx-btn--blue" onClick={goNext}>
            {!lastPage ? 'Next' : isDone ? (next ? 'Next lesson' : 'Back to course') : next ? 'Complete lesson' : 'Finish course'}
          </button>
        </div>
      </footer>
    </div>
  );
}
