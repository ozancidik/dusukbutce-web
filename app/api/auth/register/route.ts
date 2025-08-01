import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, phone, address } = await request.json();
    
    // Geçici test modu - MongoDB bağlantısı olmadan
    console.log('Register attempt:', { email, name, phone });
    
    // Basit validasyon
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: 'Email, şifre ve isim gereklidir' },
        { status: 400 }
      );
    }
    
    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      );
    }
    
    // Şifre uzunluk kontrolü
    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      );
    }
    
    // Başarılı kayıt simülasyonu
    return NextResponse.json({ 
      success: true, 
      message: 'Kayıt başarılı! (Test modu)',
      userId: 'test-user-id'
    });
    
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json(
      { success: false, message: 'Kayıt olurken bir hata oluştu: ' + (error as Error).message },
      { status: 500 }
    );
  }
} 