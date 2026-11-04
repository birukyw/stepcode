import { useState, useEffect } from 'react';

/**
 * PredictionCardWidget:
 * Multiple-choice intuitive deduction card selector with visual correct/wrong feedback.
 */
export default function PredictionCardWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [selectedId, setSelectedId] = useState(null);

  const options = props.options || [];

  const handleSelect = (option, index) => {
    if (isSubmitted) return;
    const id = option.id !== undefined ? option.id : index;
    setSelectedId(id);
    const isCorrect = Boolean(option.isCorrect);
    if (onValidationChange) {
      onValidationChange(isCorrect, true);
    }
  };

  useEffect(() => {
    setSelectedId(null);
    if (onValidationChange) {
      onValidationChange(false, false);
    }
  }, [props]);

  return (
    <div className="quiz-options-list">
      {options.map((option, index) => {
        const id = option.id !== undefined ? option.id : index;
        const isSelected = selectedId === id;
        const isCorrect = Boolean(option.isCorrect);

        let cardClass = 'quiz-option-card';
        if (isSelected) {
          cardClass += ' quiz-option-card--selected';
        }
        if (isSubmitted) {
          if (isSelected) {
            cardClass += isCorrect
              ? ' quiz-option-card--correct'
              : ' quiz-option-card--wrong';
          } else if (isCorrect) {
            cardClass += ' quiz-option-card--revealed-correct';
          }
        }

        return (
          <div
            key={id}
            className={cardClass}
            onClick={() => handleSelect(option, index)}
            role="button"
            tabIndex={0}
          >
            <span className="quiz-option-label">{option.text || option}</span>
            <div className="quiz-option-check">
              {isSelected ? (
                isSubmitted ? (isCorrect ? '✓' : '✕') : '●'
              ) : isSubmitted && isCorrect ? (
                '✓'
              ) : (
                ''
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
