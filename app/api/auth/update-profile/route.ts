import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📝 Profile update request body:', body);
    
    const { userId, firstName, lastName, email, phone } = body;

    if (!userId) {
      console.error('❌ User ID missing in request');
      return NextResponse.json(
        { success: false, message: 'Kullanıcı ID gerekli' },
        { status: 400 }
      );
    }
    
    console.log('🔍 Updating user with ID:', userId);

    // MongoDB'ye bağlan
    console.log('📡 Connecting to MongoDB...');
    await connectDB();
    console.log('✅ MongoDB connected');

    // Kullanıcıyı bul
    console.log('🔍 Finding user with ID:', userId);
    const user = await User.findById(userId);
    if (!user) {
      console.error('❌ User not found with ID:', userId);
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }
    console.log('✅ User found:', { id: user._id, name: user.name, email: user.email });

    // Email değişikliği varsa, email'in benzersiz olduğunu kontrol et
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: 'Bu e-posta adresi zaten kullanılıyor' },
          { status: 400 }
        );
      }
    }

    // Telefon değişikliği varsa, telefonun benzersiz olduğunu kontrol et
    if (phone && phone !== user.phone) {
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return NextResponse.json(
          { success: false, message: 'Bu telefon numarası zaten kullanılıyor' },
          { status: 400 }
        );
      }
    }

    // Kullanıcı bilgilerini güncelle
    const name = `${firstName} ${lastName}`.trim();
    console.log('📝 Updating user data:', { 
      oldName: user.name, 
      newName: name, 
      oldEmail: user.email, 
      newEmail: email || user.email,
      phone: phone || user.phone 
    });
    
    user.name = name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.updatedAt = new Date();

    console.log('💾 Saving updated user...');
    await user.save();
    console.log('✅ User updated successfully');

    return NextResponse.json({
      success: true,
      message: 'Profil başarıyla güncellendi',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
} 