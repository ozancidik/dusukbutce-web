# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin-panel.test.ts >> Admin Panel Testleri >> Admin Bildirimleri >> ✅ Bildirim merkezi
- Location: tests/admin-panel.test.ts:363:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[class*="notification-bell"]')

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
        - generic [ref=f1e10]:
          - textbox "Ürün, kategori veya marka ara..." [ref=f1e11]
          - generic [ref=f1e12]: 🔍
        - generic [ref=f1e13]:
          - button "Giriş Yap" [ref=f1e15] [cursor=pointer]
          - link [ref=f1e21] [cursor=pointer]:
            - /url: /sepet
            - button "Sepet" [ref=f1e22]
    - main [ref=f1e27]:
      - generic [ref=f1e29]:
        - generic [ref=f1e30]:
          - heading "2. El Ürününü" [level=2] [ref=f1e35]
          - link [ref=f1e38] [cursor=pointer]:
            - /url: /bize-sat
            - button "BİZE SAT" [ref=f1e39]
          - heading "Kategoriler" [level=3] [ref=f1e40]
          - generic [ref=f1e41]:
            - generic [ref=f1e42]:
              - link "💻 Dizüstü (Notebook)" [ref=f1e43] [cursor=pointer]:
                - /url: /bize-sat/notebook
                - generic [ref=f1e44]:
                  - generic [ref=f1e45]: 💻
                  - text: Dizüstü (Notebook)
              - link "🖥️ Masaüstü (Kasa)" [ref=f1e46] [cursor=pointer]:
                - /url: /bize-sat/masaustu
                - generic [ref=f1e47]:
                  - generic [ref=f1e48]: 🖥️
                  - text: Masaüstü (Kasa)
              - link "🖥️ Monitör" [ref=f1e49] [cursor=pointer]:
                - /url: /bize-sat/monitor
                - generic [ref=f1e50]:
                  - generic [ref=f1e51]: 🖥️
                  - text: Monitör
              - link [ref=f1e52] [cursor=pointer]:
                - /url: /bize-sat/ekran-karti
                - generic [ref=f1e53]:
                  - img "Ekran Kartı" [ref=f1e54]
                  - text: Ekran Kartı
              - link [ref=f1e55] [cursor=pointer]:
                - /url: /bize-sat/islemci
                - generic [ref=f1e56]:
                  - img "İşlemci" [ref=f1e57]
                  - text: İşlemci
              - link [ref=f1e58] [cursor=pointer]:
                - /url: /bize-sat/ram
                - generic [ref=f1e59]:
                  - img "RAM" [ref=f1e60]
                  - text: RAM
              - link [ref=f1e61] [cursor=pointer]:
                - /url: /bize-sat/ssd
                - generic [ref=f1e62]:
                  - img "SSD" [ref=f1e63]
                  - text: SSD
              - link [ref=f1e64] [cursor=pointer]:
                - /url: /bize-sat/sogutucu
                - generic [ref=f1e65]:
                  - img "Soğutucu" [ref=f1e66]
                  - text: Soğutucu
              - link [ref=f1e67] [cursor=pointer]:
                - /url: /bize-sat/kasa
                - generic [ref=f1e68]:
                  - img "Boş Kasa" [ref=f1e69]
                  - text: Boş Kasa
              - link "📄 Fotokopi Makinesi" [ref=f1e70] [cursor=pointer]:
                - /url: /bize-sat/fotokopi-makinesi
                - generic [ref=f1e71]:
                  - generic [ref=f1e72]: 📄
                  - text: Fotokopi Makinesi
              - link "🖨️ Yazıcı" [ref=f1e73] [cursor=pointer]:
                - /url: /bize-sat/yazici
                - generic [ref=f1e74]:
                  - generic [ref=f1e75]: 🖨️
                  - text: Yazıcı
            - generic [ref=f1e76]:
              - link "📱 Cep Telefonu" [ref=f1e77] [cursor=pointer]:
                - /url: /bize-sat/cep-telefonu
                - generic [ref=f1e78]:
                  - generic [ref=f1e79]: 📱
                  - text: Cep Telefonu
              - link [ref=f1e80] [cursor=pointer]:
                - /url: /bize-sat/playstation
                - generic [ref=f1e81]:
                  - img "PlayStation" [ref=f1e82]
                  - text: PlayStation
              - link [ref=f1e83] [cursor=pointer]:
                - /url: /bize-sat/gamepad
                - generic [ref=f1e84]:
                  - img "Gamepad" [ref=f1e85]
                  - text: Gamepad
              - link [ref=f1e86] [cursor=pointer]:
                - /url: /bize-sat/xbox
                - generic [ref=f1e87]:
                  - img "Xbox" [ref=f1e88]
                  - text: Xbox
              - link "⌨️ Klavye" [ref=f1e89] [cursor=pointer]:
                - /url: /bize-sat/klavye
                - generic [ref=f1e90]:
                  - generic [ref=f1e91]: ⌨️
                  - text: Klavye
              - link "🖱️ Mouse" [ref=f1e92] [cursor=pointer]:
                - /url: /bize-sat/mouse
                - generic [ref=f1e93]:
                  - generic [ref=f1e94]: 🖱️
                  - text: Mouse
              - link [ref=f1e95] [cursor=pointer]:
                - /url: /bize-sat/tablet
                - generic [ref=f1e96]:
                  - img "Tablet" [ref=f1e97]
                  - text: Tablet
              - link "🎧 Kulaklık" [ref=f1e98] [cursor=pointer]:
                - /url: /bize-sat/kulaklik
                - generic [ref=f1e99]:
                  - generic [ref=f1e100]: 🎧
                  - text: Kulaklık
              - link [ref=f1e101] [cursor=pointer]:
                - /url: /bize-sat/ses-sistemi
                - generic [ref=f1e102]:
                  - img "Ses Sistemi" [ref=f1e103]
                  - text: Ses Sistemi
              - link "🔍 Tarayıcı" [ref=f1e104] [cursor=pointer]:
                - /url: /bize-sat/tarayici
                - generic [ref=f1e105]:
                  - generic [ref=f1e106]: 🔍
                  - text: Tarayıcı
        - generic [ref=f1e108]:
          - link "Uzman Ekibimizden Destek Al 🚚 İstanbul içi aynı gün teslim alalım TEKNİK SERVİS Kategoriler 🖥️ PC Onarım 💻 Laptop Tamiri 🖥️ Monitör Tamiri 💾 Format Atma 🔧 Parça Montajı 📱 Telefon Onarım 📱 Tablet Tamiri ⚙️ PC Toplama 💿 Veri Kurtarma" [ref=f1e109] [cursor=pointer]:
            - /url: /teknik-servis
            - generic [ref=f1e110]:
              - generic [ref=f1e112]:
                - generic [ref=f1e113]: Uzman Ekibimizden Destek Al
                - generic [ref=f1e114]:
                  - generic [ref=f1e115]: 🚚
                  - text: İstanbul içi aynı gün teslim alalım
              - button "TEKNİK SERVİS" [ref=f1e119]
              - heading "Kategoriler" [level=3] [ref=f1e121]
              - generic [ref=f1e123]:
                - generic [ref=f1e124]:
                  - generic [ref=f1e125]: 🖥️
                  - text: PC Onarım
                - generic [ref=f1e126]:
                  - generic [ref=f1e127]: 💻
                  - text: Laptop Tamiri
                - generic [ref=f1e128]:
                  - generic [ref=f1e129]: 🖥️
                  - text: Monitör Tamiri
                - generic [ref=f1e130]:
                  - generic [ref=f1e131]: 💾
                  - text: Format Atma
                - generic [ref=f1e132]:
                  - generic [ref=f1e133]: 🔧
                  - text: Parça Montajı
                - generic [ref=f1e134]:
                  - generic [ref=f1e135]: 📱
                  - text: Telefon Onarım
                - generic [ref=f1e136]:
                  - generic [ref=f1e137]: 📱
                  - text: Tablet Tamiri
                - generic [ref=f1e138]:
                  - generic [ref=f1e139]: ⚙️
                  - text: PC Toplama
                - generic [ref=f1e140]:
                  - generic [ref=f1e141]: 💿
                  - text: Veri Kurtarma
          - generic [ref=f1e142]:
            - link [ref=f1e144] [cursor=pointer]:
              - /url: /satilik-ilanlar
              - button "SATILIK İLANLAR" [ref=f1e145]
            - generic [ref=f1e148]:
              - generic [ref=f1e149]: 📋
              - generic [ref=f1e150]: Henüz satılık ilan yok
              - generic [ref=f1e151]: Admin panelinden ilan eklendiğinde burada otomatik görünecek.
    - contentinfo [ref=f1e152]:
      - generic [ref=f1e154]:
        - generic [ref=f1e155]:
          - generic [ref=f1e156]: 🚚
          - heading "Güvenilir Gönderim" [level=3] [ref=f1e157]
          - paragraph [ref=f1e158]: Hızlı ve güvenli gönderim
        - generic [ref=f1e159]:
          - generic [ref=f1e160]: 😊 ⭐⭐⭐⭐⭐
          - heading "Müşteri Memnuniyeti" [level=3] [ref=f1e161]
          - paragraph [ref=f1e162]: Memnuniyetiniz önceliğimiz
        - generic [ref=f1e163]:
          - generic [ref=f1e164]: 💳🛡️
          - heading "Güvenli Ödeme" [level=3] [ref=f1e165]
          - paragraph [ref=f1e166]: "%100 güvenli ödeme altyapısı"
        - generic [ref=f1e167]:
          - generic [ref=f1e168]: ✅
          - heading "Kaliteli Markalar" [level=3] [ref=f1e169]
          - paragraph [ref=f1e170]: Sadece bilinen kaliteli markalar
      - generic [ref=f1e172]:
        - generic [ref=f1e173]:
          - heading "KURUMSAL" [level=4] [ref=f1e174]
          - generic [ref=f1e175]:
            - link "Hakkımızda" [ref=f1e176] [cursor=pointer]:
              - /url: /hakkimizda
            - link "Banka Hesaplarımız" [ref=f1e177] [cursor=pointer]:
              - /url: /banka-hesaplari
            - link "İletişim" [ref=f1e178] [cursor=pointer]:
              - /url: /iletisim
        - generic [ref=f1e179]:
          - heading "SİTE KULLANIMI" [level=4] [ref=f1e180]
          - generic [ref=f1e181]:
            - link "KVKK Bilgilendirme" [ref=f1e182] [cursor=pointer]:
              - /url: /gizlilik-politikasi
            - link "Satış Sözleşmesi" [ref=f1e183] [cursor=pointer]:
              - /url: /satis-sozlesmesi
            - link "Şartlar ve Koşullar" [ref=f1e184] [cursor=pointer]:
              - /url: /kullanim-sartlari
            - link "Sık Sorulan Sorular" [ref=f1e185] [cursor=pointer]:
              - /url: /sss
        - generic [ref=f1e186]:
          - heading "HESAP BİLGİLERİ" [level=4] [ref=f1e187]
          - generic [ref=f1e188]:
            - link "Hesabım" [ref=f1e189] [cursor=pointer]:
              - /url: /profile
            - link "Sipariş Takibi" [ref=f1e190] [cursor=pointer]:
              - /url: /siparisler
            - link "Karşılaştırma Listem" [ref=f1e191] [cursor=pointer]:
              - /url: /karsilastir
            - link "Favori Ürünlerim" [ref=f1e192] [cursor=pointer]:
              - /url: /favoriler
            - link "Tekliflerim" [ref=f1e193] [cursor=pointer]:
              - /url: /tekliflerim
        - generic [ref=f1e194]:
          - heading "MAĞAZA ADRESİMİZ" [level=4] [ref=f1e195]
          - generic [ref=f1e196]:
            - generic [ref=f1e197]: 📍
            - generic [ref=f1e198]:
              - generic [ref=f1e199]: Atakent Mah. Yasemin Sokağı No:4
              - generic [ref=f1e200]: 34760 Ümraniye/İstanbul
          - generic [ref=f1e201]:
            - link [ref=f1e202] [cursor=pointer]:
              - /url: https://www.facebook.com/dusukbutce/
              - img "Facebook" [ref=f1e203]
            - link [ref=f1e204] [cursor=pointer]:
              - /url: https://instagram.com
              - img "Instagram" [ref=f1e205]
            - link [ref=f1e206] [cursor=pointer]:
              - /url: https://youtube.com
              - img "YouTube" [ref=f1e207]
            - link [ref=f1e208] [cursor=pointer]:
              - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
      - generic [ref=f1e211]:
        - generic [ref=f1e212]:
          - generic [ref=f1e213]: DB
          - generic [ref=f1e214]: Düşük Bütçe
        - generic [ref=f1e215]: © 2026 Düşük Bütçe. Tüm hakları saklıdır.
    - link "WhatsApp Destek Hattı" [ref=f1e216] [cursor=pointer]:
      - /url: https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum.
  - button "Open Next.js Dev Tools" [ref=f1e225] [cursor=pointer]
  - alert [ref=f1e229]
