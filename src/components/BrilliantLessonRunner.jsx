import { useState, useEffect, useMemo } from 'react';
import ArrayPointerWidget from './widgets/ArrayPointerWidget';
import PredictionCardWidget from './widgets/PredictionCardWidget';
import CodeFillWidget from './widgets/CodeFillWidget';
import AlgorithmScrubberWidget from './widgets/AlgorithmScrubberWidget';
import CodeChallengeWidget from './widgets/CodeChallengeWidget';
import InteractiveSliderWidget from './widgets/InteractiveSliderWidget';
import SortOrderWidget from './widgets/SortOrderWidget';
import InteractiveStringSlicerWidget from './widgets/InteractiveStringSlicerWidget';
import PyObjectMemoryWidget from './widgets/PyObjectMemoryWidget';
import CPythonPipelineWidget from './widgets/CPythonPipelineWidget';
import InteractiveExploreWidget from './widgets/InteractiveExploreWidget';
import TypeCastingWidget from './widgets/TypeCastingWidget';
import ShortCircuitGateWidget from './widgets/ShortCircuitGateWidget';
import BranchingTrackWidget from './widgets/BranchingTrackWidget';
import TruthinessScaleWidget from './widgets/TruthinessScaleWidget';
import IteratorProtocolWidget from './widgets/IteratorProtocolWidget';
import LoopControlJumperWidget from './widgets/LoopControlJumperWidget';
import { STEP_TYPES } from '../types/lesson';
import {
  getScreenMeta,
  isExploreRole,
  normalizeHints,
  hasHints,
  orderStepsByScreenArc,
  HINT_TIERS,
} from '../engine/schema';

