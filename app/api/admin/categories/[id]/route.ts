import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../../utils/requireAdmin';

// GET - Tek kategori getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { id } = await params;
    const category = await Category.findById(id)
      .populate('parentCategory', 'name slug');
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Kategori bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      category,
      message: 'Kategori başarıyla getirildi'
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Kategori getirme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Kategori getirilemedi' },
      { status: 500 }
    );
  }
}

// PUT - Kategori güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    const { name, description, parentCategory, sortOrder, isActive } = body;
    
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Kategori bulunamadı' },
        { status: 404 }
      );
    }
    
    // Validasyon
    if (name && name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Kategori adı gereklidir' },
        { status: 400 }
      );
    }
    
    // Slug oluştur (isim değiştiyse)
    if (name && name !== category.name) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      // Aynı slug kontrolü
      const existingCategory = await Category.findOne({ 
        slug, 
        _id: { $ne: id } 
      });
      if (existingCategory) {
        return NextResponse.json(
          { success: false, message: 'Bu isimde bir kategori zaten mevcut' },
          { status: 400 }
        );
      }
      
      category.slug = slug;
    }
    
    // Parent kategori kontrolü
    if (parentCategory !== undefined) {
      if (parentCategory && parentCategory !== 'null') {
        const parent = await Category.findById(parentCategory);
        if (!parent) {
          return NextResponse.json(
            { success: false, message: 'Geçersiz ana kategori' },
            { status: 400 }
          );
        }
        // Kendisini parent olarak seçemez
        if (parentCategory === id) {
          return NextResponse.json(
            { success: false, message: 'Kategori kendisinin alt kategorisi olamaz' },
            { status: 400 }
          );
        }
      }
      category.parentCategory = parentCategory === 'null' ? null : parentCategory;
    }
    
    // Diğer alanları güncelle
    if (name) category.name = name.trim();
    if (description !== undefined) category.description = description?.trim();
    if (sortOrder !== undefined) category.sortOrder = sortOrder;
    if (isActive !== undefined) category.isActive = isActive;
    
    await category.save();
    
    // Populate ile parent bilgisini getir
    await category.populate('parentCategory', 'name slug');
    
    return NextResponse.json({
      success: true,
      category,
      message: 'Kategori başarıyla güncellendi'
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Kategori güncelleme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Kategori güncellenemedi' },
      { status: 500 }
    );
  }
}

// DELETE - Kategori sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { id } = await params;
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Kategori bulunamadı' },
        { status: 404 }
      );
    }
    
    // Alt kategorileri kontrol et
    const children = await Category.find({ parentCategory: id });
    if (children.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Bu kategorinin alt kategorileri var. Önce alt kategorileri silin.' },
        { status: 400 }
      );
    }
    
    // Ürünlerde kullanılıp kullanılmadığını kontrol et
    // Bu kontrol Product modeli ile yapılır
    const { Product } = await import('@/models/Product');
    const productsInCategory = await Product.find({ category: id });
    if (productsInCategory.length > 0) {
      return NextResponse.json(
        { success: false, message: 'Bu kategoride ürünler bulunuyor. Önce ürünleri taşıyın veya silin.' },
        { status: 400 }
      );
    }
    
    await Category.findByIdAndDelete(id);
    
    return NextResponse.json({
      success: true,
      message: 'Kategori başarıyla silindi'
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Kategori silme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Kategori silinemedi' },
      { status: 500 }
    );
  }
}
