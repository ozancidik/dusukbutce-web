import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Tüm kullanıcıları getir (şifre hariç)
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      users 
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Kullanıcılar alınamadı' },
      { status: 500 }
    );
  }
} 