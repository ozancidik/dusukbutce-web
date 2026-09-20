import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from '../../../../models/User';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // JWT token'ı cookie'den al
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Kimlik doğrulama gerekli' },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error('Error: JWT_SECRET is not configured');
      return NextResponse.json(
        { success: false, message: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;

    // Kullanıcıyı getir
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        isAdmin: user.isAdmin || false,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      }
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz token' },
        { status: 401 }
      );
    }
    console.error('Error getting current user:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
