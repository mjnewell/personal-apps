import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://avbwykhmzuvtglqmkaqu.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_0Fpu06kWZrWBuX6rQsFNpQ_zw7oxZA6';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function ensureAuth() {
  let { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) throw error;
    session = data.session;
  }
  return session.user.id;
}
