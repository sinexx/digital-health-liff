const handlerModule = require('@/pages/api/profile');
const handler = handlerModule && handlerModule.default ? handlerModule.default : handlerModule;

// Mock the supabase server client
jest.mock('@/lib/supabaseServer', () => ({
  getSupabaseServer: () => ({
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({ data: { settings: { profile: { display_name: 'Old' } } }, error: null }),
      upsert: jest.fn().mockResolvedValue({ error: null }),
    })),
  }),
}));

// Mock token verification to return a predictable payload
jest.mock('@/lib/lineVerify', () => ({
  verifyLineIdToken: jest.fn(async (token) => {
    if (token === 'bad') throw new Error('invalid token');
    return { sub: 'U12345', name: 'Test User' };
  }),
}));

function buildReqRes(method, body = {}, query = {}) {
  const req = { method, body, query };
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.end = jest.fn().mockReturnValue(res);
  return { req, res };
}

describe('/api/profile', () => {
  it('returns 400 when token missing (GET)', async () => {
    const { req, res } = buildReqRes('GET', {}, {});
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'missing_token' });
  });

  it('returns 401 for invalid token', async () => {
    const { req, res } = buildReqRes('POST', { idToken: 'bad', profile: {} }, {});
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'invalid_token' });
  });

  it('updates profile successfully', async () => {
    const { req, res } = buildReqRes('POST', { idToken: 'good', profile: { display_name: 'New Name' } }, {});
    await handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true });
  });
});
