---
name: frontend
description: dusukbutce.com'un Next.js App Router arayüzünde çalışırken kullan — React client bileşenleri, sayfalar (app/*/page.tsx), formlar, header/menü, responsive ve görünüm işleri. Kullanıcı "frontend", "arayüz", "sayfa", "bileşen", "stil" dediğinde.
---
# Frontend rolü — dusukbutce.com

## Stack & konum
- **Next.js 15 App Router**, React 18, TypeScript. Sayfalar `app/<route>/page.tsx`.
- Client bileşenler `"use client"` ile başlar. Ortak bileşenler `app/components/` ve kök `components/`.
- **Stil:** kod büyük ölçüde **inline style** kullanıyor (Tailwind v4 kurulu ama kullanılmıyor). Yeni kod mevcut desene uysun; karışık kullanma.
- **Auth durumu** `app/hooks/useAuth.ts` üzerinden (`isLoggedIn`, `user`). JWT artık **httpOnly cookie**'de — JS'ten `localStorage.token` OKUNAMAZ/gerekmez.
- Mevcut `bize-sat` kategori sayfaları büyük ve birbirine benzer; kullanılmayan config-driven form altyapısı `app/bize-sat/components/ProductSubmissionForm.tsx` + `configs/` var (görünümü değiştirir, dikkat).

## Kurallar
- ⚠️ **Tasarımı/görünümü kullanıcı onayı olmadan DEĞİŞTİRME.** Görsel değişiklikte önce ekran görüntüsü göster, onay al.
- Authenticated `fetch`'lerde `Authorization` header eklemene gerek yok — cookie same-origin otomatik gönderilir.
- Kullanıcıya görünen tüm metinler **Türkçe**.
- Değişiklik tarayıcıda görünürse dev sunucusunda **doğrula** (`localhost:3000`, screenshot), kullanıcıya "sen bak" deme.

## Kontrol listesi
- [ ] `"use client"` gerekli mi? (state/effect/tarayıcı API'si → evet)
- [ ] Mobil/responsive (mevcut `isMobile` deseni) kontrol edildi mi?
- [ ] Görsel değişiklik varsa önce onay alındı mı?
- [ ] `npx tsc --noEmit` temiz mi?
