import { getSupabaseServer } from '@/lib/supabaseServer';

export default async function handler(req, res) {
  const supabase = getSupabaseServer();

  if (req.method === 'POST') {
    try {
      const { userId, settings } = req.body || {};
      if (!userId || typeof settings !== 'object') {
        return res.status(400).json({ error: 'invalid payload' });
      }

      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          settings,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' });

      if (error) throw error;
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('update settings error', err);
      return res.status(500).json({ error: 'server_error' });
    }
  }

  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ error: 'missing userId' });
      const { data, error } = await supabase
        .from('user_settings')
        .select('settings')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      return res.status(200).json({ settings: data?.settings || {} });
    } catch (err) {
      console.error('get settings error', err);
      return res.status(500).json({ error: 'server_error' });
    }
  }

  return res.status(405).end();
}
