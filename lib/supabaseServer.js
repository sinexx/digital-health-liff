import { createClient } from '@supabase/supabase-js';

export function getSupabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_*_KEY in environment');
  }
  // Service role is preferred on server for upsert; DO NOT expose service role to client.
  return createClient(url, key, { auth: { persistSession: false } });
}
