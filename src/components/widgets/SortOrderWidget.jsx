import { useState, useEffect } from 'react';

/**
 * SortOrderWidget:
 * Allows learners to reorder a sequence of algorithmic steps or statements.
 * Features smooth reordering with up/down arrows and instant validation.
 */
export default function SortOrderWidget({ props = {}, isSubmitted, onValidationChange }) {
  const initialItems = props.items || [];
  const correctOrder = props.correctOrder || initialItems.map(item => item.id);

  const [items, setItems] = useState(initialItems);

  useEffect(() => {
    setItems(initialItems);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  }, [props]);

  const moveItem = (index, direction) => {
    if (isSubmitted) return;
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setItems(newItems);

    const currentIds = newItems.map(it => it.id);
    const isCorrect = currentIds.every((id, idx) => id === correctOrder[idx]);

    if (onValidationChange) {
      onValidationChange(isCorrect, true);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, margin: '0 auto 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {items.map((item, index) => {
        const isCorrectPosition = isSubmitted && item.id === correctOrder[index];
        const isWrongPosition = isSubmitted && item.id !== correctOrder[index];

        let borderCol = 'var(--border)';
        let bgCol = 'var(--bg-surface)';
        if (isSubmitted) {
          borderCol = isCorrectPosition ? 'var(--success)' : 'var(--danger)';
          bgCol = isCorrectPosition ? 'var(--success-subtle)' : 'var(--danger-subtle)';
        }

        return (
          <div
            key={item.id || index}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: 'var(--radius)',
              border: `2px solid ${borderCol}`,
              background: bgCol,
              transition: 'var(--transition)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 'var(--radius-full)',
                  background: isSubmitted
                    ? (isCorrectPosition ? 'var(--success)' : 'var(--danger)')
                    : 'var(--bg-subtle)',
                  color: isSubmitted ? '#fff' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  flexShrink: 0
                }}
              >
                {index + 1}
              </span>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {item.text}
              </span>
            </div>

            {!isSubmitted && (
              <div style={{ display: 'flex', gap: 4 }}>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  style={{ padding: '2px 8px', fontSize: 12 }}
                  title="Move Up"
                >
                  ▲
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  style={{ padding: '2px 8px', fontSize: 12 }}
                  title="Move Down"
                >
                  ▼
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
