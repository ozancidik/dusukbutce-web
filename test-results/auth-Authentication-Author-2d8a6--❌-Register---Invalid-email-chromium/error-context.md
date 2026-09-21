# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.test.ts >> Authentication & Authorization Tests >> Register Scenarios >> ❌ Register - Invalid email
- Location: tests/auth.test.ts:30:9

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
    - waiting for element to be visible, enabled and stable

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
              - textbox "Email" [active] [ref=e51]:
                - /placeholder: "Örn: kullanici@email.com"
                - text: invalid-email
            - generic [ref=e52]:
              - generic [ref=e53]: Telefon
              - generic [ref=e54]:
                - generic [ref=e55]: "0"
                - textbox "Telefon" [ref=e56]:
                  - /placeholder: (555) 123 45 67
          - generic [ref=e57]:
            - generic [ref=e58]: Doğum Tarihi
            - textbox "Doğum Tarihi" [ref=e59]
          - generic [ref=e61]:
            - generic [ref=e62]:
              - generic [ref=e63]: Şifre
              - generic [ref=e64]:
                - textbox "Şifre" [ref=e65]
                - button [ref=e66] [cursor=pointer]
            - generic [ref=e70]:
              - generic [ref=e71]: Şifre Tekrar
              - generic [ref=e72]:
                - textbox "Şifre Tekrar" [ref=e73]
                - button [ref=e74] [cursor=pointer]
          - generic [ref=e79] [cursor=pointer]:
            - checkbox "Kampanya ve duyurulardan E-Posta ile haberdar olmak istiyorum." [ref=e80]
            - generic [ref=e81]: Kampanya ve duyurulardan E-Posta ile haberdar olmak istiyorum.
          - generic [ref=e83] [cursor=pointer]:
            - checkbox "KVKK kapsamında Aydınlatma Metni ve Gizlilik Politikası’nı okudum, kişisel verilerimin işlenmesine onay veriyorum." [ref=e84]
            - generic [ref=e85]:
              - text: KVKK kapsamında
              - link "Aydınlatma Metni" [ref=e86]:
                - /url: /kvkk
              - text: ve
              - link "Gizlilik Politikası" [ref=e87]:
                - /url: /gizlilik-politikasi
              - text: ’nı okudum, kişisel verilerimin işlenmesine onay veriyorum.
          - button "Kayıt Ol" [disabled] [ref=e88]
        - generic [ref=e89]:
          - text: Zaten hesabınız var mı?
          - link "Giriş Yap" [ref=e90] [cursor=pointer]:
            - /url: /login
    - contentinfo [ref=e91]:
      - generic [ref=e93]:
        - generic [ref=e94]:
          - generic [ref=e95]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e96]
          - paragraph [ref=e97]: Hızlı ve güvenli gönderim
        - generic [ref=e98]:
          - generic [ref=e99]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e100]
          - paragraph [ref=e101]: Memnuniyetiniz önceliğimiz
        - generic [ref=e102]:
          - generic [ref=e103]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e104]
          - paragraph [ref=e105]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e106]:
          - generic [ref=e107]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e108]
          - paragraph [ref=e109]: Sadece bilinen kaliteli markalar
      - generic [ref=e111]:
        - generic [ref=e112]:
          - heading "KURUMSAL" [level=4] [ref=e113]
          - generic [ref=e114]:
            - link "Hakkımızda" [ref=e115] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e116] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e117] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e118]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e119]
          - generic [ref=e120]:
            - link "KVKK Bilgilendirme" [ref=e121] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e122] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e123] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e124] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e125]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e126]
          - generic [ref=e127]:
            - link "Hesabım" [ref=e128] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e129] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e130] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e131] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e132] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e133]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e134]
          - generic [ref=e135]:
            - generic [ref=e136]: 📍
            - generic [ref=e137]:
              - generic [ref=e138]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e139]: 34760 Ümraniye/İstanbul
          - generic [ref=e140]:
            - link [ref=e141] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e142]
            - link [ref=e143] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e144]
            - link [ref=e145] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e146]
            - link [ref=e147] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e150]:
        - generic [ref=e151]:
          - generic [ref=e152]: DB
          - generic [ref=e153]: Düşük Bütçe
        - generic [ref=e154]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e155] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e164] [cursor=pointer]
  - alert [ref=e168]
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
  25  |         // Validation error bekleniyor - generic hata text'i
  26  |         await expect(page.locator('text=/zorunlu|required|error|hata/i')).toBeVisible({ timeout: 3000 });
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
> 37  |         await submitBtn.click({ timeout: 5000 });
      |                         ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
  38  |         await expect(page.locator('text=/email|hata/i')).toBeVisible({ timeout: 3000 });
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
  61  |         await submitBtn.click({ timeout: 5000 });
  62  |         await expect(page.locator('text=/zaten.*var|duplicate|already|kayıtlı/i')).toBeVisible({ timeout: 3000 });
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
  98  |       await expect(page.locator('text=/yanlış|hata|invalid|incorrect/i')).toBeVisible({ timeout: 3000 });
  99  |     });
  100 | 
  101 |     test('❌ Login - Non-existent user', async ({ page }) => {
  102 |       await page.goto(`${BASE_URL}/login`);
  103 |       await page.waitForLoadState('networkidle');
  104 |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  105 |       const passwordInput = page.locator('input[type="password"], input[name*="password"]');
  106 |       const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  107 | 
  108 |       await emailInput.first().fill('nonexistent@example.com', { timeout: 5000 });
  109 |       await passwordInput.first().fill('password123', { timeout: 5000 });
  110 |       await loginBtn.first().click({ timeout: 5000 });
  111 | 
  112 |       // User not found error bekleniyor
  113 |       await expect(page.locator('text=/not.*found|does.*not.*exist|no.*account|hata/i')).toBeVisible({ timeout: 3000 });
  114 |     });
  115 | 
  116 |     test('❌ Login - Empty fields', async ({ page }) => {
  117 |       await page.goto(`${BASE_URL}/login`);
  118 |       await page.waitForLoadState('networkidle');
  119 |       const submitBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  120 |       await submitBtn.first().click({ timeout: 5000 });
  121 |       // Required field errors bekleniyor
  122 |       await expect(page.locator('text=/required|zorunlu|hata/i')).toBeVisible({ timeout: 3000 });
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
```