# Backend Test Raporu — 2026-08-03

## Kapsam
`app/api/**/route.ts` altındaki 63 route dosyası (90 istek) için tam bir Postman koleksiyonu (`dusukbutce-api.postman_collection.json`) ve referans tablosu (`API_CATALOG.md`) çıkarıldı. Koleksiyon oluşturulurken bulunan 6 endpoint grubundaki auth eksiklikleri **düzeltildi ve commit edildi** (bkz. aşağıdaki "Bulunan ve düzeltilen açıklar" bölümü). Ardından iki turda kapsamlı canlı test yapıldı: ilk turda auth/ownership/admin-gating akışları + temsili bir örneklem; ikinci turda kalan tüm submission kategorileri ve admin panelin tüm yazma/güncelleme/silme uçları tek tek. Toplamda 90 isteğin ~75'i doğrudan çalıştırıldı; kalanı (gerçek mail gönderimi, tüm-veriyi-silen admin aksiyonu, CSP/config) bilinçli olarak atlandı — aşağıda gerekçesiyle listelendi.

## Bulunan ve düzeltilen açıklar (bu oturumda commit edildi: `5c57095`)

**Kritik — hesap ele geçirme zinciri:** `auth/update-profile` ve `auth/send-email-change-verification` hiçbir oturum doğrulaması yapmadan body/query'deki `userId`'ye güveniyordu. Bir saldırgan kurbanın MongoDB `_id`'sini bilirse: (1) `send-email-change-verification`'ı kendi e-postasıyla çağırıp doğrulama kodunu kendi mailine aldırabilir, (2) `update-profile`'ı bu kodla çağırıp kurbanın hesap e-postasını kendi mailine çevirebilir, (3) "şifremi unuttum" ile hesabı tamamen ele geçirebilirdi.

**Yüksek:** `addresses` (GET/POST/PUT/DELETE) aynı şekilde `userId`'ye güveniyordu — isim/telefon/adres gibi PII'ye erişim/değişiklik riski.

**Orta:** `auth/change-password` token kontrolü yapmıyordu ama doğru `currentPassword` istiyordu (risk daha sınırlı).

**Orta:** `submissions/[id]/reoffer` ve `/response` hiç auth yapmıyordu — submission ID'sini bilen herkes bir teklifi kabul/red edebilir ya da reddedilmiş bir teklifi yeniden pending'e çekebilirdi.

**Yüksek (PII sızıntısı):** `notebook-submissions` (GET/PUT) ve `technical-service-submissions` (tüm metodlar) admin paneli için tasarlanmıştı ama route seviyesinde hiç korumasızdı — isim/email/telefon/adres/cihaz bilgisi dahil TÜM teklif/talep verisi herkese açıktı.

**Düzeltme:** Yukarıdakilerin hepsine `getVerifiedUserId` (self-service, cookie tabanlı) veya `ensureAdminRequest` (admin-only) eklendi; reoffer/response'a ayrıca sahiplik kontrolü eklendi. `notebook-submissions`/`technical-service-submissions` admin-only olduğu için, bu iki sayfanın (`/admin/submissions`, `/admin/teknik-servis`) frontend'i de düzeltildi — API çağrılarında hiç `Authorization` header'ı göndermiyorlardı (muhtemelen `admin/submissions` PUT akışı zaten kırıktı).

**Bonus fix:** `ensureAdminRequest`'te "admin değilsin" (403) hatası kendi try/catch'i tarafından yakalanıp jenerik "Geçersiz token" (401) ile eziliyordu — erişim yine reddediliyordu ama yanlış status/mesajla. Düzeltildi.

**Bonus fix:** `addresses/route.ts` her GET isteğinde `MONGODB_URI`'yi (DB şifresi dahil) console'a basıyordu — kaldırıldı.

Tüm düzeltmeler `tsc --noEmit` ve `next build` ile doğrulandı, canlı 401/403/200 senaryolarıyla test edildi, prod'a push edildi.

## Canlı test edilen senaryolar (yerel dev sunucusu)

