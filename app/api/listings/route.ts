import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Listing from "@/models/Listing";
import ProductSubmission from '@/models/ProductSubmission';

export async function GET() {
  try {
    await connectDB();

    // Try Listing model first, fallback to ProductSubmission
    let listings = await Listing.find({}).sort({ createdAt: -1 }).limit(100);

    if (!listings || listings.length === 0) {
      listings = await ProductSubmission.find({
        status: 'listed'
      }).sort({ createdAt: -1 }).limit(100);
    }

    return NextResponse.json({ success: true, data: listings });
  } catch (error: any) {
    console.error('Error fetching listings:', error?.message || error);
    return NextResponse.json({ success: true, data: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Kimlik doğrulama gerekli' },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await request.json();

    // Create new listing
    const listing = new Listing({
      ...body,
      status: 'active',
      createdAt: new Date()
    });

    await listing.save();

    return NextResponse.json(
      { success: true, data: listing },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating listing:', error);
    return NextResponse.json(
      { success: false, message: 'İlan oluşturulurken hata oluştu' },
      { status: 500 }
    );
  }
} 