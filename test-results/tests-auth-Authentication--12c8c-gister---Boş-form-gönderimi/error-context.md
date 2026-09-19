# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/auth.test.ts >> Authentication & Authorization Tests >> Register Scenarios >> ❌ Register - Boş form gönderimi
- Location: tests/auth.test.ts:20:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /submit|kaydet|gönder/i })

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
        - generic [ref=e10]:
          - textbox "Ürün, kategori veya marka ara..." [ref=e11]
          - generic [ref=e12]: 🔍
        - generic [ref=e13]:
          - button "Giriş Yap" [ref=e15] [cursor=pointer]
          - link [ref=e21] [cursor=pointer]:
            - /url: /sepet
            - button "Sepet" [ref=e22]
    - main [ref=e27]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - heading "2. El Ürününü" [level=2] [ref=e35]
          - link [ref=e38] [cursor=pointer]:
            - /url: /bize-sat
            - button "BİZE SAT" [ref=e39]
          - heading "Kategoriler" [level=3] [ref=e40]
          - generic [ref=e41]:
            - generic [ref=e42]:
              - link "💻 Dizüstü (Notebook)" [ref=e43] [cursor=pointer]:
                - /url: /bize-sat/notebook
                - generic [ref=e44]:
                  - generic [ref=e45]: 💻
                  - text: Dizüstü (Notebook)
              - link "🖥️ Masaüstü (Kasa)" [ref=e46] [cursor=pointer]:
                - /url: /bize-sat/masaustu
                - generic [ref=e47]:
                  - generic [ref=e48]: 🖥️
                  - text: Masaüstü (Kasa)
              - link "🖥️ Monitör" [ref=e49] [cursor=pointer]:
                - /url: /bize-sat/monitor
                - generic [ref=e50]:
                  - generic [ref=e51]: 🖥️
                  - text: Monitör
              - link [ref=e52] [cursor=pointer]:
                - /url: /bize-sat/ekran-karti
                - generic [ref=e53]:
                  - img "Ekran Kartı" [ref=e54]
                  - text: Ekran Kartı
              - link [ref=e55] [cursor=pointer]:
                - /url: /bize-sat/islemci
                - generic [ref=e56]:
                  - img "İşlemci" [ref=e57]
                  - text: İşlemci
              - link [ref=e58] [cursor=pointer]:
                - /url: /bize-sat/ram
                - generic [ref=e59]:
                  - img "RAM" [ref=e60]
                  - text: RAM
              - link [ref=e61] [cursor=pointer]:
                - /url: /bize-sat/ssd
                - generic [ref=e62]:
                  - img "SSD" [ref=e63]
                  - text: SSD
              - link [ref=e64] [cursor=pointer]:
                - /url: /bize-sat/sogutucu
                - generic [ref=e65]:
                  - img "Soğutucu" [ref=e66]
                  - text: Soğutucu
              - link [ref=e67] [cursor=pointer]:
                - /url: /bize-sat/kasa
                - generic [ref=e68]:
                  - img "Boş Kasa" [ref=e69]
                  - text: Boş Kasa
              - link "📄 Fotokopi Makinesi" [ref=e70] [cursor=pointer]:
                - /url: /bize-sat/fotokopi-makinesi
                - generic [ref=e71]:
                  - generic [ref=e72]: 📄
                  - text: Fotokopi Makinesi
              - link "🖨️ Yazıcı" [ref=e73] [cursor=pointer]:
                - /url: /bize-sat/yazici
                - generic [ref=e74]:
                  - generic [ref=e75]: 🖨️
                  - text: Yazıcı
            - generic [ref=e76]:
              - link "📱 Cep Telefonu" [ref=e77] [cursor=pointer]:
                - /url: /bize-sat/cep-telefonu
                - generic [ref=e78]:
                  - generic [ref=e79]: 📱
                  - text: Cep Telefonu
              - link [ref=e80] [cursor=pointer]:
                - /url: /bize-sat/playstation
                - generic [ref=e81]:
                  - img "PlayStation" [ref=e82]
                  - text: PlayStation
              - link [ref=e83] [cursor=pointer]:
                - /url: /bize-sat/gamepad
                - generic [ref=e84]:
                  - img "Gamepad" [ref=e85]
                  - text: Gamepad
              - link [ref=e86] [cursor=pointer]:
                - /url: /bize-sat/xbox
                - generic [ref=e87]:
                  - img "Xbox" [ref=e88]
                  - text: Xbox
              - link "⌨️ Klavye" [ref=e89] [cursor=pointer]:
                - /url: /bize-sat/klavye
                - generic [ref=e90]:
                  - generic [ref=e91]: ⌨️
                  - text: Klavye
              - link "🖱️ Mouse" [ref=e92] [cursor=pointer]:
                - /url: /bize-sat/mouse
                - generic [ref=e93]:
                  - generic [ref=e94]: 🖱️
                  - text: Mouse
              - link [ref=e95] [cursor=pointer]:
                - /url: /bize-sat/tablet
                - generic [ref=e96]:
                  - img "Tablet" [ref=e97]
                  - text: Tablet
              - link "🎧 Kulaklık" [ref=e98] [cursor=pointer]:
                - /url: /bize-sat/kulaklik
                - generic [ref=e99]:
                  - generic [ref=e100]: 🎧
                  - text: Kulaklık
              - link [ref=e101] [cursor=pointer]:
                - /url: /bize-sat/ses-sistemi
                - generic [ref=e102]:
                  - img "Ses Sistemi" [ref=e103]
                  - text: Ses Sistemi
              - link "🔍 Tarayıcı" [ref=e104] [cursor=pointer]:
                - /url: /bize-sat/tarayici
                - generic [ref=e105]:
                  - generic [ref=e106]: 🔍
                  - text: Tarayıcı
        - generic [ref=e108]:
          - link "Uzman Ekibimizden Destek Al 🚚 İstanbul içi aynı gün teslim alalım TEKNİK SERVİS Kategoriler 🖥️ PC Onarım 💻 Laptop Tamiri 🖥️ Monitör Tamiri 💾 Format Atma 🔧 Parça Montajı 📱 Telefon Onarım 📱 Tablet Tamiri ⚙️ PC Toplama 💿 Veri Kurtarma" [ref=e109] [cursor=pointer]:
            - /url: /teknik-servis
            - generic [ref=e110]:
              - generic [ref=e112]:
                - generic [ref=e113]: Uzman Ekibimizden Destek Al
                - generic [ref=e114]:
                  - generic [ref=e115]: 🚚
                  - text: İstanbul içi aynı gün teslim alalım
              - button "TEKNİK SERVİS" [ref=e119]
              - heading "Kategoriler" [level=3] [ref=e121]
              - generic [ref=e123]:
                - generic [ref=e124]:
                  - generic [ref=e125]: 🖥️
                  - text: PC Onarım
                - generic [ref=e126]:
                  - generic [ref=e127]: 💻
                  - text: Laptop Tamiri
                - generic [ref=e128]:
                  - generic [ref=e129]: 🖥️
                  - text: Monitör Tamiri
                - generic [ref=e130]:
                  - generic [ref=e131]: 💾
                  - text: Format Atma
                - generic [ref=e132]:
                  - generic [ref=e133]: 🔧
                  - text: Parça Montajı
                - generic [ref=e134]:
                  - generic [ref=e135]: 📱
                  - text: Telefon Onarım
                - generic [ref=e136]:
                  - generic [ref=e137]: 📱
                  - text: Tablet Tamiri
                - generic [ref=e138]:
                  - generic [ref=e139]: ⚙️
                  - text: PC Toplama
                - generic [ref=e140]:
                  - generic [ref=e141]: 💿
                  - text: Veri Kurtarma
          - generic [ref=e142]:
            - link [ref=e144] [cursor=pointer]:
              - /url: /satilik-ilanlar
              - button "SATILIK İLANLAR" [ref=e145]
            - generic [ref=e148]:
              - generic [ref=e149]: 📋
              - generic [ref=e150]: Henüz satılık ilan yok
              - generic [ref=e151]: Admin panelinden ilan eklendiğinde burada otomatik görünecek.
    - contentinfo [ref=e152]:
      - generic [ref=e154]:
        - generic [ref=e155]:
          - generic [ref=e156]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e157]
          - paragraph [ref=e158]: Hızlı ve güvenli gönderim
        - generic [ref=e159]:
          - generic [ref=e160]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e161]
          - paragraph [ref=e162]: Memnuniyetiniz önceliğimiz
        - generic [ref=e163]:
          - generic [ref=e164]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e165]
          - paragraph [ref=e166]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e167]:
          - generic [ref=e168]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e169]
          - paragraph [ref=e170]: Sadece bilinen kaliteli markalar
      - generic [ref=e172]:
        - generic [ref=e173]:
          - heading "KURUMSAL" [level=4] [ref=e174]
          - generic [ref=e175]:
            - link "Hakkımızda" [ref=e176] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e177] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e178] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e179]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e180]
          - generic [ref=e181]:
            - link "KVKK Bilgilendirme" [ref=e182] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e183] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e184] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e185] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e186]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e187]
          - generic [ref=e188]:
            - link "Hesabım" [ref=e189] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e190] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e191] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e192] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e193] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e194]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e195]
          - generic [ref=e196]:
            - generic [ref=e197]: 📍
            - generic [ref=e198]:
              - generic [ref=e199]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e200]: 34760 Ümraniye/İstanbul
          - generic [ref=e201]:
            - link [ref=e202] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e203]
            - link [ref=e204] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e205]
            - link [ref=e206] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e207]
            - link [ref=e208] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e211]:
        - generic [ref=e212]:
          - generic [ref=e213]: DB
          - generic [ref=e214]: Düşük Bütçe
        - generic [ref=e215]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e216] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e225] [cursor=pointer]
  - alert [ref=e229]
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
> 25  |         await submitBtn.click();
      |                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  74  |         await loginBtn.click();
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
```