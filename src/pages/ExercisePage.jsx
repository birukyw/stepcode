import { useState, useContext, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP, getWeekContent } from '../data/roadmap';
import CodeEditor from '../components/CodeEditor';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';
import { runCode } from '../utils/api';
import Split from 'react-split';

export default function ExercisePage() {
  const { weekId, exerciseIndex } = useParams();
  const idx = parseInt(exerciseIndex, 10);
  const navigate = useNavigate();
  const { progress, completeItem } = useContext(AppContext);

  const weekContent = getWeekContent(weekId);
  const week = findWeek(weekId);
  const phase = findPhaseForWeek(weekId);

  if (!weekContent || !week || !weekContent.exercises[idx]) {
    return <div style={{ padding: 40 }}>Exercise not found.</div>;
  }

  const exercise = weekContent.exercises[idx];
  const itemId = `${weekId}-exercise-${idx}`;
  const isDone = !!progress[itemId];
  const lang = exercise.language || 'javascript';

  const [code, setCode] = useState(exercise.starterCode || '');
  const [output, setOutput] = useState('');
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput('Running...');
    let actualOutput = '';

    if (lang === 'javascript') {
      try {
        let logs = [];
        const fakeConsole = { log: (...args) => logs.push(args.join(' ')), error: (...args) => logs.push('ERROR: ' + args.join(' ')) };
        const fn = new Function('console', code);
        fn(fakeConsole);
        actualOutput = logs.join('\n');
      } catch (err) {
        actualOutput = `Error: ${err.message}`;
      }
    } else {
      const res = await runCode(code, lang);
      actualOutput = res.error || res.output || '';
    }

    setOutput(actualOutput || '(no output)');
    setIsRunning(false);
  }, [code, lang]);

  const handleSubmit = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    let actualOutput = '';

    if (lang === 'javascript') {
      try {
        let logs = [];
        const fakeConsole = { log: (...args) => logs.push(args.join(' ')), error: (...args) => logs.push('ERROR: ' + args.join(' ')) };
        const fn = new Function('console', code);
        fn(fakeConsole);
        actualOutput = logs.join('\n');
      } catch (err) {
        actualOutput = `Error: ${err.message}`;
      }
    } else {
      const res = await runCode(code, lang);
      actualOutput = res.error || res.output || '';
    }

    setOutput(actualOutput);

    const expected = (exercise.expectedOutput || '').trim();
    const actual = actualOutput.trim();

    if (expected && actual === expected) {
      setResult('pass');
      if (!isDone) completeItem(itemId, 'exercise', 20);
    } else if (exercise.validator) {
      try {
        const isValid = exercise.validator(actual, code);
        if (isValid) { setResult('pass'); if (!isDone) completeItem(itemId, 'exercise', 20); }
        else setResult('fail');
      } catch { setResult('fail'); }
    } else {
      setResult(actual.length > 0 && !actual.startsWith('Error') ? 'pass' : 'fail');
      if (actual.length > 0 && !actual.startsWith('Error') && !isDone) {
        completeItem(itemId, 'exercise', 20);
      }
    }
    setIsRunning(false);
  }, [code, exercise, isDone, itemId, lang]);

  const fileName = lang === 'java' ? 'Main.java'
    : lang === 'sql' ? 'query.sql'
    : lang === 'html' ? 'index.html'
    : lang === 'css' ? 'style.css'
    : 'script.js';

  return (
    <div style={{ padding: 0 }}>
      <Split className="lesson-layout" sizes={[40, 60]} gutterSize={2} snapOffset={0}>
        {/* === LEFT: Exercise Instructions === */}
        <div className="lesson-panel-left">
          <div className="lesson-panel-left__header">
            <span>Exercise</span>
            <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>
              {idx + 1} / {weekContent.exercises.length}
            </span>
          </div>
          <div className="lesson-panel-left__scroll">
            <GlitchHeader
              as="h1"
              text={`⚔️ Exercise ${idx + 1}`}
              style={{
                fontFamily: 'var(--font-pixel)', fontSize: 14,
                color: 'var(--white)', marginBottom: 4,
              }}
            />
            <GlitchHeader
              as="h2"
              text={exercise.title}
              scramble={false}
              style={{
                fontFamily: 'var(--font-pixel)', fontSize: 10,
                color: 'var(--cyan)', marginBottom: 16,
              }}
            />

            <div className="lesson-content" dangerouslySetInnerHTML={{ __html: exercise.description }} />

            {exercise.expectedOutput && (
              <div style={{ marginTop: 16 }}>
                <h3 style={{ fontFamily: 'var(--font-pixel)', fontSize: 9, color: 'var(--green-bright)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <PixelSprite name="chip" size={12} /> Expected Output:
                </h3>
                <pre style={{
                  background: 'var(--bg-terminal)', padding: 12, borderRadius: 6,
                  fontSize: 14, color: 'var(--green-bright)', border: '1px solid var(--border)',
                }}>{exercise.expectedOutput}</pre>
              </div>
            )}

            {result && (
              <div style={{
                marginTop: 16, padding: '12px 16px', borderRadius: 6,
                border: `1px solid ${result === 'pass' ? 'var(--green-bright)' : 'var(--red)'}`,
                background: result === 'pass' ? 'rgba(76,175,80,0.1)' : 'rgba(239,83,80,0.1)',
                color: result === 'pass' ? 'var(--green-bright)' : 'var(--red)',
                fontFamily: 'var(--font-pixel)', fontSize: 9,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <PixelSprite name={result === 'pass' ? 'trophy' : 'bug'} size={16} />
                <span>{result === 'pass' ? 'All tests passed! +20 XP' : 'Bug detected! Not quite right. Try again!'}</span>
              </div>
            )}

            {exercise.hints && exercise.hints.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <button className="btn btn--reset" onClick={() => setShowHint(!showHint)}>
                  {showHint ? 'Hide Hint' : '💡 Show Hint'}
                </button>
                {showHint && (
                  <div style={{
                    marginTop: 10, padding: '10px 16px', borderRadius: 6,
                    borderLeft: '3px solid var(--yellow)', background: 'rgba(255,214,0,0.04)',
                    color: 'var(--text-secondary)', fontSize: 14,
                  }}>
                    {exercise.hints[0]}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* === RIGHT: Code Editor + Terminal === */}
        <Split className="lesson-panel-right" direction="vertical" sizes={[70, 30]} gutterSize={2} snapOffset={0}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>

          <div className="editor-tab-bar">
            <div className="editor-tab">
              <span className="editor-tab__icon">📄</span>
              {fileName}
            </div>
          </div>

          <div className="editor-area">
            <CodeEditor code={code} language={lang} onChange={setCode} />
          </div>

          <div className="editor-action-bar">
            <div className="editor-action-bar__left">
              <button className="btn btn-secondary btn--reset" onClick={() => { setCode(exercise.starterCode || ''); setResult(null); setOutput(''); }}>
                ↺ Reset
              </button>
            </div>
            <div className="editor-action-bar__right">
              <button className="btn btn-secondary btn--run" onClick={handleRun} disabled={isRunning}>
                ▶ Run
              </button>
              <button className="btn btn-primary btn--submit" onClick={handleSubmit} disabled={isRunning}>
                {isRunning ? '⏳ Checking...' : 'Submit answer'}
              </button>
            </div>
          </div>

                    </div>

          <div className="terminal-panel">
            <div className="terminal-header">
              <span>Terminal</span>
              <span className={`terminal-companion ${isRunning ? 'terminal-companion--running' : result === 'pass' ? 'terminal-companion--pass' : result === 'fail' ? 'terminal-companion--fail' : ''}`}>
                <PixelSprite
                  name={isRunning ? 'bot' : result === 'pass' ? 'trophy' : result === 'fail' ? 'bug' : 'cat'}
                  size={14}
                  animated={isRunning}
                />
                <span>{isRunning ? 'running tests...' : result === 'pass' ? 'tests passed' : result === 'fail' ? 'bug detected' : 'awaiting run'}</span>
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
            <div className="lesson-bottom-bar__title">{exercise.title}</div>
            <div className="lesson-bottom-bar__sub">
              Exercise {idx + 1} / {weekContent.exercises.length}
            </div>
          </div>
          <div className="lesson-bottom-bar__xp">20 XP</div>
        </div>
        <div className="lesson-bottom-bar__nav">
          <Link to={`/phase/${phase.id}`} className="btn btn--next">← Back</Link>
          {idx < weekContent.exercises.length - 1 && (
            <Link to={`/exercise/${weekId}/${idx + 1}`} className="btn btn--next">Next →</Link>
          )}
        </div>
      </div>
    </div>
  );
}

function findWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    for (const week of phase.weeks) { if (week.id === weekId) return week; }
  }
  return null;
}

function findPhaseForWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    if (phase.weeks.some(w => w.id === weekId)) return phase;
  }
  return ROADMAP.phases[0];
}
