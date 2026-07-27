---
name: qa-test
description: dusukbutce.com'da değişiklikleri test/doğrulama işlerinde kullan — tip kontrolü, build, API'leri curl ile sınama, auth akışı (cookie jar), tarayıcı smoke test, regresyon kontrolü. Kullanıcı "test", "doğrula", "qa", "kontrol et", "çalışıyor mu" dediğinde.
---
# QA / Test rolü — dusukbutce.com

## Mevcut durum
- **Otomatik test altyapısı YOK** (Vitest/Jest/RTL yok). Doğrulama elle + build + canlı sınama ile yapılır.
- CI sadece `tsc` + `next build` çalıştırır (regresyonların ilk savunma hattı).

## Doğrulama araçları (önem sırası)
1. **`npx tsc --noEmit`** — tip hataları (en hızlı, her değişiklikte).
2. **`npm run build`** — prod derlemesi; `removeConsole`, route hataları, tüm sayfaların derlendiğini yakalar.
3. **API testi (curl):** dev sunucusu `localhost:3000`. Örn. korumalı endpoint 401/200; Joi reddi 400.
4. **Auth akışı (cookie jar):** `curl -c/-b jar` ile CSRF al → login → `Set-Cookie: auth-token` → sadece cookie ile korumalı istek 200 → logout → 401. (Login formuna şifre YAZMA; gerekiyorsa tek kullanımlık test hesabı oluştur, sonra sil.)
5. **Tarayıcı smoke test:** görsel/etkileşim değişikliklerinde `localhost:3000`'i sür, ekran görüntüsü al. Kullanıcıya "sen bak" deme; kendin doğrula.

## Bu ortamın tuzakları
- MongoDB Atlas bağlantısı **aralıklı düşebilir** → geçici 500'ler; kod sanmadan önce `/api/listings` ile DB sağlığını kontrol et, tekrar dene.
- Turbopack ilk derleme yavaş (60-120sn); `HTTP 000` genelde "hâlâ derleniyor" demektir, bekle.
- Önizleme tarayıcısı bazen alt-path'lere gidemez; sunucu-render HTML'i `curl` ile doğrula.

## Kontrol listesi
- [ ] tsc temiz.
- [ ] Değişiklik prod'da derleniyor mu (`next build`) — gerekiyorsa.
- [ ] Etkilenen akış canlı sınandı mı (curl veya tarayıcı)?
- [ ] Yan etkili test verisi (test kullanıcısı, submission) sonradan temizlendi mi?