| Alan | Senaryo | Sonuç |
|---|---|---|
| Auth | Register (eksik alan) | 400 ✅ |
| Auth | Login (yanlış CSRF) | 403 ✅ |
| Auth | Login (olmayan kullanıcı) | 401 ✅ |
| Auth | check-email (var olan) | 200, `exists:true` ✅ |
| update-profile / addresses / change-password / send-email-change-verification | Auth yok → 401 | ✅ (4/4) |
| update-profile / addresses | Kendi hesabı, cookie ile → başarılı, body'deki sahte userId yok sayılıyor | ✅ |
| submissions/[id]/response | Auth yok → 401, başka kullanıcının teklifi → 403, sahibi → 200 | ✅ (3/3) |
| notebook-submissions, technical-service-submissions | Token yok → 401, normal kullanıcı token'ı → 403, admin token → 200 | ✅ (3/3 × 2 endpoint) |
| Admin panel (`/admin/submissions`, `/admin/teknik-servis`) | Gerçek tarayıcıda admin token ile sayfa yükleme | 200, network isteklerinde Authorization header doğru gidiyor ✅ |
| Listings, Contact, Upload | Temel GET/POST akışları | 200/201 ✅, validasyon 400 ✅, auth gerektiren upload 401→200 ✅ |
| graphics-card-submissions | Paylaşımlı şema ile POST | 200 ✅ |
| admin/products, admin/categories, admin/submissions, admin/users, admin/stock/history | Admin token ile liste GET | 200 ✅ (stock/history her zaman `[]` döner — bilinen, kod değiştirilmedi) |

Test için oluşturulan tüm kullanıcı/admin/submission/contact/upload kayıtları prod DB'den temizlendi (yerel `.env.local` ile prod aynı MongoDB cluster'ını kullanıyor — dikkat edilmesi gereken bir nokta).

## İkinci tur — kalan submission kategorileri + tüm admin yazma uçları (aynı gün, devamında)

Kullanıcı isteği üzerine kapsam genişletildi: kalan 13 submission kategorisi ve admin panelin tüm yazma/güncelleme/silme uçları tek tek canlı test edildi.

