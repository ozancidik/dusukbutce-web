import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  // Testler DB'yi kalıcı olarak değiştiriyor (admin teklif ver/reddet/sil,
  // kullanıcı kabul/red) — her run'ı bilinen, temiz bir durumdan başlatmak
  // için globalSetup ile seed'i çalıştırıyoruz (bkz. tests/global-setup.ts).
  globalSetup: require.resolve('./tests/global-setup.ts'),
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  timeout: 30000,
  reporter: 'html',
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  // TEST_BASE_URL set edilmişse (ör. canlı/production'a karşı test) yerel
  // dev server'ı hiç başlatma — zaten uzak bir URL'e test atılıyor.
  ...(process.env.TEST_BASE_URL ? {} : {
    webServer: {
      command: 'npm run dev',
      url: 'http://localhost:3000',
      reuseExistingServer: true,
      timeout: 60000,
    },
  }),
});
