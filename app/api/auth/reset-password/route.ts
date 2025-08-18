import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Şifre sıfırlama API çağrıldı');
    
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: 'Token ve yeni şifre gerekli' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Şifre en az 6 karakter olmalıdır' },
        { status: 400 }
      );
    }

    // MongoDB bağlantısı
    await connectDB();
    
    // Token ile kullanıcıyı bul
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // Süresi dolmamış
    });
    
    if (!user) {
      console.log('❌ Geçersiz veya süresi dolmuş token:', token);
      return NextResponse.json(
        { success: false, error: 'Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş' },
        { status: 400 }
      );
    }

    // Yeni şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Kullanıcıyı güncelle
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      resetPasswordToken: undefined,
      resetPasswordExpires: undefined,
      updatedAt: new Date()
    });

    console.log('✅ Şifre başarıyla güncellendi:', user.email);
    
    return NextResponse.json({
      success: true,
      message: 'Şifreniz başarıyla güncellendi'
    });

  } catch (error) {
    console.error('❌ Şifre sıfırlama hatası:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Şifre güncellenirken bir hata oluştu' 
      },
      { status: 500 }
    );
  }
}
