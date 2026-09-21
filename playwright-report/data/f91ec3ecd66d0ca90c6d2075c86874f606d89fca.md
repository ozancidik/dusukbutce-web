# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> İlan Oluşturma Senaryoları >> ✅ İlan oluşturma formu açılması
- Location: tests/bize-sat-flow.test.ts:119:9

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
        - link "Bize Sat" [ref=e26] [cursor=pointer]:
          - /url: /bize-sat
        - generic [ref=e27]: ">"
        - generic [ref=e28]: RAM
    - main [ref=e29]:
      - generic [ref=e31]:
        - generic [ref=e32]:
          - heading "RAM Sat" [level=1] [ref=e33]
          - paragraph [ref=e34]: RAM'inizi satın, en iyi fiyatı alın
        - generic [ref=e35]:
          - heading "Giriş Yapmanız Gerekiyor" [level=3] [ref=e36]
          - paragraph [ref=e37]: Ürün satışı için önce giriş yapmanız gerekiyor.
          - generic [ref=e38]:
            - link "Giriş Yap" [ref=e39] [cursor=pointer]:
              - /url: /login?returnUrl=%2Fbize-sat%2Fram
            - link "Hesap Oluştur" [ref=e40] [cursor=pointer]:
              - /url: /register
        - generic [ref=e41]:
          - generic [ref=e42]:
            - heading "💾 Temel Bilgiler" [level=2] [ref=e43]
            - generic [ref=e44]:
              - generic [ref=e45]:
                - generic [ref=e46]: Marka *
                - 'textbox "Örn: Corsair, G.Skill, Kingston" [ref=e47]'
              - generic [ref=e48]:
                - generic [ref=e49]: Model *
                - 'textbox "Örn: Vengeance, Trident Z" [ref=e50]'
          - generic [ref=e51]:
            - heading "⚙️ Teknik Özellikler" [level=2] [ref=e52]
            - generic [ref=e53]:
              - generic [ref=e54]:
                - generic [ref=e55]: Kapasite
                - 'textbox "Örn: 8GB, 16GB, 32GB" [ref=e56]'
              - generic [ref=e57]:
                - generic [ref=e58]: Hız
                - 'textbox "Örn: 3200MHz, 3600MHz" [ref=e59]'
              - generic [ref=e60]:
                - generic [ref=e61]: Tip
                - 'textbox "Örn: DDR4, DDR5" [ref=e62]'
              - generic [ref=e63]:
                - generic [ref=e64]: Gecikme
                - 'textbox "Örn: CL16, CL18" [ref=e65]'
              - generic [ref=e66]:
                - generic [ref=e67]: Açıklama
                - textbox "Ürün hakkında ek bilgiler, özellikler, kullanım durumu vb." [ref=e68]
          - generic [ref=e69]:
            - heading "📋 Durum Bilgileri" [level=2] [ref=e70]
            - generic [ref=e71]:
              - generic [ref=e72]:
                - generic [ref=e73]: Kozmetik Durum *
                - combobox [ref=e74]:
                  - option "Mükemmel" [selected]
                  - option "İyi"
                  - option "Orta"
                  - option "Kötü"
              - generic [ref=e75]:
                - generic [ref=e76]: Adet *
                - spinbutton [ref=e77]: "1"
            - generic [ref=e78]:
              - generic [ref=e79]:
                - checkbox [ref=e80]
                - generic [ref=e81]: Kutusu var
              - generic [ref=e82]:
                - checkbox [ref=e83]
                - generic [ref=e84]: Faturası var
              - generic [ref=e85]:
                - checkbox [ref=e86]
                - generic [ref=e87]: Garanti
          - generic [ref=e88]:
            - heading "📸 Fotoğraflar" [level=2] [ref=e89]
            - generic [ref=e90]:
              - generic [ref=e92] [cursor=pointer]:
                - generic [ref=e93]: 📷
                - generic [ref=e94]: Fotoğraf Ekle
              - generic [ref=e96] [cursor=pointer]:
                - generic [ref=e97]: 📷
                - generic [ref=e98]: Fotoğraf Ekle
              - generic [ref=e100] [cursor=pointer]:
                - generic [ref=e101]: 📷
                - generic [ref=e102]: Fotoğraf Ekle
              - generic [ref=e104] [cursor=pointer]:
                - generic [ref=e105]: 📷
                - generic [ref=e106]: Fotoğraf Ekle
              - generic [ref=e108] [cursor=pointer]:
                - generic [ref=e109]: 📷
                - generic [ref=e110]: Fotoğraf Ekle
              - generic [ref=e112] [cursor=pointer]:
                - generic [ref=e113]: 📷
                - generic [ref=e114]: Fotoğraf Ekle
              - generic [ref=e116] [cursor=pointer]:
                - generic [ref=e117]: 📷
                - generic [ref=e118]: Fotoğraf Ekle
              - generic [ref=e120] [cursor=pointer]:
                - generic [ref=e121]: 📷
                - generic [ref=e122]: Fotoğraf Ekle
              - generic [ref=e124] [cursor=pointer]:
                - generic [ref=e125]: 📷
                - generic [ref=e126]: Fotoğraf Ekle
              - generic [ref=e128] [cursor=pointer]:
                - generic [ref=e129]: 📷
                - generic [ref=e130]: Fotoğraf Ekle
            - paragraph [ref=e131]: Maksimum 10 fotoğraf ekleyebilirsiniz. Her kareye tıklayarak fotoğraf seçebilirsiniz.
    - contentinfo [ref=e132]:
      - generic [ref=e134]:
        - generic [ref=e135]:
          - generic [ref=e136]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e137]
          - paragraph [ref=e138]: Hızlı ve güvenli gönderim
        - generic [ref=e139]:
          - generic [ref=e140]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e141]
          - paragraph [ref=e142]: Memnuniyetiniz önceliğimiz
        - generic [ref=e143]:
          - generic [ref=e144]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e145]
          - paragraph [ref=e146]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e147]:
          - generic [ref=e148]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e149]
          - paragraph [ref=e150]: Sadece bilinen kaliteli markalar
      - generic [ref=e152]:
        - generic [ref=e153]:
          - heading "KURUMSAL" [level=4] [ref=e154]
          - generic [ref=e155]:
            - link "Hakkımızda" [ref=e156] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e157] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e158] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e159]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e160]
          - generic [ref=e161]:
            - link "KVKK Bilgilendirme" [ref=e162] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e163] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e164] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e165] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e166]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e167]
          - generic [ref=e168]:
            - link "Hesabım" [ref=e169] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e170] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e171] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e172] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e173] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e174]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e175]
          - generic [ref=e176]:
            - generic [ref=e177]: 📍
            - generic [ref=e178]:
              - generic [ref=e179]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e180]: 34760 Ümraniye/İstanbul
          - generic [ref=e181]:
            - link [ref=e182] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e183]
            - link [ref=e184] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e185]
            - link [ref=e186] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e187]
            - link [ref=e188] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e191]:
        - generic [ref=e192]:
          - generic [ref=e193]: DB
          - generic [ref=e194]: Düşük Bütçe
        - generic [ref=e195]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e196] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e205] [cursor=pointer]
  - alert [ref=e209]
