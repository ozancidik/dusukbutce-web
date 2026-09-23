import { chromium, type FullConfig } from '@playwright/test';
import path from 'path';

// Playwright globalSetup — her `npx playwright test` çalıştırmasından önce
// bir kez çalışır.
//
// 1) Seed: Admin işlemleri (teklif ver/reddet/sil) ve kullanıcı aksiyonları
//    (kabul/red) gerçekten DB'yi kalıcı olarak değiştiriyor — seed olmadan
//    ikinci bir test run'ı ilk run'ın bıraktığı durumu görür (ör.
//    TEST-PENDING-001 zaten 'offered' olmuş olabilir). Her run'ı bilinen,
//    temiz bir başlangıç durumundan başlatmak için seed'i burada çalıştırıyoruz.
//
// 2) Auth storageState: /api/auth/login rate limit'i IP başına 5 dakikada
//    10 deneme ile sınırlı (checkRateLimit, name:'login'). admin-panel.test.ts
//    + offer-management.test.ts birlikte ~16 test login yapıyordu — HER TEST
//    kendi login'ini yaptığı için tek bir suite run'ı KENDİ rate limit'ine
//    takılıyordu (gerçek bir uygulama bug'ı değil, ama testleri güvenilmez
//    kılıyordu). Çözüm: admin ve normal kullanıcı için BİR KERE login olup
//    storageState'i (cookies + localStorage, adminToken dahil) dosyaya
//    kaydediyoruz; testler bunu test.use({storageState}) ile yeniden
//    kullanıyor, tekrar tekrar login yapmıyor.
import seedDatabase from '../scripts/seed-e2e';

const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000';
export const ADMIN_STORAGE_STATE = path.join(__dirname, '.auth/admin.json');
export const USER_STORAGE_STATE = path.join(__dirname, '.auth/user.json');

async function loginAndSaveState(baseUrl: string, email: string, password: string, outPath: string, isAdmin: boolean) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  // NOT: waitForLoadState('networkidle') production'da (analytics/tracking
  // script'leri sürekli network isteği attığı için sayfa hiç "idle" olmuyor)
  // 30s'de timeout oluyordu. CSRF token response'unu doğrudan beklemek hem
  // daha hızlı hem network gürültüsünden etkilenmiyor.
  const csrfPromise = page.waitForResponse(res => res.url().includes('/api/auth/csrf-token'), { timeout: 15000 }).catch(() => null);
  await page.goto(`${baseUrl}/login`);
  await csrfPromise;
  await page.getByTestId('login-email-input').fill(email, { timeout: 5000 });
  await page.getByTestId('login-password-input').fill(password, { timeout: 5000 });
  await page.getByTestId('login-submit-button').click({ timeout: 5000 });

  if (isAdmin) {
    await page.waitForFunction(
      () => !!(localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken')),
      { timeout: 10000 }
    ).catch(() => {});
    await page.waitForURL(/\/admin/, { timeout: 8000 }).catch(() => {});
  } else {
    await page.waitForFunction(
      () => !!(localStorage.getItem('userLoggedIn')),
      { timeout: 10000 }
    ).catch(() => {});
  }

  await page.context().storageState({ path: outPath });
  await browser.close();
}

export default async function globalSetup(config: FullConfig) {
  await seedDatabase();

  const baseURL = config.projects[0]?.use?.baseURL || BASE_URL;
  await loginAndSaveState(baseURL, 'admin@example.com', 'admin123', ADMIN_STORAGE_STATE, true);
  await loginAndSaveState(baseURL, 'test@example.com', 'password123', USER_STORAGE_STATE, false);
}
