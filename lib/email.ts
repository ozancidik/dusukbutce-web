import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Transporter cache - her seferinde yeni transporter oluşturmamak için
let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const gmailUser = process.env.GMAIL_USER || 'info@dusukbutce.com';
  let gmailPassword = process.env.GMAIL_APP_PASSWORD;
  
  if (!gmailPassword) {
    throw new Error('GMAIL_APP_PASSWORD environment değişkeni tanımlı değil!');
  }
  
  // Boşlukları temizle
  gmailPassword = gmailPassword.replace(/\s+/g, '').trim();
  
  if (!gmailPassword || gmailPassword.length < 16) {
    throw new Error('GMAIL_APP_PASSWORD geçersiz! (çok kısa veya boş)');
  }

  cachedTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword
    },
    // Daha kısa timeout'lar - hızlı hata dönüşü için
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 5000
  });

  return cachedTransporter;
}

export async function sendPasswordResetEmail(email: string, resetToken: string, userName: string) {
  try {
    // Cached transporter kullan - verify() kontrolünü kaldırdık (hız için)
    const transporter = getTransporter();
    const gmailUser = process.env.GMAIL_USER || 'info@dusukbutce.com';

    // Reset URL oluştur
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/sifre-sifirla?token=${resetToken}`;
    
    // E-posta içeriği
    const mailOptions = {
      from: {
        name: 'Düşük Bütçe Destek',
        address: gmailUser
      },
      replyTo: gmailUser,
      to: email,
      subject: 'Şifre Sıfırlama - Düşük Bütçe',
      text: `Merhaba ${userName},

Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:
${resetUrl}

Bu bağlantı 1 saat süreyle geçerlidir.

Eğer bu işlemi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.

Düşük Bütçe Destek Ekibi`,
      html: `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Şifre Sıfırlama</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 20px;">
    <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-top: 0;">
      🔐 Şifre Sıfırlama
    </h2>
    
    <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="color: #374151; margin: 0; line-height: 1.6;">
        Merhaba <strong>${userName}</strong>,
      </p>
      <p style="color: #374151; margin: 10px 0; line-height: 1.6;">
        Şifrenizi sıfırlamak için aşağıdaki butona tıklayın. Bu bağlantı 1 saat süreyle geçerlidir.
      </p>
    </div>
    
    <div style="margin: 20px 0; text-align: center;">
      <a href="${resetUrl}" 
         style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
        🔑 Şifremi Sıfırla
      </a>
    </div>
    
    <div style="margin: 20px 0; padding: 15px; background: #f3f4f6; border-radius: 8px;">
      <p style="color: #6b7280; margin: 0; font-size: 14px;">
        Buton çalışmıyorsa, aşağıdaki bağlantıyı tarayıcınıza kopyalayıp yapıştırın:
      </p>
      <p style="color: #2563eb; margin: 10px 0 0 0; font-size: 12px; word-break: break-all;">
        ${resetUrl}
      </p>
    </div>
    
    <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-top: 20px;">
      <p style="color: #92400e; margin: 0; font-size: 14px;">
        <strong>⚠️ Güvenlik Uyarısı:</strong> Bu e-postayı siz talep etmediyseniz, lütfen dikkate almayın.
      </p>
    </div>
  </div>
</body>
</html>
      `
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Şifre sıfırlama e-postası gönderildi:', info.messageId);
    return true;

  } catch (error: any) {
    console.error('❌ Şifre sıfırlama e-postası gönderim hatası:', error);
    
    // Auth hatası varsa transporter'ı sıfırla - belki yanlış credentials var
    if (error.code === 'EAUTH' || error.message?.includes('GMAIL')) {
      cachedTransporter = null;
      console.error('🔐 Gmail kimlik doğrulama hatası! Transporter cache temizlendi.');
      console.error('💡 Çözüm adımları:');
      console.error('1. .env.local dosyasında GMAIL_USER değerini kontrol edin');
      console.error('2. GMAIL_APP_PASSWORD değerinin doğru olduğundan emin olun');
      console.error('3. Gmail hesabında 2 faktörlü doğrulama açık olmalı');
      console.error('4. Gmail App Password\'un doğru hesap için oluşturulduğundan emin olun');
      console.error('5. Yeni bir App Password oluşturmayı deneyin');
    }
    return false;
  }
}

export async function sendContactNotification(data: EmailData) {
  try {
    // Gmail SMTP yapılandırmasını kontrol et
    const gmailUser = process.env.GMAIL_USER || 'info@dusukbutce.com';
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailPassword) {
      console.error('❌ GMAIL_APP_PASSWORD environment değişkeni tanımlı değil!');
      return false;
    }
    
    // Gmail SMTP transporter oluştur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      }
    });

    // E-posta içeriği
    const mailOptions = {
      from: {
        name: 'Düşük Bütçe İletişim',
        address: gmailUser
      },
      replyTo: gmailUser,
      to: 'ozancidik@gmail.com', // Bildirim gidecek e-posta
      subject: `Yeni İletişim Formu: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            🆕 Yeni İletişim Formu Mesajı
          </h2>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">📋 Form Detayları</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Ad Soyad:</td>
                <td style="padding: 8px 0; color: #6b7280;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">E-posta:</td>
                <td style="padding: 8px 0; color: #6b7280;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Konu:</td>
                <td style="padding: 8px 0; color: #6b7280;">${data.subject}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0369a1; margin-top: 0;">💬 Mesaj</h3>
            <p style="color: #0c4a6e; line-height: 1.6; margin: 0;">${data.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>⏰ Gönderim Zamanı:</strong> ${new Date().toLocaleString('tr-TR')}
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
              🔐 Giriş Yap
            </a>
          </div>
        </div>
      `
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);
    console.log('E-posta gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('E-posta gönderim hatası:', error);
    return false;
  }
}

// Müşteri teklifi kabul ettiğinde admin'e gönderilecek mail
export async function sendCustomerAcceptEmailToAdmin(customerEmail: string, customerName: string, productName: string, offerAmount: number | string, adminEmail: string = 'ozancidik@gmail.com') {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Offer amount'u number'a çevir ve formatla
    const formattedAmount = Number(offerAmount).toLocaleString('tr-TR');

    const mailOptions = {
      from: 'info@dusukbutce.com',
      replyTo: 'info@dusukbutce.com',
      to: adminEmail,
      subject: `✅ Müşteri Teklifi Kabul Etti - ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            ✅ Müşteri Teklifi Kabul Etti
          </h2>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              <strong>${customerName}</strong> müşterisi teklifinizi kabul etti!
            </p>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6;">
              <strong>${productName}</strong> ürünü için verdiğiniz teklif onaylandı.
            </p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0369a1; margin-top: 0;">📋 Teklif Detayları</h3>
            <div style="text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #059669; margin: 10px 0;">
                ${formattedAmount} TL
              </div>
              <p style="color: #065f46; margin: 0; font-size: 14px;">Kabul Edilen Tutar</p>
            </div>
          </div>
          
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>📞 Müşteri Bilgileri:</strong> ${customerName} - ${customerEmail}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Müşteri kabul maili admin\'e gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('Müşteri kabul maili gönderim hatası:', error);
    return false;
  }
}

// Müşteri teklifi reddettiğinde admin'e gönderilecek mail
export async function sendCustomerRejectEmailToAdmin(customerEmail: string, customerName: string, productName: string, offerAmount: number | string, reason?: string, adminEmail: string = 'ozancidik@gmail.com') {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Offer amount'u number'a çevir ve formatla
    const formattedAmount = Number(offerAmount).toLocaleString('tr-TR');

    const mailOptions = {
      from: 'info@dusukbutce.com',
      replyTo: 'info@dusukbutce.com',
      to: adminEmail,
      subject: `❌ Müşteri Teklifi Reddetti - ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            ❌ Müşteri Teklifi Reddetti
          </h2>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              <strong>${customerName}</strong> müşterisi teklifinizi reddetti.
            </p>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6;">
              <strong>${productName}</strong> ürünü için verdiğiniz teklif kabul edilmedi.
            </p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0369a1; margin-top: 0;">📋 Teklif Detayları</h3>
            <div style="text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #dc2626; margin: 10px 0;">
                ${formattedAmount} TL
              </div>
              <p style="color: #991b1b; margin: 0; font-size: 14px;">Reddedilen Tutar</p>
            </div>
            ${reason ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>📝 Red Sebebi:</strong> ${reason}
              </p>
            </div>
            ` : ''}
          </div>
          
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>📞 Müşteri Bilgileri:</strong> ${customerName} - ${customerEmail}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Müşteri red maili admin\'e gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('Müşteri red maili gönderim hatası:', error);
    return false;
  }
}

