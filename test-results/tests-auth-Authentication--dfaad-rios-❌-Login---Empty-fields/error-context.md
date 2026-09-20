# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/auth.test.ts >> Authentication & Authorization Tests >> Login Scenarios >> ❌ Login - Empty fields
- Location: tests/auth.test.ts:116:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=/required|zorunlu|hata/i')
Expected: visible
Timeout: 3000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('text=/required|zorunlu|hata/i') with timeout 3000ms
  - waiting for locator('text=/required|zorunlu|hata/i')

```

```yaml
- banner:
  - link "Düşük Bütçe":
    - /url: /
    - img "Düşük Bütçe"
  - textbox "Ürün, kategori veya marka ara..."
  - text: 🔍
  - button "Giriş Yap":
    - img
    - text: Giriş Yap
    - img
  - link "Giriş Yap":
    - /url: /login?returnUrl=%2F
    - img
    - text: Giriş Yap
  - link "Kayıt Ol":
    - /url: /register
    - img
    - text: Kayıt Ol
  - link "Sepet":
    - /url: /sepet
    - button "Sepet":
      - img
      - text: Sepet
- navigation:
  - link "Anasayfa":
    - /url: /
  - text: "> Giriş Yap"
- main:
  - heading "Giriş Yap" [level=1]
  - paragraph: Hesabınıza giriş yapın
  - text: Email
  - textbox "Email":
    - /placeholder: ornek@email.com
  - text: Şifre
  - textbox "Şifre"
  - button "Şifreyi göster":
    - img
  - checkbox "Beni Hatırla"
  - text: Beni Hatırla
  - link "Şifremi unuttum":
    - /url: /sifremi-unuttum
  - button "Giriş Yap"
  - text: veya
  - button "Google ile Giriş Yap":
    - img
    - text: Google ile Giriş Yap
  - button "Facebook ile Giriş Yap":
    - img
    - text: Facebook ile Giriş Yap
  - paragraph: Hesabınız yok mu?
  - link "Kayıt olun":
    - /url: /register
- contentinfo:
  - text: 🚚
  - heading "Güvenilir Gönderim" [level=3]
  - paragraph: Hızlı ve güvenli gönderim
  - text: 😊 ⭐⭐⭐⭐⭐
  - heading "Müşteri Memnuniyeti" [level=3]
  - paragraph: Memnuniyetiniz önceliğimiz
  - text: 💳🛡️
  - heading "Güvenli Ödeme" [level=3]
  - paragraph: "%100 güvenli ödeme altyapısı"
  - text: ✅
  - heading "Kaliteli Markalar" [level=3]
  - paragraph: Sadece bilinen kaliteli markalar
  - heading "KURUMSAL" [level=4]
  - link "Hakkımızda":
    - /url: /hakkimizda
  - link "Banka Hesaplarımız":
    - /url: /banka-hesaplari
  - link "İletişim":
    - /url: /iletisim
  - heading "SİTE KULLANIMI" [level=4]
  - link "KVKK Bilgilendirme":
    - /url: /gizlilik-politikasi
  - link "Satış Sözleşmesi":
    - /url: /satis-sozlesmesi
  - link "Şartlar ve Koşullar":
    - /url: /kullanim-sartlari
  - link "Sık Sorulan Sorular":
    - /url: /sss
  - heading "HESAP BİLGİLERİ" [level=4]
  - link "Hesabım":
    - /url: /profile
  - link "Sipariş Takibi":
    - /url: /siparisler
  - link "Karşılaştırma Listem":
    - /url: /karsilastir
  - link "Favori Ürünlerim":
    - /url: /favoriler
  - link "Tekliflerim":
    - /url: /tekliflerim
  - heading "MAĞAZA ADRESİMİZ" [level=4]
  - text: 📍 Atakent Mah. Yasemin Sokağı No:4 34760 Ümraniye/İstanbul
  - link "Facebook":
    - /url: https://www.facebook.com/dusukbutce/
    - img "Facebook"
  - link "Instagram":
    - /url: https://instagram.com
    - img "Instagram"
  - link "YouTube":
    - /url: https://youtube.com
    - img "YouTube"
  - link:
    - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
    - img
  - text: DB Düşük Bütçe © 2026 Düşük Bütçe. Tüm hakları saklıdır.
- link "WhatsApp Destek Hattı":
  - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - img
  - text: WhatsApp Destek Hattı
