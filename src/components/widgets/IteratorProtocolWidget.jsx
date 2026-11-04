import { useState, useEffect } from 'react';

/**
 * IteratorProtocolWidget:
 * Brilliant.org-style interactive visualizer of Python's Iterable & Iterator Protocol (`iter()` and `next()`).
 * 
 * Demonstrates:
 * - How Python's `for` loop actually works under the hood
 * - Internal pointer advancing across elements
 * - Raising and catching `StopIteration`
 */
export default function IteratorProtocolWidget({ props = {}, isSubmitted, onValidationChange }) {
  const items = props.items || ['Python', 'Django', 'FastAPI', 'PyTorch'];
  const [pointer, setPointer] = useState(0);
  const [isTerminated, setIsTerminated] = useState(false);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, [pointer, isTerminated]);

  const handleNext = () => {
    if (pointer < items.length - 1) {
      setPointer((prev) => prev + 1);
    } else {
      setIsTerminated(true);
    }
  };

  const handleReset = () => {
    setPointer(0);
    setIsTerminated(false);
  };

  return (
    <div
      className="interactive-concept-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 24px',
        userSelect: 'none',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)'
      }}
    >
      {/* Top Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 620, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔄</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            The Iterator Protocol (`iter` & `next`)
          </span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-subtle)', padding: '3px 12px', borderRadius: 999 }}>
          How For-Loops Run
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleNext}
          disabled={isTerminated}
          style={{ minWidth: 150, fontWeight: 700 }}
        >
          {isTerminated ? 'Iter Exhausted' : 'next(iterator) ➔'}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleReset}
          style={{ fontWeight: 600 }}
        >
          ↺ Reset Iterator
        </button>
      </div>

      {/* Visual Sequence Track */}
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '28px 20px',
          display: 'flex',
          justifyContent: 'center',
          gap: 12,
          position: 'relative',
          overflowX: 'auto'
        }}
      >
        {items.map((item, idx) => {
          const isCurrent = !isTerminated && pointer === idx;
          const isPassed = !isTerminated ? idx < pointer : true;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {/* Pointer indicator */}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: isCurrent ? 'var(--primary)' : 'transparent',
                  marginBottom: 6,
                  fontFamily: 'var(--font-mono)',
                  height: 18
                }}
              >
                {isCurrent ? '▼ it' : ''}
              </div>

              {/* Item Card */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius)',
                  border: isCurrent ? '2px solid var(--primary)' : '1px solid var(--border)',
                  background: isCurrent ? 'var(--bg-surface)' : isPassed ? 'rgba(27, 156, 90, 0.08)' : 'var(--bg-surface)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 15,
                  fontWeight: 800,
                  color: isCurrent ? 'var(--primary)' : isPassed ? 'var(--text-dim)' : 'var(--text-primary)',
                  boxShadow: isCurrent ? '0 8px 20px var(--primary-glow)' : 'none',
                  transform: isCurrent ? 'scale(1.06)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                "{item}"
              </div>

              {/* Index */}
              <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 6, fontFamily: 'var(--font-mono)' }}>
                idx {idx}
              </div>
            </div>
          );
        })}
      </div>

      {/* Execution Frame Status */}
      <div
        style={{
          marginTop: 20,
          width: '100%',
          maxWidth: 620,
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          background: isTerminated ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-subtle)',
          border: `1px solid ${isTerminated ? '#f59e0b' : 'var(--border)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Current Loop State:
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>
            {isTerminated ? (
              <span style={{ color: '#b45309' }}>
                💥 <strong>StopIteration Raised!</strong> The Python <code>for</code> loop catches this exception silently and exits cleanly.
              </span>
            ) : (
              <span>
                <code>item = "{items[pointer]}"</code> (iteration {pointer + 1} of {items.length})
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Intuition */}
      <div
        style={{
          marginTop: 18,
          width: '100%',
          maxWidth: 620,
          fontSize: 13,
          color: 'var(--text-secondary)',
          background: 'var(--primary-subtle)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <span style={{ fontSize: 18 }}>💡</span>
        <span>
          <strong>Why this matters:</strong> Python loops don't manage index numbers like <code>for (i=0; i&lt;len; i++)</code>. They ask the sequence for an iterator, and repeatedly call <code>next()</code> until <code>StopIteration</code> is signaled!
        </span>
      </div>
    </div>
  );
}
