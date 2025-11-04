import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { 
  sendOfferEmail, 
  sendCustomerAcceptEmailToAdmin, 
  sendCustomerRejectEmailToAdmin,
  sendAdminAcceptEmailToCustomer,
  sendAdminRejectEmailToCustomer
} from '@/lib/email';
import ProductSubmission from '@/models/ProductSubmission';
import User from '@/models/User';
// import { Product } from '@/models/Product';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';

// Token doğrulama middleware
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  
  console.log('🔍 verifyToken - authHeader:', authHeader);
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('❌ verifyToken - Token bulunamadı');
    throw new Error('Token bulunamadı');
  }

  const token = authHeader.substring(7);
  console.log('🔍 verifyToken - token:', token.substring(0, 20) + '...');
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    console.log('✅ verifyToken - decoded:', decoded);
    return decoded;
  } catch (error) {
    console.log('❌ verifyToken - error:', error);
    throw new Error('Geçersiz token');
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Admin action API başladı');
    
    // Token doğrula
    const decoded = await verifyToken(request);
    console.log('✅ Token doğrulandı:', decoded);
    
    if (!decoded.isAdmin) {
      console.log('❌ Admin değil');
      return NextResponse.json(
        { success: false, error: 'Yetkisiz erişim' },
        { status: 403 }
      );
    }

    const { submissionId, action, amount, notes, reason, customerEmail, customerName, productName } = await request.json();
    console.log('📝 Request data:', { submissionId, action, amount, notes, customerEmail, customerName, productName });

    if (!submissionId || !action) {
      return NextResponse.json(
        { success: false, error: 'Submission ID ve action gerekli' },
        { status: 400 }
      );
    }

    // Veritabanına bağlan
    console.log('🔌 Veritabanına bağlanılıyor...');
    await connectDB();
    console.log('✅ Veritabanına bağlandı');
    
    // Submission'ı bul ve güncelle
    console.log('🔍 Submission aranıyor:', submissionId);
    const submission = await ProductSubmission.findById(submissionId);
    if (!submission) {
      console.log('❌ Submission bulunamadı');
      return NextResponse.json(
        { success: false, error: 'Submission bulunamadı' },
        { status: 404 }
      );
    }
    console.log('✅ Submission bulundu:', submission._id);
    console.log('🔍 Submission userId:', submission.userId);
    console.log('🔍 Submission userId type:', typeof submission.userId);

    // Status'u güncelle
    const newStatus = action === 'offer' ? 'offered' : 
                      action === 'list' ? 'listed' : 
                      action === 'delivery_completed' ? 'delivery_completed' :
                      'rejected';
    const adminNotes = action === 'offer' ? `TEKLİF: ${amount} TL${notes ? ' - ' + notes : ''}` : 
                       action === 'list' ? `İLAN OLUŞTURULDU${notes ? ' - ' + notes : ''}` : 
                       action === 'delivery_completed' ? `TESLİMAT TAMAMLANDI${notes ? ' - ' + notes : ''}` :
                       `REDDEDİLDİ${notes ? ' - ' + notes : ''}`;

    // Veritabanını güncelle
    console.log('📝 Submission güncelleniyor:', { newStatus, adminNotes, amount });
    const updateData: any = {
      status: newStatus,
      adminNotes: adminNotes,
      updatedAt: new Date()
    };
    
    // Teklif verildiğinde offer bilgilerini de güncelle
    if (action === 'offer') {
      updateData.offerAmount = amount;
      updateData.offer = {
        amount: amount,
        notes: notes,
        date: new Date()
      };
    }
    
    const updatedSubmission = await ProductSubmission.findByIdAndUpdate(
      submissionId,
      updateData,
      { new: true }
    );

    if (!updatedSubmission) {
      console.log('❌ Submission güncellenemedi');
      return NextResponse.json(
        { success: false, error: 'Submission güncellenemedi' },
        { status: 500 }
      );
    }
    console.log('✅ Submission güncellendi:', updatedSubmission._id);

    // Müşteri bilgilerini al (request'ten gelen değerleri kullan, yoksa submission'dan al)
    let finalCustomerEmail = customerEmail || submission.customerInfo?.email;
    let finalCustomerName = customerName || submission.customerInfo?.firstName || submission.customerInfo?.lastName || 'Müşteri';
    
    // Eğer hala email yoksa, userId'den User modelinden al
    if (!finalCustomerEmail && submission.userId) {
      try {
        const user = await User.findById(submission.userId);
        if (user) {
          finalCustomerEmail = user.email;
          finalCustomerName = user.firstName || user.lastName || user.name || 'Müşteri';
        }
      } catch (error) {
        console.error('User bilgisi alınamadı:', error);
      }
    }
    
    const finalProductName = productName || `${submission.brand} ${submission.model}`.trim();
    
    // Admin action'larına göre mail gönder
    try {
      if (action === 'offer' && amount && finalCustomerEmail) {
        // Admin teklif verdi - müşteriye mail gönder
        const emailSent = await sendOfferEmail(finalCustomerEmail, finalCustomerName, finalProductName, amount, notes);
        if (emailSent) {
          console.log(`✅ Teklif maili müşteriye gönderildi: ${finalCustomerEmail}`);
        } else {
          console.log(`❌ Teklif maili gönderilemedi: ${finalCustomerEmail}`);
        }
      } else if (action === 'reject' && finalCustomerEmail) {
        // Admin reddetti - müşteriye mail gönder
        const emailSent = await sendAdminRejectEmailToCustomer(finalCustomerEmail, finalCustomerName, finalProductName, reason || notes);
        if (emailSent) {
          console.log(`✅ Red maili müşteriye gönderildi: ${finalCustomerEmail}`);
        } else {
          console.log(`❌ Red maili gönderilemedi: ${finalCustomerEmail}`);
        }
      } else if (action === 'list' && finalCustomerEmail) {
        // Admin ilan oluşturdu - müşteriye mail gönder
        const emailSent = await sendAdminAcceptEmailToCustomer(finalCustomerEmail, finalCustomerName, finalProductName, amount || 0);
        if (emailSent) {
          console.log(`✅ Kabul maili müşteriye gönderildi: ${finalCustomerEmail}`);
        } else {
          console.log(`❌ Kabul maili gönderilemedi: ${finalCustomerEmail}`);
        }
      }
    } catch (error) {
      console.error('Mail gönderme hatası:', error);
    }

    return NextResponse.json({
      success: true,
      message: `${action} işlemi başarılı${action === 'offer' ? ' ve müşteriye mail gönderildi' : ''}`,
      submission: {
        _id: updatedSubmission._id,
        status: updatedSubmission.status,
        adminNotes: updatedSubmission.adminNotes,
        offerAmount: updatedSubmission.offerAmount,
        updatedAt: updatedSubmission.updatedAt
      }
    });

  } catch (error) {
    console.error('Admin action error:', error);
    
    if (error instanceof Error && (error.message === 'Token bulunamadı' || error.message === 'Geçersiz token')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
