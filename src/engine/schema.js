/**
 * StepCode Curriculum & Lesson Engine Schema
 * Defines the 5-Screen Lesson Arc, 3-Tier Progressive Hints, and Step Normalization.
 * 
 * Pedagogical Contract (gemini.md):
 * - Screen 1 (hook): Visual manipulation puzzle to discover invariant (max 60 words).
 * - Screen 2 (mental_model): Name the invariant with guided prediction & misconception feedback (max 75 words).
 * - Screen 3 (manipulation): Parameter tuning and token/code slotting.
 * - Screen 4 (bug_hunt): Counterexample/edge case identification and patch.
 * - Screen 5 (boss_synthesis): Real Python coding challenge with 4 test cases & 3-tier hints.
 */

export const SCREEN_ROLES = [
  'hook',
  'mental_model',
  'manipulation',
  'bug_hunt',
  'boss_synthesis',
];

export const SCREEN_METADATA = {
  hook: {
    role: 'hook',
    number: 1,
    badge: 'Discovery Hook',
    guidance: 'Manipulate the visual to discover the invariant',
    isExplore: true,
  },
  mental_model: {
    role: 'mental_model',
    number: 2,
    badge: 'Mental Model',
    guidance: 'Name the invariant with a guided prediction check',
    isExplore: false,
  },
  manipulation: {
    role: 'manipulation',
    number: 3,
    badge: 'Interactive Lab',
    guidance: 'Tune parameters and slot tokens to verify state',
    isExplore: false,
  },
  bug_hunt: {
    role: 'bug_hunt',
    number: 4,
    badge: 'Bug Hunt',
    guidance: 'Spot the counterexample or edge case and patch the flaw',
    isExplore: false,
  },
  boss_synthesis: {
    role: 'boss_synthesis',
    number: 5,
    badge: 'Boss Synthesis',
    guidance: 'Write real Python to synthesize the concept',
    isExplore: false,
  },
};

export const HINT_TIERS = [
  {
    key: 'nudge',
    level: 0,
    label: 'Nudge',
    icon: '💡',
    blurb: 'A gentle directional hint to nudge you on track',
  },
  {
    key: 'blueprint',
    level: 1,
    label: 'Blueprint',
    icon: '📐',
    blurb: 'Algorithmic outline & state transitions',
  },
  {
    key: 'walkthrough',
    level: 2,
    label: 'Walkthrough',
    icon: '🔍',
    blurb: 'Step-by-step logic and syntax breakdown',
  },
];

/**
 * Returns metadata for a step, determining its position in the 5-screen arc.
 */
export function getScreenMeta(step, fallbackIndex = 0) {
  if (!step) return null;
  const role = step.role || step.screenRole || (step.props && step.props.role);
  if (role && SCREEN_METADATA[role]) {
    return SCREEN_METADATA[role];
  }

  // Fallback based on step number / screen index if available
  const idx = typeof step.screenNumber === 'number'
    ? step.screenNumber - 1
    : typeof fallbackIndex === 'number'
    ? fallbackIndex
    : 0;

  const mappedRole = SCREEN_ROLES[idx % SCREEN_ROLES.length];
  if (mappedRole && SCREEN_METADATA[mappedRole]) {
    return SCREEN_METADATA[mappedRole];
  }

  return {
    role: 'interactive',
    number: idx + 1,
    badge: 'Interactive Step',
    guidance: 'Interact with the step to verify your understanding',
    isExplore: false,
  };
}

/**
 * Determines whether the step should be treated as an exploration/teaching step
 * (meaning no incorrect red state on continue).
 */
export function isExploreRole(step) {
  if (!step) return false;
  if (step.isTeachingStep === true || step.isExplore === true) return true;
  const role = step.role || step.screenRole;
  return role === 'hook';
}

/**
 * Normalizes 3-tier hints array: [nudge, blueprint, walkthrough]
 * Accepts array of strings, object with tier keys, or props.hints.
 */
export function normalizeHints(step) {
  if (!step) return [null, null, null];
  const rawHints = step.hints || (step.props && step.props.hints);

  if (Array.isArray(rawHints)) {
    return [
      rawHints[0] || null,
      rawHints[1] || null,
      rawHints[2] || null,
    ];
  }

  if (rawHints && typeof rawHints === 'object') {
    return [
      rawHints.nudge || rawHints.tier1 || null,
      rawHints.blueprint || rawHints.tier2 || null,
      rawHints.walkthrough || rawHints.tier3 || null,
    ];
  }

  if (step.hint && typeof step.hint === 'string') {
    return [step.hint, null, null];
  }

  return [null, null, null];
}

/**
 * Checks whether any hint tier is available for this step.
 */
export function hasHints(step) {
  const hints = normalizeHints(step);
  return hints.some((h) => Boolean(h && h.trim()));
}

/**
 * Orders steps by the 5-screen pedagogical arc:
 * hook -> mental_model -> manipulation -> bug_hunt -> boss_synthesis
 */
export function orderStepsByScreenArc(steps) {
  if (!Array.isArray(steps)) return [];
  const rolePriority = {
    hook: 1,
    mental_model: 2,
    manipulation: 3,
    bug_hunt: 4,
    boss_synthesis: 5,
  };

  const hasScreenRoles = steps.some((s) => (s.role && rolePriority[s.role]) || (s.screenRole && rolePriority[s.screenRole]));
  if (!hasScreenRoles) return [...steps];

  return [...steps].sort((a, b) => {
    const roleA = a.role || a.screenRole;
    const roleB = b.role || b.screenRole;
    const prioA = rolePriority[roleA] || 99;
    const prioB = rolePriority[roleB] || 99;
    return prioA - prioB;
  });
}