// Admin teklifi kabul ettiğinde müşteriye gönderilecek mail
export async function sendAdminAcceptEmailToCustomer(customerEmail: string, customerName: string, productName: string, offerAmount: number | string) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Offer amount'u number'a çevir ve formatla
    const formattedAmount = Number(offerAmount).toLocaleString('tr-TR');

    const mailOptions = {
      from: 'info@dusukbutce.com',
      replyTo: 'info@dusukbutce.com',
      to: customerEmail,
      subject: `✅ Teklifiniz Kabul Edildi - Düşük Bütçe`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #059669; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            ✅ Teklifiniz Kabul Edildi
          </h2>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              Merhaba <strong>${customerName}</strong>,
            </p>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6;">
              <strong>${productName}</strong> ürününüz için verdiğiniz teklif kabul edildi!
            </p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0369a1; margin-top: 0;">💰 Teklif Detayları</h3>
            <div style="text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #059669; margin: 10px 0;">
                ${formattedAmount} TL
              </div>
              <p style="color: #065f46; margin: 0; font-size: 14px;">Kabul Edilen Tutar</p>
            </div>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/tekliflerim" 
               style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
              📋 Tekliflerimi Görüntüle
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>📞 İletişim:</strong> Sorularınız için <a href="mailto:info@dusukbutce.com" style="color: #2563eb;">info@dusukbutce.com</a> adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin kabul maili müşteriye gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('Admin kabul maili gönderim hatası:', error);
    return false;
  }
}

