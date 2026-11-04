import { useState, useEffect } from 'react';

/**
 * AlgorithmScrubberWidget:
 * Step-by-step interactive timeline scrubber that lets learners scrub through
 * an algorithm's execution frame by frame.
 */
export default function AlgorithmScrubberWidget({ props = {}, onValidationChange }) {
  const [stepIndex, setStepIndex] = useState(0);

  const initialArray = props.initialArray || [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
  const frames = props.frames || [];
  const totalSteps = props.totalSteps || frames.length || 1;

  const currentFrame = frames[stepIndex] || {
    low: 0,
    mid: 4,
    high: initialArray.length - 1,
    eliminated: [],
    desc: 'Initial check'
  };

  const handleSliderChange = (e) => {
    const newIdx = parseInt(e.target.value, 10);
    setStepIndex(newIdx);
    const reachedEnd = newIdx >= totalSteps - 1;
    if (onValidationChange) {
      onValidationChange(reachedEnd, true);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 0) {
      const newIdx = stepIndex - 1;
      setStepIndex(newIdx);
      if (onValidationChange) {
        onValidationChange(newIdx >= totalSteps - 1, true);
      }
    }
  };

  const handleNext = () => {
    if (stepIndex < totalSteps - 1) {
      const newIdx = stepIndex + 1;
      setStepIndex(newIdx);
      if (onValidationChange) {
        onValidationChange(newIdx >= totalSteps - 1, true);
      }
    }
  };

  useEffect(() => {
    setStepIndex(0);
    if (onValidationChange) {
      onValidationChange(totalSteps <= 1, totalSteps <= 1);
    }
  }, [props, totalSteps]);

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
