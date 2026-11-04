import { useState, useEffect } from 'react';

/**
 * CodeFillWidget:
 * Allows the learner to drag or tap code chips into a slot in the syntax block.
 */
export default function CodeFillWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [selectedChip, setSelectedChip] = useState(null);

  const template = props.template || 'if target > arr[mid]:\n    low = {slot1}';
  const chips = props.chips || [];
  const correctAnswer = props.correctAnswer;

  const handleChipClick = (chip) => {
    if (isSubmitted) return;
    setSelectedChip(chip);
    const isCorrect = chip === correctAnswer;
    if (onValidationChange) {
      onValidationChange(isCorrect, true);
    }
  };

  const handleSlotClick = () => {
    if (isSubmitted) return;
    setSelectedChip(null);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  };

  useEffect(() => {
    setSelectedChip(null);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  }, [props]);

  // Split template by {slot1}
  const parts = template.split('{slot1}');

  let slotClass = 'code-slot';
  if (selectedChip) slotClass += ' code-slot--filled';
  if (isSubmitted && selectedChip) {
    slotClass += selectedChip === correctAnswer ? ' code-slot--correct' : ' code-slot--wrong';
  }

  return (
    <div>
      <div className="code-fill-box">
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)' }}>
          {parts[0]}
          <span
            className={slotClass}
            onClick={handleSlotClick}
            role="button"
            tabIndex={0}
            title={selectedChip ? "Click to remove chip" : "Click a chip below to place it here"}
          >
            {selectedChip || '___'}
          </span>
          {parts[1]}
        </pre>
      </div>

      <div className="chip-bank">
        {chips.map((chip, idx) => {
          const isUsed = selectedChip === chip;
          return (
            <button
              key={idx}
              type="button"
              className={`code-chip ${isUsed ? 'code-chip--used' : ''}`}
              onClick={() => handleChipClick(chip)}
              disabled={isUsed || isSubmitted}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}
