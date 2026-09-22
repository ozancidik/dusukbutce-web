# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-panel.test.ts >> Admin Panel Testleri >> Kullanıcı Yönetimi >> ✅ Kullanıcı arama
- Location: tests/admin-panel.test.ts:94:9

# Error details

```
Error: locator.fill: Error: strict mode violation: getByPlaceholder(/ara|search/i) resolved to 2 elements:
    1) <input value="" type="text" placeholder="Ürün, kategori veya marka ara..."/> aka getByRole('textbox', { name: 'Ürün, kategori veya marka ara' })
    2) <input value="" type="text" placeholder="Ürün, kategori veya marka ara..."/> aka getByPlaceholder('Ürün, kategori veya marka ara').nth(1)

Call log:
  - waiting for getByPlaceholder(/ara|search/i)

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
        - link "Admin" [ref=e31] [cursor=pointer]:
          - /url: /admin
        - generic [ref=e32]: ">"
        - generic [ref=e33]: Users
    - main [ref=e34]:
      - generic [ref=e36]:
        - heading "404" [level=1] [ref=e37]
        - heading "Sayfa Bulunamadı" [level=2] [ref=e38]
        - paragraph [ref=e39]: Aradığınız sayfa mevcut değil. 3 saniye sonra ana sayfaya yönlendirileceksiniz.
        - button "Ana Sayfaya Git" [ref=e40] [cursor=pointer]
        - generic [ref=e41]:
          - paragraph [ref=e42]:
            - strong [ref=e43]: "Önerilen sayfalar:"
          - generic [ref=e44]:
            - button "Ana Sayfa" [ref=e45] [cursor=pointer]
            - button "Bize Sat" [ref=e46] [cursor=pointer]
            - button "Satılık İlanlar" [ref=e47] [cursor=pointer]
            - button "Ürünler" [ref=e48] [cursor=pointer]
    - contentinfo [ref=e49]:
      - generic [ref=e51]:
        - generic [ref=e52]:
          - generic [ref=e53]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e54]
          - paragraph [ref=e55]: Hızlı ve güvenli gönderim
        - generic [ref=e56]:
          - generic [ref=e57]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e58]
          - paragraph [ref=e59]: Memnuniyetiniz önceliğimiz
        - generic [ref=e60]:
          - generic [ref=e61]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e62]
          - paragraph [ref=e63]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e64]:
          - generic [ref=e65]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e66]
          - paragraph [ref=e67]: Sadece bilinen kaliteli markalar
      - generic [ref=e69]:
        - generic [ref=e70]:
          - heading "KURUMSAL" [level=4] [ref=e71]
          - generic [ref=e72]:
            - link "Hakkımızda" [ref=e73] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e74] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e75] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e76]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e77]
          - generic [ref=e78]:
            - link "KVKK Bilgilendirme" [ref=e79] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e80] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e81] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e82] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e83]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e84]
          - generic [ref=e85]:
            - link "Hesabım" [ref=e86] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e87] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e88] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e89] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e90] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e91]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e92]
          - generic [ref=e93]:
            - generic [ref=e94]: 📍
            - generic [ref=e95]:
              - generic [ref=e96]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e97]: 34760 Ümraniye/İstanbul
          - generic [ref=e98]:
            - link [ref=e99] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e100]
            - link [ref=e101] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e102]
            - link [ref=e103] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e104]
            - link [ref=e105] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e108]:
        - generic [ref=e109]:
          - generic [ref=e110]: DB
          - generic [ref=e111]: Düşük Bütçe
        - generic [ref=e112]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e113] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e122] [cursor=pointer]
  - alert [ref=e126]
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'http://localhost:3000';
  4   | 
  5   | // Admin login helper
  6   | async function loginAdminUser(page: any) {
  7   |   await page.goto(`${BASE_URL}/login`);
  8   |   const emailInput = page.getByTestId('login-email-input');
  9   |   const passwordInput = page.getByTestId('login-password-input');
  10  |   const loginBtn = page.getByTestId('login-submit-button');
  11  |   // Admin account for testing (adjust if different in your system)
  12  |   await emailInput.fill('admin@example.com', { timeout: 5000 });
  13  |   await passwordInput.fill('password123', { timeout: 5000 });
  14  |   await loginBtn.click({ timeout: 5000 });
  15  |   await page.waitForNavigation({ timeout: 10000 }).catch(() => {});
  16  | }
  17  | 
  18  | test.describe('Admin Panel Testleri', () => {
  19  | 
  20  |   // ==================== ADMIN GİRİŞ ====================
  21  |   test.describe('Admin Panel Erişimi', () => {
  22  | 
  23  |     test('✅ Admin sayfasına erişim', async ({ page }) => {
  24  |       // Önce admin login yap
  25  |       await loginAdminUser(page);
  26  | 
  27  |       // Sonra admin sayfasına git
  28  |       await page.goto(`${BASE_URL}/admin`);
  29  | 
  30  |       // Admin sayfası yüklenmeli veya login istemeli
  31  |       const adminContent = page.getByText(/admin|dashboard|yönetim/i);
  32  |       await expect(adminContent).toBeDefined();
  33  |     });
  34  | 
  35  |     test('❌ Admin olmayan kullanıcı erişimi', async ({ page }) => {
  36  |       await page.goto(`${BASE_URL}/admin`);
  37  | 
  38  |       // Non-admin users login sayfasına yönlendirilmeli
  39  |       // veya access denied görmeli
  40  |       const denyOrLogin = page.getByText(/login|access.*denied|yetkisiz/i);
  41  |       // Yok olabilir veya görünebilir - environment bağlı
  42  |     });
  43  |   });
  44  | 
  45  |   // ==================== DASHBOARD ====================
  46  |   test.describe('Admin Dashboard', () => {
  47  | 
  48  |     test('✅ Dashboard metriği gösterimi', async ({ page }) => {
  49  |       // Önce admin login yap
  50  |       await loginAdminUser(page);
  51  | 
  52  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  53  | 
  54  |       // Metrikler görüntülenmesi bekleniyor
  55  |       const metrics = page.locator('[class*="metric"]');
  56  |       expect(await metrics.count()).toBeGreaterThanOrEqual(0);
  57  |     });
  58  | 
  59  |     test('✅ Kullanıcı sayısı', async ({ page }) => {
  60  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  61  | 
  62  |       const userCount = page.getByText(/kullanıcı|users|total.*users/i);
  63  |       await expect(userCount).toBeDefined();
  64  |     });
  65  | 
  66  |     test('✅ İlan sayısı', async ({ page }) => {
  67  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  68  | 
  69  |       const listingCount = page.getByText(/iş|ilan|listing|posted/i);
  70  |       await expect(listingCount).toBeDefined();
  71  |     });
  72  | 
  73  |     test('✅ Teklif sayısı', async ({ page }) => {
  74  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  75  | 
  76  |       const offerCount = page.getByText(/teklif|offer|proposals/i);
  77  |       await expect(offerCount).toBeDefined();
  78  |     });
  79  |   });
  80  | 
  81  |   // ==================== KULLANICI YÖNETİMİ ====================
  82  |   test.describe('Kullanıcı Yönetimi', () => {
  83  | 
  84  |     test('✅ Kullanıcı listesi', async ({ page }) => {
  85  |       // Önce admin login yap
  86  |       await loginAdminUser(page);
  87  | 
  88  |       await page.goto(`${BASE_URL}/admin/users`);
  89  | 
  90  |       const userTable = page.locator('[class*="table"]');
  91  |       expect(await userTable.count()).toBeGreaterThanOrEqual(0);
  92  |     });
  93  | 
  94  |     test('✅ Kullanıcı arama', async ({ page }) => {
  95  |       await page.goto(`${BASE_URL}/admin/users`);
  96  | 
  97  |       const searchBox = page.getByPlaceholder(/ara|search/i);
  98  |       if (searchBox) {
> 99  |         await searchBox.fill('test');
      |                         ^ Error: locator.fill: Error: strict mode violation: getByPlaceholder(/ara|search/i) resolved to 2 elements:
  100 | 
  101 |         // Arama sonuçları bekleniyor
  102 |         const results = page.locator('[class*="user-row"]');
  103 |         // Sonuç yok veya var olabilir
  104 |       }
  105 |     });
  106 | 
  107 |     test('✅ Kullanıcı detayları', async ({ page }) => {
  108 |       await page.goto(`${BASE_URL}/admin/users`);
  109 | 
  110 |       const firstUser = page.locator('[class*="user-row"]').first();
  111 |       if (await firstUser.count() > 0) {
  112 |         await firstUser.click();
  113 | 
  114 |         // Kullanıcı detayları sayfası açılmalı
  115 |         const userDetails = page.getByText(/email|ad|soyad|created/i);
  116 |         await expect(userDetails).toBeDefined();
  117 |       }
  118 |     });
  119 | 
  120 |     test('✅ Kullanıcı düzenleme', async ({ page }) => {
  121 |       await page.goto(`${BASE_URL}/admin/users`);
  122 | 
  123 |       const editBtn = page.getByRole('button', { name: /düzenle|edit/i }).first();
  124 |       if (editBtn) {
  125 |         await editBtn.click();
  126 | 
  127 |         // Edit formu açılmalı
  128 |         const nameField = page.getByLabel(/ad|name/i);
  129 |         await expect(nameField).toBeDefined();
  130 |       }
  131 |     });
  132 | 
  133 |     test('❌ Kullanıcı silme - Onay dialog', async ({ page }) => {
  134 |       await page.goto(`${BASE_URL}/admin`);
  135 | 
  136 |       const deleteBtn = page.getByTestId('delete-button').first();
  137 |       if (deleteBtn) {
  138 |         await deleteBtn.click();
  139 | 
  140 |         // Onay dialog bekleniyor
  141 |         const confirmBtn = page.getByRole('button', { name: /evet|yes|confirm|onay/i });
  142 |         await expect(confirmBtn).toBeDefined();
  143 |       }
  144 |     });
  145 | 
  146 |     test('✅ Rol yönetimi', async ({ page }) => {
  147 |       await page.goto(`${BASE_URL}/admin/users`);
  148 | 
  149 |       const roleSelect = page.locator('[class*="role-select"]').first();
  150 |       if (roleSelect) {
  151 |         const options = roleSelect.locator('option');
  152 |         expect(await options.count()).toBeGreaterThan(0);
  153 |       }
  154 |     });
  155 |   });
  156 | 
  157 |   // ==================== İLAN YÖNETİMİ ====================
  158 |   test.describe('İlan Yönetimi', () => {
  159 | 
  160 |     test('✅ İlan listesi', async ({ page }) => {
  161 |       // Önce admin login yap
  162 |       await loginAdminUser(page);
  163 | 
  164 |       await page.goto(`${BASE_URL}/admin/listings`);
  165 | 
  166 |       const listingTable = page.locator('[class*="table"]');
  167 |       expect(await listingTable.count()).toBeGreaterThanOrEqual(0);
  168 |     });
  169 | 
  170 |     test('✅ İlan onaylama', async ({ page }) => {
  171 |       await page.goto(`${BASE_URL}/admin/listings`);
  172 | 
  173 |       const approveBtn = page.getByRole('button', { name: /onayla|approve/i }).first();
  174 |       if (approveBtn) {
  175 |         await approveBtn.click();
  176 | 
  177 |         // Success mesajı bekleniyor
  178 |         const successMsg = page.getByText(/approved|onaylandı/i);
  179 |         // Yok olabilir veya görünebilir
  180 |       }
  181 |     });
  182 | 
  183 |     test('✅ İlan reddetme', async ({ page }) => {
  184 |       await page.goto(`${BASE_URL}/admin/listings`);
  185 | 
  186 |       const rejectBtn = page.getByRole('button', { name: /reddet|reject/i }).first();
  187 |       if (rejectBtn) {
  188 |         await rejectBtn.click();
  189 | 
  190 |         // Rejection reason dialog bekleniyor
  191 |         const reasonInput = page.getByLabel(/neden|reason/i);
  192 |         // Yok olabilir veya görünebilir
  193 |       }
  194 |     });
  195 | 
  196 |     test('✅ İlan silme', async ({ page }) => {
  197 |       await page.goto(`${BASE_URL}/admin`);
  198 | 
  199 |       const deleteBtn = page.getByTestId('delete-button').first();
```