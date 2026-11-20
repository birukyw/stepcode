import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase, authConfigured } from '../utils/supabase';

const AuthContext = createContext({
  configured: false, user: null, loading: false, recovering: false,
  signIn: async () => ({ error: 'Accounts are not set up.' }),
  signUp: async () => ({ error: 'Accounts are not set up.' }),
  signOut: async () => {}, sendReset: async () => ({}), updatePassword: async () => ({}),
});

export const useAuth = () => useContext(AuthContext);

// Turn Supabase's technical messages into something a learner can act on.
function friendly(error) {
  if (!error) return null;
  const m = (error.message || String(error)).toLowerCase();
  if (m.includes('invalid login')) return 'Wrong email or password.';
  if (m.includes('email not confirmed')) return 'Please confirm your email first. Check your inbox for the link.';
  if (m.includes('already registered') || m.includes('already been registered')) return 'That email already has an account. Try logging in.';
  if (m.includes('password') && m.includes('characters')) return 'Use a password with at least 8 characters.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Too many tries. Wait a few minutes and try again.';
  if (m.includes('failed to fetch') || m.includes('network')) return 'Could not reach the server. Check your connection and try again.';
  if (m.includes('valid email') || m.includes('invalid email')) return 'Enter a valid email address.';
  return error.message || 'Something went wrong. Try again.';
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(authConfigured);
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    if (!supabase) return undefined;
    let alive = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!alive) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    }).catch(() => { if (alive) setLoading(false); });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === 'PASSWORD_RECOVERY') setRecovering(true);
      if (event === 'SIGNED_OUT') setRecovering(false);
    });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    return { error: friendly(error) };
  }, []);

  const signUp = useCallback(async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) return { error: friendly(error) };
    // With email confirmation on, there is no session yet. Supabase also returns a user with no
    // identities when the address is already registered.
    if (data.user && data.user.identities && data.user.identities.length === 0) return { error: 'That email already has an account. Try logging in.' };
    return { error: null, needsConfirm: !data.session };
  }, []);

  const signOut = useCallback(async () => { if (supabase) await supabase.auth.signOut(); }, []);

  const sendReset = useCallback(async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/login` });
    return { error: friendly(error) };
  }, []);

  const updatePassword = useCallback(async (password) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (!error) setRecovering(false);
    return { error: friendly(error) };
  }, []);

  const value = useMemo(
    () => ({ configured: authConfigured, user, loading, recovering, signIn, signUp, signOut, sendReset, updatePassword }),
    [user, loading, recovering, signIn, signUp, signOut, sendReset, updatePassword],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
