import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import { getVerifiedUserId } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const userId = getVerifiedUserId(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log('📝 Profile update request body:', body);

    const { firstName, lastName, email, phone, birthDate, emailVerificationCode } = body;

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
      phone: phone || user.phone,
      birthDate: birthDate || user.birthDate
    });
    
    // OAuth kullanıcısı kontrolü
    const authProviders = user.authProviders || [];
    const hasSocialProvider = authProviders.some((p: any) => p.provider === 'google' || p.provider === 'facebook');
    const hasLocalProvider = authProviders.some((p: any) => p.provider === 'local');
    
    // Doğum tarihi güncellemesi kontrolü - KESIN KONTROL
    // Eğer birthDate gönderilmişse (undefined, null, veya boş string değilse) kontrol et
    if (birthDate !== undefined && birthDate !== null && birthDate !== '') {
      console.log('🔍 API: birthDate gönderildi:', birthDate);
      console.log('🔍 API: user.birthDateEdited:', user.birthDateEdited);
      console.log('🔍 API: hasSocialProvider:', hasSocialProvider);
      console.log('🔍 API: hasLocalProvider:', hasLocalProvider);
      console.log('🔍 API: mevcut user.birthDate:', user.birthDate);
      console.log('🔍 API: birthDate !== user.birthDate:', birthDate !== user.birthDate);
      
      if (hasLocalProvider) {
        // Local authentication kullanıcıları için doğum tarihi güncellenemez (register'da set edilir)
        // Eğer mevcut değerden farklı bir değer gönderilirse, reddet
        if (birthDate !== user.birthDate) {
          console.log('❌ API: Local user için doğum tarihi güncellenemez');
          return NextResponse.json(
            { success: false, message: 'Doğum tarihi güncellenemez. Kayıt sırasında belirlenmiş değer değiştirilemez.' },
            { status: 400 }
          );
        }
        // Aynı değer gönderilirse, sorun yok (normal güncelleme, diğer alanlar için)
        console.log('✅ API: Local user, doğum tarihi aynı, güncelleme yapılmıyor');
      } else if (hasSocialProvider) {
        // OAuth kullanıcıları için kontrol
        if (user.birthDateEdited) {
          // Daha önce düzenlenmişse, yeni değer gönderilirse KESINLIKLE reddet
          if (birthDate !== user.birthDate) {
            console.log('❌ API: Doğum tarihi daha önce düzenlenmiş, yeni değer reddedildi');
            console.log('❌ API: Gönderilen değer:', birthDate);
            console.log('❌ API: Mevcut değer:', user.birthDate);
            return NextResponse.json(
              { success: false, message: 'Doğum tarihi daha önce belirlenmiş. Artık değiştirilemez.' },
              { status: 400 }
            );
          }
          // Aynı değer gönderilirse, sorun yok (normal güncelleme, diğer alanlar için)
          console.log('✅ API: Doğum tarihi aynı (daha önce düzenlenmiş), güncelleme yapılmıyor');
        } else {
          // İlk kez düzenleniyor
          if (birthDate !== user.birthDate) {
            // Yeni bir değer gönderilmiş
            user.birthDate = birthDate;
            user.birthDateEdited = true; // Artık bir daha değiştirilemez
            console.log('✅ API: Doğum tarihi ilk kez güncellendi ve birthDateEdited=true yapıldı');
          } else if (user.birthDate && birthDate === user.birthDate) {
            // Aynı değer gönderilmiş ama zaten bir değer varsa, işaretle
            user.birthDateEdited = true;
            console.log('✅ API: Doğum tarihi aynı ama birthDateEdited=true yapıldı (zaten değer var)');
          } else {
            // İlk kez bir değer gönderiliyor
            user.birthDate = birthDate;
            user.birthDateEdited = true;
            console.log('✅ API: Doğum tarihi ilk kez set edildi ve birthDateEdited=true yapıldı');
          }
        }
      }
    } else {
      // birthDate gönderilmemişse, mevcut durumu koru
      // Ama eğer OAuth kullanıcısı ise ve birthDateEdited false ise, hiçbir şey yapma
      console.log('🔍 API: birthDate gönderilmedi, mevcut değer korunuyor');
      
      // Eğer OAuth kullanıcısı ise ve birthDateEdited true ise, mevcut değeri koru
      if (hasSocialProvider && user.birthDateEdited && user.birthDate) {
        console.log('✅ API: OAuth kullanıcısı, birthDateEdited=true, mevcut değer korunuyor:', user.birthDate);
      }
    }
    
    user.name = name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
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
        birthDateEdited: user.birthDateEdited,
        isAdmin: user.isAdmin,
        authProviders: user.authProviders || []
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

export async function GET(request: NextRequest) {
  try {
    const userId = getVerifiedUserId(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    // MongoDB'ye bağlan
    await connectDB();

    // Kullanıcıyı bul
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // MIGRATION: Eğer OAuth kullanıcısı ise ve zaten bir birthDate değeri varsa
    // ama birthDateEdited false ise, bunu true yap (eski kayıtlar için)
    const authProviders = user.authProviders || [];
    const hasSocialProvider = authProviders.some((p: any) => p.provider === 'google' || p.provider === 'facebook');
    const hasLocalProvider = authProviders.some((p: any) => p.provider === 'local');
    
    if (hasSocialProvider && !hasLocalProvider && user.birthDate && !user.birthDateEdited) {
      // OAuth kullanıcısı, zaten bir doğum tarihi var ama birthDateEdited false
      // Bu eski bir kayıt, migration yap
      console.log('🔄 MIGRATION: OAuth kullanıcısı için birthDateEdited flag\'i set ediliyor');
      console.log('🔄 user.birthDate:', user.birthDate);
      console.log('🔄 user.birthDateEdited (önceki):', user.birthDateEdited);
      console.log('🔄 user._id:', user._id);
      
      user.birthDateEdited = true;
      await user.save();
      
      console.log('✅ MIGRATION: birthDateEdited=true yapıldı ve kaydedildi');
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birthDate: user.birthDate,
        birthDateEdited: user.birthDateEdited || false,
        isAdmin: user.isAdmin,
        authProviders: user.authProviders || []
      }
    });

  } catch (error) {
    console.error('Profile get error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
} 