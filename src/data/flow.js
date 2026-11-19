import { COURSES, getCourse, courseOfModule } from './curriculum';
import { getLessonContent, getModuleContent, getTrackFinal } from '../content/lessons';

// Ordered list of everything a learner can open, so Next/Previous work across lessons, quizzes, projects and finals.
export function buildSequence(slug) {
  const seq = [];
  const courses = slug ? [getCourse(slug)].filter(Boolean) : COURSES;
  courses.flatMap((c) => c.sections).forEach((section) => {
    section.modules.forEach((mod) => {
      mod.lessons.forEach((lesson, index) => {
        if (getLessonContent(lesson.id)) {
          seq.push({ kind: 'lesson', moduleId: mod.id, index, id: lesson.id, title: lesson.title, url: `/lesson/${mod.id}/${index}`, key: `${mod.id}-lesson-${index}` });
        }
      });
      const extra = getModuleContent(mod.id);
      if (extra?.quiz) seq.push({ kind: 'quiz', moduleId: mod.id, id: `${mod.id}-quiz`, title: 'Module quiz', url: `/quiz/${mod.id}`, key: `${mod.id}-quiz` });
      if (extra?.project) seq.push({ kind: 'project', moduleId: mod.id, id: `${mod.id}-project`, title: extra.project.title, url: `/project/${mod.id}`, key: `${mod.id}-project` });
    });
    const fin = section.final && getTrackFinal(section.final.id);
    if (fin) {
      seq.push({ kind: 'final', moduleId: fin.moduleId, id: `${section.final.id}-final`, title: fin.project.title, url: `/final/${section.final.id}`, key: `${section.final.id}-final` });
    }
  });
  return seq;
}

// Where to go after finishing something: the next item in the same course, otherwise back to the course page
// (or the page of the course that comes next, so a finished beginner lands on the extras).
export function afterUrl(next, moduleId) {
  const here = courseOfModule(moduleId);
  if (next && courseOfModule(next.moduleId)?.id === here?.id) return next.url;
  return (next ? courseOfModule(next.moduleId) : here)?.path || '/python';
}
export const courseHome = (moduleId) => courseOfModule(moduleId)?.path || '/python';
