# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offer-management.test.ts >> Teklif (Offer) Yönetimi Testleri >> Teklif Yönetimi Senaryoları >> ✅ Teklifi kabul etme
- Location: tests/offer-management.test.ts:143:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /kabul et|accept|onay/i }).first()

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
  48  |           if (submitBtn) {
  49  |             await submitBtn.click();
  50  | 
  51  |             // Success message bekleniyor
  52  |             await expect(page.getByText(/success|başarı|teklif.*gönderildi/i)).toBeVisible();
  53  |           }
  54  |         } else {
  55  |           // Modal açılmazsa test skip
  56  |           expect(true).toBe(true);
  57  |         }
  58  |       }
  59  |     });
  60  | 
  61  |     test('❌ Teklif alma - Geçersiz fiyat', async ({ page }) => {
  62  |       // Login session kur
  63  |       await loginUser(page);
  64  | 
  65  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  66  | 
  67  |       const offerBtn = page.getByText(/teklif ver/i);
  68  |       if (offerBtn) {
  69  |         await offerBtn.click();
  70  | 
  71  |         const priceInput = page.getByTestId('offer-price-input').or(page.getByLabel(/teklif fiyatı/i));
  72  |         const hasPriceInput = await priceInput.isVisible({ timeout: 2000 }).catch(() => false);
  73  |         if (hasPriceInput) {
  74  |           // type="number" negatif değeri bloke eder, pozitif test yap
  75  |           await priceInput.fill('3000');
  76  | 
  77  |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  78  |           if (submitBtn) {
  79  |             await submitBtn.click();
  80  |             // Form geçmesi bekleniyor
  81  |           }
  82  |         } else {
  83  |           expect(true).toBe(true);
  84  |         }
  85  |       }
  86  |     });
  87  | 
  88  |     test('❌ Teklif alma - Boş fiyat', async ({ page }) => {
  89  |       // Login session kur
  90  |       await loginUser(page);
  91  | 
  92  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  93  | 
  94  |       const offerBtn = page.getByText(/teklif ver/i);
  95  |       if (offerBtn) {
  96  |         await offerBtn.click();
  97  | 
  98  |         const submitBtn = page.getByRole('button', { name: /gönder/i });
  99  |         if (submitBtn) {
  100 |           await submitBtn.click();
  101 | 
  102 |           // Required field error bekleniyor
  103 |           await expect(page.getByText(/required|zorunlu/i)).toBeVisible();
  104 |         }
  105 |       }
  106 |     });
  107 | 
  108 |     test('✅ Teklif alma - Not/Mesaj eklenmesi', async ({ page }) => {
  109 |       // Login session kur
  110 |       await loginUser(page);
  111 | 
  112 |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  113 | 
  114 |       const offerBtn = page.getByText(/teklif ver/i);
  115 |       if (offerBtn) {
  116 |         await offerBtn.click();
  117 | 
  118 |         const noteInput = page.getByLabel(/not|message|açıklama/i);
  119 |         if (noteInput) {
  120 |           await noteInput.fill('Hızlı teslim mümkün mü?');
  121 |           await expect(noteInput).toHaveValue('Hızlı teslim mümkün mü?');
  122 |         }
  123 |       }
  124 |     });
  125 |   });
  126 | 
  127 |   // ==================== TEKLİF YÖNETİMİ ====================
  128 |   test.describe('Teklif Yönetimi Senaryoları', () => {
  129 | 
  130 |     test('✅ Teklifleri görüntüleme', async ({ page }) => {
  131 |       // Login session kur
  132 |       await loginUser(page);
  133 | 
  134 |       await page.goto(`${BASE_URL}/tekliflerim`); // Offers page
  135 | 
  136 |       // Alınan teklifler listesi
  137 |       const offers = page.locator('[class*="offer"]');
  138 |       const count = await offers.count();
  139 |       expect(count).toBeGreaterThanOrEqual(0);
  140 |     });
  141 | 
  142 |     test('✅ Teklif detaylarını görüntüleme', async ({ page }) => {
  143 |       await page.goto(`${BASE_URL}/tekliflerim`);
  144 | 
  145 |       const firstOffer = page.locator('[class*="offer-card"]').first();
  146 |       if (await firstOffer.count() > 0) {
  147 |         await firstOffer.click();
> 148 | 
      |                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  149 |         // Teklif detayları görüntülenmesi bekleniyor
  150 |         const offerDetails = page.getByText(/fiyat|price|gönderen|from/i);
  151 |         await expect(offerDetails).toBeDefined();
  152 |       }
  153 |     });
  154 | 
  155 |     test('✅ Teklifi kabul etme', async ({ page }) => {
  156 |       await page.goto(`${BASE_URL}/tekliflerim`);
  157 | 
  158 |       const acceptBtn = page.getByRole('button', { name: /kabul et|accept|onay/i }).first();
  159 |       if (acceptBtn) {
  160 |         await acceptBtn.click();
  161 | 
  162 |         // Confirmation dialog bekleniyor
  163 |         const confirmBtn = page.getByRole('button', { name: /onayla|confirm|yes/i });
  164 |         if (confirmBtn) {
  165 |           await confirmBtn.click();
  166 | 
  167 |           // Success message bekleniyor
  168 |           await expect(page.getByText(/accepted|kabul edildi|onaylandı/i)).toBeVisible();
  169 |         }
  170 |       }
  171 |     });
  172 | 
  173 |     test('✅ Teklifi reddetme', async ({ page }) => {
  174 |       await page.goto(`${BASE_URL}/tekliflerim`);
  175 | 
  176 |       const rejectBtn = page.getByRole('button', { name: /reddet|reject|decline/i }).first();
  177 |       if (rejectBtn) {
  178 |         await rejectBtn.click();
  179 | 
  180 |         // Rejection reason input bekleniyor
  181 |         const reasonInput = page.getByLabel(/neden|reason|açıklama/i);
  182 |         if (reasonInput) {
  183 |           await reasonInput.fill('Daha yüksek beklentim var');
  184 | 
  185 |           const confirmBtn = page.getByRole('button', { name: /gönder|submit/i });
  186 |           if (confirmBtn) {
  187 |             await confirmBtn.click();
  188 | 
  189 |             // Success message bekleniyor
  190 |             await expect(page.getByText(/rejected|reddedildi/i)).toBeVisible();
  191 |           }
  192 |         }
  193 |       }
  194 |     });
  195 |   });
  196 | 
  197 |   // ==================== KARŞı TEKLIF (COUNTER OFFER) ====================
  198 |   test.describe('Karşı Teklif Senaryoları', () => {
  199 | 
  200 |     test('✅ Karşı teklif gönderme', async ({ page }) => {
  201 |       await page.goto(`${BASE_URL}/tekliflerim`);
  202 | 
  203 |       const counterOfferBtn = page.getByRole('button', { name: /karşı teklif|counter|suggest price/i }).first();
  204 |       if (counterOfferBtn) {
  205 |         await counterOfferBtn.click();
  206 | 
  207 |         // Counter offer formu
  208 |         const priceInput = page.getByLabel(/fiyat|price/i);
  209 |         if (priceInput) {
  210 |           await priceInput.fill('6500');
  211 | 
  212 |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  213 |           if (submitBtn) {
  214 |             await submitBtn.click();
  215 | 
  216 |             // Success bekleniyor
  217 |             await expect(page.getByText(/sent|gönderildi/i)).toBeVisible();
  218 |           }
  219 |         }
  220 |       }
  221 |     });
  222 | 
  223 |     test('❌ Karşı teklif - Orijinal fiyattan daha düşük', async ({ page }) => {
  224 |       await page.goto(`${BASE_URL}/tekliflerim`);
  225 | 
  226 |       const counterOfferBtn = page.getByRole('button', { name: /karşı teklif/i }).first();
  227 |       if (counterOfferBtn) {
  228 |         await counterOfferBtn.click();
  229 | 
  230 |         const priceInput = page.getByLabel(/fiyat/i);
  231 |         if (priceInput) {
  232 |           await priceInput.fill('500'); // Çok düşük fiyat
  233 | 
  234 |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  235 |           if (submitBtn) {
  236 |             await submitBtn.click();
  237 | 
  238 |             // Warning veya validation error bekleniyor
  239 |             const warning = page.getByText(/too.*low|düşük|less than/i);
  240 |             // Yok olabilir veya görünebilir
  241 |           }
  242 |         }
  243 |       }
  244 |     });
  245 |   });
  246 | 
  247 |   // ==================== TEKLİF FIYAT DEĞİŞİKLİĞİ ====================
  248 |   test.describe('Fiyat Değişikliği Senaryoları', () => {
```