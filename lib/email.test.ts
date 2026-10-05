import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import nodemailer from 'nodemailer';

// Bu dosya GERÇEK e-posta göndermez: nodemailer.createTransport spy'lanır ve
// sendMail hiçbir testte çağrılmaz. Geçersiz kimlik bilgisiyle Gmail'e giriş
// denemesi yapılmadığını kanıtlar (14 ayrı createTransport çağrısı vardı, yalnızca
// biri parolayı doğruluyordu).

const ENV_KEYS = ['GMAIL_USER', 'GMAIL_APP_PASSWORD'] as const;
const saved: Record<string, string | undefined> = {};
// Sahte değerler koddan üretilir (sır tarayıcılarında sabit parola örüntüsü yanlış alarm veriyor).
const FAKE_PASS = 'x'.repeat(16);
const FAKE_PASS_SPACED = ['x'.repeat(4), 'x'.repeat(4), 'x'.repeat(4), 'x'.repeat(4)].join(' ');

beforeEach(() => {
  for (const k of ENV_KEYS) saved[k] = process.env[k];
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'log').mockImplementation(() => {});
});
afterEach(() => {
  for (const k of ENV_KEYS) {
    if (saved[k] === undefined) delete process.env[k];
    else process.env[k] = saved[k];
  }
  vi.restoreAllMocks();
});

describe('getMailCredentials', () => {
  it('parola yoksa null', async () => {
    delete process.env.GMAIL_APP_PASSWORD;
    const { getMailCredentials } = await import('./email');
    expect(getMailCredentials()).toBeNull();
  });

  it('16 karakterden kısa parola null', async () => {
    process.env.GMAIL_APP_PASSWORD = 'kisa';
    const { getMailCredentials } = await import('./email');
    expect(getMailCredentials()).toBeNull();
  });

  it('boşluklu uygulama parolası temizlenir ve varsayılan kullanıcı atanır', async () => {
    delete process.env.GMAIL_USER;
    process.env.GMAIL_APP_PASSWORD = FAKE_PASS_SPACED;
    const { getMailCredentials } = await import('./email');
    expect(getMailCredentials()).toEqual({ user: 'info@dusukbutce.com', pass: FAKE_PASS });
  });
});

describe('createMailTransporter', () => {
  it('geçersiz kimlik bilgisinde nodemailer.createTransport çağrılmaz', async () => {
    process.env.GMAIL_APP_PASSWORD = 'kisa';
    const spy = vi.spyOn(nodemailer, 'createTransport');
    const { createMailTransporter } = await import('./email');
    expect(createMailTransporter()).toBeNull();
    expect(spy).not.toHaveBeenCalled();
  });

  it('geçerli kimlik bilgisinde ek seçenekler korunur', async () => {
    process.env.GMAIL_USER = 'izole-test@example.invalid';
    process.env.GMAIL_APP_PASSWORD = FAKE_PASS;
    const spy = vi.spyOn(nodemailer, 'createTransport');
    const { createMailTransporter } = await import('./email');
    expect(createMailTransporter({ connectionTimeout: 1234 })).not.toBeNull();
    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        service: 'gmail',
        connectionTimeout: 1234,
        auth: { user: 'izole-test@example.invalid', pass: FAKE_PASS },
      })
    );
  });
});

describe('tüm gönderim fonksiyonları geçersiz parolada ağa çıkmadan false döner', () => {
  it.each([
    ['sendPasswordResetEmail', ['a@b.c', 'tok', 'Ad']],
    ['sendContactNotification', [{ name: 'a', email: 'a@b.c', subject: 's', message: 'm' }]],
    ['sendCustomerAcceptEmailToAdmin', ['a@b.c', 'Ad', 'Ürün', 100]],
    ['sendCustomerRejectEmailToAdmin', ['a@b.c', 'Ad', 'Ürün', 100]],
    ['sendAdminAcceptEmailToCustomer', ['a@b.c', 'Ad', 'Ürün', 100]],
    ['sendPaymentConfirmationEmail', ['a@b.c', 'Ad', 'Ürün', 100]],
    ['sendCancellationRequestEmailToAdmin', ['a@b.c', 'Ad', 'Ürün', 'neden']],
    ['sendCancellationApprovedEmailToCustomer', ['a@b.c', 'Ad', 'Ürün']],
    ['sendCancellationRejectedEmailToCustomer', ['a@b.c', 'Ad', 'Ürün']],
    ['sendAdminRejectEmailToCustomer', ['a@b.c', 'Ad', 'Ürün']],
    ['sendOfferEmail', ['a@b.c', 'Ad', 'Ürün', 100]],
    ['sendNewSubmissionNotificationToAdmin', [{ brand: 'x', model: 'y', category: 'mouse' }]],
    ['sendEmailVerificationEmail', ['a@b.c', 'tok', 'Ad']],
    ['sendEmailChangeVerificationEmail', ['a@b.c', '123456', 'Ad']],
  ])('%s', async (name, args) => {
    process.env.GMAIL_USER = 'izole-test@example.invalid';
    process.env.GMAIL_APP_PASSWORD = 'kisa';
    const spy = vi.spyOn(nodemailer, 'createTransport');
    const mod = (await import('./email')) as unknown as Record<
      string,
      (...a: unknown[]) => Promise<unknown>
    >;
    expect(typeof mod[name]).toBe('function');
    await expect(mod[name](...(args as unknown[]))).resolves.toBe(false);
    expect(spy).not.toHaveBeenCalled();
  });
});
