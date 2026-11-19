// Runs Python in the browser (Pyodide in a Web Worker). No server needed, and learner code never leaves the tab.
let worker = null;
let ready = null;
let seq = 0;
let pending = null; // { resolve, text, timer }

function start() {
  ready = new Promise((resolve, reject) => {
    worker = new Worker('/py-worker.js');
    worker.onmessage = (e) => {
      const m = e.data;
      if (m.type === 'ready') resolve();
      else if (m.type === 'fatal') reject(new Error(m.message));
      else if (m.type === 'out' && pending && m.id === pending.id) pending.text += m.text;
      else if (m.type === 'running' && pending && m.id === pending.id) startRunClock();
      else if (m.type === 'done' && pending && m.id === pending.id) finish({});
    };
    worker.onerror = (e) => reject(new Error(e.message || 'Could not start the Python worker'));
  });
  ready.catch(() => {});
}

function startRunClock() {
  if (!pending) return;
  clearTimeout(pending.timer);
  const ms = pending.timeoutMs;
  pending.timer = setTimeout(() => {
    const text = pending ? pending.text : '';
    finish({ output: `${text}${text && !text.endsWith('\n') ? '\n' : ''}[Stopped: took longer than ${ms / 1000}s]`, timedOut: true });
    restart();
  }, ms);
}

function finish(extra) {
  if (!pending) return;
  const p = pending;
  pending = null;
  clearTimeout(p.timer);
  p.resolve({ output: p.text, ...extra });
}

function restart() {
  if (worker) worker.terminate();
  worker = null;
  ready = null;
  start();
}

/** Start loading Python early, so the first Run feels instant. */
export function preloadPython() {
  if (!worker) start();
  return ready;
}

export function isPythonReady() {
  return worker !== null && ready !== null;
}

/** Stop whatever is running. Returns the output produced so far. */
export function cancelPython() {
  if (!pending) return;
  const text = pending.text;
  finish({ output: `${text}${text && !text.endsWith('\n') ? '\n' : ''}[Stopped]`, stopped: true });
  restart();
}

/** Resolves to { output } or { fallback: true } if Python could not be loaded. */
export async function runPython(code, stdin = '', { timeoutMs = 8000 } = {}) {
  if (!worker) start();
  try {
    await ready;
  } catch (err) {
    restart();
    return { fallback: true, reason: err.message };
  }
  if (pending) cancelPython();
  return new Promise((resolve) => {
    const id = ++seq;
    // Loading packages (NumPy and friends) is not counted against the run time.
    const timer = setTimeout(() => {
      finish({ output: '[Stopped: loading took too long]', timedOut: true });
      restart();
    }, 90000);
    pending = { id, resolve, text: '', timer, timeoutMs };
    worker.postMessage({ id, code, stdin });
  });
}
