import { useState, useEffect } from 'react';
import CodeEditor from '../CodeEditor';
import { runCode } from '../../utils/api';

/**
 * CodeChallengeWidget:
 * Interactive hands-on mini coding step inside a Brilliant lesson.
 * Learners write or tweak a snippet, click "Run Code", and verify against expected output.
 */
export default function CodeChallengeWidget({ props = {}, isSubmitted, onValidationChange }) {
  const language = props.language || 'python';
  const initialCode = props.starterCode || '';
  const expectedOutput = (props.expectedOutput || '').trim();
  const hints = props.hints || [];

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setCode(initialCode);
    setOutput('');
    setIsPassed(false);
    setShowHint(false);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  }, [props]);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Executing code...');

    let runOutput = '';
    if (language === 'javascript') {
      try {
        const logs = [];
        const fakeConsole = {
          log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
          error: (...args) => logs.push('ERROR: ' + args.join(' ')),
          warn: (...args) => logs.push('WARN: ' + args.join(' '))
        };
        const fn = new Function('console', code);
        fn(fakeConsole);
        runOutput = logs.join('\n') || '(Code executed with no stdout)';
      } catch (err) {
        runOutput = `Error: ${err.message}`;
      }
    } else {
      const res = await runCode(code, language);
      if (res.error) runOutput = res.error;
      else runOutput = res.output || '(No output)';
    }

    setOutput(runOutput);
    setIsRunning(false);

    // Validate output
    const cleanOutput = runOutput.trim();
    let passed = false;
    if (expectedOutput) {
      passed = cleanOutput.includes(expectedOutput) || cleanOutput === expectedOutput;
    } else {
      // If no expected output specified, any non-error execution passes
      passed = !cleanOutput.startsWith('Error:') && !cleanOutput.includes('Traceback');
    }

    setIsPassed(passed);
    if (onValidationChange) {
      onValidationChange(passed, true);
    }
  };

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setIsPassed(false);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  };

  return (
    <div className="interactive-code-box" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
      {/* Mini Toolbar */}
      <div className="editor-toolbar" style={{ borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
          {language} · Interactive Sandbox
        </span>

        <div style={{ display: 'flex', gap: 8 }}>
          {hints.length > 0 && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowHint(!showHint)}
              style={{ fontSize: 11, padding: '3px 8px' }}
            >
              💡 {showHint ? 'Hide Hint' : 'Hint'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleReset}
            style={{ fontSize: 11, padding: '3px 8px' }}
          >
            Reset
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleRun}
            disabled={isRunning}
            style={{ fontSize: 11, padding: '3px 12px', fontWeight: 700 }}
          >
            {isRunning ? 'Running...' : '▶ Run Code'}
          </button>
        </div>
      </div>

      {showHint && hints.length > 0 && (
        <div style={{ padding: '8px 16px', background: 'rgba(245, 158, 11, 0.1)', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', fontSize: 13, color: 'var(--warning)' }}>
          💡 <strong>Hint:</strong> {hints[0]}
        </div>
      )}

      {/* Editor Space */}
      <div style={{ minHeight: 140, maxHeight: 260, overflow: 'auto', background: 'var(--bg-editor)' }}>
        <CodeEditor
          code={code}
          language={language}
          onChange={(newCode) => {
            setCode(newCode);
            if (isPassed) {
              setIsPassed(false);
              if (onValidationChange) onValidationChange(false, true);
            }
          }}
        />
      </div>

      {/* Output Console */}
      <div className="terminal-dock" style={{ height: 110, borderRadius: '0 0 var(--radius-lg) var(--radius-lg)' }}>
        <div className="terminal-dock__header" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Terminal Output</span>
          {output && (
            <span style={{ color: isPassed ? '#4ade80' : expectedOutput ? '#f87171' : '#94a3b8' }}>
              {isPassed ? '✓ Test Passed' : expectedOutput ? 'Target not met yet' : 'Ready'}
            </span>
          )}
        </div>
        <div className="terminal-dock__body" style={{ color: isPassed ? '#4ade80' : output.startsWith('Error') ? '#f87171' : '#e2e8f0' }}>
          {output || 'Click "▶ Run Code" above to execute and check output.'}
        </div>
      </div>

      {expectedOutput && (
        <div style={{ padding: '8px 16px', background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-secondary)' }}>
          Expected stdout contains: <code style={{ color: 'var(--primary)', fontWeight: 600 }}>{expectedOutput}</code>
        </div>
      )}
    </div>
  );
}
