# /api/listings yazma uçlarında yetki kontrolü (2026-10-06)

**Ciddiyet: yüksek.** `POST /api/listings`, `PATCH /api/listings/[id]` ve `DELETE /api/listings/[id]` kimlik doğrulaması yapmıyordu. İlan kimlikleri herkese açık `GET /api/listings` ile alınabildiği için, kimliksiz biri herhangi bir kaydı değiştirebilir/silebilir ya da yeni kayıt oluşturabilirdi.

## Düzeltme
- `lib/auth.ts`: `requireAdmin(request)` (imza doğrulamalı; 401 kimliksiz, 403 admin değil).
- Üç uç yönetici-only; `PATCH`/`DELETE` geçersiz id'de 500 yerine 400.
- Meşru çağıran yok: web (`satilik-ilanlar`, `ilanlar`) ve mobile yalnızca `GET` kullanıyor; yönetici akışı ayrı `/api/admin/listings/*` uçlarında. `GET` herkese açık kaldı.

## Test
`app/api/listings/listings-auth.integration.test.ts` (12 test, bellekte MongoDB): kimliksiz → 401 ve kayıt değişmez/silinmez/oluşmaz; admin olmayan → 403; yanlış imzalı token → 401; admin → başarılı; geçersiz id → 400; GET hâlâ açık. Mutasyon kontrolü: eski rotalarla 8 test kırmızı. `tsc` temiz, `vitest` tamam.

## Açık kalan (düzeltilmedi, onay gerekir)
1. **`GET /api/listings` ve `GET /api/listings/[id]` tüm belgeyi döndürüyor** (projeksiyon yok): `userId`, `customerInfo` (ad/e-posta/telefon/adres), `adminNotes`, `offer`, `payment`, `cancellation`, `customerResponse` alanları şemada aynı belgede. `listed` durumundaki kayıtlarda bunlar doluysa herkese açık. Hangi alanların web/mobile'da gerçekten kullanıldığı doğrulanmadan izin listesine geçilmemeli. **Prod'daki gerçek bir `listed` kaydın yanıtına bakıp doğrulamak gerekir.**
2. Bu açık kodda uzun süredir vardı; **prod kayıtlarının değiştirilip değiştirilmediği bilinmiyor.** Vercel/Atlas günlüklerinde `PATCH|DELETE /api/listings/*` ve `POST /api/listings` isteklerine bakılmalı; ilan kayıtlarında beklenmeyen `status`/`offer`/`payment` değişikliği var mı kontrol edilmeli.
