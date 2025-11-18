import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductSubmission from '@/models/ProductSubmission';
import User from '@/models/User';
import { 
  sendCustomerAcceptEmailToAdmin, 
  sendCustomerRejectEmailToAdmin 
} from '@/lib/email';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('🔄 PUT /api/submissions/[id]/response başladı');
    
    await connectDB();
    console.log('✅ Database bağlantısı başarılı');
    
    const { id } = await params;
    console.log('📋 Submission ID:', id);
    
    const body = await request.json();
    console.log('📦 Request body:', body);
    const { action, note, reason } = body;

    if (!action || !['accepted', 'rejected'].includes(action)) {
      console.log('❌ Geçersiz aksiyon:', action);
      return NextResponse.json(
        { success: false, message: 'Geçersiz aksiyon' },
        { status: 400 }
      );
    }

    const submission = await ProductSubmission.findById(id);
    if (!submission) {
      console.log('❌ Submission bulunamadı:', id);
      return NextResponse.json(
        { success: false, message: 'Teklif bulunamadı' },
        { status: 404 }
      );
    }
    console.log('✅ Submission bulundu:', submission._id, 'Mevcut status:', submission.status);
    console.log('👤 Submission userId:', submission.userId);
    console.log('👤 Submission userId type:', typeof submission.userId);

    // Müşteri bilgilerini önce al (güncellemeden önce)
    const originalUserId = submission.userId;

    // Update status based on action
    const newStatus = action === 'accepted' ? 'customer_accepted' : 'customer_rejected';
    console.log('📝 Yeni status:', newStatus);

    // Update submission with customer response using findByIdAndUpdate (daha güvenli)
    let updatedSubmission;
    try {
      updatedSubmission = await ProductSubmission.findByIdAndUpdate(
        id,
        {
          $set: {
            status: newStatus,
            'customerResponse.action': action as 'accepted' | 'rejected',
            'customerResponse.note': note || '',
            'customerResponse.reason': reason || '',
            'customerResponse.date': new Date(),
            updatedAt: new Date()
          }
        },
        { new: true, runValidators: false }
      );

      if (!updatedSubmission) {
        console.log('❌ Submission güncellenemedi:', id);
        return NextResponse.json(
          { success: false, message: 'Teklif güncellenemedi' },
          { status: 500 }
        );
      }

      console.log('✅ Submission kaydedildi');
    } catch (updateError) {
      console.error('❌ findByIdAndUpdate hatası:', updateError);
      const updateErrorMessage = updateError instanceof Error ? updateError.message : 'Bilinmeyen hata';
      const updateErrorDetails = updateError instanceof Error ? updateError.stack : '';
      console.error('❌ Update error details:', { updateErrorMessage, updateErrorDetails });
      
      // Eğer validation hatası varsa, daha detaylı bilgi ver
      if (updateError && typeof updateError === 'object' && 'name' in updateError && (updateError as any).name === 'ValidationError') {
        const validationError = updateError as any;
        console.error('❌ Validation hatası:', validationError.errors);
        return NextResponse.json(
          { success: false, message: 'Veri doğrulama hatası', error: updateErrorMessage, details: validationError.errors },
          { status: 400 }
        );
      }
      
      throw updateError;
    }

    // Müşteri response'una göre admin'e mail gönder
    try {
      // Müşteri bilgilerini al (customerInfo'dan veya userId'den)
      let customerEmail = '';
      let customerName = 'Müşteri';
      
      if (updatedSubmission.customerInfo?.email) {
        customerEmail = updatedSubmission.customerInfo.email;
        customerName = `${updatedSubmission.customerInfo.firstName || ''} ${updatedSubmission.customerInfo.lastName || ''}`.trim() || 'Müşteri';
      } else if (originalUserId) {
        // userId'den User modelinden al
        try {
          const user = await User.findById(originalUserId);
          if (user) {
            customerEmail = user.email || '';
            customerName = user.name || 'Müşteri';
          }
        } catch (userError) {
          console.error('User bilgisi alınamadı:', userError);
        }
      }
      
      const productName = `${updatedSubmission.brand} ${updatedSubmission.model}`.trim();
      const offerAmount = updatedSubmission.offerAmount || updatedSubmission.offer?.amount || 0;
      
      console.log('📧 Müşteri bilgileri:', { customerEmail, customerName, productName, offerAmount });

      // Email gönderimini async yap (kullanıcı beklemeden response döndür)
      if (action === 'accepted') {
        // Müşteri kabul etti - admin'e mail gönder
        sendCustomerAcceptEmailToAdmin(
          customerEmail, 
          customerName, 
          productName, 
          offerAmount
        )
        .then((emailSent) => {
          if (emailSent) {
            console.log(`✅ Müşteri kabul maili admin'e gönderildi`);
          } else {
            console.log(`❌ Müşteri kabul maili gönderilemedi`);
          }
        })
        .catch((error) => {
          console.error('Müşteri kabul maili gönderme hatası:', error);
        });
      } else if (action === 'rejected') {
        // Müşteri reddetti - admin'e mail gönder
        sendCustomerRejectEmailToAdmin(
          customerEmail, 
          customerName, 
          productName, 
          offerAmount, 
          reason
        )
        .then((emailSent) => {
          if (emailSent) {
            console.log(`✅ Müşteri red maili admin'e gönderildi`);
          } else {
            console.log(`❌ Müşteri red maili gönderilemedi`);
          }
        })
        .catch((error) => {
          console.error('Müşteri red maili gönderme hatası:', error);
        });
      }
    } catch (error) {
      console.error('Mail gönderme hatası:', error);
    }

    // Submission'ı JSON'a çevirirken hata olmaması için gerekli alanları manuel olarak seç
    const submissionStatus = updatedSubmission.status || newStatus;
    console.log('📊 Final status check:', {
      'updatedSubmission.status': updatedSubmission.status,
      'newStatus': newStatus,
      'submissionStatus (will be sent)': submissionStatus,
      'status type': typeof submissionStatus
    });
    
    const submissionData = {
      _id: updatedSubmission._id?.toString() || updatedSubmission._id,
      status: submissionStatus, // Kesinlikle doğru status'u gönder
      customerResponse: updatedSubmission.customerResponse ? {
        action: updatedSubmission.customerResponse.action,
        note: updatedSubmission.customerResponse.note || '',
        reason: updatedSubmission.customerResponse.reason || '',
        date: updatedSubmission.customerResponse.date instanceof Date 
          ? updatedSubmission.customerResponse.date.toISOString() 
          : updatedSubmission.customerResponse.date
      } : null,
      brand: updatedSubmission.brand,
      model: updatedSubmission.model,
      category: updatedSubmission.category,
      offerAmount: updatedSubmission.offerAmount,
      offer: updatedSubmission.offer ? {
        amount: updatedSubmission.offer.amount,
        notes: updatedSubmission.offer.notes || '',
        date: updatedSubmission.offer.date
      } : null,
      updatedAt: updatedSubmission.updatedAt
    };

    console.log('✅ Response hazırlanıyor, submissionData:', JSON.stringify(submissionData).substring(0, 300));
    console.log('📊 Response status (final):', submissionData.status);

    return NextResponse.json({
      success: true,
      message: action === 'accepted' ? 'Teklif kabul edildi' : 'Teklif reddedildi',
      submission: submissionData
    });

  } catch (error) {
    console.error('Error updating submission response:', error);
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
    const errorStack = error instanceof Error ? error.stack : '';
    console.error('Error details:', { errorMessage, errorStack });
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası', error: errorMessage },
      { status: 500 }
    );
  }
}
