import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// ─── Unregister any stale Service Workers from previous projects on port 3000 ─
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    for (const reg of registrations) {
      reg.unregister();
    }
  }).catch(() => {});
}

// ─── Error Boundary to prevent any blank white screen ───────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('StepCode runtime error:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
          background: 'var(--bg-body, #f8f9fb)',
          color: 'var(--text-primary, #0f172a)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            Unable to load page
          </h1>
          <p style={{ maxWidth: 440, color: 'var(--text-secondary, #64748b)', fontSize: 14, lineHeight: 1.5, marginBottom: 20 }}>
            {this.state.error?.message || 'A browser cache or storage error occurred.'}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleReset}
            style={{
              padding: '10px 20px',
              borderRadius: 8,
              background: '#2563eb',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Clear Browser Cache & Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
