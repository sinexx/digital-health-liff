import { verifyLineIdToken } from './lineVerify';

export async function requireAdmin(req) {
  // Expect Authorization: Bearer <idToken>
  const auth = req.headers?.authorization || '';
  const idToken = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!idToken) throw new Error('no_token');

  const payload = await verifyLineIdToken(idToken);
  const userId = payload?.sub;
  if (!userId) throw new Error('invalid_token');

  // Allowlist via env for emergency/admin bootstrap
  const allowEnv = (process.env.ADMIN_USER_IDS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
  if (!allowEnv.includes(userId)) throw new Error('not_admin');
  return { userId, payload };
}
