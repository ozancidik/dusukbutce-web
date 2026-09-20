import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import ProductSubmission from '@/models/ProductSubmission';
import jwt from 'jsonwebtoken';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
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

    await connectDB();
    const { id } = await context.params;
    const body = await request.json();

    const listing = await ProductSubmission.findByIdAndUpdate(
      id,
      { status: 'rejected', rejectionReason: body.reason, rejectedAt: new Date() },
      { new: true }
    );

    if (!listing) {
      return NextResponse.json(
        { success: false, message: 'İlan bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'İlan reddedildi',
      data: listing
    });
  } catch (error: any) {
    console.error('Error rejecting listing:', error);
    return NextResponse.json(
      { success: false, message: 'İlan reddedilirken hata oluştu' },
      { status: 500 }
    );
  }
}
