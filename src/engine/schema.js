/**
 * src/engine/schema.js
 *
 * Defines the 5-screen pedagogical arc and progressive hint contract
 * for StepCode / CodeQuest interactive lessons modeled after Brilliant.org.
 */

export const SCREEN_ROLES = [
  'hook',
  'mental_model',
  'manipulation',
  'bug_hunt',
  'boss_synthesis',
];

export const SCREEN_META = {
  hook: {
    number: 1,
    role: 'hook',
    badge: 'Hook',
    guidance: 'Explore the visual to discover the invariant',
    maxWords: 60,
  },
  mental_model: {
    number: 2,
    role: 'mental_model',
    badge: 'Mental Model',
    guidance: 'Name the invariant and test your intuition',
    maxWords: 75,
  },
  manipulation: {
    number: 3,
    role: 'manipulation',
    badge: 'Manipulation',
    guidance: 'Tune parameters and slot tokens to verify the rule',
    maxWords: 100,
  },
  bug_hunt: {
    number: 4,
    role: 'bug_hunt',
    badge: 'Bug Hunt',
    guidance: 'Find the counterexample and patch the bug',
    maxWords: 100,
  },
  boss_synthesis: {
    number: 5,
    role: 'boss_synthesis',
    badge: 'Boss Synthesis',
    guidance: 'Solve the complete coding challenge with real Python',
    maxWords: 120,
  },
};

export const HINT_TIERS = [
  {
    level: 0,
    key: 'nudge',
    label: 'Nudge',
    icon: '💡',
    blurb: 'A gentle directional hint without giving anything away.',
  },
  {
    level: 1,
    key: 'blueprint',
    label: 'Blueprint',
    icon: '📐',
    blurb: 'The conceptual structure and algorithmic steps to take.',
  },
  {
    level: 2,
    key: 'walkthrough',
    label: 'Walkthrough',
    icon: '🔍',
    blurb: 'A near-complete explanation with code structure or edge-case handling.',
  },
];

/**
 * Returns metadata describing the screen role within the 5-screen arc.
 */
export function getScreenMeta(step) {
  if (!step) return null;
  const role = step.role || step.screenRole;
  if (role && SCREEN_META[role]) {
    return SCREEN_META[role];
  }
  return null;
}

/**
 * Determines whether a step is purely exploratory (no wrong answers, teach-first).
 */
export function isExploreRole(step) {
  if (!step) return false;
  if (step.isTeachingStep) return true;
  const role = step.role || step.screenRole;
  if (role === 'hook') {
    // If it has challenge validation props, it requires verification
    if (
      step.props?.options ||
      step.props?.correctOrder ||
      step.props?.target ||
      step.props?.correctAnswer ||
      step.props?.expectedOutput ||
      step.props?.prediction
    ) {
      return false;
    }
    return true;
  }
  return false;
}

/**
 * Normalizes hints from step/screen into a 3-tier array [nudge, blueprint, walkthrough].
 */
export function normalizeHints(step) {
  if (!step) return [null, null, null];
  const rawHints = step.hints || step.props?.hints;
  if (!rawHints) return [null, null, null];

  if (Array.isArray(rawHints)) {
    return [
      rawHints[0] || null,
      rawHints[1] || null,
      rawHints[2] || null,
    ];
  }

  if (typeof rawHints === 'object') {
    return [
      rawHints.nudge || rawHints[0] || null,
      rawHints.blueprint || rawHints[1] || null,
      rawHints.walkthrough || rawHints[2] || null,
    ];
  }

  if (typeof rawHints === 'string') {
    return [rawHints, null, null];
  }

  return [null, null, null];
}

/**
 * Checks if a step has any hints configured.
 */
export function hasHints(step) {
  return normalizeHints(step).some(Boolean);
}

/**
 * Sorts or validates screens into the standard 5-screen arc order.
 */
export function orderStepsByScreenArc(steps) {
  if (!Array.isArray(steps)) return [];
  const hasRoles = steps.some((s) => s.role && SCREEN_ROLES.includes(s.role));
  if (!hasRoles) return steps;

  const roleOrder = new Map(SCREEN_ROLES.map((role, idx) => [role, idx]));
  return [...steps].sort((a, b) => {
    const orderA = a.role ? roleOrder.get(a.role) ?? 99 : 99;
    const orderB = b.role ? roleOrder.get(b.role) ?? 99 : 99;
    return orderA - orderB;
  });
}