```

# Test source

```ts
  24  | 
  25  |       const categories = [
  26  |         'İşlemci', 'RAM', 'Ekran Kartı', 'SSD', 'Soğutucu', 'Kasa',
  27  |         'Cep Telefonu', 'Tablet', 'Monitör', 'Ses Sistemi',
  28  |         'PlayStation', 'Gamepad', 'Xbox'
  29  |       ];
  30  | 
  31  |       for (const category of categories) {
  32  |         const categoryBtn = page.getByText(new RegExp(category, 'i'));
  33  |         if (categoryBtn) {
  34  |           await expect(categoryBtn).toBeVisible();
  35  |         }
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
> 124 |         await createListingBtn.click();
      |                                ^ Error: locator.click: Error: strict mode violation: getByText(/iş aç|yeni iş|satış|create/i) resolved to 2 elements:
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
  136 |         await createListingBtn.click();
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
  161 |       const priceInput = page.getByTestId('price-input');
  162 |       if (priceInput) {
  163 |         // Pozitif fiyat girişi (negatif type="number" tarafından bloke ediliyor)
  164 |         await priceInput.fill('999');
  165 | 
  166 |         const submitBtn = page.getByRole('button', { name: /submit|gönder/i });
  167 |         if (submitBtn) {
  168 |           await submitBtn.click();
  169 |           // Form validation geçtiği bekleniyor
  170 |         }
  171 |       }
  172 |     });
  173 |   });
  174 | 
  175 |   // ==================== WHATSAPP ENTEGRASYONU ====================
  176 |   test.describe('WhatsApp Entegrasyonu', () => {
  177 | 
  178 |     test('✅ WhatsApp butonu görüntülenmesi', async ({ page }) => {
  179 |       await page.goto(`${BASE_URL}/bize-sat`);
  180 | 
  181 |       const whatsappBtn = page.getByText(/whatsapp|wa\.me/i);
  182 |       await expect(whatsappBtn).toBeVisible();
  183 |     });
  184 | 
  185 |     test('✅ WhatsApp linki doğru format', async ({ page }) => {
  186 |       await page.goto(`${BASE_URL}/bize-sat`);
  187 | 
  188 |       const whatsappLink = page.locator('a[href*="wa.me"]');
  189 |       if (await whatsappLink.count() > 0) {
  190 |         const href = await whatsappLink.getAttribute('href');
  191 |         expect(href).toContain('wa.me');
  192 |       }
  193 |     });
  194 |   });
  195 | 
  196 |   // ==================== SEARCH FUNCTIONALITY ====================
  197 |   test.describe('Arama Fonksiyonu', () => {
  198 | 
  199 |     test('✅ Arama kutusu görüntülenmesi', async ({ page }) => {
  200 |       await page.goto(`${BASE_URL}/bize-sat`);
  201 | 
  202 |       const searchBox = page.getByTestId('search-box').or(page.getByPlaceholder(/ara|search/i));
  203 |       const isVisible = await searchBox.isVisible({ timeout: 2000 }).catch(() => false);
  204 |       // Arama kutusu bulunmasa bile kategoriler görüntülenebilir
  205 |       expect(await page.locator('[class*="category"]').count()).toBeGreaterThanOrEqual(0);
  206 |     });
  207 | 
  208 |     test('✅ Kategoriye göre arama', async ({ page }) => {
  209 |       await page.goto(`${BASE_URL}/bize-sat`);
  210 | 
  211 |       const searchBox = page.getByTestId('search-box').or(page.getByPlaceholder(/ara|search/i));
  212 |       const hasSearchBox = await searchBox.isVisible({ timeout: 2000 }).catch(() => false);
  213 |       if (hasSearchBox) {
  214 |         await searchBox.fill('RAM');
  215 |         // Arama sonuçlarını kontrol et
  216 |       }
  217 |       // En azından kategoriler görünmelidir
  218 |       const categories = page.locator('[class*="category"], a[href*="/bize-sat/"]');
  219 |       expect(await categories.count()).toBeGreaterThanOrEqual(1);
  220 |     });
  221 | 
  222 |     test('✅ Boş arama sonuçları', async ({ page }) => {
  223 |       await page.goto(`${BASE_URL}/bize-sat`);
  224 | 
```