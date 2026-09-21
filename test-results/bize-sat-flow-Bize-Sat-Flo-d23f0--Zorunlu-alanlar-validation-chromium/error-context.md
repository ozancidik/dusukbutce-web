# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> İlan Oluşturma Senaryoları >> ✅ Zorunlu alanlar validation
- Location: tests/bize-sat-flow.test.ts:131:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText(/iş aç|yeni iş/i)

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
        - link "Bize Sat" [ref=e31] [cursor=pointer]:
          - /url: /bize-sat
        - generic [ref=e32]: ">"
        - generic [ref=e33]: RAM
    - main [ref=e34]:
      - generic [ref=e36]:
        - generic [ref=e37]:
          - heading "RAM Sat" [level=1] [ref=e38]
          - paragraph [ref=e39]: RAM'inizi satın, en iyi fiyatı alın
        - generic [ref=e40]:
          - heading "Giriş Yapmanız Gerekiyor" [level=3] [ref=e41]
          - paragraph [ref=e42]: Ürün satışı için önce giriş yapmanız gerekiyor.
          - generic [ref=e43]:
            - link "Giriş Yap" [ref=e44] [cursor=pointer]:
              - /url: /login?returnUrl=%2Fbize-sat%2Fram
            - link "Hesap Oluştur" [ref=e45] [cursor=pointer]:
              - /url: /register
        - generic [ref=e46]:
          - generic [ref=e47]:
            - heading "💾 Temel Bilgiler" [level=2] [ref=e48]
            - generic [ref=e49]:
              - generic [ref=e50]:
                - generic [ref=e51]: Marka *
                - 'textbox "Örn: Corsair, G.Skill, Kingston" [ref=e52]'
              - generic [ref=e53]:
                - generic [ref=e54]: Model *
                - 'textbox "Örn: Vengeance, Trident Z" [ref=e55]'
          - generic [ref=e56]:
            - heading "⚙️ Teknik Özellikler" [level=2] [ref=e57]
            - generic [ref=e58]:
              - generic [ref=e59]:
                - generic [ref=e60]: Kapasite
                - 'textbox "Örn: 8GB, 16GB, 32GB" [ref=e61]'
              - generic [ref=e62]:
                - generic [ref=e63]: Hız
                - 'textbox "Örn: 3200MHz, 3600MHz" [ref=e64]'
              - generic [ref=e65]:
                - generic [ref=e66]: Tip
                - 'textbox "Örn: DDR4, DDR5" [ref=e67]'
              - generic [ref=e68]:
                - generic [ref=e69]: Gecikme
                - 'textbox "Örn: CL16, CL18" [ref=e70]'
              - generic [ref=e71]:
                - generic [ref=e72]: Açıklama
                - textbox "Ürün hakkında ek bilgiler, özellikler, kullanım durumu vb." [ref=e73]
          - generic [ref=e74]:
            - heading "📋 Durum Bilgileri" [level=2] [ref=e75]
            - generic [ref=e76]:
              - generic [ref=e77]:
                - generic [ref=e78]: Kozmetik Durum *
                - combobox [ref=e79]:
                  - option "Mükemmel" [selected]
                  - option "İyi"
                  - option "Orta"
                  - option "Kötü"
              - generic [ref=e80]:
                - generic [ref=e81]: Adet *
                - spinbutton [ref=e82]: "1"
            - generic [ref=e83]:
              - generic [ref=e84]:
                - checkbox [ref=e85]
                - generic [ref=e86]: Kutusu var
              - generic [ref=e87]:
                - checkbox [ref=e88]
                - generic [ref=e89]: Faturası var
              - generic [ref=e90]:
                - checkbox [ref=e91]
                - generic [ref=e92]: Garanti
          - generic [ref=e93]:
            - heading "📸 Fotoğraflar" [level=2] [ref=e94]
            - generic [ref=e95]:
              - generic [ref=e97] [cursor=pointer]:
                - generic [ref=e98]: 📷
                - generic [ref=e99]: Fotoğraf Ekle
              - generic [ref=e101] [cursor=pointer]:
                - generic [ref=e102]: 📷
                - generic [ref=e103]: Fotoğraf Ekle
              - generic [ref=e105] [cursor=pointer]:
                - generic [ref=e106]: 📷
                - generic [ref=e107]: Fotoğraf Ekle
              - generic [ref=e109] [cursor=pointer]:
                - generic [ref=e110]: 📷
                - generic [ref=e111]: Fotoğraf Ekle
              - generic [ref=e113] [cursor=pointer]:
                - generic [ref=e114]: 📷
                - generic [ref=e115]: Fotoğraf Ekle
              - generic [ref=e117] [cursor=pointer]:
                - generic [ref=e118]: 📷
                - generic [ref=e119]: Fotoğraf Ekle
              - generic [ref=e121] [cursor=pointer]:
                - generic [ref=e122]: 📷
                - generic [ref=e123]: Fotoğraf Ekle
              - generic [ref=e125] [cursor=pointer]:
                - generic [ref=e126]: 📷
                - generic [ref=e127]: Fotoğraf Ekle
              - generic [ref=e129] [cursor=pointer]:
                - generic [ref=e130]: 📷
                - generic [ref=e131]: Fotoğraf Ekle
              - generic [ref=e133] [cursor=pointer]:
                - generic [ref=e134]: 📷
                - generic [ref=e135]: Fotoğraf Ekle
            - paragraph [ref=e136]: Maksimum 10 fotoğraf ekleyebilirsiniz. Her kareye tıklayarak fotoğraf seçebilirsiniz.
    - contentinfo [ref=e137]:
      - generic [ref=e139]:
        - generic [ref=e140]:
          - generic [ref=e141]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e142]
          - paragraph [ref=e143]: Hızlı ve güvenli gönderim
        - generic [ref=e144]:
          - generic [ref=e145]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e146]
          - paragraph [ref=e147]: Memnuniyetiniz önceliğimiz
        - generic [ref=e148]:
          - generic [ref=e149]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e150]
          - paragraph [ref=e151]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e152]:
          - generic [ref=e153]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e154]
          - paragraph [ref=e155]: Sadece bilinen kaliteli markalar
      - generic [ref=e157]:
        - generic [ref=e158]:
          - heading "KURUMSAL" [level=4] [ref=e159]
          - generic [ref=e160]:
            - link "Hakkımızda" [ref=e161] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e162] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e163] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e164]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e165]
          - generic [ref=e166]:
            - link "KVKK Bilgilendirme" [ref=e167] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e168] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e169] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e170] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e171]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e172]
          - generic [ref=e173]:
            - link "Hesabım" [ref=e174] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e175] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e176] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e177] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e178] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e179]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e180]
          - generic [ref=e181]:
            - generic [ref=e182]: 📍
            - generic [ref=e183]:
              - generic [ref=e184]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e185]: 34760 Ümraniye/İstanbul
          - generic [ref=e186]:
            - link [ref=e187] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e188]
            - link [ref=e189] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e190]
            - link [ref=e191] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e192]
            - link [ref=e193] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e196]:
        - generic [ref=e197]:
          - generic [ref=e198]: DB
          - generic [ref=e199]: Düşük Bütçe
        - generic [ref=e200]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e201] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e210] [cursor=pointer]
  - alert [ref=e214]
