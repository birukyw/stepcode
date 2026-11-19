import { useState } from 'react';
import Split from 'react-split';
import CodeEditor from './CodeEditor';
import { Icon } from './art/Illustrations';
import Bit from './art/Bit';

const LANGUAGES = [
  { id: 'python', label: 'Python', file: 'main.py' },
  { id: 'java', label: 'Java', file: 'Main.java' },
];

/**
 * Editor on top, terminal below. Both gutters drag.
 * Parent owns code/language/output so lesson navigation can reset them.
 */
export default function IdePanel({
  language, onLanguageChange, code, onCodeChange, onReset,
  onRun, onStop, isRunning, output, stdin, onStdinChange,
  onCheck, checkLabel = 'Run checks', canCheck = true,
}) {
  const [showInput, setShowInput] = useState(false);
  const current = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];
  const failed = /Traceback|Error|error:|Exception|FAIL  |checks failed/.test(output || '');
  const passed = /ALL CHECKS PASSED/.test(output || '');
  const status = isRunning ? 'run' : !output ? 'idle' : failed ? 'error' : 'ok';
  const statusText = { run: 'Running', idle: 'Ready', error: 'Finished with errors', ok: passed ? 'All checks passed' : 'Finished' }[status];

  return (
    <div className="ide">
      <div className="ide__bar">
        <span className="ide__file">{current.file}</span>
        <select className="ide__select" value={language} onChange={(e) => onLanguageChange(e.target.value)} aria-label="Language">
          {LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
        </select>
        <div className="ide__spacer" />
        <button type="button" className="ide__btn" onClick={onReset}>Reset</button>
        {onCheck && (
          <button type="button" className="ide__btn ide__btn--accent" onClick={onCheck} disabled={isRunning || !canCheck} title={canCheck ? '' : 'Checks run on Python'}>
            {checkLabel}
          </button>
        )}
        {isRunning && onStop ? (
          <button type="button" className="ide__run ide__run--stop" onClick={onStop}>Stop</button>
        ) : (
          <button type="button" className="ide__run" onClick={onRun} disabled={isRunning}>
            <Icon name="play" size={14} /> {isRunning ? 'Running' : 'Run'}
          </button>
        )}
      </div>

      <Split className="split split--v" direction="vertical" sizes={[62, 38]} minSize={[120, 80]} gutterSize={8} snapOffset={0}>
        <div className="ide__editor">
          <CodeEditor code={code} language={language} onChange={onCodeChange} />
        </div>

        <div className="terminal">
          <div className="terminal__bar">
            <span className="terminal__title">
              <Bit mood={status === 'run' ? 'think' : status === 'error' ? 'sad' : status === 'ok' ? 'happy' : 'idle'} size={26} />
              Terminal
              <em className="terminal__mood">{statusText}</em>
            </span>
            <button type="button" className="ide__btn" onClick={() => setShowInput((v) => !v)}>
              {showInput ? 'Hide input' : 'Input'}
            </button>
          </div>
          {showInput && (
            <textarea
              className="terminal__stdin"
              value={stdin}
              onChange={(e) => onStdinChange(e.target.value)}
              placeholder="Text for input() / Scanner, one answer per line"
              rows={2}
              spellCheck={false}
            />
          )}
          <pre className="terminal__out" aria-live="polite">{output || 'Press Run to see your output here.'}</pre>
        </div>
      </Split>
    </div>
  );
}
