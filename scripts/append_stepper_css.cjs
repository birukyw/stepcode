const fs = require('fs');
const path = require('path');

const indexCssPath = path.join(__dirname, '..', 'src', 'index.css');
let indexCss = fs.readFileSync(indexCssPath, 'utf8');

const stepperCss = `
/* ═══════════════════════════════════════════════════════════════════
   BRILLIANT.ORG INTERACTIVE STEPPER & MICRO-WIDGET STYLES
   ═══════════════════════════════════════════════════════════════════ */

.stepper-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body);
}

.stepper-header {
  position: sticky;
  top: 0;
  height: 60px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 90;
}

.stepper-close-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}
.stepper-close-btn:hover {
  background: var(--bg-subtle);
  color: var(--text-primary);
}

.stepper-progress-track {
  flex: 1;
  max-width: 440px;
  height: 8px;
  background: var(--bg-subtle);
  border-radius: var(--radius-full);
  margin: 0 24px;
  overflow: hidden;
}

.stepper-progress-fill {
  height: 100%;
  background: var(--primary);
  border-radius: var(--radius-full);
  transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.stepper-canvas {
  flex: 1;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 40px 20px calc(var(--dock-height) + 60px);
  display: flex;
  flex-direction: column;
}

.stepper-step-title {
  font-size: 26px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.stepper-prompt {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
}

/* ─── Bottom Action Dock ──────────────────────────────────────────── */
.bottom-dock {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: var(--dock-height);
  background: var(--bg-surface);
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 95;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.04);
}

.bottom-dock__status {
  display: flex;
  align-items: center;
  gap: 12px;
}

.bottom-dock__icon-box {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 800;
}
.bottom-dock__icon-box--correct {
  background: var(--primary-subtle);
  color: var(--primary);
  border: 2px solid var(--primary);
}
.bottom-dock__icon-box--wrong {
  background: var(--danger-subtle);
  color: var(--danger);
  border: 2px solid var(--danger);
}

.bottom-dock__message {
  font-size: 15px;
  font-weight: 700;
}
.bottom-dock__message--correct { color: var(--primary); }
.bottom-dock__message--wrong   { color: var(--danger); }

/* ─── Widget: Array Pointer ───────────────────────────────────────── */
.widget-array-container {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 32px 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.array-cells-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 24px;
}

.array-cell {
  width: 52px;
  height: 56px;
  border-radius: var(--radius);
  border: 2px solid var(--border);
  background: var(--bg-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  user-select: none;
}
.array-cell:hover {
  border-color: var(--primary);
  background: var(--primary-subtle);
  transform: translateY(-2px);
}
.array-cell--active {
  border-color: var(--primary) !important;
  background: var(--primary-subtle) !important;
  box-shadow: 0 0 0 3px var(--primary-glow);
}
.array-cell--disabled {
  opacity: 0.35;
  cursor: not-allowed;
  background: var(--bg-subtle);
}

.array-cell__val {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}
.array-cell__idx {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--text-dim);
}

.array-pointers-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.pointer-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: var(--radius-full);
}
.pointer-pill--low  { background: rgba(59, 130, 246, 0.1); color: #2563eb; }
.pointer-pill--mid  { background: rgba(229, 161, 0, 0.12); color: #d97706; }
.pointer-pill--high { background: rgba(124, 58, 237, 0.1); color: #7c3aed; }

/* ─── Widget: Prediction Cards ────────────────────────────────────── */
.quiz-options-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.quiz-option-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-radius: var(--radius);
  border: 2px solid var(--border);
  background: var(--bg-surface);
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}
.quiz-option-card:hover {
  border-color: var(--primary);
  background: var(--bg-surface-hover);
}
.quiz-option-card--selected {
  border-color: var(--primary);
  background: var(--primary-subtle);
}
.quiz-option-card--correct {
  border-color: var(--primary) !important;
  background: var(--primary-subtle) !important;
}
.quiz-option-card--wrong {
  border-color: var(--danger) !important;
  background: var(--danger-subtle) !important;
}

.quiz-option-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
}

.quiz-option-check {
  width: 24px;
  height: 24px;
  border-radius: var(--radius-full);
  border: 2px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  flex-shrink: 0;
  margin-left: 16px;
}
.quiz-option-card--selected .quiz-option-check {
  border-color: var(--primary);
  background: var(--primary);
  color: #fff;
}
.quiz-option-card--correct .quiz-option-check {
  border-color: var(--primary);
  background: var(--primary);
  color: #fff;
}
.quiz-option-card--wrong .quiz-option-check {
  border-color: var(--danger);
  background: var(--danger);
  color: #fff;
}

/* ─── Widget: Code Fill Chips ─────────────────────────────────────── */
.code-fill-box {
  background: var(--bg-editor);
  border-radius: var(--radius);
  padding: 24px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: #f8fafc;
  line-height: 1.8;
  margin-bottom: 20px;
  box-shadow: var(--shadow-md);
}

.code-slot {
  display: inline-flex;
  min-width: 80px;
  height: 28px;
  border-radius: var(--radius-xs);
  border: 1px dashed #64748b;
  background: rgba(255, 255, 255, 0.08);
  padding: 0 10px;
  align-items: center;
  justify-content: center;
  color: #38bdf8;
  font-weight: 600;
  vertical-align: middle;
  cursor: pointer;
}
.code-slot--filled {
  border-style: solid;
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.15);
}

.chip-bank {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-top: 14px;
}

.code-chip {
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}
.code-chip:hover {
  border-color: var(--primary);
  background: var(--primary-subtle);
  transform: translateY(-2px);
}
.code-chip--used {
  opacity: 0.3;
  pointer-events: none;
}

/* ─── Widget: Algorithm Scrubber ──────────────────────────────────── */
.scrubber-widget-container {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.scrubber-slider {
  width: 100%;
  max-width: 440px;
  margin: 20px 0 12px;
  cursor: pointer;
  accent-color: var(--primary);
}

.scrubber-frame-desc {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  text-align: center;
  line-height: 1.5;
}

/* ─── Explanation Drawer ──────────────────────────────────────────── */
.explanation-drawer {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-top: 20px;
  box-shadow: var(--shadow-sm);
  animation: fadeIn 0.2s ease-out;
}

.explanation-drawer__title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.explanation-drawer__text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ─── Interactive Concept & Codingspace Cards ─────────────────────── */
.interactive-concept-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-sm);
}

.interactive-code-box {
  background: var(--bg-editor);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  margin-bottom: 24px;
}
`;

if (!indexCss.includes('.stepper-layout')) {
  indexCss += '\n' + stepperCss;
  fs.writeFileSync(indexCssPath, indexCss, 'utf8');
  console.log('Appended Brilliant stepper CSS to src/index.css');
} else {
  console.log('Stepper CSS already present in src/index.css');
}
