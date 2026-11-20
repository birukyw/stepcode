import { createClient } from '@supabase/supabase-js';

// Accounts are optional. Without these two variables the site works exactly as before (guest mode,
// progress saved on this device only) and no login buttons are shown.
const URL = import.meta.env.VITE_SUPABASE_URL;
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const authConfigured = !!(URL && ANON_KEY);

// The anon key is public by design. What protects each user's data is row level security in the
// database (see supabase/schema.sql), not the secrecy of this key.
export const supabase = authConfigured
  ? createClient(URL, ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null;
