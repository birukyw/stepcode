import { runPython } from './pyRunner';

// In development Vite proxies /api to the local runner. On the deployed site set VITE_API_URL to the
// runner's address (for example https://stepcode-runner.onrender.com). Without it, only Python (in the browser) works.
const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const API_BASE = `${API_URL}/api`;
const HAS_RUNNER = !import.meta.env.PROD || !!API_URL;

async function runOnServer(code, language, stdin) {
  if (!HAS_RUNNER) return { error: 'Java needs the code server, which is not switched on for this site yet. Python works fully in your browser.' };
  try {
    const res = await fetch(`${API_BASE}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language, stdin }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || `Server returned ${res.status}` };
    return data;
  } catch (err) {
    return { error: `Could not reach the code runner (${err.message}).` };
  }
}

/** Python runs in the browser. Java still needs the server runner. */
export async function runCode(code, language, stdin = '', opts = {}) {
  if (language === 'python') {
    const res = await runPython(code, stdin, opts);
    if (!res.fallback) return { output: res.output || '(no output)', stopped: res.stopped, timedOut: res.timedOut };
    // Pyodide could not load (offline or blocked). Fall back to the dev server if one is running.
    const viaServer = await runOnServer(code, language, stdin);
    if (viaServer.error) return { error: `Python could not load in your browser (${res.reason}), and no server runner is available.` };
    return viaServer;
  }
  return runOnServer(code, language, stdin);
}
