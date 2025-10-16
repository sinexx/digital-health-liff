import { getSupabaseServer } from '@/lib/supabaseServer';
import { verifyLineIdToken } from '@/lib/lineVerify';

async function requireOwner(req) {
  const auth = req.headers?.authorization || '';
  const idToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!idToken) throw new Error('no_token');
  const payload = await verifyLineIdToken(idToken);
  const userId = payload?.sub;
  const allow = (process.env.ADMIN_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (!userId || !allow.includes(userId)) throw new Error('not_owner');
  return { userId };
}

export const config = { api: { bodyParser: { sizeLimit: '20mb' } } };

export default async function handler(req, res) {
  try {
    await requireOwner(req);
  } catch (e) {
    return res.status(403).json({ error: e.message });
  }

  const supabase = getSupabaseServer();
  const bucket = 'public-files';

  if (req.method === 'POST') {
    try {
      const { name, content, contentType } = req.body || {};
      if (!name || !content) return res.status(400).json({ error: 'missing_name_or_content' });
      const buff = Buffer.from(content, 'base64');
      const { error } = await supabase.storage.from(bucket).upload(name, buff, { contentType: contentType || 'application/octet-stream', upsert: true });
      if (error) return res.status(500).json({ error: 'upload_error' });
      const { data } = supabase.storage.from(bucket).getPublicUrl(name);
      return res.status(200).json({ ok: true, url: data.publicUrl });
    } catch (e) {
      console.error('upload error', e);
      return res.status(500).json({ error: 'server_error' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { name } = req.query;
      if (!name) return res.status(400).json({ error: 'missing_name' });
      const { error } = await supabase.storage.from(bucket).remove([name]);
      if (error) return res.status(500).json({ error: 'delete_error' });
      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error('delete error', e);
      return res.status(500).json({ error: 'server_error' });
    }
  }

  return res.status(405).end();
}
