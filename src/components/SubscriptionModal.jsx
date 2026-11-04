import { useState } from 'react';

/**
 * SubscriptionModal:
 * Freemium subscription paywall modal offering annual & monthly plans with a 7-day trial.
 */
export default function SubscriptionModal({ isOpen, onClose }) {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="subscription-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="subscription-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="subscription-modal__badge">
          🔒 PRO CONTENT
        </div>

        <h2 className="subscription-modal__title">Unlock StepCode Pro</h2>
        <p className="subscription-modal__desc">
          Gain unrestricted access to all interactive algorithm modules, visual scrubbers, and interview-ready intuitive learning tracks.
        </p>

        {/* Plan Cards */}
        <div className="subscription-plans">
          <div
            className={`plan-card ${selectedPlan === 'annual' ? 'plan-card--selected' : ''}`}
            onClick={() => setSelectedPlan('annual')}
            role="button"
            tabIndex={0}
          >
            <span className="plan-card__tag">Save 40%</span>
            <div className="plan-card__name">Annual Plan</div>
            <div className="plan-card__price">
              $12.50 <span className="plan-card__period">/ mo</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>
              Billed annually ($150/yr)
            </div>
          </div>

          <div
            className={`plan-card ${selectedPlan === 'monthly' ? 'plan-card--selected' : ''}`}
            onClick={() => setSelectedPlan('monthly')}
            role="button"
            tabIndex={0}
          >
            <div className="plan-card__name">Monthly Plan</div>
            <div className="plan-card__price">
              $19.99 <span className="plan-card__period">/ mo</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>
              Billed monthly, cancel anytime
            </div>
          </div>
        </div>

        {/* Benefits list */}
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="benefit-item__icon">✓</span>
            <span>All 45+ interactive algorithm intuition modules</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-item__icon">✓</span>
            <span>Real-time pointer scrubbers & complexity breakdowns</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-item__icon">✓</span>
            <span>Hands-on system design & ML intuition playgrounds</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-item__icon">✓</span>
            <span>Official StepCode CS Mastery Certificate</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px 24px', fontSize: 15 }}
            onClick={() => {
              alert('🎉 Welcome to StepCode Pro Trial! Enjoy unlimited access.');
              onClose();
            }}
          >
            Start 7-Day Free Trial
          </button>
          
          <button
            type="button"
            className="btn"
            style={{ width: '100%', border: 'none', background: 'transparent', color: 'var(--text-dim)', fontSize: 13 }}
            onClick={onClose}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
