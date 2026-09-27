# /bize-sat form analizi: 2026-09-26

**Amaç:** Her satış formunda gereksiz ya da eksik input var mı, bunu çıkarmak. Ekleme/çıkarma kararı kullanıcıda.

**Yöntem:**
- Her formun `page.tsx` kaynağı okundu.
- Formdan gönderilen alanlar sunucu tarafındaki `ALLOWED_FIELDS` beyaz listesiyle (`lib/handleProductSubmission.ts:18-39`) ve admin detay ekranıyla (`app/admin/components/SubmissionDetails.tsx`, `SubmissionDetailModal.tsx`) karşılaştırıldı.
- Giriş yapılıp formlar tarayıcıda da açıldı.

**Etiketler:**
- **[Kesin]**: koddan doğrulanmış olgu.
- **Öneri**: ikinci el fiyatlandırma deneyimine dayanan görüş.

**Kapsam:** 24/24 sayfa tamamlandı.

**Özet:**
- 15 sayfada toplam **24 alan** soruluyor ama kaydedilmiyor. Bunların **2'si zorunlu alan**.
- **2 sayfa** yetim ve mükerrer.
- Kaydedilen **12 alan** admin ekranında görünmüyor.

---

## 1. Önce düzeltilmesi gereken hatalar (P0: veri kaybı / yanlış kayıt)

