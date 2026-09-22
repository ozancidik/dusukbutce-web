# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-panel.test.ts >> Admin Panel Testleri >> İlan Yönetimi >> ✅ İlan filtreleme - Durum
- Location: tests/admin-panel.test.ts:209:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.selectOption: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByLabel(/durum|status/i)

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
> 214 |         await statusFilter.selectOption('pending');
      |                            ^ Error: locator.selectOption: Test timeout of 30000ms exceeded.
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
  253 |       if (await firstOffer.count() > 0) {
  254 |         await firstOffer.click();
  255 | 
  256 |         // Teklif detayları sayfası açılmalı
  257 |         const details = page.getByText(/fiyat|price|gönderen|from/i);
  258 |         await expect(details).toBeDefined();
  259 |       }
  260 |     });
  261 | 
  262 |     test('✅ Anlaşmazlık çözümü', async ({ page }) => {
  263 |       await page.goto(`${BASE_URL}/admin/offers`);
  264 | 
  265 |       const disputeBtn = page.getByRole('button', { name: /anlaşmazlık|dispute|resolver/i }).first();
  266 |       if (disputeBtn) {
  267 |         await disputeBtn.click();
  268 | 
  269 |         // Dispute resolution dialog açılmalı
  270 |         const dialog = page.getByText(/açıklama|description|resolution/i);
  271 |         await expect(dialog).toBeDefined();
  272 |       }
  273 |     });
  274 | 
  275 |     test('✅ Teklif iptal', async ({ page }) => {
  276 |       await page.goto(`${BASE_URL}/admin/offers`);
  277 | 
  278 |       const cancelBtn = page.getByRole('button', { name: /iptal|cancel/i }).first();
  279 |       if (cancelBtn) {
  280 |         await cancelBtn.click();
  281 | 
  282 |         // Onay dialog bekleniyor
  283 |         const confirmBtn = page.getByRole('button', { name: /confirm/i });
  284 |         await expect(confirmBtn).toBeDefined();
  285 |       }
  286 |     });
  287 |   });
  288 | 
  289 |   // ==================== RAPORLAR ====================
  290 |   test.describe('Raporlar', () => {
  291 | 
  292 |     test('✅ Günlük rapor', async ({ page }) => {
  293 |       // Önce admin login yap
  294 |       await loginAdminUser(page);
  295 | 
  296 |       await page.goto(`${BASE_URL}/admin/reports/daily`);
  297 | 
  298 |       // Rapor gösterilmesi bekleniyor
  299 |       const reportContent = page.locator('[class*="report"]');
  300 |       expect(await reportContent.count()).toBeGreaterThanOrEqual(0);
  301 |     });
  302 | 
  303 |     test('✅ Haftalık rapor', async ({ page }) => {
  304 |       await page.goto(`${BASE_URL}/admin/reports/weekly`);
  305 | 
  306 |       // Rapor gösterilmesi bekleniyor
  307 |       const reportContent = page.locator('[class*="report"]');
  308 |       expect(await reportContent.count()).toBeGreaterThanOrEqual(0);
  309 |     });
  310 | 
  311 |     test('✅ Aktivite logu', async ({ page }) => {
  312 |       await page.goto(`${BASE_URL}/admin/activity`);
  313 | 
  314 |       const activityLog = page.locator('[class*="log-entry"]');
```