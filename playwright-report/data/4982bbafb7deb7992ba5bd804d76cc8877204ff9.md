# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> WhatsApp Entegrasyonu >> ✅ WhatsApp linki doğru format
- Location: tests/bize-sat-flow.test.ts:185:9

# Error details

```
Error: locator.getAttribute: Error: strict mode violation: locator('a[href*="wa.me"]') resolved to 2 elements:
    1) <a target="_blank" rel="noopener noreferrer" href="https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.">…</a> aka getByRole('link').filter({ hasText: /^$/ }).nth(4)
    2) <a target="_blank" class="whatsapp-button" rel="noopener noreferrer" href="https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.">…</a> aka getByRole('link', { name: 'WhatsApp Destek Hattı' })

Call log:
  - waiting for locator('a[href*="wa.me"]')

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
> 190 |         const href = await whatsappLink.getAttribute('href');
      |                                         ^ Error: locator.getAttribute: Error: strict mode violation: locator('a[href*="wa.me"]') resolved to 2 elements:
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
  225 |       const searchBox = page.getByTestId('search-box').or(page.getByPlaceholder(/ara|search/i));
  226 |       const hasSearchBox = await searchBox.isVisible({ timeout: 2000 }).catch(() => false);
  227 |       if (hasSearchBox) {
  228 |         await searchBox.fill('XYZ123NonExistent');
  229 | 
  230 |         // No results mesajı bekleniyor
  231 |         const noResults = page.getByText(/not.*found|sonuç.*yok|no.*results/i);
  232 |         // Yok olabilir veya görünebilir - flexible test
  233 |       }
  234 |     });
  235 |   });
  236 | });
  237 | 
  238 | export {};
  239 | 
```