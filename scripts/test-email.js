/**
 * Email gönderim test scripti
 * Production ortamında email ayarlarını test etmek için kullanılır
 * 
 * Kullanım: node scripts/test-email.js
 */

const nodemailer = require('nodemailer');

async function testEmailSetup() {
  console.log('🔍 Email yapılandırması test ediliyor...\n');

  // Environment değişkenlerini kontrol et
  console.log('📋 Environment Değişkenleri:');
    console.log('- EMAIL_USER:', process.env.EMAIL_USER ? '✅ Tanımlı' : '❌ Tanımlı Değil');
    console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Tanımlı' : '❌ Tanımlı Değil');
    console.log('- GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? '✅ Tanımlı' : '❌ Tanımlı Değil');
    console.log('- NEXT_PUBLIC_SITE_URL:', process.env.NEXT_PUBLIC_SITE_URL || 'Tanımlı değil (varsayılan: http://localhost:3000)');
    console.log('- Default Email:', 'info@dusukbutce.com');
  console.log('');

  if (!process.env.EMAIL_PASS && !process.env.GMAIL_APP_PASSWORD) {
    console.error('❌ HATA: EMAIL_PASS veya GMAIL_APP_PASSWORD environment değişkeni tanımlı değil!');
    console.log('\n📝 Çözüm Adımları:');
    console.log('1. Google Workspace hesabınıza gidin');
    console.log('2. Google Hesap Ayarları > Güvenlik > 2 Adımlı Doğrulama açın');
    console.log('3. Uygulama Şifreleri bölümünden yeni bir uygulama şifresi oluşturun');
    console.log('4. Oluşturulan şifreyi EMAIL_PASS olarak environment değişkenlerine ekleyin');
    console.log('');
    process.exit(1);
  }

  try {
    console.log('📧 Email transporter oluşturuluyor...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'info@dusukbutce.com',
        pass: process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD
      }
    });

    console.log('✅ Transporter oluşturuldu\n');

    // Bağlantıyı doğrula
    console.log('🔗 Gmail bağlantısı test ediliyor...');
    await transporter.verify();
    console.log('✅ Gmail bağlantısı başarılı!\n');

    // Test maili gönder
    console.log('📨 Test e-postası gönderiliyor...');
    const testEmail = process.argv[2] || 'ozancidik@gmail.com';
    
    const info = await transporter.sendMail({
      from: {
        name: 'Düşük Bütçe Test',
        address: 'info@dusukbutce.com'
      },
      to: testEmail,
      subject: '🧪 Email Sistemi Test - Düşük Bütçe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #10b981;">✅ Email Sistemi Çalışıyor!</h2>
          <p>Bu bir test e-postasıdır. Email gönderim sisteminiz başarıyla çalışıyor.</p>
          <p><strong>Gönderim Zamanı:</strong> ${new Date().toLocaleString('tr-TR')}</p>
          <p><strong>Sunucu:</strong> ${process.env.NODE_ENV || 'development'}</p>
        </div>
      `
    });

    console.log('✅ Test e-postası başarıyla gönderildi!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📧 Gönderilen Adres:', testEmail);
    console.log('\n🎉 Email sistemi tam olarak çalışıyor!');

  } catch (error) {
    console.error('\n❌ HATA: Email gönderimi başarısız!');
    console.error('Hata Detayı:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n📝 Kimlik Doğrulama Hatası Çözümleri:');
      console.log('1. GMAIL_APP_PASSWORD değişkeninin doğru olduğundan emin olun');
      console.log('2. Gmail hesabınızda 2 Adımlı Doğrulama\'nın açık olduğundan emin olun');
      console.log('3. "Az güvenilir uygulamalara izin ver" ayarını kontrol edin');
      console.log('4. Yeni bir Uygulama Şifresi oluşturun ve tekrar deneyin');
    } else if (error.code === 'ECONNECTION') {
      console.log('\n📝 Bağlantı Hatası Çözümleri:');
      console.log('1. İnternet bağlantınızı kontrol edin');
      console.log('2. Firewall ayarlarınızı kontrol edin');
      console.log('3. Gmail SMTP portlarının (587, 465) açık olduğundan emin olun');
    }
    
    console.log('');
    process.exit(1);
  }
}

// Script'i çalıştır
testEmailSetup();

