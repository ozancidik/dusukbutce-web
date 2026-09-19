# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/auth.test.ts >> Authentication & Authorization Tests >> Login Scenarios >> ✅ Login - Başarılı giriş
- Location: tests/auth.test.ts:70:9

# Error details

```
Error: locator.click: Error: strict mode violation: getByText(/giriş|login/i) resolved to 2 elements:
    1) <button class="jsx-e784ed9b9e6cb6fe">…</button> aka getByRole('button', { name: 'Giriş Yap' })
    2) <div class="jsx-e784ed9b9e6cb6fe">Giriş</div> aka getByText('Giriş', { exact: true })

Call log:
  - waiting for getByText(/giriş|login/i)

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e5]:
        - link [ref=e6] [cursor=pointer]:
          - /url: /
          - img "Düşük Bütçe" [ref=e7]
        - generic [ref=e8]:
          - button "Giriş Yap" [ref=e10] [cursor=pointer]
          - link [ref=e16] [cursor=pointer]:
            - /url: /sepet
            - button "Sepet" [ref=e17]
    - main [ref=e22]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - heading "2. El Ürününü" [level=2] [ref=e30]
          - link [ref=e33] [cursor=pointer]:
            - /url: /bize-sat
            - button "BİZE SAT" [ref=e34]
          - heading "Kategoriler" [level=3] [ref=e35]
          - generic [ref=e36]:
            - generic [ref=e37]:
              - link "💻 Dizüstü (Notebook)" [ref=e38] [cursor=pointer]:
                - /url: /bize-sat/notebook
                - generic [ref=e39]:
                  - generic [ref=e40]: 💻
                  - text: Dizüstü (Notebook)
              - link "🖥️ Masaüstü (Kasa)" [ref=e41] [cursor=pointer]:
                - /url: /bize-sat/masaustu
                - generic [ref=e42]:
                  - generic [ref=e43]: 🖥️
                  - text: Masaüstü (Kasa)
              - link "🖥️ Monitör" [ref=e44] [cursor=pointer]:
                - /url: /bize-sat/monitor
                - generic [ref=e45]:
                  - generic [ref=e46]: 🖥️
                  - text: Monitör
              - link [ref=e47] [cursor=pointer]:
                - /url: /bize-sat/ekran-karti
                - generic [ref=e48]:
                  - img "Ekran Kartı" [ref=e49]
                  - text: Ekran Kartı
              - link [ref=e50] [cursor=pointer]:
                - /url: /bize-sat/islemci
                - generic [ref=e51]:
                  - img "İşlemci" [ref=e52]
                  - text: İşlemci
              - link [ref=e53] [cursor=pointer]:
                - /url: /bize-sat/ram
                - generic [ref=e54]:
                  - img "RAM" [ref=e55]
                  - text: RAM
              - link [ref=e56] [cursor=pointer]:
                - /url: /bize-sat/ssd
                - generic [ref=e57]:
                  - img "SSD" [ref=e58]
                  - text: SSD
              - link [ref=e59] [cursor=pointer]:
                - /url: /bize-sat/sogutucu
                - generic [ref=e60]:
                  - img "Soğutucu" [ref=e61]
                  - text: Soğutucu
              - link [ref=e62] [cursor=pointer]:
                - /url: /bize-sat/kasa
                - generic [ref=e63]:
                  - img "Boş Kasa" [ref=e64]
                  - text: Boş Kasa
              - link "📄 Fotokopi Makinesi" [ref=e65] [cursor=pointer]:
                - /url: /bize-sat/fotokopi-makinesi
                - generic [ref=e66]:
                  - generic [ref=e67]: 📄
                  - text: Fotokopi Makinesi
              - link "🖨️ Yazıcı" [ref=e68] [cursor=pointer]:
                - /url: /bize-sat/yazici
                - generic [ref=e69]:
                  - generic [ref=e70]: 🖨️
                  - text: Yazıcı
            - generic [ref=e71]:
              - link "📱 Cep Telefonu" [ref=e72] [cursor=pointer]:
                - /url: /bize-sat/cep-telefonu
                - generic [ref=e73]:
                  - generic [ref=e74]: 📱
                  - text: Cep Telefonu
              - link [ref=e75] [cursor=pointer]:
                - /url: /bize-sat/playstation
                - generic [ref=e76]:
                  - img "PlayStation" [ref=e77]
                  - text: PlayStation
              - link [ref=e78] [cursor=pointer]:
                - /url: /bize-sat/gamepad
                - generic [ref=e79]:
                  - img "Gamepad" [ref=e80]
                  - text: Gamepad
              - link [ref=e81] [cursor=pointer]:
                - /url: /bize-sat/xbox
                - generic [ref=e82]:
                  - img "Xbox" [ref=e83]
                  - text: Xbox
              - link "⌨️ Klavye" [ref=e84] [cursor=pointer]:
                - /url: /bize-sat/klavye
                - generic [ref=e85]:
                  - generic [ref=e86]: ⌨️
                  - text: Klavye
              - link "🖱️ Mouse" [ref=e87] [cursor=pointer]:
                - /url: /bize-sat/mouse
                - generic [ref=e88]:
                  - generic [ref=e89]: 🖱️
                  - text: Mouse
              - link [ref=e90] [cursor=pointer]:
                - /url: /bize-sat/tablet
                - generic [ref=e91]:
                  - img "Tablet" [ref=e92]
                  - text: Tablet
              - link "🎧 Kulaklık" [ref=e93] [cursor=pointer]:
                - /url: /bize-sat/kulaklik
                - generic [ref=e94]:
                  - generic [ref=e95]: 🎧
                  - text: Kulaklık
              - link [ref=e96] [cursor=pointer]:
                - /url: /bize-sat/ses-sistemi
                - generic [ref=e97]:
                  - img "Ses Sistemi" [ref=e98]
                  - text: Ses Sistemi
              - link "🔍 Tarayıcı" [ref=e99] [cursor=pointer]:
                - /url: /bize-sat/tarayici
                - generic [ref=e100]:
                  - generic [ref=e101]: 🔍
                  - text: Tarayıcı
        - generic [ref=e103]:
          - link "Uzman Ekibimizden Destek Al 🚚 İstanbul içi aynı gün teslim alalım TEKNİK SERVİS Kategoriler 🖥️ PC Onarım 💻 Laptop Tamiri 🖥️ Monitör Tamiri 💾 Format Atma 🔧 Parça Montajı 📱 Telefon Onarım 📱 Tablet Tamiri ⚙️ PC Toplama 💿 Veri Kurtarma" [ref=e104] [cursor=pointer]:
            - /url: /teknik-servis
            - generic [ref=e105]:
              - generic [ref=e107]:
                - generic [ref=e108]: Uzman Ekibimizden Destek Al
                - generic [ref=e109]:
                  - generic [ref=e110]: 🚚
                  - text: İstanbul içi aynı gün teslim alalım
              - button "TEKNİK SERVİS" [ref=e114]
              - heading "Kategoriler" [level=3] [ref=e116]
              - generic [ref=e118]:
                - generic [ref=e119]:
                  - generic [ref=e120]: 🖥️
                  - text: PC Onarım
                - generic [ref=e121]:
                  - generic [ref=e122]: 💻
                  - text: Laptop Tamiri
                - generic [ref=e123]:
                  - generic [ref=e124]: 🖥️
                  - text: Monitör Tamiri
                - generic [ref=e125]:
                  - generic [ref=e126]: 💾
                  - text: Format Atma
                - generic [ref=e127]:
                  - generic [ref=e128]: 🔧
                  - text: Parça Montajı
                - generic [ref=e129]:
                  - generic [ref=e130]: 📱
                  - text: Telefon Onarım
                - generic [ref=e131]:
                  - generic [ref=e132]: 📱
                  - text: Tablet Tamiri
                - generic [ref=e133]:
                  - generic [ref=e134]: ⚙️
                  - text: PC Toplama
                - generic [ref=e135]:
                  - generic [ref=e136]: 💿
                  - text: Veri Kurtarma
          - generic [ref=e137]:
            - link [ref=e139] [cursor=pointer]:
              - /url: /satilik-ilanlar
              - button "SATILIK İLANLAR" [ref=e140]
            - generic [ref=e141]: Yükleniyor...
    - contentinfo [ref=e144]:
      - generic [ref=e146]:
        - generic [ref=e147]:
          - generic [ref=e148]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e149]
          - paragraph [ref=e150]: Hızlı ve güvenli gönderim
        - generic [ref=e151]:
          - generic [ref=e152]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e153]
          - paragraph [ref=e154]: Memnuniyetiniz önceliğimiz
        - generic [ref=e155]:
          - generic [ref=e156]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e157]
          - paragraph [ref=e158]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e159]:
          - generic [ref=e160]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e161]
          - paragraph [ref=e162]: Sadece bilinen kaliteli markalar
      - generic [ref=e164]:
        - generic [ref=e165]:
          - heading "KURUMSAL" [level=4] [ref=e166]
          - generic [ref=e167]:
            - link "Hakkımızda" [ref=e168] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e169] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e170] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e171]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e172]
          - generic [ref=e173]:
            - link "KVKK Bilgilendirme" [ref=e174] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e175] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e176] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e177] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e178]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e179]
          - generic [ref=e180]:
            - link "Hesabım" [ref=e181] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e182] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e183] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e184] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e185] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e186]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e187]
          - generic [ref=e188]:
            - generic [ref=e189]: 📍
            - generic [ref=e190]:
              - generic [ref=e191]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e192]: 34760 Ümraniye/İstanbul
          - generic [ref=e193]:
            - link [ref=e194] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e195]
            - link [ref=e196] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e197]
            - link [ref=e198] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e199]
            - link [ref=e200] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e203]:
        - generic [ref=e204]:
          - generic [ref=e205]: DB
          - generic [ref=e206]: Düşük Bütçe
        - generic [ref=e207]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e208] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e217] [cursor=pointer]
  - alert [ref=e221]
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
  11  |       await page.goto(`${BASE_URL}`);
  12  |       // Kayıt sayfasına git
  13  |       const registerBtn = page.getByText(/kaydol|register/i);
  14  |       if (registerBtn) {
  15  |         await registerBtn.click();
  16  |         await expect(page).toHaveURL(/.*register|signup/i);
  17  |       }
  18  |     });
  19  | 
  20  |     test('❌ Register - Boş form gönderimi', async ({ page }) => {
  21  |       await page.goto(`${BASE_URL}`);
  22  |       // Form boş bırakıp submit et
  23  |       const submitBtn = page.getByRole('button', { name: /submit|kaydet|gönder/i });
  24  |       if (submitBtn) {
  25  |         await submitBtn.click();
  26  |         // Validation error bekleniyor
  27  |         await expect(page.getByText(/required|zorunlu/i)).toBeVisible();
  28  |       }
  29  |     });
  30  | 
  31  |     test('❌ Register - Invalid email', async ({ page }) => {
  32  |       await page.goto(`${BASE_URL}`);
  33  |       const emailInput = page.getByLabel(/email/i);
  34  |       if (emailInput) {
  35  |         await emailInput.fill('invalid-email');
  36  |         const submitBtn = page.getByRole('button', { name: /submit/i });
  37  |         if (submitBtn) {
  38  |           await submitBtn.click();
  39  |           await expect(page.getByText(/valid.*email|email.*invalid/i)).toBeVisible();
  40  |         }
  41  |       }
  42  |     });
  43  | 
  44  |     test('❌ Register - Password mismatch', async ({ page }) => {
  45  |       await page.goto(`${BASE_URL}`);
  46  |       const passwordInputs = page.getByLabel(/password/i);
  47  |       // İlk password ve confirm password farklı olacak şekilde doldur
  48  |       await expect(passwordInputs).toBeDefined();
  49  |     });
  50  | 
  51  |     test('❌ Register - Email already exists', async ({ page }) => {
  52  |       await page.goto(`${BASE_URL}`);
  53  |       // Zaten var olan email ile kayıt et
  54  |       const emailInput = page.getByLabel(/email/i);
  55  |       if (emailInput) {
  56  |         await emailInput.fill('existing@example.com');
  57  |         const submitBtn = page.getByRole('button', { name: /submit/i });
  58  |         if (submitBtn) {
  59  |           await submitBtn.click();
  60  |           // Duplicate email error bekleniyor
  61  |           await expect(page.getByText(/already.*exists|duplicate|already.*registered/i)).toBeVisible();
  62  |         }
  63  |       }
  64  |     });
  65  |   });
  66  | 
  67  |   // ==================== LOGIN TESTS ====================
  68  |   test.describe('Login Scenarios', () => {
  69  | 
  70  |     test('✅ Login - Başarılı giriş', async ({ page }) => {
  71  |       await page.goto(`${BASE_URL}`);
  72  |       const loginBtn = page.getByText(/giriş|login/i);
  73  |       if (loginBtn) {
> 74  |         await loginBtn.click();
      |                        ^ Error: locator.click: Error: strict mode violation: getByText(/giriş|login/i) resolved to 2 elements:
  75  |         const emailInput = page.getByLabel(/email/i);
  76  |         const passwordInput = page.getByLabel(/password/i);
  77  | 
  78  |         if (emailInput && passwordInput) {
  79  |           await emailInput.fill('test@example.com');
  80  |           await passwordInput.fill('password123');
  81  |           await page.getByRole('button', { name: /login|giriş/i }).click();
  82  | 
  83  |           // Dashboard veya home page'e yönlendirilmesi bekleniyor
  84  |           await expect(page).toHaveURL(/.*home|dashboard|account/i);
  85  |         }
  86  |       }
  87  |     });
  88  | 
  89  |     test('❌ Login - Yanlış password', async ({ page }) => {
  90  |       await page.goto(`${BASE_URL}`);
  91  |       const loginBtn = page.getByText(/giriş|login/i);
  92  |       if (loginBtn) {
  93  |         await loginBtn.click();
  94  |         const emailInput = page.getByLabel(/email/i);
  95  |         const passwordInput = page.getByLabel(/password/i);
  96  | 
  97  |         if (emailInput && passwordInput) {
  98  |           await emailInput.fill('test@example.com');
  99  |           await passwordInput.fill('wrongpassword');
  100 |           await page.getByRole('button', { name: /login/i }).click();
  101 | 
  102 |           // Error message bekleniyor
  103 |           await expect(page.getByText(/incorrect|wrong|invalid.*password/i)).toBeVisible();
  104 |         }
  105 |       }
  106 |     });
  107 | 
  108 |     test('❌ Login - Non-existent user', async ({ page }) => {
  109 |       await page.goto(`${BASE_URL}`);
  110 |       const loginBtn = page.getByText(/giriş|login/i);
  111 |       if (loginBtn) {
  112 |         await loginBtn.click();
  113 |         const emailInput = page.getByLabel(/email/i);
  114 |         const passwordInput = page.getByLabel(/password/i);
  115 | 
  116 |         if (emailInput && passwordInput) {
  117 |           await emailInput.fill('nonexistent@example.com');
  118 |           await passwordInput.fill('password123');
  119 |           await page.getByRole('button', { name: /login/i }).click();
  120 | 
  121 |           // User not found error bekleniyor
  122 |           await expect(page.getByText(/not.*found|does.*not.*exist|no.*account/i)).toBeVisible();
  123 |         }
  124 |       }
  125 |     });
  126 | 
  127 |     test('❌ Login - Empty fields', async ({ page }) => {
  128 |       await page.goto(`${BASE_URL}`);
  129 |       const loginBtn = page.getByText(/giriş|login/i);
  130 |       if (loginBtn) {
  131 |         await loginBtn.click();
  132 |         const submitBtn = page.getByRole('button', { name: /login/i });
  133 |         if (submitBtn) {
  134 |           await submitBtn.click();
  135 |           // Required field errors bekleniyor
  136 |           await expect(page.getByText(/required|zorunlu/i)).toBeVisible();
  137 |         }
  138 |       }
  139 |     });
  140 |   });
  141 | 
  142 |   // ==================== LOGOUT TESTS ====================
  143 |   test.describe('Logout Scenarios', () => {
  144 | 
  145 |     test('✅ Logout - Başarılı çıkış', async ({ page }) => {
  146 |       await page.goto(`${BASE_URL}`);
  147 | 
  148 |       // Önce login yap
  149 |       const loginBtn = page.getByText(/giriş|login/i);
  150 |       if (loginBtn) {
  151 |         await loginBtn.click();
  152 |         const emailInput = page.getByLabel(/email/i);
  153 |         const passwordInput = page.getByLabel(/password/i);
  154 | 
  155 |         if (emailInput && passwordInput) {
  156 |           await emailInput.fill('test@example.com');
  157 |           await passwordInput.fill('password123');
  158 |           await page.getByRole('button', { name: /login/i }).click();
  159 | 
  160 |           // Logout butonunu bul ve tıkla
  161 |           const logoutBtn = page.getByText(/çıkış|logout/i);
  162 |           if (logoutBtn) {
  163 |             await logoutBtn.click();
  164 | 
  165 |             // Login sayfasına dönülmesi bekleniyor
  166 |             await expect(page).toHaveURL(/.*login|signin/i);
  167 |           }
  168 |         }
  169 |       }
  170 |     });
  171 | 
  172 |     test('✅ Logout - Session cleared', async ({ page }) => {
  173 |       // Logout sonrası authenticated endpoints'e erişim engellenmeli
  174 |       await page.goto(`${BASE_URL}/account`);
```