# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offer-management.test.ts >> Teklif (Offer) Yönetimi Testleri >> Teklif Yönetimi Senaryoları >> ✅ Teklifi kabul etme
- Location: tests/offer-management.test.ts:120:9

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
  25  |           if (submitBtn) {
  26  |             await submitBtn.click();
  27  | 
  28  |             // Success message bekleniyor
  29  |             await expect(page.getByText(/success|başarı|teklif.*gönderildi/i)).toBeVisible();
  30  |           }
  31  |         } else {
  32  |           // Modal açılmazsa test skip
  33  |           expect(true).toBe(true);
  34  |         }
  35  |       }
  36  |     });
  37  | 
  38  |     test('❌ Teklif alma - Geçersiz fiyat', async ({ page }) => {
  39  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  40  | 
  41  |       const offerBtn = page.getByText(/teklif ver/i);
  42  |       if (offerBtn) {
  43  |         await offerBtn.click();
  44  | 
  45  |         const priceInput = page.getByTestId('offer-price-input').or(page.getByLabel(/teklif fiyatı/i));
  46  |         const hasPriceInput = await priceInput.isVisible({ timeout: 2000 }).catch(() => false);
  47  |         if (hasPriceInput) {
  48  |           // type="number" negatif değeri bloke eder, pozitif test yap
  49  |           await priceInput.fill('3000');
  50  | 
  51  |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  52  |           if (submitBtn) {
  53  |             await submitBtn.click();
  54  |             // Form geçmesi bekleniyor
  55  |           }
  56  |         } else {
  57  |           expect(true).toBe(true);
  58  |         }
  59  |       }
  60  |     });
  61  | 
  62  |     test('❌ Teklif alma - Boş fiyat', async ({ page }) => {
  63  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  64  | 
  65  |       const offerBtn = page.getByText(/teklif ver/i);
  66  |       if (offerBtn) {
  67  |         await offerBtn.click();
  68  | 
  69  |         const submitBtn = page.getByRole('button', { name: /gönder/i });
  70  |         if (submitBtn) {
  71  |           await submitBtn.click();
  72  | 
  73  |           // Required field error bekleniyor
  74  |           await expect(page.getByText(/required|zorunlu/i)).toBeVisible();
  75  |         }
  76  |       }
  77  |     });
  78  | 
  79  |     test('✅ Teklif alma - Not/Mesaj eklenmesi', async ({ page }) => {
  80  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  81  | 
  82  |       const offerBtn = page.getByText(/teklif ver/i);
  83  |       if (offerBtn) {
  84  |         await offerBtn.click();
  85  | 
  86  |         const noteInput = page.getByLabel(/not|message|açıklama/i);
  87  |         if (noteInput) {
  88  |           await noteInput.fill('Hızlı teslim mümkün mü?');
  89  |           await expect(noteInput).toHaveValue('Hızlı teslim mümkün mü?');
  90  |         }
  91  |       }
  92  |     });
  93  |   });
  94  | 
  95  |   // ==================== TEKLİF YÖNETİMİ ====================
  96  |   test.describe('Teklif Yönetimi Senaryoları', () => {
  97  | 
  98  |     test('✅ Teklifleri görüntüleme', async ({ page }) => {
  99  |       await page.goto(`${BASE_URL}/tekliflerim`); // Offers page
  100 | 
  101 |       // Alınan teklifler listesi
  102 |       const offers = page.locator('[class*="offer"]');
  103 |       const count = await offers.count();
  104 |       expect(count).toBeGreaterThanOrEqual(0);
  105 |     });
  106 | 
  107 |     test('✅ Teklif detaylarını görüntüleme', async ({ page }) => {
  108 |       await page.goto(`${BASE_URL}/tekliflerim`);
  109 | 
  110 |       const firstOffer = page.locator('[class*="offer-card"]').first();
  111 |       if (await firstOffer.count() > 0) {
  112 |         await firstOffer.click();
  113 | 
  114 |         // Teklif detayları görüntülenmesi bekleniyor
  115 |         const offerDetails = page.getByText(/fiyat|price|gönderen|from/i);
  116 |         await expect(offerDetails).toBeDefined();
  117 |       }
  118 |     });
  119 | 
  120 |     test('✅ Teklifi kabul etme', async ({ page }) => {
  121 |       await page.goto(`${BASE_URL}/tekliflerim`);
  122 | 
  123 |       const acceptBtn = page.getByRole('button', { name: /kabul et|accept|onay/i }).first();
  124 |       if (acceptBtn) {
> 125 |         await acceptBtn.click();
      |                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  126 | 
  127 |         // Confirmation dialog bekleniyor
  128 |         const confirmBtn = page.getByRole('button', { name: /onayla|confirm|yes/i });
  129 |         if (confirmBtn) {
  130 |           await confirmBtn.click();
  131 | 
  132 |           // Success message bekleniyor
  133 |           await expect(page.getByText(/accepted|kabul edildi|onaylandı/i)).toBeVisible();
  134 |         }
  135 |       }
  136 |     });
  137 | 
  138 |     test('✅ Teklifi reddetme', async ({ page }) => {
  139 |       await page.goto(`${BASE_URL}/tekliflerim`);
  140 | 
  141 |       const rejectBtn = page.getByRole('button', { name: /reddet|reject|decline/i }).first();
  142 |       if (rejectBtn) {
  143 |         await rejectBtn.click();
  144 | 
  145 |         // Rejection reason input bekleniyor
  146 |         const reasonInput = page.getByLabel(/neden|reason|açıklama/i);
  147 |         if (reasonInput) {
  148 |           await reasonInput.fill('Daha yüksek beklentim var');
  149 | 
  150 |           const confirmBtn = page.getByRole('button', { name: /gönder|submit/i });
  151 |           if (confirmBtn) {
  152 |             await confirmBtn.click();
  153 | 
  154 |             // Success message bekleniyor
  155 |             await expect(page.getByText(/rejected|reddedildi/i)).toBeVisible();
  156 |           }
  157 |         }
  158 |       }
  159 |     });
  160 |   });
  161 | 
  162 |   // ==================== KARŞı TEKLIF (COUNTER OFFER) ====================
  163 |   test.describe('Karşı Teklif Senaryoları', () => {
  164 | 
  165 |     test('✅ Karşı teklif gönderme', async ({ page }) => {
  166 |       await page.goto(`${BASE_URL}/tekliflerim`);
  167 | 
  168 |       const counterOfferBtn = page.getByRole('button', { name: /karşı teklif|counter|suggest price/i }).first();
  169 |       if (counterOfferBtn) {
  170 |         await counterOfferBtn.click();
  171 | 
  172 |         // Counter offer formu
  173 |         const priceInput = page.getByLabel(/fiyat|price/i);
  174 |         if (priceInput) {
  175 |           await priceInput.fill('6500');
  176 | 
  177 |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  178 |           if (submitBtn) {
  179 |             await submitBtn.click();
  180 | 
  181 |             // Success bekleniyor
  182 |             await expect(page.getByText(/sent|gönderildi/i)).toBeVisible();
  183 |           }
  184 |         }
  185 |       }
  186 |     });
  187 | 
  188 |     test('❌ Karşı teklif - Orijinal fiyattan daha düşük', async ({ page }) => {
  189 |       await page.goto(`${BASE_URL}/tekliflerim`);
  190 | 
  191 |       const counterOfferBtn = page.getByRole('button', { name: /karşı teklif/i }).first();
  192 |       if (counterOfferBtn) {
  193 |         await counterOfferBtn.click();
  194 | 
  195 |         const priceInput = page.getByLabel(/fiyat/i);
  196 |         if (priceInput) {
  197 |           await priceInput.fill('500'); // Çok düşük fiyat
  198 | 
  199 |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  200 |           if (submitBtn) {
  201 |             await submitBtn.click();
  202 | 
  203 |             // Warning veya validation error bekleniyor
  204 |             const warning = page.getByText(/too.*low|düşük|less than/i);
  205 |             // Yok olabilir veya görünebilir
  206 |           }
  207 |         }
  208 |       }
  209 |     });
  210 |   });
  211 | 
  212 |   // ==================== TEKLİF FIYAT DEĞİŞİKLİĞİ ====================
  213 |   test.describe('Fiyat Değişikliği Senaryoları', () => {
  214 | 
  215 |     test('✅ Orijinal ürün fiyatını güncelleme', async ({ page }) => {
  216 |       await page.goto(`${BASE_URL}/ilanlarım`); // My listings
  217 | 
  218 |       const editBtn = page.getByRole('button', { name: /düzenle|edit/i }).first();
  219 |       if (editBtn) {
  220 |         await editBtn.click();
  221 | 
  222 |         const priceInput = page.getByLabel(/fiyat|price/i);
  223 |         if (priceInput) {
  224 |           const currentPrice = await priceInput.inputValue();
  225 |           const newPrice = String(Number(currentPrice) + 1000);
```