import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../../utils/requireAdmin';

// POST - Stok güncelleme
export async function POST(request: NextRequest) {
  try {
    ensureAdminRequest(request);

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

    // Ürünü bul
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ürün bulunamadı',
          message: 'Belirtilen ID\'ye sahip ürün bulunamadı'
        },
        { status: 404 }
      );
    }

    const previousStock = product.stock;
    let newStock = previousStock;

    // Stok değişimini hesapla
    switch (changeType) {
      case 'add':
        newStock = previousStock + parseInt(changeAmount);
        break;
      case 'remove':
        newStock = Math.max(0, previousStock - parseInt(changeAmount));
        break;
      case 'set':
        newStock = Math.max(0, parseInt(changeAmount));
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

    // Ürün stokunu güncelle
    product.stock = newStock;
    await product.save();

    // Stok geçmişini kaydet (opsiyonel - ayrı bir collection'da tutulabilir)
    const stockUpdate = {
      productId: product._id,
      productName: product.name,
      changeType,
      previousStock,
      newStock,
      changeAmount: newStock - previousStock,
      reason: reason || 'Stok güncellendi',
      updatedBy: 'admin', // Gerçek uygulamada kullanıcı ID'si
      updatedAt: new Date()
    };

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
