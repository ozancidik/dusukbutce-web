import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from '@/models/User';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from "../utils/requireAdmin";

export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    // MongoDB bağlantısı
    await connectDB();
    
    // Newsletter'a abone olan kullanıcıları getir
    const subscribers = await User.find({ acceptNewsletter: true })
      .select('_id email name phone emailVerified createdAt')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      success: true,
      subscribers,
      count: subscribers.length
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Newsletter subscribers API error:', error);
    return NextResponse.json(
      { success: false, error: 'Aboneler alınamadı' },
      { status: 500 }
    );
  }
}