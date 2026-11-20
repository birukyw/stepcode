import { supabase } from './supabase';

// What is saved to the account: which lessons, quizzes and projects are done, plus the days you
// practised (for the streak). Code drafts stay on the device.
const PROGRESS_KEY = 'stepcode_progress';
const ACTIVITY_KEY = 'stepcode_activity';

const readJson = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key) || '') ?? fallback; } catch { return fallback; }
};

export const readLocal = () => ({
  progress: readJson(PROGRESS_KEY, {}),
  activity: readJson(ACTIVITY_KEY, []),
});

export function writeLocal({ progress, activity }) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activity));
  } catch { /* storage may be blocked */ }
}

/** Remove everything account-related from this device (used on sign out, so the next person starts clean). */
export function clearLocal() {
  try {
    const drop = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const k = localStorage.key(i);
      if (k && (k === PROGRESS_KEY || k === ACTIVITY_KEY || k.startsWith('stepcode_code_'))) drop.push(k);
    }
    drop.forEach((k) => localStorage.removeItem(k));
  } catch { /* ignore */ }
}

/** Progress from two sources combines by union: finishing something anywhere counts everywhere. */
export function mergeData(a, b) {
  const progress = { ...(a?.progress || {}), ...(b?.progress || {}) };
  Object.keys(progress).forEach((k) => { if (!progress[k]) delete progress[k]; });
  const days = new Set([...(a?.activity || []), ...(b?.activity || [])]);
  return { progress, activity: [...days].sort().slice(-400) };
}

export async function loadCloud(userId) {
  const { data, error } = await supabase.from('progress').select('data').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data?.data || null;
}

export async function saveCloud(userId, payload) {
  const { error } = await supabase.from('progress').upsert({ user_id: userId, data: payload, updated_at: new Date().toISOString() });
  if (error) throw error;
}
