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

export default function LessonPage() {
  const { weekId, lessonIndex } = useParams();
  const idx = parseInt(lessonIndex, 10);
  const navigate = useNavigate();
  const { progress, completeItem } = useContext(AppContext);

  const weekContent = getWeekContent(weekId);
  const week = findWeek(weekId);
  const phase = findPhaseForWeek(weekId);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const [mobileTab, setMobileTab] = useState('lesson'); // 'lesson' | 'editor' | 'terminal'

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!weekContent || !week || !weekContent.lessons[idx]) {
    return <div style={{ padding: 40 }}>Lesson not found.</div>;
  }

  const lesson = weekContent.lessons[idx];
  const totalLessons = weekContent.lessons.length;
  const itemId = `${weekId}-lesson-${idx}`;
  const isDone = !!progress[itemId];
  const isTheoryLesson = lesson.layout === 'fullscreen' || lesson.noCode === true || !lesson.starterCode;
  const [showSandbox, setShowSandbox] = useState(() => !isTheoryLesson);

  useEffect(() => {
    setShowSandbox(!isTheoryLesson);
  }, [weekId, idx, isTheoryLesson]);

  const isLeetCode = isLeetCodeCareer(phase?.id, weekId);

  const [currentLang, setCurrentLang] = useState(() => {
    if (isLeetCode) {
      return localStorage.getItem('codequest_leetcode_lang') || 'python';
    }
    return lesson.language || 'javascript';
  });

  const [langCodeMap, setLangCodeMap] = useState(() => {
    if (isLeetCode) {
      return getLeetCodeStarterCodeMap(lesson);
    }
    return { [lesson.language || 'javascript']: lesson.starterCode || '' };
  });

  const [code, setCode] = useState(() => {
    if (isLeetCode) {
      const templates = getLeetCodeStarterCodeMap(lesson);
      const initialLang = localStorage.getItem('codequest_leetcode_lang') || 'python';
      return templates[initialLang] || lesson.starterCode || '';
    }
    return lesson.starterCode || '';
  });

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleLanguageChange = (newLang) => {
    setLangCodeMap(prev => ({ ...prev, [currentLang]: code }));
    setCurrentLang(newLang);
    setCode(langCodeMap[newLang] || '');
    setOutput('');
    try {
      localStorage.setItem('codequest_leetcode_lang', newLang);
    } catch {}
  };

  const handleReset = () => {
    if (isLeetCode) {
      const templates = getLeetCodeStarterCodeMap(lesson);
      setCode(templates[currentLang] || '');
    } else {
      setCode(lesson.starterCode || '');
    }
    setOutput('');
  };

  const handleRun = useCallback(async () => {
    setIsRunning(true);
    setOutput('Running...');
    if (isMobile) setMobileTab('terminal');

    if (currentLang === 'javascript') {
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
      const result = await runCode(code, currentLang);
      if (result.error) setOutput(result.error);
      else setOutput(result.output || '(no output)');
    }
    setIsRunning(false);
  }, [code, isMobile, currentLang]);

  const handleComplete = () => {
    if (!isDone) completeItem(itemId, 'lesson', 15);
    if (idx < totalLessons - 1) {
      navigate(`/lesson/${weekId}/${idx + 1}`);
    } else {
      navigate(`/phase/${phase.id}`);
    }
  };

  const fileName = currentLang === 'java' ? 'Solution.java'
    : currentLang === 'python' || currentLang === 'python3' ? 'solution.py'
    : currentLang === 'cpp' ? 'solution.cpp'
    : currentLang === 'sql' ? 'query.sql'
    : currentLang === 'html' ? 'index.html'
    : currentLang === 'css' ? 'style.css'
    : 'solution.js';

  const themeSprite = weekId?.startsWith('ml-') ? 'bot'
    : weekId?.startsWith('py-') ? 'serpent'
    : (phase?.id === 'phase-2' || phase?.id === 'phase-3' || ['week-5','week-6','week-7','week-8','week-9','week-10','week-11','week-12'].includes(weekId)) ? 'gladiator'
    : (phase?.id === 'phase-1' || phase?.id === 'phase-4' || phase?.id === 'phase-5') ? 'wizard'
    : weekId?.startsWith('sys-') ? 'chip'
    : 'bot';

  const renderLesson = () => (
    <>
      <div className="lesson-panel-left__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <PixelSprite name={themeSprite} size={20} animated={true} />
          <span>Lesson</span>
          <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>
            {idx + 1} / {totalLessons}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {!isMobile && (
            <button
              type="button"
              className="lesson-sandbox-toggle"
              onClick={() => setShowSandbox(prev => !prev)}
              title={showSandbox ? "Switch to Fullscreen Theory Reader" : "Open Interactive Sandbox"}
            >
              <span>{showSandbox ? "📖 Fullscreen Reader" : "💻 Open Sandbox"}</span>
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <PixelSprite name={isDone ? 'trophy' : 'sparkle'} size={14} />
            <span style={{ fontSize: 12, fontWeight: 700, color: isDone ? 'var(--green-bright)' : 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              {isDone ? '+15 XP' : '15 XP'}
            </span>
          </div>
        </div>
      </div>
      <div className="lesson-panel-left__scroll">
        <GlitchHeader
          as="h1"
          text={`${String(idx + 1).padStart(2, '0')}. ${lesson.title}`}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: 14,
          }}
        />
        <div className="lesson-content" dangerouslySetInnerHTML={{ __html: lesson.content }} />
      </div>
    </>
  );

  const renderEditor = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* File tab bar */}
      <div className="editor-tab-bar" style={isLeetCode ? { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: 12 } : {}}>
        <div className="editor-tab">
          <span className="editor-tab__icon">📄</span>
          {fileName}
        </div>
        {/* LeetCode Multi-Language Switcher (Only for DSA & LeetCode Career) */}
        {isLeetCode && (
          <div className="editor-lang-picker" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'var(--font-mono)' }}>
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

      {/* Code Editor */}
      <div className="editor-area">
        <CodeEditor
          code={code}
          language={currentLang}
          onChange={setCode}
        />
      </div>

      {/* Action bar */}
      <div className="editor-action-bar">
        <div className="editor-action-bar__left">
          <button className="btn btn-secondary btn--reset" onClick={handleReset}>
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
    </div>
  );

  const renderTerminal = () => (
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
  );

  return (
    <div style={{ padding: 0 }}>
      {isMobile ? (
        <div className="mobile-code-container">
          {/* Mobile Segmented Tab Bar */}
          <div className="mobile-code-tabs">
            <button
              className={`mobile-code-tab ${mobileTab === 'lesson' ? 'mobile-code-tab--active' : ''}`}
              onClick={() => setMobileTab('lesson')}
            >
              <PixelSprite name="sword" size={13} />
              <span>Lesson</span>
            </button>
            <button
              className={`mobile-code-tab ${mobileTab === 'editor' ? 'mobile-code-tab--active' : ''}`}
              onClick={() => setMobileTab('editor')}
            >
              <PixelSprite name="chip" size={13} />
              <span>Sandbox</span>
            </button>
            <button
              className={`mobile-code-tab ${mobileTab === 'terminal' ? 'mobile-code-tab--active' : ''}`}
              onClick={() => setMobileTab('terminal')}
            >
              <PixelSprite name={output ? "trophy" : isRunning ? "bot" : "cat"} size={13} animated={isRunning} />
              <span>Output</span>
              {output && <span className="mobile-tab-indicator" />}
            </button>
          </div>

          {/* Active Mobile Panel */}
          <div className="mobile-active-panel">
            {mobileTab === 'lesson' && (
              <div className="lesson-panel-left mobile-full-panel">
                {renderLesson()}
                <button
                  className="btn btn-primary mobile-switch-btn"
                  onClick={() => setMobileTab('editor')}
                >
                  <span>Open Code Sandbox</span>
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
                    ← Back to Sandbox
                  </button>
                  <button className="btn btn-primary" onClick={handleComplete}>
                    {idx < totalLessons - 1 ? 'Next Lesson →' : 'Complete Phase →'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : showSandbox ? (
        /* Full-height split layout with sandbox */
        <Split className="lesson-layout" sizes={[40, 60]} gutterSize={2} snapOffset={0}>
          {/* === LEFT: Lesson Content === */}
          <div className="lesson-panel-left">
            {renderLesson()}
          </div>

          {/* === RIGHT: Editor + Terminal === */}
          <Split className="lesson-panel-right" direction="vertical" sizes={[70, 30]} gutterSize={2} snapOffset={0}>
            {renderEditor()}
            {renderTerminal()}
          </Split>
        </Split>
      ) : (
        /* Full-width Theory Reader Layout */
        <div className="lesson-layout--fullscreen">
          <div className="lesson-panel-fullscreen">
            {renderLesson()}
          </div>
        </div>
      )}

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
