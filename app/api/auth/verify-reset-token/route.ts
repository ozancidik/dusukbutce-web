import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Token doğrulama API çağrıldı');
    
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token gerekli' },
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

    console.log('✅ Token doğrulandı, userId:', user._id);
    
    return NextResponse.json({
      success: true,
      message: 'Token geçerli',
      user: {
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error('❌ Token doğrulama hatası:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Token doğrulama sırasında bir hata oluştu' 
      },
      { status: 500 }
    );
  }
}
