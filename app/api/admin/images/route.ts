import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../utils/requireAdmin';
import { parsePagination } from '@/lib/pagination';

// GET - Ürün görsellerini getir
export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const { page, limit } = parsePagination(searchParams);

    let query: any = {};
    
    if (productId) {
      query._id = productId;
    }
    
    const skip = (page - 1) * limit;
    
    const [products, totalCount] = await Promise.all([
      Product.find(query)
        .select('_id name brand productModel category images')
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query)
    ]);
    
    // Görsel istatistikleri
    const stats = await Product.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalImages: { $sum: { $size: '$images' } },
          productsWithImages: {
            $sum: {
              $cond: [{ $gt: [{ $size: '$images' }, 0] }, 1, 0]
            }
          },
          productsWithoutImages: {
            $sum: {
              $cond: [{ $eq: [{ $size: '$images' }, 0] }, 1, 0]
            }
          },
          averageImagesPerProduct: {
            $avg: { $size: '$images' }
          }
        }
      }
    ]);
    
    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      },
      stats: stats[0] || {
        totalProducts: 0,
        totalImages: 0,
        productsWithImages: 0,
        productsWithoutImages: 0,
        averageImagesPerProduct: 0
      },
      message: 'Ürün görselleri başarıyla getirildi'
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Görsel getirme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Görseller getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Toplu görsel yükleme
export async function POST(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const body = await request.json();
    const { productId, images, uploadedBy } = body;
    
    // Validasyon
    if (!productId) {
      return NextResponse.json(
        { success: false, message: 'Ürün ID gereklidir' },
        { status: 400 }
      );
    }
    
    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Görsel listesi gereklidir' },
        { status: 400 }
      );
    }
    
    if (!uploadedBy) {
      return NextResponse.json(
        { success: false, message: 'Yükleyen kişi bilgisi gereklidir' },
        { status: 400 }
      );
    }
    
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    // Görsel format kontrolü
    const validImages = images.filter(img => 
      img.startsWith('data:image/') || img.startsWith('http')
    );
    
    if (validImages.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Geçerli görsel formatı bulunamadı' },
        { status: 400 }
      );
    }
    
    // Mevcut görsellerle birleştir
    const updatedImages = [...product.images, ...validImages];
    
    // Maksimum görsel sayısı kontrolü (20 adet)
    if (updatedImages.length > 20) {
      return NextResponse.json(
        { success: false, message: 'Maksimum 20 görsel yüklenebilir' },
        { status: 400 }
      );
    }
    
    // Ürünü güncelle
    product.images = updatedImages;
    await product.save();
    
    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        productModel: product.productModel,
        totalImages: product.images.length,
        newImages: validImages.length
      },
      message: `${validImages.length} görsel başarıyla yüklendi`
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Görsel yükleme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Görseller yüklenemedi' },
      { status: 500 }
    );
  }
}
