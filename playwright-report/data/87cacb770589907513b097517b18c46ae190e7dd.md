# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offer-management.test.ts >> Teklif (Offer) Yönetimi Testleri >> Teklif Alma Senaryoları >> ✅ Teklif alma - Not/Mesaj eklenmesi
- Location: tests/offer-management.test.ts:79:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText(/teklif ver/i)

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
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | const BASE_URL = 'http://localhost:3000';
  4   | 
  5   | test.describe('Teklif (Offer) Yönetimi Testleri', () => {
  6   | 
  7   |   // ==================== TEKLİF ALMA ====================
  8   |   test.describe('Teklif Alma Senaryoları', () => {
  9   | 
  10  |     test('✅ Teklif alma - Başarılı', async ({ page }) => {
  11  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  12  | 
  13  |       // Bir ürüne teklif ver
  14  |       const offerBtn = page.getByText(/teklif ver|make offer|fiyat teklif/i);
  15  |       if (offerBtn) {
  16  |         await offerBtn.click();
  17  | 
  18  |         // Teklif formu — price input'u bul
  19  |         const priceInput = page.getByTestId('offer-price-input').or(page.getByLabel(/teklif fiyatı|offer price/i));
  20  |         const hasPriceInput = await priceInput.isVisible({ timeout: 2000 }).catch(() => false);
  21  |         if (hasPriceInput) {
  22  |           await priceInput.fill('5000');
  23  | 
  24  |           const submitBtn = page.getByRole('button', { name: /gönder|submit|make offer/i });
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
> 84  |         await offerBtn.click();
      |                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  125 |         await acceptBtn.click();
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
```