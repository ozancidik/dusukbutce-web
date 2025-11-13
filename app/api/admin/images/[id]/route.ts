import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../../utils/requireAdmin';

// GET - Ürün görsellerini getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { id } = await params;
    
    const product = await Product.findById(id)
      .select('_id name brand productModel category images');
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      product: {
        _id: product._id,
        name: product.name,
        brand: product.brand,
        productModel: product.productModel,
        category: product.category,
        images: product.images
      },
      message: 'Ürün görselleri başarıyla getirildi'
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Ürün görselleri getirme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Görseller getirilemedi' },
      { status: 500 }
    );
  }
}

// PUT - Ürün görsellerini güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    const { images, action, imageIndex, uploadedBy } = body;
    
    // Validasyon
    if (!uploadedBy) {
      return NextResponse.json(
        { success: false, message: 'Yükleyen kişi bilgisi gereklidir' },
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
    
    let updatedImages = [...product.images];
    let message = '';
    
    switch (action) {
      case 'replace':
        // Tüm görselleri değiştir
        if (!images || !Array.isArray(images)) {
          return NextResponse.json(
            { success: false, message: 'Görsel listesi gereklidir' },
            { status: 400 }
          );
        }
        
        const validImages = images.filter(img => 
          img.startsWith('data:image/') || img.startsWith('http')
        );
        
        if (validImages.length === 0) {
          return NextResponse.json(
            { success: false, message: 'Geçerli görsel formatı bulunamadı' },
            { status: 400 }
          );
        }
        
        if (validImages.length > 20) {
          return NextResponse.json(
            { success: false, message: 'Maksimum 20 görsel yüklenebilir' },
            { status: 400 }
          );
        }
        
        updatedImages = validImages;
        message = `Tüm görseller değiştirildi (${validImages.length} adet)`;
        break;
        
      case 'add':
        // Görsel ekle
        if (!images || !Array.isArray(images)) {
          return NextResponse.json(
            { success: false, message: 'Görsel listesi gereklidir' },
            { status: 400 }
          );
        }
        
        const newValidImages = images.filter(img => 
          img.startsWith('data:image/') || img.startsWith('http')
        );
        
        if (newValidImages.length === 0) {
          return NextResponse.json(
            { success: false, message: 'Geçerli görsel formatı bulunamadı' },
            { status: 400 }
          );
        }
        
        if (updatedImages.length + newValidImages.length > 20) {
          return NextResponse.json(
            { success: false, message: 'Maksimum 20 görsel yüklenebilir' },
            { status: 400 }
          );
        }
        
        updatedImages = [...updatedImages, ...newValidImages];
        message = `${newValidImages.length} görsel eklendi`;
        break;
        
      case 'remove':
        // Görsel sil
        if (imageIndex === undefined || imageIndex < 0 || imageIndex >= updatedImages.length) {
          return NextResponse.json(
            { success: false, message: 'Geçersiz görsel indeksi' },
            { status: 400 }
          );
        }
        
        updatedImages.splice(imageIndex, 1);
        message = 'Görsel silindi';
        break;
        
      case 'reorder':
        // Görsel sıralamasını değiştir
        if (!images || !Array.isArray(images)) {
          return NextResponse.json(
            { success: false, message: 'Yeni sıralama listesi gereklidir' },
            { status: 400 }
          );
        }
        
        if (images.length !== updatedImages.length) {
          return NextResponse.json(
            { success: false, message: 'Görsel sayısı eşleşmiyor' },
            { status: 400 }
          );
        }
        
        updatedImages = images;
        message = 'Görsel sıralaması güncellendi';
        break;
        
      default:
        return NextResponse.json(
          { success: false, message: 'Geçersiz işlem tipi' },
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
        images: product.images
      },
      message
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Görsel güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Görseller güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Tüm görselleri sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { id } = await params;
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Ürün bulunamadı' },
        { status: 404 }
      );
    }
    
    const imageCount = product.images.length;
    product.images = [];
    await product.save();
    
    return NextResponse.json({
      success: true,
      message: `${imageCount} görsel silindi`
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Görsel silme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Görseller silinemedi' },
      { status: 500 }
    );
  }
}
