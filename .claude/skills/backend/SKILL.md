---
name: backend
description: dusukbutce.com'un sunucu tarafında çalışırken kullan — Next.js API route'ları (app/api/*/route.ts), MongoDB/Mongoose modelleri, kimlik doğrulama, teklif/submission mantığı, e-posta. Kullanıcı "backend", "api", "endpoint", "veritabanı", "model" dediğinde.
---
# Backend rolü — dusukbutce.com

## Stack & konum
- **Next.js API route'ları:** `app/api/<yol>/route.ts` (`export async function GET/POST/...`).
- **DB:** MongoDB Atlas (Frankfurt cluster), Mongoose. Bağlantı: `lib/mongodb.ts` (cached singleton — her handler başında `await connectDB()`). Veriler `test` veritabanında.
- **Modeller:** `models/` (User, ProductSubmission, Product, Category, PriceHistory, Contact, ...). `mongoose.models.X || mongoose.model('X', ...)` deseni (hot-reload için).

## Kimlik doğrulama (bu oturumda kuruldu — bozma)
- Kullanıcı JWT'si **httpOnly `auth-token` cookie**'sinde. Doğrulama: `lib/auth.ts` → `getVerifiedUser(request)` / `getVerifiedUserId(request)` (imzayı `jwt.verify` ile doğrular, **cookie'yi önce, sonra `Authorization: Bearer`** header'ı okur). Cookie yardımcıları: `lib/cookies.ts`.
- **Admin ayrı sistem:** `adminToken` + `role:'admin'`, header-tabanlı. `app/api/admin/utils/requireAdmin.ts` → `ensureAdminRequest`.
- Sahte userId engellenir — asla imzasız `Buffer.from(token.split('.')[1])` çözme; `getVerifiedUser` kullan.

## Güvenlik desenleri (mevcut)
- **Rate limiting:** `lib/rateLimit.ts` → hassas auth endpoint'lerinde `checkRateLimit`.
- **Girdi doğrulama:** `lib/validate.ts` (Joi) → tip/boyut kalkanı; `checkSQLInjection` (lib/security.ts) NoSQL'de etkisizdir, ona güvenme.
- **Teklif oluşturma:** 14 kategori tek `lib/handleProductSubmission.ts` üzerinden (`ProductSubmission`). `notebook-submissions` ayrı.
- **IDOR:** kullanıcı sadece kendi verisine erişir; `?userId=` gibi client parametresine güvenme, `getVerifiedUser().userId` kullan; admin `isAdmin` ile ayrılır.

## Kontrol listesi
- [ ] `await connectDB()` çağrıldı mı?
- [ ] Kimlik `getVerifiedUser`/`ensureAdminRequest` ile mi doğrulanıyor (imzasız decode YOK)?
- [ ] Kullanıcı sadece kendi kaynağına mı erişiyor (IDOR)?
- [ ] Girdi Joi ile sınırlandı mı (özellikle base64 `images`)?
- [ ] `console.log` prod'da `removeConsole` ile silinir ama hassas veriyi yine de loglama.
- [ ] `npx tsc --noEmit` temiz.
