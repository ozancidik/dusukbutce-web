import nodemailer from 'nodemailer';

// E-posta transporter konfigürasyonu
export const transporter = nodemailer.createTransporter({
  service: 'gmail', // Gmail kullanıyoruz
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Şifre sıfırlama e-postası gönderme fonksiyonu
export async function sendPasswordResetEmail(
  email: string, 
  resetToken: string, 
  userName: string
) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  const mailOptions = {
    from: `"Düşük Bütçe" <${process.env.EMAIL_USER || 'noreply@dusukbutce.com'}>`,
    to: email,
    subject: 'Şifre Sıfırlama - Düşük Bütçe',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Şifre Sıfırlama</h1>
        </div>
        
        <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Merhaba <strong>${userName}</strong>,
          </p>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            Hesabınız için şifre sıfırlama talebinde bulundunuz. Aşağıdaki butona tıklayarak yeni şifrenizi belirleyebilirsiniz.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="
              display: inline-block;
              background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
              color: white;
              text-decoration: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-weight: 600;
              font-size: 16px;
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            ">
              Şifremi Sıfırla
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-bottom: 20px;">
            Bu bağlantı <strong>1 saat</strong> boyunca geçerlidir. Eğer şifre sıfırlama talebinde bulunmadıysanız, bu e-postayı görmezden gelebilirsiniz.
          </p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px; margin: 0; text-align: center;">
              <strong>Güvenlik Uyarısı:</strong> Şifrenizi kimseyle paylaşmayın. Düşük Bütçe ekibi asla şifrenizi sormaz.
            </p>
          </div>
          
          <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 20px 0 0 0;">
            Bu e-posta otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 20px;">
          <p style="color: #9ca3af; font-size: 12px;">
            © 2024 Düşük Bütçe. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Şifre sıfırlama e-postası gönderildi:', email);
    return true;
  } catch (error) {
    console.error('❌ E-posta gönderme hatası:', error);
    return false;
  }
}
