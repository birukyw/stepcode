const API_BASE = '/api';

function getHeaders() {
  const token = localStorage.getItem('codequest_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function fetchStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`, {
      headers: getHeaders(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    // Fallback to localStorage if server is down
    const stored = localStorage.getItem('codequest-fallback');
    return stored ? JSON.parse(stored) : null;
  }
}

export async function saveStats(stats) {
  try {
    await fetch(`${API_BASE}/stats`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(stats),
    });
  } catch {
    // Fallback
    const data = JSON.parse(localStorage.getItem('codequest-fallback') || '{}');
    data.stats = stats;
    localStorage.setItem('codequest-fallback', JSON.stringify(data));
  }
}

export async function saveProgress(itemId, type, xp, extra = {}) {
  try {
    await fetch(`${API_BASE}/progress`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ itemId, type, xp, ...extra }),
    });
  } catch {}
}

export async function runCode(code, language) {
  try {
    const res = await fetch(`${API_BASE}/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language }),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || `Server returned ${res.status}` };
    }
    return data;
  } catch (err) {
    return { error: `Could not connect to server: ${err.message}` };
  }
}
