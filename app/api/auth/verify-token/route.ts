import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import connectDB from "@/lib/mongodb";
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token gerekli' },
        { status: 400 }
      );
    }

    // JWT token'ı doğrula
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured');
      return NextResponse.json(
        { success: false, error: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      console.error('Invalid token:', e);
      return NextResponse.json(
        { success: false, error: 'Geçersiz token' },
        { status: 401 }
      );
    }

    // MongoDB'den kullanıcıyı al
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: user._id.toString(),
        id: user._id.toString(),
        email: user.email,
        name: user.name || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        isAdmin: user.isAdmin || false
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

