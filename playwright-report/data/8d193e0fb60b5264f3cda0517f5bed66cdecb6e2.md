# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: bize-sat-flow.test.ts >> Bize-Sat Flow Tests >> Arama Fonksiyonu >> ✅ Arama kutusu görüntülenmesi
- Location: tests/bize-sat-flow.test.ts:201:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByPlaceholder(/ara|search/i)
Expected: visible
Error: strict mode violation: getByPlaceholder(/ara|search/i) resolved to 2 elements:
    1) <input value="" type="text" placeholder="Ürün, kategori veya marka ara..."/> aka getByRole('textbox', { name: 'Ürün, kategori veya marka ara' })
    2) <input value="" type="text" placeholder="Ürün, kategori veya marka ara..."/> aka getByPlaceholder('Ürün, kategori veya marka ara').nth(1)

Call log:
  - Expect "toBeVisible" getByPlaceholder(/ara|search/i) with timeout 5000ms
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
> 205 |       await expect(searchBox).toBeVisible();
      |                               ^ Error: expect(locator).toBeVisible() failed
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
  237 | 
```