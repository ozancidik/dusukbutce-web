import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Contact from '../../../models/Contact';
import { sendContactNotification } from '../../../lib/email';
import { checkRateLimit } from '../../../lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Kimlik doğrulaması olmayan, herkese açık form — sınırsız kayıt/mail
    // tetiklemesine karşı koruma.
    const limited = checkRateLimit(request, { name: 'contact', limit: 5, windowMs: 15 * 60_000 });
    if (limited) return limited;

    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Create contact
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim()
    });

    await contact.save();

    // E-posta bildirimi gönder (async - kullanıcı beklemeden response döndür)
    sendContactNotification({
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message
    })
    .then(() => {
      console.log('✅ İletişim formu bildirimi gönderildi');
    })
    .catch((emailError) => {
      console.error('E-posta gönderim hatası:', emailError);
      // E-posta hatası olsa bile form kaydedildi, sadece log'la
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
        contactId: contact._id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}
