import { STEP_TYPES } from '../types/lesson.js';
import { getHandcraftedSteps } from '../data/interactiveLessonsLibrary.js';

/**
 * Strips HTML tags and extracts clean text.
 */
function cleanText(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extracts a specific callout from lesson HTML content.
 */
function extractCallout(html, className) {
  if (!html) return null;
  const regex = new RegExp(`<div[^>]*class=["'][^"']*${className}[^"']*["'][^>]*>([\\s\\S]*?)<\\/div>`, 'i');
  const match = html.match(regex);
  if (match && match[1]) {
    return cleanText(match[1]);
  }
  return null;
}

/**
 * Extracts key paragraphs or headings.
 */
function extractFirstParagraph(html) {
  if (!html) return '';
  const match = html.match(/<p>([\s\S]*?)<\/p>/i);
  if (match && match[1]) {
    return cleanText(match[1]);
  }
  return cleanText(html).slice(0, 200) + '...';
}

/**
 * Generates interactive Brilliant-style steps for ANY lesson.
 */
export function getInteractiveStepsForLesson(lesson, weekContent, weekId, lessonIndex) {
  if (!lesson) return [];

  // 1. Check if the lesson already has explicit screens (5-screen arc) or steps
  if (lesson.screens && Array.isArray(lesson.screens) && lesson.screens.length > 0) {
    return lesson.screens;
  }
  if (lesson.steps && Array.isArray(lesson.steps) && lesson.steps.length > 0) {
    return lesson.steps;
  }

  // 2. Check the handcrafted interactive lessons library
  const handcrafted = getHandcraftedSteps(weekId, lessonIndex);
  if (handcrafted && handcrafted.length > 0) {
    return handcrafted;
  }

  // 3. Intelligently generate 4 to 5 rich Brilliant-style interactive steps
  const steps = [];
  const title = lesson.title || 'Lesson Overview';
  const language = lesson.language || 'python';
  const content = lesson.content || '';
  const starterCode = lesson.starterCode || '';

  const intuition = extractCallout(content, 'teacher-callout--intuition') ||
                    extractCallout(content, 'teacher-callout--analogy') ||
                    extractFirstParagraph(content);

  const analogy = extractCallout(content, 'teacher-callout--analogy');
  const trap = extractCallout(content, 'teacher-callout--trap');

  // STEP 1: Core Intuition & The Big Picture (Teach First with EXPLORE widget)
  steps.push({
    id: `step-gen-${weekId}-${lessonIndex}-1`,
    stepNumber: 1,
    title: `Visual Intuition: ${title.split(':')[0]}`,
    prompt: `Before diving into code or questions, explore the core mental model of ${title}. Click through the visual insights below to build strong intuition first:`,
    type: STEP_TYPES.EXPLORE,
    isTeachingStep: true,
    props: {
      insights: [
        {
          title: 'The Core Mental Model',
          icon: '🧠',
          tag: 'Intuition',
          summary: intuition || `In ${language}, ${title} provides a clean, predictable way to organize data structures and compute state.`
        },
        {
          title: analogy ? 'Real-World Analogy' : 'How the Engine Runs It',
          icon: '⚡',
          tag: 'Mechanics',
          summary: analogy || `The runtime interprets these instructions sequentially, verifying syntax before executing bytecode in memory.`
        },
        {
          title: 'Common Trap to Avoid',
          icon: '⚠️',
          tag: 'Watch Out',
          summary: trap || `Avoid overcomplicating simple logic. Start with clear, readable representations before optimizing.`
        }
      ]
    },
    explanation: 'Exploring the mental model before solving questions makes complex engineering natural and intuitive!'
  });

  // STEP 2: Code Fill-in-the-Blank (Chip Placement)
  if (starterCode && starterCode.trim().length > 10) {
    const codeLines = starterCode.split('\n').filter(l => l.trim() && !l.trim().startsWith('#') && !l.trim().startsWith('//'));
    const candidateLine = codeLines.find(l => l.includes('=') || l.includes('return') || l.includes('if') || l.includes('for') || l.includes('print')) || codeLines[0] || 'print("Hello, World!")';

    // Pick a token to replace
    let token = '';
    let template = '';
    let distractors = [];

    if (candidateLine.includes('return ')) {
      token = 'return';
      template = candidateLine.replace('return', '{slot1}');
      distractors = ['yield', 'pass', 'break'];
    } else if (candidateLine.includes('def ')) {
      token = 'def';
      template = candidateLine.replace('def', '{slot1}');
      distractors = ['function', 'class', 'lambda'];
    } else if (candidateLine.includes('print(')) {
      token = 'print';
      template = candidateLine.replace('print', '{slot1}');
      distractors = ['echo', 'log', 'write'];
    } else if (candidateLine.includes('while ')) {
      token = 'while';
      template = candidateLine.replace('while', '{slot1}');
      distractors = ['for', 'loop', 'until'];
    } else if (candidateLine.includes('for ')) {
      token = 'for';
      template = candidateLine.replace('for', '{slot1}');
      distractors = ['while', 'each', 'loop'];
    } else {
      const words = candidateLine.trim().split(/\s+/);
      token = words[0] || 'val';
      template = candidateLine.replace(token, '{slot1}');
      distractors = ['None', 'null', 'temp'];
    }

    const chips = [token, ...distractors.slice(0, 2)].sort(() => Math.random() - 0.5);

    steps.push({
      id: `step-gen-${weekId}-${lessonIndex}-2`,
      stepNumber: 2,
      title: 'Interactive Syntax & Mechanics',
      prompt: `Place the correct keyword or token into the code slot below to complete the syntax:`,
      type: STEP_TYPES.CODE_FILL,
      props: {
        template: template,
        chips: chips,
        correctAnswer: token
      },
      explanation: `Placing \`${token}\` properly fulfills the language semantics and allows the execution engine to interpret the statement correctly.`
    });
  } else {
    // If no starter code, supply a prediction card
    steps.push({
      id: `step-gen-${weekId}-${lessonIndex}-2`,
      stepNumber: 2,
      title: 'Structural Reasoning',
      prompt: `In this architecture, how does the system ensure data integrity and prevent unintended side effects?`,
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'By encapsulating state and using strict invariants or immutable structures.', isCorrect: true },
          { id: 'opt-2', text: 'By allowing any function anywhere to globally overwrite values.', isCorrect: false },
          { id: 'opt-3', text: 'By ignoring error checks and hoping the input is always valid.', isCorrect: false }
        ]
      },
      explanation: 'Clear invariants and controlled access prevent state corruption and make distributed systems reliable.'
    });
  }

  // STEP 3: Conceptual Gotcha / Week Quiz Check (Prediction Card)
  const quizzes = weekContent?.quiz || [];
  const matchedQuiz = quizzes[lessonIndex % Math.max(1, quizzes.length)];

  if (matchedQuiz && matchedQuiz.question && Array.isArray(matchedQuiz.options)) {
    const correctIdx = matchedQuiz.correctIndex !== undefined ? matchedQuiz.correctIndex : 0;
    const formattedOptions = matchedQuiz.options.map((opt, oIdx) => ({
      id: `quiz-opt-${oIdx}`,
      text: opt,
      isCorrect: oIdx === correctIdx
    }));

    steps.push({
      id: `step-gen-${weekId}-${lessonIndex}-3`,
      stepNumber: 3,
      title: 'Check Your Deduction',
      prompt: matchedQuiz.question,
      type: STEP_TYPES.PREDICTION,
      props: {
        options: formattedOptions
      },
      explanation: matchedQuiz.explanation || `Understanding this nuance ensures you avoid subtle edge-case bugs in production code.`
    });
  } else if (trap) {
    steps.push({
      id: `step-gen-${weekId}-${lessonIndex}-3`,
      stepNumber: 3,
      title: 'Avoiding Common Pitfalls',
      prompt: `Beware: ${trap.slice(0, 200)}... What is the best strategy to guard against this pitfall?`,
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'Follow established language idioms and validate edge cases defensively.', isCorrect: true },
          { id: 'opt-2', text: 'Disable compiler warnings and assume the user never enters bad data.', isCorrect: false }
        ]
      },
      explanation: `Defensive programming and boundary validation prevent unexpected crashes and security vulnerabilities.`
    });
  } else {
    steps.push({
      id: `step-gen-${weekId}-${lessonIndex}-3`,
      stepNumber: 3,
      title: 'Evaluating Design Trade-Offs',
      prompt: `When applying this concept in real production systems, which trade-off is most crucial to consider?`,
      type: STEP_TYPES.PREDICTION,
      props: {
        options: [
          { id: 'opt-1', text: 'The balance between time complexity, memory allocation, and code readability.', isCorrect: true },
          { id: 'opt-2', text: 'Choosing the longest possible variable names regardless of clarity.', isCorrect: false },
          { id: 'opt-3', text: 'Writing all code inside a single gigantic function.', isCorrect: false }
        ]
      },
      explanation: 'Every engineering decision is a trade-off. Great software balances computational efficiency with maintainable architecture.'
    });
  }

  // STEP 4: Active Hands-On Coding Sandbox (Code Challenge)
  const exercises = weekContent?.exercises || [];
  const exercise = exercises[lessonIndex % Math.max(1, exercises.length)];

  if (exercise && exercise.starterCode) {
    steps.push({
      id: `step-gen-${weekId}-${lessonIndex}-4`,
      stepNumber: 4,
      title: `Hands-On: ${exercise.title || 'Code Challenge'}`,
      prompt: exercise.description
        ? cleanText(exercise.description).slice(0, 250) + '... Run your solution to verify:'
        : 'Run the code in the live sandbox below to test your implementation:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: exercise.language || language,
        starterCode: exercise.starterCode,
        expectedOutput: exercise.expectedOutput || '',
        hints: exercise.hints || ['Inspect the function parameters and test the logic.']
      },
      explanation: `Hands-on execution cements your mental model! You verified that your code compiles and produces the expected output.`
    });
  } else if (starterCode && starterCode.trim().length > 0) {
    steps.push({
      id: `step-gen-${weekId}-${lessonIndex}-4`,
      stepNumber: 4,
      title: 'Hands-on Execution Sandbox',
      prompt: 'Execute the code below in the live runner to observe its output and behavior:',
      type: STEP_TYPES.CODE_CHALLENGE,
      props: {
        language: language,
        starterCode: starterCode,
        expectedOutput: '',
        hints: ['Click "▶ Run Code" to execute the script in real time.']
      },
      explanation: 'Executing code line-by-line reinforces how the runtime evaluation loop processes each statement.'
    });
  }

  // STEP 5: Architectural Synthesis & Intuition Summary
  steps.push({
    id: `step-gen-${weekId}-${lessonIndex}-5`,
    stepNumber: steps.length + 1,
    title: 'Intuition Takeaway & Next Steps',
    prompt: `You have explored ${title}. What is the single most important mental model to carry into upcoming modules?`,
    type: STEP_TYPES.PREDICTION,
    props: {
      options: [
        {
          id: 'opt-1',
          text: `Think in terms of invariants, clear data flow, and predictable state transitions.`,
          isCorrect: true
        },
        {
          id: 'opt-2',
          text: `Memorize syntax without understanding how data moves through memory.`,
          isCorrect: false
        }
      ]
    },
    explanation: `Congratulations! You have completed the interactive intuition workout for ${title}. You are ready to advance to the next challenge!`
  });

  // Re-index step numbers
  return steps.map((s, i) => ({ ...s, stepNumber: i + 1 }));
}
