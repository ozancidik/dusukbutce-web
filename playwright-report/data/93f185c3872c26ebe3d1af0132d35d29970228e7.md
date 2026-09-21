# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offer-management.test.ts >> Teklif (Offer) Yönetimi Testleri >> Karşı Teklif Senaryoları >> ❌ Karşı teklif - Orijinal fiyattan daha düşük
- Location: tests/offer-management.test.ts:182:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /karşı teklif/i }).first()

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
        - generic [ref=e31]: Tekliflerim
    - main [ref=e32]:
      - generic [ref=e33]:
        - generic [ref=e35]:
          - heading "Tekliflerim" [level=1] [ref=e36]
          - paragraph [ref=e37]: Satış talepleriniz ve tekliflerinizi yönetin
          - generic [ref=e38]:
            - generic [ref=e39]:
              - generic [ref=e40]: "0"
              - generic [ref=e41]: Toplam Talep
            - generic [ref=e42]:
              - generic [ref=e43]: "0"
              - generic [ref=e44]: Teklif Bekleyen
            - generic [ref=e45]:
              - generic [ref=e46]: "0"
              - generic [ref=e47]: Kabul Edilen
        - generic [ref=e48]:
          - generic [ref=e49]: 📝
          - heading "Henüz talebiniz yok" [level=3] [ref=e50]
          - paragraph [ref=e51]: Satış talebi oluşturmak için aşağıdaki butona tıklayın
          - button "Satış Talebi Oluştur" [ref=e52] [cursor=pointer]
    - contentinfo [ref=e53]:
      - generic [ref=e55]:
        - generic [ref=e56]:
          - generic [ref=e57]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e58]
          - paragraph [ref=e59]: Hızlı ve güvenli gönderim
        - generic [ref=e60]:
          - generic [ref=e61]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e62]
          - paragraph [ref=e63]: Memnuniyetiniz önceliğimiz
        - generic [ref=e64]:
          - generic [ref=e65]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e66]
          - paragraph [ref=e67]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e68]:
          - generic [ref=e69]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e70]
          - paragraph [ref=e71]: Sadece bilinen kaliteli markalar
      - generic [ref=e73]:
        - generic [ref=e74]:
          - heading "KURUMSAL" [level=4] [ref=e75]
          - generic [ref=e76]:
            - link "Hakkımızda" [ref=e77] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e78] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e79] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e80]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e81]
          - generic [ref=e82]:
            - link "KVKK Bilgilendirme" [ref=e83] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e84] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e85] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e86] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e87]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e88]
          - generic [ref=e89]:
            - link "Hesabım" [ref=e90] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e91] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e92] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e93] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e94] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e95]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e96]
          - generic [ref=e97]:
            - generic [ref=e98]: 📍
            - generic [ref=e99]:
              - generic [ref=e100]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e101]: 34760 Ümraniye/İstanbul
          - generic [ref=e102]:
            - link [ref=e103] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e104]
            - link [ref=e105] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e106]
            - link [ref=e107] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e108]
            - link [ref=e109] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e112]:
        - generic [ref=e113]:
          - generic [ref=e114]: DB
          - generic [ref=e115]: Düşük Bütçe
        - generic [ref=e116]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e117] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - generic [ref=e125] [cursor=pointer]:
    - button "Open Next.js Dev Tools" [ref=e126]
    - generic [ref=e130]:
      - button "Open issues overlay" [ref=e131]:
        - generic [ref=e132]:
          - generic [aria-hidden] [ref=e133]: "0"
          - generic [ref=e134]: "1"
        - generic [ref=e135]: Issue
      - button "Collapse issues badge" [ref=e136]
  - alert [ref=e139]