- alert
```

# Test source

```ts
  22  |       const submitBtn = page.locator('button[type="submit"]').first();
  23  |       if (await submitBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  24  |         await submitBtn.click({ timeout: 5000 });
  25  |         // Validation error bekleniyor - generic hata text'i
  26  |         await expect(page.locator('text=/zorunlu|required|error|hata/i')).toBeVisible({ timeout: 3000 });
  27  |       }
  28  |     });
  29  | 
  30  |     test('❌ Register - Invalid email', async ({ page }) => {
  31  |       await page.goto(`${BASE_URL}/auth/register`);
  32  |       await page.waitForLoadState('networkidle');
  33  |       const emailInput = page.locator('input[type="email"]').first();
  34  |       if (await emailInput.isVisible({ timeout: 3000 }).catch(() => false)) {
  35  |         await emailInput.fill('invalid-email', { timeout: 5000 });
  36  |         const submitBtn = page.locator('button[type="submit"]').first();
  37  |         await submitBtn.click({ timeout: 5000 });
  38  |         await expect(page.locator('text=/email|hata/i')).toBeVisible({ timeout: 3000 });
  39  |       }
  40  |     });
  41  | 
  42  |     test('❌ Register - Password mismatch', async ({ page }) => {
  43  |       // Skip - complex form validation
  44  |       await page.goto(`${BASE_URL}/auth/register`);
  45  |       await page.waitForLoadState('networkidle');
  46  |       const form = page.locator('form');
  47  |       await expect(form).toBeVisible({ timeout: 5000 });
  48  |     });
  49  | 
  50  |     test('❌ Register - Email already exists', async ({ page }) => {
  51  |       await page.goto(`${BASE_URL}/auth/register`);
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
  73  |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  74  |       const passwordInput = page.locator('input[type="password"], input[name*="password"]');
  75  |       const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  76  | 
  77  |       await emailInput.first().fill('test@example.com', { timeout: 5000 });
  78  |       await passwordInput.first().fill('password123', { timeout: 5000 });
  79  |       await loginBtn.first().click({ timeout: 5000 });
  80  | 
  81  |       // Dashboard veya home page'e yönlendirilmesi bekleniyor
  82  |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  83  |       await expect(page).toHaveURL(/.*(?:home|dashboard|account|profile)/i, { timeout: 5000 });
  84  |     });
  85  | 
  86  |     test('❌ Login - Yanlış password', async ({ page }) => {
  87  |       await page.goto(`${BASE_URL}/login`);
  88  |       await page.waitForLoadState('networkidle');
  89  |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  90  |       const passwordInput = page.locator('input[type="password"], input[name*="password"]');
  91  |       const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  92  | 
  93  |       await emailInput.first().fill('test@example.com', { timeout: 5000 });
  94  |       await passwordInput.first().fill('wrongpassword', { timeout: 5000 });
  95  |       await loginBtn.first().click({ timeout: 5000 });
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
> 122 |       await expect(page.locator('text=/required|zorunlu|hata/i')).toBeVisible({ timeout: 3000 });
      |                                                                   ^ Error: expect(locator).toBeVisible() failed
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
  143 |       const logoutBtn = page.locator('button:has-text("Çıkış"), a:has-text("Çıkış")');
  144 |       await logoutBtn.first().click({ timeout: 5000 });
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
  162 | 
  163 |     test('✅ Session persistence - Sayfa yenilemesinde session korunması', async ({ page }) => {
  164 |       await page.goto(`${BASE_URL}/login`);
  165 |       await page.waitForLoadState('networkidle');
  166 | 
  167 |       // Login yap
  168 |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  169 |       const passwordInput = page.locator('input[type="password"], input[name*="password"]');
  170 |       const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  171 | 
  172 |       await emailInput.first().fill('test@example.com', { timeout: 5000 });
  173 |       await passwordInput.first().fill('password123', { timeout: 5000 });
  174 |       await loginBtn.first().click({ timeout: 5000 });
  175 |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  176 | 
  177 |       // Sayfayı yenile
  178 |       await page.reload();
  179 | 
  180 |       // Session devam etmeli - logout butonu görünür olmalı
  181 |       const logoutBtn = page.locator('button:has-text("Çıkış"), a:has-text("Çıkış")');
  182 |       await expect(logoutBtn.first()).toBeVisible({ timeout: 3000 });
  183 |     });
  184 | 
  185 |     test('✅ Session timeout - Uzun inaktivite sonrası logout', async ({ page }) => {
  186 |       // Bu test gerçek environment'te çalışması için timeout ayarı gerekir
  187 |       // Placeholder test
  188 |       await page.goto(`${BASE_URL}`);
  189 |       await expect(page).toHaveURL(/.*localhost/i);
  190 |     });
  191 |   });
  192 | 
  193 |   // ==================== PASSWORD RECOVERY TESTS ====================
  194 |   test.describe('Password Recovery Scenarios', () => {
  195 | 
  196 |     test('✅ Password recovery - Email gönderimi', async ({ page }) => {
  197 |       await page.goto(`${BASE_URL}/auth/forgot-password`);
  198 |       await page.waitForLoadState('networkidle');
  199 | 
  200 |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  201 |       const submitBtn = page.locator('button[type="submit"], button:has-text("Gönder")');
  202 | 
  203 |       if (await emailInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
  204 |         await emailInput.first().fill('test@example.com', { timeout: 5000 });
  205 |         await submitBtn.first().click({ timeout: 5000 });
  206 | 
  207 |         // Success message bekleniyor
  208 |         await expect(page.locator('text=/check.*email|link.*sent|sent.*you|başarı/i')).toBeVisible({ timeout: 3000 });
  209 |       }
  210 |     });
  211 | 
  212 |     test('❌ Password recovery - Invalid email', async ({ page }) => {
  213 |       await page.goto(`${BASE_URL}/auth/forgot-password`);
  214 |       await page.waitForLoadState('networkidle');
  215 | 
  216 |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  217 |       const submitBtn = page.locator('button[type="submit"], button:has-text("Gönder")');
  218 | 
  219 |       if (await emailInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
  220 |         await emailInput.first().fill('invalid-nonexistent@example.com', { timeout: 5000 });
  221 |         await submitBtn.first().click({ timeout: 5000 });
  222 | 
```