function formatText(text) {
  if (!text) return null;
  const paragraphs = text.split('\n\n');
  return paragraphs.map((para, pIdx) => {
    const parts = para.split(/(`[^`]+`)/g);
    return (
      <p key={pIdx}>
        {parts.map((part, cIdx) => {
          if (part.startsWith('`') && part.endsWith('`')) {
            return <code key={cIdx}>{part.slice(1, -1)}</code>;
          }
          return part;
        })}
      </p>
    );
  });
}

/**
 * HintDrawer:
 * Three-tier progressive hint ladder — nudge → blueprint → walkthrough.
 * Each tier unlocks in order; the learner can stop at any level.
 */
function HintDrawer({ hints }) {
  const [revealed, setRevealed] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const available = hints.filter(Boolean).length;
  if (available === 0) return null;

  const revealNext = () => {
    setRevealed((prev) => Math.min(prev + 1, available));
    setIsOpen(true);
  };

  return (
    <div style={{ marginTop: 20, width: '100%' }}>
      {!isOpen ? (
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setIsOpen(true)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, padding: '6px 12px' }}
        >
          <span>💡</span>
          <span>Need a hint? ({available} tier{available === 1 ? '' : 's'})</span>
        </button>
      ) : (
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-subtle)',
            padding: '16px 18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-dim)' }}>
              Progressive hints
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: 12, cursor: 'pointer', padding: 0 }}
            >
              Hide
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {HINT_TIERS.map((tier) => {
              const text = hints[tier.level];
              if (!text) return null;
              const isUnlocked = revealed > tier.level;
              const isNext = revealed === tier.level;

              return (
                <div
                  key={tier.key}
                  style={{
                    border: `1px solid ${isUnlocked ? 'var(--border)' : 'var(--border-subtle, var(--border))'}`,
                    borderRadius: 'var(--radius-sm)',
                    background: isUnlocked ? 'var(--bg-surface)' : 'transparent',
                    padding: '12px 14px',
                    opacity: isUnlocked ? 1 : 0.55,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: isUnlocked ? 6 : 0 }}>
                    <span style={{ fontSize: 14 }}>{isUnlocked ? tier.icon : '🔒'}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: isUnlocked ? 'var(--text-primary)' : 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Tier {tier.level + 1} · {tier.label}
                    </span>
                    {isUnlocked && (
                      <span style={{ fontSize: 11, color: 'var(--text-dim)', fontWeight: 500 }}>{tier.blurb}</span>
                    )}
                  </div>

                  {isUnlocked ? (
                    <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      {formatText(text)}
                    </div>
                  ) : isNext ? (
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={revealNext}
                      style={{ marginTop: 6, fontSize: 12, fontWeight: 700, padding: '4px 10px' }}
                    >
                      Reveal {tier.label.toLowerCase()} →
                    </button>
                  ) : (
                    <div style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 4 }}>
                      Unlocks after tier {tier.level}.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * BrilliantLessonRunner:
 * Full-screen progressive stepper runner with dynamic micro-widgets,
 * sticky progress header, explanation drawers, bottom action dock,
 * and completion celebration modal.
 * 
 * Pedagogy Principle:
 * - "Teach First, Test Second": Visual exploration steps never show "Check Answer"
 *   or false failure states; learners build intuition with mouse-moving/sliders first!
 * - Questions and deduction challenges follow once the mental model is established.
 */
export default function BrilliantLessonRunner({
  lesson = {},
  steps = [],
  week = {},
  phase = {},
  onExit,
  onComplete,
  onNextLesson,
  onSwitchToReader,
  lessonIndex = 0,
  totalLessons = 1
}) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const step = steps[currentStepIdx] || {};
  const isFinalStep = currentStepIdx === steps.length - 1;
  const progressPercent = steps.length > 0 ? ((currentStepIdx + 1) / steps.length) * 100 : 0;

  const screenMeta = getScreenMeta(step);
  const stepHints = normalizeHints(step);
  const showHints = hasHints(step);

  // Determine if current step is a teaching/exploration step (no wrong answers, teach first!)
  const isChallengeRole = step.role === 'mental_model' || step.role === 'bug_hunt' || step.role === 'boss_synthesis';
  const hasInteractiveChallengeProps = Boolean(
    step.props?.target ||
    step.props?.targetOutput ||
    step.props?.buggyExpr ||
    step.props?.correctAnswer ||
    step.props?.options ||
    step.props?.prediction ||
    step.props?.correctOrder ||
    step.props?.expectedOutput
  );

  const isTeaching = !isChallengeRole && Boolean(
    isExploreRole(step) ||
    step.isTeachingStep ||
    (step.type === STEP_TYPES.EXPLORE && !hasInteractiveChallengeProps) ||
    (step.type === STEP_TYPES.PIPELINE_FLOW && !step.props?.target) ||
    (step.type === STEP_TYPES.TYPE_CASTING && !step.props?.targetOutput && !step.props?.buggyExpr) ||
    (step.type === STEP_TYPES.SHORT_CIRCUIT && !step.props?.target) ||
    (step.type === STEP_TYPES.BRANCHING && !step.props?.target) ||
    (step.type === STEP_TYPES.TRUTHINESS_SCALE && !step.props?.target) ||
    (step.type === STEP_TYPES.ITERATOR_PROTOCOL && !step.props?.target) ||
    (step.type === STEP_TYPES.LOOP_CONTROL && !step.props?.target) ||
    (step.type === STEP_TYPES.STRING_SLICER && !step.props?.targetSlice) ||
    (step.type === STEP_TYPES.MEMORY_MODEL && !step.props?.target)
  );

  // Reset runner state when lesson, lessonIndex or steps change
  useEffect(() => {
    setCurrentStepIdx(0);
    setShowCelebration(false);
    setIsValid(false);
    setHasAnswer(false);
    setIsSubmitted(false);
  }, [lessonIndex, lesson?.id, steps]);

  // Reset widget validation state when step changes
  useEffect(() => {
    setIsValid(false);
    setHasAnswer(false);
    setIsSubmitted(false);
  }, [currentStepIdx]);

  const handleValidationChange = (valid, answered = true) => {
    setIsValid(Boolean(valid));
    setHasAnswer(Boolean(answered));
  };

  const handleCheckAnswer = () => {
    setIsSubmitted(true);
  };

  const handleContinue = () => {
    if (isFinalStep) {
      if (onComplete) onComplete();
      setShowCelebration(true);
    } else {
      setCurrentStepIdx((prev) => prev + 1);
      setIsSubmitted(false);
      setIsValid(false);
      setHasAnswer(false);
    }
  };

  const handleTryAgain = () => {
    setIsSubmitted(false);
  };

  const handleRestart = () => {
    setCurrentStepIdx(0);
    setIsSubmitted(false);
    setIsValid(false);
    setHasAnswer(false);
    setShowCelebration(false);
  };

  const handleNextLesson = () => {
    setShowCelebration(false);
    setCurrentStepIdx(0);
    setIsSubmitted(false);
    setIsValid(false);
    setHasAnswer(false);
    if (onNextLesson) onNextLesson();
  };

  const handleExitLesson = () => {
    setShowCelebration(false);
    if (onExit) onExit();
  };

  const renderWidget = () => {
    switch (step.type) {
      case STEP_TYPES.STRING_SLICER:
        return (
          <InteractiveStringSlicerWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.MEMORY_MODEL:
        return (
          <PyObjectMemoryWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.PIPELINE_FLOW:
        return (
          <CPythonPipelineWidget
            props={step.props}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.EXPLORE:
        return (
          <InteractiveExploreWidget
            props={step.props}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.TYPE_CASTING:
        return (
          <TypeCastingWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.SHORT_CIRCUIT:
        return (
          <ShortCircuitGateWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.BRANCHING:
        return (
          <BranchingTrackWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.TRUTHINESS_SCALE:
        return (
          <TruthinessScaleWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.ITERATOR_PROTOCOL:
        return (
          <IteratorProtocolWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.LOOP_CONTROL:
        return (
          <LoopControlJumperWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.ARRAY:
        return (
          <ArrayPointerWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.PREDICTION:
        return (
          <PredictionCardWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.CODE_FILL:
        return (
          <CodeFillWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.SCRUBBER:
        return (
          <AlgorithmScrubberWidget
            props={step.props}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.CODE_CHALLENGE:
        return (
          <CodeChallengeWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.SLIDER:
        return (
          <InteractiveSliderWidget
            props={step.props}
            onValidationChange={handleValidationChange}
          />
        );
      case STEP_TYPES.SORT_ORDER:
        return (
          <SortOrderWidget
            props={step.props}
            isSubmitted={isSubmitted}
            onValidationChange={handleValidationChange}
          />
        );
      default:
        return (
          <InteractiveExploreWidget
            props={step.props}
            onValidationChange={handleValidationChange}
          />
        );
    }
  };

  const canCheck = hasAnswer ||
    step.type === STEP_TYPES.SCRUBBER ||
    step.type === STEP_TYPES.SLIDER;

  return (
    <div className="stepper-layout">
      {/* Header */}
      <header className="stepper-header">
        <button
          type="button"
          className="stepper-close-btn"
          onClick={onExit}
          title="Exit to course syllabus"
          aria-label="Exit to course syllabus"
        >
          ✕
        </button>

        {/* Progress Tracker */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: 460 }}>
          <div style={{ display: 'flex', gap: 6, width: '100%', marginBottom: 6 }}>
            {steps.map((_, sIdx) => {
              const isPast = sIdx < currentStepIdx;
              const isCurrent = sIdx === currentStepIdx;
              return (
                <div
                  key={sIdx}
                  style={{
                    flex: 1,
                    height: 5,
                    borderRadius: 999,
                    background: isPast
                      ? 'var(--primary)'
                      : isCurrent
                      ? (isSubmitted ? (isValid ? 'var(--primary)' : 'var(--danger)') : 'var(--primary)')
                      : 'var(--border)',
                    opacity: isCurrent ? 1 : isPast ? 0.8 : 0.4,
                    transition: 'all 0.3s'
                  }}
                />
              );
            })}
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Step {currentStepIdx + 1} of {steps.length} · {Math.round(progressPercent)}%
          </span>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {onSwitchToReader && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={onSwitchToReader}
              title="View full reading text and CodeMirror editor"
              style={{ fontSize: 12, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <span>📖</span>
              <span className="hide-on-mobile">Full Article</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Canvas */}
      <main className="stepper-canvas">
        {/* Breadcrumb & Pedagogy Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--primary)', background: 'var(--primary-subtle)', padding: '3px 10px', borderRadius: 'var(--radius-full)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-heading)' }}>
            {week?.title ? week.title.split(':')[0] : 'Python Intuition'}
          </span>

          {screenMeta && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)'
              }}
              title={screenMeta.guidance}
            >
              {screenMeta.number}/5 · {screenMeta.badge}
            </span>
          )}

          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: isTeaching ? 'rgba(59, 130, 246, 0.12)' : 'rgba(245, 158, 11, 0.12)',
              color: isTeaching ? '#2563eb' : '#d97706'
            }}
          >
            {isTeaching ? '💡 Visual Intuition (Explore & Learn)' : '🎯 Interactive Challenge'}
          </span>

          <span style={{ fontSize: 12, color: 'var(--text-dim)', fontWeight: 600 }}>
            Lesson {lessonIndex + 1}/{totalLessons}
          </span>
        </div>

        <h1 className="stepper-step-title">{step.title}</h1>

        {screenMeta?.guidance && (
          <p style={{ fontSize: 13, color: 'var(--text-dim)', fontWeight: 500, marginTop: -4, marginBottom: 14 }}>
            {screenMeta.guidance}
          </p>
        )}

        {/* Concept Briefing Card (Teach First, Test Second) */}
        {step.description && (
          <div className="stepper-briefing">
            <div className="stepper-briefing__badge">
              <span>{isTeaching ? '📖 Conceptual Intuition' : '💡 Concept Briefing'}</span>
            </div>
            <div className="stepper-briefing__text">
              {formatText(step.description)}
            </div>
          </div>
        )}

        <div className="stepper-prompt">
          {formatText(step.prompt)}
        </div>

        {/* Interactive Micro-Widget */}
        {renderWidget()}

        {/* Three-tier progressive hint ladder (nudge → blueprint → walkthrough) */}
        {showHints && (
          <HintDrawer key={`hints-${currentStepIdx}`} hints={stepHints} />
        )}

        {/* Post-submission Pedagogical Explanation (for challenge steps) */}
        {!isTeaching && isSubmitted && (
          <div className="explanation-drawer" style={{ borderLeft: `4px solid ${isValid ? 'var(--primary)' : 'var(--danger)'}` }}>
            <h3 className="explanation-drawer__title" style={{ color: isValid ? 'var(--primary)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>{isValid ? '✨' : '💡'}</span>
              <span>{isValid ? 'Brilliant intuition!' : 'Let’s review the concept'}</span>
            </h3>
            <p className="explanation-drawer__text">{step.explanation}</p>
          </div>
        )}
      </main>

      {/* Bottom Action Dock */}
      <footer className="bottom-dock">
        <div className="bottom-dock__status">
          {isTeaching ? (
            <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>✨</span>
              <span>Explore the visual above to build intuition, then continue.</span>
            </span>
          ) : isSubmitted ? (
            <>
              <div
                className={`bottom-dock__icon-box ${
                  isValid
                    ? 'bottom-dock__icon-box--correct'
                    : 'bottom-dock__icon-box--wrong'
                }`}
              >
                {isValid ? '✓' : '✕'}
              </div>
              <span
                className={`bottom-dock__message ${
                  isValid
                    ? 'bottom-dock__message--correct'
                    : 'bottom-dock__message--wrong'
                }`}
              >
                {isValid
                  ? 'Great intuition! Spot on.'
                  : 'Check your prediction and try again.'}
              </span>
            </>
          ) : (
            <span style={{ fontSize: 14, color: 'var(--text-dim)', fontWeight: 500 }}>
              {canCheck ? 'Ready to check your answer.' : 'Interact with the step above to verify.'}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {isTeaching ? (
            // TEACH FIRST: Direct continue button without test barrier!
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleContinue}
              style={{ minWidth: 150, fontWeight: 700 }}
            >
              {isFinalStep ? 'Complete Lesson 🎉' : 'Continue →'}
            </button>
          ) : !isSubmitted ? (
            // Challenge step: check answer button
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCheckAnswer}
              disabled={!canCheck}
              style={{ minWidth: 140, fontWeight: 700 }}
            >
              Check Answer
            </button>
          ) : isValid ? (
            // Challenge solved: continue
            <button
              type="button"
              className="btn btn-success"
              onClick={handleContinue}
              style={{ minWidth: 140, fontWeight: 700 }}
            >
              {isFinalStep ? 'Complete Lesson 🎉' : 'Continue →'}
            </button>
          ) : (
            // Challenge incorrect: try again
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleTryAgain}
              style={{ minWidth: 120, fontWeight: 700 }}
            >
              Try Again
            </button>
          )}
        </div>
      </footer>

      {/* Lesson Completed Celebration Modal */}
      {showCelebration && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: 20
          }}
        >
          <div
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              maxWidth: 480,
              width: '100%',
              padding: 36,
              textAlign: 'center',
              boxShadow: 'var(--shadow-lg)',
              animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 14px', background: 'var(--primary-subtle)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: 13, fontWeight: 800, marginBottom: 12 }}>
              ✨ +25 XP EARNED
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>
              Lesson Complete!
            </h2>

            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
              You successfully mastered <strong>{lesson?.title || 'this module'}</strong> with hands-on active problem solving.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {onNextLesson && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextLesson}
                  style={{ width: '100%', padding: '14px 20px', fontSize: 16, fontWeight: 700 }}
                >
                  Next Lesson →
                </button>
              )}

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleExitLesson}
                style={{ width: '100%', padding: '12px 20px', fontSize: 14 }}
              >
                Back to Syllabus
              </button>

              <button
                type="button"
                style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', fontSize: 13, cursor: 'pointer', padding: 8 }}
                onClick={handleRestart}
              >
                Review This Lesson Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