// Admin teklifi reddettiğinde müşteriye gönderilecek mail
export async function sendAdminRejectEmailToCustomer(customerEmail: string, customerName: string, productName: string, reason?: string) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const mailOptions = {
      from: 'info@dusukbutce.com',
      replyTo: 'info@dusukbutce.com',
      to: customerEmail,
      subject: `❌ Teklifiniz Reddedildi - Düşük Bütçe`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            ❌ Teklifiniz Reddedildi
          </h2>
          
          <div style="background: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              Merhaba <strong>${customerName}</strong>,
            </p>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6;">
              <strong>${productName}</strong> ürününüz için verdiğiniz teklif maalesef kabul edilmedi.
            </p>
          </div>
          
          ${reason ? `
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>📝 Red Sebebi:</strong> ${reason}
            </p>
          </div>
          ` : ''}
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/bize-sat" 
               style="background: #2563eb; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
              🔄 Yeni Ürün Sat
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>📞 İletişim:</strong> Sorularınız için <a href="mailto:info@dusukbutce.com" style="color: #2563eb;">info@dusukbutce.com</a> adresinden bize ulaşabilirsiniz.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Admin red maili müşteriye gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('Admin red maili gönderim hatası:', error);
    return false;
  }
}

export async function sendOfferEmail(customerEmail: string, customerName: string, productName: string, offerAmount: number | string, notes?: string) {
  try {
    // Gmail SMTP transporter oluştur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // Offer amount'u number'a çevir ve formatla
    const formattedAmount = Number(offerAmount).toLocaleString('tr-TR');

    // E-posta içeriği
    const mailOptions = {
      from: 'info@dusukbutce.com',
      replyTo: 'info@dusukbutce.com',
      to: customerEmail,
      subject: `💰 Ürününüz İçin Teklifimiz - Düşük Bütçe`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            💰 Teklifimiz
          </h2>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              Merhaba <strong>${customerName}</strong>,
            </p>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6;">
              <strong>${productName}</strong> ürününüz için değerlendirme tamamlandı ve size özel teklifimizi sunuyoruz.
            </p>
          </div>
          
          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <h3 style="color: #047857; margin-top: 0;">💵 Teklif Detayları</h3>
            <div style="text-align: center; margin: 20px 0;">
              <div style="font-size: 32px; font-weight: bold; color: #059669; margin: 10px 0;">
                ${formattedAmount} TL
              </div>
              <p style="color: #065f46; margin: 0; font-size: 14px;">Teklif Tutarı</p>
            </div>
            ${notes ? `
            <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 15px;">
              <p style="color: #92400e; margin: 0; font-size: 14px;">
                <strong>📝 Not:</strong> ${notes}
              </p>
            </div>
            ` : ''}
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/tekliflerim" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
              📋 Tekliflerimi Görüntüle
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>⚠️ Önemli:</strong> Bu teklif 24 saat süreyle geçerlidir. Teklifimizi kabul etmek için yukarıdaki butona tıklayarak tekliflerinizi görüntüleyebilirsiniz.
            </p>
          </div>
          
          <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center;">
            <p style="color: #6b7280; margin: 0; font-size: 14px;">
              <strong>📞 İletişim:</strong> Sorularınız için <a href="mailto:info@dusukbutce.com" style="color: #2563eb;">info@dusukbutce.com</a> adresinden bize ulaşabilirsiniz.
            </p>
          </div>
          
          <!-- Footer -->
          <div style="margin-top: 40px; padding: 30px 20px; background: #f8fafc; border-radius: 8px; text-align: center;">
            <div style="margin-bottom: 20px;">
              <h3 style="color: #1f2937; margin: 0; font-size: 18px;">Düşük Bütçe ®</h3>
            </div>
            
            <div style="margin-bottom: 15px;">
              <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">
                Kaliteli 2. el teknoloji ürünlerini uygun fiyatlarla herkesin erişimine sunuyoruz.
              </p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                <strong>🌐 Website:</strong> <a href="https://www.dusukbutce.com" style="color: #2563eb;">www.dusukbutce.com</a>
              </p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                <strong>📍 Adres:</strong> Atakent Mah. Yasemin Sokağı NO:4/B 34760 İstanbul, Türkiye
              </p>
            </div>
            
            <div style="margin-bottom: 15px;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                <strong>📧 Destek:</strong> <a href="mailto:info@dusukbutce.com" style="color: #2563eb;">info@dusukbutce.com</a>
              </p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="color: #6b7280; margin: 0; font-size: 13px; line-height: 1.6;">
                <strong>Misyonumuz:</strong> 2. el teknoloji pazarında güven ve şeffaflık sağlayarak, herkes için uygun fiyatlı ve kaliteli ürünler sunmak.
              </p>
            </div>
            
            <div style="border-top: 1px solid #e5e7eb; padding-top: 15px;">
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                <strong>Yasal Uyarı:</strong> Bu e-posta ve ekleri gizli bilgi içerebilir. Yanlışlıkla aldıysanız lütfen göndereni bilgilendirip mesajı siliniz.
              </p>
            </div>
          </div>
        </div>
      `
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);
    console.log('Teklif e-postası gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('Teklif e-postası gönderim hatası:', error);
    return false;
  }
}

// Yeni teklif formu gönderildiğinde admin'e bilgilendirme maili
export async function sendNewSubmissionNotificationToAdmin(submissionData: any) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    const productName = `${submissionData.brand || ''} ${submissionData.model || ''}`.trim() || 'Bilinmeyen Ürün';
    
    // Müşteri bilgilerini düzgün şekilde al
    const customerName = submissionData.customerInfo?.name || submissionData.customerInfo?.firstName || 'Müşteri';
    const customerEmail = submissionData.customerInfo?.email || submissionData.userId?.email || 'E-posta bilgisi yok';
    const customerPhone = submissionData.customerInfo?.phone || 'Telefon bilgisi yok';

    const mailOptions = {
      from: 'info@dusukbutce.com',
      replyTo: 'info@dusukbutce.com',
      to: 'info@dusukbutce.com',
      subject: `🆕 Yeni Teklif Formu - ${productName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            🆕 Yeni Teklif Formu
          </h2>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              Yeni bir teklif formu gönderildi ve değerlendirme bekliyor.
            </p>
          </div>
          
          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">📋 Ürün Bilgileri</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Kategori:</td>
                <td style="padding: 8px 0; color: #6b7280;">${submissionData.category || 'Belirtilmemiş'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Marka:</td>
                <td style="padding: 8px 0; color: #6b7280;">${submissionData.brand || 'Belirtilmemiş'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Model:</td>
                <td style="padding: 8px 0; color: #6b7280;">${submissionData.model || 'Belirtilmemiş'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Durum:</td>
                <td style="padding: 8px 0; color: #6b7280;">${submissionData.cosmeticCondition || 'Belirtilmemiş'}</td>
              </tr>
              ${submissionData.description ? `
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Açıklama:</td>
                <td style="padding: 8px 0; color: #6b7280;">${submissionData.description}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #0ea5e9;">
            <h3 style="color: #0369a1; margin-top: 0;">👤 Müşteri Bilgileri</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 120px;">Ad Soyad:</td>
                <td style="padding: 8px 0; color: #6b7280;">${customerName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">E-posta:</td>
                <td style="padding: 8px 0; color: #6b7280;">${customerEmail}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #374151;">Telefon:</td>
                <td style="padding: 8px 0; color: #6b7280;">${customerPhone}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>⏰ Gönderim Zamanı:</strong> ${new Date().toLocaleString('tr-TR')}
            </p>
          </div>
          
          <div style="margin-top: 20px; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">
              🔐 Admin Paneline Git
            </a>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Yeni teklif bildirimi admin\'e gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('Yeni teklif bildirimi gönderim hatası:', error);
    return false;
  }
}

export async function sendEmailVerificationEmail(email: string, verificationToken: string, userName: string) {
  try {
    // Gmail SMTP yapılandırmasını kontrol et
    const gmailUser = process.env.GMAIL_USER || 'info@dusukbutce.com';
    const gmailPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '') || process.env.GMAIL_APP_PASSWORD; // Boşlukları kaldır
    
    if (!gmailPassword) {
      console.error('❌ GMAIL_APP_PASSWORD environment değişkeni tanımlı değil!');
      return false;
    }
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword.trim() // Boşlukları temizle
      }
    });

    const mailOptions = {
      from: {
        name: 'Düşük Bütçe Destek',
        address: gmailUser
      },
      replyTo: gmailUser,
      to: email,
      subject: 'Email Doğrulama - Düşük Bütçe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
            ✅ Email Doğrulama
          </h2>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151; margin: 0; line-height: 1.6;">
              Merhaba <strong>${userName}</strong>,
            </p>
            <p style="color: #374151; margin: 10px 0; line-height: 1.6;">
              Düşük Bütçe'ye hoş geldiniz! Hesabınızı aktifleştirmek için email adresinizi doğrulamanız gerekiyor.
            </p>
          </div>
          
          <div style="margin: 20px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
              ✅ Email Adresimi Doğrula
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>⚠️ Önemli:</strong> Bu bağlantı 24 saat süreyle geçerlidir. Email doğrulaması yapmadan giriş yapamazsınız.
            </p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f9fafb; border-radius: 8px;">
            <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">
              <strong>📧 Sorun mu yaşıyorsunuz?</strong> Eğer yukarıdaki buton çalışmıyorsa, aşağıdaki bağlantıyı kopyalayıp tarayıcınıza yapıştırabilirsiniz:
            </p>
            <p style="color: #2563eb; margin: 10px 0 0 0; font-size: 12px; word-break: break-all;">
              ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email doğrulama e-postası gönderildi:', info.messageId);
    return true;

  } catch (error) {
    console.error('Email doğrulama e-postası gönderim hatası:', error);
    return false;
  }
}

// Email değişikliği doğrulama kodu gönderme
export async function sendEmailChangeVerificationEmail(email: string, verificationCode: string, userName: string) {
  try {
    // Gmail SMTP yapılandırmasını kontrol et
    const gmailUser = process.env.GMAIL_USER || 'info@dusukbutce.com';
    let gmailPassword = process.env.GMAIL_APP_PASSWORD;
    
    if (!gmailPassword) {
      console.error('❌ GMAIL_APP_PASSWORD environment değişkeni tanımlı değil!');
      console.error('📧 Gmail User:', gmailUser);
      return false;
    }
    
    // Boşlukları temizle (Gmail App Password'ları bazen boşluklu gelir)
    gmailPassword = gmailPassword.replace(/\s+/g, '').trim();
    
    if (!gmailPassword || gmailPassword.length < 16) {
      console.error('❌ GMAIL_APP_PASSWORD geçersiz! (çok kısa veya boş)');
      console.error('📧 Gmail User:', gmailUser);
      return false;
    }
    
    console.log('📧 Email gönderme yapılandırması:');
    console.log('📧 Gmail User:', gmailUser);
    console.log('📧 Gmail Password Length:', gmailPassword.length);
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword
      },
      // Connection timeout ayarları
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000
    });
    
    // Bağlantıyı test et
    try {
      await transporter.verify();
      console.log('✅ Gmail SMTP bağlantısı başarılı');
    } catch (verifyError: any) {
      console.error('❌ Gmail SMTP bağlantı hatası:', verifyError.message);
      console.error('📧 Gmail User:', gmailUser);
      if (verifyError.code === 'EAUTH') {
        console.error('🔐 Kimlik doğrulama hatası: GMAIL_USER ve GMAIL_APP_PASSWORD eşleşmiyor olabilir');
        console.error('💡 Çözüm: .env.local dosyasında GMAIL_USER ve GMAIL_APP_PASSWORD değerlerini kontrol edin');
      }
      return false;
    }

    const mailOptions = {
      from: {
        name: 'Düşük Bütçe Destek',
        address: gmailUser
      },
      replyTo: gmailUser,
      to: email,
      subject: 'Email Değişikliği Doğrulama Kodu - Düşük Bütçe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1f2937; margin: 0;">🔐 Email Değişikliği Doğrulama</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Merhaba <strong>${userName}</strong>,
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              Email adresinizi değiştirmek için aşağıdaki doğrulama kodunu kullanın:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="display: inline-block; background: #1f2937; color: white; padding: 20px 40px; border-radius: 8px; font-size: 32px; font-weight: bold; letter-spacing: 4px; font-family: 'Courier New', monospace;">
                ${verificationCode}
              </div>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
              ⏰ Bu kod 10 dakika geçerlidir.
            </p>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
              <strong>⚠️ Güvenlik Uyarısı:</strong> Bu kodu kimseyle paylaşmayın. Düşük Bütçe ekibi asla sizden doğrulama kodu istemez.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              Bu e-posta otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email değişikliği doğrulama kodu gönderildi:', info.messageId);
    return true;

  } catch (error: any) {
    console.error('❌ Email değişikliği doğrulama kodu gönderim hatası:', error);
    if (error.code === 'EAUTH') {
      console.error('🔐 Gmail kimlik doğrulama hatası!');
      console.error('💡 Çözüm adımları:');
      console.error('1. .env.local dosyasında GMAIL_USER değerini kontrol edin');
      console.error('2. GMAIL_APP_PASSWORD değerinin doğru olduğundan emin olun');
      console.error('3. Gmail hesabında 2 faktörlü doğrulama açık olmalı');
      console.error('4. Gmail App Password\'un doğru hesap için oluşturulduğundan emin olun');
      console.error('5. Yeni bir App Password oluşturmayı deneyin');
    }
    return false;
  }
}
