import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Bit from './art/Bit';

// Bit, the purple guide. He comments on whatever section is in view, and you can drag him anywhere.
// Sections opt in with data-say="bit|text". Double-click him to send him back home.

const ROUTE_GREETING = (path) => {
  if (path.startsWith('/lesson/')) return 'Read a section, then try it in the editor. That is how it sticks.';
  if (path.startsWith('/project/') || path.startsWith('/final/')) return 'Build it in small steps. Run the checks whenever you want feedback.';
  if (path.startsWith('/quiz/')) return 'Take your time. Wrong answers explain themselves.';
  if (path.startsWith('/python') || path.startsWith('/further')) return 'Open a module to see its lessons, quiz and project. You can drag me anywhere.';
  return null;
};

const HEADING_LINES = [
  (h) => `This part, "${h}", is worth reading slowly.`,
  (h) => `Next up: ${h}. Try the example in the editor.`,
  (h) => `${h}. Change a value and see what moves.`,
  (h) => `Good. Now ${h.toLowerCase()}.`,
];

const KEY_POS = 'stepcode_guide_pos';
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* ignore */ } },
};
const readPos = () => { try { return JSON.parse(store.get(KEY_POS)); } catch { return null; } };
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), Math.max(lo, hi));

export default function Companion() {
  const { pathname } = useLocation();
  const [muted, setMuted] = useState(() => store.get('stepcode_buddies_muted') === '1');
  const [line, setLine] = useState(null);
  const [shown, setShown] = useState('');
  const [pos, setPos] = useState(readPos);
  const [dragging, setDragging] = useState(false);
  const hideTimer = useRef();
  const lastText = useRef('');
  const root = useRef(null);
  const grab = useRef(null);

  const say = useCallback((text) => {
    if (!text || text === lastText.current) return;
    lastText.current = text;
    setLine(text);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setLine(null), 4500 + text.length * 30);
  }, []);

  // Typewriter
  useEffect(() => {
    if (!line) { setShown(''); return undefined; }
    let i = 0;
    setShown('');
    const t = setInterval(() => {
      i += 1;
      setShown(line.slice(0, i));
      if (i >= line.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [line]);

  // Greeting on route change, then react to sections as they cross the middle of the screen
  useEffect(() => {
    lastText.current = '';
    setLine(null);
    const greet = setTimeout(() => say(ROUTE_GREETING(pathname)), 700);
    let io;
    const attach = setTimeout(() => {
      const targets = [...document.querySelectorAll('[data-say], .article h2')];
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          if (el.dataset.say) {
            say(el.dataset.say.split('|').slice(1).join('|'));
          } else {
            const h2s = [...document.querySelectorAll('.article h2')];
            const n = Math.max(0, h2s.indexOf(el));
            say(HEADING_LINES[n % HEADING_LINES.length](el.textContent.trim()));
          }
        });
      }, { rootMargin: '-42% 0px -50% 0px' });
      targets.forEach((t) => io.observe(t));
    }, 900);
    return () => { clearTimeout(greet); clearTimeout(attach); io?.disconnect(); };
  }, [pathname, say]);

  // Keep a dragged guide on screen if the window shrinks
  useEffect(() => {
    const onResize = () => setPos((p) => (p ? { x: clamp(p.x, 0, window.innerWidth - 70), y: clamp(p.y, 0, window.innerHeight - 70) } : p));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const onDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const r = root.current.getBoundingClientRect();
    grab.current = { dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width, h: r.height };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onMove = (e) => {
    if (!grab.current) return;
    const g = grab.current;
    setPos({ x: clamp(e.clientX - g.dx, 0, window.innerWidth - g.w), y: clamp(e.clientY - g.dy, 0, window.innerHeight - g.h) });
  };
  const onUp = () => {
    if (!grab.current) return;
    grab.current = null;
    setDragging(false);
    setPos((p) => { if (p) store.set(KEY_POS, JSON.stringify(p)); return p; });
  };
  const goHome = () => { setPos(null); store.del(KEY_POS); };

  const toggleMute = () => {
    const v = !muted;
    setMuted(v);
    store.set('stepcode_buddies_muted', v ? '1' : '0');
    if (v) setLine(null);
  };

  const free = !!pos;
  const nearTop = free && pos.y < 140;
  const inWorkspace = pathname.startsWith('/lesson/') || pathname.startsWith('/project/') || pathname.startsWith('/final/');
  return (
    <aside
      ref={root}
      className={`buddies ${inWorkspace && !free ? 'buddies--bar' : ''} ${free ? 'buddies--free' : ''} ${nearTop ? 'buddies--below' : ''} ${muted ? 'buddies--muted' : ''} ${dragging ? 'is-dragging' : ''}`}
      style={free ? { left: pos.x, top: pos.y, right: 'auto', bottom: 'auto' } : undefined}
      aria-label="Bit, your coding guide"
    >
      {line && !muted && !dragging && (
        <div className="buddies__bubble buddies__bubble--bit" role="status">
          <span className="buddies__name">Bit</span>
          <span>{shown}</span>
        </div>
      )}
      <div
        className="buddies__cast"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onDoubleClick={goHome}
        title="Drag me anywhere. Double-click to send me back."
      >
        <span className="buddies__bit">
          <Bit mood={dragging ? 'cheer' : line ? 'happy' : 'idle'} size={54} float={!line && !dragging} title="Bit" />
        </span>
      </div>
      <button type="button" className="buddies__toggle" onClick={toggleMute} aria-pressed={muted}>
        {muted ? 'Show Bit' : 'Hide Bit'}
      </button>
    </aside>
  );
}
