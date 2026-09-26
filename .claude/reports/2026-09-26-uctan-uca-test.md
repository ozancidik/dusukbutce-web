# Uçtan uca test raporu — 2026-09-26

## Özet

"Tamam" demek için henüz erken. Test edilen kod sağlıklı: 52/52 E2E, 51/51 vitest, build ve tip temiz, yük altında hata yok. Ama prod'da açık iki risk var:

1. **Kritik:** Prod DB'de büyük olasılıkla herkesin bildiği bir admin hesabı duruyor: `admin@example.com / admin123` (şifre seed script'inde).
2. **Yüksek:** `/api/users/[id]` PII açığı düzeltildi ama merge edilmedi. Prod hâlâ açık.

## Test ortamı

Local dev prod MongoDB'yi paylaştığı için bütün dinamik testler **izole bir Docker Mongo'ya** (`localhost:27099`) karşı koşuldu. İzolasyonun gerçekten sağlandığı üç şekilde doğrulandı:
- seed verisi Docker'a yazıldı,
- uygulama üzerinden kaydedilen marker kullanıcı Docker'da çıktı,
- production build'in `/api/listings` yanıtı boş Docker DB ile tutarlıydı.

Prod verisine hiç dokunulmadı. Test bitince konteyner silindi. Test edilen kod: `main` + `fix/users-id-auth`.

## Sonuçlar

| Katman | Sonuç |
|---|---|
| E2E (Playwright, 52 test) | 52 geçti / 0 başarısız / 0 flaky, 110.8 sn |
| Vitest (51 test) | 51 geçti (23 entegrasyon testi dahil) |
| Typecheck (tsc) | Temiz |
| Production build | Başarılı |
| Lint | Çalışmıyor, ESLint yapılandırılmamış |
| Yetkilendirme / IDOR (canlı, 7 kontrol) | 7/7 beklenen sonuç |
| Yük (prod build) | GET / 1370 req/s p99 28 ms · /api/listings 737 req/s · auth'lu /api/submissions 513 req/s · 100 bağlantıda 872 req/s p99 161 ms · hepsinde 0 hata |
| Lighthouse (önceki ölçüm) | Desktop 88 → 98 (logo düzeltmesiyle), mobil ~50 (CLS 0.8–1.2) |

E2E notu: bazı testler, buton görünmediğinde `expect(true).toBe(true)` ile geçiyor. Bu yüzden 52/52 sonucu fonksiyonel kapsamı olduğundan geniş gösteriyor.

Yük notu: ölçüm tek bir yerel süreçte, sıfır ağ gecikmeli yerel Mongo ve boş ilan koleksiyonuyla yapıldı. Vercel serverless ve Atlas üzerinde DB'ye giden uçlar daha yavaş olacaktır.

## Güvenlik bulguları

| # | Bulgu | Seviye | Durum |
|---|---|---|---|
| 1 | Prod DB'de `admin@example.com / admin123` admin hesabı. Önceki prod E2E koşusu seed ile oluşturdu; şifre repodaki seed script'inde yazıyor | Kritik | Silinmesi bekliyor. Kullanıcı kararı gerekiyor, prod verisi |
| 2 | `/api/users/[id]` GET kimlik doğrulaması istemiyor. Herhangi bir id ile e-posta, telefon, doğum tarihi ve isAdmin okunabiliyor (KVKK) | Yüksek | Düzeltildi, `fix/users-id-auth` push edildi. **Henüz merge ve deploy edilmedi** |
| 3 | Rate limiter IP'yi istemcinin gönderdiği `x-forwarded-for` başlığından alıyor. Yerelde sahte başlıkla limit atlatıldı (20/20 istek geçti). Sayaç süreç belleğinde tutulduğu için Vercel'de instance başına ayrı çalışıyor | Orta | Açık. Prod'da istismar edilebilirliği doğrulanmadı |
| 4 | `offers/[id]/accept` ve `reject` sahte uçlar: sahiplik kontrolü ve DB yazımı yok | Düşük | Silindi, `chore/remove-dead-offer-routes`, push edilmedi |

Sağlam bulunan alanlar:
- login: CSRF, rate limit, bcrypt, httpOnly cookie
- upload: magic-byte kontrolü, SVG engeli, boyut sınırı
- admin action: yetki kontrolü ve audit log
- submissions: GET'te ve response PUT'ta sahiplik kontrolü var

## Diğer bulgular

- `npm test` her zaman exit 1 dönüyor. Sebep: `vitest.config.mts` dosyasında `tests/**` exclude edilmemiş, bu yüzden Playwright dosyaları da toplanıyor. Çözüm tek satır.
- Makinedeki `~/.cache/mongodb-binaries/mongod-arm64-darwin-8.2.6` dosyası yarım çıkarılmıştı (378 KB). Sağlam arşivden yeniden çıkarıldı. Bozuk kopya `.broken` uzantısıyla yana alındı.

## Branch'ler

| Branch | İçerik | Durum |
|---|---|---|
| `fix/users-id-auth` | #2 düzeltmesi | Push edildi |
| `perf/logo-optimization` | Logo 1.5 MB → 73 KB | Push edildi |
| `chore/remove-dead-offer-routes` | #4 | Yerelde |
| `chore/pin-ruflo` | Ruflo sürüm sabitleme | Yerelde |

## Önerilen sıra

1. Prod'daki test hesaplarını ve TEST-* kayıtlarını sil, en başta admin hesabını (#1).
2. `fix/users-id-auth` branch'ini merge et (#2).
3. Rate limiter'da güvenilir IP başlığına (`cf-connecting-ip` veya Vercel `x-real-ip`) ve Upstash'e geç (#3).
4. vitest exclude düzeltmesini yap, ESLint'i kur.
5. Mobil CLS'yi ayrıca araştır.
