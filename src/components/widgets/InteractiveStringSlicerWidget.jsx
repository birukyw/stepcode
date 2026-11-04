import { useState, useRef, useEffect } from 'react';

/**
 * InteractiveStringSlicerWidget:
 * Brilliant.org-grade mouse-moving and interactive string slicing visualizer.
 * 
 * Features:
 * - Real-time mouse blade that follows cursor along character cuts
 * - Excluded characters get crossed out with a visible slash and dimmed
 * - Included slice characters are highlighted, elevated, and glow
 * - Dual positive (+0, +1...) and negative (-6, -5...) coordinate indices
 * - Live dynamic Python slice formula `word[start:stop:step]`
 * - Quick-slice intuition presets (Prefix [:3], Suffix [-3:], Reverse [::-1], Every 2nd [::2])
 * - Challenge mode with target validation
 */
export default function InteractiveStringSlicerWidget({ props = {}, isSubmitted, onValidationChange }) {
  const word = props.word || 'Python';
  const targetSlice = props.targetSlice;
  const isChallenge = Boolean(targetSlice);

  const [start, setStart] = useState(props.initialStart !== undefined ? props.initialStart : 0);
  const [stop, setStop] = useState(props.initialStop !== undefined ? props.initialStop : 3);
  const [step, setStep] = useState(1);
  const [mouseBoundary, setMouseBoundary] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragAnchor, setDragAnchor] = useState(null);
  const trackRef = useRef(null);

  const chars = word.split('');
  const length = chars.length;

  // Compute the current slice output
  const computeSlice = (s, e, st) => {
    if (st === -1) {
      return word.slice().split('').reverse().join('');
    }
    const safeStart = Math.max(0, Math.min(s, length));
    const safeStop = Math.max(0, Math.min(e, length));
    if (safeStart >= safeStop) return '';

    let res = '';
    for (let i = safeStart; i < safeStop; i += st) {
      res += word[i];
    }
    return res;
  };

  const currentSlice = computeSlice(start, stop, step);
  const isTargetMatched = isChallenge && currentSlice === targetSlice;

  // Synchronize validation status with runner
  useEffect(() => {
    if (isChallenge && onValidationChange) {
      onValidationChange(isTargetMatched, true);
    } else if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, [currentSlice, isChallenge, isTargetMatched]);

  // Mouse boundary calculation based on track position
  const handleMouseMove = (e) => {
    if (isSubmitted || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const blockWidth = rect.width / length;
    const rawBoundary = Math.round(relativeX / blockWidth);
    const clampedBoundary = Math.max(0, Math.min(rawBoundary, length));
    setMouseBoundary(clampedBoundary);

    if (isDragging && dragAnchor !== null) {
      const s = Math.min(dragAnchor, clampedBoundary);
      const e = Math.max(dragAnchor, clampedBoundary);
      setStart(s);
      setStop(e);
      setStep(1);
    }
  };

  const handleMouseDownOnTrack = (e) => {
    if (isSubmitted || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const blockWidth = rect.width / length;
    const boundary = Math.max(0, Math.min(Math.round(relativeX / blockWidth), length));
    setIsDragging(true);
    setDragAnchor(boundary);
    setStart(boundary);
    setStop(Math.min(boundary + 1, length));
    setStep(1);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragAnchor(null);
  };

  const setPreset = (s, e, st = 1) => {
    setStart(s);
    setStop(e);
    setStep(st);
  };

  return (
    <div
      className="interactive-concept-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 20px',
        userSelect: 'none',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-lg)',
        border: isTargetMatched ? '2px solid var(--primary)' : '1px solid var(--border)',
        boxShadow: isTargetMatched ? '0 0 24px var(--primary-glow)' : 'var(--shadow-card)',
        transition: 'all 0.3s ease'
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        handleMouseUp();
        setMouseBoundary(null);
      }}
    >
      {/* Top Banner: Intuition Guidance */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 560, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔪</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {isChallenge ? 'Slice Challenge' : 'Visual String Slicer'}
          </span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)' }}>
          {isChallenge ? `Target: "${targetSlice}"` : 'Glide mouse across letters'}
        </div>
      </div>

      {/* Live Python Slice Expression Pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'var(--bg-editor)',
            color: '#38bdf8',
            padding: '10px 20px',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-mono)',
            fontSize: 18,
            fontWeight: 700,
            boxShadow: 'var(--shadow-md)',
            letterSpacing: '0.02em'
          }}
        >
          <span style={{ color: '#94a3b8' }}>word[</span>
          <span style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: 6 }}>
            {start}
          </span>
          <span style={{ color: '#94a3b8' }}>:</span>
          <span style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: 6 }}>
            {stop}
          </span>
          {step !== 1 && (
            <>
              <span style={{ color: '#94a3b8' }}>:</span>
              <span style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.15)', padding: '2px 8px', borderRadius: 6 }}>
                {step}
              </span>
            </>
          )}
          <span style={{ color: '#94a3b8' }}>]</span>
        </div>
      </div>

      {/* Quick Slice Presets */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn btn-sm"
          style={{
            fontSize: 12,
            padding: '5px 12px',
            background: start === 0 && stop === 3 && step === 1 ? 'var(--primary)' : 'var(--bg-subtle)',
            color: start === 0 && stop === 3 && step === 1 ? '#fff' : 'var(--text-secondary)',
            fontWeight: 600
          }}
          onClick={() => setPreset(0, Math.min(3, length), 1)}
        >
          [:3] Prefix
        </button>

        <button
          type="button"
          className="btn btn-sm"
          style={{
            fontSize: 12,
            padding: '5px 12px',
            background: start === 2 && stop === 5 && step === 1 ? 'var(--primary)' : 'var(--bg-subtle)',
            color: start === 2 && stop === 5 && step === 1 ? '#fff' : 'var(--text-secondary)',
            fontWeight: 600
          }}
          onClick={() => setPreset(2, Math.min(5, length), 1)}
        >
          [2:5] Substring
        </button>

        <button
          type="button"
          className="btn btn-sm"
          style={{
            fontSize: 12,
            padding: '5px 12px',
            background: start === Math.max(0, length - 3) && stop === length && step === 1 ? 'var(--primary)' : 'var(--bg-subtle)',
            color: start === Math.max(0, length - 3) && stop === length && step === 1 ? '#fff' : 'var(--text-secondary)',
            fontWeight: 600
          }}
          onClick={() => setPreset(Math.max(0, length - 3), length, 1)}
        >
          [-3:] Suffix
        </button>

        <button
          type="button"
          className="btn btn-sm"
          style={{
            fontSize: 12,
            padding: '5px 12px',
            background: step === -1 ? 'var(--primary)' : 'var(--bg-subtle)',
            color: step === -1 ? '#fff' : 'var(--text-secondary)',
            fontWeight: 600
          }}
          onClick={() => setPreset(0, length, -1)}
        >
          [::-1] Reverse ↺
        </button>
      </div>

      {/* ─── INTERACTIVE MOUSE TRACK & CHARACTER TILES ─────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 580,
          position: 'relative'
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', marginBottom: 12, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          Glide mouse or click & drag boundaries:
        </div>

        {/* Outer Track with Character Tiles */}
        <div
          ref={trackRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDownOnTrack}
          style={{
            display: 'flex',
            position: 'relative',
            padding: '16px 8px',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border)',
            cursor: 'col-resize',
            gap: 8,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
          }}
        >
          {chars.map((char, idx) => {
            const isInside = step === -1 ? true : idx >= start && idx < stop && (idx - start) % step === 0;
            const isCutOut = !isInside;
            const isStartEdge = idx === start && step !== -1;
            const isStopEdge = idx === stop && step !== -1;

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  width: 58
                }}
              >
                {/* Positive Index (+0, +1, +2...) */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: isInside ? 'var(--primary)' : 'var(--text-dim)',
                    marginBottom: 6,
                    fontFamily: 'var(--font-mono)',
                    transition: 'color 0.2s'
                  }}
                >
                  +{idx}
                </span>

                {/* Character Block */}
                <div
                  style={{
                    width: 58,
                    height: 64,
                    borderRadius: 'var(--radius)',
                    border: isInside ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: isInside ? 'var(--bg-surface)' : 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 800,
                    color: isInside ? 'var(--primary)' : 'var(--text-dim)',
                    opacity: isCutOut ? 0.38 : 1,
                    transform: isInside ? 'translateY(-4px) scale(1.04)' : 'none',
                    boxShadow: isInside ? '0 8px 18px var(--primary-glow)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {char}

                  {/* Brilliant-style Cross-out slash for excluded letters */}
                  {isCutOut && (
                    <svg
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none'
                      }}
                    >
                      <line
                        x1="12"
                        y1="52"
                        x2="46"
                        y2="12"
                        stroke="var(--danger)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        opacity="0.65"
                      />
                    </svg>
                  )}
                </div>

                {/* Negative Index (-6, -5, -4...) */}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: isInside ? 'var(--primary)' : 'var(--text-dim)',
                    marginTop: 6,
                    fontFamily: 'var(--font-mono)',
                    transition: 'color 0.2s'
                  }}
                >
                  -{length - idx}
                </span>
              </div>
            );
          })}

          {/* Mouse-Hover Slicing Laser Blade */}
          {mouseBoundary !== null && !isSubmitted && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${(mouseBoundary / length) * 100}%`,
                width: 3,
                background: '#38bdf8',
                boxShadow: '0 0 10px #38bdf8, 0 0 20px #38bdf8',
                borderRadius: 2,
                pointerEvents: 'none',
                transform: 'translateX(-50%)',
                zIndex: 10,
                transition: isDragging ? 'none' : 'left 0.08s ease-out'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#38bdf8',
                  color: '#0f172a',
                  fontSize: 10,
                  fontWeight: 800,
                  padding: '1px 5px',
                  borderRadius: 4,
                  whiteSpace: 'nowrap'
                }}
              >
                Cut | {mouseBoundary}
              </div>
            </div>
          )}
        </div>

        {/* Precision Boundary Adjusters */}
        <div style={{ display: 'flex', gap: 16, marginTop: 14, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-editor)', padding: '6px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', fontFamily: 'var(--font-mono)' }}>Start:</span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ padding: '2px 8px', fontSize: 13, minWidth: 26, height: 26, lineHeight: 1 }}
              onClick={() => { const ns = Math.max(0, start - 1); setStart(ns); setStep(1); if (ns >= stop) setStop(Math.min(length, ns + 1)); }}
              disabled={start <= 0 || isSubmitted}
              title="Decrease start index"
            >
              -
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: 22, textAlign: 'center', color: '#f59e0b', fontSize: 14 }}>{start}</span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ padding: '2px 8px', fontSize: 13, minWidth: 26, height: 26, lineHeight: 1 }}
              onClick={() => { const ns = Math.min(length - 1, start + 1); setStart(ns); setStep(1); if (ns >= stop) setStop(Math.min(length, ns + 1)); }}
              disabled={start >= length - 1 || isSubmitted}
              title="Increase start index"
            >
              +
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-editor)', padding: '6px 14px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', fontFamily: 'var(--font-mono)' }}>Stop:</span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ padding: '2px 8px', fontSize: 13, minWidth: 26, height: 26, lineHeight: 1 }}
              onClick={() => { const ne = Math.max(start + 1, stop - 1); setStop(ne); setStep(1); }}
              disabled={stop <= start + 1 || isSubmitted}
              title="Decrease stop index"
            >
              -
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, minWidth: 22, textAlign: 'center', color: '#10b981', fontSize: 14 }}>{stop}</span>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              style={{ padding: '2px 8px', fontSize: 13, minWidth: 26, height: 26, lineHeight: 1 }}
              onClick={() => { const ne = Math.min(length, stop + 1); setStop(ne); setStep(1); }}
              disabled={stop >= length || isSubmitted}
              title="Increase stop index"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Slice Output Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 540,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          padding: '18px 24px',
          marginTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: '1px solid var(--border)'
        }}
      >
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>
            Extracted Slice Substring:
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            "{currentSlice}"
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: 4 }}>
            Slice Window:
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
            len = {currentSlice.length}
          </div>
        </div>
      </div>

      {/* Intuition Callout */}
      <div
        style={{
          marginTop: 16,
          width: '100%',
          maxWidth: 540,
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
        <span style={{ fontSize: 16 }}>💡</span>
        <span>
          <strong>Half-open interval rule:</strong> Python includes index <code>{start}</code> (inclusive) but cuts off right before index <code>{stop}</code> (exclusive).
        </span>
      </div>

      {/* Target Challenge Feedback */}
      {isChallenge && (
        <div
          style={{
            marginTop: 14,
            padding: '8px 16px',
            borderRadius: 'var(--radius-sm)',
            fontSize: 14,
            fontWeight: 700,
            background: isTargetMatched ? 'rgba(27, 156, 90, 0.12)' : 'var(--bg-subtle)',
            color: isTargetMatched ? 'var(--primary)' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>{isTargetMatched ? '🎉' : '🎯'}</span>
          <span>
            {isTargetMatched
              ? `Spot on! You sliced out "${targetSlice}"!`
              : `Slice until the output equals "${targetSlice}".`}
          </span>
        </div>
      )}
    </div>
  );
}
