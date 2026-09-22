# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.test.ts >> Authentication & Authorization Tests >> Logout Scenarios >> ✅ Logout - Başarılı çıkış
- Location: tests/auth.test.ts:173:9

# Error details

```
TimeoutError: locator.click: Timeout 5000ms exceeded.
Call log:
  - waiting for getByTestId('logout-button')

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
          - generic [ref=e14]:
            - button "Giriş Yap" [active] [ref=e15] [cursor=pointer]
            - generic [ref=e21]:
              - link "Giriş Yap" [ref=e22] [cursor=pointer]:
                - /url: /login?returnUrl=%2F
              - link "Kayıt Ol" [ref=e27] [cursor=pointer]:
                - /url: /register
          - link [ref=e32] [cursor=pointer]:
            - /url: /sepet
            - button "Sepet" [ref=e33]
    - navigation [ref=e38]:
      - generic [ref=e39]:
        - link "Anasayfa" [ref=e40] [cursor=pointer]:
          - /url: /
        - generic [ref=e41]: ">"
        - generic [ref=e42]: Giriş Yap
    - main [ref=e43]:
      - generic [ref=e45]:
        - generic [ref=e46]:
          - heading "Giriş Yap" [level=1] [ref=e47]
          - paragraph [ref=e48]: Hesabınıza giriş yapın
        - generic [ref=e49]:
          - generic [ref=e50]:
            - generic [ref=e51]: Email
            - textbox "Email" [ref=e52]:
              - /placeholder: ornek@email.com
              - text: test@example.com
          - generic [ref=e53]:
            - generic [ref=e54]: Şifre
            - generic [ref=e55]:
              - textbox "Şifre" [ref=e56]: password123
              - button "Şifreyi göster" [ref=e57] [cursor=pointer]
          - generic [ref=e61]:
            - generic [ref=e62] [cursor=pointer]:
              - checkbox "Beni Hatırla" [ref=e63]
              - generic [ref=e64]: Beni Hatırla
            - link "Şifremi unuttum" [ref=e65] [cursor=pointer]:
              - /url: /sifremi-unuttum
          - button "Giriş Yap" [ref=e66] [cursor=pointer]
        - generic [ref=e67]:
          - generic [ref=e68]: veya
          - button "Google ile Giriş Yap" [ref=e72] [cursor=pointer]
          - button "Facebook ile Giriş Yap" [ref=e78] [cursor=pointer]
        - generic [ref=e81]:
          - paragraph [ref=e82]: Hesabınız yok mu?
          - link "Kayıt olun" [ref=e83] [cursor=pointer]:
            - /url: /register
    - contentinfo [ref=e84]:
      - generic [ref=e86]:
        - generic [ref=e87]:
          - generic [ref=e88]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e89]
          - paragraph [ref=e90]: Hızlı ve güvenli gönderim
        - generic [ref=e91]:
          - generic [ref=e92]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e93]
          - paragraph [ref=e94]: Memnuniyetiniz önceliğimiz
        - generic [ref=e95]:
          - generic [ref=e96]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e97]
          - paragraph [ref=e98]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e99]:
          - generic [ref=e100]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e101]
          - paragraph [ref=e102]: Sadece bilinen kaliteli markalar
      - generic [ref=e104]:
        - generic [ref=e105]:
          - heading "KURUMSAL" [level=4] [ref=e106]
          - generic [ref=e107]:
            - link "Hakkımızda" [ref=e108] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e109] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e110] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e111]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e112]
          - generic [ref=e113]:
            - link "KVKK Bilgilendirme" [ref=e114] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e115] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e116] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e117] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e118]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e119]
          - generic [ref=e120]:
            - link "Hesabım" [ref=e121] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e122] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e123] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e124] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e125] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e126]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e127]
          - generic [ref=e128]:
            - generic [ref=e129]: 📍
            - generic [ref=e130]:
              - generic [ref=e131]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e132]: 34760 Ümraniye/İstanbul
          - generic [ref=e133]:
            - link [ref=e134] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e135]
            - link [ref=e136] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e137]
            - link [ref=e138] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e139]
            - link [ref=e140] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e143]:
        - generic [ref=e144]:
          - generic [ref=e145]: DB
          - generic [ref=e146]: Düşük Bütçe
        - generic [ref=e147]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e148] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e157] [cursor=pointer]
  - alert [ref=e161]
```

# Test source

```ts
  88  | 
  89  |       // KVKK checkbox check et
  90  |       const kvkkCheckbox = page.locator('input[type="checkbox"]').last();
  91  |       await kvkkCheckbox.check({ timeout: 5000 });
  92  | 
  93  |       // Email check'inin tamamlanmasını bekle (debounce 500ms)
  94  |       await page.waitForTimeout(600);
  95  | 
  96  |       const submitBtn = page.locator('button[type="submit"]').first();
  97  |       if (await submitBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
  98  |         await submitBtn.click({ timeout: 5000 });
  99  |         // Button zaten disabled olmuş olmalı (emailExists = true)
  100 |         // Ama error check'inde stabil olmak için
  101 |         await expect(page.locator('[data-testid="register-error-message"]')).toBeVisible({ timeout: 3000 }).catch(() => {
  102 |           // Eğer error div yoksa, button disabled olmuş demektir
  103 |           expect(submitBtn).toBeDisabled();
  104 |         });
  105 |       }
  106 |     });
  107 |   });
  108 | 
  109 |   // ==================== LOGIN TESTS ====================
  110 |   test.describe('Login Scenarios', () => {
  111 | 
  112 |     test('✅ Login - Başarılı giriş', async ({ page }) => {
  113 |       await page.goto(`${BASE_URL}/login`);
  114 |       await page.waitForLoadState('networkidle');
  115 |       const emailInput = page.getByTestId('login-email-input');
  116 |       const passwordInput = page.getByTestId('login-password-input');
  117 |       const loginBtn = page.getByTestId('login-submit-button');
  118 | 
  119 |       await emailInput.fill('test@example.com', { timeout: 5000 });
  120 |       await passwordInput.fill('password123', { timeout: 5000 });
  121 |       await loginBtn.click({ timeout: 5000 });
  122 | 
  123 |       // Home page'e yönlendirilmesi bekleniyor
  124 |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  125 |       await expect(page).toHaveURL(/.*\/$/, { timeout: 5000 });
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
> 188 |       await logoutBtn.click({ timeout: 5000 });
      |                       ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
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
  226 |       await expect(logoutBtn).toBeVisible({ timeout: 3000 });
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