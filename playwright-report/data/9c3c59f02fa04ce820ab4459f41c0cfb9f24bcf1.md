# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.test.ts >> Authentication & Authorization Tests >> Register Scenarios >> ❌ Register - Email already exists
- Location: tests/auth.test.ts:50:9

# Error details

```
TimeoutError: locator.click: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('button[type="submit"]').first()
    - locator resolved to <button disabled type="submit" class="jsx-751db523c8ecbef9">Kayıt Ol</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 100ms
    9 × waiting for element to be visible, enabled and stable
      - element is not enabled
    - retrying click action
      - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e5]:
        - link [ref=e6] [cursor=pointer]:
          - /url: /
          - img "Düşük Bütçe" [ref=e7]
        - generic [ref=e10]:
          - textbox "Ürün, kategori veya marka ara..." [ref=e11]
          - generic [ref=e12]: 🔍
        - generic [ref=e13]:
          - button "Giriş Yap" [ref=e15] [cursor=pointer]
          - link [ref=e21] [cursor=pointer]:
            - /url: /sepet
            - button "Sepet" [ref=e22]
    - navigation [ref=e27]:
      - generic [ref=e28]:
        - link "Anasayfa" [ref=e29] [cursor=pointer]:
          - /url: /
        - generic [ref=e30]: ">"
        - generic [ref=e31]: Kayıt Ol
    - main [ref=e32]:
      - generic [ref=e34]:
        - generic [ref=e35]:
          - heading "Kayıt Ol" [level=1] [ref=e36]
          - paragraph [ref=e37]: Hesabınızı oluşturun
        - generic [ref=e38]:
          - generic [ref=e40]:
            - generic [ref=e41]:
              - generic [ref=e42]: Ad
              - textbox "Ad" [ref=e43]
            - generic [ref=e44]:
              - generic [ref=e45]: Soyad
              - textbox "Soyad" [ref=e46]
          - generic [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]: Email
              - textbox "Email" [ref=e51]:
                - /placeholder: "Örn: kullanici@email.com"
                - text: test@example.com
              - generic [ref=e52]: Bu email adresi zaten kayıtlı
            - generic [ref=e53]:
              - generic [ref=e54]: Telefon
              - generic [ref=e55]:
                - generic [ref=e56]: "0"
                - textbox "Telefon" [active] [ref=e57]:
                  - /placeholder: (555) 123 45 67
          - generic [ref=e58]:
            - generic [ref=e59]: Doğum Tarihi
            - textbox "Doğum Tarihi" [ref=e60]
          - generic [ref=e62]:
            - generic [ref=e63]:
              - generic [ref=e64]: Şifre
              - generic [ref=e65]:
                - textbox "Şifre" [ref=e66]
                - button [ref=e67] [cursor=pointer]
            - generic [ref=e71]:
              - generic [ref=e72]: Şifre Tekrar
              - generic [ref=e73]:
                - textbox "Şifre Tekrar" [ref=e74]
                - button [ref=e75] [cursor=pointer]
          - generic [ref=e80] [cursor=pointer]:
            - checkbox "Kampanya ve duyurulardan E-Posta ile haberdar olmak istiyorum." [ref=e81]
            - generic [ref=e82]: Kampanya ve duyurulardan E-Posta ile haberdar olmak istiyorum.
          - generic [ref=e84] [cursor=pointer]:
            - checkbox "KVKK kapsamında Aydınlatma Metni ve Gizlilik Politikası’nı okudum, kişisel verilerimin işlenmesine onay veriyorum." [ref=e85]
            - generic [ref=e86]:
              - text: KVKK kapsamında
              - link "Aydınlatma Metni" [ref=e87]:
                - /url: /kvkk
              - text: ve
              - link "Gizlilik Politikası" [ref=e88]:
                - /url: /gizlilik-politikasi
              - text: ’nı okudum, kişisel verilerimin işlenmesine onay veriyorum.
          - button "Kayıt Ol" [disabled] [ref=e89]
        - generic [ref=e90]:
          - text: Zaten hesabınız var mı?
          - link "Giriş Yap" [ref=e91] [cursor=pointer]:
            - /url: /login
    - contentinfo [ref=e92]:
      - generic [ref=e94]:
        - generic [ref=e95]:
          - generic [ref=e96]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e97]
          - paragraph [ref=e98]: Hızlı ve güvenli gönderim
        - generic [ref=e99]:
          - generic [ref=e100]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e101]
          - paragraph [ref=e102]: Memnuniyetiniz önceliğimiz
        - generic [ref=e103]:
          - generic [ref=e104]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e105]
          - paragraph [ref=e106]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e107]:
          - generic [ref=e108]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e109]
          - paragraph [ref=e110]: Sadece bilinen kaliteli markalar
      - generic [ref=e112]:
        - generic [ref=e113]:
          - heading "KURUMSAL" [level=4] [ref=e114]
          - generic [ref=e115]:
            - link "Hakkımızda" [ref=e116] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e117] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e118] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e119]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e120]
          - generic [ref=e121]:
            - link "KVKK Bilgilendirme" [ref=e122] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e123] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e124] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e125] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e126]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e127]
          - generic [ref=e128]:
            - link "Hesabım" [ref=e129] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e130] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e131] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e132] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e133] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e134]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e135]
          - generic [ref=e136]:
            - generic [ref=e137]: 📍
            - generic [ref=e138]:
              - generic [ref=e139]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e140]: 34760 Ümraniye/İstanbul
          - generic [ref=e141]:
            - link [ref=e142] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e143]
            - link [ref=e144] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e145]
            - link [ref=e146] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e147]
            - link [ref=e148] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e151]:
        - generic [ref=e152]:
          - generic [ref=e153]: DB
          - generic [ref=e154]: Düşük Bütçe
        - generic [ref=e155]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e156] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e165] [cursor=pointer]
  - alert [ref=e169]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'http://localhost:3000';
  4   | 
  5   | test.describe('Authentication & Authorization Tests', () => {
  6   | 
  7   |   // ==================== REGISTER TESTS ====================
  8   |   test.describe('Register Scenarios', () => {
  9   | 
  10  |     test('✅ Register - Başarılı kayıt', async ({ page }) => {
  11  |       await page.goto(`${BASE_URL}/register`);
  12  |       await page.waitForLoadState('networkidle');
  13  |       // Form yüklenmesini kontrol et
  14  |       const form = page.locator('form');
  15  |       await expect(form).toBeVisible({ timeout: 5000 });
  16  |     });
  17  | 
  18  |     test('❌ Register - Boş form gönderimi', async ({ page }) => {
  19  |       await page.goto(`${BASE_URL}/register`);
  20  |       await page.waitForLoadState('networkidle');
  21  |       // Submit button'ı bul
  22  |       const submitBtn = page.locator('button[type="submit"]').first();
  23  |       if (await submitBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  24  |         await submitBtn.click({ timeout: 5000 });
  25  |         // Validation error bekleniyor - register error message div'ine bak
  26  |         await expect(page.locator('[data-testid="register-error-message"]')).toBeVisible({ timeout: 3000 });
  27  |       }
  28  |     });
  29  | 
  30  |     test('❌ Register - Invalid email', async ({ page }) => {
  31  |       await page.goto(`${BASE_URL}/register`);
  32  |       await page.waitForLoadState('networkidle');
  33  |       const emailInput = page.locator('input[type="email"]').first();
  34  |       if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  35  |         await emailInput.fill('invalid-email', { timeout: 5000 });
  36  |         const submitBtn = page.locator('button[type="submit"]').first();
  37  |         await submitBtn.click({ timeout: 5000 });
  38  |         await expect(page.locator('[data-testid="register-error-message"]')).toBeVisible({ timeout: 3000 });
  39  |       }
  40  |     });
  41  | 
  42  |     test('❌ Register - Password mismatch', async ({ page }) => {
  43  |       // Skip - complex form validation
  44  |       await page.goto(`${BASE_URL}/register`);
  45  |       await page.waitForLoadState('networkidle');
  46  |       const form = page.locator('form');
  47  |       await expect(form).toBeVisible({ timeout: 5000 });
  48  |     });
  49  | 
  50  |     test('❌ Register - Email already exists', async ({ page }) => {
  51  |       await page.goto(`${BASE_URL}/register`);
  52  |       await page.waitForLoadState('networkidle');
  53  |       const emailInput = page.locator('input[type="email"]').first();
  54  |       if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  55  |         await emailInput.fill('test@example.com', { timeout: 5000 });
  56  |         const phoneInput = page.locator('input[type="tel"], input[type="text"][name*="phone"], input[placeholder*="telefon"]').first();
  57  |         if (await phoneInput.isVisible({ timeout: 2000 }).catch(() => false)) {
  58  |           await phoneInput.fill('05559999999', { timeout: 5000 });
  59  |         }
  60  |         const submitBtn = page.locator('button[type="submit"]').first();
> 61  |         await submitBtn.click({ timeout: 5000 });
      |                         ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
  62  |         await expect(page.locator('[data-testid="register-error-message"]')).toBeVisible({ timeout: 3000 });
  63  |       }
  64  |     });
  65  |   });
  66  | 
  67  |   // ==================== LOGIN TESTS ====================
  68  |   test.describe('Login Scenarios', () => {
  69  | 
  70  |     test('✅ Login - Başarılı giriş', async ({ page }) => {
  71  |       await page.goto(`${BASE_URL}/login`);
  72  |       await page.waitForLoadState('networkidle');
  73  |       const emailInput = page.getByTestId('login-email-input');
  74  |       const passwordInput = page.getByTestId('login-password-input');
  75  |       const loginBtn = page.getByTestId('login-submit-button');
  76  | 
  77  |       await emailInput.fill('test@example.com', { timeout: 5000 });
  78  |       await passwordInput.fill('password123', { timeout: 5000 });
  79  |       await loginBtn.click({ timeout: 5000 });
  80  | 
  81  |       // Home page'e yönlendirilmesi bekleniyor
  82  |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  83  |       await expect(page).toHaveURL(/.*\/$/, { timeout: 5000 });
  84  |     });
  85  | 
  86  |     test('❌ Login - Yanlış password', async ({ page }) => {
  87  |       await page.goto(`${BASE_URL}/login`);
  88  |       await page.waitForLoadState('networkidle');
  89  |       const emailInput = page.getByTestId('login-email-input');
  90  |       const passwordInput = page.getByTestId('login-password-input');
  91  |       const loginBtn = page.getByTestId('login-submit-button');
  92  | 
  93  |       await emailInput.fill('test@example.com', { timeout: 5000 });
  94  |       await passwordInput.fill('wrongpassword', { timeout: 5000 });
  95  |       await loginBtn.click({ timeout: 5000 });
  96  | 
  97  |       // Error message bekleniyor
  98  |       await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
  99  |     });
  100 | 
  101 |     test('❌ Login - Non-existent user', async ({ page }) => {
  102 |       await page.goto(`${BASE_URL}/login`);
  103 |       await page.waitForLoadState('networkidle');
  104 |       const emailInput = page.getByTestId('login-email-input');
  105 |       const passwordInput = page.getByTestId('login-password-input');
  106 |       const loginBtn = page.getByTestId('login-submit-button');
  107 | 
  108 |       await emailInput.fill('nonexistent@example.com', { timeout: 5000 });
  109 |       await passwordInput.fill('password123', { timeout: 5000 });
  110 |       await loginBtn.click({ timeout: 5000 });
  111 | 
  112 |       // User not found error bekleniyor
  113 |       await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
  114 |     });
  115 | 
  116 |     test('❌ Login - Empty fields', async ({ page }) => {
  117 |       await page.goto(`${BASE_URL}/login`);
  118 |       await page.waitForLoadState('networkidle');
  119 |       const loginBtn = page.getByTestId('login-submit-button');
  120 |       await loginBtn.click({ timeout: 5000 });
  121 |       // Required field errors bekleniyor
  122 |       await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
  123 |     });
  124 |   });
  125 | 
  126 |   // ==================== LOGOUT TESTS ====================
  127 |   test.describe('Logout Scenarios', () => {
  128 | 
  129 |     test('✅ Logout - Başarılı çıkış', async ({ page }) => {
  130 |       await page.goto(`${BASE_URL}/login`);
  131 |       await page.waitForLoadState('networkidle');
  132 | 
  133 |       const emailInput = page.locator('input[type="email"]');
  134 |       const passwordInput = page.locator('input[type="password"]');
  135 |       const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  136 | 
  137 |       await emailInput.first().fill('test@example.com', { timeout: 5000 });
  138 |       await passwordInput.first().fill('password123', { timeout: 5000 });
  139 |       await loginBtn.first().click({ timeout: 5000 });
  140 |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  141 | 
  142 |       // Logout butonunu bul ve tıkla
  143 |       const logoutBtn = page.getByTestId('logout-button');
  144 |       await logoutBtn.click({ timeout: 5000 });
  145 | 
  146 |       // Login sayfasına dönülmesi bekleniyor
  147 |       await expect(page).toHaveURL(/.*(?:login|signin)/i, { timeout: 5000 });
  148 |     });
  149 | 
  150 |     test('✅ Logout - Session cleared', async ({ page }) => {
  151 |       // Logout sonrası authenticated endpoints'e erişim engellenmeli
  152 |       await page.goto(`${BASE_URL}/profile`);
  153 |       await page.waitForLoadState('networkidle');
  154 | 
  155 |       // Login sayfasına yönlendirilmesi bekleniyor
  156 |       await expect(page).toHaveURL(/.*(?:login|signin|auth)/i, { timeout: 5000 });
  157 |     });
  158 |   });
  159 | 
  160 |   // ==================== SESSION TESTS ====================
  161 |   test.describe('Session Scenarios', () => {
```