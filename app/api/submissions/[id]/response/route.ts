import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductSubmission from '@/models/ProductSubmission';
import { 
  sendCustomerAcceptEmailToAdmin, 
  sendCustomerRejectEmailToAdmin 
} from '@/lib/email';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    const { action, note, reason } = body;

    if (!action || !['accepted', 'rejected'].includes(action)) {
      return NextResponse.json(
        { success: false, message: 'Geçersiz aksiyon' },
        { status: 400 }
      );
    }

    const submission = await ProductSubmission.findById(id);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Teklif bulunamadı' },
        { status: 404 }
      );
    }

    // Update submission with customer response
    submission.customerResponse = {
      action: action as 'accepted' | 'rejected',
      note: note || '',
      reason: reason || '',
      date: new Date().toISOString()
    };

    // Update status based on action
    if (action === 'accepted') {
      submission.status = 'accepted';
    } else {
      submission.status = 'customer_rejected';
    }

    await submission.save();

    // Müşteri response'una göre admin'e mail gönder
    try {
      const customerEmail = submission.customerInfo?.email || submission.userId?.email || '';
      const customerName = submission.customerInfo?.firstName || submission.customerInfo?.lastName || 'Müşteri';
      const productName = `${submission.brand} ${submission.model}`.trim();
      const offerAmount = submission.offerAmount || submission.offer?.amount || 0;

      if (action === 'accepted') {
        // Müşteri kabul etti - admin'e mail gönder
        const emailSent = await sendCustomerAcceptEmailToAdmin(
          customerEmail, 
          customerName, 
          productName, 
          offerAmount
        );
        if (emailSent) {
          console.log(`✅ Müşteri kabul maili admin'e gönderildi`);
        } else {
          console.log(`❌ Müşteri kabul maili gönderilemedi`);
        }
      } else if (action === 'rejected') {
        // Müşteri reddetti - admin'e mail gönder
        const emailSent = await sendCustomerRejectEmailToAdmin(
          customerEmail, 
          customerName, 
          productName, 
          offerAmount, 
          reason
        );
        if (emailSent) {
          console.log(`✅ Müşteri red maili admin'e gönderildi`);
        } else {
          console.log(`❌ Müşteri red maili gönderilemedi`);
        }
      }
    } catch (error) {
      console.error('Mail gönderme hatası:', error);
    }

    return NextResponse.json({
      success: true,
      message: action === 'accepted' ? 'Teklif kabul edildi' : 'Teklif reddedildi',
      submission
    });

  } catch (error) {
    console.error('Error updating submission response:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
