# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> Kategori Listeleme & Navigasyon >> ✅ Tüm kategorilerin görülebilir olması
- Location: tests/bize-sat-flow.test.ts:34:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/Kasa/i)
Expected: visible
Error: strict mode violation: getByText(/Kasa/i) resolved to 2 elements:
    1) <div>…</div> aka getByRole('link', { name: '🖥️ Masaüstü (Kasa)' })
    2) <div>…</div> aka getByRole('link', { name: 'Boş Kasa Boş Kasa' })

Call log:
  - Expect "toBeVisible" getByText(/Kasa/i) with timeout 5000ms
  - waiting for getByText(/Kasa/i)

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
    - navigation [ref=e22]:
      - generic [ref=e23]:
        - link "Anasayfa" [ref=e24] [cursor=pointer]:
          - /url: /
        - generic [ref=e25]: ">"
        - generic [ref=e26]: Bize Sat
    - main [ref=e27]:
      - generic [ref=e29]:
        - heading "Ne satmak istiyorsun?" [level=1] [ref=e30]
        - generic [ref=e31]:
          - generic [ref=e32]:
            - heading "Bilgisayar Bileşenleri" [level=2] [ref=e33]
            - generic [ref=e34]:
              - link "💻 Dizüstü (Notebook)" [ref=e35] [cursor=pointer]:
                - /url: /bize-sat/notebook
                - generic [ref=e36]:
                  - generic [ref=e37]: 💻
                  - text: Dizüstü (Notebook)
              - link "🖥️ Masaüstü (Kasa)" [ref=e38] [cursor=pointer]:
                - /url: /bize-sat/masaustu
                - generic [ref=e39]:
                  - generic [ref=e40]: 🖥️
                  - text: Masaüstü (Kasa)
              - link [ref=e41] [cursor=pointer]:
                - /url: /bize-sat/ekran-karti
                - generic [ref=e42]:
                  - img "Ekran Kartı" [ref=e43]
                  - text: Ekran Kartı
              - link [ref=e44] [cursor=pointer]:
                - /url: /bize-sat/islemci
                - generic [ref=e45]:
                  - img "İşlemci" [ref=e46]
                  - text: İşlemci
              - link [ref=e47] [cursor=pointer]:
                - /url: /bize-sat/ram
                - generic [ref=e48]:
                  - img "RAM" [ref=e49]
                  - text: RAM
              - link [ref=e50] [cursor=pointer]:
                - /url: /bize-sat/ssd
                - generic [ref=e51]:
                  - img "SSD" [ref=e52]
                  - text: SSD
              - link [ref=e53] [cursor=pointer]:
                - /url: /bize-sat/sogutucu
                - generic [ref=e54]:
                  - img "Soğutucu" [ref=e55]
                  - text: Soğutucu
              - link [ref=e56] [cursor=pointer]:
                - /url: /bize-sat/kasa
                - generic [ref=e57]:
                  - img "Boş Kasa" [ref=e58]
                  - text: Boş Kasa
          - generic [ref=e59]:
            - heading "Çevre Birimleri" [level=2] [ref=e60]
            - generic [ref=e61]:
              - link "📱 Cep Telefonu" [ref=e62] [cursor=pointer]:
                - /url: /bize-sat/cep-telefonu
                - generic [ref=e63]:
                  - generic [ref=e64]: 📱
                  - text: Cep Telefonu
              - link "🖥️ Monitör" [ref=e65] [cursor=pointer]:
                - /url: /bize-sat/monitor
                - generic [ref=e66]:
                  - generic [ref=e67]: 🖥️
                  - text: Monitör
              - link "⌨️ Klavye" [ref=e68] [cursor=pointer]:
                - /url: /bize-sat/klavye
                - generic [ref=e69]:
                  - generic [ref=e70]: ⌨️
                  - text: Klavye
              - link "🖱️ Mouse" [ref=e71] [cursor=pointer]:
                - /url: /bize-sat/mouse
                - generic [ref=e72]:
                  - generic [ref=e73]: 🖱️
                  - text: Mouse
              - link [ref=e74] [cursor=pointer]:
                - /url: /bize-sat/tablet
                - generic [ref=e75]:
                  - img "Tablet" [ref=e76]
                  - text: Tablet
              - link "🎧 Kulaklık" [ref=e77] [cursor=pointer]:
                - /url: /bize-sat/kulaklik
                - generic [ref=e78]:
                  - generic [ref=e79]: 🎧
                  - text: Kulaklık
              - link [ref=e80] [cursor=pointer]:
                - /url: /bize-sat/ses-sistemi
                - generic [ref=e81]:
                  - img "Ses Sistemi" [ref=e82]
                  - text: Ses Sistemi
              - link [ref=e83] [cursor=pointer]:
                - /url: /bize-sat/gaming-direksiyon
                - generic [ref=e84]:
                  - img "Oyuncu Direksiyonu" [ref=e85]
                  - text: Oyuncu Direksiyonu
              - link "🖨️ Yazıcı" [ref=e86] [cursor=pointer]:
                - /url: /bize-sat/yazici
                - generic [ref=e87]:
                  - generic [ref=e88]: 🖨️
                  - text: Yazıcı
              - link "🔍 Tarayıcı" [ref=e89] [cursor=pointer]:
                - /url: /bize-sat/tarayici
                - generic [ref=e90]:
                  - generic [ref=e91]: 🔍
                  - text: Tarayıcı
              - link [ref=e92] [cursor=pointer]:
                - /url: /bize-sat/fotokopi-makinesi
                - generic [ref=e93]:
                  - img "Fotokopi Makinesi" [ref=e94]
                  - text: Fotokopi Makinesi
          - generic [ref=e95]:
            - heading "Oyun Konsolları" [level=2] [ref=e96]
            - generic [ref=e97]:
              - link [ref=e98] [cursor=pointer]:
                - /url: /bize-sat/playstation
                - generic [ref=e99]:
                  - img "PlayStation" [ref=e100]
                  - text: PlayStation
              - link [ref=e101] [cursor=pointer]:
                - /url: /bize-sat/gamepad
                - generic [ref=e102]:
                  - img "Gamepad/Joystick" [ref=e103]
                  - text: Gamepad/Joystick
              - link [ref=e104] [cursor=pointer]:
                - /url: /bize-sat/xbox
                - generic [ref=e105]:
                  - img "Xbox" [ref=e106]
                  - text: Xbox
    - contentinfo [ref=e107]:
      - generic [ref=e109]:
        - generic [ref=e110]:
          - generic [ref=e111]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e112]
          - paragraph [ref=e113]: Hızlı ve güvenli gönderim
        - generic [ref=e114]:
          - generic [ref=e115]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e116]
          - paragraph [ref=e117]: Memnuniyetiniz önceliğimiz
        - generic [ref=e118]:
          - generic [ref=e119]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e120]
          - paragraph [ref=e121]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e122]:
          - generic [ref=e123]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e124]
          - paragraph [ref=e125]: Sadece bilinen kaliteli markalar
      - generic [ref=e127]:
        - generic [ref=e128]:
          - heading "KURUMSAL" [level=4] [ref=e129]
          - generic [ref=e130]:
            - link "Hakkımızda" [ref=e131] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e132] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e133] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e134]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e135]
          - generic [ref=e136]:
            - link "KVKK Bilgilendirme" [ref=e137] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e138] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e139] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e140] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e141]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e142]
          - generic [ref=e143]:
            - link "Hesabım" [ref=e144] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e145] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e146] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e147] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e148] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e149]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e150]
          - generic [ref=e151]:
            - generic [ref=e152]: 📍
            - generic [ref=e153]:
              - generic [ref=e154]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e155]: 34760 Ümraniye/İstanbul
          - generic [ref=e156]:
            - link [ref=e157] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e158]
            - link [ref=e159] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e160]
            - link [ref=e161] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e162]
            - link [ref=e163] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e166]:
        - generic [ref=e167]:
          - generic [ref=e168]: DB
          - generic [ref=e169]: Düşük Bütçe
        - generic [ref=e170]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e171] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e180] [cursor=pointer]
  - alert [ref=e184]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'http://localhost:3000';
  4   | 
  5   | // Login helper
  6   | async function loginUser(page: any) {
  7   |   await page.goto(`${BASE_URL}/login`);
  8   |   const emailInput = page.getByTestId('login-email-input');
  9   |   const passwordInput = page.getByTestId('login-password-input');
  10  |   const loginBtn = page.getByTestId('login-submit-button');
  11  |   await emailInput.fill('test@example.com', { timeout: 5000 });
  12  |   await passwordInput.fill('password123', { timeout: 5000 });
  13  |   await loginBtn.click({ timeout: 5000 });
  14  |   await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  15  | }
  16  | 
  17  | test.describe('Bize-Sat Flow Tests', () => {
  18  | 
  19  |   // ==================== KATEGORI & NAVIGASYON ====================
  20  |   test.describe('Kategori Listeleme & Navigasyon', () => {
  21  | 
  22  |     test('✅ Bize-Sat sayfası yüklenmesi', async ({ page }) => {
  23  |       await page.goto(`${BASE_URL}/bize-sat`);
  24  | 
  25  |       // Başlık kontrol
  26  |       await expect(page.getByText(/ne satmak istiyorsun|kategori|bilgisayar|elektronik/i)).toBeVisible();
  27  | 
  28  |       // En az bir kategori butonunun görülebilir olması
  29  |       const categoryButtons = page.locator('[class*="category"]');
  30  |       await expect(categoryButtons).toHaveCount(await categoryButtons.count());
  31  |       expect(await categoryButtons.count()).toBeGreaterThan(0);
  32  |     });
  33  | 
  34  |     test('✅ Tüm kategorilerin görülebilir olması', async ({ page }) => {
  35  |       await page.goto(`${BASE_URL}/bize-sat`);
  36  | 
  37  |       const categories = [
  38  |         'İşlemci', 'RAM', 'Ekran Kartı', 'SSD', 'Soğutucu', 'Kasa',
  39  |         'Cep Telefonu', 'Tablet', 'Monitör', 'Ses Sistemi',
  40  |         'PlayStation', 'Gamepad', 'Xbox'
  41  |       ];
  42  | 
  43  |       for (const category of categories) {
  44  |         const categoryBtn = page.getByText(new RegExp(category, 'i'));
  45  |         if (categoryBtn) {
> 46  |           await expect(categoryBtn).toBeVisible();
      |                                     ^ Error: expect(locator).toBeVisible() failed
  47  |         }
  48  |       }
  49  |     });
  50  | 
  51  |     test('✅ Kategori ikonları render edilmesi', async ({ page }) => {
  52  |       await page.goto(`${BASE_URL}/bize-sat`);
  53  | 
  54  |       // İkonlar (img veya svg) kontrol
  55  |       const icons = page.locator('img[src*=".png"], img[src*=".svg"], svg');
  56  |       const iconCount = await icons.count();
  57  |       expect(iconCount).toBeGreaterThan(0);
  58  |     });
  59  | 
  60  |     test('✅ Kategori seçimi - Bileşenler', async ({ page }) => {
  61  |       await page.goto(`${BASE_URL}/bize-sat`);
  62  | 
  63  |       const cpuCategory = page.getByText(/işlemci/i);
  64  |       if (cpuCategory) {
  65  |         await cpuCategory.click();
  66  | 
  67  |         // İşlemci sayfasına yönlendirilmesi bekleniyor
  68  |         await expect(page).toHaveURL(/.*islemci/i);
  69  |       }
  70  |     });
  71  | 
  72  |     test('✅ Kategori seçimi - Aksesuarlar', async ({ page }) => {
  73  |       await page.goto(`${BASE_URL}/bize-sat`);
  74  | 
  75  |       const tabletCategory = page.getByText(/tablet/i);
  76  |       if (tabletCategory) {
  77  |         await tabletCategory.click();
  78  | 
  79  |         // Tablet sayfasına yönlendirilmesi bekleniyor
  80  |         await expect(page).toHaveURL(/.*tablet/i);
  81  |       }
  82  |     });
  83  | 
  84  |     test('✅ Kategori seçimi - Oyun Konsolları', async ({ page }) => {
  85  |       await page.goto(`${BASE_URL}/bize-sat`);
  86  | 
  87  |       const xboxCategory = page.getByText(/xbox/i);
  88  |       if (xboxCategory) {
  89  |         await xboxCategory.click();
  90  | 
  91  |         // Xbox sayfasına yönlendirilmesi bekleniyor
  92  |         await expect(page).toHaveURL(/.*xbox/i);
  93  |       }
  94  |     });
  95  |   });
  96  | 
  97  |   // ==================== RESPONSIVE DİZAYN ====================
  98  |   test.describe('Responsive Tasarım Testleri', () => {
  99  | 
  100 |     test('✅ Mobile view - Kategoriler görüntülenmesi', async ({ page }) => {
  101 |       await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  102 |       await page.goto(`${BASE_URL}/bize-sat`);
  103 | 
  104 |       const categories = page.locator('[class*="category"]');
  105 |       expect(await categories.count()).toBeGreaterThan(0);
  106 | 
  107 |       // Scroll edilebilir olması bekleniyor
  108 |       await page.evaluate(() => window.scrollBy(0, 500));
  109 |     });
  110 | 
  111 |     test('✅ Tablet view - Grid layout', async ({ page }) => {
  112 |       await page.setViewportSize({ width: 768, height: 1024 }); // iPad
  113 |       await page.goto(`${BASE_URL}/bize-sat`);
  114 | 
  115 |       const categories = page.locator('[class*="category"]');
  116 |       expect(await categories.count()).toBeGreaterThan(0);
  117 |     });
  118 | 
  119 |     test('✅ Desktop view - Full layout', async ({ page }) => {
  120 |       await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
  121 |       await page.goto(`${BASE_URL}/bize-sat`);
  122 | 
  123 |       const categories = page.locator('[class*="category"]');
  124 |       expect(await categories.count()).toBeGreaterThan(0);
  125 |     });
  126 |   });
  127 | 
  128 |   // ==================== İLAN OLUŞTURMA ====================
  129 |   test.describe('İlan Oluşturma Senaryoları', () => {
  130 | 
  131 |     test('✅ İlan oluşturma formu açılması', async ({ page }) => {
  132 |       // Önce login yap
  133 |       await loginUser(page);
  134 | 
  135 |       // Sonra bize-sat sayfasına git
  136 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  137 | 
  138 |       const createListingBtn = page.getByText(/iş aç|yeni iş|satış|create/i);
  139 |       if (createListingBtn) {
  140 |         await createListingBtn.click();
  141 | 
  142 |         // Form görüntülenmesi bekleniyor
  143 |         await expect(page.getByLabel(/başlık|title|fiyat|price/i)).toBeDefined();
  144 |       }
  145 |     });
  146 | 
```