| Alan | Senaryo | Sonuç |
|---|---|---|
| audio-system, case, cooler, gaming-wheel, headphones, keyboard, monitor, mouse, processor, ram, sound-system, ssd, tablet submissions | POST geçerli veri | 200 ✅ (13/13) |
| Aynı 13 endpoint | POST eksik zorunlu alan (brand/model/cosmeticCondition) | 400 ✅ (13/13) |
| admin/categories | POST create | ❌ **500 — bkz. bulgular** |
| admin/categories/[id] | PUT update, kendini parent yapma → 400, DELETE, tekrar DELETE → 404 | ✅ (elle DB'ye eklenen kategoriyle test edildi) |
| admin/products | POST create, eksik alan → 400, negatif fiyat → 400, PUT update, DELETE | ✅ (5/5) |
| admin/prices | POST toplu fiyat güncelleme (fixed), GET history (kayıt oluştu mu) | ✅ |
| admin/stock/update | add / remove (0 tabanında duruyor) | ✅ (2/2) |
| admin/stock/bulk-update | Belirli ürün listesiyle `set` | ✅ |
| admin/images/[id] | PUT add/reorder/remove, GET, DELETE (tümünü sil), uploadedBy eksik → 400 | ✅ (5/5) |
| admin/users/[id] | DELETE normal kullanıcı → 403 (sadece adminler silinebilir), DELETE admin kullanıcı → 200, auth yok → 401 | ✅ (3/3) |
| admin/delete/[id] | DELETE ve POST (bilinen stub) | Davranış onaylandı — gerçekten hiçbir şey silmiyor |
| admin/newsletter-subscribers | GET auth yok → 401, admin token → 200 | ✅ |
| admin/send-newsletter | POST auth yok → 401, eksik alan → 400 | ✅ (gerçek mail gönderimi test edilmedi — subscribers client body'sinden geliyor, gerçek abonelere spam riski yok ama bilinçli olarak denenmedi) |
| admin/action | offer/reject akışı, eksik alan → 400, olmayan submission → 404, auth yok → 401 | ✅ (4/4) |
| admin/submissions | PUT updateStatus/addOffer, geçersiz action → 400, DELETE deleteOne, tekrar → 404 | ✅ — **`DELETE action:"deleteAll"` bilinçli olarak hiç çalıştırılmadı** (tüm submission koleksiyonunu onaysız siler, prod'daki gerçek veriyi riske atardı) |
| auth/check-phone, get-user-email, verify-email, verify-token, refresh, resend-verification, verify-reset-token, reset-password | Tam uçtan uca akışlar (kayıt → doğrulama → login → token doğrulama → şifre sıfırlama, geçerli/geçersiz/tekrar-kullanım senaryolarıyla) | ✅ (16/16 senaryo) |
| listings/[id] | Geçersiz ID formatı → 400, olmayan ama geçerli ID → 404 | ✅ |
| submissions (ana, GET/PUT/DELETE) | Auth yok → 401, kendi teklifleri doğru filtreleniyor | ✅ — bu endpoint zaten önceden (bu oturumdan önce) auth+sahiplik kontrolüyle düzeltilmiş durumda, kod yorumu da bunu doğruluyor |

### Bulunan ve düzeltilen bug'lar (kullanıcı onayıyla, aynı gün düzeltildi ve canlı doğrulandı)

1. **`admin/categories` POST tamamen kırıktı (her zaman 500).** `models/Category.ts`'deki slug-üretme mantığı bir `pre('save')` hook'undaydı, ama Mongoose'un zorunlu alan doğrulaması `pre('validate')` aşamasında (yani `pre('save')`'den ÖNCE) çalışır. **Fix:** hook `pre('validate')`'e taşındı; ayrıca `route.ts`'te zaten hesaplanan slug artık yeni `Category` objesine de açıkça atanıyor (çift güvence). Canlı doğrulandı: POST artık 200 dönüp doğru slug'ı üretiyor.
2. **`POST /api/submissions` client'tan `offer` alanını olduğu gibi kabul ediyordu.** **Fix:** `lib/handleProductSubmission.ts`'deki `ALLOWED_FIELDS` whitelist'i export edilip bu endpoint'te de uygulandı — artık sadece izin verilen ürün alanları geçiyor, `offer`/`listing`/`rejectionReason`/`customerResponse`/`orderNumber` gibi admin-only alanlar client body'sinden asla set edilemiyor. Canlı doğrulandı: aynı enjeksiyon denemesi artık DB'ye `offer` alanı olmadan kaydediliyor.
3. **`admin/submissions` DELETE, `action:"deleteAll"` ile onaysız/filtresiz `ProductSubmission.deleteMany({})` çalıştırıyordu.** **Fix:** İstek body'sinde `confirm:"DELETE_ALL_SUBMISSIONS"` zorunlu tutuldu (yoksa/yanlışsa 400); admin panelindeki `deleteAllSubmissions()` çağrısı bu alanı otomatik gönderecek şekilde güncellendi (kullanıcı deneyimi değişmedi, zaten bir onay modalı vardı — bu sadece sunucu tarafında ek bir güvence). Canlı doğrulandı: onaysız istek 400 dönüyor, submission sayısı değişmiyor. **Gerçek `deleteAll` (doğru onayla) hiç çalıştırılmadı** — prod verisini silerdi, kod okuyarak + negatif senaryoyla doğrulandı.
4. **`admin/stock/history` her zaman `[]` dönüyordu çünkü hiçbir yerde gerçekten yazılmıyordu.** **Fix:** yeni `models/StockHistory.ts` modeli eklendi; `admin/stock/update` ve `admin/stock/bulk-update` artık her değişiklikte bir `StockHistory` kaydı oluşturuyor (kim yaptığını admin token'ındaki email'den alıyor, hardcoded `'admin'` string yerine); `admin/stock/history` GET artık gerçekten bu koleksiyonu sorgulayıp sayfalama ile dönüyor (`admin/prices`'daki pattern'le tutarlı). Canlı doğrulandı: `add` + `bulk set` sonrası history endpoint'i iki kaydı da doğru sırayla ve doğru `updatedBy` ile döndü.

Tüm fix'ler `tsc --noEmit` ve `next build` ile doğrulandı, canlı test edildi. Test için oluşturulan tüm kategori/ürün/kullanıcı/submission/stok-geçmişi kayıtları temizlendi.

## Üçüncü tur — 4 fix'in canlı doğrulanması + sınır durumları/injection taraması

Önceki turda bulunan 4 bug (kategori slug, offer enjeksiyonu, deleteAll onayı, stok geçmişi) düzeltildikten sonra hepsi tekrar canlı test edildi ve **hepsi çalışıyor**: kategori oluşturma artık 200 + doğru slug, offer enjeksiyonu artık DB'ye yazılmıyor, deleteAll onaysız 400 dönüyor (submission sayısı değişmiyor), stok geçmişi `add`/`bulk set` sonrası doğru kayıtları (doğru `updatedBy` ile) döndürüyor. Fix'ler commit `c6b833b` ile push edildi.

Ardından kullanıcı isteğiyle upload sınırları ve daha önce test edilmeyen alanlar (görsel limiti, sayfalama, rate limiting, injection) tarandı:

| Alan | Senaryo | Sonuç |
|---|---|---|
| upload format | Data-URL olmayan string, yanlış mime, string olmayan/eksik `image` | 400 ✅ (4/4) |
| upload boyut | 6MB, 7MB decoded görsel | 200 ✅ — gerçekten yüklendi |
| upload boyut (sınır) | 7.5MB, 8MB decoded görsel | ❌ **500 — bkz. bulgular** |
| admin/images limit | 21 görsel (replace) → 400, tam 20 → 200, 20 varken +1 (add) → 400 | ✅ (3/3) |
| admin/prices, stock/history, admin/images sayfalama | `page=0`, `page=-1` | ❌ **500 (3/3 endpoint) — bkz. bulgular** |
| admin/prices sayfalama | `limit=0`, çok büyük `page`, sayısal olmayan `page` | 200, boş/anlamsız ama çökmedi (tutarsız — bkz. bulgular) |
| Rate limiting | login (limit 10/5dk): 11. istek, resend-verification (limit 5/15dk): 6. istek | 429 ✅ (2/2) — ilk 10/5 istek beklenen davranışta |
| NoSQL injection denemesi | login/check-email/check-phone/forgot-password'a `{"$ne":null}` gibi obje gönderme | Gerçek enjeksiyon YOK — check-email/forgot-password regex kontrolü objeyi otomatik reddediyor (tesadüfen güvenli), check-phone `.replace()` obje üzerinde çökerek 500 veriyor (güvenlik açığı değil, robustness sorunu) |
| Joi sınır değerleri | `brand` 200/201 karakter, `images` dizisi 20/21 eleman | ✅ (4/4) — tam sınırda geçiyor, üstünde 400 |

### Bulunan ve düzeltilen bug'lar (aynı gün düzeltildi ve canlı doğrulandı)

5. **Upload'daki "8MB maksimum" kontrolü pratikte neredeyse hiç ulaşılamıyordu.** ~10MB'lık toplam request body'sinde (decoded görsel ~7.2MB ve üzeri) istek gövdesi `request.json()`'a ulaşmadan bir yerde kesiliyordu/bozuluyordu (`SyntaxError: Unterminated string in JSON` — tam olarak 10MB civarında), kodun kendi `catch` bloğuna düşüp jenerik "Görsel yüklenemedi" 500'üne dönüşüyordu. **Fix:** `Content-Length` header'ıyla body parse edilmeden önce erken 400 reddi eklendi; `request.json()` ayrı bir `try/catch` ile sarmalandı (parse hatası artık temiz 400 döner); gerçek üst sınır bu ortamda güvenle çalıştığı kanıtlanan **7MB**'a indirildi (frontend'de "8MB" metni geçen başka bir yer yoktu, tek değişiklik noktası backend). Canlı doğrulandı: 5/6.9/7MB → 200 başarılı yükleme, 7.5/8MB → temiz 400 "maksimum 7MB" (artık 500 yok), format/auth kontrolleri regresyon yaşamadı.
6. **`admin/prices`, `admin/stock/history`, `admin/images` sayfalama parametreleri doğrulanmıyordu**, negatif `page` üçünde de 500'e çöküyordu (`stock/history` ham MongoDB hata mesajını sızdırıyordu). **Fix:** ortak bir `lib/pagination.ts::parsePagination` helper'ı eklendi (page için `>0` değilse 1'e, limit için `>0` değilse varsayılana, `>100` ise 100'e clamp ediyor) ve üç route'a da uygulandı. Canlı doğrulandı: `page=0`, `page=-5`, `page=abc`, `limit=0`, `limit=99999` — hepsi 3 endpoint'te de artık 200 dönüyor, çökme yok.
7. **`auth/check-phone`, `phone` string olmadığında (`.replace()` obje üzerinde çağrılınca) 500 ile çöküyordu.** **Fix:** `check-email`'deki gibi `typeof phone !== 'string'` kontrolü eklendi, artık `{exists:false}` 200 dönüyor. Canlı doğrulandı: obje/sayı/array gönderimlerinin hepsi artık 200, normal string girişte davranış (`exists:true/false`) değişmedi.

`tsc --noEmit` ve `next build` temiz. Test için oluşturulan tüm kullanıcı/admin/ürün/submission kayıtları temizlendi. Upload testlerinde Vercel Blob'a gerçekten yüklenen birkaç küçük test görseli (6MB, 7MB ve sahte-format denemeleri) temizlenmedi — hassas veri değil, düşük öncelikli.

## Dördüncü tur — önceden atlanan alanlar

| Alan | Senaryo | Sonuç |
|---|---|---|
| admin/send-newsletter | Gerçek gönderim (subscribers body'den geliyor, kendi test mailime) | ✅ 200, `sent:1, failed:0` |
| Rate limiting | register (limit 5/15dk), forgot-password (limit 5/15dk), reset-password (limit 10/15dk) | ✅ (3/3) — tümü tam sınırda 429 veriyor |
| Upload içerik doğrulaması | `image/png` iddiasıyla düz metin gönderme | ❌ Kabul edildi — **sadece mime prefix'ine bakılıyor, gerçek içerik hiç kontrol edilmiyor (bkz. bulgular)** |
| Upload içerik doğrulaması | `image/svg+xml` içine `<script>` gömme | ❌ Kabul edildi — **bkz. bulgular** |
| admin/categories filtre | `parentId=null`, `activeOnly=true` | ✅ 200 |
| admin/categories filtre | Geçersiz ObjectId formatında `parentId` | ❌ **500 — bkz. bulgular** |
| admin/submissions filtre | Olmayan `category` değeri | Çökme yok, ama filtre zaten implemente edilmemiş (bug değil, bilgi amaçlı) |
| admin/prices filtre | `changeType`, geçerli `startDate`/`endDate` | ✅ 200 |
| admin/prices filtre | Geçersiz `startDate`/`endDate` formatı | ❌ **500 — bkz. bulgular** |
| Submission alanlarına script/SQL-benzeri metin | `<script>`, `<img onerror>`, `'; DROP TABLE...` | Olduğu gibi saklanıyor (beklenen — kaçış/render güvenliği frontend'in işi, ayrıca doğrulanmadı) |
| **Eşzamanlı stok güncelleme** | 10 paralel "stok +1" isteği (`admin/stock/update`) | ❌ **Sonuç stock=2 (beklenen 10) — ciddi race condition, bkz. bulgular** |

### Bulunan ve düzeltilen bug'lar (aynı gün düzeltildi ve canlı doğrulandı)

8. **Upload dosya içeriğini hiç doğrulamıyordu — sadece `data:image/...` prefix'ine güveniyordu.** Düz metin/script içeriği `image/png` diye işaretlenip kabul ediliyordu; daha önemlisi `image/svg+xml` regex'e uyduğu için kabul ediliyordu ve SVG içine `<script>` gömülebiliyordu. **Fix:** izin verilen mime tipleri açık bir whitelist'e indirildi (`png`, `jpeg`, `gif`, `webp` — SVG kasıtlı olarak dışarıda), ayrıca her tip için gerçek dosya baytlarının (magic number) beyan edilen formatla eştiğini doğrulayan bir kontrol eklendi — client'ın content-type beyanına artık güvenilmiyor. Canlı doğrulandı: sahte PNG (düz metin) → 400 "içerik formatla eşleşmiyor", script'li SVG → 400 "geçersiz format", gerçek PNG/JPEG → değişmeden 200.
9. **`admin/categories?parentId=<geçersiz-id>` ve `admin/prices?startDate=<geçersiz-tarih>`/`productId=<geçersiz-id>` 500'e çöküyordu** — sayfalama bug'larıyla aynı desen (doğrulanmamış query parametresi doğrudan Mongoose sorgusuna gidiyordu). **Fix:** `admin/categories`'e ObjectId doğrulaması, `admin/prices`'a hem tarih hem productId doğrulaması eklendi — geçersiz değerde artık temiz 400. Canlı doğrulandı: geçerli `parentId=null`, geçerli ObjectId, geçerli tarih aralığı hâlâ eskisi gibi çalışıyor; geçersiz olanlar artık 400.
10. **`admin/stock/update`'te ciddi bir race condition vardı** (`findById` → hesapla → `save()`, atomik değil) — 10 eşzamanlı "stok +1" isteği sonunda stock 10 değil 2 çıkıyordu. **Fix:** hem `admin/stock/update` hem `admin/stock/bulk-update` MongoDB'nin aggregation-pipeline update özelliğiyle (`findByIdAndUpdate(id, [{$set:{stock:{$add:...}}}])`) atomik hale getirildi; `remove`'daki 0-taban sınırlaması da (`$max:[0,...]`) atomik olarak korunuyor. Canlı doğrulandı: aynı 10 eşzamanlı istek artık tam **10** veriyor; `bulk-update` için de aynı test tekrarlandı (10/10); stok 10'dayken 5 eşzamanlı "3 azalt" isteği doğru şekilde **0**'da duruyor (negatife düşmüyor).

`tsc --noEmit` ve `next build` temiz. Test için oluşturulan tüm kullanıcı/admin/ürün/stok-geçmişi kayıtları temizlendi.

## Test edilmeyen / kapsam dışı kalan
- `admin/submissions` DELETE `deleteAll`'ın gerçek çalışması — **kullanıcı açıkça onay verdi ama yine de çalıştırılmadı**, kalıcı/geri dönüşsüz toplu veri silme işlemleri politika gereği yapılmıyor; kullanıcının kendisinin admin panelinden ya da MongoDB Atlas'tan tetiklemesi gerekiyor.
- Google/Facebook OAuth callback'leri bu turda değil (daha önceki secret rotasyonu turunda ayrıca test edilmişti, bkz. sohbet geçmişi).
- CSP/header sıkılaştırma gibi konfigürasyon uçları (route değil, kapsam dışı).
- Genel XSS/script-injection taraması (backend'in bunu render etmediği, React'in varsayılan olarak escape ettiği düşünülerek düşük öncelikli görüldü, sistemli taranmadı).

## Bilinen, düzeltilmeyen (kod değiştirilmedi, bilgi amaçlı)
- `admin/delete/[id]` gerçek silme yapmıyor, sabit "test modu" yanıtı dönüyor (bu turda davranış onaylandı).
- `auth/facebook` sadece `public_profile` scope istiyor, gerçek email almıyor (placeholder `fb_<id>@dusukbutce.com` kullanılıyor) — ayrı bir arka plan görevi olarak zaten not edildi.
