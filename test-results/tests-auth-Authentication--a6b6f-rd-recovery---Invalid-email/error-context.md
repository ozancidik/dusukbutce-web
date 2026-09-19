# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/auth.test.ts >> Authentication & Authorization Tests >> Password Recovery Scenarios >> ❌ Password recovery - Invalid email
- Location: tests/auth.test.ts:240:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByText(/forgot.*password/i)

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
  145 |     test('✅ Logout - Başarılı çıkış', async ({ page }) => {
  146 |       await page.goto(`${BASE_URL}`);
  147 | 
  148 |       // Önce login yap
  149 |       const loginBtn = page.getByText(/giriş|login/i);
  150 |       if (loginBtn) {
  151 |         await loginBtn.click();
  152 |         const emailInput = page.getByLabel(/email/i);
  153 |         const passwordInput = page.getByLabel(/password/i);
  154 | 
  155 |         if (emailInput && passwordInput) {
  156 |           await emailInput.fill('test@example.com');
  157 |           await passwordInput.fill('password123');
  158 |           await page.getByRole('button', { name: /login/i }).click();
  159 | 
  160 |           // Logout butonunu bul ve tıkla
  161 |           const logoutBtn = page.getByText(/çıkış|logout/i);
  162 |           if (logoutBtn) {
  163 |             await logoutBtn.click();
  164 | 
  165 |             // Login sayfasına dönülmesi bekleniyor
  166 |             await expect(page).toHaveURL(/.*login|signin/i);
  167 |           }
  168 |         }
  169 |       }
  170 |     });
  171 | 
  172 |     test('✅ Logout - Session cleared', async ({ page }) => {
  173 |       // Logout sonrası authenticated endpoints'e erişim engellenmeli
  174 |       await page.goto(`${BASE_URL}/account`);
  175 | 
  176 |       // Login sayfasına yönlendirilmesi bekleniyor
  177 |       await expect(page).toHaveURL(/.*login|signin/i);
  178 |     });
  179 |   });
  180 | 
  181 |   // ==================== SESSION TESTS ====================
  182 |   test.describe('Session Scenarios', () => {
  183 | 
  184 |     test('✅ Session persistence - Sayfa yenilemesinde session korunması', async ({ page }) => {
  185 |       await page.goto(`${BASE_URL}`);
  186 | 
  187 |       // Login yap
  188 |       const loginBtn = page.getByText(/giriş|login/i);
  189 |       if (loginBtn) {
  190 |         await loginBtn.click();
  191 |         const emailInput = page.getByLabel(/email/i);
  192 |         const passwordInput = page.getByLabel(/password/i);
  193 | 
  194 |         if (emailInput && passwordInput) {
  195 |           await emailInput.fill('test@example.com');
  196 |           await passwordInput.fill('password123');
  197 |           await page.getByRole('button', { name: /login/i }).click();
  198 | 
  199 |           // Sayfayı yenile
  200 |           await page.reload();
  201 | 
  202 |           // Session devam etmeli - logout butonu görünür olmalı
  203 |           const logoutBtn = page.getByText(/çıkış|logout/i);
  204 |           if (logoutBtn) {
  205 |             await expect(logoutBtn).toBeVisible();
  206 |           }
  207 |         }
  208 |       }
  209 |     });
  210 | 
  211 |     test('✅ Session timeout - Uzun inaktivite sonrası logout', async ({ page }) => {
  212 |       // Bu test gerçek environment'te çalışması için timeout ayarı gerekir
  213 |       // Placeholder test
  214 |       await page.goto(`${BASE_URL}`);
  215 |       await expect(page).toHaveURL(/.*localhost/i);
  216 |     });
  217 |   });
  218 | 
  219 |   // ==================== PASSWORD RECOVERY TESTS ====================
  220 |   test.describe('Password Recovery Scenarios', () => {
  221 | 
  222 |     test('✅ Password recovery - Email gönderimi', async ({ page }) => {
  223 |       await page.goto(`${BASE_URL}`);
  224 | 
  225 |       const forgotPasswordLink = page.getByText(/forgot.*password|şifremi unuttum/i);
  226 |       if (forgotPasswordLink) {
  227 |         await forgotPasswordLink.click();
  228 | 
  229 |         const emailInput = page.getByLabel(/email/i);
  230 |         if (emailInput) {
  231 |           await emailInput.fill('test@example.com');
  232 |           await page.getByRole('button', { name: /reset|gönder/i }).click();
  233 | 
  234 |           // Success message bekleniyor
  235 |           await expect(page.getByText(/check.*email|link.*sent|sent.*you/i)).toBeVisible();
  236 |         }
  237 |       }
  238 |     });
  239 | 
  240 |     test('❌ Password recovery - Invalid email', async ({ page }) => {
  241 |       await page.goto(`${BASE_URL}`);
  242 | 
  243 |       const forgotPasswordLink = page.getByText(/forgot.*password/i);
  244 |       if (forgotPasswordLink) {
> 245 |         await forgotPasswordLink.click();
      |                                  ^ Error: locator.click: Test timeout of 30000ms exceeded.
  246 | 
  247 |         const emailInput = page.getByLabel(/email/i);
  248 |         if (emailInput) {
  249 |           await emailInput.fill('invalid@example.com');
  250 |           await page.getByRole('button', { name: /reset|gönder/i }).click();
  251 | 
  252 |           // Error message bekleniyor
  253 |           await expect(page.getByText(/not.*found|doesn't.*exist/i)).toBeVisible();
  254 |         }
  255 |       }
  256 |     });
  257 |   });
  258 | });
  259 | 
  260 | export {};
  261 | 
```