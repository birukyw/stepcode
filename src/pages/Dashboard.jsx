import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TRACKS } from '../data/catalog';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'python', label: 'Python' },
  { id: 'dsa', label: 'Algorithms' },
  { id: 'web', label: 'Web Dev' },
  { id: 'ml', label: 'AI & ML' },
  { id: 'systems', label: 'Systems' },
  { id: 'java', label: 'Java' },
];

export default function Dashboard() {
  const [selectedCat, setSelectedCat] = useState('all');

  const filteredTracks = TRACKS.filter((track) => {
    if (selectedCat === 'all') return true;
    if (selectedCat === 'python') return track.id.includes('python');
    if (selectedCat === 'dsa') return track.id.includes('dsa') || track.id.includes('algorithm');
    if (selectedCat === 'web') return track.id.includes('web');
    if (selectedCat === 'ml') return track.id.includes('ml');
    if (selectedCat === 'systems') return track.id.includes('systems');
    if (selectedCat === 'java') return track.id.includes('java');
    return true;
  });

  return (
    <div className="app-container">
      {/* Hero */}
      <section className="catalog-hero">
        <div className="catalog-hero__badge">
          Interactive Learning
        </div>
        <h1 className="catalog-hero__title">
          Learn to code through guided, interactive lessons.
        </h1>
        <p className="catalog-hero__subtitle">
          Build real problem-solving intuition with step-by-step explanations and hands-on coding practice.
        </p>
      </section>

      {/* Category Tabs */}
      <div className="category-tabs-wrapper">
        <div className="category-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`category-tab ${selectedCat === cat.id ? 'category-tab--active' : ''}`}
              onClick={() => setSelectedCat(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <main className="courses-grid-container">
        <div className="courses-grid">
          {filteredTracks.map((track) => (
            <Link
              key={track.id}
              to={`/track/${track.id}`}
              className="course-card"
            >
              <div className="course-card__header">
                <div className="course-card__icon-box">
                  <span>{track.icon || '💻'}</span>
                </div>
                <span className="course-card__badge">
                  {track.modulesCount || 10} modules
                </span>
              </div>

              <h2 className="course-card__title">{track.title}</h2>
              <p className="course-card__desc">
                {track.heroDescription || track.description?.slice(0, 140) + '...'}
              </p>

              <div className="course-card__footer">
                <span>{track.difficulty || 'Beginner'}</span>
                <span className="course-card__action">
                  Start learning →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
