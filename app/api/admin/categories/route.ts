import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../utils/requireAdmin';

// GET - Tüm kategorileri getir
export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const parentId = searchParams.get('parentId');
    const activeOnly = searchParams.get('activeOnly') === 'true';
    
    let query: any = {};
    
    if (parentId) {
      query.parentCategory = parentId === 'null' ? null : parentId;
    }
    
    if (activeOnly) {
      query.isActive = true;
    }
    
    const categories = await Category.find(query)
      .populate('parentCategory', 'name slug')
      .sort({ sortOrder: 1, name: 1 });
    
    return NextResponse.json({
      success: true,
      categories,
      message: 'Kategoriler başarıyla getirildi'
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Kategori getirme hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Kategoriler getirilemedi' },
      { status: 500 }
    );
  }
}

// POST - Yeni kategori oluştur
export async function POST(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();
    
    const body = await request.json();
    const { name, description, parentCategory, sortOrder } = body;
    
    // Validasyon
    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: 'Kategori adı gereklidir' },
        { status: 400 }
      );
    }
    
    // Slug oluştur
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    
    // Aynı slug kontrolü
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Bu isimde bir kategori zaten mevcut' },
        { status: 400 }
      );
    }
    
    // Parent kategori kontrolü
    if (parentCategory && parentCategory !== 'null') {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        return NextResponse.json(
          { success: false, message: 'Geçersiz ana kategori' },
          { status: 400 }
        );
      }
    }
    
    const category = new Category({
      name: name.trim(),
      slug,
      description: description?.trim(),
      parentCategory: parentCategory === 'null' ? null : parentCategory,
      sortOrder: sortOrder || 0
    });
    
    await category.save();
    
    // Populate ile parent bilgisini getir
    await category.populate('parentCategory', 'name slug');
    
    return NextResponse.json({
      success: true,
      category,
      message: 'Kategori başarıyla oluşturuldu'
    });
    
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Kategori oluşturma hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Kategori oluşturulamadı' },
      { status: 500 }
    );
  }
}
