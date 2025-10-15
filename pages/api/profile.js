import { getSupabaseServer } from '@/lib/supabaseServer';
import { verifyLineIdToken } from '@/lib/lineVerify';

export default async function handler(req, res) {
  const supabase = getSupabaseServer();

  if (req.method === 'GET') {
    try {
      const { idToken } = req.query;
      const payload = await verifyLineIdToken(idToken);
      const userId = payload.sub;
      const { data, error } = await supabase
        .from('users')
        .select('user_id, display_name, picture_url, email, department, position, phone')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      return res.status(200).json({ profile: data });
    } catch (err) {
      console.error('profile get error', err);
      return res.status(401).json({ error: 'unauthorized' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { idToken, profile } = req.body || {};
      const payload = await verifyLineIdToken(idToken);
      const userId = payload.sub;

      const allow = ['display_name', 'email', 'department', 'position', 'phone'];
      const record = { user_id: userId };
      for (const k of allow) if (k in (profile || {})) record[k] = profile[k];
      record.updated_at = new Date().toISOString();

      const { error } = await supabase.from('users').upsert(record, { onConflict: 'user_id' });
      if (error) throw error;
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('profile update error', err);
      return res.status(401).json({ error: 'unauthorized' });
    }
  }

  return res.status(405).end();
}
