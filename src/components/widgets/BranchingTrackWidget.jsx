import { useState, useEffect } from 'react';

/**
 * BranchingTrackWidget:
 * Brilliant.org-style interactive visualizer of if-elif-else execution branches
 * and Python 3.10+ Structural Pattern Matching (match-case).
 */
export default function BranchingTrackWidget({ props = {}, isSubmitted, onValidationChange }) {
  const [score, setScore] = useState(85);
  const [mode, setMode] = useState('if_elif'); // 'if_elif' | 'match_case'
  const [command, setCommand] = useState('TELEPORT');

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, [score, mode, command]);

  let activeBranch = 'else';
  let branchLabel = '';

  if (score >= 90) {
    activeBranch = 'if';
    branchLabel = 'Branch 1 (if score >= 90): "A+ (Master)"';
  } else if (score >= 80) {
    activeBranch = 'elif_1';
    branchLabel = 'Branch 2 (elif score >= 80): "B (Proficient)"';
  } else if (score >= 70) {
    activeBranch = 'elif_2';
    branchLabel = 'Branch 3 (elif score >= 70): "C (Apprentice)"';
  } else {
    activeBranch = 'else';
    branchLabel = 'Branch 4 (else fallback): "Needs Practice"';
  }

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 620, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 18 }}>🌿</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Branching Track & Pattern Matching
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setMode('if_elif')}
            style={{
              fontSize: 12,
              padding: '4px 12px',
              background: mode === 'if_elif' ? 'var(--primary)' : 'var(--bg-subtle)',
              color: mode === 'if_elif' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            if / elif / else
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setMode('match_case')}
            style={{
              fontSize: 12,
              padding: '4px 12px',
              background: mode === 'match_case' ? 'var(--primary)' : 'var(--bg-subtle)',
              color: mode === 'match_case' ? '#fff' : 'var(--text-secondary)'
            }}
          >
            match-case (3.10+)
          </button>
        </div>
      </div>

      {mode === 'if_elif' ? (
        <>
          {/* Interactive Score Slider */}
          <div style={{ width: '100%', maxWidth: 620, marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Adjust Input Variable:
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 800, color: 'var(--primary)' }}>
                score = {score}
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={score}
              onChange={(e) => setScore(Number(e.target.value))}
              style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }}
            />
          </div>

          {/* Visual Track Branches */}
          <div
            style={{
              width: '100%',
              maxWidth: 620,
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}
          >
            {[
              { id: 'if', cond: 'if score >= 90:', res: 'grade = "A+"', color: '#10b981' },
              { id: 'elif_1', cond: 'elif score >= 80:', res: 'grade = "B"', color: '#3b82f6' },
              { id: 'elif_2', cond: 'elif score >= 70:', res: 'grade = "C"', color: '#f59e0b' },
              { id: 'else', cond: 'else:', res: 'grade = "F"', color: '#ef4444' }
            ].map((branch) => {
              const isActive = activeBranch === branch.id;
              return (
                <div
                  key={branch.id}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 'var(--radius)',
                    border: isActive ? `2px solid ${branch.color}` : '1px solid var(--border)',
                    background: isActive ? 'var(--bg-surface)' : 'var(--bg-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: isActive ? `0 4px 16px rgba(0,0,0,0.06), 0 0 0 3px ${branch.color}20` : 'none',
                    transform: isActive ? 'scale(1.02)' : 'none',
                    transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: isActive ? branch.color : 'var(--border)',
                        boxShadow: isActive ? `0 0 8px ${branch.color}` : 'none'
                      }}
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: isActive ? 'var(--text-primary)' : 'var(--text-dim)' }}>
                      {branch.cond}
                    </span>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 14,
                      fontWeight: 700,
                      color: isActive ? branch.color : 'var(--text-dim)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isActive ? `${branch.color}15` : 'transparent'
                    }}
                  >
                    {branch.res}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* match-case Mode */
        <div style={{ width: '100%', maxWidth: 620, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            {['TELEPORT', 'ATTACK', 'DEFEND', 'UNKNOWN'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                className="btn btn-sm"
                onClick={() => setCommand(cmd)}
                style={{
                  background: command === cmd ? 'var(--primary)' : 'var(--bg-subtle)',
                  color: command === cmd ? '#fff' : 'var(--text-secondary)',
                  fontWeight: 700
                }}
              >
                {cmd}
              </button>
            ))}
          </div>

          <div style={{ background: 'var(--bg-editor)', padding: '20px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: 14, color: '#f8fafc', lineHeight: 1.8 }}>
            <span style={{ color: '#ec4899' }}>match</span> command:<br />
            &nbsp;&nbsp;<span style={{ color: command === 'TELEPORT' ? '#10b981' : '#64748b' }}>case ["TELEPORT", dest]:</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: command === 'TELEPORT' ? '#38bdf8' : '#64748b' }}>print(f"Warping to &#123;dest&#125;...")</span><br />
            &nbsp;&nbsp;<span style={{ color: command === 'ATTACK' ? '#10b981' : '#64748b' }}>case ["ATTACK", target]:</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: command === 'ATTACK' ? '#38bdf8' : '#64748b' }}>print(f"Striking &#123;target&#125;!")</span><br />
            &nbsp;&nbsp;<span style={{ color: (command !== 'TELEPORT' && command !== 'ATTACK') ? '#10b981' : '#64748b' }}>case _:</span><br />
            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: (command !== 'TELEPORT' && command !== 'ATTACK') ? '#38bdf8' : '#64748b' }}>print("Default fallback executed")</span>
          </div>
        </div>
      )}

      {/* Intuition Takeaway */}
      <div
        style={{
          marginTop: 20,
          width: '100%',
          maxWidth: 620,
          fontSize: 13,
          color: 'var(--text-secondary)',
          background: 'var(--primary-subtle)',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <span style={{ fontSize: 18 }}>💡</span>
        <span>
          <strong>The Off-Side Rule:</strong> In Python, code blocks are strictly defined by 4 spaces of indentation rather than curly braces <code>{}</code>. The first condition that evaluates to <code>True</code> claims execution and skips all subsequent branches!
        </span>
      </div>
    </div>
  );
}
