import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
// import { ProductSubmission } from '@/models/ProductSubmission';
import { AdminAuthError, ensureFullAdminRequest, handleAdminAuthError } from '../../utils/requireAdmin';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    ensureFullAdminRequest(request);

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
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Delete submission error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}

// Tüm submission'ları sil
export async function POST(request: NextRequest) {
  try {
    ensureFullAdminRequest(request);

    await connectDB();

    // Test için basit response döndür
    return NextResponse.json({
      success: true,
      message: 'Tüm submissionlar başarıyla silindi (Test modu)',
      deletedCount: 1
    });

  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Delete all submissions error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
