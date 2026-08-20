import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductSubmission from '@/models/ProductSubmission';
import User from '@/models/User';
import { getVerifiedUserId } from '@/lib/auth';
import { sendCancellationRequestEmailToAdmin } from '@/lib/email';

// Bir talep henüz kabul edilmemiş/ilana dönüşmemiş/ödenmemişken müşteri
// iptalini isteyebilir. Anında iptal etmiyoruz — status 'cancel_requested'
// olur ve admin onaylayana/reddedene kadar bekler (bkz. admin/action route,
// approve_cancellation / reject_cancellation).
const CANCELLABLE_STATUSES = ['pending', 'offered'];

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const verifiedUserId = getVerifiedUserId(request);
    if (!verifiedUserId) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const reason = typeof body?.reason === 'string' ? body.reason.trim() : '';

    await connectDB();

    const submission = await ProductSubmission.findById(id);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Talep bulunamadı' },
        { status: 404 }
      );
    }

    if (submission.userId?.toString() !== verifiedUserId) {
      return NextResponse.json(
        { success: false, message: 'Bu talep üzerinde işlem yapma yetkiniz yok' },
        { status: 403 }
      );
    }

    if (submission.payment?.status === 'paid') {
      return NextResponse.json(
        { success: false, message: 'Ödemesi yapılmış bir talep kendiliğinden iptal edilemez, lütfen bizimle iletişime geçin' },
        { status: 400 }
      );
    }

    if (!CANCELLABLE_STATUSES.includes(submission.status)) {
      return NextResponse.json(
        { success: false, message: 'Bu talep artık iptal talebi oluşturulabilecek durumda değil' },
        { status: 400 }
      );
    }

    const previousStatus = submission.status;

    const updatedSubmission = await ProductSubmission.findByIdAndUpdate(
      id,
      {
        $set: {
          status: 'cancel_requested',
          cancellation: {
            reason,
            requestedAt: new Date(),
            previousStatus,
          },
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    // Admin'e bilgilendirme maili (fire-and-forget)
    try {
      let customerEmail = submission.customerInfo?.email || '';
      let customerName = submission.customerInfo?.firstName || submission.customerInfo?.lastName || 'Müşteri';

      if (!customerEmail) {
        const user = await User.findById(verifiedUserId);
        if (user) {
          customerEmail = user.email || '';
          customerName = user.name || 'Müşteri';
        }
      }

      const productName = `${submission.brand || ''} ${submission.model || ''}`.trim();

      sendCancellationRequestEmailToAdmin(customerEmail, customerName, productName, reason)
        .catch((error) => console.error('İptal talebi maili gönderme hatası:', error));
    } catch (error) {
      console.error('İptal talebi maili hazırlama hatası:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'İptal talebiniz alındı, en kısa sürede değerlendirilecek',
      submission: {
        _id: updatedSubmission?._id,
        status: updatedSubmission?.status,
        cancellation: updatedSubmission?.cancellation,
        updatedAt: updatedSubmission?.updatedAt,
      },
    });
  } catch (error) {
    console.error('Cancel submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
