import { useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { ROADMAP, getWeekContent } from '../data/roadmap';
import PixelSprite from '../components/PixelSprite';
import GlitchHeader from '../components/GlitchHeader';

export default function QuizPage() {
  const { weekId } = useParams();
  const navigate = useNavigate();
  const { progress, completeItem } = useContext(AppContext);

  const weekContent = getWeekContent(weekId);
  const week = findWeek(weekId);
  const phase = findPhaseForWeek(weekId);

  if (!weekContent || !week || !weekContent.quiz || weekContent.quiz.length === 0) {
    return <div style={{ padding: 40 }}>Quiz not found.</div>;
  }

  const quiz = weekContent.quiz;
  const itemId = `${weekId}-quiz`;
  const isDone = !!progress[itemId];

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const question = quiz[currentQ];
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  function handleSelect(optionIndex) {
    if (answered) return;
    setSelected(optionIndex);
  }

  function handleCheck() {
    if (selected === null) return;
    setAnswered(true);
    setAnswers([...answers, { selected, correct: question.correctIndex }]);
  }

  function handleNext() {
    if (currentQ < quiz.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      // Show results
      const finalAnswers = [...answers];
      const correctCount = finalAnswers.filter(a => a.selected === a.correct).length;
      const xp = correctCount * 10;
      if (!isDone) completeItem(itemId, 'quiz', xp, { score: correctCount });
      setShowResults(true);
    }
  }

  if (showResults) {
    const correctCount = answers.filter(a => a.selected === a.correct).length;
    const emoji = correctCount === quiz.length ? '🏆' : correctCount >= quiz.length * 0.7 ? '⭐' : '📚';
    return (
      <div>
        <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span className="breadcrumbs__sep">›</span>
          <Link to={`/phase/${phase.id}`}>{phase.title}</Link>
          <span className="breadcrumbs__sep">›</span>
          <span className="breadcrumbs__current">Module {week.moduleNumber || week.number} · Quiz Results</span>
        </div>
        <div className="quiz-container">
          <div className="quiz-result">
            <div className="quiz-pixel-result">
              <img src="/images/pixel_cyber_mascot.jpg" alt="Cyber Mascot" className="quiz-pixel-result__avatar" />
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <PixelSprite name={correctCount >= quiz.length * 0.7 ? "trophy" : "chip"} size={22} animated />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', color: 'var(--cyan)' }}>
                  {correctCount === quiz.length ? 'SECTOR CLEARED' : 'MISSION COMPLETED'}
                </span>
              </div>
            </div>
            <GlitchHeader as="div" className="quiz-result__score" text={`${correctCount} / ${quiz.length}`} />
            <div className="quiz-result__msg">
              {correctCount === quiz.length ? 'Perfect score! You nailed it!' :
               correctCount >= quiz.length * 0.7 ? 'Great job! Keep it up!' :
               'Review the lessons and try again. You got this!'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--yellow)', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <PixelSprite name="chip" size={14} /> +{correctCount * 10} XP earned
            </div>
            <Link to={`/phase/${phase.id}`} className="btn btn--next">Back to Phase →</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span className="breadcrumbs__sep">›</span>
        <Link to={`/phase/${phase.id}`}>{phase.title}</Link>
        <span className="breadcrumbs__sep">›</span>
        <span className="breadcrumbs__current">Module {week.moduleNumber || week.number} · Quiz</span>
      </div>

      <div className="quiz-container">
        <div className="quiz-header">
          <GlitchHeader as="div" text={`🧪 Module ${week.moduleNumber || week.number} Quiz`} style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }} />
          <div style={{ fontSize: 14, color: 'var(--text-dim)', marginTop: 4 }}>{week.title}</div>
        </div>

        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          {quiz.map((_, i) => {
            let bg = 'var(--border-dim)';
            if (i === currentQ) bg = 'var(--cyan)';
            else if (answers[i]) {
              bg = answers[i].selected === answers[i].correct ? 'var(--green-bright)' : 'var(--red)';
            }
            return <div key={i} style={{ width: 24, height: 4, borderRadius: 2, background: bg }} />;
          })}
        </div>

        <div className="quiz-question">
          <div className="quiz-progress-text">Question {currentQ + 1} of {quiz.length}</div>
          <div className="quiz-question__text">{question.question}</div>
          {question.code && (
            <pre style={{ background: 'var(--bg-editor)', border: '1px solid var(--border)', borderRadius: 6, padding: 12, fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--white)', margin: '12px 0' }}>{question.code}</pre>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {question.options.map((opt, i) => {
              let cls = 'quiz-option';
              if (selected === i) cls += ' quiz-option--selected';
              if (answered) {
                if (i === question.correctIndex) cls += ' quiz-option--correct';
                else if (i === selected) cls += ' quiz-option--wrong';
              }
              return (
                <div key={i} className={cls} onClick={() => handleSelect(i)}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: 'var(--text-dim)', minWidth: 24 }}>{letters[i]}</span>
                  <span>{opt}</span>
                </div>
              );
            })}
          </div>

          {answered && question.explanation && (
            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: 'rgba(79,195,247,0.06)', borderLeft: '3px solid var(--cyan)',
              borderRadius: '0 6px 6px 0', fontSize: 13, color: 'var(--cyan)',
            }}>
              💡 {question.explanation}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          {!answered ? (
            <button className="btn btn--submit" onClick={handleCheck} disabled={selected === null}>
              Check Answer
            </button>
          ) : (
            <button className="btn btn--next" onClick={handleNext}>
              {currentQ < quiz.length - 1 ? 'Next Question →' : 'See Results →'}
            </button>
          )}
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
