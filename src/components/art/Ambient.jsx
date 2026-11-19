import { useMemo } from 'react';

/* Stepped, pixel-feeling motion laid over the photo banners.
   Each group is {type, n, x:[min,max], y:[min,max], ...}. Positions are percentages of the banner. */

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SCENES = {
  hero: [
    { type: 'bit', n: 34, x: [8, 96], y: [10, 62], dur: [7, 14] },
    { type: 'fly', n: 14, x: [4, 96], y: [58, 96], dur: [5, 9] },
    { type: 'spark', n: 7, x: [74, 84], y: [70, 84], dur: [1.6, 3] },
    { type: 'glow', n: 1, x: [78.5, 78.5], y: [82, 82], size: 150, color: '255,150,50' },
    { type: 'ray', n: 1, x: [30, 30], y: [0, 0] },
  ],
  python: [
    { type: 'ray', n: 1, x: [22, 22], y: [0, 0] },
    { type: 'fall', n: 22, x: [7.5, 14], y: [37, 58], dur: [0.9, 1.6] },
    { type: 'fly', n: 20, x: [2, 98], y: [18, 92], dur: [6, 12] },
    { type: 'leaf', n: 12, x: [38, 98], y: [0, 48], dur: [9, 16] },
    { type: 'mist', n: 2, x: [0, 0], y: [72, 86] },
  ],
  java: [
    { type: 'puff', n: 16, x: [43, 58], y: [50, 58], dur: [3.5, 6] },
    { type: 'glow', n: 1, x: [4.5, 4.5], y: [16, 16], size: 120, color: '255,225,150' },
    { type: 'glow', n: 1, x: [21.5, 21.5], y: [17, 17], size: 100, color: '255,225,150' },
    { type: 'glow', n: 1, x: [76, 76], y: [12, 12], size: 100, color: '255,225,150' },
    { type: 'glow', n: 1, x: [96, 96], y: [14, 14], size: 110, color: '255,225,150' },
    { type: 'fly', n: 16, x: [4, 96], y: [10, 90], dur: [7, 13], dust: true },
  ],
};

export default function Ambient({ kind, className = '' }) {
  const items = useMemo(() => {
    const r = rng(kind.length * 97 + 11);
    const out = [];
    (SCENES[kind] || []).forEach((g, gi) => {
      for (let i = 0; i < g.n; i += 1) {
        const lerp = ([a, b]) => a + (b - a) * r();
        out.push({
          key: `${gi}-${i}`,
          type: g.type,
          x: lerp(g.x),
          y: lerp(g.y),
          dur: g.dur ? lerp(g.dur) : 6,
          delay: -r() * 12,
          size: g.size,
          color: g.color,
          dust: g.dust,
          txt: r() < 0.5 ? '0' : '1',
          o: i % 2,
        });
      }
    });
    return out;
  }, [kind]);

  return (
    <div className={`amb amb--${kind} ${className}`} aria-hidden="true">
      {items.map((p) => (
        <span
          key={p.key}
          className={`amb__p amb__p--${p.type}${p.dust ? ' is-dust' : ''}${p.o ? ' is-alt' : ''}`}
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            '--dur': `${p.dur}s`, animationDelay: `${p.delay}s`,
            ...(p.size ? { '--size': `${p.size}px` } : {}),
            ...(p.color ? { '--rgb': p.color } : {}),
          }}
        >{p.type === 'bit' ? p.txt : null}</span>
      ))}
    </div>
  );
}
