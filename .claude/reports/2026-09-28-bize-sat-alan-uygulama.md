# Bize-sat rapor bölüm 2-3 uygulaması (2026-09-28)

Dal: `feat/bize-sat-alan-temizligi` (main `ba0885d` üzerine 3 commit). Kaynak: `2026-09-26-bize-sat-form-analizi.md`.

## Faz A — bölüm 2 (sessizce atılan alanlar) — `05e0be3`
Denetim: 22 sayfada 12 kalem `ALLOWED_FIELDS` dışında olduğu için atılıyordu (`gaming-direksiyon` uyumluluk ve telefon `registrationType` P0'da düzeltilmişti).

- **Mevcut alana eşlendi (kaydediliyor):** `connectionType`→`connectivity` (yazıcı, fotokopi, tarayıcı); `copySpeed`→`speed`; kasa `material`→`powerSupply` (Var/Yok), `powerSupplyWatt`→`wattValue`; soğutucu `fanSize`→`size` (etiket "Fan / Radyatör Boyutu").
- **Yeni alan:** `printColor` (yazıcı baskı rengi) — ALLOWED_FIELDS + şema + admin tip + admin modal.
- **Formdan çıkarıldı:** renk (mouse, gamepad, tablet, kulaklık, xbox, telefon, klavye, fotokopi), klavye RGB, SSD okuma/yazma hızı, yazıcı baskı hızı, tarayıcı tarama hızı.
- Admin: `size` etiketi "Klavye Boyutu" → "Boyut" (soğutucu/kasa da kullanıyor).
- `526f4ad`: gaming-direksiyon uyumluluğa `Xbox`, `Bilgisayar+Xbox` eklendi.

## Faz B — bölüm 3 (eksik kritik alanlar) — `369d3ab`
Rapor kısmen eskiydi: RAM `ramFormFactor`, klavye `layout`, mouse `dpi`, telefon `batteryHealth` zaten formda soruluyordu.

Eklenen (hepsi opsiyonel, `select`/`text`, mevcut inline stil): telefon `accountLock`/`partReplaced`/`biometricWorking`; tablet `accountLock`/`batteryHealth`; işlemci `pinDamage`/`socket`; SSD `driveHealth`; mouse `clickIssue`; PS/Xbox `controllers`/`stickDrift`; gamepad `stickDrift`; direksiyon `pedal`/`shifterIncluded`/`forceFeedback`; yazıcı/fotokopi `pageCount`; soğutucu `mountingKit`; monitör/notebook `screenStatus`/`deadPixelCount`.
Yeni şema alanları (13): pinDamage, driveHealth, clickIssue, controllers, stickDrift, pedal, shifterIncluded, forceFeedback, accountLock, partReplaced, biometricWorking, pageCount, mountingKit.
İşlemci sayfasında taslak (localStorage) geri yükleme kodu anahtar anahtar kuruluyordu; yeni anahtarlar eklendi.

## Faz C — bölüm 3 kalan alanlar ve form hataları — `70f03c6`
- **Yeni opsiyonel alanlar (16 şema alanı):** chargerIncluded, knownIssues, overclocked, moduleKit, missingKeys, micWorking, earPadCondition, chargingCase, pumpIssue, sidePanelCondition, includedFans, jailbreak, firmware, tonerStatus, adfIncluded, usageLevel. Mevcut alanlar yeniden kullanıldı: layout, case, accessories, power, connectivity, type, screenStatus, deadPixelCount, batteryHealth.
- **Düzeltmeler:** notebook/masaüstü ikinci "Marka" → "İşlemci Markası"; masaüstü disk `SSD(PCIe NVMe)` → `SSD(NVMe)` + RAM'e DDR3; RAM `type` → `ramType` (notebook/mobile ile aynı) ve seçici; SSD `type` seçici (form faktörü); mouse `Bağlantı Tipi` seçici + mükerrer `Arabirim` kaldırıldı; monitör yenileme/çözünürlük/panel ve tablet depolama seçici; soğutucu/ses sistemi `Tip` seçici; PlayStation çift `1TB`; PS/Xbox/gamepad `Durum` → `Kullanım Durumu`; Xbox marka `Microsoft`; gamepad markası modelden türetiliyor + "Diğer" için model adı kutusu; telefon RAM opsiyonel, ekran boyutu kaldırıldı, kozmetik skala 4 kademe (web ile aynı); yazıcı çift `Laser/Lazer`; tarayıcı Türkçe tip değerleri + `USB (sürüm bilinmiyor)`; klavye switch placeholder.
- Ölçüt dışı bırakılan: "Bit Değeri" etiketi (kodda artık yok), `Diğer` seçilebilen alanlarda ayrıntı kaybı riski (monitör/tablet ekran boyutu bilerek serbest metin bırakıldı).
- İlk denemede SSD'ye eklediğim `driveFormFactor` mevcut "Tip" alanıyla mükerrer çıktı; geri alındı, mevcut alan seçiciye çevrildi.
- PS/Xbox/gamepad sayfaları kendi (2px kenarlıklı, `isMobile`'a duyarlı) stilini kullanıyor; o sayfalara eklenen alanlar buna uyarlandı (hesaplanan stil birebir doğrulandı).

## Faz D — bölüm 3-5'in "bilerek yapılmayanları"
- **Kozmetik durum varsayılanı boş + zorunlu** (`1bb81a3`): 27 dosyada başlangıç/reset `''`, gönderimdeki `|| 'Mükemmel'` fallback'i kalktı, seçicilere boş "Seçin" + `required`. Tarayıcıda doğrulandı (değer boş, required, seçenekler Seçin/Mükemmel/İyi/Orta/Kötü). Backend Joi zaten boş değeri reddediyor.
- **Garanti/fatura artığı**: `pickSubmissionFields` ortak yardımcısı (handler, `/api/submissions`, notebook route — üç kopya döngü birleşti); işaret kapalıysa süre/tarih atılıyor.
- **Testlerin kapsamı düzeltildi**: telefon/yazıcı/PlayStation/Xbox/gamepad/tarayıcı/fotokopi/masaüstü `/api/submissions` route'una gidiyor; önceki testler bu yolu kapsamıyordu. Test artık her kategoriyi sayfasının gerçek route'undan geçiriyor.
- **Ölü kod silindi** (`5883274`): bize-sat `configs/*` (17), `ProductSubmissionForm.tsx`, `types/index.ts`, `utils/testAPIs.ts`; admin `types/Submission.ts`, `utils/{constants,formatDate,helpers,submissionHelpers}.ts`, `hooks/{useAdminAuth,useSubmissions}.ts`. Yöntem: import grafiği (relative + `@/`), giriş noktaları Next özel dosyaları; dinamik import yok, tsc ve vitest temiz. `page.tsx.backup-*` dosyaları zaten yoktu.
- **Admin'de şemada olmayan 47 alan silindi** (`2a7b1a4`): şema strict ve git geçmişinde bu alanlar hiç şemada olmadı; modalda hep boştu.
- **Kategori tek kaynağı** (`lib/categories.ts`): admin filtresinde `cep-telefonu`, `yazici`, `tarayici`, `fotokopi-makinesi` **yoktu** (telefon/yazıcı/tarayıcı/fotokopi teklifleri filtrelenemiyor, etiketi ham id görünüyordu); aynı liste 5 dosyada kopyaydı ("Fare"/"Mouse" tutarsızlığı dahil). Eski mobil id'leri (`phone`, `printer`, `scanner`, `photocopier`) ve kaldırılan `sound-system` alias ile tanınıyor; filtre alias'ı eşliyor. **DB taşınmadı.**
- **Yazıcı tip listesi ayrıştırıldı** (`1e3fd28`): `type` yalnızca teknoloji; yeni `multifunction`, `paperSize`, `usageType`. Fotokopide `type` renk moduydu → `printColor`.
- **Xbox base64 maddesi geçersiz:** 23 sayfanın 23'ü `uploadImage` (URL) kullanıyor. `formHelpers.ts`'teki hiç import edilmeyen base64 `handleImageUpload`/`removeImage`/`validateForm` silindi.
- **Yapılmadı (bilinçli):** stok/urunler admin sayfalarındaki ürün kataloğu kategori listeleri (ayrı alan), site geneli ölü kod adayları (aşağıda), mevcut DB kayıtlarının kategori/kozmetik taşınması.

### Silinmeyen ölü kod adayları (75 dosya, import grafiğine göre; onay bekliyor)
`app/admin` (17: fiyat/gorsel/kategori components), `app/components` (10: header/*), `app/favoriler` (7), `app/iletisim` (5), `app/karsilastir` (7), `app/satin-al` (7), `app/sifre-sifirla` (5), `app/tekliflerim` (7), `app/teknik-servis` (5), `app/login.tsx`, `app/products.tsx`, `app/register.tsx`, `app/register/components`, `models/NotebookSubmission.ts`. Analizin yanlış pozitifi olabilir; silmeden önce `next build` ve elle bakış gerekir.

## Doğrulama
- `tsc` kaynak kodda 0 hata (`.next/types` altındaki iCloud " 3.ts" kopyaları hariç; izlenmiyor).
- `vitest`: 106/106 (Faz D sonrası). Yeni `lib/handleProductSubmission.integration.test.ts` (bellekte MongoDB, `@/lib/email` mock'lu — `.env.local` gerçek SMTP içerdiği için) 34 test: Faz A eşlemeleri, atılan alanların kaydedilmemesi, Faz B'nin 13 kategorisi.
- Tarayıcıda (izole dev sunucusu, ölü `MONGODB_URI`): 14 sayfa 200, etiketler render oluyor, `cep-telefonu` ve `gaming-direksiyon` görsel kontrol edildi. Form gönderimi tarayıcıdan denenmedi (giriş gerekiyor); kayıt yolu entegrasyon testiyle doğrulandı.

## Yapılmayanlar / riskler
- **Yeni alanlar zorunlu değil.** Özellikle `accountLock` (kilitli cihaz satın alınamaz) zorunlu yapılabilir; ayrı karar.
- **Eski kayıtlar** bu alanlara sahip değil; admin modalı boş alanları gizliyor, sorun yok.
- **Yapılmayanlar:** yazıcı `Tip` listesinin teknoloji/boyut/kullanım biçimi olarak ayrıştırılması, ekran kartı bellek tipi, Xbox görsellerinin base64 gönderilmesi, klavye/kulaklık dışındaki bazı serbest metin alanlarının seçiciye çevrilmesi (ekran boyutu vb.).
- Bölüm 4-5 (kozmetik varsayılan "Mükemmel", doğrulama, 51 ölü admin alanı, kategori adı tutarsızlığı) kapsam dışıydı.
- Mobile (`dusukbutce-mobile`, `fix/mobile-web-api-senkron`) aynı alan anahtarlarına hizalandı; **web prod'a çıkmadan mobile yayınlanırsa yeni alanlar sunucuda sessizce atılır.**
