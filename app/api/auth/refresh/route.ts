import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getTokenFromRequest } from '@/lib/auth';
import { setAuthCookie } from '@/lib/cookies';

export async function POST(request: NextRequest) {
  try {
    // Token önce httpOnly cookie'den, yoksa Authorization header'dan okunur.
    const token = getTokenFromRequest(request);

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token bulunamadı' },
        { status: 401 }
      );
    }
    
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    try {
      // Token'ı doğrula (expired olsa bile decode edilebilir)
      const decoded = jwt.decode(token) as any;
      
      if (!decoded || !decoded.userId) {
        return NextResponse.json(
          { success: false, error: 'Geçersiz token' },
          { status: 401 }
        );
      }

      // Token'ın süresini kontrol et (7 günün %80'i geçmişse refresh et)
      const now = Math.floor(Date.now() / 1000);
      const tokenAge = now - (decoded.iat || 0);
      const tokenMaxAge = 7 * 24 * 60 * 60; // 7 gün saniye cinsinden
      const refreshThreshold = tokenMaxAge * 0.8; // %80'i

      // Token çok yeni ise refresh etme
      if (tokenAge < refreshThreshold) {
        return NextResponse.json({
          success: true,
          token: token, // Aynı token'ı döndür
          refreshed: false
        });
      }

      // Kullanıcıyı kontrol et
      await connectDB();
      const user = await User.findById(decoded.userId);
      
      if (!user || !user.isActive) {
        return NextResponse.json(
          { success: false, error: 'Kullanıcı bulunamadı veya aktif değil' },
          { status: 401 }
        );
      }

      // Yeni token oluştur
      const newToken = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      const refreshResponse = NextResponse.json({
        success: true,
        token: newToken,
        refreshed: true
      });
      setAuthCookie(refreshResponse, newToken);
      return refreshResponse;

    } catch (jwtError) {
      return NextResponse.json(
        { success: false, error: 'Geçersiz token' },
        { status: 401 }
      );
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Token refresh error:', errorMessage);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

