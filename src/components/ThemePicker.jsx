import { useState, useEffect } from 'react';

const THEMES = [
  { id: 'midnight', label: 'Midnight', icon: '🌙' },
  { id: 'neon', label: 'Neon Cyberpunk', icon: '💖' },
  { id: 'synthwave', label: 'Synthwave', icon: '🌆' },
  { id: 'forest', label: 'Forest Hacker', icon: '🌲' },
  { id: 'arctic', label: 'Arctic', icon: '❄️' },
  { id: 'lemon', label: 'Lemon Fresh', icon: '🍋' }
];

export default function ThemePicker() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('codedex_theme') || 'midnight';
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (theme === 'midnight') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
    localStorage.setItem('codedex_theme', theme);
  }, [theme]);

  const activeTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <div className="theme-picker" style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          fontSize: '18px',
          opacity: 0.7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.2s',
          borderRadius: '50%'
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '1'}
        onMouseLeave={e => e.currentTarget.style.opacity = '0.7'}
        title="Change Theme"
      >
        <span>{activeTheme.icon}</span>
      </button>

      {isOpen && (
        <div 
          className="theme-picker-menu"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            background: 'var(--bg-card)',
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '8px',
            zIndex: 100,
            minWidth: '180px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
          }}
        >
          {THEMES.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '8px 12px',
                background: theme === t.id ? 'var(--bg-card-hover)' : 'transparent',
                border: 'none',
                color: 'var(--white)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                borderRadius: '4px',
                marginBottom: '4px'
              }}
              onMouseEnter={(e) => e.target.style.background = 'var(--bg-card-hover)'}
              onMouseLeave={(e) => {
                if (theme !== t.id) e.target.style.background = 'transparent';
              }}
            >
              <span style={{ marginRight: '8px' }}>{t.icon}</span> {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
