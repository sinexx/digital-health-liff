import { getSupabaseServer } from '@/lib/supabaseServer';
import { requireAdmin } from '@/lib/admin';

export default async function handler(req, res) {
  try {
    await requireAdmin(req);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  const { id } = req.query;
  const supabase = getSupabaseServer();

  if (req.method === 'PATCH') {
    const { role } = req.body || {};
    if (!role) return res.status(400).json({ error: 'missing_role' });
    const { error } = await supabase.from('users').update({ role, updated_at: new Date().toISOString() }).eq('user_id', id);
    if (error) return res.status(500).json({ error: 'db_error' });
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    const { error } = await supabase.from('users').delete().eq('user_id', id);
    if (error) return res.status(500).json({ error: 'db_error' });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
