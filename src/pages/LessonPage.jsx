import { useState, useContext, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { getWeekContent, findWeek, findPhaseForWeek } from '../data/roadmap';
import CodeEditor from '../components/CodeEditor';
import BrilliantLessonRunner from '../components/BrilliantLessonRunner';
import { getInteractiveStepsForLesson } from '../utils/lessonStepGenerator';
import { runCode } from '../utils/api';

export default function LessonPage() {
  const { weekId, lessonIndex } = useParams();
  const idx = parseInt(lessonIndex, 10);
  const navigate = useNavigate();
  const { progress, completeLesson } = useContext(AppContext);

  const weekContent = getWeekContent(weekId);
  const week = findWeek(weekId);
  const phase = findPhaseForWeek(weekId);

  // Default to Brilliant-style interactive stepper mode!
  const [viewMode, setViewMode] = useState('interactive');

  // Generate or retrieve interactive steps for this lesson
  const lesson = weekContent?.lessons?.[idx];
  const steps = useMemo(() => {
    if (!lesson) return [];
    return getInteractiveStepsForLesson(lesson, weekContent, weekId, idx);
  }, [lesson, weekContent, weekId, idx]);

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Full article editor state
  const hasCode = Boolean(lesson?.starterCode);
  const [currentLang, setCurrentLang] = useState(lesson?.language || 'python');
  const [code, setCode] = useState(lesson?.starterCode || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (lesson) {
      setCurrentLang(lesson.language || 'python');
      setCode(lesson.starterCode || '');
      setOutput('');
    }
  }, [lesson, idx]);

  if (!weekContent || !week || !weekContent.lessons || !weekContent.lessons[idx]) {
    return (
      <div style={{ padding: 60, textAlign: 'center' }}>
        <h2>Lesson not found</h2>
        <button type="button" className="btn btn-primary" style={{ marginTop: 20 }} onClick={() => navigate('/')}>
          Return to courses
        </button>
      </div>
    );
  }

  const totalLessons = weekContent.lessons.length;
  const itemId = `${weekId}-lesson-${idx}`;
  const isDone = !!progress[itemId];

  const handleReset = () => {
    setCode(lesson.starterCode || '');
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running...');

    if (currentLang === 'javascript') {
      try {
        let logs = [];
        const fakeConsole = {
          log: (...args) => logs.push(args.join(' ')),
          error: (...args) => logs.push('ERROR: ' + args.join(' ')),
        };
        const fn = new Function('console', code);
        fn(fakeConsole);
        setOutput(logs.join('\n') || '(No output)');
      } catch (err) {
        setOutput(`Error: ${err.message}`);
      }
    } else {
      const result = await runCode(code, currentLang);
      if (result.error) setOutput(result.error);
      else setOutput(result.output || '(No output)');
    }
    setIsRunning(false);
  };

  const handleContinue = () => {
    completeLesson(itemId);
    if (idx < totalLessons - 1) {
      navigate(`/lesson/${weekId}/${idx + 1}`);
    } else {
      navigate(-1);
    }
  };

  const progressPercent = ((idx + 1) / totalLessons) * 100;

  // ─── BRILLIANT-STYLE INTERACTIVE MODE (Default) ───────────────────────────
  if (viewMode === 'interactive' && steps.length > 0) {
    return (
      <BrilliantLessonRunner
        key={`${weekId}-${idx}`}
        lesson={lesson}
        steps={steps}
        week={week}
        phase={phase}
        lessonIndex={idx}
        totalLessons={totalLessons}
        onExit={() => navigate(-1)}
        onComplete={() => completeLesson(itemId)}
        onNextLesson={
          idx < totalLessons - 1
            ? () => navigate(`/lesson/${weekId}/${idx + 1}`)
            : () => navigate(-1)
        }
        onSwitchToReader={() => setViewMode('reader')}
      />
    );
  }

  // ─── FULL ARTICLE & SANDBOX MODE (Optional deep reference view) ───────────
  return (
    <div className="lesson-workspace-container">
      {/* Top Header */}
      <header className="lesson-top-nav">
        <button
          type="button"
          className="lesson-top-nav__close"
          onClick={() => navigate(-1)}
        >
          ← {week.title.split(':')[0]}
        </button>

        <div className="lesson-top-nav__title">
          {idx + 1}/{totalLessons} · {lesson.title}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Switch back to Brilliant Interactive Mode */}
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setViewMode('interactive')}
            style={{ fontSize: 12, padding: '5px 12px', fontWeight: 700 }}
          >
            ✨ Interactive Mode
          </button>

          <div className="lesson-top-nav__progress-track" title={`${Math.round(progressPercent)}%`}>
            <div
              className="lesson-top-nav__progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Split Screen */}
      <div className="lesson-split-main">
        {/* Left Panel: Reader */}
        <div className="lesson-panel-reader">
          <div style={{ marginBottom: 16, padding: '10px 14px', background: 'var(--primary-subtle)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600 }}>
              💡 Prefer hands-on intuition puzzles?
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => setViewMode('interactive')}
              style={{ fontSize: 11, padding: '4px 10px' }}
            >
              Start Interactive Lesson →
            </button>
          </div>

          <article className="lesson-reader-article">
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
          </article>
        </div>

        {/* Right Panel: Code Editor */}
        {hasCode && (
          <div className="lesson-panel-editor">
            {/* Editor Toolbar */}
            <div className="editor-toolbar">
              <select
                className="editor-toolbar__lang-select"
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
              >
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="sql">SQL</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
              </select>

              <div className="editor-toolbar__actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={handleReset}
                >
                  Reset
                </button>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleRun}
                  disabled={isRunning}
                >
                  {isRunning ? 'Running...' : '▶ Run'}
                </button>
              </div>
            </div>

            {/* CodeMirror Workspace */}
            <div className="editor-codemirror-box">
              <CodeEditor
                code={code}
                language={currentLang}
                onChange={setCode}
              />
            </div>

            {/* Terminal Output */}
            <div className="terminal-dock">
              <div className="terminal-dock__header">Output</div>
              <div className="terminal-dock__body">
                {output || 'Run your code to see output here.'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Dock */}
      <footer className="lesson-bottom-dock">
        <div className="lesson-bottom-dock__status">
          <span className="lesson-bottom-dock__message">
            {isDone
              ? '✓ Completed'
              : hasCode
              ? 'Try the code, then continue.'
              : 'Read and continue when ready.'}
          </span>
        </div>

        <div className="lesson-bottom-dock__actions">
          {idx > 0 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(`/lesson/${weekId}/${idx - 1}`)}
            >
              Previous
            </button>
          )}

          <button
            type="button"
            className="btn btn-success"
            onClick={handleContinue}
          >
            {idx < totalLessons - 1 ? 'Continue' : 'Finish'}
          </button>
        </div>
      </footer>
    </div>
  );
}
