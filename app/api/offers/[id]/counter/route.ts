import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import jwt from 'jsonwebtoken';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await context.params;
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
    const body = await request.json();

    return NextResponse.json({
      success: true,
      message: 'Karşı teklif gönderildi',
      counterOffer: {
        id: Math.random().toString(36).substr(2, 9),
        originalOfferId: id,
        counterPrice: body.counterPrice,
        message: body.message || '',
        status: 'pending',
        createdAt: new Date()
      }
    });
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json(
        { success: false, message: 'Geçersiz token' },
        { status: 401 }
      );
    }
    console.error('Error creating counter offer:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
