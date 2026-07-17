import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";
import crypto from "crypto";
import { sendEmailVerificationEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // E-posta spam koruması: IP başına 15 dakikada en fazla 5 istek.
    const limited = checkRateLimit(request, { name: 'resend-verification', limit: 5, windowMs: 15 * 60_000 });
    if (limited) return limited;
    
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
          message: 'Doğrulama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edin.' 
        },
        { status: 200 }
      );
    }

    // Kullanıcı zaten doğrulanmış mı kontrol et
    if (user.emailVerified) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Bu e-posta adresi zaten doğrulanmış' 
        },
        { status: 400 }
      );
    }

    // Yeni doğrulama token'ı oluştur
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat geçerli

    // Kullanıcıyı güncelle
    await User.findByIdAndUpdate(user._id, {
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationTokenExpiry
    });

    console.log('✅ Email doğrulama token\'ı oluşturuldu:', email);

    // E-posta gönderme işlemi
    const emailSent = await sendEmailVerificationEmail(email, verificationToken, user.name);
    
    if (!emailSent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'E-posta gönderilemedi. Lütfen tekrar deneyin.' 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Doğrulama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edin.'
    });

  } catch (error) {
    console.error('❌ Email doğrulama tekrar gönderme hatası:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'E-posta gönderme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    );
  }
}