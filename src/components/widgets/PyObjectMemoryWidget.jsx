import { useState, useEffect } from 'react';

/**
 * PyObjectMemoryWidget:
 * Brilliant.org-style interactive visualizer of Python's Memory Model & Nametag Binding.
 * 
 * Features:
 * - Interactive Nametags (variable names) vs Heap Objects (PyObject)
 * - Dynamic SVG rope/pointer redirection
 * - Reference Counting indicators (refcount: 1, 2)
 * - Mutation vs Reassignment demonstrations
 * - CPython Small Integer Singleton Caching Slider (-5 to 256)
 */
export default function PyObjectMemoryWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [activePreset, setActivePreset] = useState('bind_both'); // 'bind_both' | 'reassign_x' | 'mutate_list'
  const [cacheValue, setCacheValue] = useState(100);
  const [hoveredTag, setHoveredTag] = useState(null);

  const isChallenge = Boolean(props.target);

  useEffect(() => {
    if (onValidationChange) {
      if (isChallenge) {
        onValidationChange(activePreset === props.target, true);
      } else {
        onValidationChange(true, true);
      }
    }
  }, [activePreset, isChallenge, props.target]);

  // Determine state based on preset
  let nametags = [];
  let heapObjects = [];

  if (activePreset === 'bind_both') {
    // x = 42; y = x
    nametags = [
      { id: 'tag-x', name: 'x', pointsTo: 'obj-42', color: '#3b82f6' },
      { id: 'tag-y', name: 'y', pointsTo: 'obj-42', color: '#10b981' }
    ];
    heapObjects = [
      {
        id: 'obj-42',
        type: 'PyLongObject',
        value: '42',
        address: '0x103a8f40',
        refcount: 2,
        isCached: true,
        note: 'Both x and y point to the SAME integer in memory!'
      }
    ];
  } else if (activePreset === 'reassign_x') {
    // x = 42; y = x; x = x + 1
    nametags = [
      { id: 'tag-x', name: 'x', pointsTo: 'obj-43', color: '#3b82f6' },
      { id: 'tag-y', name: 'y', pointsTo: 'obj-42', color: '#10b981' }
    ];
    heapObjects = [
      {
        id: 'obj-42',
        type: 'PyLongObject',
        value: '42',
        address: '0x103a8f40',
        refcount: 1,
        isCached: true,
        note: 'y still holds reference to original 42'
      },
      {
        id: 'obj-43',
        type: 'PyLongObject',
        value: '43',
        address: '0x103a8f60',
        refcount: 1,
        isCached: true,
        note: 'Integers are immutable: x rebounded to new object!'
      }
    ];
  } else {
    // a = [1, 2]; b = a; b.append(3)
    nametags = [
      { id: 'tag-a', name: 'a', pointsTo: 'obj-list', color: '#8b5cf6' },
      { id: 'tag-b', name: 'b', pointsTo: 'obj-list', color: '#ec4899' }
    ];
    heapObjects = [
      {
        id: 'obj-list',
        type: 'PyListObject',
        value: '[1, 2, 3]',
        address: '0x7ffd19b2',
        refcount: 2,
        isCached: false,
        note: 'Lists are mutable: mutating via b modified the exact object a points to!'
      }
    ];
  }

  // Small integer cache check
  const isWithinSmallIntCache = cacheValue >= -5 && cacheValue <= 256;

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 580, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🏷️</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Python Object & Memory Model
          </span>
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-subtle)', padding: '3px 10px', borderRadius: 999 }}>
          Variables are Nametags, Not Boxes
        </div>
      </div>

      {/* Preset Action Buttons */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          className="btn btn-sm"
          style={{
            fontSize: 12,
            padding: '6px 14px',
            background: activePreset === 'bind_both' ? 'var(--primary)' : 'var(--bg-subtle)',
            color: activePreset === 'bind_both' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700
          }}
          onClick={() => setActivePreset('bind_both')}
        >
          1. x = 42; y = x
        </button>

        <button
          type="button"
          className="btn btn-sm"
          style={{
            fontSize: 12,
            padding: '6px 14px',
            background: activePreset === 'reassign_x' ? 'var(--primary)' : 'var(--bg-subtle)',
            color: activePreset === 'reassign_x' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700
          }}
          onClick={() => setActivePreset('reassign_x')}
        >
          2. x = x + 1 (Rebind)
        </button>

        <button
          type="button"
          className="btn btn-sm"
          style={{
            fontSize: 12,
            padding: '6px 14px',
            background: activePreset === 'mutate_list' ? 'var(--primary)' : 'var(--bg-subtle)',
            color: activePreset === 'mutate_list' ? '#fff' : 'var(--text-secondary)',
            fontWeight: 700
          }}
          onClick={() => setActivePreset('mutate_list')}
        >
          3. List In-Place Mutation
        </button>
      </div>

      {/* Visual Memory Canvas: Namespace on Left, Heap on Right */}
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '24px 20px',
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gap: 24,
          position: 'relative',
          minHeight: 220
        }}
      >
        {/* Left Column: Scope Nametags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Local Scope
          </div>

          {nametags.map((tag) => (
            <div
              key={tag.id}
              onMouseEnter={() => setHoveredTag(tag.pointsTo)}
              onMouseLeave={() => setHoveredTag(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-surface)',
                border: `2px solid ${tag.color}`,
                boxShadow: 'var(--shadow-sm)',
                fontFamily: 'var(--font-mono)',
                fontSize: 15,
                fontWeight: 800,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <span>{tag.name}</span>
              <span style={{ fontSize: 11, color: tag.color, fontWeight: 700 }}>➔ ptr</span>
            </div>
          ))}
        </div>

        {/* Right Column: CPython Heap PyObjects */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CPython Heap (RAM Objects)
          </div>

          {heapObjects.map((obj) => {
            const isHighlighted = hoveredTag === obj.id;
            return (
              <div
                key={obj.id}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  border: isHighlighted ? '2px solid var(--primary)' : '1px solid var(--border)',
                  padding: '14px 18px',
                  boxShadow: isHighlighted ? '0 0 16px var(--primary-glow)' : 'var(--shadow-sm)',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                    {obj.type} @ {obj.address}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: '#2563eb',
                      padding: '2px 8px',
                      borderRadius: 999
                    }}
                  >
                    refcount: {obj.refcount}
                  </span>
                </div>

                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: 6 }}>
                  {obj.value}
                </div>

                <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {obj.note}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive CPython Small Integer Singleton Explorer */}
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '20px 24px',
          marginTop: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            CPython Small Integer Cache Explorer:
          </div>
          <div style={{ fontSize: 15, fontWeight: 800, color: isWithinSmallIntCache ? 'var(--primary)' : '#e5a100', fontFamily: 'var(--font-mono)' }}>
            n = {cacheValue}
          </div>
        </div>

        <input
          type="range"
          min={-15}
          max={300}
          value={cacheValue}
          onChange={(e) => setCacheValue(Number(e.target.value))}
          style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)', marginBottom: 12 }}
        />

        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: '8px 14px',
            borderRadius: 'var(--radius-sm)',
            background: isWithinSmallIntCache ? 'rgba(27, 156, 90, 0.1)' : 'rgba(229, 161, 0, 0.1)',
            color: isWithinSmallIntCache ? 'var(--primary)' : '#b45309',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <span>{isWithinSmallIntCache ? '⚡' : '📦'}</span>
          <span>
            {isWithinSmallIntCache
              ? `Cache Hit [-5 to 256]: a = ${cacheValue}; b = ${cacheValue} share identical address! (a is b is True)`
              : `Cache Miss (outside [-5, 256]): Python dynamically allocates a brand new PyObject heap address!`}
          </span>
        </div>
      </div>
    </div>
  );
}
