// XP model: every lesson, quiz and project is worth XP. The progress bar everywhere is XP earned / XP available.
export const XP = { lesson: 10, quiz: 25, project: 50, final: 100 };
export const XP_PER_LEVEL = 100;

export function xpSummary(progress, seq) {
  const counts = { lesson: { done: 0, total: 0 }, quiz: { done: 0, total: 0 }, project: { done: 0, total: 0 } };
  let earned = 0;
  let total = 0;
  seq.forEach((e) => {
    const bucket = e.kind === 'final' ? 'project' : e.kind;
    counts[bucket].total += 1;
    total += XP[e.kind];
    if (progress[e.key]) { counts[bucket].done += 1; earned += XP[e.kind]; }
  });
  const level = Math.floor(earned / XP_PER_LEVEL) + 1;
  return { earned, total, pct: total ? Math.round((earned / total) * 100) : 0, level, intoLevel: earned % XP_PER_LEVEL, counts };
}