```

# Test source

```ts
  87  |   });
  88  | 
  89  |   // ==================== TEKLİF YÖNETİMİ ====================
  90  |   test.describe('Teklif Yönetimi Senaryoları', () => {
  91  | 
  92  |     test('✅ Teklifleri görüntüleme', async ({ page }) => {
  93  |       await page.goto(`${BASE_URL}/tekliflerim`); // Offers page
  94  | 
  95  |       // Alınan teklifler listesi
  96  |       const offers = page.locator('[class*="offer"]');
  97  |       const count = await offers.count();
  98  |       expect(count).toBeGreaterThanOrEqual(0);
  99  |     });
  100 | 
  101 |     test('✅ Teklif detaylarını görüntüleme', async ({ page }) => {
  102 |       await page.goto(`${BASE_URL}/tekliflerim`);
  103 | 
  104 |       const firstOffer = page.locator('[class*="offer-card"]').first();
  105 |       if (await firstOffer.count() > 0) {
  106 |         await firstOffer.click();
  107 | 
  108 |         // Teklif detayları görüntülenmesi bekleniyor
  109 |         const offerDetails = page.getByText(/fiyat|price|gönderen|from/i);
  110 |         await expect(offerDetails).toBeDefined();
  111 |       }
  112 |     });
  113 | 
  114 |     test('✅ Teklifi kabul etme', async ({ page }) => {
  115 |       await page.goto(`${BASE_URL}/tekliflerim`);
  116 | 
  117 |       const acceptBtn = page.getByRole('button', { name: /kabul et|accept|onay/i }).first();
  118 |       if (acceptBtn) {
  119 |         await acceptBtn.click();
  120 | 
  121 |         // Confirmation dialog bekleniyor
  122 |         const confirmBtn = page.getByRole('button', { name: /onayla|confirm|yes/i });
  123 |         if (confirmBtn) {
  124 |           await confirmBtn.click();
  125 | 
  126 |           // Success message bekleniyor
  127 |           await expect(page.getByText(/accepted|kabul edildi|onaylandı/i)).toBeVisible();
  128 |         }
  129 |       }
  130 |     });
  131 | 
  132 |     test('✅ Teklifi reddetme', async ({ page }) => {
  133 |       await page.goto(`${BASE_URL}/tekliflerim`);
  134 | 
  135 |       const rejectBtn = page.getByRole('button', { name: /reddet|reject|decline/i }).first();
  136 |       if (rejectBtn) {
  137 |         await rejectBtn.click();
  138 | 
  139 |         // Rejection reason input bekleniyor
  140 |         const reasonInput = page.getByLabel(/neden|reason|açıklama/i);
  141 |         if (reasonInput) {
  142 |           await reasonInput.fill('Daha yüksek beklentim var');
  143 | 
  144 |           const confirmBtn = page.getByRole('button', { name: /gönder|submit/i });
  145 |           if (confirmBtn) {
  146 |             await confirmBtn.click();
  147 | 
  148 |             // Success message bekleniyor
  149 |             await expect(page.getByText(/rejected|reddedildi/i)).toBeVisible();
  150 |           }
  151 |         }
  152 |       }
  153 |     });
  154 |   });
  155 | 
  156 |   // ==================== KARŞı TEKLIF (COUNTER OFFER) ====================
  157 |   test.describe('Karşı Teklif Senaryoları', () => {
  158 | 
  159 |     test('✅ Karşı teklif gönderme', async ({ page }) => {
  160 |       await page.goto(`${BASE_URL}/tekliflerim`);
  161 | 
  162 |       const counterOfferBtn = page.getByRole('button', { name: /karşı teklif|counter|suggest price/i }).first();
  163 |       if (counterOfferBtn) {
  164 |         await counterOfferBtn.click();
  165 | 
  166 |         // Counter offer formu
  167 |         const priceInput = page.getByLabel(/fiyat|price/i);
  168 |         if (priceInput) {
  169 |           await priceInput.fill('6500');
  170 | 
  171 |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  172 |           if (submitBtn) {
  173 |             await submitBtn.click();
  174 | 
  175 |             // Success bekleniyor
  176 |             await expect(page.getByText(/sent|gönderildi/i)).toBeVisible();
  177 |           }
  178 |         }
  179 |       }
  180 |     });
  181 | 
  182 |     test('❌ Karşı teklif - Orijinal fiyattan daha düşük', async ({ page }) => {
  183 |       await page.goto(`${BASE_URL}/tekliflerim`);
  184 | 
  185 |       const counterOfferBtn = page.getByRole('button', { name: /karşı teklif/i }).first();
  186 |       if (counterOfferBtn) {
> 187 |         await counterOfferBtn.click();
      |                               ^ Error: locator.click: Test timeout of 30000ms exceeded.
  188 | 
  189 |         const priceInput = page.getByLabel(/fiyat/i);
  190 |         if (priceInput) {
  191 |           await priceInput.fill('500'); // Çok düşük fiyat
  192 | 
  193 |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  194 |           if (submitBtn) {
  195 |             await submitBtn.click();
  196 | 
  197 |             // Warning veya validation error bekleniyor
  198 |             const warning = page.getByText(/too.*low|düşük|less than/i);
  199 |             // Yok olabilir veya görünebilir
  200 |           }
  201 |         }
  202 |       }
  203 |     });
  204 |   });
  205 | 
  206 |   // ==================== TEKLİF FIYAT DEĞİŞİKLİĞİ ====================
  207 |   test.describe('Fiyat Değişikliği Senaryoları', () => {
  208 | 
  209 |     test('✅ Orijinal ürün fiyatını güncelleme', async ({ page }) => {
  210 |       await page.goto(`${BASE_URL}/ilanlarım`); // My listings
  211 | 
  212 |       const editBtn = page.getByRole('button', { name: /düzenle|edit/i }).first();
  213 |       if (editBtn) {
  214 |         await editBtn.click();
  215 | 
  216 |         const priceInput = page.getByLabel(/fiyat|price/i);
  217 |         if (priceInput) {
  218 |           const currentPrice = await priceInput.inputValue();
  219 |           const newPrice = String(Number(currentPrice) + 1000);
  220 | 
  221 |           await priceInput.fill(newPrice);
  222 | 
  223 |           const saveBtn = page.getByRole('button', { name: /kaydet|save/i });
  224 |           if (saveBtn) {
  225 |             await saveBtn.click();
  226 | 
  227 |             // Success bekleniyor
  228 |             await expect(page.getByText(/saved|güncellendi/i)).toBeVisible();
  229 |           }
  230 |         }
  231 |       }
  232 |     });
  233 | 
  234 |     test('✅ Fiyat düşürme - İlanı hızlandırma', async ({ page }) => {
  235 |       await page.goto(`${BASE_URL}/ilanlarım`);
  236 | 
  237 |       const editBtn = page.getByRole('button', { name: /düzenle/i }).first();
  238 |       if (editBtn) {
  239 |         await editBtn.click();
  240 | 
  241 |         const priceInput = page.getByLabel(/fiyat/i);
  242 |         if (priceInput) {
  243 |           const currentPrice = await priceInput.inputValue();
  244 |           const lowerPrice = String(Math.floor(Number(currentPrice) * 0.85)); // %15 düşür
  245 | 
  246 |           await priceInput.fill(lowerPrice);
  247 | 
  248 |           const saveBtn = page.getByRole('button', { name: /kaydet/i });
  249 |           if (saveBtn) {
  250 |             await saveBtn.click();
  251 | 
  252 |             // Success bekleniyor
  253 |             await expect(page.getByText(/saved|price reduced/i)).toBeVisible();
  254 |           }
  255 |         }
  256 |       }
  257 |     });
  258 |   });
  259 | 
  260 |   // ==================== TEKLİF ZAMAN AŞIMI ====================
  261 |   test.describe('Teklif Zaman Aşımı Senaryoları', () => {
  262 | 
  263 |     test('✅ Teklif süresi gösterimi', async ({ page }) => {
  264 |       await page.goto(`${BASE_URL}/tekliflerim`);
  265 | 
  266 |       const offerCard = page.locator('[class*="offer-card"]').first();
  267 |       if (await offerCard.count() > 0) {
  268 |         const expireText = offerCard.getByText(/expires|süresi|ends|bitiş/i);
  269 |         // Süresi gösteriliyor olmalı
  270 |       }
  271 |     });
  272 | 
  273 |     test('✅ Süresi dolmuş teklif görüntülenmesi', async ({ page }) => {
  274 |       await page.goto(`${BASE_URL}/tekliflerim`);
  275 | 
  276 |       const expiredOffers = page.getByText(/expired|süresi.*dolmuş|ended/i);
  277 |       // Varsa görüntülenmeli
  278 |     });
  279 |   });
  280 | 
  281 |   // ==================== TEKLİF BİLDİRİMLERİ ====================
  282 |   test.describe('Bildirim Senaryoları', () => {
  283 | 
  284 |     test('✅ Yeni teklif bildirimi', async ({ page }) => {
  285 |       // Bu test real-time event gerektiriyor
  286 |       await page.goto(`${BASE_URL}`);
  287 | 
```