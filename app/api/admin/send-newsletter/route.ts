import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from "../utils/requireAdmin";

// Google Workspace transporter fonksiyonu (lib/email.ts'den aynı mantık)
let cachedTransporter: nodemailer.Transporter | null = null;

function createTransporter(): nodemailer.Transporter {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'info@dusukbutce.com',
      pass: process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 14,
  });

  return cachedTransporter;
}

export async function POST(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    const { subject, message, subscribers } = await request.json();

    if (!subject || !message || !subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Gerekli alanlar eksik' },
        { status: 400 }
      );
    }

    // Google Workspace transporter kullan
    const transporter = createTransporter();

    let successCount = 0;
    let failedCount = 0;

    // Her aboneye mail gönder
    for (const subscriber of subscribers) {
      try {
        const mailOptions = {
          from: {
            name: 'Düşük Bütçe',
            address: process.env.EMAIL_USER || 'info@dusukbutce.com'
          },
          replyTo: 'info@dusukbutce.com',
          to: subscriber.email,
          subject: subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Düşük Bütçe 📧</h1>
              </div>
              
              <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
                <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="color: #374151; margin: 0; line-height: 1.6;">
                    Merhaba <strong>${subscriber.name}</strong>,
                  </p>
                </div>
                
                <div style="color: #374151; line-height: 1.8; margin: 20px 0; white-space: pre-wrap;">
                  ${message}
                </div>
                
                <div style="margin: 30px 0; text-align: center;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dusukbutce.com'}" 
                     style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600;">
                    🛒 Siteyi Ziyaret Et
                  </a>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 12px; color: #9ca3af;">
                  <p style="margin: 0 0 8px 0;">Bu e-postayı almak istemiyorsanız, profil ayarlarınızdan newsletter aboneliğini iptal edebilirsiniz.</p>
                  <p style="margin: 0;">© ${new Date().getFullYear()} Düşük Bütçe. Tüm hakları saklıdır.</p>
                </div>
              </div>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);
        successCount++;
        console.log(`✅ Mail gönderildi: ${subscriber.email}`);
      } catch (error) {
        failedCount++;
        console.error(`❌ Mail gönderilemedi: ${subscriber.email}`, error);
      }
    }

    return NextResponse.json({
      success: true,
      sent: successCount,
      failed: failedCount,
      message: `${successCount} mail başarıyla gönderildi, ${failedCount} hata oluştu.`
    });

  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Newsletter send error:', error);
    return NextResponse.json(
      { success: false, error: 'Mail gönderimi başarısız' },
      { status: 500 }
    );
  }
}










