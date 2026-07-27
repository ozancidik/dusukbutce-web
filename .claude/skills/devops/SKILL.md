---
name: devops
description: dusukbutce.com'un dağıtım/altyapı işlerinde kullan — Vercel, ortam değişkenleri (.env), MongoDB Atlas, GitHub Actions CI, secret yönetimi, build/deploy. Kullanıcı "deploy", "vercel", "env", "ci", "secret", "atlas", "sunucu ayarı" dediğinde.
---
# DevOps rolü — dusukbutce.com

## Ortam
- **Hosting:** Vercel (main'e push → otomatik deploy). Build: `next build`.
- **DB:** MongoDB Atlas — Frankfurt cluster (`dusukbutce-web.d1zyycs.mongodb.net`). Eski Güney Afrika cluster'ı (`cluster0.mtwbovf`) ölü.
- **CI:** `.github/workflows/ci.yml` — her push/PR'da `tsc --noEmit` + `next build` (build'e dummy `MONGODB_URI`/`JWT_SECRET` env verilir).
- **Env:** `.env.local` (gitignore'da, ASLA commit'lenmez). Şablon: `.env.example`. Değişkenler: `MONGODB_URI`, `JWT_SECRET`, `GMAIL_USER/APP_PASSWORD`, `GOOGLE_CLIENT_ID/SECRET`, `FACEBOOK_APP_ID/SECRET`, `NEXT_PUBLIC_SITE_URL`.

## Güvenlik / bilinen açık işler
- ⚠️ **Sızan secret'lar döndürülmeli:** `JWT_SECRET`, `GOOGLE_CLIENT_SECRET`, `FACEBOOK_APP_SECRET`, `GMAIL_APP_PASSWORD` git geçmişinde ifşa oldu (bkz. memory). MongoDB yeni cluster+şifreyle zaten döndürüldü.
- ⚠️ **Vercel prod env'de `MONGODB_URI` yeni Frankfurt adresiyle güncellenmeli** (yoksa canlı site DB'ye bağlanamaz).
- Rate limiting bellek-içi (`lib/rateLimit.ts`) — serverless'te instance başına; global kesinlik için Upstash/Cloudflare WAF (`docs/cloudflare-waf-rules.md`).

## Kurallar
- `.env*` dosyalarını asla commit'leme; secret'ları koda gömme.
- Deploy'a etkiyen değişikliklerde önce `next build`'i yerelde çalıştır.
- Dış eyleme geçmeden (deploy tetikleme, env değiştirme, secret rotasyonu) kullanıcıdan onay al; secret değerlerini sen girme — kullanıcı kendi panelinde yapsın.

## Kontrol listesi
- [ ] `next build` yerelde geçiyor mu?
- [ ] Yeni env değişkeni eklendiyse `.env.example` + Vercel güncellendi mi?
- [ ] Commit'e `.env.local` / secret sızmıyor mu (`git diff --cached`)?
