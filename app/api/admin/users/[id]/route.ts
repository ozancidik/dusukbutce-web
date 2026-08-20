import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from '../../../../../models/User';
import { AdminAuthError, ensureFullAdminRequest, handleAdminAuthError } from "../../utils/requireAdmin";
import { logAdminAction } from '@/lib/auditLog';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const decoded = ensureFullAdminRequest(request);

    const { adminRole } = await request.json();

    if (adminRole !== 'full' && adminRole !== 'viewer') {
      return NextResponse.json(
        { success: false, message: 'adminRole "full" veya "viewer" olmalı' },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    if (!user.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Sadece admin kullanıcıların rolü değiştirilebilir' },
        { status: 400 }
      );
    }

    user.adminRole = adminRole;
    await user.save();

    await logAdminAction({
      adminEmail: decoded.email || 'bilinmiyor',
      action: 'user_set_admin_role',
      targetType: 'user',
      targetId: id,
      details: { email: user.email, adminRole },
    });

    return NextResponse.json({
      success: true,
      message: 'Admin rolü güncellendi',
      user: { id: user._id, email: user.email, adminRole: user.adminRole }
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('❌ Admin user role update hatası:', error);
    return NextResponse.json(
      { success: false, message: 'Admin rolü güncellenemedi' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    ensureFullAdminRequest(request);

    console.log('🗑️ Admin user delete API çağrıldı');
    console.log('🆔 Silinecek kullanıcı ID:', id);
    
    // MongoDB bağlantısı
    console.log('📡 MongoDB bağlantısı kuruluyor...');
    await connectDB();
    console.log('✅ MongoDB bağlantısı başarılı');
    
    // IP kontrolü için log
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    console.log(`🌐 IP: ${ip} - Admin kullanıcı silme istedi`);
    
    // Kullanıcıyı bul
    const user = await User.findById(id);
    if (!user) {
      console.log('❌ Kullanıcı bulunamadı');
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }
    
    // Sadece admin kullanıcılar silinebilir
    if (!user.isAdmin) {
      console.log('❌ Sadece admin kullanıcılar silinebilir');
      return NextResponse.json(
        { success: false, message: 'Sadece admin kullanıcılar silinebilir' },
        { status: 403 }
      );
    }
    
    // Kullanıcıyı sil
    console.log('🗑️ Admin kullanıcı siliniyor:', user.email);
    await User.findByIdAndDelete(id);
    console.log('✅ Admin kullanıcı başarıyla silindi');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Admin kullanıcı başarıyla silindi',
      deletedUser: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('❌ Admin user delete API hatası:', error);
    
    // Detaylı hata mesajı
    let errorMessage = 'Kullanıcı silinemedi';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}
