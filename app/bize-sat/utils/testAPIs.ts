/**
 * Bize-Sat sayfaları için API test utility
 * Browser konsolunda çalıştırılabilir: testAllSubmissions()
 */

const BASE_URL = window.location.origin;

// Tüm bize-sat sayfaları ve API endpoint'leri
export const testPages = [
  { category: 'notebook', apiEndpoint: '/api/notebook-submissions', path: '/bize-sat/notebook' },
  { category: 'playstation', apiEndpoint: '/api/submissions', path: '/bize-sat/playstation' },
  { category: 'xbox', apiEndpoint: '/api/submissions', path: '/bize-sat/xbox' },
  { category: 'gamepad', apiEndpoint: '/api/submissions', path: '/bize-sat/gamepad' },
  { category: 'cep-telefonu', apiEndpoint: '/api/submissions', path: '/bize-sat/cep-telefonu' },
  { category: 'yazici', apiEndpoint: '/api/submissions', path: '/bize-sat/yazici' },
  { category: 'tarayici', apiEndpoint: '/api/submissions', path: '/bize-sat/tarayici' },
  { category: 'fotokopi-makinesi', apiEndpoint: '/api/submissions', path: '/bize-sat/fotokopi-makinesi' },
  { category: 'masaustu', apiEndpoint: '/api/notebook-submissions', path: '/bize-sat/masaustu' },
  { category: 'direksiyon', apiEndpoint: '/api/notebook-submissions', path: '/bize-sat/direksiyon' },
  { category: 'ekran-karti', apiEndpoint: '/api/graphics-card-submissions', path: '/bize-sat/ekran-karti' },
  { category: 'islemci', apiEndpoint: '/api/processor-submissions', path: '/bize-sat/islemci' },
  { category: 'ram', apiEndpoint: '/api/ram-submissions', path: '/bize-sat/ram' },
  { category: 'ssd', apiEndpoint: '/api/ssd-submissions', path: '/bize-sat/ssd' },
  { category: 'sogutucu', apiEndpoint: '/api/cooler-submissions', path: '/bize-sat/sogutucu' },
  { category: 'kasa', apiEndpoint: '/api/case-submissions', path: '/bize-sat/kasa' },
  { category: 'monitor', apiEndpoint: '/api/monitor-submissions', path: '/bize-sat/monitor' },
  { category: 'klavye', apiEndpoint: '/api/keyboard-submissions', path: '/bize-sat/klavye' },
  { category: 'mouse', apiEndpoint: '/api/mouse-submissions', path: '/bize-sat/mouse' },
  { category: 'tablet', apiEndpoint: '/api/tablet-submissions', path: '/bize-sat/tablet' },
  { category: 'kulaklik', apiEndpoint: '/api/headphones-submissions', path: '/bize-sat/kulaklik' },
  { category: 'ses-sistemi', apiEndpoint: '/api/audio-system-submissions', path: '/bize-sat/ses-sistemi' },
  { category: 'gaming-direksiyon', apiEndpoint: '/api/gaming-wheel-submissions', path: '/bize-sat/gaming-direksiyon' }
];

