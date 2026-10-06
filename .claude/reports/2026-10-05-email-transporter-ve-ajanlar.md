# E-posta transporter düzeltmesi ve kalıcı ajanlar (2026-10-05)

## E-posta (PR #25, `fix/email-transporter-tek-yol`)
- **Bulgu:** `lib/email.ts`'te 14 ayrı `createTransport`; yalnızca `getTransporter()` parolayı doğruluyordu. 13'ü tanımsız/kısa parolayla Gmail'e giriş deniyordu (10'unda `GMAIL_USER` varsayılanı da yoktu).
- **Düzeltme:** `getMailCredentials()` + `createMailTransporter()`; 13 çağrı taşındı, her biri `if (!transporter) return false;` (mevcut `boolean` sözleşmesi korundu). Net −57 satır.
- **Test:** `lib/email.test.ts` 19 test, nodemailer spy'lı (gerçek e-posta yok). Mutasyon kontrolü: eski kodla 17 test kırmızı. `tsc` temiz, `vitest` 125/125, CI yeşil.
- **Davranış değişikliği:** diğer 13 fonksiyon artık 16 karakterden kısa parolayı reddeder. **Merge sonrası prod'da bir bildirim e-postası (ör. yeni teklif) tetikleyip gittiğini doğrula.** Prod parolası 16 karakterden kısaysa bildirimler susar (şifre sıfırlama zaten bu kontrolü geçiyor, bu yüzden düşük olasılık).
- **Betterleaks uyarısı (yanlış alarm):** testteki sahte parola sabitleri 2 "generic-password" bulgusu verdi; koddan üretilecek şekilde değiştirildi. İlk commit'in tarihçesinde kalıyor, squash merge ile `main`'e girmez.

## Kalıcı ajanlar (PR #24 web, mobile PR #2)
`web-analist-tpm` ve `mobil-analist-tpm`: kod yazmayan analist/TPM ajanları; alan zinciri, üç kayıt yolu, kategori tek kaynağı, mobile bağımlılığı ve izole test ortamı kurallarını içerir. **Bu oturumun ajan listesi başlangıçta yüklendiği için bu ajanlar bu oturumda çağrılamadı; yeni oturumda görünür.**

## Süreç notu
Mobile `git fetch`, `.git/refs/heads/main 2` (iCloud çakışma artığı) yüzünden başarısız oldu; geçersiz ref `/tmp/git-icloud-quarantine-mobile/` altına taşındı. Dal tabanı bir ara bayat yerel `main`'e açılmıştı, `origin/main` üzerine yeniden kuruldu (hiçbir şey push edilmeden).
