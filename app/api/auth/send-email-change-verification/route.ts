import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "../../../../models/User";
import crypto from "crypto";
import { sendEmailChangeVerificationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Email değişikliği doğrulama kodu gönderme API çağrıldı');
    
    const { userId, newEmail } = await request.json();
    
    if (!userId || !newEmail) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı ID ve yeni email adresi gerekli' },
        { status: 400 }
      );
    }

    await connectDB();
    
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    // Yeni email'in başka bir kullanıcı tarafından kullanılıp kullanılmadığını kontrol et
    const existingUser = await User.findOne({ email: newEmail.toLowerCase() });
    if (existingUser && existingUser._id.toString() !== userId) {
      return NextResponse.json(
        { success: false, error: 'Bu email adresi zaten kullanılıyor' },
        { status: 400 }
      );
    }

    // 6 haneli doğrulama kodu oluştur
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 dakika geçerli

    // Kullanıcıya geçici doğrulama kodu kaydet
    user.emailChangeVerificationCode = verificationCode;
    user.emailChangeVerificationExpiry = codeExpiry;
    user.pendingEmailChange = newEmail.toLowerCase();
    await user.save();

    console.log('✅ Email değişikliği doğrulama kodu oluşturuldu:', newEmail);

    const emailSent = await sendEmailChangeVerificationEmail(newEmail, verificationCode, user.name);
    
    if (!emailSent) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'E-posta gönderilemedi. Lütfen tekrar deneyin.' 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Doğrulama kodu yeni email adresinize gönderildi.'
    });

  } catch (error) {
    console.error('❌ Email değişikliği doğrulama kodu gönderme hatası:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'E-posta gönderme işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    );
  }
}



