# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/auth.test.ts >> Authentication & Authorization Tests >> Logout Scenarios >> ✅ Logout - Session cleared
- Location: tests/auth.test.ts:172:9

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /.*login|signin/i
Received string:  "http://localhost:3000/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    10 × locator resolved to <html lang="tr">…</html>
       - unexpected value "http://localhost:3000/account"
    4 × locator resolved to <html lang="tr">…</html>
      - unexpected value "http://localhost:3000/"

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
- main:
  - heading "2. El Ürününü" [level=2]
  - link "BİZE SAT":
    - /url: /bize-sat
    - button "BİZE SAT"
  - heading "Kategoriler" [level=3]
  - link "💻 Dizüstü (Notebook)":
    - /url: /bize-sat/notebook
  - link "🖥️ Masaüstü (Kasa)":
    - /url: /bize-sat/masaustu
  - link "🖥️ Monitör":
    - /url: /bize-sat/monitor
  - link "Ekran Kartı Ekran Kartı":
    - /url: /bize-sat/ekran-karti
    - img "Ekran Kartı"
    - text: Ekran Kartı
  - link "İşlemci İşlemci":
    - /url: /bize-sat/islemci
    - img "İşlemci"
    - text: İşlemci
  - link "RAM RAM":
    - /url: /bize-sat/ram
    - img "RAM"
    - text: RAM
  - link "SSD SSD":
    - /url: /bize-sat/ssd
    - img "SSD"
    - text: SSD
  - link "Soğutucu Soğutucu":
    - /url: /bize-sat/sogutucu
    - img "Soğutucu"
    - text: Soğutucu
  - link "Boş Kasa Boş Kasa":
    - /url: /bize-sat/kasa
    - img "Boş Kasa"
    - text: Boş Kasa
  - link "📄 Fotokopi Makinesi":
    - /url: /bize-sat/fotokopi-makinesi
  - link "🖨️ Yazıcı":
    - /url: /bize-sat/yazici
  - link "📱 Cep Telefonu":
    - /url: /bize-sat/cep-telefonu
  - link "PlayStation PlayStation":
    - /url: /bize-sat/playstation
    - img "PlayStation"
    - text: PlayStation
  - link "Gamepad Gamepad":
    - /url: /bize-sat/gamepad
    - img "Gamepad"
    - text: Gamepad
  - link "Xbox Xbox":
    - /url: /bize-sat/xbox
    - img "Xbox"
    - text: Xbox
  - link "⌨️ Klavye":
    - /url: /bize-sat/klavye
  - link "🖱️ Mouse":
    - /url: /bize-sat/mouse
  - link "Tablet Tablet":
    - /url: /bize-sat/tablet
    - img "Tablet"
    - text: Tablet
  - link "🎧 Kulaklık":
    - /url: /bize-sat/kulaklik
  - link "Ses Sistemi Ses Sistemi":
    - /url: /bize-sat/ses-sistemi
    - img "Ses Sistemi"
    - text: Ses Sistemi
  - link "🔍 Tarayıcı":
    - /url: /bize-sat/tarayici
  - link "Uzman Ekibimizden Destek Al 🚚 İstanbul içi aynı gün teslim alalım TEKNİK SERVİS Kategoriler 🖥️ PC Onarım 💻 Laptop Tamiri 🖥️ Monitör Tamiri 💾 Format Atma 🔧 Parça Montajı 📱 Telefon Onarım 📱 Tablet Tamiri ⚙️ PC Toplama 💿 Veri Kurtarma":
    - /url: /teknik-servis
    - text: Uzman Ekibimizden Destek Al 🚚 İstanbul içi aynı gün teslim alalım
    - button "TEKNİK SERVİS"
    - heading "Kategoriler" [level=3]
    - text: 🖥️ PC Onarım 💻 Laptop Tamiri 🖥️ Monitör Tamiri 💾 Format Atma 🔧 Parça Montajı 📱 Telefon Onarım 📱 Tablet Tamiri ⚙️ PC Toplama 💿 Veri Kurtarma
  - link "SATILIK İLANLAR":
    - /url: /satilik-ilanlar
    - button "SATILIK İLANLAR"
  - text: 📋 Henüz satılık ilan yok Admin panelinden ilan eklendiğinde burada otomatik görünecek.
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
  175 | 
  176 |       // Login sayfasına yönlendirilmesi bekleniyor
