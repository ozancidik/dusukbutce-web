import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductSubmission from '@/models/ProductSubmission';

export async function GET() {
  try {
    await connectDB();
    
    // Sadece "listed" durumundaki ürünleri getir
    const listings = await ProductSubmission.find({ 
      status: 'listed' 
    }).sort({ createdAt: -1 });

    return NextResponse.json(listings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    return NextResponse.json(
      { error: 'İlanlar getirilemedi' },
      { status: 500 }
    );
  }
} 