import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { token } = body;

    console.log('Email verification request received:', { token: token ? 'token exists' : 'no token', tokenLength: token?.length });

    if (!token) {
      console.log('No token provided in request');
      return NextResponse.json(
        { error: 'Doğrulama token\'ı gerekli' },
        { status: 400 }
      );
    }

    // Token ile kullanıcıyı bul (süresi dolmuş olsa bile)
    const user = await User.findOne({
      emailVerificationToken: token
    });

    console.log('User lookup result:', { 
      userFound: !!user, 
      userEmail: user?.email,
      tokenExpires: user?.emailVerificationExpires,
      currentTime: new Date()
    });

    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { error: 'Geçersiz doğrulama bağlantısı' },
        { status: 400 }
      );
    }

    // Token süresini kontrol et
    if (user.emailVerificationExpires && user.emailVerificationExpires < new Date()) {
      console.log('Token expired');
      return NextResponse.json(
        { error: 'Geçersiz veya süresi dolmuş doğrulama bağlantısı' },
        { status: 400 }
      );
    }

    // Kullanıcının email'ini doğrula
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    
    await user.save();

    return NextResponse.json(
      { message: 'Email adresiniz başarıyla doğrulandı. Artık giriş yapabilirsiniz.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
