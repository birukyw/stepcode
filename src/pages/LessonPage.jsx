import { useState, useContext, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP, getWeekContent } from '../data/roadmap';
import CodeEditor from '../components/CodeEditor';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';
import { runCode } from '../utils/api';
import Split from 'react-split';

export default function LessonPage() {
  const { weekId, lessonIndex } = useParams();
  const idx = parseInt(lessonIndex, 10);
  const navigate = useNavigate();
  const { progress, completeItem } = useContext(AppContext);

  const weekContent = getWeekContent(weekId);
  const week = findWeek(weekId);
  const phase = findPhaseForWeek(weekId);

  if (!weekContent || !week || !weekContent.lessons[idx]) {
    return <div style={{ padding: 40 }}>Lesson not found.</div>;
  }

  const lesson = weekContent.lessons[idx];
  const totalLessons = weekContent.lessons.length;
  const itemId = `${weekId}-lesson-${idx}`;
  const isDone = !!progress[itemId];
  const lang = lesson.language || 'javascript';

  const [code, setCode] = useState(lesson.starterCode || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput('Running...');

    if (lang === 'javascript') {
      try {
        let logs = [];
        const fakeConsole = {
          log: (...args) => logs.push(args.join(' ')),
          error: (...args) => logs.push('ERROR: ' + args.join(' ')),
        };
        const fn = new Function('console', code);
        fn(fakeConsole);
        setOutput(logs.join('\n') || '(no output)');
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
    } else {
      const result = await runCode(code, lang);
      if (result.error) setOutput(result.error);
      else setOutput(result.output || '(no output)');
    }
    setIsRunning(false);
  }, [code, lang]);

  const handleComplete = () => {
    if (!isDone) completeItem(itemId, 'lesson', 15);
    if (idx < totalLessons - 1) {
      navigate(`/lesson/${weekId}/${idx + 1}`);
    } else {
      navigate(`/phase/${phase.id}`);
    }
  };

  const fileName = lang === 'java' ? 'Main.java'
    : lang === 'sql' ? 'query.sql'
    : lang === 'html' ? 'index.html'
    : lang === 'css' ? 'style.css'
    : 'script.js';

  return (
    <div style={{ padding: 0 }}>
      {/* Full-height split layout */}
      <Split className="lesson-layout" sizes={[40, 60]} gutterSize={2} snapOffset={0}>
        {/* === LEFT: Lesson Content === */}
        <div className="lesson-panel-left">
          <div className="lesson-panel-left__header">
            <span>Lesson</span>
            <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>
              {idx + 1} / {totalLessons}
            </span>
          </div>
          <div className="lesson-panel-left__scroll">
            <GlitchHeader
              as="h1"
              text={`${String(idx + 1).padStart(2, '0')}. ${lesson.title}`}
              style={{
                fontFamily: 'var(--font-pixel)',
                fontSize: 14,
                color: 'var(--white)',
                marginBottom: 10,
              }}
            />
            <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </div>
        </div>

        {/* === RIGHT: Editor + Terminal === */}
        <Split className="lesson-panel-right" direction="vertical" sizes={[70, 30]} gutterSize={2} snapOffset={0}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>

          {/* File tab */}
          <div className="editor-tab-bar">
            <div className="editor-tab">
              <span className="editor-tab__icon">📄</span>
              {fileName}
            </div>
          </div>

          {/* Code Editor */}
          <div className="editor-area">
            <CodeEditor
              code={code}
              language={lang}
              onChange={setCode}
            />
          </div>

          {/* Action bar */}
          <div className="editor-action-bar">
            <div className="editor-action-bar__left">
              <button className="btn btn-secondary btn--reset" onClick={() => setCode(lesson.starterCode || '')}>
                ↺ Reset
              </button>
            </div>
            <div className="editor-action-bar__right">
              <button className="btn btn-secondary btn--run" onClick={handleRun} disabled={isRunning}>
                {isRunning ? '⏳ Running...' : '▶ Run'}
              </button>
              <button className="btn btn-primary btn--submit" onClick={handleComplete}>
                {isDone ? 'Next →' : 'Complete & Next →'}
              </button>
            </div>
          </div>

          {/* Terminal */}
          </div>

          <div className="terminal-panel">
            <div className="terminal-header">
              <span>Terminal</span>
              <span className={`terminal-companion ${isRunning ? 'terminal-companion--running' : output ? 'terminal-companion--pass' : ''}`}>
                <PixelSprite name={isRunning ? "bot" : "cat"} size={14} animated={isRunning} />
                <span>{isRunning ? "compiling..." : "ready"}</span>
              </span>
            </div>
            <div className={`terminal-output ${output.startsWith('Error') ? 'error' : ''}`}>
              {output ? output : (
                <div className="terminal-placeholder">
                  <span className="terminal-placeholder__icon">&lt; &gt;</span>
                  Click <strong>Run</strong> to view your results
                </div>
              )}
            </div>
          </div>
        </Split>
      </Split>

      {/* Bottom bar */}
      <div className="lesson-bottom-bar">
        <div className="lesson-bottom-bar__info">
          <div>
            <div className="lesson-bottom-bar__title">{lesson.title}</div>
            <div className="lesson-bottom-bar__sub">
              Lesson {idx + 1} / {totalLessons}
            </div>
          </div>
          <div className="lesson-bottom-bar__xp">15 XP</div>
        </div>
        <div className="lesson-bottom-bar__nav">
          {idx > 0 ? (
            <Link to={`/lesson/${weekId}/${idx - 1}`} className="btn btn--next">
              ← Back
            </Link>
          ) : (
            <Link to={`/phase/${phase.id}`} className="btn btn--next">
              ← Back
            </Link>
          )}
          <button className="btn btn--next" onClick={handleComplete}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

function findWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    for (const week of phase.weeks) {
      if (week.id === weekId) return week;
    }
  }
  return null;
}

function findPhaseForWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    if (phase.weeks.some(w => w.id === weekId)) return phase;
  }
  return ROADMAP.phases[0];
}
