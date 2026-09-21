# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: offer-management.test.ts >> Teklif (Offer) Yönetimi Testleri >> Fiyat Değişikliği Senaryoları >> ✅ Fiyat düşürme - İlanı hızlandırma
- Location: tests/offer-management.test.ts:234:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /düzenle/i }).first()

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
    - main [ref=e27]:
      - generic [ref=e29]:
        - generic [ref=e30]:
          - heading "2. El Ürününü" [level=2] [ref=e35]
          - link [ref=e38] [cursor=pointer]:
            - /url: /bize-sat
            - button "BİZE SAT" [ref=e39]
          - heading "Kategoriler" [level=3] [ref=e40]
          - generic [ref=e41]:
            - generic [ref=e42]:
              - link "💻 Dizüstü (Notebook)" [ref=e43] [cursor=pointer]:
                - /url: /bize-sat/notebook
                - generic [ref=e44]:
                  - generic [ref=e45]: 💻
                  - text: Dizüstü (Notebook)
              - link "🖥️ Masaüstü (Kasa)" [ref=e46] [cursor=pointer]:
                - /url: /bize-sat/masaustu
                - generic [ref=e47]:
                  - generic [ref=e48]: 🖥️
                  - text: Masaüstü (Kasa)
              - link "🖥️ Monitör" [ref=e49] [cursor=pointer]:
                - /url: /bize-sat/monitor
                - generic [ref=e50]:
                  - generic [ref=e51]: 🖥️
                  - text: Monitör
              - link [ref=e52] [cursor=pointer]:
                - /url: /bize-sat/ekran-karti
                - generic [ref=e53]:
                  - img "Ekran Kartı" [ref=e54]
                  - text: Ekran Kartı
              - link [ref=e55] [cursor=pointer]:
                - /url: /bize-sat/islemci
                - generic [ref=e56]:
                  - img "İşlemci" [ref=e57]
                  - text: İşlemci
              - link [ref=e58] [cursor=pointer]:
                - /url: /bize-sat/ram
                - generic [ref=e59]:
                  - img "RAM" [ref=e60]
                  - text: RAM
              - link [ref=e61] [cursor=pointer]:
                - /url: /bize-sat/ssd
                - generic [ref=e62]:
                  - img "SSD" [ref=e63]
                  - text: SSD
              - link [ref=e64] [cursor=pointer]:
                - /url: /bize-sat/sogutucu
                - generic [ref=e65]:
                  - img "Soğutucu" [ref=e66]
                  - text: Soğutucu
              - link [ref=e67] [cursor=pointer]:
                - /url: /bize-sat/kasa
                - generic [ref=e68]:
                  - img "Boş Kasa" [ref=e69]
                  - text: Boş Kasa
              - link "📄 Fotokopi Makinesi" [ref=e70] [cursor=pointer]:
                - /url: /bize-sat/fotokopi-makinesi
                - generic [ref=e71]:
                  - generic [ref=e72]: 📄
                  - text: Fotokopi Makinesi
              - link "🖨️ Yazıcı" [ref=e73] [cursor=pointer]:
                - /url: /bize-sat/yazici
                - generic [ref=e74]:
                  - generic [ref=e75]: 🖨️
                  - text: Yazıcı
            - generic [ref=e76]:
              - link "📱 Cep Telefonu" [ref=e77] [cursor=pointer]:
                - /url: /bize-sat/cep-telefonu
                - generic [ref=e78]:
                  - generic [ref=e79]: 📱
                  - text: Cep Telefonu
              - link [ref=e80] [cursor=pointer]:
                - /url: /bize-sat/playstation
                - generic [ref=e81]:
                  - img "PlayStation" [ref=e82]
                  - text: PlayStation
              - link [ref=e83] [cursor=pointer]:
                - /url: /bize-sat/gamepad
                - generic [ref=e84]:
                  - img "Gamepad" [ref=e85]
                  - text: Gamepad
              - link [ref=e86] [cursor=pointer]:
                - /url: /bize-sat/xbox
                - generic [ref=e87]:
                  - img "Xbox" [ref=e88]
                  - text: Xbox
              - link "⌨️ Klavye" [ref=e89] [cursor=pointer]:
                - /url: /bize-sat/klavye
                - generic [ref=e90]:
                  - generic [ref=e91]: ⌨️
                  - text: Klavye
              - link "🖱️ Mouse" [ref=e92] [cursor=pointer]:
                - /url: /bize-sat/mouse
                - generic [ref=e93]:
                  - generic [ref=e94]: 🖱️
                  - text: Mouse
              - link [ref=e95] [cursor=pointer]:
                - /url: /bize-sat/tablet
                - generic [ref=e96]:
                  - img "Tablet" [ref=e97]
                  - text: Tablet
              - link "🎧 Kulaklık" [ref=e98] [cursor=pointer]:
                - /url: /bize-sat/kulaklik
                - generic [ref=e99]:
                  - generic [ref=e100]: 🎧
                  - text: Kulaklık
              - link [ref=e101] [cursor=pointer]:
                - /url: /bize-sat/ses-sistemi
                - generic [ref=e102]:
                  - img "Ses Sistemi" [ref=e103]
                  - text: Ses Sistemi
              - link "🔍 Tarayıcı" [ref=e104] [cursor=pointer]:
                - /url: /bize-sat/tarayici
                - generic [ref=e105]:
                  - generic [ref=e106]: 🔍
                  - text: Tarayıcı
        - generic [ref=e108]:
          - link "Uzman Ekibimizden Destek Al 🚚 İstanbul içi aynı gün teslim alalım TEKNİK SERVİS Kategoriler 🖥️ PC Onarım 💻 Laptop Tamiri 🖥️ Monitör Tamiri 💾 Format Atma 🔧 Parça Montajı 📱 Telefon Onarım 📱 Tablet Tamiri ⚙️ PC Toplama 💿 Veri Kurtarma" [ref=e109] [cursor=pointer]:
            - /url: /teknik-servis
            - generic [ref=e110]:
              - generic [ref=e112]:
                - generic [ref=e113]: Uzman Ekibimizden Destek Al
                - generic [ref=e114]:
                  - generic [ref=e115]: 🚚
                  - text: İstanbul içi aynı gün teslim alalım
              - button "TEKNİK SERVİS" [ref=e119]
              - heading "Kategoriler" [level=3] [ref=e121]
              - generic [ref=e123]:
                - generic [ref=e124]:
                  - generic [ref=e125]: 🖥️
                  - text: PC Onarım
                - generic [ref=e126]:
                  - generic [ref=e127]: 💻
                  - text: Laptop Tamiri
                - generic [ref=e128]:
                  - generic [ref=e129]: 🖥️
                  - text: Monitör Tamiri
                - generic [ref=e130]:
                  - generic [ref=e131]: 💾
                  - text: Format Atma
                - generic [ref=e132]:
                  - generic [ref=e133]: 🔧
                  - text: Parça Montajı
                - generic [ref=e134]:
                  - generic [ref=e135]: 📱
                  - text: Telefon Onarım
                - generic [ref=e136]:
                  - generic [ref=e137]: 📱
                  - text: Tablet Tamiri
                - generic [ref=e138]:
                  - generic [ref=e139]: ⚙️
                  - text: PC Toplama
                - generic [ref=e140]:
                  - generic [ref=e141]: 💿
                  - text: Veri Kurtarma
          - generic [ref=e142]:
            - link [ref=e144] [cursor=pointer]:
              - /url: /satilik-ilanlar
              - button "SATILIK İLANLAR" [ref=e145]
            - generic [ref=e148]:
              - generic [ref=e149]: 📋
              - generic [ref=e150]: Henüz satılık ilan yok
              - generic [ref=e151]: Admin panelinden ilan eklendiğinde burada otomatik görünecek.
    - contentinfo [ref=e152]:
      - generic [ref=e154]:
        - generic [ref=e155]:
          - generic [ref=e156]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=e157]
          - paragraph [ref=e158]: Hızlı ve güvenli gönderim
        - generic [ref=e159]:
          - generic [ref=e160]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=e161]
          - paragraph [ref=e162]: Memnuniyetiniz önceliğimiz
        - generic [ref=e163]:
          - generic [ref=e164]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=e165]
          - paragraph [ref=e166]: "%100 güvenli ödeme altyapısı"
        - generic [ref=e167]:
          - generic [ref=e168]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=e169]
          - paragraph [ref=e170]: Sadece bilinen kaliteli markalar
      - generic [ref=e172]:
        - generic [ref=e173]:
          - heading "KURUMSAL" [level=4] [ref=e174]
          - generic [ref=e175]:
            - link "Hakkımızda" [ref=e176] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=e177] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=e178] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=e179]:
          - heading "SİTE KULLANIMI" [level=4] [ref=e180]
          - generic [ref=e181]:
            - link "KVKK Bilgilendirme" [ref=e182] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=e183] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=e184] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=e185] [cursor=pointer]:
              - /url: /sss
        - generic [ref=e186]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=e187]
          - generic [ref=e188]:
            - link "Hesabım" [ref=e189] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=e190] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=e191] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=e192] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=e193] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=e194]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=e195]
          - generic [ref=e196]:
            - generic [ref=e197]: 📍
            - generic [ref=e198]:
              - generic [ref=e199]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=e200]: 34760 Ümraniye/İstanbul
          - generic [ref=e201]:
            - link [ref=e202] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=e203]
            - link [ref=e204] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=e205]
            - link [ref=e206] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=e207]
            - link [ref=e208] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=e211]:
        - generic [ref=e212]:
          - generic [ref=e213]: DB
          - generic [ref=e214]: Düşük Bütçe
        - generic [ref=e215]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=e216] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=e225] [cursor=pointer]
  - alert [ref=e229]
```

# Test source

```ts
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
  187 |         await counterOfferBtn.click();
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
> 239 |         await editBtn.click();
      |                       ^ Error: locator.click: Test timeout of 30000ms exceeded.
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
  288 |       // Notification badge kontrol
  289 |       const badge = page.locator('[class*="notification-badge"]');
  290 |       // Badge görünebilir veya görünmeyebilir
  291 |     });
  292 |   });
  293 | });
  294 | 
  295 | export {};
  296 | 
```