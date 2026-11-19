/* Brilliant-style progress ring: the level sits in the middle, XP fills the ring. */
export default function LevelRing({ level, pct = 0, size = 44, stroke = 4, label = true, className = '' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className={`ring ${className}`} style={{ width: size, height: size }} role="img" aria-label={`Level ${level}, ${Math.round(pct)}% to the next level`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffd23f" /><stop offset="1" stopColor="#ff9f43" /></linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring__track" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#ringGrad)" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c * (1 - Math.min(Math.max(pct, 0), 100) / 100)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`} className="ring__fill"
        />
      </svg>
      {label && <b className="ring__lv" style={{ fontSize: size * 0.4 }}>{level}</b>}
    </span>
  );
}
