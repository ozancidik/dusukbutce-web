import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import StockHistory from '@/models/StockHistory';
import { AdminAuthError, ensureFullAdminRequest, handleAdminAuthError } from '../../utils/requireAdmin';

// POST - Stok güncelleme
export async function POST(request: NextRequest) {
  try {
    const decoded = ensureFullAdminRequest(request);

    await connectDB();
    
    const body = await request.json();
    const {
      productId,
      changeType, // 'add', 'remove', 'set'
      changeAmount,
      reason
    } = body;

    if (!productId || !changeType || changeAmount === undefined) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gerekli alanlar eksik',
          message: 'Ürün ID, değişim türü ve miktar gerekli'
        },
        { status: 400 }
      );
    }

    const delta = parseInt(changeAmount);

    // Aggregation-pipeline update: MongoDB'de tek atomik adımda uygulanır.
    // Önceki kod findById + save() ile okuyup yazıyordu — eşzamanlı istekler
    // aynı "eski" değeri okuyup üstüne yazınca artışların çoğu kayboluyordu
    // (canlı testte 10 eşzamanlı "+1" isteği sonunda stock sadece 2 arttı).
    let pipelineStage: Record<string, unknown>;
    switch (changeType) {
      case 'add':
        pipelineStage = { stock: { $add: ['$stock', delta] } };
        break;
      case 'remove':
        pipelineStage = { stock: { $max: [0, { $subtract: ['$stock', delta] }] } };
        break;
      case 'set':
        pipelineStage = { stock: Math.max(0, delta) };
        break;
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Geçersiz değişim türü',
            message: 'Değişim türü add, remove veya set olmalı'
          },
          { status: 400 }
        );
    }

    // Sadece varlık kontrolü + "önceki" değeri raporlamak için okunuyor;
    // gerçek güncelleme aşağıdaki atomik pipeline ile yapılıyor.
    const existing = await Product.findById(productId).select('name stock');
    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: 'Ürün bulunamadı',
          message: 'Belirtilen ID\'ye sahip ürün bulunamadı'
        },
        { status: 404 }
      );
    }
    const previousStock = existing.stock;

    const product = await Product.findByIdAndUpdate(
      productId,
      [{ $set: pipelineStage }],
      { new: true }
    );
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Ürün bulunamadı', message: 'Belirtilen ID\'ye sahip ürün bulunamadı' },
        { status: 404 }
      );
    }
    const newStock = product.stock;

    // Stok geçmişini kaydet
    const stockUpdate = await StockHistory.create({
      productId: product._id,
      productName: product.name,
      changeType,
      previousStock,
      newStock,
      changeAmount: newStock - previousStock,
      reason: reason || 'Stok güncellendi',
      updatedBy: decoded.email || 'admin',
    });

    return NextResponse.json({
      success: true,
      message: 'Stok başarıyla güncellendi',
      product: {
        _id: product._id,
        name: product.name,
        previousStock,
        newStock,
        changeAmount: newStock - previousStock
      },
      stockUpdate
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Stok güncellenirken hata:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Stok güncellenirken bir hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}
