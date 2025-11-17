import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    console.log('🔐 Şifre sıfırlama API çağrıldı');
    
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'E-posta adresi gerekli' },
        { status: 400 }
      );
    }

    // E-posta formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Geçerli bir e-posta adresi girin' },
        { status: 400 }
      );
    }

    // MongoDB bağlantısı
    await connectDB();
    
    // Kullanıcıyı bul
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // Güvenlik için kullanıcı bulunamasa da aynı mesajı döndür
      console.log('📧 E-posta bulunamadı:', email);
      return NextResponse.json(
        { 
          success: true, 
          message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.' 
        },
        { status: 200 }
      );
    }

    // Şifre sıfırlama token'ı oluştur
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 saat geçerli

    // Kullanıcıyı güncelle
    await User.findByIdAndUpdate(user._id, {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetTokenExpiry
    });

    console.log('✅ Şifre sıfırlama token\'ı oluşturuldu:', email);

    // E-posta gönderme işlemi
    try {
      const emailSent = await sendPasswordResetEmail(email, resetToken, user.name);
      
      if (!emailSent) {
        console.error('❌ Şifre sıfırlama e-postası gönderilemedi:', email);
        return NextResponse.json({
          success: false,
          error: 'E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin veya destek ekibiyle iletişime geçin.'
        }, { status: 500 });
      }
      
      console.log('✅ Şifre sıfırlama e-postası başarıyla gönderildi:', email);
      return NextResponse.json({
        success: true,
        message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.'
      });
    } catch (emailError: any) {
      console.error('❌ E-posta gönderme hatası:', emailError);
      return NextResponse.json({
        success: false,
        error: 'E-posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
      }, { status: 500 });
    }

  } catch (error: any) {
    console.error('❌ Şifre sıfırlama hatası:', error);
    console.error('❌ Hata detayları:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Şifre sıfırlama işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    );
  }
}
