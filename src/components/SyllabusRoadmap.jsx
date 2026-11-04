import { useState } from 'react';
import SubscriptionModal from './SubscriptionModal';

/**
 * SyllabusRoadmap:
 * Brilliant-style interactive syllabus roadmap with connected vertical path nodes,
 * progress statuses, and Pro freemium paywall gating.
 */
export default function SyllabusRoadmap({ modules = [], onSelectModule }) {
  const [subModalOpen, setSubModalOpen] = useState(false);

  const handleCardClick = (module) => {
    if (module.isProOnly) {
      setSubModalOpen(true);
    } else if (onSelectModule) {
      onSelectModule(module);
    }
  };

  return (
    <div className="roadmap-container">
      {/* Header */}
      <header className="roadmap-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', background: 'var(--primary-subtle)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: 12 }}>
          ⚡ FOUNDATIONAL PATH
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 12 }}>Algorithms & Intuitive Thinking</h1>
        <p style={{ maxWidth: 520, margin: '0 auto', fontSize: 16 }}>
          Master computer science concepts through guided interactive visualizations, prediction puzzles, and hands-on algorithms.
        </p>
      </header>

      {/* Connected Vertical Path */}
      <div className="roadmap-path">
        {modules.map((mod, index) => {
          const isPro = mod.isProOnly;
          const isFirst = index === 0;

          return (
            <div
              key={mod.id || index}
              className={`roadmap-node-card ${isFirst ? 'roadmap-node-card--active' : ''} ${isPro ? 'roadmap-node-card--locked' : ''}`}
              onClick={() => handleCardClick(mod)}
              role="button"
              tabIndex={0}
            >
              <div className="roadmap-node-card__main">
                <div className="roadmap-node-badge">
                  Module {index + 1}
                </div>
                <h3 className="roadmap-node-title">{mod.title}</h3>
                <p className="roadmap-node-desc">{mod.conceptSummary}</p>
              </div>

              <div>
                {isPro ? (
                  <span className="roadmap-status-badge roadmap-status-badge--pro">
                    🔒 PRO
                  </span>
                ) : (
                  <span className="roadmap-status-badge roadmap-status-badge--free">
                    START →
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <SubscriptionModal
        isOpen={subModalOpen}
        onClose={() => setSubModalOpen(false)}
      />
    </div>
  );
}
