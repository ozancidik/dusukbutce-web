import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StockHistory from '@/models/StockHistory';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from '../../utils/requireAdmin';
import { parsePagination } from '@/lib/pagination';

// GET - Stok geçmişi
export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    await connectDB();

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const { page, limit } = parsePagination(searchParams);

    const query: any = {};
    if (productId) {
      query.productId = productId;
    }

    const skip = (page - 1) * limit;

    const [history, totalCount] = await Promise.all([
      StockHistory.find(query)
        .sort({ updatedAt: -1 })
        .skip(skip)
        .limit(limit),
      StockHistory.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      history,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
      },
      message: 'Stok geçmişi başarıyla getirildi'
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Stok geçmişi getirilirken hata:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Stok geçmişi getirilirken bir hata oluştu',
        message: error instanceof Error ? error.message : 'Bilinmeyen hata'
      },
      { status: 500 }
    );
  }
}
