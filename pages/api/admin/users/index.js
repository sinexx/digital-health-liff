import { getSupabaseServer } from '@/lib/supabaseServer';
import { requireAdmin } from '@/lib/admin';

export default async function handler(req, res) {
  try {
    await requireAdmin(req);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  const supabase = getSupabaseServer();

  if (req.method === 'GET') {
    const { data, error } = await supabase.from('users').select('user_id,display_name,picture_url,role,updated_at').order('updated_at', { ascending: false });
    if (error) return res.status(500).json({ error: 'db_error' });
    return res.status(200).json({ users: data || [] });
  }

  return res.status(405).end();
}
