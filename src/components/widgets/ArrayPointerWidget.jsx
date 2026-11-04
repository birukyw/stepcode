import { useState, useEffect } from 'react';

/**
 * ArrayPointerWidget:
 * Interactive array component where the learner inspects elements and taps a target cell.
 */
export default function ArrayPointerWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const initialArray = props.initialArray || [];
  const targetIndex = props.targetIndex;
  const targetValue = props.targetValue;
  const targetLabel = props.targetLabel || 'Target';

  const handleCellClick = (idx) => {
    if (isSubmitted) return;
    setSelectedIndex(idx);
    const isCorrect = idx === targetIndex;
    if (onValidationChange) {
      onValidationChange(isCorrect, true);
    }
  };

  useEffect(() => {
    setSelectedIndex(null);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  }, [props]);

  return (
    <div className="widget-array-container">
      <div className="array-cells-row">
        {initialArray.map((val, idx) => {
          const isSelected = selectedIndex === idx;
          const isTarget = idx === targetIndex;
          let cellClass = 'array-cell';

          if (isSelected) {
            cellClass += ' array-cell--active';
          }

          if (isSubmitted) {
            if (isSelected && isTarget) {
              cellClass += ' array-cell--correct';
            } else if (isSelected && !isTarget) {
              cellClass += ' array-cell--wrong';
            } else if (!isSelected && isTarget) {
              cellClass += ' array-cell--revealed-target';
            }
          }

          return (
            <div
              key={idx}
              className={cellClass}
              onClick={() => handleCellClick(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Index ${idx}, value ${val}`}
            >
              <span className="array-cell__val">{val}</span>
              <span className="array-cell__idx">[{idx}]</span>
            </div>
          );
        })}
      </div>

      <div className="array-pointers-row">
        {targetValue !== undefined && (
          <div className="pointer-pill pointer-pill--low">
            {targetLabel}: <strong>{targetValue}</strong>
          </div>
        )}
        {selectedIndex !== null && (
          <div className="pointer-pill pointer-pill--mid">
            Inspecting Index: <strong>{selectedIndex}</strong> (Value: {initialArray[selectedIndex]})
          </div>
        )}
      </div>
    </div>
  );
}
