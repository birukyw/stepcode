import { useState, useContext, useCallback, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP, getWeekContent } from '../data/roadmap';
import CodeEditor from '../components/CodeEditor';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';
import { runCode } from '../utils/api';
import Split from 'react-split';
import { isLeetCodeCareer, getLeetCodeStarterCodeMap } from '../data/leetcodeTemplates';

export default function ExercisePage() {
  const { weekId, exerciseIndex } = useParams();
  const idx = parseInt(exerciseIndex, 10);
  const navigate = useNavigate();
  const { progress, completeItem } = useContext(AppContext);

  const weekContent = getWeekContent(weekId);
  const week = findWeek(weekId);
  const phase = findPhaseForWeek(weekId);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const [mobileTab, setMobileTab] = useState('instructions'); // 'instructions' | 'editor' | 'terminal'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!weekContent || !week || !weekContent.exercises[idx]) {
    return <div style={{ padding: 40 }}>Exercise not found.</div>;
  }

  const exercise = weekContent.exercises[idx];
  const itemId = `${weekId}-exercise-${idx}`;
  const isDone = !!progress[itemId];
  const isLeetCode = isLeetCodeCareer(phase?.id, weekId);

  const [currentLang, setCurrentLang] = useState(() => {
    if (isLeetCode) {
      return localStorage.getItem('codequest_leetcode_lang') || 'python';
    }
    return exercise.language || 'javascript';
  });

  const [langCodeMap, setLangCodeMap] = useState(() => {
    if (isLeetCode) {
      return getLeetCodeStarterCodeMap(exercise);
    }
    return { [exercise.language || 'javascript']: exercise.starterCode || '' };
  });

  const [code, setCode] = useState(() => {
    if (isLeetCode) {
      const templates = getLeetCodeStarterCodeMap(exercise);
      const initialLang = localStorage.getItem('codequest_leetcode_lang') || 'python';
      return templates[initialLang] || exercise.starterCode || '';
    }
    return exercise.starterCode || '';
  });

  const [output, setOutput] = useState('');
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLang) => {
    setLangCodeMap(prev => ({ ...prev, [currentLang]: code }));
    setCurrentLang(newLang);
    setCode(langCodeMap[newLang] || '');
    setOutput('');
    setResult(null);
    try {
      localStorage.setItem('codequest_leetcode_lang', newLang);
    } catch {}
  };

  const handleReset = () => {
    if (isLeetCode) {
      const templates = getLeetCodeStarterCodeMap(exercise);
      setCode(templates[currentLang] || '');
    } else {
      setCode(exercise.starterCode || '');
    }
    setOutput('');
    setResult(null);
  };

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput('Running...');
    if (isMobile) setMobileTab('terminal');
    let actualOutput = '';

    if (currentLang === 'javascript') {
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
      const res = await runCode(code, currentLang);
      actualOutput = res.error || res.output || '';
    }

    setOutput(actualOutput || '(no output)');
    setIsRunning(false);
  }, [code, currentLang, isMobile]);

  const handleSubmit = useCallback(async () => {
    setIsRunning(true);
    setResult(null);
    if (isMobile) setMobileTab('terminal');
    let actualOutput = '';

    if (currentLang === 'javascript') {
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
      const res = await runCode(code, currentLang);
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
  }, [code, currentLang, exercise, isDone, itemId, isMobile]);

  const fileName = currentLang === 'java' ? 'Main.java'
    : currentLang === 'python' || currentLang === 'python3' ? 'solution.py'
    : currentLang === 'cpp' ? 'solution.cpp'
    : currentLang === 'c' ? 'solution.c'
    : currentLang === 'sql' ? 'query.sql'
    : currentLang === 'html' ? 'index.html'
    : currentLang === 'css' ? 'style.css'
    : 'script.js';

  const renderInstructions = () => (
    <>
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
    </>
  );

  const renderEditor = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <div className="editor-tab-bar" style={isLeetCode ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 12 } : {}}>
        <div className="editor-tab">
          <span className="editor-tab__icon">📄</span>
          {fileName}
        </div>
        {/* LeetCode Multi-Language Switcher (Only for DSA and Leetcode Mastery Career) */}
        {isLeetCode && (
          <div className="editor-lang-picker" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'var(--font-pixel)' }}>
              Lang:
            </span>
            <select
              value={currentLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="editor-lang-select"
              title="Switch programming language (LeetCode style)"
            >
              <option value="python">🐍 Python 3</option>
              <option value="java">☕ Java</option>
              <option value="cpp">⚡ C++ 17</option>
              <option value="javascript">🟨 JavaScript</option>
            </select>
          </div>
        )}
      </div>

      <div className="editor-area">
        <CodeEditor code={code} language={currentLang} onChange={setCode} />
      </div>

      <div className="editor-action-bar">
        <div className="editor-action-bar__left">
          <button className="btn btn-secondary btn--reset" onClick={handleReset}>
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
  );

  const renderTerminal = () => (
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
  );

  return (
    <div style={{ padding: 0 }}>
      {isMobile ? (
        <div className="mobile-code-container">
          {/* Mobile Segmented Tab Bar */}
          <div className="mobile-code-tabs">
            <button
              className={`mobile-code-tab ${mobileTab === 'instructions' ? 'mobile-code-tab--active' : ''}`}
              onClick={() => setMobileTab('instructions')}
            >
              <PixelSprite name="sword" size={13} />
              <span>Task</span>
            </button>
            <button
              className={`mobile-code-tab ${mobileTab === 'editor' ? 'mobile-code-tab--active' : ''}`}
              onClick={() => setMobileTab('editor')}
            >
              <PixelSprite name="chip" size={13} />
              <span>Code</span>
            </button>
            <button
              className={`mobile-code-tab ${mobileTab === 'terminal' ? 'mobile-code-tab--active' : ''}`}
              onClick={() => setMobileTab('terminal')}
            >
              <PixelSprite name={result === 'pass' ? 'trophy' : isRunning ? 'bot' : 'cat'} size={13} animated={isRunning} />
              <span>Output</span>
              {output && <span className="mobile-tab-indicator" />}
            </button>
          </div>

          {/* Active Mobile Panel */}
          <div className="mobile-active-panel">
            {mobileTab === 'instructions' && (
              <div className="lesson-panel-left mobile-full-panel">
                {renderInstructions()}
                <button
                  className="btn btn-primary mobile-switch-btn"
                  onClick={() => setMobileTab('editor')}
                >
                  <span>Open Code Editor</span>
                  <span style={{ fontSize: 16 }}>➔</span>
                </button>
              </div>
            )}

            {mobileTab === 'editor' && (
              <div className="mobile-editor-wrapper">
                {renderEditor()}
              </div>
            )}

            {mobileTab === 'terminal' && (
              <div className="mobile-terminal-wrapper">
                {renderTerminal()}
                <div className="mobile-terminal-actions">
                  <button className="btn btn-secondary" onClick={() => setMobileTab('editor')}>
                    ← Back to Editor
                  </button>
                  {result === 'pass' && idx < weekContent.exercises.length - 1 && (
                    <Link to={`/exercise/${weekId}/${idx + 1}`} className="btn btn-primary" onClick={() => setMobileTab('instructions')}>
                      Next Exercise →
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Split className="lesson-layout" sizes={[40, 60]} gutterSize={2} snapOffset={0}>
          {/* === LEFT: Exercise Instructions === */}
          <div className="lesson-panel-left">
            {renderInstructions()}
          </div>

          {/* === RIGHT: Code Editor + Terminal === */}
          <Split className="lesson-panel-right" direction="vertical" sizes={[70, 30]} gutterSize={2} snapOffset={0}>
            {renderEditor()}
            {renderTerminal()}
          </Split>
        </Split>
      )}

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
