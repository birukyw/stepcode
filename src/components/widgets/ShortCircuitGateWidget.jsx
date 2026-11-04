import { useState, useEffect } from 'react';

/**
 * ShortCircuitGateWidget:
 * Brilliant.org-style interactive circuit visualizer for Python's short-circuit evaluation.
 * 
 * Demonstrates:
 * - Current flow through `A and B` vs `A or B`
 * - Immediate termination when outcome is mathematically guaranteed
 * - The Defensive Guard pattern preventing `AttributeError` on None references
 */
export default function ShortCircuitGateWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [operator, setOperator] = useState('and'); // 'and' | 'or'
  const [valA, setValA] = useState(false);
  const [valB, setValB] = useState(true);
  const [guardMode, setGuardMode] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, [operator, valA, valB, guardMode, userExists]);

  // Standard logic
  const isShortCircuited = operator === 'and' ? !valA : valA;
  const evaluatedB = !isShortCircuited;
  const overallResult = operator === 'and' ? valA && valB : valA || valB;

  // Guard mode logic: user is not None and user.is_active
  const guardShortCircuited = !userExists;
  const guardResult = userExists ? true : false;

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
          <span style={{ fontSize: 18 }}>⚡</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Short-Circuit Logic Circuit
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setGuardMode(false)}
            style={{
              fontSize: 12,
              padding: '4px 12px',
              background: !guardMode ? 'var(--primary)' : 'var(--bg-subtle)',
              color: !guardMode ? '#fff' : 'var(--text-secondary)'
            }}
          >
            Boolean Gates
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setGuardMode(true)}
            style={{
              fontSize: 12,
              padding: '4px 12px',
              background: guardMode ? 'var(--primary)' : 'var(--bg-subtle)',
              color: guardMode ? '#fff' : 'var(--text-secondary)'
            }}
          >
            🛡️ Guard Pattern
          </button>
        </div>
      </div>

      {!guardMode ? (
        <>
          {/* Operator Selector */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
            {['and', 'or'].map((op) => (
              <button
                key={op}
                type="button"
                className="btn btn-sm"
                onClick={() => setOperator(op)}
                style={{
                  padding: '6px 20px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 14,
                  fontWeight: 800,
                  borderRadius: 'var(--radius-full)',
                  background: operator === op ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: operator === op ? '#fff' : 'var(--text-secondary)',
                  border: operator === op ? '2px solid var(--primary)' : '1px solid var(--border)'
                }}
              >
                {op.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Interactive Circuit Canvas */}
          <div
            style={{
              width: '100%',
              maxWidth: 620,
              background: 'var(--bg-subtle)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              position: 'relative'
            }}
          >
            {/* Expression Pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800 }}>
              <span style={{ color: valA ? '#10b981' : '#ef4444', background: 'var(--bg-surface)', padding: '6px 14px', borderRadius: 'var(--radius-sm)', border: `2px solid ${valA ? '#10b981' : '#ef4444'}` }}>
                A: {String(valA)}
              </span>
              <span style={{ color: 'var(--text-dim)' }}>{operator}</span>
              <span
                style={{
                  color: evaluatedB ? (valB ? '#10b981' : '#ef4444') : '#94a3b8',
                  background: 'var(--bg-surface)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: `2px ${evaluatedB ? 'solid' : 'dashed'} ${evaluatedB ? (valB ? '#10b981' : '#ef4444') : '#cbd5e1'}`,
                  opacity: evaluatedB ? 1 : 0.4
                }}
              >
                B: {String(valB)}
              </span>
            </div>

            {/* Toggle Switches */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setValA((prev) => !prev)}
                style={{ minWidth: 140, fontWeight: 700 }}
              >
                Toggle A ({String(valA)})
              </button>

              <button
                type="button"
                className="btn btn-sm"
                onClick={() => setValB((prev) => !prev)}
                disabled={isShortCircuited}
                style={{ minWidth: 140, fontWeight: 700, opacity: isShortCircuited ? 0.4 : 1 }}
              >
                Toggle B ({String(valB)})
              </button>
            </div>

            {/* Circuit Flow Animation & Status */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-sm)',
                background: isShortCircuited ? 'rgba(245, 158, 11, 0.12)' : 'rgba(27, 156, 90, 0.1)',
                border: `1px solid ${isShortCircuited ? '#f59e0b' : 'var(--primary)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: isShortCircuited ? '#b45309' : 'var(--primary)', textTransform: 'uppercase' }}>
                  {isShortCircuited ? '⚡ Short-Circuit Triggered' : '🔋 Full Circuit Evaluated'}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
                  {isShortCircuited
                    ? operator === 'and'
                      ? 'A is False: Python terminates early and NEVER inspects B!'
                      : 'A is True: Python terminates early because True or ... is always True!'
                    : `Python inspected both A and B to evaluate final outcome.`}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Result:
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: overallResult ? 'var(--primary)' : 'var(--danger)', fontFamily: 'var(--font-mono)' }}>
                  {String(overallResult)}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Guard Pattern Mode */
        <div
          style={{
            width: '100%',
            maxWidth: 620,
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 18
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, background: 'var(--bg-editor)', color: '#f8fafc', padding: '14px 18px', borderRadius: 'var(--radius-sm)', lineHeight: 1.6 }}>
            <span style={{ color: '#94a3b8' }}># Safe attribute check without crashing:</span><br />
            <span style={{ color: '#ec4899' }}>if</span> <span style={{ color: '#38bdf8' }}>user</span> <span style={{ color: '#ec4899' }}>is not</span> <span style={{ color: '#f59e0b' }}>None</span> <span style={{ color: '#ec4899' }}>and</span> <span style={{ color: '#38bdf8' }}>user.is_active</span>:<br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#10b981' }}>grant_access()</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>
              Simulate Variable: <code>user = {userExists ? "User(is_active=True)" : "None"}</code>
            </span>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => setUserExists((prev) => !prev)}
            >
              Switch to {userExists ? "None" : "Valid User"}
            </button>
          </div>

          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-sm)',
              background: guardShortCircuited ? 'rgba(27, 156, 90, 0.1)' : 'rgba(59, 130, 246, 0.1)',
              border: `1px solid ${guardShortCircuited ? 'var(--primary)' : '#3b82f6'}`,
              fontSize: 13,
              lineHeight: 1.5,
              color: 'var(--text-primary)'
            }}
          >
            {guardShortCircuited ? (
              <span>
                🛡️ <strong>Shield Active:</strong> Because <code>user is not None</code> evaluated to <code>False</code>, Python immediately terminated the <code>and</code> expression. It <strong>never executed</strong> <code>user.is_active</code>, saving your application from a disastrous <code>AttributeError</code>!
              </span>
            ) : (
              <span>
                ✓ <code>user</code> exists! Python safely proceeded to verify <code>user.is_active</code> and granted access.
              </span>
            )}
          </div>
        </div>
      )}

      {/* Bottom Pro-tip */}
      <div
        style={{
          marginTop: 18,
          width: '100%',
          maxWidth: 620,
          fontSize: 13,
          color: 'var(--text-secondary)',
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <span style={{ fontSize: 18 }}>💡</span>
        <span>
          <strong>Python's Return Value:</strong> In Python, <code>and</code> and <code>or</code> don’t just return booleans—they return the <strong>exact operand</strong> that decided the outcome (e.g. <code>"" or "default"</code> evaluates to <code>"default"</code>!).
        </span>
      </div>
    </div>
  );
}
