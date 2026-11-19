import { useState, useContext, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { getModule } from '../data/curriculum';
import { buildSequence, afterUrl, courseHome } from '../data/flow';
import { getModuleContent } from '../content/lessons';
import { Icon } from '../components/art/Illustrations';
import Bit from '../components/art/Bit';
import Reward from '../components/Reward';
import { xpSummary, XP, XP_PER_LEVEL } from '../data/xp';
import { getStreak } from '../utils/activity';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function QuizPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { progress, completeLesson } = useContext(AppContext);
  const mod = getModule(moduleId);
  const quiz = getModuleContent(moduleId)?.quiz;
  const seq = useMemo(() => buildSequence(), []);
  const at = seq.findIndex((e) => e.url === `/quiz/${moduleId}`);
  const prev = at > 0 ? seq[at - 1] : null;
  const next = at >= 0 && at < seq.length - 1 ? seq[at + 1] : null;

  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [reward, setReward] = useState(null);

  if (!mod || !quiz) {
    return <div className="notfound"><h1>Quiz not found</h1><Link to="/python" className="btn btn--primary">Back to course</Link></div>;
  }

  const total = quiz.questions.length;
  const q = quiz.questions[step];
  const score = answers.filter((a, i) => a === quiz.questions[i].answer).length;
  const passMark = Math.ceil(total * (quiz.pass ?? 0.7));
  const passed = score >= passMark;

  const choose = (i) => { if (picked === null) setPicked(i); };
  const advance = () => {
    const nextAnswers = [...answers, picked];
    setAnswers(nextAnswers);
    setPicked(null);
    if (step + 1 >= total) {
      setFinished(true);
      const final = nextAnswers.filter((a, i) => a === quiz.questions[i].answer).length;
      if (final >= passMark && !progress[`${moduleId}-quiz`]) {
        const before = xpSummary(progress, seq);
        const earned = before.earned + XP.quiz;
        completeLesson(`${moduleId}-quiz`);
        setReward({ kind: 'quiz', xp: XP.quiz, before: { level: before.level, intoLevel: before.intoLevel }, after: { level: Math.floor(earned / XP_PER_LEVEL) + 1, intoLevel: earned % XP_PER_LEVEL }, streak: Math.max(1, getStreak()) });
      } else if (final >= passMark) completeLesson(`${moduleId}-quiz`);
    } else {
      setStep(step + 1);
    }
  };
  const retry = () => { setStep(0); setPicked(null); setAnswers([]); setFinished(false); };

  if (finished) {
    return (
      <main className="quiz">
        {reward && <Reward reward={reward} onContinue={() => { setReward(null); navigate(afterUrl(next, moduleId)); }} onStay={() => setReward(null)} />}
        <div className="quiz__card quiz__result">
          <p className="quiz__crumb">{mod.title} · Quiz</p>
          <div className="quiz__badge"><Bit mood={passed ? 'cheer' : 'sad'} size={92} float /></div>
          <h1>{passed ? 'Quiz passed' : 'Not quite yet'}</h1>
          <p className="quiz__score"><strong>{score}</strong> of {total} correct <span>· {passMark} needed to pass</span></p>
          <ol className="quiz__review">
            {quiz.questions.map((qq, i) => {
              const ok = answers[i] === qq.answer;
              return (
                <li key={i} className={ok ? 'is-ok' : 'is-bad'}>
                  <Icon name={ok ? 'check' : 'spark'} size={16} />
                  <div>
                    <p>{qq.q}</p>
                    {!ok && <p className="quiz__why">Correct answer: {qq.options[qq.answer]}. {qq.explain}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
          <div className="quiz__actions">
            <button type="button" className="btn btn--ghost" onClick={retry}>Retake quiz</button>
            <button type="button" className="btn btn--primary" onClick={() => navigate(afterUrl(next, moduleId))}>
              {next ? 'Continue' : 'Back to course'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const revealed = picked !== null;
  return (
    <main className="quiz">
      <div className="quiz__top">
        <Link to={courseHome(moduleId)} className="quiz__back"><Icon name="arrow" size={16} className="flip" /> Course</Link>
        {prev && <Link to={prev.url} className="quiz__back">Previous: {prev.title}</Link>}
        {progress[`${moduleId}-quiz`] && <span className="quiz__passed">Passed earlier</span>}
      </div>
      <div className="quiz__card">
        <p className="quiz__crumb">{mod.title} · Quiz · Question {step + 1} of {total}</p>
        <div className="quiz__bar"><span style={{ width: `${(step / total) * 100}%` }} /></div>
        <h1>{q.q}</h1>
        {q.code && <pre className="quiz__code"><code>{q.code}</code></pre>}
        <ul className="quiz__options">
          {q.options.map((opt, i) => {
            const state = !revealed ? '' : i === q.answer ? 'is-right' : i === picked ? 'is-wrong' : 'is-dim';
            return (
              <li key={i}>
                <button type="button" className={`quiz__option ${state}`} onClick={() => choose(i)} disabled={revealed} aria-pressed={picked === i}>
                  <span className="quiz__letter">{LETTERS[i]}</span>
                  <span>{opt}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {revealed && (
          <div className={`quiz__feedback ${picked === q.answer ? 'is-right' : 'is-wrong'}`} role="status">
            <strong>{picked === q.answer ? 'Correct.' : 'Not quite.'}</strong> {q.explain}
          </div>
        )}
        <div className="quiz__actions">
          <button type="button" className="btn btn--primary" onClick={advance} disabled={!revealed}>
            {step + 1 >= total ? 'See results' : 'Next question'}
          </button>
        </div>
      </div>
    </main>
  );
}
