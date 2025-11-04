import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
// import { ProductSubmission } from '@/models/ProductSubmission';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Token doğrulama middleware
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token bulunamadı');
  }

  const token = authHeader.substring(7);
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    throw new Error('Geçersiz token');
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Token doğrula
    const decoded = await verifyToken(request);
    
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Submission ID gerekli' },
        { status: 400 }
      );
    }

    // Test için basit response döndür
    return NextResponse.json({
      success: true,
      message: 'Submission başarıyla silindi (Test modu)',
      deletedId: id
    });

  } catch (error) {
    console.error('Delete submission error:', error);
    
    if (error instanceof Error && (error.message === 'Token bulunamadı' || error.message === 'Geçersiz token')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Tüm submission'ları sil
export async function POST(request: NextRequest) {
  try {
    // Token doğrula
    const decoded = await verifyToken(request);
    
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 403 }
      );
    }

    await connectDB();

    // Test için basit response döndür
    return NextResponse.json({
      success: true,
      message: 'Tüm submissionlar başarıyla silindi (Test modu)',
      deletedCount: 1
    });

  } catch (error) {
    console.error('Delete all submissions error:', error);
    
    if (error instanceof Error && (error.message === 'Token bulunamadı' || error.message === 'Geçersiz token')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
