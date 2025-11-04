import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import PriceHistory from '@/models/PriceHistory';
import mongoose from 'mongoose';

// GET - Ürün fiyat geçmişi
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    const history = await PriceHistory.find({ productId: id }).sort({ changedAt: -1 });
    const stats = await PriceHistory.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: null,
          totalChanges: { $sum: 1 },
          averagePrice: { $avg: '$newPrice' },
          minPrice: { $min: '$newPrice' },
          maxPrice: { $max: '$newPrice' },
          lastChange: { $max: '$changedAt' },
          firstChange: { $min: '$changedAt' }
        }
      }
    ]);
    
    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        productModel: product.productModel,
        currentPrice: product.price,
        category: product.category
      },
      history,
      stats: stats[0] || null,
      message: 'Ürün fiyat geçmişi başarıyla getirildi'
    });
    
  } catch (error) {
    console.error('Ürün fiyat geçmişi getirme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Fiyat geçmişi getirilemedi' },
      { status: 500 }
    );
  }
}

// PUT - Ürün fiyatını güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    const { newPrice, changeReason, changedBy } = body;
    
    // Validasyon
    if (newPrice === undefined || newPrice === null) {
      return NextResponse.json(
        { success: false, message: 'Yeni fiyat gereklidir' },
        { status: 400 }
      );
    }
    
    if (newPrice < 0) {
      return NextResponse.json(
        { success: false, message: 'Fiyat negatif olamaz' },
        { status: 400 }
      );
    }
    
    if (!changedBy) {
      return NextResponse.json(
        { success: false, message: 'Değiştiren kişi bilgisi gereklidir' },
        { status: 400 }
      );
    }
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    const oldPrice = product.price;
    const roundedNewPrice = Math.round(newPrice * 100) / 100;
    
    // Fiyat değişmediyse
    if (oldPrice === roundedNewPrice) {
      return NextResponse.json(
        { success: false, message: 'Fiyat değişmedi' },
        { status: 400 }
      );
    }
    
    // Fiyatı güncelle
    product.price = roundedNewPrice;
    await product.save();
    
    // Fiyat geçmişine kaydet
    const priceHistory = new PriceHistory({
      productId: id,
      oldPrice,
      newPrice: roundedNewPrice,
      changeType: 'manual',
      changeReason: changeReason || 'Manuel fiyat güncelleme',
      changedBy,
      metadata: {
        changeAmount: roundedNewPrice - oldPrice,
        changePercentage: oldPrice > 0 ? ((roundedNewPrice - oldPrice) / oldPrice) * 100 : 0
      }
    });
    
    await priceHistory.save();
    
    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        oldPrice,
        newPrice: roundedNewPrice,
        change: roundedNewPrice - oldPrice,
        changePercentage: oldPrice > 0 ? ((roundedNewPrice - oldPrice) / oldPrice) * 100 : 0
      },
      message: 'Fiyat başarıyla güncellendi'
    });
    
  } catch (error) {
    console.error('Fiyat güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Fiyat güncellenemedi' },
      { status: 500 }
    );
  }
}
