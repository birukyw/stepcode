// Daily activity for the streak. Dates are local calendar days (YYYY-MM-DD).
const KEY = 'stepcode_activity';
const day = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const read = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; } };

export function recordActivity() {
  const days = read();
  const today = day();
  if (!days.includes(today)) {
    days.push(today);
    try { localStorage.setItem(KEY, JSON.stringify(days.slice(-400))); } catch { /* ignore */ }
  }
}

/** Consecutive days of activity ending today (or yesterday, so the streak survives until you miss a day). */
export function getStreak() {
  const days = new Set(read());
  const d = new Date();
  if (!days.has(day(d))) d.setDate(d.getDate() - 1);
  let n = 0;
  while (days.has(day(d))) { n += 1; d.setDate(d.getDate() - 1); }
  return n;
}
