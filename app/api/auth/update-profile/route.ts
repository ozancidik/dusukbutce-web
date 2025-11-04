import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('📝 Profile update request body:', body);
    
    const { userId, firstName, lastName, email, phone, birthDate, emailVerificationCode } = body;

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

    // Email değişikliği varsa, doğrulama kodu kontrolü yap
    if (email && email !== user.email) {
      // Doğrulama kodu gerekli
      if (!emailVerificationCode) {
        return NextResponse.json(
          { success: false, message: 'Email değişikliği için doğrulama kodu gerekli' },
          { status: 400 }
        );
      }

      // Doğrulama kodu kontrolü
      if (user.emailChangeVerificationCode !== emailVerificationCode) {
        return NextResponse.json(
          { success: false, message: 'Geçersiz doğrulama kodu' },
          { status: 400 }
        );
      }

      // Kod süresi kontrolü
      if (!user.emailChangeVerificationExpiry || new Date() > user.emailChangeVerificationExpiry) {
        return NextResponse.json(
          { success: false, message: 'Doğrulama kodu süresi dolmuş. Lütfen yeni kod isteyin.' },
          { status: 400 }
        );
      }

      // Bekleyen email ile eşleşme kontrolü
      if (user.pendingEmailChange !== email.toLowerCase()) {
        return NextResponse.json(
          { success: false, message: 'Doğrulama kodu bu email adresi için geçerli değil' },
          { status: 400 }
        );
      }

      // Email'in başka bir kullanıcı tarafından kullanılıp kullanılmadığını kontrol et
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser && existingUser._id.toString() !== userId) {
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
    user.birthDate = birthDate || user.birthDate;
    user.updatedAt = new Date();

    // Email değişikliği başarılı olduysa doğrulama kodlarını temizle
    if (email && email !== user.email) {
      user.emailChangeVerificationCode = undefined;
      user.emailChangeVerificationExpiry = undefined;
      user.pendingEmailChange = undefined;
    }

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
        birthDate: user.birthDate,
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