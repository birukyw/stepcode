import { useState, useEffect } from 'react';

/**
 * TypeCastingWidget:
 * Brilliant.org-style interactive visualizer of Python Type Coercion & Truthiness.
 * 
 * Demonstrates:
 * - Direct constructor conversions: int(), float(), str(), bool()
 * - Silent gotchas like int("3.14") raising ValueError
 * - Truthiness evaluation of empty sequences and None
 */
export default function TypeCastingWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [selectedValIdx, setSelectedValIdx] = useState(0);
  const [targetType, setTargetType] = useState('bool');

  const candidates = [
    { label: '"42"', raw: '42', isStr: true, val: "42" },
    { label: '"3.14"', raw: '3.14', isStr: true, val: "3.14" },
    { label: '0', raw: 0, isStr: false, val: 0 },
    { label: '""', raw: '', isStr: true, val: "" },
    { label: '"0"', raw: '0', isStr: true, val: "0" },
    { label: '[ ]', raw: [], isStr: false, val: [] },
    { label: '[ 0 ]', raw: [0], isStr: false, val: [0] },
    { label: 'None', raw: null, isStr: false, val: null },
    { label: '"hello"', raw: 'hello', isStr: true, val: "hello" }
  ];

  const current = candidates[selectedValIdx];

  // Perform safe conversion
  let result = '';
  let resultType = '';
  let isError = false;
  let errorMsg = '';

  try {
    if (targetType === 'bool') {
      if (current.val === null) result = 'False';
      else if (Array.isArray(current.val)) result = current.val.length > 0 ? 'True' : 'False';
      else if (current.val === 0 || current.val === '') result = 'False';
      else result = 'True';
      resultType = "<class 'bool'>";
    } else if (targetType === 'int') {
      if (current.label === '"3.14"') {
        isError = true;
        errorMsg = "ValueError: invalid literal for int() with base 10: '3.14'";
      } else if (current.label === '"hello"') {
        isError = true;
        errorMsg = "ValueError: invalid literal for int() with base 10: 'hello'";
      } else if (current.val === null || Array.isArray(current.val)) {
        isError = true;
        errorMsg = `TypeError: int() argument must be a string, bytes-like object or real number, not '${current.label}'`;
      } else {
        result = String(parseInt(current.val, 10));
        resultType = "<class 'int'>";
      }
    } else if (targetType === 'float') {
      if (current.label === '"hello"') {
        isError = true;
        errorMsg = "ValueError: could not convert string to float: 'hello'";
      } else if (current.val === null || Array.isArray(current.val)) {
        isError = true;
        errorMsg = `TypeError: float() argument must be a string or a real number, not '${current.label}'`;
      } else {
        result = Number(current.val).toFixed(1);
        resultType = "<class 'float'>";
      }
    } else {
      // str
      if (current.val === null) result = "'None'";
      else if (Array.isArray(current.val)) result = `'[${current.val.join(', ')}]'`;
      else result = `'${current.val}'`;
      resultType = "<class 'str'>";
    }
  } catch (err) {
    isError = true;
    errorMsg = err.message;
  }

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, [selectedValIdx, targetType]);

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
          <span style={{ fontSize: 18 }}>⚖️</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Type Coercion & Truthiness Matrix
          </span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-subtle)', padding: '3px 12px', borderRadius: 999 }}>
          Explore Casts
        </div>
      </div>

      {/* Target Constructor Selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' }}>
        {['bool', 'int', 'float', 'str'].map((t) => (
          <button
            key={t}
            type="button"
            className="btn btn-sm"
            onClick={() => setTargetType(t)}
            style={{
              padding: '6px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              fontWeight: 700,
              borderRadius: 'var(--radius-full)',
              background: targetType === t ? 'var(--primary)' : 'var(--bg-subtle)',
              color: targetType === t ? '#fff' : 'var(--text-secondary)',
              border: targetType === t ? '2px solid var(--primary)' : '1px solid var(--border)'
            }}
          >
            {t}()
          </button>
        ))}
      </div>

      {/* Value Selector Chips */}
      <div style={{ width: '100%', maxWidth: 620, marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Select input value:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {candidates.map((c, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedValIdx(idx)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: selectedValIdx === idx ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: selectedValIdx === idx ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                fontWeight: 700,
                color: selectedValIdx === idx ? 'var(--primary)' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Conversion Inspection Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '24px 20px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: '#38bdf8', background: 'var(--bg-editor)', padding: '6px 14px', borderRadius: 'var(--radius-sm)' }}>
            {targetType}({current.label})
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
            {resultType}
          </span>
        </div>

        {isError ? (
          <div
            style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: 'var(--danger)',
              fontSize: 13,
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5
            }}
          >
            <strong>💥 Exception Raised:</strong>
            <div style={{ marginTop: 4 }}>{errorMsg}</div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Evaluated Output:
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: result === 'True' ? 'var(--primary)' : result === 'False' ? '#e5a100' : 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {result}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Truthiness:
              </div>
              <div style={{ fontSize: 15, fontWeight: 800, color: (result === 'False' || result === '0' || result === "''") ? 'var(--danger)' : 'var(--primary)' }}>
                {(result === 'False' || result === '0' || result === "''") ? 'FALSY ✕' : 'TRUTHY ✓'}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pro-Tip Callout */}
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
          <strong>The "0" & [0] Trap:</strong> Notice that string <code>"0"</code> and list <code>[0]</code> are both <strong>TRUTHY</strong>! In Python, any non-empty string or list evaluates to <code>True</code>, regardless of what character or number is stored inside!
        </span>
      </div>
    </div>
  );
}
