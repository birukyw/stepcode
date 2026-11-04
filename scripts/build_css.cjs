const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '..', 'indexbygemini.css');
const targetPath = path.join(__dirname, '..', 'src', 'index.css');

const base = fs.readFileSync(basePath, 'utf8');

const extra = `
/* ─── Modal & Subscription Paywall ────────────────────────────────── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: modalFadeIn 0.2s ease-out;
}

@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideUp {
  from { opacity: 0; transform: translateY(16px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.subscription-modal {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 500px;
  padding: 36px 32px;
  box-shadow: var(--shadow-lg);
  position: relative;
  animation: modalSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.subscription-modal__close {
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  font-size: 20px;
  color: var(--text-dim);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: var(--transition);
}
.subscription-modal__close:hover {
  color: var(--text-primary);
  background: var(--bg-subtle);
}

.subscription-modal__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(245, 158, 11, 0.12);
  color: var(--warning);
  border: 1px solid rgba(245, 158, 11, 0.25);
  border-radius: var(--radius-full);
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 700;
  font-family: var(--font-heading);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 14px;
}

.subscription-modal__title {
  font-family: var(--font-heading);
  font-size: 24px;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.subscription-modal__desc {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 24px;
}

.subscription-plans {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.plan-card {
  flex: 1;
  border: 2px solid var(--border);
  border-radius: var(--radius);
  background: var(--bg-surface);
  padding: 16px;
  cursor: pointer;
  transition: var(--transition);
  position: relative;
  text-align: left;
}
.plan-card:hover {
  border-color: var(--border-hover);
}
.plan-card--selected {
  border-color: var(--primary);
  background: var(--primary-subtle);
  box-shadow: 0 0 0 3px var(--primary-glow);
}

.plan-card__tag {
  position: absolute;
  top: -10px;
  right: 12px;
  background: var(--primary);
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.plan-card__name {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.plan-card__price {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
}
.plan-card__period {
  font-size: 12px;
  color: var(--text-dim);
  font-weight: normal;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 28px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: var(--text-secondary);
}
.benefit-item__icon {
  color: var(--success);
  font-weight: 800;
  font-size: 14px;
}

/* ─── Roadmap Node Card Details ────────────────────────────────────── */
.roadmap-node-card__main {
  flex: 1;
  padding-right: 16px;
}

.roadmap-node-badge {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.roadmap-node-title {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.roadmap-node-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.45;
}

.roadmap-status-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: var(--radius-full);
  white-space: nowrap;
}
.roadmap-status-badge--pro {
  background: rgba(245, 158, 11, 0.12);
  color: var(--warning);
  border: 1px solid rgba(245, 158, 11, 0.25);
}
.roadmap-status-badge--free {
  background: var(--primary-subtle);
  color: var(--primary);
  border: 1px solid var(--border-bright);
}

/* ─── Theme Toggle Button ─────────────────────────────────────────── */
.theme-toggle-btn {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);
  font-size: 16px;
}
.theme-toggle-btn:hover {
  background: var(--bg-subtle);
  border-color: var(--border-hover);
}
`;

fs.writeFileSync(targetPath, base + extra, 'utf8');
console.log('src/index.css generated successfully! Length:', fs.statSync(targetPath).size);
