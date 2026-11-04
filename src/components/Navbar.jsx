import { Link, useLocation } from 'react-router-dom';

/**
 * Brilliant.org-style floating pill navbar
 */
export default function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <div className="navbar__logo-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </div>
        <span className="navbar__logo-text">StepCode</span>
      </Link>

      <nav className="navbar__links">
        <Link
          to="/"
          className={`navbar__link ${location.pathname === '/' ? 'navbar__link--active' : ''}`}
        >
          Courses
        </Link>
      </nav>
    </header>
  );
}
