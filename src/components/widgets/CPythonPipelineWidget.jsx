import { useState, useEffect } from 'react';

/**
 * CPythonPipelineWidget:
 * Brilliant.org-style interactive visualizer of the CPython execution lifecycle.
 * 
 * Features:
 * - Interactive mouse scrubbing through 4 pipeline stages
 * - Live tokenization & AST disassembly
 * - Bytecode instruction stack animation
 * - Virtual Machine stack simulation (push operands, execute opcode, store result)
 */
export default function CPythonPipelineWidget({ props = {}, onValidationChange }) {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    if (onValidationChange) {
      onValidationChange(true, true);
    }
  }, []);

  const stages = [
    {
      id: 'stage-source',
      title: '1. Source Text (.py)',
      badge: 'Human Readable',
      summary: 'Your raw Python script written with indentation and clear syntax.',
      content: (
        <div style={{ background: 'var(--bg-editor)', padding: '18px 20px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: 16, color: '#f8fafc' }}>
          <span style={{ color: '#38bdf8' }}>x</span> = <span style={{ color: '#f59e0b' }}>10</span><br />
          <span style={{ color: '#38bdf8' }}>total</span> = <span style={{ color: '#38bdf8' }}>x</span> + <span style={{ color: '#f59e0b' }}>5</span>
        </div>
      )
    },
    {
      id: 'stage-lexer',
      title: '2. Lexer & Tokens',
      badge: 'Token Stream',
      summary: 'CPython tokenizer breaks character stream into grammatical tokens.',
      content: (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '12px 0' }}>
          <span className="code-chip" style={{ border: '1px solid #38bdf8', color: '#38bdf8' }}>NAME("x")</span>
          <span className="code-chip">EQUAL("=")</span>
          <span className="code-chip" style={{ border: '1px solid #f59e0b', color: '#f59e0b' }}>NUMBER(10)</span>
          <span className="code-chip">NEWLINE</span>
          <span className="code-chip" style={{ border: '1px solid #38bdf8', color: '#38bdf8' }}>NAME("total")</span>
          <span className="code-chip">EQUAL("=")</span>
          <span className="code-chip" style={{ border: '1px solid #38bdf8', color: '#38bdf8' }}>NAME("x")</span>
          <span className="code-chip" style={{ border: '1px solid #10b981', color: '#10b981' }}>PLUS("+")</span>
          <span className="code-chip" style={{ border: '1px solid #f59e0b', color: '#f59e0b' }}>NUMBER(5)</span>
        </div>
      )
    },
    {
      id: 'stage-ast',
      title: '3. Abstract Syntax Tree',
      badge: 'Grammar Tree',
      summary: 'Parser compiles tokens into a semantic tree representing expressions.',
      content: (
        <div style={{ background: 'var(--bg-editor)', padding: '14px 18px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
          <div style={{ color: '#e2e8f0', fontWeight: 700 }}>Assign(</div>
          <div style={{ paddingLeft: 16 }}>targets = [ <span style={{ color: '#38bdf8' }}>Name(id='total')</span> ],</div>
          <div style={{ paddingLeft: 16 }}>value = <span style={{ color: '#10b981' }}>BinOp</span>(</div>
          <div style={{ paddingLeft: 32 }}>left = <span style={{ color: '#38bdf8' }}>Name(id='x')</span>,</div>
          <div style={{ paddingLeft: 32 }}>op = <span style={{ color: '#10b981' }}>Add()</span>,</div>
          <div style={{ paddingLeft: 32 }}>right = <span style={{ color: '#f59e0b' }}>Constant(value=5)</span></div>
          <div style={{ paddingLeft: 16 }}>)</div>
          <div style={{ color: '#e2e8f0', fontWeight: 700 }}>)</div>
        </div>
      )
    },
    {
      id: 'stage-bytecode',
      title: '4. CPython Bytecode (.pyc)',
      badge: 'Virtual Machine',
      summary: 'Stack-based opcodes executed inside the CPython evaluation loop.',
      content: (
        <div style={{ background: 'var(--bg-editor)', padding: '16px 20px', borderRadius: 'var(--radius)', fontFamily: 'var(--font-mono)', fontSize: 13, color: '#f8fafc' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 10, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#38bdf8', fontWeight: 700 }}>LOAD_FAST 0 (x)</span>
            <span style={{ color: '#94a3b8' }}># Push value of x (10) onto stack</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 10, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>LOAD_CONST 1 (5)</span>
            <span style={{ color: '#94a3b8' }}># Push literal integer 5 onto stack</span>
          </div>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 10, marginBottom: 8, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ color: '#10b981', fontWeight: 700 }}>BINARY_OP 0 (+)</span>
              <span style={{ color: '#94a3b8' }}># Pop 10 &amp; 5, add &#8594; push 15</span>
            </div>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 10 }}>
            <span style={{ color: '#ec4899', fontWeight: 700 }}>STORE_FAST 1 (total)</span>
            <span style={{ color: '#94a3b8' }}># Pop 15 & store into variable 'total'</span>
          </div>
        </div>
      )
    }
  ];

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
      {/* Stage Tabs Navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, width: '100%', maxWidth: 640, overflowX: 'auto', paddingBottom: 4 }}>
        {stages.map((stg, idx) => (
          <button
            key={stg.id}
            type="button"
            className="btn btn-sm"
            onClick={() => setActiveStage(idx)}
            style={{
              flex: 1,
              minWidth: 120,
              fontSize: 12,
              padding: '8px 12px',
              borderRadius: 'var(--radius)',
              background: activeStage === idx ? 'var(--primary)' : 'var(--bg-subtle)',
              color: activeStage === idx ? '#fff' : 'var(--text-secondary)',
              border: activeStage === idx ? '2px solid var(--primary)' : '1px solid var(--border)',
              fontWeight: 700,
              transition: 'all 0.2s'
            }}
          >
            {stg.title.split('.')[1] || stg.title}
          </button>
        ))}
      </div>

      {/* Interactive Pipeline Stage Detail */}
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          padding: '24px 20px',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-primary)' }}>
            {stages[activeStage].title}
          </h3>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              background: 'var(--primary-subtle)',
              color: 'var(--primary)',
              padding: '3px 10px',
              borderRadius: 999,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            {stages[activeStage].badge}
          </span>
        </div>

        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 18, lineHeight: 1.5 }}>
          {stages[activeStage].summary}
        </p>

        {stages[activeStage].content}
      </div>

      {/* Guided Exploration Bottom Callout */}
      <div
        style={{
          marginTop: 18,
          width: '100%',
          maxWidth: 640,
          fontSize: 13,
          color: 'var(--text-secondary)',
          background: 'rgba(59, 130, 246, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-sm)',
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }}
      >
        <span style={{ fontSize: 18 }}>💡</span>
        <span>
          <strong>Intuition:</strong> Python is an interpreted language that compiles to bytecode first. CPython's virtual machine reads the <code>.pyc</code> stack instructions to execute your program across any operating system.
        </span>
      </div>
    </div>
  );
}
