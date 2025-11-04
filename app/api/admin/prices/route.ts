import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import PriceHistory from '@/models/PriceHistory';

// GET - Fiyat geçmişi ve istatistikleri getir
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const changeType = searchParams.get('changeType');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    
    let query: any = {};
    
    if (productId) {
      query.productId = productId;
    }
    
    if (changeType) {
      query.changeType = changeType;
    }
    
    if (startDate && endDate) {
      query.changedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    const skip = (page - 1) * limit;
    
    const [history, totalCount] = await Promise.all([
      PriceHistory.find(query)
        .populate('productId', 'name brand productModel category')
        .sort({ changedAt: -1 })
        .skip(skip)
        .limit(limit),
      PriceHistory.countDocuments(query)
    ]);
    
    // Genel istatistikler
    const stats = await PriceHistory.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalChanges: { $sum: 1 },
          averageChange: { $avg: { $subtract: ['$newPrice', '$oldPrice'] } },
          totalIncrease: {
            $sum: {
              $cond: [
                { $gt: ['$newPrice', '$oldPrice'] },
                { $subtract: ['$newPrice', '$oldPrice'] },
                0
              ]
            }
          },
          totalDecrease: {
            $sum: {
              $cond: [
                { $lt: ['$newPrice', '$oldPrice'] },
                { $subtract: ['$oldPrice', '$newPrice'] },
                0
              ]
            }
          },
          increaseCount: {
            $sum: {
              $cond: [{ $gt: ['$newPrice', '$oldPrice'] }, 1, 0]
            }
          },
          decreaseCount: {
            $sum: {
              $cond: [{ $lt: ['$newPrice', '$oldPrice'] }, 1, 0]
            }
          }
        }
      }
    ]);
    
    return NextResponse.json({
      success: true,
      history,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      },
      stats: stats[0] || {
        totalChanges: 0,
        averageChange: 0,
        totalIncrease: 0,
        totalDecrease: 0,
        increaseCount: 0,
        decreaseCount: 0
      },
      message: 'Fiyat geçmişi başarıyla getirildi'
    });
    
  } catch (error) {
    console.error('Fiyat geçmişi getirme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Fiyat geçmişi getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Toplu fiyat güncelleme
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { 
      productIds, 
      updateType, 
      updateValue, 
      changeReason, 
      changedBy 
    } = body;
    
    // Validasyon
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Ürün listesi gereklidir' },
        { status: 400 }
      );
    }
    
    if (!updateType || !['fixed', 'percentage', 'multiply'].includes(updateType)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz güncelleme tipi' },
        { status: 400 }
      );
    }
    
    if (updateValue === undefined || updateValue === null) {
      return NextResponse.json(
        { success: false, message: 'Güncelleme değeri gereklidir' },
        { status: 400 }
      );
    }
    
    if (!changedBy) {
      return NextResponse.json(
        { success: false, message: 'Değiştiren kişi bilgisi gereklidir' },
        { status: 400 }
      );
    }
    
    const results = [];
    const errors = [];
    
    for (const productId of productIds) {
      try {
        const product = await Product.findById(productId);
        if (!product) {
          errors.push({ productId, error: 'Ürün bulunamadı' });
          continue;
        }
        
        const oldPrice = product.price;
        let newPrice = oldPrice;
        
        // Fiyat hesaplama
        switch (updateType) {
          case 'fixed':
            newPrice = oldPrice + updateValue;
            break;
          case 'percentage':
            newPrice = oldPrice * (1 + updateValue / 100);
            break;
          case 'multiply':
            newPrice = oldPrice * updateValue;
            break;
        }
        
        // Negatif fiyat kontrolü
        if (newPrice < 0) {
          errors.push({ productId, error: 'Fiyat negatif olamaz' });
          continue;
        }
        
        // Fiyatı güncelle
        product.price = Math.round(newPrice * 100) / 100; // 2 ondalık basamak
        await product.save();
        
        // Fiyat geçmişine kaydet
        const priceHistory = new PriceHistory({
          productId,
          oldPrice,
          newPrice: product.price,
          changeType: 'bulk',
          changeReason: changeReason || `Toplu fiyat güncelleme (${updateType})`,
          changedBy,
          metadata: {
            updateType,
            updateValue,
            originalValue: oldPrice
          }
        });
        
        await priceHistory.save();
        
        results.push({
          productId,
          productName: product.name,
          oldPrice,
          newPrice: product.price,
          change: product.price - oldPrice
        });
        
      } catch (error) {
        console.error(`Ürün ${productId} güncelleme hatası:`, error);
        errors.push({ 
          productId, 
          error: error instanceof Error ? error.message : 'Bilinmeyen hata' 
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      results,
      errors,
      summary: {
        total: productIds.length,
        successful: results.length,
        failed: errors.length
      },
      message: `${results.length} ürün başarıyla güncellendi`
    });
    
  } catch (error) {
    console.error('Toplu fiyat güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Toplu fiyat güncelleme başarısız' },
      { status: 500 }
    );
  }
}
