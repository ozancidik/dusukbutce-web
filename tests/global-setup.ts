// Playwright globalSetup — her `npx playwright test` çalıştırmasından önce
// bir kez çalışır. Admin işlemleri (teklif ver/reddet/sil) ve kullanıcı
// aksiyonları (kabul/red) gerçekten DB'yi kalıcı olarak değiştiriyor —
// seed olmadan ikinci bir test run'ı ilk run'ın bıraktığı durumu görür
// (ör. TEST-PENDING-001 zaten 'offered' olmuş olabilir). Her run'ı
// bilinen, temiz bir başlangıç durumundan başlatmak için seed'i burada
// çalıştırıyoruz.
import seedDatabase from '../scripts/seed-e2e';

export default async function globalSetup() {
  await seedDatabase();
}
