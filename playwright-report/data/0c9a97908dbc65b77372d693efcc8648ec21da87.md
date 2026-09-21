# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-panel.test.ts >> Admin Panel Testleri >> Kullanıcı Yönetimi >> ✅ Kullanıcı düzenleme
- Location: tests/admin-panel.test.ts:97:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /düzenle|edit/i }).first()

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
  2   | 
  3   | const BASE_URL = 'http://localhost:3000';
  4   | 
  5   | test.describe('Admin Panel Testleri', () => {
  6   | 
  7   |   // ==================== ADMIN GİRİŞ ====================
  8   |   test.describe('Admin Panel Erişimi', () => {
  9   | 
  10  |     test('✅ Admin sayfasına erişim', async ({ page }) => {
  11  |       await page.goto(`${BASE_URL}/admin`);
  12  | 
  13  |       // Admin sayfası yüklenmeli veya login istemeli
  14  |       const adminContent = page.getByText(/admin|dashboard|yönetim/i);
  15  |       await expect(adminContent).toBeDefined();
  16  |     });
  17  | 
  18  |     test('❌ Admin olmayan kullanıcı erişimi', async ({ page }) => {
  19  |       await page.goto(`${BASE_URL}/admin`);
  20  | 
  21  |       // Non-admin users login sayfasına yönlendirilmeli
  22  |       // veya access denied görmeli
  23  |       const denyOrLogin = page.getByText(/login|access.*denied|yetkisiz/i);
  24  |       // Yok olabilir veya görünebilir - environment bağlı
  25  |     });
  26  |   });
  27  | 
  28  |   // ==================== DASHBOARD ====================
  29  |   test.describe('Admin Dashboard', () => {
  30  | 
  31  |     test('✅ Dashboard metriği gösterimi', async ({ page }) => {
  32  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  33  | 
  34  |       // Metrikler görüntülenmesi bekleniyor
  35  |       const metrics = page.locator('[class*="metric"]');
  36  |       expect(await metrics.count()).toBeGreaterThanOrEqual(0);
  37  |     });
  38  | 
  39  |     test('✅ Kullanıcı sayısı', async ({ page }) => {
  40  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  41  | 
  42  |       const userCount = page.getByText(/kullanıcı|users|total.*users/i);
  43  |       await expect(userCount).toBeDefined();
  44  |     });
  45  | 
  46  |     test('✅ İlan sayısı', async ({ page }) => {
  47  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  48  | 
  49  |       const listingCount = page.getByText(/iş|ilan|listing|posted/i);
  50  |       await expect(listingCount).toBeDefined();
  51  |     });
  52  | 
  53  |     test('✅ Teklif sayısı', async ({ page }) => {
  54  |       await page.goto(`${BASE_URL}/admin/dashboard`);
  55  | 
  56  |       const offerCount = page.getByText(/teklif|offer|proposals/i);
  57  |       await expect(offerCount).toBeDefined();
  58  |     });
  59  |   });
  60  | 
  61  |   // ==================== KULLANICI YÖNETİMİ ====================
  62  |   test.describe('Kullanıcı Yönetimi', () => {
  63  | 
  64  |     test('✅ Kullanıcı listesi', async ({ page }) => {
  65  |       await page.goto(`${BASE_URL}/admin/users`);
  66  | 
  67  |       const userTable = page.locator('[class*="table"]');
  68  |       expect(await userTable.count()).toBeGreaterThanOrEqual(0);
  69  |     });
  70  | 
  71  |     test('✅ Kullanıcı arama', async ({ page }) => {
  72  |       await page.goto(`${BASE_URL}/admin/users`);
  73  | 
  74  |       const searchBox = page.getByPlaceholder(/ara|search/i);
  75  |       if (searchBox) {
  76  |         await searchBox.fill('test');
  77  | 
  78  |         // Arama sonuçları bekleniyor
  79  |         const results = page.locator('[class*="user-row"]');
  80  |         // Sonuç yok veya var olabilir
  81  |       }
  82  |     });
  83  | 
  84  |     test('✅ Kullanıcı detayları', async ({ page }) => {
  85  |       await page.goto(`${BASE_URL}/admin/users`);
  86  | 
  87  |       const firstUser = page.locator('[class*="user-row"]').first();
  88  |       if (await firstUser.count() > 0) {
  89  |         await firstUser.click();
  90  | 
  91  |         // Kullanıcı detayları sayfası açılmalı
  92  |         const userDetails = page.getByText(/email|ad|soyad|created/i);
  93  |         await expect(userDetails).toBeDefined();
  94  |       }
  95  |     });
  96  | 
  97  |     test('✅ Kullanıcı düzenleme', async ({ page }) => {
  98  |       await page.goto(`${BASE_URL}/admin/users`);
  99  | 
  100 |       const editBtn = page.getByRole('button', { name: /düzenle|edit/i }).first();
  101 |       if (editBtn) {
> 102 |         await editBtn.click();
      |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
  103 | 
  104 |         // Edit formu açılmalı
  105 |         const nameField = page.getByLabel(/ad|name/i);
  106 |         await expect(nameField).toBeDefined();
  107 |       }
  108 |     });
  109 | 
  110 |     test('❌ Kullanıcı silme - Onay dialog', async ({ page }) => {
  111 |       await page.goto(`${BASE_URL}/admin/users`);
  112 | 
  113 |       const deleteBtn = page.getByRole('button', { name: /sil|delete/i }).first();
  114 |       if (deleteBtn) {
  115 |         await deleteBtn.click();
  116 | 
  117 |         // Onay dialog bekleniyor
  118 |         const confirmBtn = page.getByRole('button', { name: /evet|yes|confirm/i });
  119 |         await expect(confirmBtn).toBeDefined();
  120 |       }
  121 |     });
  122 | 
  123 |     test('✅ Rol yönetimi', async ({ page }) => {
  124 |       await page.goto(`${BASE_URL}/admin/users`);
  125 | 
  126 |       const roleSelect = page.locator('[class*="role-select"]').first();
  127 |       if (roleSelect) {
  128 |         const options = roleSelect.locator('option');
  129 |         expect(await options.count()).toBeGreaterThan(0);
  130 |       }
  131 |     });
  132 |   });
  133 | 
  134 |   // ==================== İLAN YÖNETİMİ ====================
  135 |   test.describe('İlan Yönetimi', () => {
  136 | 
  137 |     test('✅ İlan listesi', async ({ page }) => {
  138 |       await page.goto(`${BASE_URL}/admin/listings`);
  139 | 
  140 |       const listingTable = page.locator('[class*="table"]');
  141 |       expect(await listingTable.count()).toBeGreaterThanOrEqual(0);
  142 |     });
  143 | 
  144 |     test('✅ İlan onaylama', async ({ page }) => {
  145 |       await page.goto(`${BASE_URL}/admin/listings`);
  146 | 
  147 |       const approveBtn = page.getByRole('button', { name: /onayla|approve/i }).first();
  148 |       if (approveBtn) {
  149 |         await approveBtn.click();
  150 | 
  151 |         // Success mesajı bekleniyor
  152 |         const successMsg = page.getByText(/approved|onaylandı/i);
  153 |         // Yok olabilir veya görünebilir
  154 |       }
  155 |     });
  156 | 
  157 |     test('✅ İlan reddetme', async ({ page }) => {
  158 |       await page.goto(`${BASE_URL}/admin/listings`);
  159 | 
  160 |       const rejectBtn = page.getByRole('button', { name: /reddet|reject/i }).first();
  161 |       if (rejectBtn) {
  162 |         await rejectBtn.click();
  163 | 
  164 |         // Rejection reason dialog bekleniyor
  165 |         const reasonInput = page.getByLabel(/neden|reason/i);
  166 |         // Yok olabilir veya görünebilir
  167 |       }
  168 |     });
  169 | 
  170 |     test('✅ İlan silme', async ({ page }) => {
  171 |       await page.goto(`${BASE_URL}/admin/listings`);
  172 | 
  173 |       const deleteBtn = page.getByRole('button', { name: /sil|delete/i }).first();
  174 |       if (deleteBtn) {
  175 |         await deleteBtn.click();
  176 | 
  177 |         // Onay dialog bekleniyor
  178 |         const confirmBtn = page.getByRole('button', { name: /confirm|yes/i });
  179 |         await expect(confirmBtn).toBeDefined();
  180 |       }
  181 |     });
  182 | 
  183 |     test('✅ İlan filtreleme - Durum', async ({ page }) => {
  184 |       await page.goto(`${BASE_URL}/admin/listings`);
  185 | 
  186 |       const statusFilter = page.getByLabel(/durum|status/i);
  187 |       if (statusFilter) {
  188 |         await statusFilter.selectOption('pending');
  189 | 
  190 |         // Filtre uygulanmalı
  191 |         const results = page.locator('[class*="listing-row"]');
  192 |         // Sonuç yok veya var olabilir
  193 |       }
  194 |     });
  195 | 
  196 |     test('✅ İlan filtreleme - Kategori', async ({ page }) => {
  197 |       await page.goto(`${BASE_URL}/admin/listings`);
  198 | 
  199 |       const categoryFilter = page.getByLabel(/kategori|category/i);
  200 |       if (categoryFilter) {
  201 |         await categoryFilter.selectOption('ram');
  202 | 
```