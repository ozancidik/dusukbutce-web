import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductSubmission from "@/models/ProductSubmission";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const category = request.nextUrl.searchParams.get('category');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

    const filter = category ? { category, status: 'listed' } : { status: 'listed' };
    const listings = await ProductSubmission.find(filter).sort({ createdAt: -1 }).limit(limit);

    return NextResponse.json({ success: true, data: listings });
  } catch (error: any) {
    console.error('Error fetching listings:', error?.message || error);
    return NextResponse.json({ success: true, data: [] }, { status: 200 });
  }
}
