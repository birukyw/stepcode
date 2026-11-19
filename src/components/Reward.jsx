import { useEffect, useMemo, useState } from 'react';
import Bit from './art/Bit';
import LevelRing from './LevelRing';
import { Icon } from './art/Illustrations';

const TITLES = { lesson: 'Lesson complete', quiz: 'Quiz passed', project: 'Project complete', final: 'Final project complete' };
const COLORS = ['#7c6cff', '#ffd23f', '#4cd4a0', '#ff8fb8', '#5bb8ff'];

/** Brilliant-style reward: confetti, Bit cheering, XP earned and a level ring that fills. */
export default function Reward({ reward, onContinue, onStay }) {
  const { kind, xp, before, after, streak } = reward;
  const [pct, setPct] = useState(before.intoLevel);
  const [count, setCount] = useState(0);
  const [shownLevel, setShownLevel] = useState(before.level);
  const leveled = after.level > before.level;

  const bits = useMemo(() => Array.from({ length: 34 }, (_, i) => ({
    left: Math.round(((i * 37) % 100)), delay: ((i * 53) % 90) / 100, dur: 2.2 + ((i * 17) % 14) / 10, rot: (i * 47) % 360,
    c: COLORS[i % COLORS.length], w: 6 + (i % 3) * 3, round: i % 4 === 0,
  })), []);

  useEffect(() => {
    const t = setTimeout(() => setPct(leveled ? 100 : after.intoLevel), 350);
    let n = 0;
    const iv = setInterval(() => { n += Math.max(1, Math.round(xp / 18)); if (n >= xp) { n = xp; clearInterval(iv); } setCount(n); }, 35);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, [xp, leveled, after.intoLevel]);

  useEffect(() => {
    if (!leveled) return undefined;
    const t = setTimeout(() => { setShownLevel(after.level); setPct(after.intoLevel); }, 1500);
    return () => clearTimeout(t);
  }, [leveled, after.intoLevel, after.level]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Enter') onContinue(); if (e.key === 'Escape') (onStay || onContinue)(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onContinue, onStay]);

  return (
    <div className="reward" role="dialog" aria-modal="true" aria-label={TITLES[kind]}>
      <div className="reward__confetti" aria-hidden="true">
        {bits.map((b, i) => (
          <i key={i} style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, animationDuration: `${b.dur}s`, background: b.c, width: b.w, height: b.w * (b.round ? 1 : 1.6), borderRadius: b.round ? '50%' : 2, transform: `rotate(${b.rot}deg)` }} />
        ))}
      </div>
      <div className="reward__card">
        <Bit mood="cheer" size={112} float />
        <h2>{TITLES[kind] || TITLES.lesson}</h2>
        <p className="reward__xp"><Icon name="bolt" size={20} /> +{count} XP</p>

        <div className="reward__level">
          <LevelRing level={shownLevel} pct={pct} size={72} stroke={6} />
          <div>
            <p className="reward__lvtitle">{leveled ? `Level ${after.level} reached` : `Level ${after.level}`}</p>
            <p className="reward__lvsub">{leveled ? 'Nice. A new level unlocked.' : `${100 - after.intoLevel} XP to level ${after.level + 1}`}</p>
          </div>
        </div>

        {streak > 0 && (
          <p className="reward__streak"><Icon name="flame" size={18} /> {streak} day streak</p>
        )}

        <div className="reward__actions">
          <button type="button" className="cx-btn cx-btn--lg" onClick={onContinue} autoFocus>Continue</button>
          {onStay && <button type="button" className="reward__link" onClick={onStay}>Stay here</button>}
        </div>
      </div>
    </div>
  );
}
