import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();

    // Validation
    if (!userId) {
      return NextResponse.json(
        { message: 'Kullanıcı kimliği gerekli.' },
        { status: 400 }
      );
    }

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: 'Mevcut şifre ve yeni şifre gereklidir.' },
        { status: 400 }
      );
    }

    // Şifre uzunluk kontrolü
    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: 'Yeni şifre en az 8 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    if (newPassword.length > 50) {
      return NextResponse.json(
        { message: 'Yeni şifre en fazla 50 karakter olabilir.' },
        { status: 400 }
      );
    }

    // Şifre karmaşıklık kontrolleri
    if (!/[A-Z]/.test(newPassword)) {
      return NextResponse.json(
        { message: 'Şifre en az bir büyük harf (A-Z) içermelidir.' },
        { status: 400 }
      );
    }

    if (!/[a-z]/.test(newPassword)) {
      return NextResponse.json(
        { message: 'Şifre en az bir küçük harf (a-z) içermelidir.' },
        { status: 400 }
      );
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword)) {
      return NextResponse.json(
        { message: 'Şifre en az bir özel karakter (!@#$%^&* vb.) içermelidir.' },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { message: 'Yeni şifre mevcut şifre ile aynı olamaz.' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );
    }

    // Check if user has local provider (password-based login)
    const hasLocalProvider = user.authProviders?.some(
      (provider: any) => provider.provider === 'local'
    );

    if (!hasLocalProvider) {
      return NextResponse.json(
        { message: 'Bu hesap için şifre değiştirme işlemi yapılamaz.' },
        { status: 400 }
      );
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { message: 'Mevcut şifre hatalı.' },
        { status: 400 }
      );
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await User.findByIdAndUpdate(userId, {
      password: hashedNewPassword
    });

    return NextResponse.json(
      { message: 'Şifre başarıyla değiştirildi.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
