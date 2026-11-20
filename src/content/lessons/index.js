import { withEngagement } from './engage.js';
import m1_1 from './m1-1/index.js';
import m1_2 from './m1-2/index.js';
import m1_3 from './m1-3/index.js';
import m1_4 from './m1-4/index.js';
import m1_5 from './m1-5/index.js';
import m1_6 from './m1-6/index.js';
import m1_7 from './m1-7/index.js';
import m2_1 from './m2-1/index.js';
import m2_2 from './m2-2/index.js';
import m2_3 from './m2-3/index.js';
import m2_4 from './m2-4/index.js';
import m2_5 from './m2-5/index.js';
import m2_6 from './m2-6/index.js';
import m3_1 from './m3-1/index.js';
import final1 from './final-1/index.js';
import final2 from './final-2/index.js';

// Each module file exports { lessons: { [lessonId]: {...} }, quiz, project }.
const MODULES = { 'm1-1': m1_1, 'm1-2': m1_2, 'm1-3': m1_3, 'm1-4': m1_4, 'm1-5': m1_5, 'm1-6': m1_6, 'm1-7': m1_7, 'm2-1': m2_1, 'm2-2': m2_2, 'm2-3': m2_3, 'm2-4': m2_4, 'm2-5': m2_5, 'm2-6': m2_6, 'm3-1': m3_1 };

export const getModuleContent = (moduleId) => MODULES[moduleId] || null;

export const getLessonContent = (lessonId) => {
  for (const mod of Object.values(MODULES)) {
    const l = mod.lessons[lessonId];
    if (l) return { ...l, body: withEngagement(lessonId, l.body) };
  }
  return null;
};

// Track final projects. Tracks without content yet appear locked on the course page.
const FINALS = { 'track-1': final1, 'track-2': final2 };
export const getTrackFinal = (trackId) => FINALS[trackId] || null;
