# Düşük Bütçe — API Katalogu

Kaynak koddan (Ağustos 2026) çıkarılmıştır: `app/api/**/route.ts` altındaki **63 route dosyası**, toplam **90 endpoint** (method başına 1 satır). Postman koleksiyonuyla aynı klasör gruplandırması kullanılmıştır — bkz. `postman/dusukbutce-api.postman_collection.json`.

Auth sütunu lejandı:
- **Herkese açık** — kimlik doğrulama yok.
- **Auth (cookie)** — `lib/auth.ts::getVerifiedUser` ile `auth-token` httpOnly cookie (veya `Authorization: Bearer`) doğrulanır.
- **Admin (Bearer)** — `ensureAdminRequest` ile `Authorization: Bearer <token>` header'ı, decoded JWT'de `isAdmin`/`role:"admin"` aranır.
- **userId'ye güven (doğrulama yok)** — endpoint JWT/cookie doğrulamaz, sadece body/query'deki `userId` alanına güvenir. Kimin istek yaptığı sunucu tarafında doğrulanmaz.
- **CSRF + Rate limit** notları ilgili satırlarda ayrıca belirtilmiştir.

---

## Auth (`app/api/auth/*`)

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| GET | `/api/auth/csrf-token` | Herkese açık | CSRF token üretir, `csrf-token` cookie'si set eder |
| POST | `/api/auth/login` | Herkese açık + **CSRF zorunlu** + rate limit (10/5dk) | Giriş yapar, `auth-token` cookie set eder |
| POST | `/api/auth/register` | Herkese açık + rate limit (5/15dk) | Yeni kullanıcı kaydı, email doğrulama maili gönderir |
| POST | `/api/auth/logout` | Herkese açık | `auth-token` cookie'sini temizler |
| POST | `/api/auth/refresh` | Auth (cookie) | Token %80 ömrünü geçtiyse yeniler |
| POST | `/api/auth/verify-token` | Herkese açık (body'de token bekler) | Body'deki JWT'yi doğrulayıp kullanıcıyı döner |
| POST | `/api/auth/change-password` | Auth (cookie) | Şifre değiştirir (mevcut şifre kontrolü var) |
| POST | `/api/auth/check-email` | Herkese açık | Email kayıtlı mı kontrolü |
| POST | `/api/auth/check-phone` | Herkese açık | Telefon kayıtlı mı kontrolü |
| POST | `/api/auth/forgot-password` | Herkese açık + rate limit (5/15dk) | Şifre sıfırlama linki gönderir |
| POST | `/api/auth/verify-reset-token` | Herkese açık | Şifre sıfırlama token'ını doğrular |
| POST | `/api/auth/reset-password` | Herkese açık + rate limit (10/15dk) | Yeni şifre belirler |
| POST | `/api/auth/resend-verification` | Herkese açık + rate limit (5/15dk) | Email doğrulama linkini tekrar gönderir |
| POST | `/api/auth/verify-email` | Herkese açık | Email doğrulama token'ını işler |
| POST | `/api/auth/get-user-email` | Herkese açık | Doğrulama token'ından email'i döner |
| GET | `/api/auth/update-profile` | Auth (cookie) | Profil bilgisi getirir |
| PUT | `/api/auth/update-profile` | Auth (cookie) | Profil günceller (email değişimi kod ister) |
| POST | `/api/auth/send-email-change-verification` | Auth (cookie) | Yeni email'e 6 haneli kod gönderir |
| GET | `/api/auth/google` | Herkese açık (tarayıcı redirect) | Google OAuth başlatır |
| GET | `/api/auth/google/callback` | Herkese açık (tarayıcı, gerçek `code` gerekir) | Google OAuth callback, cookie set eder |
| GET | `/api/auth/facebook` | Herkese açık (tarayıcı redirect) | Facebook OAuth başlatır |
| GET | `/api/auth/facebook/callback` | Herkese açık (tarayıcı, gerçek `code` gerekir) | Facebook OAuth callback, cookie set eder |

## Admin - Auth & Users (`app/api/admin/auth`, `app/api/admin/users*`)

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/admin/auth` | Herkese açık + **CSRF zorunlu** | Admin girişi, 48 saatlik token döner |
| GET | `/api/admin/auth` | Bearer token (kendi basit doğrulaması, `ensureAdminRequest` değil) | Admin token doğrular |
| GET | `/api/admin/users` | Admin (Bearer) | Tüm kullanıcıları listeler (şifre hariç) |
| DELETE | `/api/admin/users/:id` | Admin (Bearer) | Yalnızca `isAdmin:true` kullanıcıları siler |

## Admin - Products & Categories

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| GET | `/api/admin/products` | Admin (Bearer) | Tüm ürünleri listeler |
| POST | `/api/admin/products` | Admin (Bearer) | Ürün oluşturur |
| PUT | `/api/admin/products` | Admin (Bearer) | Ürün günceller (body: `productId`) |
| DELETE | `/api/admin/products` | Admin (Bearer) | Ürün siler (body: `productId`) |
| GET | `/api/admin/categories` | Admin (Bearer) | Kategorileri listeler (parentId/activeOnly filtre) |
| POST | `/api/admin/categories` | Admin (Bearer) | Kategori oluşturur (slug otomatik) |
| GET | `/api/admin/categories/:id` | Admin (Bearer) | Tek kategori getirir |
| PUT | `/api/admin/categories/:id` | Admin (Bearer) | Kategori günceller |
| DELETE | `/api/admin/categories/:id` | Admin (Bearer) | Kategori siler (alt kategori/ürün varsa engellenir) |
| GET | `/api/admin/prices` | Admin (Bearer) | Fiyat geçmişi + istatistik (sayfalı) |
| POST | `/api/admin/prices` | Admin (Bearer) | Toplu fiyat güncelleme (fixed/percentage/multiply) |
| GET | `/api/admin/prices/:id` | Admin (Bearer) | Ürünün fiyat geçmişi |
| PUT | `/api/admin/prices/:id` | Admin (Bearer) | Ürünün fiyatını günceller |
| GET | `/api/admin/images` | Admin (Bearer) | Ürün görselleri + istatistik (sayfalı) |
| POST | `/api/admin/images` | Admin (Bearer) | Ürüne toplu görsel ekler |
| GET | `/api/admin/images/:id` | Admin (Bearer) | Ürünün görsellerini getirir |
| PUT | `/api/admin/images/:id` | Admin (Bearer) | replace/add/remove/reorder işlemleri |
| DELETE | `/api/admin/images/:id` | Admin (Bearer) | Ürünün tüm görsellerini siler |

## Admin - Stock

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/admin/stock/update` | Admin (Bearer) | Tekil ürün stok güncelleme (add/remove/set) |
| POST | `/api/admin/stock/bulk-update` | Admin (Bearer) | Toplu/kategori bazlı stok güncelleme |
| GET | `/api/admin/stock/history` | Admin (Bearer) | **Her zaman boş dizi döner** (henüz uygulanmamış) |

## Admin - Submissions & Newsletter

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| GET | `/api/admin/submissions` | Admin (Bearer) | Tüm teklifleri listeler (kullanıcı bilgisiyle) |
| PUT | `/api/admin/submissions` | Admin (Bearer) | updateStatus/addOffer/createListing/reject aksiyonları |
| DELETE | `/api/admin/submissions` | Admin (Bearer) | Tekil ya da TÜM teklifleri siler (`action: deleteAll`) |
| POST | `/api/admin/action` | Admin (Bearer) | offer/list/reject/delivery_completed + müşteri maili |
| DELETE | `/api/admin/delete/:id` | Admin (Bearer) | **Test modu** — gerçek silme yapmıyor |
| POST | `/api/admin/delete/:id` | Admin (Bearer) | **Test modu** — gerçek silme yapmıyor |
| GET | `/api/admin/newsletter-subscribers` | Admin (Bearer) | `acceptNewsletter:true` kullanıcıları listeler |
| POST | `/api/admin/send-newsletter` | Admin (Bearer) | Abone listesine toplu mail gönderir (senkron döngü) |

## Listings

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| GET | `/api/listings` | Herkese açık | `status:"listed"` ilanlar (max 100), DB hatasında `[]` |
| GET | `/api/listings/:id` | Herkese açık | Tek ilan detayı (`status:"listed"` olmalı) |

## Product Submissions (Bize Sat)

### Genel Teklifler (`app/api/submissions/route.ts`)

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/submissions` | Auth opsiyonel (cookie varsa bağlanır) | Genel/PlayStation vb. teklif oluşturur — ALLOWED_FIELDS filtresi YOK |
| GET | `/api/submissions` | Auth (cookie) zorunlu | Kendi tekliflerini listeler (admin herkesinkini görebilir) |
| PUT | `/api/submissions` | Auth (cookie) zorunlu + sahiplik kontrolü | status/deliveryMethod/customerInfo günceller |
| DELETE | `/api/submissions` | Auth (cookie) zorunlu + sahiplik kontrolü | Teklif siler |

### Kategori Teklifleri — ortak şema, 14 route (`lib/handleProductSubmission.ts`)

Hepsi aynı `ALLOWED_FIELDS` beyaz listesi + `submissionSchema` (Joi) doğrulamasını kullanır; sadece `category` değeri farklıdır.

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/graphics-card-submissions` | Auth opsiyonel | Ekran kartı teklifi |
| POST | `/api/audio-system-submissions` | Auth opsiyonel | Ses sistemi teklifi |
| POST | `/api/case-submissions` | Auth opsiyonel | Kasa teklifi |
| POST | `/api/cooler-submissions` | Auth opsiyonel | Soğutucu teklifi |
| POST | `/api/gaming-wheel-submissions` | Auth opsiyonel | Oyun direksiyonu teklifi |
| POST | `/api/headphones-submissions` | Auth opsiyonel | Kulaklık teklifi |
| POST | `/api/keyboard-submissions` | Auth opsiyonel | Klavye teklifi |
| POST | `/api/monitor-submissions` | Auth opsiyonel | Monitör teklifi |
| POST | `/api/mouse-submissions` | Auth opsiyonel | Mouse teklifi |
| POST | `/api/processor-submissions` | Auth opsiyonel | İşlemci teklifi |
| POST | `/api/ram-submissions` | Auth opsiyonel | RAM teklifi |
| POST | `/api/sound-system-submissions` | Auth opsiyonel | Hoparlör sistemi teklifi |
| POST | `/api/ssd-submissions` | Auth opsiyonel | SSD teklifi |
| POST | `/api/tablet-submissions` | Auth opsiyonel | Tablet teklifi |

### Notebook Teklifleri — özel implementasyon (`app/api/notebook-submissions/route.ts`)

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/notebook-submissions` | Auth opsiyonel | Notebook teklifi — ALLOWED_FIELDS ile SINIRLI DEĞİL |
| GET | `/api/notebook-submissions` | Admin (Bearer) | Tüm notebook tekliflerini listeler |
| PUT | `/api/notebook-submissions` | Admin (Bearer) | customerAccept/customerReject aksiyonu |

### Teknik Servis Talepleri — ayrı model (`app/api/technical-service-submissions/route.ts`)

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/technical-service-submissions` | **Herkese açık (korumasız)** | Servis talebi oluşturur (TechnicalServiceSubmission modeli) |
| GET | `/api/technical-service-submissions` | Admin (Bearer) | Talepleri listeler |
| PUT | `/api/technical-service-submissions` | Admin (Bearer) | status/adminNotes günceller |
| DELETE | `/api/technical-service-submissions` | Admin (Bearer) | Talep siler |

### Müşteri Aksiyonları

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| PUT | `/api/submissions/:id/reoffer` | Auth (cookie) + sahiplik | Reddedilen teklif için yeniden teklif talebi |
| PUT | `/api/submissions/:id/response` | Auth (cookie) + sahiplik | Müşteri teklifi kabul/red eder |

## Addresses

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| GET | `/api/addresses` | Auth (cookie) | Kullanıcının adreslerini listeler |
| POST | `/api/addresses` | Auth (cookie) | Adres ekler |
| PUT | `/api/addresses` | Auth (cookie) | Adres günceller |
| DELETE | `/api/addresses` | Auth (cookie) | Adres siler |

## Upload

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/upload` | Auth (cookie) zorunlu | Base64 görseli Vercel Blob'a yükler, public URL döner (max 8MB) |

## Contact

| Method | Path | Auth | Açıklama |
|---|---|---|---|
| POST | `/api/contact` | Herkese açık | İletişim formu, admin'e bildirim maili gönderir |

---

## Güvenlik düzeltmeleri (2026-08-03)

- `addresses`, `auth/update-profile`, `auth/change-password`, `auth/send-email-change-verification` daha önce JWT doğrulamıyor, sadece body/query'deki `userId`'ye güveniyordu — `update-profile` + `send-email-change-verification` kombinasyonu tam bir hesap ele geçirme zincirine izin veriyordu. Artık hepsi `getVerifiedUserId` (httpOnly `auth-token` cookie) ile auth zorunlu.
- `submissions/[id]/reoffer` ve `submissions/[id]/response` auth yoktu, artık auth + sahiplik kontrolü (submission.userId eşleşmeli) var.
- `notebook-submissions` (GET/PUT) ve `technical-service-submissions` (tüm metodlar) korumasızdı (PII sızıntısı + herkes durum değiştirebiliyordu), artık `ensureAdminRequest` ile admin-only.

## Dikkat çeken bulgular (hâlâ geçerli, bilgilendirme amaçlı, kod değiştirilmedi)

- **admin/delete/[id]** (DELETE, POST) gerçek bir silme işlemi yapmıyor — sabit "test modu" yanıtı dönüyor; ProductSubmission importu kod içinde yorum satırı olarak duruyor.
- **admin/stock/history** her zaman boş dizi döner; ayrı bir StockHistory koleksiyonu henüz yok.
- **CSRF koruması** sadece `POST /api/auth/login` ve `POST /api/admin/auth` üzerinde var.
- Repo kökünde daha eski/farklı kapsamlı bir `DusukButce_API.postman_collection.json` zaten mevcuttu; bu yeni katalog `postman/` klasöründe ayrı ve güncel bir kaynak olarak tutulmuştur, eskisi değiştirilmedi.
