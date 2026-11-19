import { useState, useEffect, createContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import Companion from './components/Companion';
import { SettingsProvider } from './components/Settings';
import { recordActivity } from './utils/activity';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';

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
    recordActivity();
    setProgress((prev) => {
      const updated = { ...prev, [itemId]: true };
      try {
        localStorage.setItem('stepcode_progress', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const isLessonPage = location.pathname.startsWith('/lesson/') || location.pathname.startsWith('/project/') || location.pathname.startsWith('/final/');

  return (
    <SettingsProvider>
    <AppContext.Provider value={{ progress, completeLesson }}>
      <div className="app-shell">
        {/* Render top navbar on catalog and track pages */}
        {!isLessonPage && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/python" element={<CoursePage slug="python" />} />
          <Route path="/further" element={<CoursePage slug="further" />} />
          <Route path="/lesson/:moduleId/:lessonIndex" element={<LessonPage />} />
          <Route path="/project/:moduleId" element={<LessonPage />} />
          <Route path="/final/:trackId" element={<LessonPage />} />
          <Route path="/quiz/:moduleId" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Companion />
      </div>
    </AppContext.Provider>
    </SettingsProvider>
  );
}