```

# Test source

```ts
  36  |       }
  37  |     });
  38  | 
  39  |     test('✅ Kategori ikonları render edilmesi', async ({ page }) => {
  40  |       await page.goto(`${BASE_URL}/bize-sat`);
  41  | 
  42  |       // İkonlar (img veya svg) kontrol
  43  |       const icons = page.locator('img[src*=".png"], img[src*=".svg"], svg');
  44  |       const iconCount = await icons.count();
  45  |       expect(iconCount).toBeGreaterThan(0);
  46  |     });
  47  | 
  48  |     test('✅ Kategori seçimi - Bileşenler', async ({ page }) => {
  49  |       await page.goto(`${BASE_URL}/bize-sat`);
  50  | 
  51  |       const cpuCategory = page.getByText(/işlemci/i);
  52  |       if (cpuCategory) {
  53  |         await cpuCategory.click();
  54  | 
  55  |         // İşlemci sayfasına yönlendirilmesi bekleniyor
  56  |         await expect(page).toHaveURL(/.*islemci/i);
  57  |       }
  58  |     });
  59  | 
  60  |     test('✅ Kategori seçimi - Aksesuarlar', async ({ page }) => {
  61  |       await page.goto(`${BASE_URL}/bize-sat`);
  62  | 
  63  |       const tabletCategory = page.getByText(/tablet/i);
  64  |       if (tabletCategory) {
  65  |         await tabletCategory.click();
  66  | 
  67  |         // Tablet sayfasına yönlendirilmesi bekleniyor
  68  |         await expect(page).toHaveURL(/.*tablet/i);
  69  |       }
  70  |     });
  71  | 
  72  |     test('✅ Kategori seçimi - Oyun Konsolları', async ({ page }) => {
  73  |       await page.goto(`${BASE_URL}/bize-sat`);
  74  | 
  75  |       const xboxCategory = page.getByText(/xbox/i);
  76  |       if (xboxCategory) {
  77  |         await xboxCategory.click();
  78  | 
  79  |         // Xbox sayfasına yönlendirilmesi bekleniyor
  80  |         await expect(page).toHaveURL(/.*xbox/i);
  81  |       }
  82  |     });
  83  |   });
  84  | 
  85  |   // ==================== RESPONSIVE DİZAYN ====================
  86  |   test.describe('Responsive Tasarım Testleri', () => {
  87  | 
  88  |     test('✅ Mobile view - Kategoriler görüntülenmesi', async ({ page }) => {
  89  |       await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  90  |       await page.goto(`${BASE_URL}/bize-sat`);
  91  | 
  92  |       const categories = page.locator('[class*="category"]');
  93  |       expect(await categories.count()).toBeGreaterThan(0);
  94  | 
  95  |       // Scroll edilebilir olması bekleniyor
  96  |       await page.evaluate(() => window.scrollBy(0, 500));
  97  |     });
  98  | 
  99  |     test('✅ Tablet view - Grid layout', async ({ page }) => {
  100 |       await page.setViewportSize({ width: 768, height: 1024 }); // iPad
  101 |       await page.goto(`${BASE_URL}/bize-sat`);
  102 | 
  103 |       const categories = page.locator('[class*="category"]');
  104 |       expect(await categories.count()).toBeGreaterThan(0);
  105 |     });
  106 | 
  107 |     test('✅ Desktop view - Full layout', async ({ page }) => {
  108 |       await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
  109 |       await page.goto(`${BASE_URL}/bize-sat`);
  110 | 
  111 |       const categories = page.locator('[class*="category"]');
  112 |       expect(await categories.count()).toBeGreaterThan(0);
  113 |     });
  114 |   });
  115 | 
  116 |   // ==================== İLAN OLUŞTURMA ====================
  117 |   test.describe('İlan Oluşturma Senaryoları', () => {
  118 | 
  119 |     test('✅ İlan oluşturma formu açılması', async ({ page }) => {
  120 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  121 | 
  122 |       const createListingBtn = page.getByText(/iş aç|yeni iş|satış|create/i);
  123 |       if (createListingBtn) {
  124 |         await createListingBtn.click();
  125 | 
  126 |         // Form görüntülenmesi bekleniyor
  127 |         await expect(page.getByLabel(/başlık|title|fiyat|price/i)).toBeDefined();
  128 |       }
  129 |     });
  130 | 
  131 |     test('✅ Zorunlu alanlar validation', async ({ page }) => {
  132 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  133 | 
  134 |       const createListingBtn = page.getByText(/iş aç|yeni iş/i);
  135 |       if (createListingBtn) {
> 136 |         await createListingBtn.click();
      |                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  137 | 
  138 |         // Boş form submit
  139 |         const submitBtn = page.getByRole('button', { name: /submit|gönder/i });
  140 |         if (submitBtn) {
  141 |           await submitBtn.click();
  142 | 
  143 |           // Validation errors bekleniyor
  144 |           await expect(page.getByText(/required|zorunlu|gerekli/i)).toBeVisible();
  145 |         }
  146 |       }
  147 |     });
  148 | 
  149 |     test('✅ Resim yüklemesi', async ({ page }) => {
  150 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  151 | 
  152 |       const fileInput = page.locator('input[type="file"]');
  153 |       if (fileInput) {
  154 |         await expect(fileInput).toBeDefined();
  155 |       }
  156 |     });
  157 | 
  158 |     test('✅ Fiyat girişi validation', async ({ page }) => {
  159 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  160 | 
  161 |       const priceInput = page.getByLabel(/fiyat|price/i);
  162 |       if (priceInput) {
  163 |         // Negatif fiyat girişi
  164 |         await priceInput.fill('-100');
  165 | 
  166 |         const submitBtn = page.getByRole('button', { name: /submit/i });
  167 |         if (submitBtn) {
  168 |           await submitBtn.click();
  169 | 
  170 |           // Error bekleniyor
  171 |           await expect(page.getByText(/valid.*price|positive|must.*greater/i)).toBeVisible();
  172 |         }
  173 |       }
  174 |     });
  175 |   });
  176 | 
  177 |   // ==================== WHATSAPP ENTEGRASYONU ====================
  178 |   test.describe('WhatsApp Entegrasyonu', () => {
  179 | 
  180 |     test('✅ WhatsApp butonu görüntülenmesi', async ({ page }) => {
  181 |       await page.goto(`${BASE_URL}/bize-sat`);
  182 | 
  183 |       const whatsappBtn = page.getByText(/whatsapp|wa\.me/i);
  184 |       await expect(whatsappBtn).toBeVisible();
  185 |     });
  186 | 
  187 |     test('✅ WhatsApp linki doğru format', async ({ page }) => {
  188 |       await page.goto(`${BASE_URL}/bize-sat`);
  189 | 
  190 |       const whatsappLink = page.locator('a[href*="wa.me"]');
  191 |       if (await whatsappLink.count() > 0) {
  192 |         const href = await whatsappLink.getAttribute('href');
  193 |         expect(href).toContain('wa.me');
  194 |       }
  195 |     });
  196 |   });
  197 | 
  198 |   // ==================== SEARCH FUNCTIONALITY ====================
  199 |   test.describe('Arama Fonksiyonu', () => {
  200 | 
  201 |     test('✅ Arama kutusu görüntülenmesi', async ({ page }) => {
  202 |       await page.goto(`${BASE_URL}/bize-sat`);
  203 | 
  204 |       const searchBox = page.getByPlaceholder(/ara|search/i);
  205 |       await expect(searchBox).toBeVisible();
  206 |     });
  207 | 
  208 |     test('✅ Kategoriye göre arama', async ({ page }) => {
  209 |       await page.goto(`${BASE_URL}/bize-sat`);
  210 | 
  211 |       const searchBox = page.getByPlaceholder(/ara|search/i);
  212 |       if (searchBox) {
  213 |         await searchBox.fill('RAM');
  214 | 
  215 |         // Arama sonuçlarında RAM kategorisi bulunması bekleniyor
  216 |         const results = page.locator('[class*="search-result"]');
  217 |         expect(await results.count()).toBeGreaterThanOrEqual(0);
  218 |       }
  219 |     });
  220 | 
  221 |     test('✅ Boş arama sonuçları', async ({ page }) => {
  222 |       await page.goto(`${BASE_URL}/bize-sat`);
  223 | 
  224 |       const searchBox = page.getByPlaceholder(/ara|search/i);
  225 |       if (searchBox) {
  226 |         await searchBox.fill('XYZ123NonExistent');
  227 | 
  228 |         // No results mesajı bekleniyor
  229 |         const noResults = page.getByText(/not.*found|sonuç.*yok|no.*results/i);
  230 |         // Yok olabilir veya görünebilir - flexible test
  231 |       }
  232 |     });
  233 |   });
  234 | });
  235 | 
  236 | export {};
```