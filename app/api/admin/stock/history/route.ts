import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

// GET - Stok geçmişi (şimdilik boş array döndürüyor, gerçek uygulamada ayrı collection'da tutulur)
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Gerçek uygulamada StockHistory collection'ından veri çekilir
    // Şimdilik boş array döndürüyoruz
    const history: any[] = [];
    
    return NextResponse.json({
      success: true,
      history,
      message: 'Stok geçmişi başarıyla getirildi'
    });
  } catch (error) {
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
