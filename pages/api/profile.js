import { getSupabaseServer } from '@/lib/supabaseServer';
import { verifyLineIdToken } from '@/lib/lineVerify';

export default async function handler(req, res) {
  const supabase = getSupabaseServer();

  if (req.method === 'GET') {
    try {
      const { idToken } = req.query;
      if (!idToken) return res.status(400).json({ error: 'missing_token' });
      const payload = await verifyLineIdToken(idToken);
      const userId = payload.sub;
      // Read from user_settings JSON for robustness
      const { data: srow, error: sErr } = await supabase
        .from('user_settings')
        .select('settings')
        .eq('user_id', userId)
        .maybeSingle();
      if (sErr) return res.status(500).json({ error: 'db_error' });
      const settings = srow?.settings || {};
      const prof = settings.profile || {};
      return res.status(200).json({ profile: {
        display_name: prof.display_name || '',
        email: prof.email || '',
        department: prof.department || '',
        position: prof.position || '',
        phone: prof.phone || '',
      }});
    } catch (err) {
      console.error('profile get error', err);
      return res.status(401).json({ error: 'invalid_token' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { idToken, profile } = req.body || {};
      if (!idToken) return res.status(400).json({ error: 'missing_token' });
      const payload = await verifyLineIdToken(idToken);
      const userId = payload.sub;

      // Merge incoming profile into user_settings.settings.profile JSON
      const { data: existing, error: getErr } = await supabase
        .from('user_settings')
        .select('settings')
        .eq('user_id', userId)
        .maybeSingle();
      if (getErr) return res.status(500).json({ error: 'db_error' });

      const settings = existing?.settings || {};
      const prev = settings.profile || {};
      const next = {
        display_name: profile?.display_name ?? prev.display_name ?? '',
        email: profile?.email ?? prev.email ?? '',
        department: profile?.department ?? prev.department ?? '',
        position: profile?.position ?? prev.position ?? '',
        phone: profile?.phone ?? prev.phone ?? '',
      };
      settings.profile = next;

      const { error: upErr } = await supabase
        .from('user_settings')
        .upsert({ user_id: userId, settings, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
      if (upErr) return res.status(500).json({ error: 'db_error' });

      // Best-effort: keep users.display_name in sync (ignore if fails)
      try {
        await supabase
          .from('users')
          .upsert({ user_id: userId, display_name: next.display_name, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
      } catch (e) {
        console.warn('optional users sync failed');
      }

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('profile update error', err);
      return res.status(401).json({ error: 'invalid_token' });
    }
  }

  return res.status(405).end();
}
