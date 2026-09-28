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

## Doğrulama
- `tsc` kaynak kodda 0 hata (`.next/types` altındaki iCloud " 3.ts" kopyaları hariç; izlenmiyor).
- `vitest`: 79/79. Yeni `lib/handleProductSubmission.integration.test.ts` (bellekte MongoDB, `@/lib/email` mock'lu — `.env.local` gerçek SMTP içerdiği için) 18 test: Faz A eşlemeleri, atılan alanların kaydedilmemesi, Faz B'nin 13 kategorisi.
- Tarayıcıda (izole dev sunucusu, ölü `MONGODB_URI`): 14 sayfa 200, etiketler render oluyor, `cep-telefonu` ve `gaming-direksiyon` görsel kontrol edildi. Form gönderimi tarayıcıdan denenmedi (giriş gerekiyor); kayıt yolu entegrasyon testiyle doğrulandı.

## Yapılmayanlar / riskler
- **Yeni alanlar zorunlu değil.** Özellikle `accountLock` (kilitli cihaz satın alınamaz) zorunlu yapılabilir; ayrı karar.
- **Eski kayıtlar** bu alanlara sahip değil; admin modalı boş alanları gizliyor, sorun yok.
- Bölüm 3'ün düşük öncelikli kalemleri yapılmadı: klavye eksik tuş, kulaklık tipi/mikrofon/ped, kasa cam/fan, tarayıcı ADF, RAM kit bilgisi, notebook adaptör/arıza notu, ekran kartı bellek tipi, kasa PSU dışı, ses sistemi tipi select'i, mouse/monitör select dönüşümleri, form içi etiket/placeholder hataları (notebook çift "Marka", klavye "Switch Tipi" placeholder, yazıcı "Laser/Lazer" çift seçenek, tarayıcı İngilizce seçenekler vb.).
- Bölüm 4-5 (kozmetik varsayılan "Mükemmel", doğrulama, 51 ölü admin alanı, kategori adı tutarsızlığı) kapsam dışıydı.
- Mobile (`dusukbutce-mobile`, `fix/mobile-web-api-senkron`) aynı alan anahtarlarına hizalandı; **web prod'a çıkmadan mobile yayınlanırsa yeni alanlar sunucuda sessizce atılır.**
