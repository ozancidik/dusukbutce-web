import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from '../../../../../models/User';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🗑️ Admin user delete API çağrıldı');
    console.log('🆔 Silinecek kullanıcı ID:', params.id);
    
    // MongoDB bağlantısı
    console.log('📡 MongoDB bağlantısı kuruluyor...');
    await connectDB();
    console.log('✅ MongoDB bağlantısı başarılı');
    
    // IP kontrolü için log
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    console.log(`🌐 IP: ${ip} - Admin kullanıcı silme istedi`);
    
    // Kullanıcıyı bul
    const user = await User.findById(params.id);
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
    await User.findByIdAndDelete(params.id);
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
