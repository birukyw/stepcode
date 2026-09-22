// ─── Machine Learning & AI Engineering Track Content ────────────────────────
// Aggregates all 5 phases (Modules 1–18, 142 lessons)

import { mlPhase1Content } from './ml/phase1Math.js';
import { mlPhase2Content } from './ml/phase2Classical.js';
import { mlPhase3Content } from './ml/phase3DeepLearning.js';
import { mlPhase4Content } from './ml/phase4GenAI.js';
import { mlPhase5Content } from './ml/phase5MLOps.js';

export const mlTrackContent = {
  ...mlPhase1Content,
  ...mlPhase2Content,
  ...mlPhase3Content,
  ...mlPhase4Content,
  ...mlPhase5Content
};
