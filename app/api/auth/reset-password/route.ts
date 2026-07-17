import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Token brute-force koruması: IP başına 15 dakikada en fazla 10 deneme.
    const limited = checkRateLimit(request, { name: 'reset-password', limit: 10, windowMs: 15 * 60_000 });
    if (limited) return limited;
    
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: 'Token ve yeni şifre gerekli' },
        { status: 400 }
      );
    }

    // Şifre uzunluk kontrolü
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, error: 'Şifre en az 8 karakter olmalıdır' },
        { status: 400 }
      );
    }

    if (password.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Şifre en fazla 50 karakter olabilir' },
        { status: 400 }
      );
    }

    // Şifre karmaşıklık kontrolleri
    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { success: false, error: 'Şifre en az bir büyük harf (A-Z) içermelidir' },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { success: false, error: 'Şifre en az bir küçük harf (a-z) içermelidir' },
        { status: 400 }
      );
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return NextResponse.json(
        { success: false, error: 'Şifre en az bir özel karakter (!@#$%^&* vb.) içermelidir' },
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
    
    // Local provider var mı kontrol et
    const hasLocalProvider = user.authProviders?.some((p: any) => p.provider === 'local');
    
    // Local provider yoksa ekle
    if (!hasLocalProvider) {
      console.log('ℹ️  Local provider ekleniyor...');
      if (!user.authProviders) {
        user.authProviders = [];
      }
      user.authProviders.push({
        provider: 'local',
        providerId: 'local',
        connectedAt: new Date()
      });
    }
    
    // Kullanıcıyı güncelle
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.updatedAt = new Date();
    await user.save();

    console.log('✅ Şifre başarıyla güncellendi:', user.email);
    if (!hasLocalProvider) {
      console.log('✅ Local provider eklendi');
    }
    
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
