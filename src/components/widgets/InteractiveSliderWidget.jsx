import { useState, useEffect } from 'react';

/**
 * InteractiveSliderWidget:
 * Interactive parameter explorer (e.g. Big-O curves, array sizes, dynamic loop steps).
 * As learners drag the slider, dynamic visualization bars and calculated operations update in real time.
 */
export default function InteractiveSliderWidget({ props = {}, onValidationChange }) {
  const min = props.min || 1;
  const max = props.max || 100;
  const step = props.step || 1;
  const initial = props.initial || Math.round((min + max) / 2);
  const targetMin = props.targetMin;
  const targetMax = props.targetMax;
  const unit = props.unit || 'Items (N)';
  const label = props.label || 'Input Size N';

  const [value, setValue] = useState(initial);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setValue(val);
    setHasInteracted(true);

    let isTargetHit = true;
    if (targetMin !== undefined && val < targetMin) isTargetHit = false;
    if (targetMax !== undefined && val > targetMax) isTargetHit = false;

    if (onValidationChange) {
      onValidationChange(isTargetHit, true);
    }
  };

  useEffect(() => {
    setValue(initial);
    setHasInteracted(false);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  }, [props]);

  // Complexity calculations
  const n = value;
  const o1 = 1;
  const oLogN = Math.max(1, Math.round(Math.log2(n || 1)));
  const oN = n;
  const oN2 = Math.min(10000, n * n);

  return (
    <div className="interactive-concept-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 520, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
            {label}: <strong style={{ color: 'var(--primary)', fontSize: 18 }}>{value}</strong> {unit}
          </span>
          {targetMin !== undefined && targetMax !== undefined && (
            <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>
              Target range: {targetMin} – {targetMax}
            </span>
          )}
        </div>

        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="scrubber-slider"
          style={{ width: '100%' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-dim)' }}>
          <span>{min}</span>
          <span>Drag to observe scaling</span>
          <span>{max}</span>
        </div>
      </div>

      {/* Visual comparison bars */}
      <div style={{ width: '100%', maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 12, background: 'var(--bg-subtle)', padding: 18, borderRadius: 'var(--radius)' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
          Operations Required for N = {value}:
        </div>

        {/* O(1) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            <span style={{ color: '#10b981' }}>O(1) Hash/Index Lookup</span>
            <span>{o1} op</span>
          </div>
          <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '3%', background: '#10b981' }} />
          </div>
        </div>

        {/* O(log N) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            <span style={{ color: '#2563eb' }}>O(log N) Binary Search</span>
            <span>~{oLogN} ops</span>
          </div>
          <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, (oLogN / 30) * 100)}%`, background: '#2563eb', transition: 'width 0.2s' }} />
          </div>
        </div>

        {/* O(N) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            <span style={{ color: '#f59e0b' }}>O(N) Linear Scan</span>
            <span>{oN} ops</span>
          </div>
          <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, (oN / max) * 100)}%`, background: '#f59e0b', transition: 'width 0.2s' }} />
          </div>
        </div>

        {/* O(N^2) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            <span style={{ color: '#ef4444' }}>O(N²) Nested Brute Force</span>
            <span>{oN2.toLocaleString()} ops</span>
          </div>
          <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.min(100, (oN2 / (max * max)) * 100)}%`, background: '#ef4444', transition: 'width 0.2s' }} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
        {hasInteracted
          ? `Notice: While O(N²) explodes exponentially, O(log N) stays virtually flat!`
          : `Drag the slider above to explore how runtime operations scale.`}
      </div>
    </div>
  );
}
