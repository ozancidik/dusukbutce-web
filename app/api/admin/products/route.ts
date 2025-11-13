import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../utils/requireAdmin';

// GET - Tüm ürünleri getir
export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .lean();
    
    return NextResponse.json({
      success: true,
      products: products
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Ürünler getirilirken hata:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ürünler getirilirken bir hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}

// POST - Yeni ürün oluştur
export async function POST(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const body = await request.json();
    const {
      name,
      category,
      brand,
      productModel,
      price,
      stock,
      description,
      images,
      specifications,
      status = 'draft'
    } = body;

    // Gerekli alanları kontrol et
    if (!name || !category || !brand || !productModel || !price || !description) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gerekli alanlar eksik',
          message: 'Ürün adı, kategori, marka, model, fiyat ve açıklama alanları zorunludur'
        },
        { status: 400 }
      );
    }

    // Fiyat ve stok kontrolü
    if (price < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Geçersiz fiyat',
          message: 'Fiyat negatif olamaz'
        },
        { status: 400 }
      );
    }

    if (stock < 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Geçersiz stok',
          message: 'Stok negatif olamaz'
        },
        { status: 400 }
      );
    }

    // Yeni ürün oluştur
    const newProduct = new Product({
      name: name.trim(),
      category: category.trim(),
      brand: brand.trim(),
      productModel: productModel.trim(),
      price: parseFloat(price),
      stock: parseInt(stock) || 0,
      description: description.trim(),
      images: images || [],
      specifications: specifications || {},
      status: status
    });

    await newProduct.save();

    return NextResponse.json({
      success: true,
      message: 'Ürün başarıyla oluşturuldu',
      product: newProduct
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Ürün oluşturulurken hata:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ürün oluşturulurken bir hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}

// PUT - Ürün güncelle
export async function PUT(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const body = await request.json();
    const {
      productId,
      name,
      category,
      brand,
      productModel,
      price,
      stock,
      description,
      images,
      specifications,
      status
    } = body;

    if (!productId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ürün ID gerekli',
          message: 'Güncellenecek ürünün ID\'si belirtilmelidir'
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

    // Güncelleme verilerini hazırla
    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (category !== undefined) updateData.category = category.trim();
    if (brand !== undefined) updateData.brand = brand.trim();
    if (productModel !== undefined) updateData.productModel = productModel.trim();
    if (price !== undefined) {
      if (price < 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Geçersiz fiyat',
            message: 'Fiyat negatif olamaz'
          },
          { status: 400 }
        );
      }
      updateData.price = parseFloat(price);
    }
    if (stock !== undefined) {
      if (stock < 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Geçersiz stok',
            message: 'Stok negatif olamaz'
          },
          { status: 400 }
        );
      }
      updateData.stock = parseInt(stock);
    }
    if (description !== undefined) updateData.description = description.trim();
    if (images !== undefined) updateData.images = images;
    if (specifications !== undefined) updateData.specifications = specifications;
    if (status !== undefined) updateData.status = status;

    // Ürünü güncelle
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      success: true,
      message: 'Ürün başarıyla güncellendi',
      product: updatedProduct
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Ürün güncellenirken hata:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ürün güncellenirken bir hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}

// DELETE - Ürün sil
export async function DELETE(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ürün ID gerekli',
          message: 'Silinecek ürünün ID\'si belirtilmelidir'
        },
        { status: 400 }
      );
    }

    // Ürünü bul ve sil
    const deletedProduct = await Product.findByIdAndDelete(productId);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Ürün bulunamadı',
          message: 'Belirtilen ID\'ye sahip ürün bulunamadı'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Ürün başarıyla silindi',
      product: deletedProduct
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Ürün silinirken hata:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Ürün silinirken bir hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}
