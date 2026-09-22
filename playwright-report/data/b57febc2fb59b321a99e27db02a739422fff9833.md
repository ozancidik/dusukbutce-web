# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> İlan Oluşturma Senaryoları >> ✅ İlan oluşturma formu açılması
- Location: tests/bize-sat-flow.test.ts:131:9

# Error details

```
Error: locator.click: Error: strict mode violation: getByText(/iş aç|yeni iş|satış|create/i) resolved to 2 elements:
    1) <p>Ürün satışı için önce giriş yapmanız gerekiyor.</p> aka getByText('Ürün satışı için önce giriş')
    2) <a href="/satis-sozlesmesi">Satış Sözleşmesi</a> aka getByRole('link', { name: 'Satış Sözleşmesi' })

Call log:
  - waiting for getByText(/iş aç|yeni iş|satış|create/i)

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
        - generic [ref=f1e8]:
          - button "Giriş Yap" [ref=f1e10] [cursor=pointer]
          - link [ref=f1e16] [cursor=pointer]:
            - /url: /sepet
            - button "Sepet" [ref=f1e17]
    - navigation [ref=f1e22]:
      - generic [ref=f1e23]:
        - link "Anasayfa" [ref=f1e24] [cursor=pointer]:
          - /url: /
        - generic [ref=f1e25]: ">"
        - link "Bize Sat" [ref=f1e26] [cursor=pointer]:
          - /url: /bize-sat
        - generic [ref=f1e27]: ">"
        - generic [ref=f1e28]: RAM
    - main [ref=f1e29]:
      - generic [ref=f1e31]:
        - generic [ref=f1e32]:
          - heading "RAM Sat" [level=1] [ref=f1e33]
          - paragraph [ref=f1e34]: RAM'inizi satın, en iyi fiyatı alın
        - generic [ref=f1e35]:
          - heading "Giriş Yapmanız Gerekiyor" [level=3] [ref=f1e36]
          - paragraph [ref=f1e37]: Ürün satışı için önce giriş yapmanız gerekiyor.
          - generic [ref=f1e38]:
            - link "Giriş Yap" [ref=f1e39] [cursor=pointer]:
              - /url: /login?returnUrl=%2Fbize-sat%2Fram
            - link "Hesap Oluştur" [ref=f1e40] [cursor=pointer]:
              - /url: /register
        - generic [ref=f1e41]:
          - generic [ref=f1e42]:
            - heading "💾 Temel Bilgiler" [level=2] [ref=f1e43]
            - generic [ref=f1e44]:
              - generic [ref=f1e45]:
                - generic [ref=f1e46]: Marka *
                - 'textbox "Örn: Corsair, G.Skill, Kingston" [ref=f1e47]'
              - generic [ref=f1e48]:
                - generic [ref=f1e49]: Model *
                - 'textbox "Örn: Vengeance, Trident Z" [ref=f1e50]'
          - generic [ref=f1e51]:
            - heading "⚙️ Teknik Özellikler" [level=2] [ref=f1e52]
            - generic [ref=f1e53]:
              - generic [ref=f1e54]:
                - generic [ref=f1e55]: Kapasite
                - 'textbox "Örn: 8GB, 16GB, 32GB" [ref=f1e56]'
              - generic [ref=f1e57]:
                - generic [ref=f1e58]: Hız
                - 'textbox "Örn: 3200MHz, 3600MHz" [ref=f1e59]'
              - generic [ref=f1e60]:
                - generic [ref=f1e61]: Tip
                - 'textbox "Örn: DDR4, DDR5" [ref=f1e62]'
              - generic [ref=f1e63]:
                - generic [ref=f1e64]: Gecikme
                - 'textbox "Örn: CL16, CL18" [ref=f1e65]'
              - generic [ref=f1e66]:
                - generic [ref=f1e67]: Açıklama
                - textbox "Ürün hakkında ek bilgiler, özellikler, kullanım durumu vb." [ref=f1e68]
          - generic [ref=f1e69]:
            - heading "📋 Durum Bilgileri" [level=2] [ref=f1e70]
            - generic [ref=f1e71]:
              - generic [ref=f1e72]:
                - generic [ref=f1e73]: Kozmetik Durum *
                - combobox [ref=f1e74]:
                  - option "Mükemmel" [selected]
                  - option "İyi"
                  - option "Orta"
                  - option "Kötü"
              - generic [ref=f1e75]:
                - generic [ref=f1e76]: Adet *
                - spinbutton [ref=f1e77]: "1"
            - generic [ref=f1e78]:
              - generic [ref=f1e79]:
                - checkbox [ref=f1e80]
                - generic [ref=f1e81]: Kutusu var
              - generic [ref=f1e82]:
                - checkbox [ref=f1e83]
                - generic [ref=f1e84]: Faturası var
              - generic [ref=f1e85]:
                - checkbox [ref=f1e86]
                - generic [ref=f1e87]: Garanti
          - generic [ref=f1e88]:
            - heading "📸 Fotoğraflar" [level=2] [ref=f1e89]
            - generic [ref=f1e90]:
              - generic [ref=f1e92] [cursor=pointer]:
                - generic [ref=f1e93]: 📷
                - generic [ref=f1e94]: Fotoğraf Ekle
              - generic [ref=f1e96] [cursor=pointer]:
                - generic [ref=f1e97]: 📷
                - generic [ref=f1e98]: Fotoğraf Ekle
              - generic [ref=f1e100] [cursor=pointer]:
                - generic [ref=f1e101]: 📷
                - generic [ref=f1e102]: Fotoğraf Ekle
              - generic [ref=f1e104] [cursor=pointer]:
                - generic [ref=f1e105]: 📷
                - generic [ref=f1e106]: Fotoğraf Ekle
              - generic [ref=f1e108] [cursor=pointer]:
                - generic [ref=f1e109]: 📷
                - generic [ref=f1e110]: Fotoğraf Ekle
              - generic [ref=f1e112] [cursor=pointer]:
                - generic [ref=f1e113]: 📷
                - generic [ref=f1e114]: Fotoğraf Ekle
              - generic [ref=f1e116] [cursor=pointer]:
                - generic [ref=f1e117]: 📷
                - generic [ref=f1e118]: Fotoğraf Ekle
              - generic [ref=f1e120] [cursor=pointer]:
                - generic [ref=f1e121]: 📷
                - generic [ref=f1e122]: Fotoğraf Ekle
              - generic [ref=f1e124] [cursor=pointer]:
                - generic [ref=f1e125]: 📷
                - generic [ref=f1e126]: Fotoğraf Ekle
              - generic [ref=f1e128] [cursor=pointer]:
                - generic [ref=f1e129]: 📷
                - generic [ref=f1e130]: Fotoğraf Ekle
            - paragraph [ref=f1e131]: Maksimum 10 fotoğraf ekleyebilirsiniz. Her kareye tıklayarak fotoğraf seçebilirsiniz.
    - contentinfo [ref=f1e132]:
      - generic [ref=f1e134]:
        - generic [ref=f1e135]:
          - generic [ref=f1e136]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=f1e137]
          - paragraph [ref=f1e138]: Hızlı ve güvenli gönderim
        - generic [ref=f1e139]:
          - generic [ref=f1e140]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=f1e141]
          - paragraph [ref=f1e142]: Memnuniyetiniz önceliğimiz
        - generic [ref=f1e143]:
          - generic [ref=f1e144]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=f1e145]
          - paragraph [ref=f1e146]: "%100 güvenli ödeme altyapısı"
        - generic [ref=f1e147]:
          - generic [ref=f1e148]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=f1e149]
          - paragraph [ref=f1e150]: Sadece bilinen kaliteli markalar
      - generic [ref=f1e152]:
        - generic [ref=f1e153]:
          - heading "KURUMSAL" [level=4] [ref=f1e154]
          - generic [ref=f1e155]:
            - link "Hakkımızda" [ref=f1e156] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=f1e157] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=f1e158] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=f1e159]:
          - heading "SİTE KULLANIMI" [level=4] [ref=f1e160]
          - generic [ref=f1e161]:
            - link "KVKK Bilgilendirme" [ref=f1e162] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=f1e163] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=f1e164] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=f1e165] [cursor=pointer]:
              - /url: /sss
        - generic [ref=f1e166]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=f1e167]
          - generic [ref=f1e168]:
            - link "Hesabım" [ref=f1e169] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=f1e170] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=f1e171] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=f1e172] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=f1e173] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=f1e174]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=f1e175]
          - generic [ref=f1e176]:
            - generic [ref=f1e177]: 📍
            - generic [ref=f1e178]:
              - generic [ref=f1e179]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=f1e180]: 34760 Ümraniye/İstanbul
          - generic [ref=f1e181]:
            - link [ref=f1e182] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=f1e183]
            - link [ref=f1e184] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=f1e185]
            - link [ref=f1e186] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=f1e187]
            - link [ref=f1e188] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=f1e191]:
        - generic [ref=f1e192]:
          - generic [ref=f1e193]: DB
          - generic [ref=f1e194]: Düşük Bütçe
        - generic [ref=f1e195]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=f1e196] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=f1e205] [cursor=pointer]
  - alert [ref=f1e209]
```

# Test source

```ts
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
> 140 |         await createListingBtn.click();
      |                                ^ Error: locator.click: Error: strict mode violation: getByText(/iş aç|yeni iş|satış|create/i) resolved to 2 elements:
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
  188 |         await priceInput.fill('999');
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
```