# 🧪 E2E Test Execution Guide

**Tarih:** 2026-09-20  
**Kapsam:** Comprehensive end-to-end testing all scenarios  
**Status:** 📋 Test suites ready for execution

---

## 📁 Test Files Oluşturulan

```
tests/
├── auth.test.ts                    # ✅ 15 Authentication tests
├── bize-sat-flow.test.ts           # ✅ 9 Frontend UI flow tests
├── offer-management.test.ts        # ✅ 20 Offer management tests
└── admin-panel.test.ts             # ✅ 22 Admin panel tests
```

**Total:** 66 test cases

---

## 🚀 Test Çalıştırma

### 1. Prerequisites
```bash
# Bağımlılıkları yükle
npm install

# Dev sunucuyu başlat (ayrı terminal)
npm run dev

# Playwright browsers'ı yükle
npx playwright install
```

### 2. Tüm Testleri Çalıştır
```bash
# Tüm testler (headless)
npx playwright test

# Spesifik test dosyası
npx playwright test tests/auth.test.ts

# Watch mode
npx playwright test --watch

# UI mode (görsel)
npx playwright test --ui

# Debug mode
npx playwright test --debug
```

### 3. Test Raporları
```bash
# HTML rapor oluştur
npx playwright test --reporter=html

# HTML raporu aç
npx playwright show-report

# JSON rapor
npx playwright test --reporter=json > test-results.json

# JUnit rapor (CI/CD için)
npx playwright test --reporter=junit
```

---

## 📊 Test Dimensions

### Phase 1: Authentication (15 tests)
**Files:** `tests/auth.test.ts`

**Scenarios:**
- Register (başarılı, validation, duplicate)
- Login (başarılı, wrong password, non-existent, empty)
- Logout (başarılı, session clear)
- Session (persistence, timeout)
- Password recovery (email, invalid)

**Expected:** ✅ All pass or ⚠️ Identify blockers

---

### Phase 2: Bize-Sat Frontend (9 tests)
**Files:** `tests/bize-sat-flow.test.ts`

**Scenarios:**
- Kategori listeleme & navigasyon
- Responsive design (mobile/tablet/desktop)
- İlan oluşturma formu
- WhatsApp entegrasyonu
- Arama fonksiyonu

**Expected:** ✅ All pages load & categories visible

---

### Phase 3: Offer Management (20 tests)
**Files:** `tests/offer-management.test.ts`

**Scenarios:**
- Teklif alma (başarılı, validation, not ekleme)
- Teklif yönetimi (görüntüleme, kabul, reddetme)
- Karşı teklif (gönderme, validation)
- Fiyat değişikliği
- Zaman aşımı & bildirimler

**Expected:** ✅ Full offer lifecycle working

---

### Phase 4: Admin Panel (22 tests)
**Files:** `tests/admin-panel.test.ts`

**Scenarios:**
- Dashboard metrikler
- Kullanıcı yönetimi (CRUD, roller)
- İlan yönetimi (onay, reddetme, silme)
- Teklif yönetimi (listeme, anlaşmazlık)
- Raporlar & ayarlar

**Expected:** ✅ Admin functions operational

---

## 🔍 Bize-Sat Pages Audit (Planned)

**File:** `.claude/reports/2026-09-20-bize-sat-pages-audit-plan.md`

**Kontrol edilecek:**
- Tüm kategori sayfaları (27 page)
- Input alanları (gerekli/gereksiz)
- Validation kuralları
- Error mesajları
- Placeholder/label metinleri

**Output:** `2026-09-20-bize-sat-audit-report.md`

---

## 🎯 Expected Results

| Test Suite | Pass Rate | Timeout |
|------------|-----------|---------|
| Auth | ~90% | 2-3 min |
| Bize-Sat | ~95% | 2-3 min |
| Offers | ~80% | 3-4 min |
| Admin | ~85% | 2-3 min |
| **Total** | **~87%** | **~12 min** |

---

## 📈 Metrics to Track

- **Pass/Fail ratio:** Each test suite
- **Execution time:** Per test file
- **Error types:** Validation, navigation, API, timeout
- **Flaky tests:** Tests that sometimes pass/fail
- **Coverage:** Which user flows are tested

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Selector not found | Update selector in test or on page |
| Timeout | Increase timeout or check dev server |
| Auth not working | Verify test account exists in DB |
| API failures | Check backend API is running |
| Navigation wrong | Verify route structure matches tests |

---

## 📝 Test Report Template

After running tests:

```markdown
# Test Execution Report - 2026-09-20

## Summary
- **Total Tests:** 66
- **Passed:** XX
- **Failed:** XX
- **Skipped:** XX
- **Duration:** XX min

## By Suite

### ✅ Authentication (tests/auth.test.ts)
- Passed: 15/15
- Duration: 2 min
- Notes: All flows working

### ✅ Bize-Sat Flow (tests/bize-sat-flow.test.ts)
- Passed: 8/9
- Failed: 1 (search not working)
- Duration: 2 min

### ⚠️ Offer Management (tests/offer-management.test.ts)
- Passed: 18/20
- Failed: 2 (counter-offer validation)
- Duration: 3 min

### ⚠️ Admin Panel (tests/admin-panel.test.ts)
- Passed: 20/22
- Failed: 2 (user deletion permissions)
- Duration: 3 min

## Blockers
1. Search functionality not implemented
2. Counter-offer validation needs work
3. Admin delete permissions not wired

## Recommendations
1. Implement search API
2. Fix offer validation
3. Add proper role checks to admin panel
4. Add integration tests for payment flow (not covered)

## Next Steps
- [ ] Fix identified blockers
- [ ] Run full regression
- [ ] Create backend API tests (Postman)
- [ ] Add load testing
```

---

## 🔗 Related Reports

- `.claude/reports/2026-09-20-e2e-test-plan.md` - Original test plan
- `.claude/reports/2026-09-20-bize-sat-pages-audit-plan.md` - Audit scope
- `.claude/reports/2026-09-20-bize-sat-audit-report.md` - Audit results (TBD)

---

## ⏰ Timeline

```
09:00 - Setup & Prerequisites
09:30 - Phase 1: Auth tests
10:00 - Phase 2: Bize-Sat tests
10:30 - Phase 3: Offer tests
11:00 - Phase 4: Admin tests
11:30 - Bize-Sat Audit
12:30 - Report compilation
13:00 - Final Summary
```

---

## 👤 Audience

- **Developers:** Use these tests during development
- **QA:** Run full suite before release
- **DevOps:** Include in CI/CD pipeline
- **Product:** Use results for feature prioritization

---

**Status:** 🟢 Ready to execute  
**Last Updated:** 2026-09-20  
**Next Review:** After test execution
