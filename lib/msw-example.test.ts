import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// MSW kurulum örneği: app/api/auth/google/callback/route.ts'in gerçekten
// çağırdığı iki Google endpoint'i mock'lanıyor (network isteği hiç çıkmıyor).
// Amaç: başarı, API hatası ve ağ kesintisi senaryolarını gerçek Google
// sunucusuna dokunmadan, güvenilir şekilde test edebilmek.
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

async function exchangeGoogleCode(code: string) {
  const tokenRes = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code }),
  });
  if (!tokenRes.ok) throw new Error(`Token exchange failed: ${tokenRes.status}`);
  const { access_token } = await tokenRes.json();

  const userRes = await fetch(`${USERINFO_URL}?access_token=${access_token}`);
  if (!userRes.ok) throw new Error(`Userinfo failed: ${userRes.status}`);
  return userRes.json();
}

describe('MSW örneği: Google OAuth uçlarını mock\'lama', () => {
  it('başarılı token değişimi ve kullanıcı bilgisi döner', async () => {
    server.use(
      http.post(TOKEN_URL, () => HttpResponse.json({ access_token: 'mock-token' })),
      http.get(USERINFO_URL, () =>
        HttpResponse.json({ email: 'test@example.com', name: 'Test User' })
      )
    );

    const user = await exchangeGoogleCode('mock-code');
    expect(user.email).toBe('test@example.com');
  });

  it('Google token uçtan hata dönerse anlaşılır bir hata fırlatılır', async () => {
    server.use(
      http.post(TOKEN_URL, () => HttpResponse.json({ error: 'invalid_grant' }, { status: 400 }))
    );

    await expect(exchangeGoogleCode('expired-code')).rejects.toThrow('Token exchange failed: 400');
  });

  it('ağ kesintisinde (bağlantı reddedilirse) anlaşılır bir hata fırlatılır', async () => {
    server.use(http.post(TOKEN_URL, () => HttpResponse.error()));

    await expect(exchangeGoogleCode('mock-code')).rejects.toThrow();
  });
});
