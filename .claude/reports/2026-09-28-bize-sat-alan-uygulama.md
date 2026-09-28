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

## Doğrulama
- `tsc` kaynak kodda 0 hata (`.next/types` altındaki iCloud " 3.ts" kopyaları hariç; izlenmiyor).
- `vitest`: 95/95 (Faz C sonrası). Yeni `lib/handleProductSubmission.integration.test.ts` (bellekte MongoDB, `@/lib/email` mock'lu — `.env.local` gerçek SMTP içerdiği için) 34 test: Faz A eşlemeleri, atılan alanların kaydedilmemesi, Faz B'nin 13 kategorisi.
- Tarayıcıda (izole dev sunucusu, ölü `MONGODB_URI`): 14 sayfa 200, etiketler render oluyor, `cep-telefonu` ve `gaming-direksiyon` görsel kontrol edildi. Form gönderimi tarayıcıdan denenmedi (giriş gerekiyor); kayıt yolu entegrasyon testiyle doğrulandı.

## Yapılmayanlar / riskler
- **Yeni alanlar zorunlu değil.** Özellikle `accountLock` (kilitli cihaz satın alınamaz) zorunlu yapılabilir; ayrı karar.
- **Eski kayıtlar** bu alanlara sahip değil; admin modalı boş alanları gizliyor, sorun yok.
- **Yapılmayanlar:** yazıcı `Tip` listesinin teknoloji/boyut/kullanım biçimi olarak ayrıştırılması, ekran kartı bellek tipi, Xbox görsellerinin base64 gönderilmesi, klavye/kulaklık dışındaki bazı serbest metin alanlarının seçiciye çevrilmesi (ekran boyutu vb.).
- Bölüm 4-5 (kozmetik varsayılan "Mükemmel", doğrulama, 51 ölü admin alanı, kategori adı tutarsızlığı) kapsam dışıydı.
- Mobile (`dusukbutce-mobile`, `fix/mobile-web-api-senkron`) aynı alan anahtarlarına hizalandı; **web prod'a çıkmadan mobile yayınlanırsa yeni alanlar sunucuda sessizce atılır.**
