import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Navbar from './components/Navbar';
import XPToast from './components/XPToast';
import LevelUpModal from './components/LevelUpModal';
import Dashboard from './pages/Dashboard';
import PhasePage from './pages/PhasePage';
import LessonPage from './pages/LessonPage';
import ExercisePage from './pages/ExercisePage';
import QuizPage from './pages/QuizPage';
import ProjectPage from './pages/ProjectPage';
import AuthModal from './components/AuthModal';
import MobileBottomNav from './components/MobileBottomNav';
import { fetchStats, saveStats } from './utils/api';
import { ROADMAP } from './data/roadmap';

export const AppContext = createContext();

export default function App() {
  const [stats, setStats] = useState({
    totalXp: 0,
    level: 1,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
  });
  const [progress, setProgress] = useState({});
  const [toast, setToast] = useState(null);
  const [levelUp, setLevelUp] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Load stats and user on mount
  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('codequest_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) setCurrentUser(data.user);
        })
        .catch(() => {});
    }

    reloadUserData();
  }, []);

  function reloadUserData() {
    fetchStats().then((data) => {
      if (data && data.stats) {
        setStats(data.stats);
        setProgress(data.progress || {});
        if (data.user) setCurrentUser(data.user);
        try {
          localStorage.setItem('codequest-fallback', JSON.stringify(data));
        } catch {}
      } else {
        try {
          const fallback = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
          if (fallback.stats) setStats(fallback.stats);
          if (fallback.progress) setProgress(fallback.progress);
        } catch {}
      }
    });
  }

  function handleAuthSuccess(user) {
    setCurrentUser(user);
    reloadUserData();
    showToast(`Welcome back, ${user.username}! 👾`);
  }

  function handleLogout() {
    const token = localStorage.getItem('codequest_token');
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    localStorage.removeItem('codequest_token');
    setCurrentUser(null);
    reloadUserData();
    showToast('Logged out');
  }

  // Update streak on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = stats.lastActiveDate === yesterday ? stats.currentStreak + 1 : 1;
      const updated = {
        ...stats,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, stats.longestStreak),
        lastActiveDate: today,
      };
      setStats(updated);
      saveStats(updated);
      try {
        const stored = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
        stored.stats = updated;
        localStorage.setItem('codequest-fallback', JSON.stringify(stored));
      } catch {}
    }
  }, []);

  function showToast(text) {
    setToast(text);
    setTimeout(() => setToast(null), 2000);
  }

  function awardXP(amount, source) {
    const newXP = stats.totalXp + amount;
    const newLevel = Math.floor(newXP / 200) + 1;
    const didLevelUp = newLevel > stats.level;
    const updated = { ...stats, totalXp: newXP, level: newLevel };
    setStats(updated);
    saveStats(updated);
    try {
      const stored = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
      stored.stats = updated;
      localStorage.setItem('codequest-fallback', JSON.stringify(stored));
    } catch {}
    showToast(`+${amount} XP ⚡`);
    if (didLevelUp) {
      setTimeout(() => setLevelUp({ level: newLevel, source }), 600);
    }
  }

  function completeItem(itemId, type, xp = 10, extra = {}) {
    if (progress[itemId]) return; // already done
    const updated = { ...progress, [itemId]: { type, completedAt: new Date().toISOString(), ...extra } };
    setProgress(updated);
    awardXP(xp, itemId);
    
    // Immediate localStorage cache backup
    try {
      const stored = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
      stored.progress = updated;
      localStorage.setItem('codequest-fallback', JSON.stringify(stored));
    } catch {}

    // Persist to SQLite server database
    fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ itemId, type, xp, ...extra }),
    }).catch(() => {});
  }

  // Calculate phase unlock status
  function isPhaseUnlocked(phaseIndex) {
    if (phaseIndex === 0) return true;
    const prevPhase = ROADMAP.phases[phaseIndex - 1];
    const prevItems = getPhaseItems(prevPhase);
    const completedCount = prevItems.filter(id => progress[id]).length;
    // Unlock if at least 70% of previous phase is done
    return completedCount >= Math.floor(prevItems.length * 0.7);
  }

  function getPhaseItems(phase) {
    const items = [];
    phase.weeks.forEach(week => {
      week.lessons?.forEach((_, i) => items.push(`${week.id}-lesson-${i}`));
      week.exercises?.forEach((_, i) => items.push(`${week.id}-exercise-${i}`));
      if (week.quiz?.length) items.push(`${week.id}-quiz`);
      if (week.project) items.push(`${week.id}-project`);
    });
    return items;
  }

  function getPhaseProgress(phase) {
    const items = getPhaseItems(phase);
    const done = items.filter(id => progress[id]).length;
    return { done, total: items.length, pct: items.length ? Math.round((done / items.length) * 100) : 0 };
  }

  const ctx = {
    stats, progress, toast, levelUp,
    currentUser, openAuthModal: () => setAuthModalOpen(true), logout: handleLogout,
    showToast, awardXP, completeItem,
    isPhaseUnlocked, getPhaseProgress, getPhaseItems,
    setLevelUp,
  };

  const location = useLocation();
  const isFullWidth = location.pathname.startsWith('/lesson/') || location.pathname.startsWith('/exercise/');

  return (
    <AppContext.Provider value={ctx}>
      <div className="app-shell">
        <Navbar />
        <main className={`main-content ${isFullWidth ? 'main-content--full' : ''}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/phase/:phaseId" element={<PhasePage />} />
            <Route path="/lesson/:weekId/:lessonIndex" element={<LessonPage />} />
            <Route path="/exercise/:weekId/:exerciseIndex" element={<ExercisePage />} />
            <Route path="/quiz/:weekId" element={<QuizPage />} />
            <Route path="/project/:weekId" element={<ProjectPage />} />
          </Routes>
        </main>
        <XPToast message={toast} />
        <LevelUpModal data={levelUp} onClose={() => setLevelUp(null)} />
        {authModalOpen && (
          <AuthModal
            onClose={() => setAuthModalOpen(false)}
            onSuccess={handleAuthSuccess}
          />
        )}
        <MobileBottomNav />
      </div>
    </AppContext.Provider>
  );
}
