# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> Kategori Listeleme & Navigasyon >> ✅ Kategori seçimi - Bileşenler
- Location: tests/bize-sat-flow.test.ts:60:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText(/işlemci/i)

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
    - navigation [ref=e27]:
      - generic [ref=e28]:
        - link "Anasayfa" [ref=e29] [cursor=pointer]:
          - /url: /
        - generic [ref=e30]: ">"
        - generic [ref=e31]: Bize Sat
    - main [ref=e32]:
      - generic [ref=e34]:
        - heading "Ne satmak istiyorsun?" [level=1] [ref=e35]
        - generic [ref=e36]:
          - generic [ref=e37]:
            - heading "Bilgisayar Bileşenleri" [level=2] [ref=e38]
            - generic [ref=e39]:
              - link "💻 Dizüstü (Notebook)" [ref=e40] [cursor=pointer]:
                - /url: /bize-sat/notebook
                - generic [ref=e41]:
                  - generic [ref=e42]: 💻
                  - text: Dizüstü (Notebook)
              - link "🖥️ Masaüstü (Kasa)" [ref=e43] [cursor=pointer]:
                - /url: /bize-sat/masaustu
                - generic [ref=e44]:
                  - generic [ref=e45]: 🖥️
                  - text: Masaüstü (Kasa)
              - link [ref=e46] [cursor=pointer]:
                - /url: /bize-sat/ekran-karti
                - generic [ref=e47]:
                  - img "Ekran Kartı" [ref=e48]
                  - text: Ekran Kartı
              - link [ref=e49] [cursor=pointer]:
                - /url: /bize-sat/islemci
                - generic [ref=e50]:
                  - img "İşlemci" [ref=e51]
                  - text: İşlemci
              - link [ref=e52] [cursor=pointer]:
                - /url: /bize-sat/ram
                - generic [ref=e53]:
                  - img "RAM" [ref=e54]
                  - text: RAM
              - link [ref=e55] [cursor=pointer]:
                - /url: /bize-sat/ssd
                - generic [ref=e56]:
                  - img "SSD" [ref=e57]
                  - text: SSD
              - link [ref=e58] [cursor=pointer]:
                - /url: /bize-sat/sogutucu
                - generic [ref=e59]:
                  - img "Soğutucu" [ref=e60]
                  - text: Soğutucu
              - link [ref=e61] [cursor=pointer]:
                - /url: /bize-sat/kasa
                - generic [ref=e62]:
                  - img "Boş Kasa" [ref=e63]
                  - text: Boş Kasa
          - generic [ref=e64]:
            - heading "Çevre Birimleri" [level=2] [ref=e65]
            - generic [ref=e66]:
              - link "📱 Cep Telefonu" [ref=e67] [cursor=pointer]:
                - /url: /bize-sat/cep-telefonu
                - generic [ref=e68]:
                  - generic [ref=e69]: 📱
                  - text: Cep Telefonu
              - link "🖥️ Monitör" [ref=e70] [cursor=pointer]:
                - /url: /bize-sat/monitor
                - generic [ref=e71]:
                  - generic [ref=e72]: 🖥️
                  - text: Monitör
              - link "⌨️ Klavye" [ref=e73] [cursor=pointer]:
                - /url: /bize-sat/klavye
                - generic [ref=e74]:
                  - generic [ref=e75]: ⌨️
                  - text: Klavye
              - link "🖱️ Mouse" [ref=e76] [cursor=pointer]:
                - /url: /bize-sat/mouse
                - generic [ref=e77]:
                  - generic [ref=e78]: 🖱️
                  - text: Mouse
              - link [ref=e79] [cursor=pointer]:
                - /url: /bize-sat/tablet
                - generic [ref=e80]:
                  - img "Tablet" [ref=e81]
                  - text: Tablet
              - link "🎧 Kulaklık" [ref=e82] [cursor=pointer]:
                - /url: /bize-sat/kulaklik
                - generic [ref=e83]:
                  - generic [ref=e84]: 🎧
                  - text: Kulaklık
              - link [ref=e85] [cursor=pointer]:
                - /url: /bize-sat/ses-sistemi
                - generic [ref=e86]:
                  - img "Ses Sistemi" [ref=e87]
                  - text: Ses Sistemi
              - link [ref=e88] [cursor=pointer]:
                - /url: /bize-sat/gaming-direksiyon
                - generic [ref=e89]:
                  - img "Oyuncu Direksiyonu" [ref=e90]
                  - text: Oyuncu Direksiyonu
              - link "🖨️ Yazıcı" [ref=e91] [cursor=pointer]:
                - /url: /bize-sat/yazici
                - generic [ref=e92]:
                  - generic [ref=e93]: 🖨️
                  - text: Yazıcı
              - link "🔍 Tarayıcı" [ref=e94] [cursor=pointer]:
                - /url: /bize-sat/tarayici
                - generic [ref=e95]:
                  - generic [ref=e96]: 🔍
                  - text: Tarayıcı
              - link [ref=e97] [cursor=pointer]:
                - /url: /bize-sat/fotokopi-makinesi
                - generic [ref=e98]:
                  - img "Fotokopi Makinesi" [ref=e99]
                  - text: Fotokopi Makinesi
          - generic [ref=e100]:
            - heading "Oyun Konsolları" [level=2] [ref=e101]
            - generic [ref=e102]:
              - link [ref=e103] [cursor=pointer]:
                - /url: /bize-sat/playstation
                - generic [ref=e104]:
                  - img "PlayStation" [ref=e105]
                  - text: PlayStation
              - link [ref=e106] [cursor=pointer]:
                - /url: /bize-sat/gamepad
                - generic [ref=e107]:
                  - img "Gamepad/Joystick" [ref=e108]
                  - text: Gamepad/Joystick
              - link [ref=e109] [cursor=pointer]:
                - /url: /bize-sat/xbox
                - generic [ref=e110]:
                  - img "Xbox" [ref=e111]
                  - text: Xbox
    - contentinfo [ref=e112]:
      - generic [ref=e114]:
        - generic [ref=e115]:
          - generic [ref=e116]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e117]
          - paragraph [ref=e118]: Hızlı ve güvenli gönderim
        - generic [ref=e119]:
          - generic [ref=e120]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e121]
          - paragraph [ref=e122]: Memnuniyetiniz önceliğimiz
        - generic [ref=e123]:
          - generic [ref=e124]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e125]
          - paragraph [ref=e126]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e127]:
          - generic [ref=e128]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e129]
          - paragraph [ref=e130]: Sadece bilinen kaliteli markalar
      - generic [ref=e132]:
        - generic [ref=e133]:
          - heading "KURUMSAL" [level=4] [ref=e134]
          - generic [ref=e135]:
            - link "Hakkımızda" [ref=e136] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e137] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e138] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e139]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e140]
          - generic [ref=e141]:
            - link "KVKK Bilgilendirme" [ref=e142] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e143] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e144] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e145] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e146]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e147]
          - generic [ref=e148]:
            - link "Hesabım" [ref=e149] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e150] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e151] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e152] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e153] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e154]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e155]
          - generic [ref=e156]:
            - generic [ref=e157]: 📍
            - generic [ref=e158]:
              - generic [ref=e159]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e160]: 34760 Ümraniye/İstanbul
          - generic [ref=e161]:
            - link [ref=e162] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e163]
            - link [ref=e164] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e165]
            - link [ref=e166] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e167]
            - link [ref=e168] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e171]:
        - generic [ref=e172]:
          - generic [ref=e173]: DB
          - generic [ref=e174]: Düşük Bütçe
        - generic [ref=e175]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e176] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e185] [cursor=pointer]
  - alert [ref=e189]
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
  46  |           await expect(categoryBtn).toBeVisible();
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
> 65  |         await cpuCategory.click();
      |                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  147 |     test('✅ Zorunlu alanlar validation', async ({ page }) => {
  148 |       // Önce login yap
  149 |       await loginUser(page);
  150 | 
  151 |       // Sonra bize-sat sayfasına git
  152 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  153 | 
  154 |       const createListingBtn = page.getByText(/iş aç|yeni iş/i);
  155 |       if (createListingBtn) {
  156 |         await createListingBtn.click();
  157 | 
  158 |         // Boş form submit
  159 |         const submitBtn = page.getByRole('button', { name: /submit|gönder/i });
  160 |         if (submitBtn) {
  161 |           await submitBtn.click();
  162 | 
  163 |           // Validation errors bekleniyor
  164 |           await expect(page.getByText(/required|zorunlu|gerekli/i)).toBeVisible();
  165 |         }
```