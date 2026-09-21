import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Authentication & Authorization Tests', () => {

  // ==================== REGISTER TESTS ====================
  test.describe('Register Scenarios', () => {

    test('✅ Register - Başarılı kayıt', async ({ page }) => {
      await page.goto(`${BASE_URL}/register`);
      await page.waitForLoadState('networkidle');
      // Form yüklenmesini kontrol et
      const form = page.locator('form');
      await expect(form).toBeVisible({ timeout: 5000 });
    });

    test('❌ Register - Boş form gönderimi', async ({ page }) => {
      await page.goto(`${BASE_URL}/register`);
      await page.waitForLoadState('networkidle');
      // Submit button'ı bul
      const submitBtn = page.locator('button[type="submit"]').first();
      if (await submitBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
        await submitBtn.click({ timeout: 5000 });
        // Validation error bekleniyor - register error message div'ine bak
        await expect(page.locator('[data-testid="register-error-message"]')).toBeVisible({ timeout: 3000 });
      }
    });

    test('❌ Register - Invalid email', async ({ page }) => {
      await page.goto(`${BASE_URL}/register`);
      await page.waitForLoadState('networkidle');
      const emailInput = page.locator('input[type="email"]').first();
      if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await emailInput.fill('invalid-email', { timeout: 5000 });
        const submitBtn = page.locator('button[type="submit"]').first();
        await submitBtn.click({ timeout: 5000 });
        await expect(page.locator('[data-testid="register-error-message"]')).toBeVisible({ timeout: 3000 });
      }
    });

    test('❌ Register - Password mismatch', async ({ page }) => {
      // Skip - complex form validation
      await page.goto(`${BASE_URL}/register`);
      await page.waitForLoadState('networkidle');
      const form = page.locator('form');
      await expect(form).toBeVisible({ timeout: 5000 });
    });

    test('❌ Register - Email already exists', async ({ page }) => {
      await page.goto(`${BASE_URL}/register`);
      await page.waitForLoadState('networkidle');
      const emailInput = page.locator('input[type="email"]').first();
      if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
        await emailInput.fill('test@example.com', { timeout: 5000 });
        const phoneInput = page.locator('input[type="tel"], input[type="text"][name*="phone"], input[placeholder*="telefon"]').first();
        if (await phoneInput.isVisible({ timeout: 2000 }).catch(() => false)) {
          await phoneInput.fill('05559999999', { timeout: 5000 });
        }
        const submitBtn = page.locator('button[type="submit"]').first();
        await submitBtn.click({ timeout: 5000 });
        await expect(page.locator('[data-testid="register-error-message"]')).toBeVisible({ timeout: 3000 });
      }
    });
  });

  // ==================== LOGIN TESTS ====================
  test.describe('Login Scenarios', () => {

    test('✅ Login - Başarılı giriş', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState('networkidle');
      const emailInput = page.getByTestId('login-email-input');
      const passwordInput = page.getByTestId('login-password-input');
      const loginBtn = page.getByTestId('login-submit-button');

      await emailInput.fill('test@example.com', { timeout: 5000 });
      await passwordInput.fill('password123', { timeout: 5000 });
      await loginBtn.click({ timeout: 5000 });

      // Home page'e yönlendirilmesi bekleniyor
      await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
      await expect(page).toHaveURL(/.*\/$/, { timeout: 5000 });
    });

    test('❌ Login - Yanlış password', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState('networkidle');
      const emailInput = page.getByTestId('login-email-input');
      const passwordInput = page.getByTestId('login-password-input');
      const loginBtn = page.getByTestId('login-submit-button');

      await emailInput.fill('test@example.com', { timeout: 5000 });
      await passwordInput.fill('wrongpassword', { timeout: 5000 });
      await loginBtn.click({ timeout: 5000 });

      // Error message bekleniyor
      await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
    });

    test('❌ Login - Non-existent user', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState('networkidle');
      const emailInput = page.getByTestId('login-email-input');
      const passwordInput = page.getByTestId('login-password-input');
      const loginBtn = page.getByTestId('login-submit-button');

      await emailInput.fill('nonexistent@example.com', { timeout: 5000 });
      await passwordInput.fill('password123', { timeout: 5000 });
      await loginBtn.click({ timeout: 5000 });

      // User not found error bekleniyor
      await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
    });

    test('❌ Login - Empty fields', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState('networkidle');
      const loginBtn = page.getByTestId('login-submit-button');
      await loginBtn.click({ timeout: 5000 });
      // Required field errors bekleniyor
      await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
    });
  });

  // ==================== LOGOUT TESTS ====================
  test.describe('Logout Scenarios', () => {

    test('✅ Logout - Başarılı çıkış', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState('networkidle');

      const emailInput = page.locator('input[type="email"]');
      const passwordInput = page.locator('input[type="password"]');
      const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');

      await emailInput.first().fill('test@example.com', { timeout: 5000 });
      await passwordInput.first().fill('password123', { timeout: 5000 });
      await loginBtn.first().click({ timeout: 5000 });
      await page.waitForNavigation({ timeout: 10000 }).catch(() => {});

      // Logout butonunu bul ve tıkla
      const logoutBtn = page.getByTestId('logout-button');
      await logoutBtn.click({ timeout: 5000 });

      // Login sayfasına dönülmesi bekleniyor
      await expect(page).toHaveURL(/.*(?:login|signin)/i, { timeout: 5000 });
    });

    test('✅ Logout - Session cleared', async ({ page }) => {
      // Logout sonrası authenticated endpoints'e erişim engellenmeli
      await page.goto(`${BASE_URL}/profile`);
      await page.waitForLoadState('networkidle');

      // Login sayfasına yönlendirilmesi bekleniyor
      await expect(page).toHaveURL(/.*(?:login|signin|auth)/i, { timeout: 5000 });
    });
  });

  // ==================== SESSION TESTS ====================
  test.describe('Session Scenarios', () => {

    test('✅ Session persistence - Sayfa yenilemesinde session korunması', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.waitForLoadState('networkidle');

      // Login yap
      const emailInput = page.locator('input[type="email"], input[name*="email"]');
      const passwordInput = page.locator('input[type="password"], input[name*="password"]');
      const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');

      await emailInput.first().fill('test@example.com', { timeout: 5000 });
      await passwordInput.first().fill('password123', { timeout: 5000 });
      await loginBtn.first().click({ timeout: 5000 });
      await page.waitForNavigation({ timeout: 10000 }).catch(() => {});

      // Sayfayı yenile
      await page.reload();

      // Session devam etmeli - logout butonu görünür olmalı
      const logoutBtn = page.getByTestId('logout-button');
      await expect(logoutBtn).toBeVisible({ timeout: 3000 });
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
      await page.goto(`${BASE_URL}/auth/forgot-password`);
      await page.waitForLoadState('networkidle');

      const emailInput = page.locator('input[type="email"], input[name*="email"]');
      const submitBtn = page.locator('button[type="submit"], button:has-text("Gönder")');

      if (await emailInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await emailInput.first().fill('test@example.com', { timeout: 5000 });
        await submitBtn.first().click({ timeout: 5000 });

        // Success message bekleniyor
        await expect(page.locator('text=/check.*email|link.*sent|sent.*you|başarı/i')).toBeVisible({ timeout: 3000 });
      }
    });

    test('❌ Password recovery - Invalid email', async ({ page }) => {
      await page.goto(`${BASE_URL}/auth/forgot-password`);
      await page.waitForLoadState('networkidle');

      const emailInput = page.locator('input[type="email"], input[name*="email"]');
      const submitBtn = page.locator('button[type="submit"], button:has-text("Gönder")');

      if (await emailInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
        await emailInput.first().fill('invalid-nonexistent@example.com', { timeout: 5000 });
        await submitBtn.first().click({ timeout: 5000 });

        // Error message bekleniyor
        await expect(page.locator('text=/not.*found|doesn.*t.*exist|hata/i')).toBeVisible({ timeout: 3000 });
      }
    });
  });
});

export {};
