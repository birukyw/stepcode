import { useState, useEffect } from 'react';

/**
 * LoopControlJumperWidget:
 * Brilliant.org-style interactive visualizer of loop flow control (`break` vs `continue`).
 * 
 * Demonstrates:
 * - `continue` immediately aborting current iteration and jumping to next item
 * - `break` terminating the entire loop construct immediately
 * - Live variable accumulator tracking
 */
export default function LoopControlJumperWidget({ props = {}, isSubmitted, onValidationChange }) {
  const numbers = [10, -5, 20, -1, 99, 30];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [total, setTotal] = useState(0);
  const [log, setLog] = useState(['Loop initialized. Ready to step.']);
  const [isBroken, setIsBroken] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, [currentIdx, total, isBroken, isDone]);

  const handleStep = () => {
    if (isBroken || isDone || currentIdx >= numbers.length) return;

    const val = numbers[currentIdx];
    if (val < 0) {
      // continue
      setLog((prev) => [...prev, `Item ${val} < 0: 'continue' jumped over loop body!`]);
      if (currentIdx + 1 < numbers.length) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setIsDone(true);
      }
    } else if (val === 99) {
      // break
      setIsBroken(true);
      setLog((prev) => [...prev, `Item 99 detected: 'break' terminated loop immediately!`]);
    } else {
      // normal
      const newTotal = total + val;
      setTotal(newTotal);
      setLog((prev) => [...prev, `Processed ${val}: total is now ${newTotal}`]);
      if (currentIdx + 1 < numbers.length) {
        setCurrentIdx((prev) => prev + 1);
      } else {
        setIsDone(true);
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setTotal(0);
    setIsBroken(false);
    setIsDone(false);
    setLog(['Loop reset.']);
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
          <span style={{ fontSize: 18 }}>🛑</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Loop Flow: break vs continue
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={handleStep}
            disabled={isBroken || isDone}
            style={{ fontWeight: 700 }}
          >
            Step Loop ➔
          </button>
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={handleReset}
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Code Box */}
      <div style={{ width: '100%', maxWidth: 620, background: 'var(--bg-editor)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#f8fafc', lineHeight: 1.7, marginBottom: 20 }}>
        <span style={{ color: '#ec4899' }}>for</span> <span style={{ color: '#38bdf8' }}>x</span> <span style={{ color: '#ec4899' }}>in</span> numbers:<br />
        &nbsp;&nbsp;<span style={{ color: '#ec4899' }}>if</span> x &lt; <span style={{ color: '#f59e0b' }}>0</span>: <span style={{ color: '#f59e0b' }}>continue</span> <span style={{ color: '#94a3b8' }}># Skip negative</span><br />
        &nbsp;&nbsp;<span style={{ color: '#ec4899' }}>if</span> x == <span style={{ color: '#f59e0b' }}>99</span>: <span style={{ color: '#ef4444' }}>break</span> <span style={{ color: '#94a3b8' }}># Terminate</span><br />
        &nbsp;&nbsp;total += x
      </div>

      {/* Visual Array Track */}
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '24px 16px',
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          marginBottom: 20
        }}
      >
        {numbers.map((num, idx) => {
          const isCurrent = currentIdx === idx && !isDone;
          const isNegative = num < 0;
          const isBreaker = num === 99;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: isCurrent ? 'var(--primary)' : 'var(--text-dim)', marginBottom: 4 }}>
                {isCurrent ? '▼' : ''}
              </span>

              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 'var(--radius)',
                  border: isCurrent
                    ? (isBreaker ? '2px solid var(--danger)' : isNegative ? '2px solid #f59e0b' : '2px solid var(--primary)')
                    : '1px solid var(--border)',
                  background: isCurrent ? 'var(--bg-surface)' : 'var(--bg-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 15,
                  fontWeight: 800,
                  color: isBreaker ? 'var(--danger)' : isNegative ? '#b45309' : 'var(--text-primary)',
                  boxShadow: isCurrent ? '0 6px 16px rgba(0,0,0,0.1)' : 'none',
                  transform: isCurrent ? 'scale(1.08)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                {num}
              </div>

              <span style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 4 }}>
                {isBreaker ? 'break' : isNegative ? 'skip' : 'add'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Live Total Accumulator */}
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border)',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Accumulated Total:
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
            total = {total}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
            Loop Status:
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: isBroken ? 'var(--danger)' : isDone ? 'var(--primary)' : '#3b82f6' }}>
            {isBroken ? '🛑 BROKEN BY 99' : isDone ? '✓ LOOP COMPLETE' : 'IN PROGRESS'}
          </div>
        </div>
      </div>

      {/* Log Feed */}
      <div style={{ width: '100%', maxWidth: 620, maxHeight: 80, overflowY: 'auto', background: 'var(--bg-editor)', padding: '10px 14px', borderRadius: 'var(--radius-xs)', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#94a3b8' }}>
        {log.slice(-3).map((line, lIdx) => (
          <div key={lIdx}>&gt; {line}</div>
        ))}
      </div>
    </div>
  );
}
