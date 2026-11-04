import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TrackPage from './pages/TrackPage';
import LessonPage from './pages/LessonPage';

export const AppContext = createContext();

export default function App() {
  const location = useLocation();

  // Simple local progress tracking
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('stepcode_progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const completeLesson = (itemId) => {
    setProgress((prev) => {
      const updated = { ...prev, [itemId]: true };
      try {
        localStorage.setItem('stepcode_progress', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isLessonPage = location.pathname.startsWith('/lesson/');

  return (
    <AppContext.Provider value={{ progress, completeLesson }}>
      <div className="app-shell">
        {/* Render top navbar on catalog and track pages */}
        {!isLessonPage && <Navbar />}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/track/:trackId" element={<TrackPage />} />
          <Route path="/lesson/:weekId/:lessonIndex" element={<LessonPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}
