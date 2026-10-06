# /api/ai/estimate — Perplexity çağrısının sunucuya taşınması (2026-10-06)

**Neden:** Mobil uygulama `perplexityai` Node SDK'sını (→ `puppeteer` → Node `os`) ve `PERPLEXITY_API_KEY`'i doğrudan içeriyordu; uygulama paketlenemiyordu ve anahtar uygulamaya gömülürdü. Bkz. mobile `.claude/issues/2026-10-06-perplexity-bundle.md`.

## Tasarım
- `POST /api/ai/estimate` `{ kind: 'price', product } | { kind: 'repair', device, issue }` → `{ success, data: { answer, sources[{url}], status } }`.
- Yalnızca giriş yapmış kullanıcı (cookie veya Bearer); kullanıcı başına 10 istek / 10 dk (`rateLimit` `identifier`).
- **İstem sunucuda sabit şablondan** kurulur; istemci ham istem/model/mesaj gönderemez (uç ücretli genel amaçlı LLM vekiline dönüşmesin). Alanlar sanitize + uzunluk sınırlı; kaynak URL'ler yalnızca http(s).
- `PERPLEXITY_API_KEY` yoksa **503** (mobile ekranlar mevcut hata mesajıyla zarifçe bozulur); Perplexity hatası/zaman aşımı **502**, ayrıntı ve anahtar istemciye sızmaz.

## Doğrulama
`app/api/ai/estimate/route.test.ts` 18 test (msw ile Perplexity taklidi, gerçek ağ/anahtar yok) + `rateLimit` identifier 2 test. `tsc` temiz, `vitest` 145/145.

## Doğrulanamayanlar
- **Gerçek Perplexity yanıt biçimi:** istek/yanıt şeması (`/chat/completions`, `choices[0].message.content`, üst düzey `citations`) Perplexity'nin belgelenmiş API'sine göre yazıldı ama **gerçek anahtarla denenmedi** (anahtar yok). İlk canlı çağrıda doğrulanmalı; yanıt biçimi farklıysa `lib/aiEstimate.ts` içindeki ayrıştırma düzeltilir.
- `PERPLEXITY_API_KEY` Vercel'e **eklenmedi** (senin işin). Eklenene kadar özellik "kullanılamıyor" der.
- Hız sınırı bellek içi (Vercel'de lambda başına); kesin global limit için Redis gerekir (mevcut `rateLimit.ts` notu).
