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
import TrackPage from './pages/TrackPage';
import AuthModal from './components/AuthModal';
import MobileBottomNav from './components/MobileBottomNav';
import { fetchStats, saveStats, saveProgress } from './utils/api';
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
  const [statsLoaded, setStatsLoaded] = useState(false);
  const [progress, setProgress] = useState({});
  const [toast, setToast] = useState(null);
  const [levelUp, setLevelUp] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('codequest_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(() => {
    try {
      return localStorage.getItem('codequest_active_track') || 'java-spring';
    } catch {
      return 'java-spring';
    }
  });

  const changeActiveTrack = (newTrackId) => {
    setActiveTrackId(newTrackId);
    try {
      localStorage.setItem('codequest_active_track', newTrackId);
    } catch {}
  };

  // Load stats and user on mount
  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem('codequest_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) {
            // Only clear credentials if the server explicitly returned 401 Unauthorized
            if (res.status === 401) {
              console.warn('[auth] Session token expired or invalid on server.');
              localStorage.removeItem('codequest_token');
              localStorage.removeItem('codequest_user');
              setCurrentUser(null);
            }
            return null;
          }
          return res.json();
        })
        .then(data => {
          if (data && data.user) {
            setCurrentUser(data.user);
            try {
              localStorage.setItem('codequest_user', JSON.stringify(data.user));
            } catch {}
          }
        })
        .catch(err => {
          console.warn('[auth] Could not verify session with server, keeping cached profile:', err);
        });
    }

    reloadUserData();
  }, []);

  function reloadUserData() {
    fetchStats().then((data) => {
      let localFallback = {};
      try {
        localFallback = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
      } catch {}

      if (data && data.stats) {
        // Safe Merge: Never wipe local completed progress with an empty server progress array!
        const mergedProgress = { ...(localFallback.progress || {}), ...(data.progress || {}) };
        const finalXp = Math.max(data.stats.totalXp || 0, localFallback.stats?.totalXp || 0);
        const finalLevel = Math.max(data.stats.level || 1, Math.floor(finalXp / 200) + 1);

        const mergedStats = {
          ...data.stats,
          totalXp: finalXp,
          level: finalLevel,
        };

        setStats(mergedStats);
        setProgress(mergedProgress);

        if (data.user) {
          setCurrentUser(data.user);
          try {
            localStorage.setItem('codequest_user', JSON.stringify(data.user));
          } catch {}
        }

        try {
          localStorage.setItem('codequest-fallback', JSON.stringify({ stats: mergedStats, progress: mergedProgress }));
        } catch {}
      } else {
        if (localFallback.stats) setStats(localFallback.stats);
        if (localFallback.progress) setProgress(localFallback.progress);
      }
      setStatsLoaded(true);
    }).catch(() => {
      try {
        const fallback = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
        if (fallback.stats) setStats(fallback.stats);
        if (fallback.progress) setProgress(fallback.progress);
      } catch {}
      setStatsLoaded(true);
    });
  }

  function handleAuthSuccess(user, token) {
    if (token) {
      try {
        localStorage.setItem('codequest_token', token);
      } catch {}
    }
    setCurrentUser(user);
    try {
      localStorage.setItem('codequest_user', JSON.stringify(user));
    } catch {}

    // Sync any local progress & stats to this user in backend database!
    try {
      const fallback = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
      if (fallback.progress) {
        Object.entries(fallback.progress).forEach(([itemId, itemData]) => {
          saveProgress(itemId, itemData.type || 'lesson', itemData.xpEarned || 10);
        });
      }
      if (fallback.stats) {
        saveStats(fallback.stats);
      }
    } catch {}

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
    localStorage.removeItem('codequest_user');
    localStorage.removeItem('codequest-fallback');
    setCurrentUser(null);
    setStats({
      totalXp: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    });
    setProgress({});
    showToast('Logged out');
  }

  // Update streak only AFTER stats are loaded
  useEffect(() => {
    if (!statsLoaded) return;
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newStreak = stats.lastActiveDate === yesterday ? stats.currentStreak + 1 : 1;
      const updated = {
        ...stats,
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, stats.longestStreak || 0),
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
  }, [statsLoaded]);

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

    // Persist to SQLite server database with Authorization header!
    saveProgress(itemId, type, xp, extra);
  }

  // All courses and phases are completely unlocked for free exploration
  function isPhaseUnlocked() {
    return true;
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
    activeTrackId, changeActiveTrack,
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
            <Route path="/track/:trackId" element={<TrackPage />} />
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
