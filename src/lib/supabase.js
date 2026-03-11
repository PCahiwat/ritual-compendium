import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Use in-memory storage to avoid localStorage in sandboxed environments
const memStore = {};
const memoryStorage = {
  getItem: (key) => memStore[key] ?? null,
  setItem: (key, value) => { memStore[key] = value; },
  removeItem: (key) => { delete memStore[key]; },
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: memoryStorage,
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
