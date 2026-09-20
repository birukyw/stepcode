import { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP, getWeekContent } from '../data/roadmap';
import CodeEditor from '../components/CodeEditor';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

export default function ProjectPage() {
  const { weekId } = useParams();
  const { progress, completeItem } = useContext(AppContext);

  const weekContent = getWeekContent(weekId);
  const week = findWeek(weekId);
  const phase = findPhaseForWeek(weekId);

  if (!weekContent || !week || !weekContent.project) {
    return <div style={{ padding: 40 }}>Project not found.</div>;
  }

  const project = weekContent.project;
  const itemId = `${weekId}-project`;
  const isDone = !!progress[itemId];

  const [code, setCode] = useState(project.starterCode || '');
  const [checklist, setChecklist] = useState(
    project.requirements.map(() => false)
  );

  const allChecked = checklist.every(Boolean);

  function toggleReq(i) {
    const updated = [...checklist];
    updated[i] = !updated[i];
    setChecklist(updated);
  }

  function handleSubmit() {
    if (!isDone && allChecked) {
      completeItem(itemId, 'project', 50);
    }
  }

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">›</span>
        <Link to={`/phase/${phase.id}`}>{phase.title}</Link>
        <span className="breadcrumbs__sep">›</span>
        <span className="breadcrumbs__current">Week {week.number} · Project</span>
      </div>

      <div className="project-header">
        <div className="project-header__tag" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <PixelSprite name="sword" size={14} /> Week {week.number} Capstone Quest
        </div>
        <GlitchHeader as="div" className="project-header__title" text={project.title} />
        <div className="lesson-content" dangerouslySetInnerHTML={{ __html: project.description }} />
      </div>

      <div className="lesson-layout">
        {/* Left: Requirements */}
        <div className="lesson-panel">
          <div className="lesson-panel__header">
            <span className="lesson-panel__title lesson-panel__title--tasks">
              📋 Requirements ({checklist.filter(Boolean).length}/{checklist.length})
            </span>
          </div>
          <div className="lesson-panel__body">
            <ul className="project-requirements">
              {project.requirements.map((req, i) => (
                <li key={i} className="project-req" onClick={() => toggleReq(i)}>
                  <input
                    type="checkbox"
                    className="project-req__check"
                    checked={checklist[i]}
                    onChange={() => toggleReq(i)}
                  />
                  <span>{req}</span>
                </li>
              ))}
            </ul>

            {allChecked && !isDone && (
              <button className="btn btn--submit" onClick={handleSubmit} style={{ marginTop: 16 }}>
                🏆 Mark Project Complete (+50 XP)
              </button>
            )}

            {isDone && (
              <div className="exercise-result exercise-result--pass" style={{ marginTop: 16 }}>
                ✅ Project completed! +50 XP earned
              </div>
            )}

            <div className="lesson-nav">
              <Link to={`/phase/${phase.id}`} className="btn btn--reset">← Back to Phase</Link>
            </div>
          </div>
        </div>

        {/* Right: Code workspace */}
        <div className="lesson-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="lesson-panel__header">
            <span className="lesson-panel__title lesson-panel__title--code">
              ⌨️ Workspace — {(project.language || 'java').toUpperCase()}
            </span>
          </div>
          <CodeEditor code={code} language={project.language || 'java'} onChange={setCode} />
        </div>
      </div>
    </div>
  );
}

function findWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    for (const week of phase.weeks) {
      if (week.id === weekId) return week;
    }
  }
  return null;
}

function findPhaseForWeek(weekId) {
  for (const phase of ROADMAP.phases) {
    if (phase.weeks.some(w => w.id === weekId)) return phase;
  }
  return ROADMAP.phases[0];
}
