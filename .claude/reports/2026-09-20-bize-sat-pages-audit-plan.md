# Bize-Sat Sayfaları Audit Planı
**Tarih:** 2026-09-20  
**Amaç:** Bize-sat altındaki tüm sayfaların input alanlarını kontrol edip gereksiz/eksik olanları tespit etmek

---

## 📋 Audit Kapsamı

Her kategori sayfasında kontrol edilecek:
1. **Gereksiz Input Alanları** - Form'da olan ama ihtiyaç olmayan alanlar
2. **Eksik Input Alanları** - Olması gereken ama eksik olan alanlar
3. **Input Türü** - Doğru input type kullanılıp kullanılmadığı
4. **Validation** - Client-side validation var mı
5. **Placeholder/Label Ekikliği** - Açıklamalar yeterli mi
6. **Error Handling** - Hata mesajları temiz mi

---

## 🔍 Kontrol Edilecek Sayfalar

### Kategoriler (Bize-Sat Altında)

**Bilgisayar Bileşenleri:**
- [ ] `/bize-sat/notebook` - Dizüstü
- [ ] `/bize-sat/masaustu` - Masaüstü
- [ ] `/bize-sat/ekran-karti` - Ekran Kartı
- [ ] `/bize-sat/islemci` - İşlemci
- [ ] `/bize-sat/ram` - RAM
- [ ] `/bize-sat/ssd` - SSD
- [ ] `/bize-sat/sogutucu` - Soğutucu
- [ ] `/bize-sat/kasa` - Boş Kasa

**Çevre Birimleri:**
- [ ] `/bize-sat/cep-telefonu` - Cep Telefonu
- [ ] `/bize-sat/monitor` - Monitör
- [ ] `/bize-sat/klavye` - Klavye
- [ ] `/bize-sat/mouse` - Mouse
- [ ] `/bize-sat/tablet` - Tablet
- [ ] `/bize-sat/kulaklik` - Kulaklık
- [ ] `/bize-sat/ses-sistemi` - Ses Sistemi
- [ ] `/bize-sat/gaming-direksiyon` - Oyuncu Direksiyonu
- [ ] `/bize-sat/yazici` - Yazıcı
- [ ] `/bize-sat/tarayici` - Tarayıcı
- [ ] `/bize-sat/fotokopi-makinesi` - Fotokopi Makinesi

**Oyun Konsolları:**
- [ ] `/bize-sat/playstation` - PlayStation
- [ ] `/bize-sat/gamepad` - Gamepad/Joystick
- [ ] `/bize-sat/xbox` - Xbox

---

## 📝 İlan Oluşturma Formu - Standart Input Alanları

Taslak form (referans):
```
☑ Başlık (text, required)
☑ Açıklama (textarea, required)
☑ Fiyat (number, required, min=1)
☑ Kategori (select, required)
☑ Durum (radio: Sıfır/İkinci El, required)
☑ Resim (file, required, multiple)
☑ İletişim Yöntemi (radio: Telefon/Email/WhatsApp, required)
☑ Telefon (tel, required if phone selected)
☑ Email (email, required if email selected)
☑ Adres (text, optional)
☑ Hızlı Teslim (checkbox, optional)
☑ Kargo Desteği (checkbox, optional)
```

---

## ❓ Kategori-Spesifik Sorular

Her kategori için ek sorular:

| Kategori | Ek Alanlar Gerekir Mi? |
|----------|------------------------|
| **İşlemci** | Model, Socket, Nesil, Sahte/Orijinal bildirimi? |
| **RAM** | Tipi (DDR3/DDR4/DDR5), Hız, Kapasitesi? |
| **Ekran Kartı** | GPU Modeli, VRAM, Nesil? |
| **SSD** | Kapasitesi, Hızı, NVMe/SATA? |
| **Cep Telefonu** | Model, Renk, Kapı durumu? |
| **Tablet** | Model, Ekran Boyutu, Kapasitesi? |
| **Monitör** | Boyut, Çözünürlük, Yenileme Hızı? |

---

## 🔍 Audit Kontrol Listesi

### Her Sayfa İçin Denetim:

- [ ] Formu açabilir miyiz?
- [ ] Başlık input var mı? Uygun mu?
- [ ] Fiyat input var mı? Min/max validation? 
- [ ] Resim upload var mı? Dosya tipi sınırı?
- [ ] Telefon alanı var mı? E.164 format?
- [ ] Email alanı var mı? Validation?
- [ ] Açıklama textarea var mı? Char limit?
- [ ] Submit butonu var mı? Aktif mi?
- [ ] Boş submit hatası gösterilir mi?
- [ ] Başarılı submit sonrası yönlendirme?
- [ ] WhatsApp button var mı? Link doğru mu?

---

## 📊 Rapor Çıktısı

Audit tamamlandığında `.claude/reports/2026-09-20-bize-sat-audit-report.md` dosyasında:

```markdown
# Bize-Sat Sayfaları Audit Raporu

## Genel Bulgular
- Toplam kontrol edilen sayfa: X
- Sorun bulunan sayfa: X
- Ortalama input alanı sayısı: X

## Kategori Bazında Bulgular

### ✅ Sorun Yok
- /bize-sat/ram - Tüm alanlar uygun

### ⚠️ Uyarı (Gözden Geçirilmeli)
- /bize-sat/cep-telefonu - Renk alanı eksik

### 🔴 Hata (Düzeltilmeli)
- /bize-sat/monitor - Fiyat validation eksik

## Detaylı Bulgular
[Her sayfa için ayrıntılı liste]

## Öneriler
[Düzeltilmesi gereken maddeler]
```

---

## ⏱️ Tahmini Süre

- Sayfa yükleme & kontrol: 5 dakika
- Form test etme: 10 dakika
- Validation kontrol: 5 dakika
- **Toplam: 20 dakika × 3 grup = 60 dakika (~1 saat)**

---

## 🚀 Sonraki Adım

1. Bu planı çalıştır
2. Tüm sayfaları audit et
3. Bulgularını rapor et
4. Önerilen düzeltmeleri implement et

**Status:** ⏳ Hazır, başlanmaya bekleniyor