// Test için minimum form data
function getTestFormData(category: string): any {
  const baseData = {
    brand: 'Test Brand',
    model: 'Test Model',
    cosmeticCondition: 'Mükemmel',
    description: 'Test açıklama',
    hasBox: false,
    hasInvoice: false,
    hasWarranty: false,
    quantity: 1,
    images: []
  };

  // Category-specific data
  const categoryData: Record<string, any> = {
    'playstation': { brand: 'Sony', model: 'PS5' },
    'xbox': { brand: 'xbox', model: 'Series X' },
    'gamepad': { brand: 'Gamepad', model: 'Test' },
    'notebook': { brand: 'Asus', model: 'Vivobook' },
    'masaustu': { brand: 'Dell', model: 'Optiplex' },
    'direksiyon': { brand: 'Logitech', model: 'G29' },
    'ekran-karti': { brand: 'NVIDIA', model: 'RTX 3060' },
    'islemci': { brand: 'Intel', model: 'i7-9700K' },
    'ram': { brand: 'Corsair', model: '16GB' },
    'ssd': { brand: 'Samsung', model: '980 PRO' },
    'sogutucu': { brand: 'Cooler Master', model: 'Hyper 212' },
    'kasa': { brand: 'NZXT', model: 'H510' },
    'monitor': { brand: 'LG', model: '27GL850' },
    'klavye': { brand: 'Corsair', model: 'K70' },
    'mouse': { brand: 'Logitech', model: 'G502' },
    'tablet': { brand: 'Apple', model: 'iPad Pro' },
    'kulaklik': { brand: 'Sony', model: 'WH-1000XM4' },
    'ses-sistemi': { brand: 'Sony', model: 'HT-Z9F' },
    'gaming-direksiyon': { brand: 'Logitech', model: 'G920' },
    'cep-telefonu': { brand: 'Apple', model: 'iPhone 13' },
    'yazici': { brand: 'HP', model: 'LaserJet' },
    'tarayici': { brand: 'Canon', model: 'LiDE 400' },
    'fotokopi-makinesi': { brand: 'Xerox', model: 'WorkCentre' }
  };

  return { ...baseData, ...(categoryData[category] || {}) };
}

// API test fonksiyonu
export async function testAPI(endpoint: string, category: string, token: string | null = null) {
  const formData = getTestFormData(category);
  
  const body = {
    ...formData,
    category,
    cosmeticCondition: formData.cosmeticCondition || 'Mükemmel'
  };

  try {
    console.log(`\n🧪 Testing: ${category} -> ${endpoint}`);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 saniye timeout

    const startTime = Date.now();
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const duration = Date.now() - startTime;

    const responseData = await response.json().catch(() => ({ message: 'Response parse hatası' }));

    if (response.ok) {
      console.log(`✅ ${category}: SUCCESS (${duration}ms)`);
      return { success: true, category, duration, data: responseData };
    } else {
      console.log(`❌ ${category}: FAILED (${response.status}) - ${responseData.message || 'Bilinmeyen hata'}`);
      return { success: false, category, status: response.status, error: responseData.message || 'Bilinmeyen hata' };
    }
  } catch (error: any) {
    console.log(`❌ ${category}: ERROR - ${error.message}`);
    return { success: false, category, error: error.message };
  }
}

// Ana test fonksiyonu - Browser konsolunda çalıştırılabilir
export async function testAllSubmissions() {
  console.log('🚀 Bize-Sat API Test Otomasyonu Başlatılıyor...');
  console.log(`📍 Base URL: ${BASE_URL}\n`);

  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('⚠️ Token bulunamadı, bazı testler başarısız olabilir.');
  }

  const results = [];
  
  for (const page of testPages) {
    const result = await testAPI(page.apiEndpoint, page.category, token);
    results.push(result);
    // Her test arasında kısa bir bekleme
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // Sonuçları özetle
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SONUÇLARI');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ Başarılı: ${successful.length}/${results.length}`);
  if (successful.length > 0) {
    console.log('Başarılı Testler:');
    successful.forEach(r => {
      console.log(`  - ${r.category}: ${r.duration}ms`);
    });
  }

  console.log(`\n❌ Başarısız: ${failed.length}/${results.length}`);
  if (failed.length > 0) {
    console.log('Başarısız Testler:');
    failed.forEach(r => {
      console.log(`  - ${r.category}: ${r.error || `Status ${r.status}`}`);
    });
  }

  console.log('\n' + '='.repeat(60));
  const totalDuration = results.reduce((sum, r) => sum + (r.duration || 0), 0);
  console.log(`Toplam Süre: ~${totalDuration}ms`);
  console.log('='.repeat(60) + '\n');

  return results;
}

// Browser global'e ekle (konsol'dan erişilebilir)
if (typeof window !== 'undefined') {
  (window as any).testBizeSatAPIs = testAllSubmissions;
  (window as any).testBizeSatAPI = testAPI;
  console.log('✅ Test fonksiyonları yüklendi. Konsol\'da şu komutları kullanabilirsiniz:');
  console.log('  - testBizeSatAPIs() : Tüm API\'leri test et');
  console.log('  - testBizeSatAPI(endpoint, category, token) : Tek bir API test et');
}
