# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-panel.test.ts >> Admin Panel Testleri >> Kullanıcı Yönetimi >> ✅ Rol yönetimi
- Location: tests/admin-panel.test.ts:146:9

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
        - link "Admin" [ref=e26] [cursor=pointer]:
          - /url: /admin
        - generic [ref=e27]: ">"
        - generic [ref=e28]: Users
    - main [ref=e29]:
      - generic [ref=e31]:
        - heading "404" [level=1] [ref=e32]
        - heading "Sayfa Bulunamadı" [level=2] [ref=e33]
        - paragraph [ref=e34]: Aradığınız sayfa mevcut değil. 3 saniye sonra ana sayfaya yönlendirileceksiniz.
        - button "Ana Sayfaya Git" [ref=e35] [cursor=pointer]
        - generic [ref=e36]:
          - paragraph [ref=e37]:
            - strong [ref=e38]: "Önerilen sayfalar:"
          - generic [ref=e39]:
            - button "Ana Sayfa" [ref=e40] [cursor=pointer]
            - button "Bize Sat" [ref=e41] [cursor=pointer]
            - button "Satılık İlanlar" [ref=e42] [cursor=pointer]
            - button "Ürünler" [ref=e43] [cursor=pointer]
    - contentinfo [ref=e44]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - generic [ref=e48]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e49]
          - paragraph [ref=e50]: Hızlı ve güvenli gönderim
        - generic [ref=e51]:
          - generic [ref=e52]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e53]
          - paragraph [ref=e54]: Memnuniyetiniz önceliğimiz
        - generic [ref=e55]:
          - generic [ref=e56]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e57]
          - paragraph [ref=e58]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e59]:
          - generic [ref=e60]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e61]
          - paragraph [ref=e62]: Sadece bilinen kaliteli markalar
      - generic [ref=e64]:
        - generic [ref=e65]:
          - heading "KURUMSAL" [level=4] [ref=e66]
          - generic [ref=e67]:
            - link "Hakkımızda" [ref=e68] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e69] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e70] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e71]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e72]
          - generic [ref=e73]:
            - link "KVKK Bilgilendirme" [ref=e74] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e75] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e76] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e77] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e78]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e79]
          - generic [ref=e80]:
            - link "Hesabım" [ref=e81] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e82] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e83] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e84] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e85] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e86]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e87]
          - generic [ref=e88]:
            - generic [ref=e89]: 📍
            - generic [ref=e90]:
              - generic [ref=e91]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e92]: 34760 Ümraniye/İstanbul
          - generic [ref=e93]:
            - link [ref=e94] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e95]
            - link [ref=e96] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e97]
            - link [ref=e98] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e99]
            - link [ref=e100] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e103]:
        - generic [ref=e104]:
          - generic [ref=e105]: DB
          - generic [ref=e106]: Düşük Bütçe
        - generic [ref=e107]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e108] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e117] [cursor=pointer]
  - alert [ref=e121]
```

# Test source

```ts
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
  99  |         await searchBox.fill('test');
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
> 152 |         expect(await options.count()).toBeGreaterThan(0);
      |                                       ^ Error: expect(received).toBeGreaterThan(expected)
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
  200 |       if (deleteBtn) {
  201 |         await deleteBtn.click();
  202 | 
  203 |         // Onay dialog bekleniyor
  204 |         const confirmBtn = page.getByRole('button', { name: /confirm|yes|evet|onay/i });
  205 |         await expect(confirmBtn).toBeDefined();
  206 |       }
  207 |     });
  208 | 
  209 |     test('✅ İlan filtreleme - Durum', async ({ page }) => {
  210 |       await page.goto(`${BASE_URL}/admin/listings`);
  211 | 
  212 |       const statusFilter = page.getByLabel(/durum|status/i);
  213 |       if (statusFilter) {
  214 |         await statusFilter.selectOption('pending');
  215 | 
  216 |         // Filtre uygulanmalı
  217 |         const results = page.locator('[class*="listing-row"]');
  218 |         // Sonuç yok veya var olabilir
  219 |       }
  220 |     });
  221 | 
  222 |     test('✅ İlan filtreleme - Kategori', async ({ page }) => {
  223 |       await page.goto(`${BASE_URL}/admin/listings`);
  224 | 
  225 |       const categoryFilter = page.getByLabel(/kategori|category/i);
  226 |       if (categoryFilter) {
  227 |         await categoryFilter.selectOption('ram');
  228 | 
  229 |         // Filtre uygulanmalı
  230 |         const results = page.locator('[class*="listing-row"]');
  231 |         // Sonuç yok veya var olabilir
  232 |       }
  233 |     });
  234 |   });
  235 | 
  236 |   // ==================== TEKLIF YÖNETİMİ ====================
  237 |   test.describe('Teklif Yönetimi (Admin)', () => {
  238 | 
  239 |     test('✅ Teklif listesi', async ({ page }) => {
  240 |       // Önce admin login yap
  241 |       await loginAdminUser(page);
  242 | 
  243 |       await page.goto(`${BASE_URL}/admin/offers`);
  244 | 
  245 |       const offerTable = page.locator('[class*="table"]');
  246 |       expect(await offerTable.count()).toBeGreaterThanOrEqual(0);
  247 |     });
  248 | 
  249 |     test('✅ Teklif detayları', async ({ page }) => {
  250 |       await page.goto(`${BASE_URL}/admin/offers`);
  251 | 
  252 |       const firstOffer = page.locator('[class*="offer-row"]').first();
```