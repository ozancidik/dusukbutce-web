# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/auth.test.ts >> Authentication & Authorization Tests >> Register Scenarios >> ✅ Register - Başarılı kayıt
- Location: tests/auth.test.ts:10:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('form')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('form') with timeout 5000ms
  - waiting for locator('form')

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
  11  |       await page.goto(`${BASE_URL}/auth/register`);
  12  |       await page.waitForLoadState('networkidle');
  13  |       // Form yüklenmesini kontrol et
  14  |       const form = page.locator('form');
> 15  |       await expect(form).toBeVisible({ timeout: 5000 });
      |                          ^ Error: expect(locator).toBeVisible() failed
  16  |     });
  17  | 
  18  |     test('❌ Register - Boş form gönderimi', async ({ page }) => {
  19  |       await page.goto(`${BASE_URL}/auth/register`);
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
```