/**
 * Interactive Lesson Data Schema (Brilliant-Style Step-by-Step Architecture)
 * 
 * Supported Step Types:
 * - EXPLORE: Interactive guided visual demonstration (TEACH FIRST, no test pressure)
 * - STRING_SLICER: Mouse/touch interactive string slicing blade & token dissector
 * - MEMORY_MODEL: Interactive heap memory objects & sticky-note nametags
 * - PIPELINE_FLOW: Mouse-hover/scrubber CPython execution pipeline
 * - ARRAY: Interactive array where learners tap/select elements
 * - PREDICTION: Intuition prediction questions with instant reasoning validation
 * - CODE_FILL: Drag/tap syntax chip placement into code slots
 * - SCRUBBER: Frame-by-frame algorithmic walkthrough with a continuous slider
 * - CODE_CHALLENGE: Interactive live code runner step with real-time test validation
 * - SLIDER: Interactive parameter / Big-O curve explorer
 * - SORT_ORDER: Interactive drag/click to reorder algorithm execution steps
 */

export const STEP_TYPES = {
  EXPLORE: 'interactive-explore',
  STRING_SLICER: 'string-slicer',
  MEMORY_MODEL: 'memory-model',
  PIPELINE_FLOW: 'pipeline-flow',
  TYPE_CASTING: 'type-casting',
  SHORT_CIRCUIT: 'short-circuit',
  BRANCHING: 'branching-track',
  TRUTHINESS_SCALE: 'truthiness-scale',
  ITERATOR_PROTOCOL: 'iterator-protocol',
  LOOP_CONTROL: 'loop-control',
  ARRAY: 'interactive-array',
  PREDICTION: 'prediction-choice',
  CODE_FILL: 'code-fill',
  SCRUBBER: 'algorithm-scrubber',
  CODE_CHALLENGE: 'code-challenge',
  SLIDER: 'parameter-slider',
  SORT_ORDER: 'sort-order'
};

/**
 * @typedef {Object} LessonStep
 * @property {string} id - Unique step identifier
 * @property {number} stepNumber - 1-indexed step sequence number
 * @property {string} title - Guiding step heading
 * @property {string} prompt - Conversational learning prompt & guided intuition
 * @property {string} type - One of STEP_TYPES
 * @property {Object} props - Widget configuration data
 * @property {string} explanation - Clear, intuitive post-submission breakdown or insight
 * @property {boolean} isTeachingStep - If true, does not require right/wrong check; allows learning and exploration first!
 */

/**
 * @typedef {Object} LessonModule
 * @property {string} id - Unique module identifier
 * @property {string} trackId - Career or domain track identifier
 * @property {string} title - Module title
 * @property {string} conceptSummary - High-level summary of the intuition gained
 * @property {boolean} isProOnly - Freemium gating flag
 * @property {LessonStep[]} steps - Ordered array of interactive steps
 */
