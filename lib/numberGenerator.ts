import connectDB from './mongodb';
import ProductSubmission from '@/models/ProductSubmission';

/**
 * Teklif numarası oluşturur (OFFER-2024-001234 formatında)
 */
export async function generateOfferNumber(): Promise<string> {
  try {
    await connectDB();
    const year = new Date().getFullYear();
    const prefix = `OFFER-${year}-`;
    
    // Bu yılki en son teklif numarasını bul
    const lastOffer = await ProductSubmission.findOne({
      offerNumber: { $regex: `^${prefix}` }
    }).sort({ offerNumber: -1 });
    
    let sequence = 1;
    if (lastOffer?.offerNumber) {
      // Son numaradan sıra numarasını çıkar (OFFER-2024-001234 -> 1234)
      const lastSequence = parseInt(lastOffer.offerNumber.split('-')[2] || '0');
      sequence = lastSequence + 1;
    }
    
    // 6 haneli sıra numarası (001234)
    const sequenceStr = sequence.toString().padStart(6, '0');
    return `${prefix}${sequenceStr}`;
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
    await connectDB();
    const year = new Date().getFullYear();
    const prefix = `ORDER-${year}-`;
    
    // Bu yılki en son sipariş numarasını bul
    const lastOrder = await ProductSubmission.findOne({
      orderNumber: { $regex: `^${prefix}` }
    }).sort({ orderNumber: -1 });
    
    let sequence = 1;
    if (lastOrder?.orderNumber) {
      // Son numaradan sıra numarasını çıkar (ORDER-2024-001234 -> 1234)
      const lastSequence = parseInt(lastOrder.orderNumber.split('-')[2] || '0');
      sequence = lastSequence + 1;
    }
    
    // 6 haneli sıra numarası (001234)
    const sequenceStr = sequence.toString().padStart(6, '0');
    return `${prefix}${sequenceStr}`;
  } catch (error) {
    console.error('Sipariş numarası oluşturma hatası:', error);
    // Hata durumunda timestamp bazlı fallback
    const year = new Date().getFullYear();
    const timestamp = Date.now().toString().slice(-6);
    return `ORDER-${year}-${timestamp}`;
  }
}
