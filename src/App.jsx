import { useState, useEffect, useRef, createContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CoursePage from './pages/CoursePage';
import Companion from './components/Companion';
import { SettingsProvider } from './components/Settings';
import { recordActivity } from './utils/activity';
import LessonPage from './pages/LessonPage';
import QuizPage from './pages/QuizPage';
import Login from './pages/Login';
import { useAuth } from './components/AuthProvider';
import { readLocal, writeLocal, clearLocal, mergeData, loadCloud, saveCloud } from './utils/cloudSync';

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

  // Accounts: when someone logs in, combine this device's progress with their saved progress, then keep
  // the account up to date. Guests are unaffected.
  const { user } = useAuth();
  const syncedFor = useRef(null);
  const hadUser = useRef(false);
  const [syncError, setSyncError] = useState(false);

  useEffect(() => {
    if (!user) {
      if (hadUser.current) { clearLocal(); setProgress({}); }   // signed out: leave nothing behind on this device
      hadUser.current = false;
      syncedFor.current = null;
      return undefined;
    }
    hadUser.current = true;
    let cancelled = false;
    (async () => {
      try {
        const cloud = await loadCloud(user.id);
        if (cancelled) return;
        const merged = mergeData(readLocal(), cloud);
        writeLocal(merged);
        setProgress(merged.progress);
        await saveCloud(user.id, merged);
        if (!cancelled) { syncedFor.current = user.id; setSyncError(false); }
      } catch {
        if (!cancelled) setSyncError(true);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user || syncedFor.current !== user.id) return undefined;
    const t = setTimeout(() => {
      saveCloud(user.id, readLocal()).then(() => setSyncError(false)).catch(() => setSyncError(true));
    }, 800);
    return () => clearTimeout(t);
  }, [progress, user]);

  const isLessonPage = location.pathname.startsWith('/lesson/') || location.pathname.startsWith('/project/') || location.pathname.startsWith('/final/');

  return (
    <SettingsProvider>
    <AppContext.Provider value={{ progress, completeLesson, syncError }}>
      <div className="app-shell">
        {/* Render top navbar on catalog and track pages */}
        {!isLessonPage && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
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
