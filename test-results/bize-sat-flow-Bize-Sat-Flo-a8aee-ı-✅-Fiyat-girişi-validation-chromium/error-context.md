# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> İlan Oluşturma Senaryoları >> ✅ Fiyat girişi validation
- Location: tests/bize-sat-flow.test.ts:178:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('price-input')

```

# Page snapshot

```yaml
- generic [active] [ref=f1e1]:
  - generic [ref=f1e2]:
    - banner [ref=f1e3]:
      - generic [ref=f1e5]:
        - link [ref=f1e6] [cursor=pointer]:
          - /url: /
          - img "Düşük Bütçe" [ref=f1e7]
        - generic [ref=f1e10]:
          - textbox "Ürün, kategori veya marka ara..." [ref=f1e11]
          - generic [ref=f1e12]: 🔍
        - generic [ref=f1e13]:
          - button "Giriş Yap" [ref=f1e15] [cursor=pointer]
          - link [ref=f1e21] [cursor=pointer]:
            - /url: /sepet
            - button "Sepet" [ref=f1e22]
    - navigation [ref=f1e27]:
      - generic [ref=f1e28]:
        - link "Anasayfa" [ref=f1e29] [cursor=pointer]:
          - /url: /
        - generic [ref=f1e30]: ">"
        - link "Bize Sat" [ref=f1e31] [cursor=pointer]:
          - /url: /bize-sat
        - generic [ref=f1e32]: ">"
        - generic [ref=f1e33]: RAM
    - main [ref=f1e34]:
      - generic [ref=f1e36]:
        - generic [ref=f1e37]:
          - heading "RAM Sat" [level=1] [ref=f1e38]
          - paragraph [ref=f1e39]: RAM'inizi satın, en iyi fiyatı alın
        - generic [ref=f1e40]:
          - heading "Giriş Yapmanız Gerekiyor" [level=3] [ref=f1e41]
          - paragraph [ref=f1e42]: Ürün satışı için önce giriş yapmanız gerekiyor.
          - generic [ref=f1e43]:
            - link "Giriş Yap" [ref=f1e44] [cursor=pointer]:
              - /url: /login?returnUrl=%2Fbize-sat%2Fram
            - link "Hesap Oluştur" [ref=f1e45] [cursor=pointer]:
              - /url: /register
        - generic [ref=f1e46]:
          - generic [ref=f1e47]:
            - heading "💾 Temel Bilgiler" [level=2] [ref=f1e48]
            - generic [ref=f1e49]:
              - generic [ref=f1e50]:
                - generic [ref=f1e51]: Marka *
                - 'textbox "Örn: Corsair, G.Skill, Kingston" [ref=f1e52]'
              - generic [ref=f1e53]:
                - generic [ref=f1e54]: Model *
                - 'textbox "Örn: Vengeance, Trident Z" [ref=f1e55]'
          - generic [ref=f1e56]:
            - heading "⚙️ Teknik Özellikler" [level=2] [ref=f1e57]
            - generic [ref=f1e58]:
              - generic [ref=f1e59]:
                - generic [ref=f1e60]: Kapasite
                - 'textbox "Örn: 8GB, 16GB, 32GB" [ref=f1e61]'
              - generic [ref=f1e62]:
                - generic [ref=f1e63]: Hız
                - 'textbox "Örn: 3200MHz, 3600MHz" [ref=f1e64]'
              - generic [ref=f1e65]:
                - generic [ref=f1e66]: Tip
                - 'textbox "Örn: DDR4, DDR5" [ref=f1e67]'
              - generic [ref=f1e68]:
                - generic [ref=f1e69]: Gecikme
                - 'textbox "Örn: CL16, CL18" [ref=f1e70]'
              - generic [ref=f1e71]:
                - generic [ref=f1e72]: Açıklama
                - textbox "Ürün hakkında ek bilgiler, özellikler, kullanım durumu vb." [ref=f1e73]
          - generic [ref=f1e74]:
            - heading "📋 Durum Bilgileri" [level=2] [ref=f1e75]
            - generic [ref=f1e76]:
              - generic [ref=f1e77]:
                - generic [ref=f1e78]: Kozmetik Durum *
                - combobox [ref=f1e79]:
                  - option "Mükemmel" [selected]
                  - option "İyi"
                  - option "Orta"
                  - option "Kötü"
              - generic [ref=f1e80]:
                - generic [ref=f1e81]: Adet *
                - spinbutton [ref=f1e82]: "1"
            - generic [ref=f1e83]:
              - generic [ref=f1e84]:
                - checkbox [ref=f1e85]
                - generic [ref=f1e86]: Kutusu var
              - generic [ref=f1e87]:
                - checkbox [ref=f1e88]
                - generic [ref=f1e89]: Faturası var
              - generic [ref=f1e90]:
                - checkbox [ref=f1e91]
                - generic [ref=f1e92]: Garanti
          - generic [ref=f1e93]:
            - heading "📸 Fotoğraflar" [level=2] [ref=f1e94]
            - generic [ref=f1e95]:
              - generic [ref=f1e97] [cursor=pointer]:
                - generic [ref=f1e98]: 📷
                - generic [ref=f1e99]: Fotoğraf Ekle
              - generic [ref=f1e101] [cursor=pointer]:
                - generic [ref=f1e102]: 📷
                - generic [ref=f1e103]: Fotoğraf Ekle
              - generic [ref=f1e105] [cursor=pointer]:
                - generic [ref=f1e106]: 📷
                - generic [ref=f1e107]: Fotoğraf Ekle
              - generic [ref=f1e109] [cursor=pointer]:
                - generic [ref=f1e110]: 📷
                - generic [ref=f1e111]: Fotoğraf Ekle
              - generic [ref=f1e113] [cursor=pointer]:
                - generic [ref=f1e114]: 📷
                - generic [ref=f1e115]: Fotoğraf Ekle
              - generic [ref=f1e117] [cursor=pointer]:
                - generic [ref=f1e118]: 📷
                - generic [ref=f1e119]: Fotoğraf Ekle
              - generic [ref=f1e121] [cursor=pointer]:
                - generic [ref=f1e122]: 📷
                - generic [ref=f1e123]: Fotoğraf Ekle
              - generic [ref=f1e125] [cursor=pointer]:
                - generic [ref=f1e126]: 📷
                - generic [ref=f1e127]: Fotoğraf Ekle
              - generic [ref=f1e129] [cursor=pointer]:
                - generic [ref=f1e130]: 📷
                - generic [ref=f1e131]: Fotoğraf Ekle
              - generic [ref=f1e133] [cursor=pointer]:
                - generic [ref=f1e134]: 📷
                - generic [ref=f1e135]: Fotoğraf Ekle
            - paragraph [ref=f1e136]: Maksimum 10 fotoğraf ekleyebilirsiniz. Her kareye tıklayarak fotoğraf seçebilirsiniz.
    - contentinfo [ref=f1e137]:
      - generic [ref=f1e139]:
        - generic [ref=f1e140]:
          - generic [ref=f1e141]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=f1e142]
          - paragraph [ref=f1e143]: Hızlı ve güvenli gönderim
        - generic [ref=f1e144]:
          - generic [ref=f1e145]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=f1e146]
          - paragraph [ref=f1e147]: Memnuniyetiniz önceliğimiz
        - generic [ref=f1e148]:
          - generic [ref=f1e149]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=f1e150]
          - paragraph [ref=f1e151]: "%100 güvenli ödeme altyapısı"
        - generic [ref=f1e152]:
          - generic [ref=f1e153]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=f1e154]
          - paragraph [ref=f1e155]: Sadece bilinen kaliteli markalar
      - generic [ref=f1e157]:
        - generic [ref=f1e158]:
          - heading "KURUMSAL" [level=4] [ref=f1e159]
          - generic [ref=f1e160]:
            - link "Hakkımızda" [ref=f1e161] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=f1e162] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=f1e163] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=f1e164]:
          - heading "SİTE KULLANIMI" [level=4] [ref=f1e165]
          - generic [ref=f1e166]:
            - link "KVKK Bilgilendirme" [ref=f1e167] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=f1e168] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=f1e169] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=f1e170] [cursor=pointer]:
              - /url: /sss
        - generic [ref=f1e171]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=f1e172]
          - generic [ref=f1e173]:
            - link "Hesabım" [ref=f1e174] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=f1e175] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=f1e176] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=f1e177] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=f1e178] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=f1e179]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=f1e180]
          - generic [ref=f1e181]:
            - generic [ref=f1e182]: 📍
            - generic [ref=f1e183]:
              - generic [ref=f1e184]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=f1e185]: 34760 Ümraniye/İstanbul
          - generic [ref=f1e186]:
            - link [ref=f1e187] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=f1e188]
            - link [ref=f1e189] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=f1e190]
            - link [ref=f1e191] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=f1e192]
            - link [ref=f1e193] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=f1e196]:
        - generic [ref=f1e197]:
          - generic [ref=f1e198]: DB
          - generic [ref=f1e199]: Düşük Bütçe
        - generic [ref=f1e200]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=f1e201] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=f1e210] [cursor=pointer]
  - alert [ref=f1e214]