```

# Test source

```ts
  271 |         await expect(dialog).toBeDefined();
  272 |       }
  273 |     });
  274 | 
  275 |     test('✅ Teklif iptal', async ({ page }) => {
  276 |       await page.goto(`${BASE_URL}/admin/offers`);
  277 | 
  278 |       const cancelBtn = page.getByRole('button', { name: /iptal|cancel/i }).first();
  279 |       if (cancelBtn) {
  280 |         await cancelBtn.click();
  281 | 
  282 |         // Onay dialog bekleniyor
  283 |         const confirmBtn = page.getByRole('button', { name: /confirm/i });
  284 |         await expect(confirmBtn).toBeDefined();
  285 |       }
  286 |     });
  287 |   });
  288 | 
  289 |   // ==================== RAPORLAR ====================
  290 |   test.describe('Raporlar', () => {
  291 | 
  292 |     test('✅ Günlük rapor', async ({ page }) => {
  293 |       // Önce admin login yap
  294 |       await loginAdminUser(page);
  295 | 
  296 |       await page.goto(`${BASE_URL}/admin/reports/daily`);
  297 | 
  298 |       // Rapor gösterilmesi bekleniyor
  299 |       const reportContent = page.locator('[class*="report"]');
  300 |       expect(await reportContent.count()).toBeGreaterThanOrEqual(0);
  301 |     });
  302 | 
  303 |     test('✅ Haftalık rapor', async ({ page }) => {
  304 |       await page.goto(`${BASE_URL}/admin/reports/weekly`);
  305 | 
  306 |       // Rapor gösterilmesi bekleniyor
  307 |       const reportContent = page.locator('[class*="report"]');
  308 |       expect(await reportContent.count()).toBeGreaterThanOrEqual(0);
  309 |     });
  310 | 
  311 |     test('✅ Aktivite logu', async ({ page }) => {
  312 |       await page.goto(`${BASE_URL}/admin/activity`);
  313 | 
  314 |       const activityLog = page.locator('[class*="log-entry"]');
  315 |       expect(await activityLog.count()).toBeGreaterThanOrEqual(0);
  316 |     });
  317 | 
  318 |     test('✅ Rapor dışa aktarma', async ({ page }) => {
  319 |       await page.goto(`${BASE_URL}/admin/reports`);
  320 | 
  321 |       const exportBtn = page.getByRole('button', { name: /dışa|export|download/i });
  322 |       if (exportBtn) {
  323 |         await exportBtn.click();
  324 | 
  325 |         // İndirme başlamalı veya dialog açılmalı
  326 |         const dialog = page.getByText(/export|download|format/i);
  327 |         // Yok olabilir veya görünebilir
  328 |       }
  329 |     });
  330 |   });
  331 | 
  332 |   // ==================== AYARLAR ====================
  333 |   test.describe('Admin Ayarları', () => {
  334 | 
  335 |     test('✅ Admin ayarları sayfası', async ({ page }) => {
  336 |       // Önce admin login yap
  337 |       await loginAdminUser(page);
  338 | 
  339 |       await page.goto(`${BASE_URL}/admin/settings`);
  340 | 
  341 |       const settings = page.locator('[class*="setting"]');
  342 |       expect(await settings.count()).toBeGreaterThanOrEqual(0);
  343 |     });
  344 | 
  345 |     test('✅ Email ayarları', async ({ page }) => {
  346 |       await page.goto(`${BASE_URL}/admin/settings/email`);
  347 | 
  348 |       const emailSettings = page.getByLabel(/email|mail/i);
  349 |       await expect(emailSettings).toBeDefined();
  350 |     });
  351 | 
  352 |     test('✅ Sistem ayarları', async ({ page }) => {
  353 |       await page.goto(`${BASE_URL}/admin/settings/system`);
  354 | 
  355 |       const systemSettings = page.getByLabel(/sistem|system/i);
  356 |       await expect(systemSettings).toBeDefined();
  357 |     });
  358 |   });
  359 | 
  360 |   // ==================== BİLDİRİMLER ====================
  361 |   test.describe('Admin Bildirimleri', () => {
  362 | 
  363 |     test('✅ Bildirim merkezi', async ({ page }) => {
  364 |       // Önce admin login yap
  365 |       await loginAdminUser(page);
  366 | 
  367 |       await page.goto(`${BASE_URL}/admin`);
  368 | 
  369 |       const notificationBell = page.locator('[class*="notification-bell"]');
  370 |       if (notificationBell) {
> 371 |         await notificationBell.click();
      |                                ^ Error: locator.click: Test timeout of 30000ms exceeded.
  372 | 
  373 |         // Bildirim listesi açılmalı
  374 |         const notificationList = page.getByText(/bildirim|notification/i);
  375 |         await expect(notificationList).toBeDefined();
  376 |       }
  377 |     });
  378 | 
  379 |     test('✅ Okunmamış bildirim badge', async ({ page }) => {
  380 |       await page.goto(`${BASE_URL}/admin`);
  381 | 
  382 |       const badge = page.locator('[class*="notification-badge"]');
  383 |       // Badge görünebilir veya görünmeyebilir
  384 |     });
  385 |   });
  386 | });
  387 | 
  388 | export {};
  389 | 
```