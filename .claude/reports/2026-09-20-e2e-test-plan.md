# 🧪 End-to-End Test Planı - dusukbutce.com

**Tarih:** 2026-09-20  
**Durum:** 🚀 Test Dönmesi Başlatılıyor  
**Kapsam:** Frontend, Backend, Admin, Business Logic

---

## 📋 Test Tarafları (Test Dimensions)

### 1. **Frontend UI Testing** - Bize-Sat Sayfaları
- [ ] Kategori listeleme ve navigasyon
- [ ] Ürün detayları (tıklama, görüntüleme)
- [ ] Kategori filtreleme
- [ ] Responsive tasarım (mobile/tablet/desktop)
- [ ] İkon renders (tüm kategoriler)
- [ ] WhatsApp entegrasyonu
- [ ] Search functionality

### 2. **Authentication Flows**
- [ ] Register (kayıt ol) - başarılı
- [ ] Register - validation errors
- [ ] Register - duplicate email
- [ ] Login - başarılı
- [ ] Login - wrong password
- [ ] Login - non-existent user
- [ ] Logout
- [ ] Session persistence
- [ ] Password recovery

### 3. **Bize-Sat İş Akışları**
- [ ] İlan oluşturma (listing creation)
- [ ] Kategori seçimi
- [ ] Resim yükleme
- [ ] Fiyat girişi
- [ ] İlan düzenleme
- [ ] İlan silme
- [ ] İlan yayınlama

### 4. **Teklif Yönetimi (Offers)**
- [ ] Teklif alma
- [ ] Teklifi görüntüleme
- [ ] Teklifi kabul etme
- [ ] Teklifi reddetme
- [ ] Teklif counter-offer (karşı teklif)
- [ ] Teklif fiyat değişikliği
- [ ] Teklif zaman aşımı

### 5. **Admin Panel**
- [ ] Dashboard access
- [ ] User management
  - [ ] Kullanıcı listeleme
  - [ ] Kullanıcı düzenleme
  - [ ] Kullanıcı silme
  - [ ] Rol yönetimi
- [ ] İlan yönetimi
  - [ ] İlanları listeleme
  - [ ] İlan onaylama
  - [ ] İlan reddetme
  - [ ] İlan silme
- [ ] Teklif yönetimi
  - [ ] Teklifleri listeleme
  - [ ] Teklif detayları
  - [ ] Anlaşmazlık çözümü
- [ ] Raporlar
  - [ ] Günlük rapor
  - [ ] Haftalık rapor
  - [ ] Kullanıcı aktivitesi

### 6. **Backend API Testing** (Postman)
- [ ] Authentication endpoints
- [ ] User CRUD operations
- [ ] Listing CRUD operations
- [ ] Offer CRUD operations
- [ ] Search API
- [ ] Upload API
- [ ] Admin endpoints
- [ ] Error handling
- [ ] Rate limiting

### 7. **Business Logic**
- [ ] İlan ömrü (listing lifecycle)
- [ ] Teklif onay workflow
- [ ] Ödeme flow
- [ ] İstatistikler hesaplamalar
- [ ] Email notifications
- [ ] SMS notifications

---

## 🎯 Hedefler

| Kapsam | Hedef | Durum |
|--------|-------|-------|
| **Coverage** | %90+ senaryoları kapsamak | 🟡 Başlıyor |
| **Bug Bulma** | Kritik hataları tespit | 🟡 Başlıyor |
| **Performance** | API response < 500ms | 🟡 Başlıyor |
| **Security** | Auth kontrolleri | 🟡 Başlıyor |

---

## 🔧 Test Araçları

1. **Frontend Testing:** Playwright + Browser Automation
2. **Backend Testing:** Postman / cURL
3. **Admin Testing:** Manual + Automation
4. **Database:** Kontrol (Production clone)

---

## 📊 Test Ekseküsyon Sırası

```
Faz 1: Authentication & Authorization (1-2 saat)
  └─ Register, Login, Logout, Permissions

Faz 2: Frontend Bize-Sat Flow (2-3 saat)
  └─ Navigasyon, Kategori, Ürün Detayları

Faz 3: İlan Oluşturma & Management (2-3 saat)
  └─ Create, Edit, Delete, Publishing

Faz 4: Teklif Yönetimi (2-3 saat)
  └─ Offer CRUD, Acceptance, Rejection, Counter-offers

Faz 5: Admin Panel (2-3 saat)
  └─ Dashboard, User Mgmt, Listings, Offers, Reports

Faz 6: Backend API (1-2 saat)
  └─ Postman testleri, endpoint coverage

Faz 7: Integration & Edge Cases (1-2 saat)
  └─ Concurrent operations, race conditions
```

---

## 📝 Test Raporları Çıktıları

Tüm testler tamamlandığında:
- `.claude/reports/2026-09-20-frontend-tests.md`
- `.claude/reports/2026-09-20-backend-tests.md`
- `.claude/reports/2026-09-20-admin-tests.md`
- `.claude/reports/2026-09-20-offer-tests.md`
- `.claude/reports/2026-09-20-auth-tests.md`
- `.claude/reports/2026-09-20-test-summary.md`

---

**Test Dönmesi:** Başlıyor 🚀  
**Tahmini Tamamlama:** 12-15 saat
