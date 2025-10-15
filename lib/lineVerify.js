import { createRemoteJWKSet, jwtVerify } from 'jose';

const LINE_JWKS = createRemoteJWKSet(new URL('https://api.line.me/oauth2/v2.1/certs'));

export async function verifyLineIdToken(idToken) {
  const channelId = process.env.LINE_CHANNEL_ID; // LIFF/LINE Login channel ID
  if (!idToken || !channelId) throw new Error('Missing idToken or LINE_CHANNEL_ID');
  const { payload } = await jwtVerify(idToken, LINE_JWKS, {
    issuer: 'https://access.line.me',
    audience: channelId,
  });
  return payload; // contains sub (userId), name, picture, etc.
}
