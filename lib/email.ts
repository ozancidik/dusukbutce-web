import nodemailer from 'nodemailer';

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: EmailData) {
  try {
    // Gmail SMTP transporter oluştur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });

    // E-posta içeriği
    const mailOptions = {
      from: process.env.GMAIL_USER,
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
