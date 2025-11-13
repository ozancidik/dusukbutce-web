import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from '../../../../models/User';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from "../utils/requireAdmin";

export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    console.log('🔍 Admin users API çağrıldı');
    
    // MongoDB bağlantısı
    console.log('📡 MongoDB bağlantısı kuruluyor...');
    await connectDB();
    console.log('✅ MongoDB bağlantısı başarılı');
    
    // IP kontrolü için log
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    console.log(`🌐 IP: ${ip} - Admin users listesi istedi`);
    
    // Tüm kullanıcıları getir (şifre hariç)
    console.log('👥 Kullanıcılar getiriliyor...');
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    console.log(`✅ ${users.length} kullanıcı bulundu`);
    
    return NextResponse.json({ 
      success: true, 
      users,
      count: users.length
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('❌ Admin users API hatası:', error);
    
    // Detaylı hata mesajı
    let errorMessage = 'Kullanıcılar alınamadı';
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