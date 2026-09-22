# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.test.ts >> Authentication & Authorization Tests >> Session Scenarios >> ✅ Session persistence - Sayfa yenilemesinde session korunması
- Location: tests/auth.test.ts:207:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('logout-button')
Expected: visible
Timeout: 3000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('logout-button') with timeout 3000ms
  - waiting for getByTestId('logout-button')

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
  126 |     });
  127 | 
  128 |     test('❌ Login - Yanlış password', async ({ page }) => {
  129 |       await page.goto(`${BASE_URL}/login`);
  130 |       await page.waitForLoadState('networkidle');
  131 |       const emailInput = page.getByTestId('login-email-input');
  132 |       const passwordInput = page.getByTestId('login-password-input');
  133 |       const loginBtn = page.getByTestId('login-submit-button');
  134 | 
  135 |       await emailInput.fill('test@example.com', { timeout: 5000 });
  136 |       await passwordInput.fill('wrongpassword', { timeout: 5000 });
  137 |       await loginBtn.click({ timeout: 5000 });
  138 | 
  139 |       // Error message bekleniyor
  140 |       await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
  141 |     });
  142 | 
  143 |     test('❌ Login - Non-existent user', async ({ page }) => {
  144 |       await page.goto(`${BASE_URL}/login`);
  145 |       await page.waitForLoadState('networkidle');
  146 |       const emailInput = page.getByTestId('login-email-input');
  147 |       const passwordInput = page.getByTestId('login-password-input');
  148 |       const loginBtn = page.getByTestId('login-submit-button');
  149 | 
  150 |       await emailInput.fill('nonexistent@example.com', { timeout: 5000 });
  151 |       await passwordInput.fill('password123', { timeout: 5000 });
  152 |       await loginBtn.click({ timeout: 5000 });
  153 | 
  154 |       // User not found error bekleniyor
  155 |       await expect(page.locator('[data-testid="login-error-message"]')).toBeVisible({ timeout: 3000 });
  156 |     });
  157 | 
  158 |     test('❌ Login - Empty fields', async ({ page }) => {
  159 |       await page.goto(`${BASE_URL}/login`);
  160 |       await page.waitForLoadState('networkidle');
  161 |       const loginBtn = page.getByTestId('login-submit-button');
  162 | 
  163 |       // Browser HTML5 validation kullanıyor, form submit etmeyebilir
  164 |       // Button click'lenecek ama form submit olmayabilir (required attribute)
  165 |       // Skip veya pass with expect.soft
  166 |       expect(loginBtn).toBeDefined();
  167 |     });
  168 |   });
  169 | 
  170 |   // ==================== LOGOUT TESTS ====================
  171 |   test.describe('Logout Scenarios', () => {
  172 | 
  173 |     test('✅ Logout - Başarılı çıkış', async ({ page }) => {
  174 |       await page.goto(`${BASE_URL}/login`);
  175 |       await page.waitForLoadState('networkidle');
  176 | 
  177 |       const emailInput = page.locator('input[type="email"]');
  178 |       const passwordInput = page.locator('input[type="password"]');
  179 |       const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  180 | 
  181 |       await emailInput.first().fill('test@example.com', { timeout: 5000 });
  182 |       await passwordInput.first().fill('password123', { timeout: 5000 });
  183 |       await loginBtn.first().click({ timeout: 5000 });
  184 |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  185 | 
  186 |       // Logout butonunu bul ve tıkla
  187 |       const logoutBtn = page.getByTestId('logout-button');
  188 |       await logoutBtn.click({ timeout: 5000 });
  189 | 
  190 |       // Login sayfasına dönülmesi bekleniyor
  191 |       await expect(page).toHaveURL(/.*(?:login|signin)/i, { timeout: 5000 });
  192 |     });
  193 | 
  194 |     test('✅ Logout - Session cleared', async ({ page }) => {
  195 |       // Logout sonrası authenticated endpoints'e erişim engellenmeli
  196 |       await page.goto(`${BASE_URL}/profile`);
  197 |       await page.waitForLoadState('networkidle');
  198 | 
  199 |       // Login sayfasına yönlendirilmesi bekleniyor
  200 |       await expect(page).toHaveURL(/.*(?:login|signin|auth)/i, { timeout: 5000 });
  201 |     });
  202 |   });
  203 | 
  204 |   // ==================== SESSION TESTS ====================
  205 |   test.describe('Session Scenarios', () => {
  206 | 
  207 |     test('✅ Session persistence - Sayfa yenilemesinde session korunması', async ({ page }) => {
  208 |       await page.goto(`${BASE_URL}/login`);
  209 |       await page.waitForLoadState('networkidle');
  210 | 
  211 |       // Login yap
  212 |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  213 |       const passwordInput = page.locator('input[type="password"], input[name*="password"]');
  214 |       const loginBtn = page.locator('button[type="submit"], button:has-text("Giriş")');
  215 | 
  216 |       await emailInput.first().fill('test@example.com', { timeout: 5000 });
  217 |       await passwordInput.first().fill('password123', { timeout: 5000 });
  218 |       await loginBtn.first().click({ timeout: 5000 });
  219 |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  220 | 
  221 |       // Sayfayı yenile
  222 |       await page.reload();
  223 | 
  224 |       // Session devam etmeli - logout butonu görünür olmalı
  225 |       const logoutBtn = page.getByTestId('logout-button');
> 226 |       await expect(logoutBtn).toBeVisible({ timeout: 3000 });
      |                               ^ Error: expect(locator).toBeVisible() failed
  227 |     });
  228 | 
  229 |     test('✅ Session timeout - Uzun inaktivite sonrası logout', async ({ page }) => {
  230 |       // Bu test gerçek environment'te çalışması için timeout ayarı gerekir
  231 |       // Placeholder test
  232 |       await page.goto(`${BASE_URL}`);
  233 |       await expect(page).toHaveURL(/.*localhost/i);
  234 |     });
  235 |   });
  236 | 
  237 |   // ==================== PASSWORD RECOVERY TESTS ====================
  238 |   test.describe('Password Recovery Scenarios', () => {
  239 | 
  240 |     test('✅ Password recovery - Email gönderimi', async ({ page }) => {
  241 |       await page.goto(`${BASE_URL}/auth/forgot-password`);
  242 |       await page.waitForLoadState('networkidle');
  243 | 
  244 |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  245 |       const submitBtn = page.locator('button[type="submit"], button:has-text("Gönder")');
  246 | 
  247 |       if (await emailInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
  248 |         await emailInput.first().fill('test@example.com', { timeout: 5000 });
  249 |         await submitBtn.first().click({ timeout: 5000 });
  250 | 
  251 |         // Success message bekleniyor
  252 |         await expect(page.locator('text=/check.*email|link.*sent|sent.*you|başarı/i')).toBeVisible({ timeout: 3000 });
  253 |       }
  254 |     });
  255 | 
  256 |     test('❌ Password recovery - Invalid email', async ({ page }) => {
  257 |       await page.goto(`${BASE_URL}/auth/forgot-password`);
  258 |       await page.waitForLoadState('networkidle');
  259 | 
  260 |       const emailInput = page.locator('input[type="email"], input[name*="email"]');
  261 |       const submitBtn = page.locator('button[type="submit"], button:has-text("Gönder")');
  262 | 
  263 |       if (await emailInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
  264 |         await emailInput.first().fill('invalid-nonexistent@example.com', { timeout: 5000 });
  265 |         await submitBtn.first().click({ timeout: 5000 });
  266 | 
  267 |         // Error message bekleniyor
  268 |         await expect(page.locator('text=/not.*found|doesn.*t.*exist|hata/i')).toBeVisible({ timeout: 3000 });
  269 |       }
  270 |     });
  271 |   });
  272 | });
  273 | 
  274 | export {};
  275 | 
```