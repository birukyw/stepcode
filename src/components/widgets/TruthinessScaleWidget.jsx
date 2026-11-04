import { useState, useEffect } from 'react';

/**
 * TruthinessScaleWidget:
 * Brilliant.org-style interactive visual balance scale demonstrating Python's Truthy vs Falsy evaluation.
 * 
 * Features:
 * - Interactive chips for all 6 Falsy categories + Truthy objects
 * - Famous traps highlight: `"0"`, `[0]`, `"False"`
 * - Dynamic tilt physics and explanation breakdowns
 */
export default function TruthinessScaleWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [selectedChip, setSelectedChip] = useState('0');

  const items = [
    { label: '0 (int)', isTruthy: false, category: 'Zero number', note: 'Zero numerical value is always Falsy.' },
    { label: '0.0 (float)', isTruthy: false, category: 'Zero float', note: 'Floating zero is Falsy.' },
    { label: '"" (empty str)', isTruthy: false, category: 'Empty sequence', note: 'len("") == 0, so it is Falsy.' },
    { label: '[] (empty list)', isTruthy: false, category: 'Empty sequence', note: 'Empty collections are Falsy.' },
    { label: '{} (empty dict)', isTruthy: false, category: 'Empty mapping', note: 'Dictionaries with 0 keys are Falsy.' },
    { label: 'None', isTruthy: false, category: 'Null object', note: 'None represents absence of a value; always Falsy.' },
    { label: 'False', isTruthy: false, category: 'Boolean literal', note: 'Native False boolean literal.' },
    // Tricky Gotchas
    { label: '"0" (str)', isTruthy: true, category: '⚡ TRICKY GOTCHA', note: 'The string contains 1 character (\'0\'), so len("0") == 1 -> TRUTHY!' },
    { label: '[0] (list)', isTruthy: true, category: '⚡ TRICKY GOTCHA', note: 'The list contains one element (even though it is 0), len([0]) == 1 -> TRUTHY!' },
    { label: '"False" (str)', isTruthy: true, category: '⚡ TRICKY GOTCHA', note: 'It\'s text with 5 letters, not a boolean -> TRUTHY!' },
    { label: '42 (int)', isTruthy: true, category: 'Non-zero number', note: 'Any non-zero integer is Truthy.' },
    { label: '"hello" (str)', isTruthy: true, category: 'Non-empty str', note: 'Non-empty string is Truthy.' }
  ];

  const current = items.find((i) => i.label === selectedChip) || items[0];

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, [selectedChip]);

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
            The Truthiness Balance Scale
          </span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-subtle)', padding: '3px 12px', borderRadius: 999 }}>
          Explore Truth Values
        </div>
      </div>

      {/* Chip Bank */}
      <div style={{ width: '100%', maxWidth: 620, marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Select value to place on scale:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSelectedChip(item.label)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                border: selectedChip === item.label ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: selectedChip === item.label ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 700,
                color: selectedChip === item.label ? 'var(--primary)' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Balance Scale */}
      <div
        style={{
          width: '100%',
          maxWidth: 620,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '24px 20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        {/* Falsy Pan */}
        <div
          style={{
            padding: '20px',
            borderRadius: 'var(--radius)',
            border: !current.isTruthy ? '2px solid var(--danger)' : '1px solid var(--border)',
            background: !current.isTruthy ? 'rgba(239, 68, 68, 0.08)' : 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: !current.isTruthy ? 'translateY(8px)' : 'translateY(-4px)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--danger)', textTransform: 'uppercase', marginBottom: 8 }}>
            ✕ FALSY (bool == False)
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 12 }}>
            6 Categories: False, None, 0, "", [], &#123;&#125;
          </div>
          {!current.isTruthy && (
            <div style={{ padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--danger)', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 15 }}>
              {current.label}
            </div>
          )}
        </div>

        {/* Truthy Pan */}
        <div
          style={{
            padding: '20px',
            borderRadius: 'var(--radius)',
            border: current.isTruthy ? '2px solid var(--primary)' : '1px solid var(--border)',
            background: current.isTruthy ? 'rgba(27, 156, 90, 0.08)' : 'var(--bg-surface)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            transform: current.isTruthy ? 'translateY(8px)' : 'translateY(-4px)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: 8 }}>
            ✓ TRUTHY (bool == True)
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-dim)', marginBottom: 12 }}>
            Everything else in Python!
          </div>
          {current.isTruthy && (
            <div style={{ padding: '6px 14px', borderRadius: 'var(--radius-sm)', background: 'var(--primary)', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 15 }}>
              {current.label}
            </div>
          )}
        </div>
      </div>

      {/* Detailed Gotcha & Explanation Box */}
      <div
        style={{
          marginTop: 18,
          width: '100%',
          maxWidth: 620,
          padding: '16px 20px',
          borderRadius: 'var(--radius-sm)',
          background: current.category.includes('TRICKY') ? 'rgba(245, 158, 11, 0.12)' : 'var(--primary-subtle)',
          border: `1px solid ${current.category.includes('TRICKY') ? '#f59e0b' : 'var(--primary)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}
      >
        <span style={{ fontSize: 22 }}>{current.category.includes('TRICKY') ? '⚠️' : '💡'}</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: current.category.includes('TRICKY') ? '#b45309' : 'var(--primary)', textTransform: 'uppercase' }}>
            {current.category}:
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginTop: 2 }}>
            {current.note}
          </div>
        </div>
      </div>
    </div>
  );
}
