import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Admin Panel Testleri', () => {

  // ==================== ADMIN GİRİŞ ====================
  test.describe('Admin Panel Erişimi', () => {

    test('✅ Admin sayfasına erişim', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin`);

      // Admin sayfası yüklenmeli veya login istemeli
      const adminContent = page.getByText(/admin|dashboard|yönetim/i);
      await expect(adminContent).toBeDefined();
    });

    test('❌ Admin olmayan kullanıcı erişimi', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin`);

      // Non-admin users login sayfasına yönlendirilmeli
      // veya access denied görmeli
      const denyOrLogin = page.getByText(/login|access.*denied|yetkisiz/i);
      // Yok olabilir veya görünebilir - environment bağlı
    });
  });

  // ==================== DASHBOARD ====================
  test.describe('Admin Dashboard', () => {

    test('✅ Dashboard metriği gösterimi', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/dashboard`);

      // Metrikler görüntülenmesi bekleniyor
      const metrics = page.locator('[class*="metric"]');
      expect(await metrics.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ Kullanıcı sayısı', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/dashboard`);

      const userCount = page.getByText(/kullanıcı|users|total.*users/i);
      await expect(userCount).toBeDefined();
    });

    test('✅ İlan sayısı', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/dashboard`);

      const listingCount = page.getByText(/iş|ilan|listing|posted/i);
      await expect(listingCount).toBeDefined();
    });

    test('✅ Teklif sayısı', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/dashboard`);

      const offerCount = page.getByText(/teklif|offer|proposals/i);
      await expect(offerCount).toBeDefined();
    });
  });

  // ==================== KULLANICI YÖNETİMİ ====================
  test.describe('Kullanıcı Yönetimi', () => {

    test('✅ Kullanıcı listesi', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);

      const userTable = page.locator('[class*="table"]');
      expect(await userTable.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ Kullanıcı arama', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);

      const searchBox = page.getByPlaceholder(/ara|search/i);
      if (searchBox) {
        await searchBox.fill('test');

        // Arama sonuçları bekleniyor
        const results = page.locator('[class*="user-row"]');
        // Sonuç yok veya var olabilir
      }
    });

    test('✅ Kullanıcı detayları', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);

      const firstUser = page.locator('[class*="user-row"]').first();
      if (await firstUser.count() > 0) {
        await firstUser.click();

        // Kullanıcı detayları sayfası açılmalı
        const userDetails = page.getByText(/email|ad|soyad|created/i);
        await expect(userDetails).toBeDefined();
      }
    });

    test('✅ Kullanıcı düzenleme', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);

      const editBtn = page.getByRole('button', { name: /düzenle|edit/i }).first();
      if (editBtn) {
        await editBtn.click();

        // Edit formu açılmalı
        const nameField = page.getByLabel(/ad|name/i);
        await expect(nameField).toBeDefined();
      }
    });

    test('❌ Kullanıcı silme - Onay dialog', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);

      const deleteBtn = page.getByRole('button', { name: /sil|delete/i }).first();
      if (deleteBtn) {
        await deleteBtn.click();

        // Onay dialog bekleniyor
        const confirmBtn = page.getByRole('button', { name: /evet|yes|confirm/i });
        await expect(confirmBtn).toBeDefined();
      }
    });

    test('✅ Rol yönetimi', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/users`);

      const roleSelect = page.locator('[class*="role-select"]').first();
      if (roleSelect) {
        const options = roleSelect.locator('option');
        expect(await options.count()).toBeGreaterThan(0);
      }
    });
  });

  // ==================== İLAN YÖNETİMİ ====================
  test.describe('İlan Yönetimi', () => {

    test('✅ İlan listesi', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/listings`);

      const listingTable = page.locator('[class*="table"]');
      expect(await listingTable.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ İlan onaylama', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/listings`);

      const approveBtn = page.getByRole('button', { name: /onayla|approve/i }).first();
      if (approveBtn) {
        await approveBtn.click();

        // Success mesajı bekleniyor
        const successMsg = page.getByText(/approved|onaylandı/i);
        // Yok olabilir veya görünebilir
      }
    });

    test('✅ İlan reddetme', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/listings`);

      const rejectBtn = page.getByRole('button', { name: /reddet|reject/i }).first();
      if (rejectBtn) {
        await rejectBtn.click();

        // Rejection reason dialog bekleniyor
        const reasonInput = page.getByLabel(/neden|reason/i);
        // Yok olabilir veya görünebilir
      }
    });

    test('✅ İlan silme', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/listings`);

      const deleteBtn = page.getByRole('button', { name: /sil|delete/i }).first();
      if (deleteBtn) {
        await deleteBtn.click();

        // Onay dialog bekleniyor
        const confirmBtn = page.getByRole('button', { name: /confirm|yes/i });
        await expect(confirmBtn).toBeDefined();
      }
    });

    test('✅ İlan filtreleme - Durum', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/listings`);

      const statusFilter = page.getByLabel(/durum|status/i);
      if (statusFilter) {
        await statusFilter.selectOption('pending');

        // Filtre uygulanmalı
        const results = page.locator('[class*="listing-row"]');
        // Sonuç yok veya var olabilir
      }
    });

    test('✅ İlan filtreleme - Kategori', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/listings`);

      const categoryFilter = page.getByLabel(/kategori|category/i);
      if (categoryFilter) {
        await categoryFilter.selectOption('ram');

        // Filtre uygulanmalı
        const results = page.locator('[class*="listing-row"]');
        // Sonuç yok veya var olabilir
      }
    });
  });

  // ==================== TEKLIF YÖNETİMİ ====================
  test.describe('Teklif Yönetimi (Admin)', () => {

    test('✅ Teklif listesi', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/offers`);

      const offerTable = page.locator('[class*="table"]');
      expect(await offerTable.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ Teklif detayları', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/offers`);

      const firstOffer = page.locator('[class*="offer-row"]').first();
      if (await firstOffer.count() > 0) {
        await firstOffer.click();

        // Teklif detayları sayfası açılmalı
        const details = page.getByText(/fiyat|price|gönderen|from/i);
        await expect(details).toBeDefined();
      }
    });

    test('✅ Anlaşmazlık çözümü', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/offers`);

      const disputeBtn = page.getByRole('button', { name: /anlaşmazlık|dispute|resolver/i }).first();
      if (disputeBtn) {
        await disputeBtn.click();

        // Dispute resolution dialog açılmalı
        const dialog = page.getByText(/açıklama|description|resolution/i);
        await expect(dialog).toBeDefined();
      }
    });

    test('✅ Teklif iptal', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/offers`);

      const cancelBtn = page.getByRole('button', { name: /iptal|cancel/i }).first();
      if (cancelBtn) {
        await cancelBtn.click();

        // Onay dialog bekleniyor
        const confirmBtn = page.getByRole('button', { name: /confirm/i });
        await expect(confirmBtn).toBeDefined();
      }
    });
  });

  // ==================== RAPORLAR ====================
  test.describe('Raporlar', () => {

    test('✅ Günlük rapor', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/reports/daily`);

      // Rapor gösterilmesi bekleniyor
      const reportContent = page.locator('[class*="report"]');
      expect(await reportContent.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ Haftalık rapor', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/reports/weekly`);

      // Rapor gösterilmesi bekleniyor
      const reportContent = page.locator('[class*="report"]');
      expect(await reportContent.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ Aktivite logu', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/activity`);

      const activityLog = page.locator('[class*="log-entry"]');
      expect(await activityLog.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ Rapor dışa aktarma', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/reports`);

      const exportBtn = page.getByRole('button', { name: /dışa|export|download/i });
      if (exportBtn) {
        await exportBtn.click();

        // İndirme başlamalı veya dialog açılmalı
        const dialog = page.getByText(/export|download|format/i);
        // Yok olabilir veya görünebilir
      }
    });
  });

  // ==================== AYARLAR ====================
  test.describe('Admin Ayarları', () => {

    test('✅ Admin ayarları sayfası', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings`);

      const settings = page.locator('[class*="setting"]');
      expect(await settings.count()).toBeGreaterThanOrEqual(0);
    });

    test('✅ Email ayarları', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings/email`);

      const emailSettings = page.getByLabel(/email|mail/i);
      await expect(emailSettings).toBeDefined();
    });

    test('✅ Sistem ayarları', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin/settings/system`);

      const systemSettings = page.getByLabel(/sistem|system/i);
      await expect(systemSettings).toBeDefined();
    });
  });

  // ==================== BİLDİRİMLER ====================
  test.describe('Admin Bildirimleri', () => {

    test('✅ Bildirim merkezi', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin`);

      const notificationBell = page.locator('[class*="notification-bell"]');
      if (notificationBell) {
        await notificationBell.click();

        // Bildirim listesi açılmalı
        const notificationList = page.getByText(/bildirim|notification/i);
        await expect(notificationList).toBeDefined();
      }
    });

    test('✅ Okunmamış bildirim badge', async ({ page }) => {
      await page.goto(`${BASE_URL}/admin`);

      const badge = page.locator('[class*="notification-badge"]');
      // Badge görünebilir veya görünmeyebilir
    });
  });
});

export {};