> 177 |       await expect(page).toHaveURL(/.*login|signin/i);
      |                          ^ Error: expect(page).toHaveURL(expected) failed
  178 |     });
  179 |   });
  180 | 
  181 |   // ==================== SESSION TESTS ====================
  182 |   test.describe('Session Scenarios', () => {
  183 | 
  184 |     test('✅ Session persistence - Sayfa yenilemesinde session korunması', async ({ page }) => {
  185 |       await page.goto(`${BASE_URL}`);
  186 | 
  187 |       // Login yap
  188 |       const loginBtn = page.getByText(/giriş|login/i);
  189 |       if (loginBtn) {
  190 |         await loginBtn.click();
  191 |         const emailInput = page.getByLabel(/email/i);
  192 |         const passwordInput = page.getByLabel(/password/i);
  193 | 
  194 |         if (emailInput && passwordInput) {
  195 |           await emailInput.fill('test@example.com');
  196 |           await passwordInput.fill('password123');
  197 |           await page.getByRole('button', { name: /login/i }).click();
  198 | 
  199 |           // Sayfayı yenile
  200 |           await page.reload();
  201 | 
  202 |           // Session devam etmeli - logout butonu görünür olmalı
  203 |           const logoutBtn = page.getByText(/çıkış|logout/i);
  204 |           if (logoutBtn) {
  205 |             await expect(logoutBtn).toBeVisible();
  206 |           }
  207 |         }
  208 |       }
  209 |     });
  210 | 
  211 |     test('✅ Session timeout - Uzun inaktivite sonrası logout', async ({ page }) => {
  212 |       // Bu test gerçek environment'te çalışması için timeout ayarı gerekir
  213 |       // Placeholder test
  214 |       await page.goto(`${BASE_URL}`);
  215 |       await expect(page).toHaveURL(/.*localhost/i);
  216 |     });
  217 |   });
  218 | 
  219 |   // ==================== PASSWORD RECOVERY TESTS ====================
  220 |   test.describe('Password Recovery Scenarios', () => {
  221 | 
  222 |     test('✅ Password recovery - Email gönderimi', async ({ page }) => {
  223 |       await page.goto(`${BASE_URL}`);
  224 | 
  225 |       const forgotPasswordLink = page.getByText(/forgot.*password|şifremi unuttum/i);
  226 |       if (forgotPasswordLink) {
  227 |         await forgotPasswordLink.click();
  228 | 
  229 |         const emailInput = page.getByLabel(/email/i);
  230 |         if (emailInput) {
  231 |           await emailInput.fill('test@example.com');
  232 |           await page.getByRole('button', { name: /reset|gönder/i }).click();
  233 | 
  234 |           // Success message bekleniyor
  235 |           await expect(page.getByText(/check.*email|link.*sent|sent.*you/i)).toBeVisible();
  236 |         }
  237 |       }
  238 |     });
  239 | 
  240 |     test('❌ Password recovery - Invalid email', async ({ page }) => {
  241 |       await page.goto(`${BASE_URL}`);
  242 | 
  243 |       const forgotPasswordLink = page.getByText(/forgot.*password/i);
  244 |       if (forgotPasswordLink) {
  245 |         await forgotPasswordLink.click();
  246 | 
  247 |         const emailInput = page.getByLabel(/email/i);
  248 |         if (emailInput) {
  249 |           await emailInput.fill('invalid@example.com');
  250 |           await page.getByRole('button', { name: /reset|gönder/i }).click();
  251 | 
  252 |           // Error message bekleniyor
  253 |           await expect(page.getByText(/not.*found|doesn't.*exist/i)).toBeVisible();
  254 |         }
  255 |       }
  256 |     });
  257 |   });
  258 | });
  259 | 
  260 | export {};
  261 | 
```