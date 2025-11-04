import { NextRequest, NextResponse } from "next/server";
import connectDB, { ensureConnectionReady } from "@/lib/mongodb";
import { getUserModel } from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    // MongoDB bağlantısı
    const mongoose = require('mongoose');
    mongoose.set('bufferCommands', true);
    
    await connectDB();
    
    // Bağlantının hazır olduğundan emin ol
    await ensureConnectionReady();
    
    // Model'i bağlantı kurulduktan SONRA al
    const User = await getUserModel() as any;
    
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
    console.error('Newsletter subscribers API error:', error);
    return NextResponse.json(
      { success: false, error: 'Aboneler alınamadı' },
      { status: 500 }
    );
  }
}