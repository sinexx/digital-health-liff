import { getSupabaseServer } from '@/lib/supabaseServer';
import { verifyLineIdToken } from '@/lib/lineVerify';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { idToken, profile } = req.body || {};
    if (!idToken || !profile?.userId) {
      return res.status(400).json({ error: 'missing idToken or profile.userId' });
    }

    // Verify idToken signature and claims (issuer/audience)
    const payload = await verifyLineIdToken(idToken);
    const lineUserId = payload?.sub;
    if (!lineUserId || lineUserId !== profile.userId) {
      return res.status(401).json({ error: 'user_mismatch' });
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from('users')
      .upsert({
        user_id: profile.userId,
        display_name: profile.displayName || null,
        picture_url: profile.pictureUrl || null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) throw error;
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('upsert user error', err);
    return res.status(500).json({ error: 'server_error' });
  }
}