| # | Sorun | Kanıt |
|---|---|---|
| 1 | **Kasa formu kasa markasını siliyor.** "Marka *" ve "Güç Kaynağı Markası" aynı `formData.brand` değişkenine bağlı. Kullanıcı PSU markasını yazınca kasa markasının üzerine yazılıyor. | `kasa/page.tsx:310` ve `:437` |
| 2 | **`/bize-sat/direksiyon` talepleri DB'ye "notebook" olarak kaydediliyor.** Sayfa `/api/notebook-submissions`'a gidiyor, route `category:'notebook'` değerini sabit yazıyor. Bu yüzden talepler admin'de notebook listesinde çıkıyor. Sayfa `gaming-direksiyon` ile birebir aynı ürünü soruyor. Hiçbir yerden link verilmiyor (yetim) ama hâlâ yayında. | `direksiyon/page.tsx:162,170`, `notebook-submissions/route.ts:71` |
| 3 | **İki zorunlu alan kaydedilmiyor.** Kullanıcı doldurmaya zorlanıyor, sunucu değeri atıyor. **Cep telefonu "Kayıt Türü"** (Yurtiçi/Yurtdışı): TR pazarında IMEI kaydı fiyatı en çok etkileyen bilgilerden biri. **Gaming direksiyon "Uyumluluk"** (PC/PlayStation). | `cep-telefonu/components/PhoneBasicInfo.tsx:262-282`, `gaming-direksiyon/page.tsx:364-385` |
| 3b | **`/bize-sat/ses-sistemi/sound-system` yetim ve mükerrer bir sayfa.** Hiçbir yerden link verilmiyor. Gönderimde giriş kontrolü yok, başarı mesajı hiç gösterilmiyor. **[Muhtemel]** Fotoğrafları boş görsel olarak kaydediyor (`src` verilmemiş bir Image canvas'a çiziliyor). Arama bileşeni ise var olmayan `/bize-sat/sound-system` adresine link veriyor, **[Muhtemel]** 404. | `sound-system/page.tsx:74-107,139-163`, `app/components/Search.tsx:241` |
| 4 | **Masaüstü formunda ekranda olmayan bir `case` alanı var.** DB'ye her seferinde boş string yazılıyor. | `masaustu/page.tsx:33` |
| 5 | **Kaydedilen 12 alan admin ekranında hiç görünmüyor**, fiyatı biçen kişi bunları göremiyor: `accessories, case, condition, connectivity, interface, latency, layout, manufacturingYear, motherboard, size, storageCapacity, wattValue`. Örnek olarak etkilenen bilgiler: PlayStation'ın aksesuar ve depolama bilgisi, konsolların "Durum" alanı, mouse/kulaklık/tablet'in kablolu mu kablosuz mu olduğu, masaüstünün anakartı, kasanın anakart desteği, RAM'in gecikmesi. | admin bileşenlerinde bu alanlara hiç referans yok |
| 6 | **`/api/submissions` Joi doğrulaması yapmıyor.** Bu uç masaüstü, PlayStation, Xbox, gamepad ve diğer bazı formlar tarafından kullanılıyor. `category` gelmezse varsayılan olarak `'playstation'` yazıyor. | `app/api/submissions/route.ts:1-9, :60` |

## 2. Formda sorulup sunucuda atılan alanlar (kullanıcı boşuna dolduruyor)

Her biri için iki seçenek var: ya kaydedilecek (ALLOWED_FIELDS + şema + admin ekranına eklenecek) ya da formdan çıkarılacak.

| Sayfa | Atılan alan | Öneri |
|---|---|---|
| gaming-direksiyon | Uyumluluk (zorunlu) | **Kaydet.** Fiyatı etkiliyor. Seçeneklere Xbox da eklenmeli. |
| kasa | Güç kaynağı var/yok (`material`), PSU watt (`powerSupplyWatt`) | **Kaydet.** PSU'lu kasa daha değerli. Mevcut `powerSupply` alanı kullanılabilir. |
| ssd | Okuma hızı, yazma hızı | **Çıkar.** Model adından biliniyor, kullanıcı çoğu zaman bilmiyor. |
| sogutucu | Fan boyutu | Kaydet ya da çıkar. Radyatör boyutu (240/360) AIO fiyatını etkiliyor, bu yüzden kaydetmek mantıklı. |
| klavye | RGB, renk | **Çıkar.** Fiyata etkisi çok düşük. |
| mouse, kulaklık, xbox, gamepad, tablet | Renk | **Çıkar.** Fiyata etkisi yok. İstenirse açıklamaya yazılabilir. |
| direksiyon (yetim) | Platform | Sayfa zaten silinmeli (bkz. P0-2). |
| cep-telefonu | **Kayıt Türü (zorunlu)**, renk | Kayıt Türü: **kaydet** (kritik). Renk: çıkar ya da isteğe bağlı bırak. Telefonda renk fiyata çok az etki ediyor. |
| yazici | Renk (baskı rengi: mono/renkli), bağlantı türü, yazdırma hızı | Baskı rengi: **kaydet** (fiyatı etkiler), ya da "Tip" listesine eklensin. Bağlantı: mevcut `connectivity` alanına eşle. Hız: çıkar, modelden biliniyor. |
| fotokopi-makinesi | Renk, bağlantı türü, kopya hızı | Renk: çıkar ("Makine Tipi" içinde Mono/Renkli zaten var). Bağlantı: `connectivity` alanına eşle. Hız: çıkar ya da `speed` alanına eşle. |
| tarayici | Bağlantı türü, tarama hızı | Bağlantı: `connectivity` alanına eşle. Hız: çıkar, modelden biliniyor. |

## 3. Kategori bazında: eksik kritik input'lar ve gereksiz olanlar

"Eksik" sütunu, ikinci el fiyatı en çok etkileyen ve formda sorulmayan bilgileri listeliyor. ★ işaretli alanlar `ALLOWED_FIELDS`'ta zaten var: şema hazır, yalnızca formda sorulmuyor.

| Kategori | Eksik (eklenmesi önerilen) | Gereksiz / sadeleştirilecek |
|---|---|---|
| **Notebook** | Şarj adaptörü dahil mi · klavye düzeni (TR-Q/F/US) · ekran durumu ★`screenStatus` / ölü piksel ★`deadPixelCount` · bilinen arıza/sorun (menteşe, klavye, batarya) | Aynı formda iki "Marka" etiketi var, ikincisi "İşlemci Markası" olmalı (`:288,:400`) |
| **Masaüstü** | Kasa input'u (ya da hayalet `case` alanı silinmeli) · bilinen arıza | Disk tipi seçenekleri notebook'la tutarsız ("SSD(PCIe NVMe)" / "SSD(NVMe)"). RAM tipinde yalnızca DDR4/DDR5 var. İki "Marka" etiketi. |
| **Ekran kartı** | Bellek tipi (GDDR6/6X), düşük öncelik | "Bit Değeri" etiketi `memoryType` alanına yazılıyor, adı ve anlamı uyuşmuyor. Form kapsamlı. Furmark, termal ped ve coil whine alanları sahada gerçekten fiyatı etkilediği için korunmalı. |
| **İşlemci** | **Pinlerde eğiklik/hasar** (en kritik) · overclock/delid yapıldı mı · soket ★`socket` | Teknik alan olarak yalnızca "stok fan" soruluyor. Form çok zayıf. |
| **RAM** | **Form faktörü: DIMM (masaüstü) / SO-DIMM (laptop)** (kritik) · kit mi, kaç modül (2×8 GB) | DDR tipi serbest metin, select olmalı. Notebook `ramType` alanını kullanıyor, bu form `type` alanını, yani aynı veri iki ayrı alanda duruyor. |
| **SSD** | **Sağlık yüzdesi / yazılan TB (CrystalDiskInfo)** (en kritik) · form faktörü select (M.2 / 2.5") | Okuma/yazma hızı (zaten atılıyor). `type` ile `interface` karışık kullanılıyor. |
| **Monitör** | Ölü/sıkışmış piksel ★`deadPixelCount` · ekran çizik/leke ★`screenStatus` · stand ve kablolar dahil mi | Boyut, çözünürlük, Hz ve panel serbest metin, select olmalı. |
| **Klavye** | **Klavye düzeni TR-Q/F/US** ★`layout` (TR pazarında fiyatı doğrudan etkiliyor) · eksik tuş/tuş kapağı | RGB ve renk. "Switch Tipi" placeholder'ı yanlış: "Mekanik, Membran" yazıyor, bunlar switch tipi değil klavye tipi. |
| **Mouse** | **Çift tıklama / tık sorunu** (en yaygın arıza) · DPI ★`dpi`, düşük öncelik | Renk. "Bağlantı Tipi" ile "Arabirim" aynı bilgiyi soruyor, birleştirilmeli. |
| **Kulaklık** | Tip (kulak üstü / kulak içi / TWS) · mikrofon var mı · kulak pedi durumu · TWS için şarj kutusu ve pil | Renk. Şu an kaydedilen tek teknik bilgi bağlantı tipi. |
| **Soğutucu** | **Montaj aparatları / soket kitleri dahil mi** (sık eksik çıkıyor) · AIO için pompa sesi/sızıntı | "Tip" zorunlu ama serbest metin, select olmalı (Hava/Sıvı). |
| **Kasa** | Yan panel cam sağlam mı · dahil fanlar | Marka hatası (P0-1). PSU alanları kaydedilmiyor (bölüm 2). |
| **PlayStation** | **Kol sayısı ve kol durumu (stick drift)** · firmware/jailbreak (admin ekranı bunu bekliyor ama sorulmuyor) | Depolama listesinde "1TB" iki kez var. "Durum" ile "Kozmetik Durum" iki ayrı 5'li skala, kafa karıştırıyor. |
| **Xbox** | Kol sayısı / stick drift · depolama | Renk. Marka `'xbox'` küçük harfle sabit yazılıyor. Görseller diğer formların aksine base64 olarak gönderiliyor. |
| **Gamepad** | **Stick drift var mı** (en kritik arıza) · pil durumu | Renk. Marka sabit `'Gamepad'` yazılıyor, gerçek marka kayboluyor. "Diğer" model seçilince serbest metin alanı açılmıyor. |
| **Gaming direksiyon** | **Pedal seti dahil mi · vites kolu dahil mi · force feedback çalışıyor mu** (kullanılmayan `wheelConfig.ts` tam olarak bunları içeriyor, planlanmış ama bağlanmamış) | Uyumluluk kaydedilmiyor (bölüm 2). |
| **Direksiyon** | — | **Sayfanın tamamı silinmeli** (P0-2). |
| **Tablet** | **iCloud/hesap kilidi kapalı mı** (kritik, kilitli cihaz satılamaz) · pil sağlığı ★`batteryHealth` · kalem/klavye dahil mi · ekran kırık/ölü piksel | Renk. Boyut, depolama ve bağlantı serbest metin. |
| **Cep telefonu** | **iCloud/Google hesap kilidi kapalı mı** (kritik) · **ekran veya parça değişimi yapıldı mı / orijinal mi** · Face ID/Touch ID çalışıyor mu · ekran kırık/çizik | RAM **zorunlu**, ama iPhone kullanıcısı çoğunlukla bilmiyor: isteğe bağlı olmalı. Ekran boyutu modelden biliniyor, çıkarılabilir. Kozmetik skala 5 kademeli, diğer formlar 4 kademeli, değerler uyuşmuyor. |
| **Ses sistemi** | Güç (W) ve bağlantı (bunlar yalnızca yetim sayfada soruluyor) · kumanda/kablolar dahil mi | "Tip" zorunlu ama serbest metin, select olmalı (Bluetooth hoparlör / Soundbar / 5.1 / 2.1). Yetim `sound-system` sayfası silinmeli. |
| **Yazıcı** | **Sayfa sayacı (toplam baskı)** (kritik) · toner/kartuş dahil mi, doluluk durumu | "Laser Yazıcı" ve "Lazer Yazıcı" aynı listede iki kez. Tip listesi teknolojiyi, boyutu ve kullanım biçimini tek seçimde karıştırıyor, ayrıştırılmalı. |
| **Fotokopi makinesi** | **Sayfa sayacı** (en kritik fiyat faktörü) · toner/drum durumu · kaset/besleyici (ADF) dahil mi | Renk (tip ile mükerrer). |
| **Tarayıcı** | Otomatik belge besleyici (ADF) var mı · kullanım yoğunluğu | Tip seçeneklerinde İngilizce değerler var (Film, Slide, Document). Bağlantı seçenekleri örtüşüyor (USB / USB 2.0 / USB 3.0). |

## 4. Bütün formlarda ortak konular

- **Kozmetik durum varsayılanı "Mükemmel".** Kullanıcı değiştirmezse ürün en iyi durumda kaydediliyor. **[Kesin]** PlayStation/Xbox/gamepad/direksiyon/tablet body'sinde değer boşsa da "Mükemmel" gönderiliyor. Öneri: varsayılan boş olsun, seçim zorunlu olsun.
- **Garanti/fatura işareti kaldırıldığında eski süre ve tarih silinmiyor**, body'ye yine gidiyor (`monitor/page.tsx:68-77` ve diğerleri).
- **İstemci doğrulaması** yalnızca HTML `required`. `formHelpers.ts:103 validateForm` hiçbir sayfada çağrılmıyor.
- **Ölü kod:**
  - `app/bize-sat/*/components/*`, `configs/*Config.ts` ve `ProductSubmissionForm.tsx` hiçbir yerden import edilmiyor.
  - Klasörlerde `page.tsx.backup-*` dosyaları duruyor.
  - Config'lerde formlarda olmayan, planlanmış alanlar var (`wheelConfig`: pedal/vites/FFB, `tabletConfig`: kalem/klavye, `playstationConfig`: kollar/oyunlar). Eksik input listesi için iyi bir referans.
- **Admin ekranı**, API'nin hiç kaydetmediği 51 alanı göstermeye çalışıyor (`readSpeed`, `tbw`, `pollingRate`, `jailbreak` vb.). Bu alanlar her zaman boş görünüyor.

- **DB'deki kategori adları tutarsız.** Bir kısmı Türkçe (`cep-telefonu`, `tarayici`, `yazici`, `fotokopi-makinesi`), bir kısmı İngilizce (`keyboard`, `cooler`, `headphones`, `audio-system`).

## 5. Piyasa karşılaştırması (itopya.com, incehesap.com)

**Yöntem:** İki sitenin ürün sayfalarındaki "Ürün Bilgileri" teknik özellik tablolarını okudum. İkisi de bilgisayar parçası/çevre birimi satıyor, **telefon satmıyor** — bu yüzden cep telefonu önerileri (kayıt türü, hesap kilidi) bu iki siteyle doğrulanamadı, genel pazar bilgisine dayanıyor, çelişen bir bulgu da yok.

**Doğrulanan eksikler (kesin ekle):**
- **Klavye düzeni gerçekten ayrı ve standart bir alan.** itopya'da her klavyenin "Klavye Tuş Dizilimi" (örn. "İngilizceQ (US)") ayrı satırda duruyor. dusukbutce'de bu alan hiç sorulmuyor.
- **Klavye boyutu da ayrı bir spesifikasyon.** itopya "Klavye Boyut" (TKL/Full/60% vb.) diye filtreliyor. dusukbutce'de yok.
- **RAM'de "Ram Uyumluluğu" (Masaüstü/Notebook) standart bir alan** — tam olarak eksik bulduğumuz form faktörü (DIMM/SO-DIMM) ayrımı. dusukbutce'nin bağımsız RAM formunda bu hiç sorulmuyor (yalnızca notebook/masaüstü formlarında `ramType` var, o da farklı bir şey — DDR nesli).
- **Ekran kartında "Bellek Tipi" (GDDR6/GDDR7) ile "Bellek Arayüzü" (256-bit) iki ayrı standart alan.** dusukbutce'nin `memoryType` alanı bunları karıştırıyor — form "Bit Değeri" etiketiyle bus genişliğini soruyor, gerçek bellek tipi (GDDR6 vb.) hiç sorulmuyor. Önceki raporda "düşük öncelik" dediğim bu madde, piyasa karşılaştırmasıyla **orta önceliğe** çıktı.
- **Mouse'ta DPI, en çok filtrelenen özelliklerden biri.** dusukbutce'nin `dpi` alanı zaten `ALLOWED_FIELDS`'ta var ama formda sorulmuyor — kaydı hazır, sadece input eksik.

**Doğrulanan ama önceliği değişenler:**
- **SSD okuma/yazma hızı ve GPU çekirdek hızı gibi alanlar gerçek spesifikasyonlar**, ama bunlar modelin sabit özelliği — kullanıcının ölçüp yazması gerekmiyor, modelden otomatik biliniyor. "Çıkar" önerimi bu yüzden değişmedi: ikinci elde önemli olan modelin sabit hızı değil, kullanım durumu (SSD için sağlık yüzdesi, GPU için mining/coil whine — ki bunlar zaten soruluyor).
- **RGB/aydınlatma itopya'da gerçekten bir spesifikasyon** ("Klavye Aydınlatma: RGB"), ama bu da modelin sabit özelliği. İkinci el alım formunda tekrar sormaya gerek yok, "çıkar" önerimi duruyor.

**Yeni doğrulanmış öncelik sırası (ekleme için):**
1. Klavye düzeni (Q-US/TR) — **kesin ekle**, TR pazarında kritik.
2. RAM formunda form faktörü (Masaüstü/Notebook) — **kesin ekle**, iki farklı ürün grubu karışıyor.
3. Ekran kartı bellek tipi (GDDR6/GDDR6X/GDDR7) — mevcut yanlış etiketlenmiş alanı düzelt.
4. Mouse DPI — form alanı ekle (kayıt zaten hazır).
5. Klavye boyutu (TKL/Full/60%) — düşük öncelik, fiyatı doğrudan etkilemiyor ama modeli netleştiriyor.

## 6. Önerilen karar sırası

1. **P0 hatalar** (bölüm 1). Kullanıcıya görünmeyen veri kaybı var, önce bunlar kapatılmalı.
2. **Kaydedilmeyen alanlar** (bölüm 2). Her alan için "kaydet" ya da "çıkar" kararı.
3. **Kritik eksikler.** Fiyatı en çok belirleyen, şu an sorulmayan bilgiler:
   - telefon/tablet için hesap kilidi,
   - gamepad/konsol için stick drift,
   - RAM için DIMM/SO-DIMM,
   - SSD için sağlık yüzdesi,
   - işlemci için pin hasarı,
   - yazıcı/fotokopi için sayfa sayacı,
   - klavye için dil düzeni,
   - direksiyon için pedal/vites.
4. **UX sadeleştirme.** Serbest metinleri select'e çevirmek, mükerrer etiketleri düzeltmek, kozmetik durum varsayılanını boş yapmak.
