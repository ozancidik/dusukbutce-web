import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";
import crypto from "crypto";
import { sendPasswordResetEmail } from "@/lib/email";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // E-posta spam koruması: IP başına 15 dakikada en fazla 5 istek.
    const limited = checkRateLimit(request, { name: 'forgot-password', limit: 5, windowMs: 15 * 60_000 });
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
    let dbConnected = false;
    try {
      await connectDB();
      console.log('✅ MongoDB bağlantısı başarılı');
      dbConnected = true;
    } catch (dbError: any) {
      console.error('❌ MongoDB bağlantı hatası:', dbError);
      // Development ortamında MongoDB bağlantısı olmasa bile devam et (test için)
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Development ortamı: MongoDB bağlantısı olmasa bile devam ediliyor');
        dbConnected = false;
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.' 
          },
          { status: 503 }
        );
      }
    }
    
    // MongoDB bağlantısı yoksa development ortamında başarılı döndür
    if (!dbConnected) {
      console.log('🔧 Development ortamı: MongoDB bağlantısı olmadan başarılı mesaj döndürülüyor');
      return NextResponse.json(
        { 
          success: true, 
          message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.' 
        },
        { status: 200 }
      );
    }
    
    // Kullanıcıyı bul
    let user;
    try {
      user = await User.findOne({ email: email.toLowerCase() });
      console.log('🔍 Kullanıcı sorgusu tamamlandı:', user ? 'BULUNDU' : 'BULUNAMADI');
    } catch (userError: any) {
      console.error('❌ Kullanıcı sorgu hatası:', userError);
      // Development ortamında hata olsa bile başarılı döndür
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Development ortamı: Kullanıcı sorgu hatası olsa bile başarılı döndürülüyor');
        return NextResponse.json(
          { 
            success: true, 
            message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.' 
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { 
          success: false, 
          error: 'Kullanıcı sorgusu sırasında bir hata oluştu. Lütfen tekrar deneyin.' 
        },
        { status: 500 }
      );
    }
    
    if (!user) {
      // Güvenlik için kullanıcı bulunamasa da aynı mesajı döndür; e-posta PII'si loglanmıyor.
      console.log('📧 Şifre sıfırlama isteği: kayıtlı olmayan e-posta');
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
    try {
      await User.findByIdAndUpdate(user._id, {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpiry
      });
    } catch (updateError: any) {
      console.error('❌ Kullanıcı güncelleme hatası:', updateError);
      // Development ortamında hata olsa bile devam et
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Development ortamı: Kullanıcı güncelleme hatası olsa bile devam ediliyor');
      } else {
        throw updateError;
      }
    }

    // Kullanıcı adını belirle
    const userName = user.name || user.firstName || user.email?.split('@')[0] || 'Kullanıcı';
    
    // Production ortamında email gönderme işlemini await et (hata kontrolü için)
    // Development ortamında arka plana al (hızlı response için)
    const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL === '1';
    
    if (isProduction) {
      console.log('🏭 Production ortamı: Email gönderme işlemi await ediliyor...');
      try {
        const emailSent = await sendPasswordResetEmail(email, resetToken, userName);
        if (!emailSent) {
          console.error('❌ [PRODUCTION] Şifre sıfırlama e-postası gönderilemedi:', email);
          console.error('❌ [PRODUCTION] GMAIL_USER:', process.env.GMAIL_USER || 'NOT SET');
          console.error('❌ [PRODUCTION] GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'SET' : 'NOT SET');
          return NextResponse.json({
            success: false,
            error: 'E-posta gönderilemedi. Lütfen daha sonra tekrar deneyin veya destek ekibiyle iletişime geçin.'
          }, { status: 500 });
        }
        console.log('✅ [PRODUCTION] Şifre sıfırlama e-postası başarıyla gönderildi:', email);
      } catch (emailError: any) {
        console.error('❌ [PRODUCTION] E-posta gönderme hatası:', emailError);
        console.error('❌ [PRODUCTION] Hata detayları:', {
          message: emailError?.message,
          code: emailError?.code,
          responseCode: emailError?.responseCode,
          command: emailError?.command
        });
        if (emailError?.code === 'EAUTH' || emailError?.responseCode === 535) {
          console.error('🔐 [PRODUCTION] Gmail authentication hatası tespit edildi!');
          console.error('💡 [PRODUCTION] Vercel Dashboard > Settings > Environment Variables kontrol edin');
        }
        return NextResponse.json({
          success: false,
          error: 'E-posta gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
        }, { status: 500 });
      }
    } else {
      // Development ortamında arka plana al (hızlı response için)
      sendPasswordResetEmail(email, resetToken, userName).catch((emailError: any) => {
        console.error('❌ E-posta gönderme hatası (arka plan):', emailError);
        if (emailError?.code === 'EAUTH' || emailError?.responseCode === 535) {
          console.error('🔐 Gmail authentication hatası tespit edildi!');
        }
      });
    }
    
    // Başarılı response döndür
    return NextResponse.json({
      success: true,
      message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.'
    });

  } catch (error: any) {
    console.error('❌ Şifre sıfırlama hatası:', error);
    console.error('❌ Hata detayları:', {
      message: error?.message || 'Bilinmeyen hata',
      stack: error?.stack,
      name: error?.name
    });
    
    // Environment variable hatası ise daha açıklayıcı mesaj
    if (error?.message?.includes('GMAIL_APP_PASSWORD')) {
      console.error('⚠️ Email gönderme servisi yapılandırılmamış!');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email gönderme servisi şu anda kullanılamıyor. Lütfen daha sonra tekrar deneyin veya destek ekibiyle iletişime geçin.' 
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Şifre sıfırlama işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    );
  }
}
