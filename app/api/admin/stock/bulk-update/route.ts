import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import StockHistory from '@/models/StockHistory';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../../utils/requireAdmin';

// POST - Toplu stok güncelleme
export async function POST(request: NextRequest) {
  try {
    const decoded = ensureAdminRequest(request);

    await connectDB();
    
    const body = await request.json();
    const {
      updates, // Array of { productId, changeType, changeAmount, reason }
      category, // Opsiyonel kategori filtresi
      changeType, // Tüm ürünler için aynı değişim türü
      changeAmount, // Tüm ürünler için aynı miktar
      reason
    } = body;

    if (!updates && (!changeType || changeAmount === undefined)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gerekli alanlar eksik',
          message: 'Güncelleme verileri veya toplu güncelleme parametreleri gerekli'
        },
        { status: 400 }
      );
    }

    let productsToUpdate = [];
    let bulkUpdates = [];

    if (updates && Array.isArray(updates)) {
      // Belirli ürünler için güncelleme
      for (const update of updates) {
        const product = await Product.findById(update.productId);
        if (product) {
          productsToUpdate.push({ product, update });
        }
      }
    } else {
      // Kategori veya tüm ürünler için toplu güncelleme
      const filter: any = {};
      if (category && category !== 'all') {
        filter.category = category;
      }
      
      const products = await Product.find(filter);
      productsToUpdate = products.map(product => ({
        product,
        update: {
          changeType,
          changeAmount: parseInt(changeAmount),
          reason: reason || 'Toplu stok güncelleme'
        }
      }));
    }

    const results = [];
    const errors = [];

    for (const { product, update } of productsToUpdate) {
      try {
        const previousStock = product.stock;
        const delta = parseInt(update.changeAmount);

        // Aggregation-pipeline update: atomik, aynı üründe eşzamanlı
        // istekler olsa da kayıp güncelleme olmaz (bkz. admin/stock/update).
        let pipelineStage: Record<string, unknown>;
        switch (update.changeType) {
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
            errors.push({
              productId: product._id,
              productName: product.name,
              error: 'Geçersiz değişim türü'
            });
            continue;
        }

        const updated = await Product.findByIdAndUpdate(
          product._id,
          [{ $set: pipelineStage }],
          { new: true }
        );
        if (!updated) {
          errors.push({
            productId: product._id,
            productName: product.name,
            error: 'Ürün güncellenemedi'
          });
          continue;
        }
        const newStock = updated.stock;

        await StockHistory.create({
          productId: product._id,
          productName: product.name,
          changeType: update.changeType,
          previousStock,
          newStock,
          changeAmount: newStock - previousStock,
          reason: update.reason || 'Toplu stok güncelleme',
          updatedBy: decoded.email || 'admin',
        });

        results.push({
          productId: product._id,
          productName: product.name,
          previousStock,
          newStock,
          changeAmount: newStock - previousStock,
          changeType: update.changeType,
          reason: update.reason
        });
      } catch (error) {
        errors.push({
          productId: product._id,
          productName: product.name,
          error: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `${results.length} ürün başarıyla güncellendi`,
      results,
      errors,
      summary: {
        total: productsToUpdate.length,
        successful: results.length,
        failed: errors.length
      }
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Toplu stok güncelleme hatası:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Toplu stok güncelleme sırasında bir hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}
