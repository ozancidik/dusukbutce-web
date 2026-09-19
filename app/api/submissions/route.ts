import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { sendNewSubmissionNotificationToAdmin } from '@/lib/email';
import { getVerifiedUser, getVerifiedUserId } from '@/lib/auth';
import { ALLOWED_FIELDS } from '@/lib/handleProductSubmission';
import { generateSubmissionNumber } from '@/lib/numberGenerator';

export async function POST(request: NextRequest) {
  try {
    // Rate limit merkezi olarak middleware.ts'te uygulanıyor.
    console.log('📝 Submission başlatılıyor...');

    const body = await request.json();
    console.log('📝 Gelen veri:', JSON.stringify(body, null, 2));

    // JWT token'dan userId al (imza doğrulanır; token yoksa misafir gönderimi)
    const userId = getVerifiedUserId(request);

    // MongoDB bağlantısı kontrolü
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MongoDB URI tanımlı değil, veri console\'a yazdırılıyor:');
      console.log('📊 Submission Data:', {
        ...body,
        category: body.category || 'playstation',
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Submission received (MongoDB not configured)',
        data: body
      });
    }
    
    // MongoDB bağlantısı varsa normal işlemi yap
    const { default: connectDB } = await import('../../../lib/mongodb');
    const { default: ProductSubmission } = await import('../../../models/ProductSubmission');
    const { default: User } = await import('../../../models/User');
    
    console.log('🔗 MongoDB bağlantısı kuruluyor...');
    await connectDB();
    console.log('✅ MongoDB bağlantısı başarılı');
    
    // Sadece izin verilen ürün alanlarını al — offer/listing/rejectionReason/
    // customerResponse/orderNumber gibi admin-only iş akışı alanları client
    // body'sinden kabul edilmez (bkz. lib/handleProductSubmission.ts).
    const data: Record<string, unknown> = {};
    for (const key of ALLOWED_FIELDS) {
      if (body[key] !== undefined) data[key] = body[key];
    }

    const submissionNumber = await generateSubmissionNumber();

    // Create submission with category and additional fields
    const submission = new ProductSubmission({
      ...data,
      submissionNumber,
      category: body.category || 'playstation',
      userId: userId || new mongoose.Types.ObjectId(),
      status: 'pending', // Yeni talep durumu
      createdAt: new Date(),
      adminNotes: '' // Admin notları için boş alan
    });
    
    console.log('💾 Veritabanına kaydediliyor...');
    await submission.save();
    console.log('✅ Veri başarıyla kaydedildi, ID:', submission._id);
    
    // Müşteri bilgilerini al (MongoDB zaten bağlı, tekrar bağlanmaya gerek yok)
    let customerInfo = null;
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          customerInfo = {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || ''
          };
        }
      } catch (error) {
        console.error('Müşteri bilgileri alınamadı:', error);
      }
    }

    // Submission'a müşteri bilgilerini ekle
    const submissionWithCustomerInfo = {
      ...submission.toObject(),
      customerInfo
    };
    
    // Email gönderimini async yap (kullanıcı beklemeden response döndür)
    sendNewSubmissionNotificationToAdmin(submissionWithCustomerInfo)
      .then((emailSent) => {
        if (emailSent) {
          console.log('✅ Yeni teklif bildirimi admin\'e gönderildi');
        } else {
          console.log('❌ Yeni teklif bildirimi gönderilemedi');
        }
      })
      .catch((error) => {
        console.error('Mail gönderme hatası:', error);
      });
    
    return NextResponse.json({
      success: true,
      message: 'Submission saved successfully',
      id: submission._id,
      submissionNumber
    });
  } catch (error: any) {
    console.error('❌ Error saving submission:', error);
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('❌ Error details:', { errorMessage, errorStack });
    
    // DNS timeout hatası için özel mesaj
    let userMessage = errorMessage || 'Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.';
    if (errorMessage.includes('querySrv ETIMEOUT') || errorMessage.includes('ETIMEOUT')) {
      userMessage = 'Veritabanı bağlantısı zaman aşımına uğradı. Lütfen birkaç saniye sonra tekrar deneyin.';
    } else if (errorMessage.includes('MongoNetworkError') || errorMessage.includes('MongoServerSelectionError')) {
      userMessage = 'Veritabanı bağlantısı kurulamadı. Lütfen daha sonra tekrar deneyin.';
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: userMessage,
        error: errorMessage
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { default: connectDB } = await import('../../../lib/mongodb');
    const { default: ProductSubmission } = await import('../../../models/ProductSubmission');
    
    await connectDB();
    
    // Kimlik doğrulama zorunlu — kullanıcı yalnızca KENDİ tekliflerini görebilir.
    const verified = getVerifiedUser(request);
    if (!verified) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const requestedUserId = searchParams.get('userId');

    const query: Record<string, unknown> = {};
    if (category) {
      query.category = category;
    }

    if (verified.isAdmin) {
      // Admin: belirli bir kullanıcıyı sorgulayabilir; belirtmezse tümü.
      if (requestedUserId) {
        query.userId = new mongoose.Types.ObjectId(requestedUserId);
      }
    } else {
      // Normal kullanıcı: yalnızca kendi tekliflerini görür (?userId= yok sayılır).
      query.userId = new mongoose.Types.ObjectId(verified.userId);
    }

    const submissions = await ProductSubmission.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      submissions 
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { default: connectDB } = await import('../../../lib/mongodb');
    const { default: ProductSubmission } = await import('../../../models/ProductSubmission');
    
    await connectDB();
    
    // Kimlik doğrulama zorunlu.
    const verified = getVerifiedUser(request);
    if (!verified) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status, deliveryMethod, customerInfo } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Submission ID is required' },
        { status: 400 }
      );
    }

    // Find and update the submission
    const submission = await ProductSubmission.findById(id);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }

    // Sahiplik kontrolü: admin değilse yalnızca kendi teklifini güncelleyebilir.
    if (!verified.isAdmin && submission.userId?.toString() !== verified.userId) {
      return NextResponse.json(
        { success: false, message: 'Bu teklifi güncelleme yetkiniz yok' },
        { status: 403 }
      );
    }

    // Update submission fields
    if (status) {
      // Admin olmayan kullanıcılar workflow durumlarını (listed/accepted/
      // delivery_completed vb.) doğrudan ayarlayamaz — admin onayı olmadan
      // kendi talebini herkese açık ilan listesine enjekte edebilirdi.
      // Müşteri-aksiyonlu durumlar zaten ayrı, sahiplik kontrollü uçlardan
      // yönetiliyor (/api/submissions/[id]/cancel, /api/submissions/[id]/response).
      const userAllowedStatuses = ['cancel_requested'];
      if (!verified.isAdmin && !userAllowedStatuses.includes(status)) {
        return NextResponse.json(
          { success: false, message: 'Bu durum değişikliğini yapma yetkiniz yok' },
          { status: 403 }
        );
      }
      submission.status = status;
    }
    
    if (deliveryMethod !== undefined) {
      submission.deliveryMethod = deliveryMethod;
    }
    
    if (customerInfo !== undefined) {
      submission.customerInfo = customerInfo;
    }
    
    submission.updatedAt = new Date();
    
    await submission.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission updated successfully',
      submission: {
        _id: submission._id,
        status: submission.status,
        deliveryMethod: submission.deliveryMethod,
        customerInfo: submission.customerInfo,
        updatedAt: submission.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { default: connectDB } = await import('../../../lib/mongodb');
    const { default: ProductSubmission } = await import('../../../models/ProductSubmission');
    
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('id');
    
    if (!submissionId) {
      return NextResponse.json(
        { success: false, message: 'Submission ID is required' },
        { status: 400 }
      );
    }
    
    // Verify the submission exists and get user info
    const submission = await ProductSubmission.findById(submissionId);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }
    
    // Kimlik doğrulama zorunlu (eski kod token yoksa kontrolü atlıyordu).
    const verified = getVerifiedUser(request);
    if (!verified) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    // Sahiplik kontrolü: admin değilse yalnızca kendi teklifini silebilir.
    if (!verified.isAdmin && submission.userId?.toString() !== verified.userId) {
      return NextResponse.json(
        { success: false, message: 'Bu teklifi silme yetkiniz yok' },
        { status: 403 }
      );
    }

    // Delete the submission
    await ProductSubmission.findByIdAndDelete(submissionId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete submission' },
      { status: 500 }
    );
  }
} 