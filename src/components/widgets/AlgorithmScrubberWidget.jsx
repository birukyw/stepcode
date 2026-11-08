import { useState, useEffect } from 'react';

/**
 * AlgorithmScrubberWidget:
 * Step-by-step interactive timeline scrubber that lets learners scrub through
 * an algorithm's execution frame by frame.
 *
 * Two modes:
 * - Array mode (legacy default): binary-search style frames over `initialArray`.
 * - Code mode (props.codeLines + props.steps): highlight the executing line,
 *   show the live variable table and stdout, optionally gate on a prediction.
 *
 * Step shape (code mode):
 *   { line: number, vars: { name: value }, output?: string, desc?: string }
 */
export default function AlgorithmScrubberWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [predictionId, setPredictionId] = useState(null);

  const codeLines = Array.isArray(props.codeLines) ? props.codeLines : null;
  const codeSteps = Array.isArray(props.steps) ? props.steps : null;
  const isCodeMode = Boolean(codeLines && codeLines.length > 0 && codeSteps && codeSteps.length > 0);
  const prediction = props.prediction || null;

  const initialArray = props.initialArray || [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const frames = props.frames || [];
  const totalSteps = isCodeMode
    ? codeSteps.length
    : (props.totalSteps || frames.length || 1);

  const currentFrame = !isCodeMode
    ? frames[stepIndex] || {
        low: 0,
        mid: 4,
        high: initialArray.length - 1,
        eliminated: [],
        desc: 'Initial check'
      }
    : null;

  const currentCodeStep = isCodeMode ? codeSteps[stepIndex] || {} : null;

  const atEnd = stepIndex >= totalSteps - 1;
  const predictionCorrect = prediction
    ? (() => {
        const opts = prediction.options || [];
        const found = opts.find((o) => (o.id !== undefined ? o.id : opts.indexOf(o)) === predictionId);
        return Boolean(found && found.isCorrect);
      })()
    : true;

  const emitValidation = (idx, predId) => {
    if (!onValidationChange) return;
    const reachedEnd = idx >= totalSteps - 1;
    let correct = true;
    if (prediction) {
      const opts = prediction.options || [];
      const found = opts.find((o) => (o.id !== undefined ? o.id : opts.indexOf(o)) === predId);
      correct = Boolean(found && found.isCorrect);
    }
    onValidationChange(reachedEnd && correct, true);
  };

  const goTo = (newIdx) => {
    const clamped = Math.min(Math.max(0, newIdx), totalSteps - 1);
    setStepIndex(clamped);
    emitValidation(clamped, predictionId);
  };

  const handleSliderChange = (e) => goTo(parseInt(e.target.value, 10));
  const handlePrev = () => goTo(stepIndex - 1);
  const handleNext = () => goTo(stepIndex + 1);

  useEffect(() => {
    setStepIndex(0);
    setPredictionId(null);
    if (onValidationChange) {
      onValidationChange(totalSteps <= 1 && !prediction, totalSteps <= 1);
    }
  }, [props, totalSteps]);

  const handlePredictionSelect = (option, index) => {
    if (isSubmitted) return;
    const id = option.id !== undefined ? option.id : index;
    setPredictionId(id);
    emitValidation(stepIndex, id);
  };

  // ─── Code execution mode ────────────────────────────────────────────────
  if (isCodeMode) {
    const activeLine = typeof currentCodeStep.line === 'number' ? currentCodeStep.line : -1;
    const vars = currentCodeStep.vars || {};

    return (
      <div className="scrubber-widget-container">
        {/* Code listing with active-line highlight */}
        <div
          style={{
            width: '100%',
            maxWidth: 620,
            background: 'var(--bg-editor)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            padding: '12px 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            overflowX: 'auto'
          }}
        >
          {codeLines.map((line, idx) => {
            const isActive = idx === activeLine;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: 12,
                  padding: '2px 14px',
                  background: isActive ? 'rgba(37, 99, 235, 0.18)' : 'transparent',
                  borderLeft: `3px solid ${isActive ? 'var(--primary)' : 'transparent'}`,
                  transition: 'background 0.15s',
                }}
              >
                <span style={{ width: 22, textAlign: 'right', color: '#64748b', userSelect: 'none', flexShrink: 0 }}>
                  {idx + 1}
                </span>
                <span style={{ color: isActive ? '#e2e8f0' : '#94a3b8', whiteSpace: 'pre' }}>
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </div>

        {/* Live variable table + stdout */}
        <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 620, marginTop: 14, flexWrap: 'wrap' }}>
          <div
            style={{
              flex: '1 1 260px',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px'
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              Variables
            </div>
            {Object.keys(vars).length === 0 ? (
              <div style={{ fontSize: 12, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                (no bindings yet)
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                {Object.entries(vars).map(([name, value]) => (
                  <div key={name} style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                    <span style={{ color: '#60a5fa', fontWeight: 700 }}>{name}</span>
                    <span style={{ color: 'var(--text-primary)' }}>{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div
            style={{
              flex: '1 1 260px',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px'
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
              Output
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', whiteSpace: 'pre-wrap', minHeight: 18 }}>
              {currentCodeStep.output || '—'}
            </div>
          </div>
        </div>

        {/* Timeline controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 620, marginTop: 16 }}>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handlePrev} disabled={stepIndex <= 0} aria-label="Previous step">
            ◀
          </button>
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={stepIndex}
            onChange={handleSliderChange}
            className="scrubber-slider"
            style={{ flex: 1 }}
            aria-label="Execution timeline scrubber"
          />
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleNext} disabled={atEnd} aria-label="Next step">
            ▶
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 620, fontSize: 12, color: 'var(--text-dim)' }}>
          <span>Line {activeLine + 1}</span>
          <span>Step {stepIndex + 1} of {totalSteps}</span>
          <span>{atEnd ? '✨ Final state' : 'Scrub to explore'}</span>
        </div>

        {currentCodeStep.desc && (
          <div className="scrubber-frame-desc" style={{ maxWidth: 620 }}>
            {currentCodeStep.desc}
          </div>
        )}

        {/* Optional prediction check at the end of the trace */}
        {prediction && (
          <div
            style={{
              width: '100%',
              maxWidth: 620,
              marginTop: 18,
              padding: '14px 16px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              background: 'var(--bg-surface)'
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>
              🔮 {prediction.prompt || 'Predict the final state:'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(prediction.options || []).map((option, index) => {
                const id = option.id !== undefined ? option.id : index;
                const isSelected = predictionId === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handlePredictionSelect(option, index)}
                    disabled={isSubmitted}
                    style={{
                      textAlign: 'left',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                      color: isSelected ? 'var(--primary)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {option.text}
                  </button>
                );
              })}
            </div>
            {predictionId !== null && !predictionCorrect && (
              <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-dim)' }}>
                Not quite — keep scrubbing the trace and try again.
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ─── Array mode (legacy default) ────────────────────────────────────────
  const eliminatedSet = new Set(currentFrame.eliminated || []);

  return (
    <div className="scrubber-widget-container">
      {/* Array visualization */}
      <div className="array-cells-row">
        {initialArray.map((val, idx) => {
          const isMid = idx === currentFrame.mid;
          const isLow = idx === currentFrame.low || idx === currentFrame.left;
          const isHigh = idx === currentFrame.high || idx === currentFrame.right;
          const isEliminated = eliminatedSet.has(idx);

          let cellClass = 'array-cell';
          if (isMid) cellClass += ' array-cell--active';
          if (isEliminated) cellClass += ' array-cell--disabled';

          return (
            <div key={idx} className={cellClass} style={{ position: 'relative' }}>
              <span className="array-cell__val">{val}</span>
              <span className="array-cell__idx">[{idx}]</span>

              {/* Pointer Badges */}
              <div style={{ position: 'absolute', top: -14, display: 'flex', gap: 2 }}>
                {isLow && (
                  <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-subtle)', padding: '1px 3px', borderRadius: 3 }}>
                    {currentFrame.left !== undefined ? 'L' : 'LOW'}
                  </span>
                )}
                {isMid && (
                  <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--warning)', background: 'var(--warning-subtle)', padding: '1px 3px', borderRadius: 3 }}>
                    MID
                  </span>
                )}
                {isHigh && (
                  <span style={{ fontSize: 9, fontWeight: 800, color: 'var(--purple)', background: 'var(--purple-subtle)', padding: '1px 3px', borderRadius: 3 }}>
                    {currentFrame.right !== undefined ? 'R' : 'HIGH'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Pointer Legend */}
      <div className="array-pointers-row" style={{ marginTop: 8, marginBottom: 16 }}>
        {currentFrame.low !== undefined && (
          <span className="pointer-pill pointer-pill--low">Low: {currentFrame.low}</span>
        )}
        {currentFrame.left !== undefined && (
          <span className="pointer-pill pointer-pill--low">Left: {currentFrame.left}</span>
        )}
        {currentFrame.mid !== undefined && (
          <span className="pointer-pill pointer-pill--mid">
            Mid: {currentFrame.mid} (Val: {initialArray[currentFrame.mid]})
          </span>
        )}
        {currentFrame.right !== undefined && (
          <span className="pointer-pill pointer-pill--high">Right: {currentFrame.right}</span>
        )}
        {currentFrame.high !== undefined && (
          <span className="pointer-pill pointer-pill--high">High: {currentFrame.high}</span>
        )}
      </div>

      {/* Interactive Controls & Range Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', maxWidth: 440 }}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handlePrev}
          disabled={stepIndex <= 0}
          aria-label="Previous step"
        >
          ◀
        </button>

        <input
          type="range"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={stepIndex}
          onChange={handleSliderChange}
          className="scrubber-slider"
          style={{ flex: 1, margin: '12px 0' }}
          aria-label="Algorithm timeline scrubber"
        />

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleNext}
          disabled={stepIndex >= totalSteps - 1}
          aria-label="Next step"
        >
          ▶
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 440, fontSize: 12, color: 'var(--text-dim)', marginBottom: 16 }}>
        <span>Frame 1</span>
        <span>Step {stepIndex + 1} of {totalSteps}</span>
        <span>{stepIndex >= totalSteps - 1 ? '✨ Target Found!' : 'Convergence'}</span>
      </div>

      {/* Frame narrative */}
      <div className="scrubber-frame-desc">
        {currentFrame.desc}
      </div>
    </div>
  );
}