```

# Test source

```ts
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
  166 |       }
  167 |     });
  168 | 
  169 |     test('✅ Resim yüklemesi', async ({ page }) => {
  170 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  171 | 
  172 |       const fileInput = page.locator('input[type="file"]');
  173 |       if (fileInput) {
  174 |         await expect(fileInput).toBeDefined();
  175 |       }
  176 |     });
  177 | 
  178 |     test('✅ Fiyat girişi validation', async ({ page }) => {
  179 |       // Önce login yap
  180 |       await loginUser(page);
  181 | 
  182 |       // Sonra bize-sat sayfasına git
  183 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  184 | 
  185 |       const priceInput = page.getByTestId('price-input');
  186 |       if (priceInput) {
  187 |         // Pozitif fiyat girişi (negatif type="number" tarafından bloke ediliyor)
> 188 |         await priceInput.fill('999');
      |                          ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  189 | 
  190 |         const submitBtn = page.getByRole('button', { name: /submit|gönder/i });
  191 |         if (submitBtn) {
  192 |           await submitBtn.click();
  193 |           // Form validation geçtiği bekleniyor
  194 |         }
  195 |       }
  196 |     });
  197 |   });
  198 | 
  199 |   // ==================== WHATSAPP ENTEGRASYONU ====================
  200 |   test.describe('WhatsApp Entegrasyonu', () => {
  201 | 
  202 |     test('✅ WhatsApp butonu görüntülenmesi', async ({ page }) => {
  203 |       await page.goto(`${BASE_URL}/bize-sat`);
  204 | 
  205 |       const whatsappBtn = page.getByText(/whatsapp|wa\.me/i);
  206 |       await expect(whatsappBtn).toBeVisible();
  207 |     });
  208 | 
  209 |     test('✅ WhatsApp linki doğru format', async ({ page }) => {
  210 |       await page.goto(`${BASE_URL}/bize-sat`);
  211 | 
  212 |       const whatsappLink = page.locator('a[href*="wa.me"]');
  213 |       if (await whatsappLink.count() > 0) {
  214 |         const href = await whatsappLink.getAttribute('href');
  215 |         expect(href).toContain('wa.me');
  216 |       }
  217 |     });
  218 |   });
  219 | 
  220 |   // ==================== SEARCH FUNCTIONALITY ====================
  221 |   test.describe('Arama Fonksiyonu', () => {
  222 | 
  223 |     test('✅ Arama kutusu görüntülenmesi', async ({ page }) => {
  224 |       await page.goto(`${BASE_URL}/bize-sat`);
  225 | 
  226 |       const searchBox = page.getByTestId('search-box').or(page.getByPlaceholder(/ara|search/i));
  227 |       const isVisible = await searchBox.isVisible({ timeout: 2000 }).catch(() => false);
  228 |       // Arama kutusu bulunmasa bile kategoriler görüntülenebilir
  229 |       expect(await page.locator('[class*="category"]').count()).toBeGreaterThanOrEqual(0);
  230 |     });
  231 | 
  232 |     test('✅ Kategoriye göre arama', async ({ page }) => {
  233 |       await page.goto(`${BASE_URL}/bize-sat`);
  234 | 
  235 |       const searchBox = page.getByTestId('search-box').or(page.getByPlaceholder(/ara|search/i));
  236 |       const hasSearchBox = await searchBox.isVisible({ timeout: 2000 }).catch(() => false);
  237 |       if (hasSearchBox) {
  238 |         await searchBox.fill('RAM');
  239 |         // Arama sonuçlarını kontrol et
  240 |       }
  241 |       // En azından kategoriler görünmelidir
  242 |       const categories = page.locator('[class*="category"], a[href*="/bize-sat/"]');
  243 |       expect(await categories.count()).toBeGreaterThanOrEqual(1);
  244 |     });
  245 | 
  246 |     test('✅ Boş arama sonuçları', async ({ page }) => {
  247 |       await page.goto(`${BASE_URL}/bize-sat`);
  248 | 
  249 |       const searchBox = page.getByTestId('search-box').or(page.getByPlaceholder(/ara|search/i));
  250 |       const hasSearchBox = await searchBox.isVisible({ timeout: 2000 }).catch(() => false);
  251 |       if (hasSearchBox) {
  252 |         await searchBox.fill('XYZ123NonExistent');
  253 | 
  254 |         // No results mesajı bekleniyor
  255 |         const noResults = page.getByText(/not.*found|sonuç.*yok|no.*results/i);
  256 |         // Yok olabilir veya görünebilir - flexible test
  257 |       }
  258 |     });
  259 |   });
  260 | });
  261 | 
  262 | export {};
  263 | 
```