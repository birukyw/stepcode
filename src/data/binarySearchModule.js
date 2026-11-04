import { STEP_TYPES } from '../types/lesson.js';

/**
 * Binary Search Intuition Module (Brilliant-Style Interactive Curriculum)
 */
export const binarySearchModule = {
  id: 'dsa-bs-1',
  trackId: 'dsa',
  title: 'Binary Search Intuition',
  conceptSummary: 'Understand how sorted order enables logarithmic O(log N) elimination in search algorithms.',
  isProOnly: false,
  steps: [
    {
      id: 'bs-step-1',
      stepNumber: 1,
      title: 'Where Do We Look First?',
      prompt: 'In a sorted array of 10 items, tap the midpoint element where binary search checks first:',
      type: STEP_TYPES.ARRAY,
      props: {
        initialArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        targetIndex: 4,
        targetValue: 23
      },
      explanation: 'Probing index 4 (value 16) allows us to compare against the middle element and eliminate half of the remaining items in a single operation.'
    },
    {
      id: 'bs-step-2',
      stepNumber: 2,
      title: 'Deducing the Next Region',
      prompt: 'Our target is 23, and our midpoint value is 16. Since 23 > 16, what can we deduce?',
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          {
            id: 'opt-1',
            text: 'Discard the left half (all values ≤ 16)',
            isCorrect: true
          },
          {
            id: 'opt-2',
            text: 'Discard the right half (all values > 16)',
            isCorrect: false
          },
          {
            id: 'opt-3',
            text: 'We cannot eliminate anything yet without checking all numbers',
            isCorrect: false
          }
        ]
      },
      explanation: 'Because the list is sorted in ascending order, if our target is greater than the middle number (23 > 16), it is mathematically impossible for 23 to exist in the left half.'
    },
    {
      id: 'bs-step-3',
      stepNumber: 3,
      title: 'Pointer Adjustment',
      prompt: "When discarding the left half, where must our new 'low' search pointer move?",
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: 'if target > arr[mid]:\n    low = {slot1}',
        chips: ['mid + 1', 'mid - 1', 'mid * 2'],
        correctAnswer: 'mid + 1'
      },
      explanation: "Since index 'mid' was already checked and was too small, the earliest candidate index for 'low' is mid + 1."
    },
    {
      id: 'bs-step-4',
      stepNumber: 4,
      title: 'Watch the Search Space Shrink',
      prompt: 'Scrub through the slider below to watch pointers narrow down to the target 23:',
      type: STEP_TYPES.SCRUBBER,
      props: {
        initialArray: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
        totalSteps: 3,
        frames: [
          {
            low: 0,
            mid: 4,
            high: 9,
            eliminated: [],
            desc: 'Initial check: low=0, mid=4 (val 16), high=9. Target 23 is larger than 16.'
          },
          {
            low: 5,
            mid: 7,
            high: 9,
            eliminated: [0, 1, 2, 3, 4],
            desc: 'Discard left: low moves to 5, high remains 9. Mid updates to 7 (val 56). Target 23 is smaller.'
          },
          {
            low: 5,
            mid: 5,
            high: 6,
            eliminated: [0, 1, 2, 3, 4, 7, 8, 9],
            desc: 'Discard right: high moves to 6. Mid updates to 5 (val 23). Match found!'
          }
        ]
      },
      explanation: 'Notice how the search space shrunk from 10 elements to 4, then to 1. In just 3 comparisons, we found our item. That is O(log N) logarithmic speed in action!'
    }
  ]
};

/**
 * Sample full curriculum for the Syllabus Roadmap
 */
export const sampleCurriculum = [
  binarySearchModule,
  {
    id: 'dsa-twoptr-2',
    trackId: 'dsa',
    title: 'Two-Pointer Technique & Convergence',
    conceptSummary: 'Master how converging inward pointers eliminate duplicate state checks from O(N²) down to linear O(N).',
    isProOnly: true,
    steps: []
  },
  {
    id: 'dsa-sliding-3',
    trackId: 'dsa',
    title: 'Sliding Window Invariants',
    conceptSummary: 'Build visual intuition for dynamic sub-array bounds, character frequency tables, and monotonic queues.',
    isProOnly: true,
    steps: []
  },
  {
    id: 'dsa-graphs-4',
    trackId: 'dsa',
    title: 'Breadth-First Search & Shortest Paths',
    conceptSummary: 'Visualize level-order traversal, queue states, and unweighted shortest-path guarantees.',
    isProOnly: true,
    steps: []
  }
];
