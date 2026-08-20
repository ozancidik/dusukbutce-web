import connectDB from './mongodb';
import Counter from '@/models/Counter';

/**
 * Verilen sayaç adı için bir sonraki sırayı atomik olarak döndürür.
 * findOneAndUpdate + $inc, eşzamanlı isteklerde aynı numaranın iki kez
 * üretilmesini (race condition) engeller — "en son kaydı bul, +1 yap"
 * yönteminin aksine, artış veritabanı seviyesinde tek adımda gerçekleşir.
 */
async function getNextSequence(counterName: string): Promise<number> {
  await connectDB();
  const counter = await Counter.findByIdAndUpdate(
    counterName,
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );
  return counter.seq;
}

/**
 * Teklif numarası oluşturur (OFFER-2024-001234 formatında)
 */
export async function generateOfferNumber(): Promise<string> {
  try {
    const year = new Date().getFullYear();
    const sequence = await getNextSequence(`offer-${year}`);
    const sequenceStr = sequence.toString().padStart(6, '0');
    return `OFFER-${year}-${sequenceStr}`;
  } catch (error) {
    console.error('Teklif numarası oluşturma hatası:', error);
    // Hata durumunda timestamp bazlı fallback
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `OFFER-${year}-${timestamp}`;
  }
}

/**
 * Sipariş numarası oluşturur (ORDER-2024-001234 formatında)
 */
export async function generateOrderNumber(): Promise<string> {
  try {
    const year = new Date().getFullYear();
    const sequence = await getNextSequence(`order-${year}`);
    const sequenceStr = sequence.toString().padStart(6, '0');
    return `ORDER-${year}-${sequenceStr}`;
  } catch (error) {
    console.error('Sipariş numarası oluşturma hatası:', error);
    // Hata durumunda timestamp bazlı fallback
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `ORDER-${year}-${timestamp}`;
  }
}

/**
 * Talep numarası oluşturur (TLP-2024-000123 formatında) — bir satış talebi
 * (submission) oluşturulduğu anda, admin henüz hiçbir işlem yapmadan atanır.
 * Böylece müşteri "Teklif Al" dediği anda elinde bir takip numarası olur.
 */
export async function generateSubmissionNumber(): Promise<string> {
  try {
    const year = new Date().getFullYear();
    const sequence = await getNextSequence(`submission-${year}`);
    const sequenceStr = sequence.toString().padStart(6, '0');
    return `TLP-${year}-${sequenceStr}`;
  } catch (error) {
    console.error('Talep numarası oluşturma hatası:', error);
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `TLP-${year}-${timestamp}`;
  }
}
