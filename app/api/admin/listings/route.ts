import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Kimlik doğrulama gerekli' },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Sunucu yapılandırma hatası' },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    if (!decoded.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Admin yetkisi gerekli' },
        { status: 403 }
      );
    }

    const status = request.nextUrl.searchParams.get('status');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '20');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');

    return NextResponse.json({
      success: true,
      listings: [],
      pagination: { total: 0, page, limit, pages: 0 }
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz token' },
        { status: 401 }
      );
    }
    console.error('Error getting listings:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
