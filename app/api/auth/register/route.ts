import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { sanitizeInput, checkSQLInjection } from '@/lib/security';
import { sendEmailVerificationEmail } from '@/lib/email';
import crypto from 'crypto';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Spam koruması: IP başına 15 dakikada en fazla 5 kayıt denemesi.
    const limited = checkRateLimit(request, { name: 'register', limit: 5, windowMs: 15 * 60_000 });
    if (limited) return limited;

    await connectDB();

    const body = await request.json();
    const {
      email,
      password,
      firstName,
      lastName,
      cep_telefonu,
      birth_date,
      acceptNewsletter,
      kvkkApproved
    } = body;

    const rawBirthDate =
      typeof birth_date === 'string' && birth_date.trim()
        ? birth_date.trim()
        : typeof body.birthDate === 'string' && body.birthDate.trim()
          ? body.birthDate.trim()
          : typeof body.dogum_tarihi === 'string' && body.dogum_tarihi.trim()
            ? body.dogum_tarihi.trim()
            : '';

    // Input validation
    if (!email || !password || !firstName || !lastName || !cep_telefonu) {
      return NextResponse.json(
        { error: 'Tüm alanlar gerekli' },
        { status: 400 }
      );
    }

    // KVKK onayı zorunlu
    if (kvkkApproved !== true) {
      return NextResponse.json(
        { error: 'KVKK aydınlatma metnini ve gizlilik politikasını onaylamanız gerekmektedir.' },
        { status: 400 }
      );
    }

    // Name'i birleştir
    const name = `${firstName} ${lastName}`;

    // XSS koruması
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedName = sanitizeInput(name);

    // SQL Injection kontrolü
    if (checkSQLInjection(email) || checkSQLInjection(name)) {
      return NextResponse.json(
        { error: 'Geçersiz karakterler tespit edildi' },
        { status: 400 }
      );
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Geçersiz email formatı' },
        { status: 400 }
      );
    }

    // Şifre güvenliği
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Şifre en az 6 karakter olmalı' },
        { status: 400 }
      );
    }

    // Kullanıcı var mı kontrol et (email)
    const existingUserByEmail = await User.findOne({ email: sanitizedEmail });
    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'Bu email adresi zaten kayıtlı. Lütfen farklı bir email adresi kullanın.' },
        { status: 400 }
      );
    }

    // Telefon numarası kontrolü (zorunlu)
    // Telefon numarasını temizle ve formatla
    const cleanedPhone = cep_telefonu.replace(/\s/g, '').replace(/[\(\)]/g, '');
    // Eğer zaten 0 ile başlıyorsa, sadece temizle; değilse 0 ekle
    const sanitizedPhone = cleanedPhone.startsWith('0') ? cleanedPhone : '0' + cleanedPhone;
    
    // Telefon numarası format kontrolü
    if (sanitizedPhone.length !== 11 || !sanitizedPhone.startsWith('0')) {
      return NextResponse.json(
        { error: 'Geçerli bir telefon numarası giriniz. Örn: (555) 123 45 67' },
        { status: 400 }
      );
    }
    
    const existingUserByPhone = await User.findOne({ phone: sanitizedPhone });
    if (existingUserByPhone) {
      return NextResponse.json(
        { error: 'Bu telefon numarası zaten kayıtlı. Lütfen farklı bir telefon numarası kullanın.' },
        { status: 400 }
      );
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 12);

    // Email doğrulama token'ı oluştur
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 saat

    // Yeni kullanıcı oluştur
    const now = new Date();
    const user = new User({
      email: sanitizedEmail,
      password: hashedPassword,
      name: sanitizedName,
      phone: sanitizedPhone,
      dogum_tarihi: rawBirthDate ? new Date(rawBirthDate) : null,
      birthDate: rawBirthDate,
      acceptNewsletter: acceptNewsletter || false,
      kvkkApproved: true,
      kvkkApprovedAt: now,
      emailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      authProviders: [{
        provider: 'local',
        providerId: null,
        connectedAt: new Date()
      }]
    });

    await user.save();

    // Email doğrulama maili gönder
    const emailSent = await sendEmailVerificationEmail(
      sanitizedEmail,
      verificationToken,
      sanitizedName
    );

    if (!emailSent) {
      console.error('Email doğrulama maili gönderilemedi');
    }

    return NextResponse.json(
      { 
        message: 'Kullanıcı başarıyla oluşturuldu. Email adresinizi kontrol edin.',
        emailSent: emailSent
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Register error:', error);
    
    // MongoDB duplicate key error kontrolü
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      if (duplicateField === 'email') {
        return NextResponse.json(
          { error: 'Bu email adresi zaten kayıtlı. Lütfen farklı bir email adresi kullanın.' },
          { status: 400 }
        );
      } else if (duplicateField === 'phone') {
        return NextResponse.json(
          { error: 'Bu telefon numarası zaten kayıtlı. Lütfen farklı bir telefon numarası kullanın.' },
          { status: 400 }
        );
      }
    }
    
    // Validation error kontrolü
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: `Veri doğrulama hatası: ${validationErrors.join(', ')}` },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
} 