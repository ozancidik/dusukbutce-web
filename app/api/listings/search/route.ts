import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductSubmission from '@/models/ProductSubmission';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const query = request.nextUrl.searchParams.get('q');
    const category = request.nextUrl.searchParams.get('category');

    if (!query) {
      return NextResponse.json(
        { success: false, message: 'Arama terimi gerekli' },
        { status: 400 }
      );
    }

    // Search by title or description in ProductSubmission
    const searchFilter = {
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ],
      status: 'listed'
    };

    // Add category filter if provided
    const filter = category
      ? { ...searchFilter, category }
      : searchFilter;

    const listings = await ProductSubmission.find(filter)
      .limit(50)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: listings,
      count: listings.length
    });
  } catch (error: any) {
    console.error('Error searching listings:', error);
    return NextResponse.json(
      { success: false, message: 'Arama sırasında hata oluştu' },
      { status: 500 }
    );
  }
}
