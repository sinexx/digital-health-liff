import { getSupabaseServer } from './supabaseServer';
import { verifyLineIdToken } from './lineVerify';

export async function requireAdmin(req) {
  // Expect Authorization: Bearer <idToken>
  const auth = req.headers?.authorization || '';
  const idToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!idToken) throw new Error('no_token');

  const payload = await verifyLineIdToken(idToken);
  const userId = payload?.sub;
  if (!userId) throw new Error('invalid_token');

  const supabase = getSupabaseServer();
  const { data, error } = await supabase.from('users').select('user_id,role').eq('user_id', userId).limit(1).single();
  if (error) throw new Error('db_error');
  if (!data || data.role !== 'admin') throw new Error('not_admin');

  return { userId, payload };
}
