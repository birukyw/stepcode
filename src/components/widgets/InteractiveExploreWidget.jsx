import { useState, useEffect } from 'react';

/**
 * InteractiveExploreWidget:
 * Universal Brilliant-style visual teaching and intuition exploration widget.
 * Used for "Teach First" steps before testing learners with questions.
 * 
 * Features:
 * - Interactive mental model cards
 * - Visual insight tabs & interactive comparisons
 * - Zero test pressure (always valid, enables Continue immediately)
 */
export default function InteractiveExploreWidget({ props = {}, onValidationChange }) {
  const [selectedInsight, setSelectedInsight] = useState(0);

  const insights = props.insights || [
    {
      title: 'The Core Mental Model',
      icon: '🧠',
      tag: 'Intuition',
      summary: props.concept || 'In software engineering, understanding how data flows and structures are stored in memory transforms code from abstract magic into clear, predictable mechanics.'
    },
    {
      title: 'Common Trap to Avoid',
      icon: '⚠️',
      tag: 'Caution',
      summary: props.trap || 'Beginners often assume the machine executes what they intend rather than the explicit sequential steps defined by syntax and runtime rules.'
    },
    {
      title: 'Why This Matters in Practice',
      icon: '🚀',
      tag: 'Architecture',
      summary: props.takeaway || 'Writing maintainable code requires choosing representations that are readable by humans and optimal for the machine runtime.'
    }
  ];

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, []);

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 600, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Concept Intuition (Explore & Learn)
          </span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)', background: 'var(--primary-subtle)', padding: '3px 12px', borderRadius: 999 }}>
          Teaching Step
        </div>
      </div>

      {/* Interactive Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, width: '100%', maxWidth: 600 }}>
        {insights.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className="btn btn-sm"
            onClick={() => setSelectedInsight(idx)}
            style={{
              flex: 1,
              fontSize: 12,
              padding: '10px 12px',
              borderRadius: 'var(--radius)',
              background: selectedInsight === idx ? 'var(--primary)' : 'var(--bg-subtle)',
              color: selectedInsight === idx ? '#fff' : 'var(--text-secondary)',
              border: selectedInsight === idx ? '2px solid var(--primary)' : '1px solid var(--border)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}
          >
            <span>{item.icon}</span>
            <span>{item.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Selected Insight Detail Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '24px 22px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{insights[selectedInsight].icon}</span>
            <span>{insights[selectedInsight].title}</span>
          </h3>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
              padding: '3px 10px',
              borderRadius: 999,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            {insights[selectedInsight].tag}
          </span>
        </div>

        <p style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.6 }}>
          {insights[selectedInsight].summary}
        </p>
      </div>

      {/* Bottom Exploration Prompt */}
      <div
        style={{
          marginTop: 20,
          width: '100%',
          maxWidth: 600,
          fontSize: 13,
          color: 'var(--text-secondary)',
          background: 'var(--primary-subtle)',
          padding: '10px 16px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <span style={{ fontSize: 16 }}>✨</span>
        <span>
          Take a moment to absorb this mental model. Click <strong>Continue →</strong> when you're ready to test your intuition with interactive challenges!
        </span>
      </div>
    </div>
  );
}
