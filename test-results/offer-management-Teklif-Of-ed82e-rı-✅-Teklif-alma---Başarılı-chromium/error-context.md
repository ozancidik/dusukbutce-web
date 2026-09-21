# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offer-management.test.ts >> Teklif (Offer) Yönetimi Testleri >> Teklif Alma Senaryoları >> ✅ Teklif alma - Başarılı
- Location: tests/offer-management.test.ts:10:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText(/teklif ver|make offer|fiyat teklif/i)

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
> 16  |         await offerBtn.click();
      |                        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  17  | 
  18  |         // Teklif formu
  19  |         const priceInput = page.getByLabel(/teklif fiyatı|offer price/i);
  20  |         if (priceInput) {
  21  |           await priceInput.fill('5000');
  22  | 
  23  |           const submitBtn = page.getByRole('button', { name: /gönder|submit|make offer/i });
  24  |           if (submitBtn) {
  25  |             await submitBtn.click();
  26  | 
  27  |             // Success message bekleniyor
  28  |             await expect(page.getByText(/success|başarı|teklif.*gönderildi/i)).toBeVisible();
  29  |           }
  30  |         }
  31  |       }
  32  |     });
  33  | 
  34  |     test('❌ Teklif alma - Geçersiz fiyat', async ({ page }) => {
  35  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  36  | 
  37  |       const offerBtn = page.getByText(/teklif ver/i);
  38  |       if (offerBtn) {
  39  |         await offerBtn.click();
  40  | 
  41  |         const priceInput = page.getByLabel(/teklif fiyatı/i);
  42  |         if (priceInput) {
  43  |           await priceInput.fill('-100'); // Negatif fiyat
  44  | 
  45  |           const submitBtn = page.getByRole('button', { name: /gönder/i });
  46  |           if (submitBtn) {
  47  |             await submitBtn.click();
  48  | 
  49  |             // Error bekleniyor
  50  |             await expect(page.getByText(/valid.*price|fiyat.*geçersiz/i)).toBeVisible();
  51  |           }
  52  |         }
  53  |       }
  54  |     });
  55  | 
  56  |     test('❌ Teklif alma - Boş fiyat', async ({ page }) => {
  57  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  58  | 
  59  |       const offerBtn = page.getByText(/teklif ver/i);
  60  |       if (offerBtn) {
  61  |         await offerBtn.click();
  62  | 
  63  |         const submitBtn = page.getByRole('button', { name: /gönder/i });
  64  |         if (submitBtn) {
  65  |           await submitBtn.click();
  66  | 
  67  |           // Required field error bekleniyor
  68  |           await expect(page.getByText(/required|zorunlu/i)).toBeVisible();
  69  |         }
  70  |       }
  71  |     });
  72  | 
  73  |     test('✅ Teklif alma - Not/Mesaj eklenmesi', async ({ page }) => {
  74  |       await page.goto(`${BASE_URL}/bize-sat/ram`);
  75  | 
  76  |       const offerBtn = page.getByText(/teklif ver/i);
  77  |       if (offerBtn) {
  78  |         await offerBtn.click();
  79  | 
  80  |         const noteInput = page.getByLabel(/not|message|açıklama/i);
  81  |         if (noteInput) {
  82  |           await noteInput.fill('Hızlı teslim mümkün mü?');
  83  |           await expect(noteInput).toHaveValue('Hızlı teslim mümkün mü?');
  84  |         }
  85  |       }
  86  |     });
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
```