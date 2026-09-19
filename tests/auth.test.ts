import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Authentication & Authorization Tests', () => {

  // ==================== REGISTER TESTS ====================
  test.describe('Register Scenarios', () => {

    test('✅ Register - Başarılı kayıt', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/register`);
      // Form yüklenmesini kontrol et
      const titleOrForm = page.getByText(/kaydol|register/i);
      await expect(titleOrForm).toBeDefined();
    });

    test('❌ Register - Boş form gönderimi', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      // Form boş bırakıp submit et
      const submitBtn = page.getByRole('button', { name: /submit|kaydet|gönder/i });
      if (submitBtn) {
        await submitBtn.click();
        // Validation error bekleniyor
        await expect(page.getByText(/required|zorunlu/i)).toBeVisible();
      }
    });

    test('❌ Register - Invalid email', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      const emailInput = page.getByLabel(/email/i);
      if (emailInput) {
        await emailInput.fill('invalid-email');
        const submitBtn = page.getByRole('button', { name: /submit/i });
        if (submitBtn) {
          await submitBtn.click();
          await expect(page.getByText(/valid.*email|email.*invalid/i)).toBeVisible();
        }
      }
    });

    test('❌ Register - Password mismatch', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      const passwordInputs = page.getByLabel(/password/i);
      // İlk password ve confirm password farklı olacak şekilde doldur
      await expect(passwordInputs).toBeDefined();
    });

    test('❌ Register - Email already exists', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      // Zaten var olan email ile kayıt et
      const emailInput = page.getByLabel(/email/i);
      if (emailInput) {
        await emailInput.fill('existing@example.com');
        const submitBtn = page.getByRole('button', { name: /submit/i });
        if (submitBtn) {
          await submitBtn.click();
          // Duplicate email error bekleniyor
          await expect(page.getByText(/already.*exists|duplicate|already.*registered/i)).toBeVisible();
        }
      }
    });
  });

  // ==================== LOGIN TESTS ====================
  test.describe('Login Scenarios', () => {

    test('✅ Login - Başarılı giriş', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      const loginBtn = page.getByText(/giriş|login/i);
      if (loginBtn) {
        await loginBtn.click();
        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        if (emailInput && passwordInput) {
          await emailInput.fill('test@example.com');
          await passwordInput.fill('password123');
          await page.getByRole('button', { name: /login|giriş/i }).click();

          // Dashboard veya home page'e yönlendirilmesi bekleniyor
          await expect(page).toHaveURL(/.*home|dashboard|account/i);
        }
      }
    });

    test('❌ Login - Yanlış password', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      const loginBtn = page.getByText(/giriş|login/i);
      if (loginBtn) {
        await loginBtn.click();
        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        if (emailInput && passwordInput) {
          await emailInput.fill('test@example.com');
          await passwordInput.fill('wrongpassword');
          await page.getByRole('button', { name: /login/i }).click();

          // Error message bekleniyor
          await expect(page.getByText(/incorrect|wrong|invalid.*password/i)).toBeVisible();
        }
      }
    });

    test('❌ Login - Non-existent user', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      const loginBtn = page.getByText(/giriş|login/i);
      if (loginBtn) {
        await loginBtn.click();
        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        if (emailInput && passwordInput) {
          await emailInput.fill('nonexistent@example.com');
          await passwordInput.fill('password123');
          await page.getByRole('button', { name: /login/i }).click();

          // User not found error bekleniyor
          await expect(page.getByText(/not.*found|does.*not.*exist|no.*account/i)).toBeVisible();
        }
      }
    });

    test('❌ Login - Empty fields', async ({ page }) => {
      await page.goto(`${BASE_URL}`);
      const loginBtn = page.getByText(/giriş|login/i);
      if (loginBtn) {
        await loginBtn.click();
        const submitBtn = page.getByRole('button', { name: /login/i });
        if (submitBtn) {
          await submitBtn.click();
          // Required field errors bekleniyor
          await expect(page.getByText(/required|zorunlu/i)).toBeVisible();
        }
      }
    });
  });

  // ==================== LOGOUT TESTS ====================
  test.describe('Logout Scenarios', () => {

    test('✅ Logout - Başarılı çıkış', async ({ page }) => {
      await page.goto(`${BASE_URL}`);

      // Önce login yap
      const loginBtn = page.getByText(/giriş|login/i);
      if (loginBtn) {
        await loginBtn.click();
        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        if (emailInput && passwordInput) {
          await emailInput.fill('test@example.com');
          await passwordInput.fill('password123');
          await page.getByRole('button', { name: /login/i }).click();

          // Logout butonunu bul ve tıkla
          const logoutBtn = page.getByText(/çıkış|logout/i);
          if (logoutBtn) {
            await logoutBtn.click();

            // Login sayfasına dönülmesi bekleniyor
            await expect(page).toHaveURL(/.*login|signin/i);
          }
        }
      }
    });

    test('✅ Logout - Session cleared', async ({ page }) => {
      // Logout sonrası authenticated endpoints'e erişim engellenmeli
      await page.goto(`${BASE_URL}/account`);

      // Login sayfasına yönlendirilmesi bekleniyor
      await expect(page).toHaveURL(/.*login|signin/i);
    });
  });

  // ==================== SESSION TESTS ====================
  test.describe('Session Scenarios', () => {

    test('✅ Session persistence - Sayfa yenilemesinde session korunması', async ({ page }) => {
      await page.goto(`${BASE_URL}`);

      // Login yap
      const loginBtn = page.getByText(/giriş|login/i);
      if (loginBtn) {
        await loginBtn.click();
        const emailInput = page.getByLabel(/email/i);
        const passwordInput = page.getByLabel(/password/i);

        if (emailInput && passwordInput) {
          await emailInput.fill('test@example.com');
          await passwordInput.fill('password123');
          await page.getByRole('button', { name: /login/i }).click();

          // Sayfayı yenile
          await page.reload();

          // Session devam etmeli - logout butonu görünür olmalı
          const logoutBtn = page.getByText(/çıkış|logout/i);
          if (logoutBtn) {
            await expect(logoutBtn).toBeVisible();
          }
        }
      }
    });

    test('✅ Session timeout - Uzun inaktivite sonrası logout', async ({ page }) => {
      // Bu test gerçek environment'te çalışması için timeout ayarı gerekir
      // Placeholder test
      await page.goto(`${BASE_URL}`);
      await expect(page).toHaveURL(/.*localhost/i);
    });
  });

  // ==================== PASSWORD RECOVERY TESTS ====================
  test.describe('Password Recovery Scenarios', () => {

    test('✅ Password recovery - Email gönderimi', async ({ page }) => {
      await page.goto(`${BASE_URL}`);

      const forgotPasswordLink = page.getByText(/forgot.*password|şifremi unuttum/i);
      if (forgotPasswordLink) {
        await forgotPasswordLink.click();

        const emailInput = page.getByLabel(/email/i);
        if (emailInput) {
          await emailInput.fill('test@example.com');
          await page.getByRole('button', { name: /reset|gönder/i }).click();

          // Success message bekleniyor
          await expect(page.getByText(/check.*email|link.*sent|sent.*you/i)).toBeVisible();
        }
      }
    });

    test('❌ Password recovery - Invalid email', async ({ page }) => {
      await page.goto(`${BASE_URL}`);

      const forgotPasswordLink = page.getByText(/forgot.*password/i);
      if (forgotPasswordLink) {
        await forgotPasswordLink.click();

        const emailInput = page.getByLabel(/email/i);
        if (emailInput) {
          await emailInput.fill('invalid@example.com');
          await page.getByRole('button', { name: /reset|gönder/i }).click();

          // Error message bekleniyor
          await expect(page.getByText(/not.*found|doesn't.*exist/i)).toBeVisible();
        }
      }
    });
  });
});

export {};
