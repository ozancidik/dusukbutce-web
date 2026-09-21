# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.test.ts >> Authentication & Authorization Tests >> Logout Scenarios >> ✅ Logout - Başarılı çıkış
- Location: tests/auth.test.ts:129:9

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
  138 |       await passwordInput.first().fill('password123', { timeout: 5000 });
  139 |       await loginBtn.first().click({ timeout: 5000 });
  140 |       await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  141 | 
  142 |       // Logout butonunu bul ve tıkla
  143 |       const logoutBtn = page.getByTestId('logout-button');
> 144 |       await logoutBtn.click({ timeout: 5000 });
      |                       ^ TimeoutError: locator.click: Timeout 5000ms exceeded.
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
  181 |       const logoutBtn = page.getByTestId('logout-button');
  182 |       await expect(logoutBtn).toBeVisible({ timeout: 3000 });
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
  223 |         // Error message bekleniyor
  224 |         await expect(page.locator('text=/not.*found|doesn.*t.*exist|hata/i')).toBeVisible({ timeout: 3000 });
  225 |       }
  226 |     });
  227 |   });
  228 | });
  229 | 
  230 | export {};
  231 | 
```