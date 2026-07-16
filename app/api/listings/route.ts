import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductSubmission from '@/models/ProductSubmission';

export async function GET() {
  // Hızlı response için - MongoDB bağlantısı olmasa bile sayfa yüklensin
  try {
    // MongoDB bağlantısını timeout ile dene (3 saniye - çok kısa)
    const connectPromise = connectDB();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('MongoDB connection timeout')), 3000)
    );
    
    await Promise.race([connectPromise, timeoutPromise]);
    
    // Sadece "listed" durumundaki ürünleri getir
    const listings = await ProductSubmission.find({ 
      status: 'listed' 
    }).sort({ createdAt: -1 }).limit(100);

    return NextResponse.json(listings);
  } catch (error: any) {
    console.error('Error fetching listings (returning empty array):', error?.message || error);
    // MongoDB bağlantı hatası durumunda hemen boş array döndür (sayfa yine de yüklensin)
    // Bu sayede sayfa MongoDB olmadan da çalışır
    return NextResponse.json([], { status: 200 });
  }
} 