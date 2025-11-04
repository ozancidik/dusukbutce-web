import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProductSubmission from '@/models/ProductSubmission';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { reofferNote } = await request.json();

    if (!reofferNote || !reofferNote.trim()) {
      return NextResponse.json(
        { success: false, message: 'Açıklama/talep alanı boş olamaz!' },
        { status: 400 }
      );
    }

    await connectDB();

    // Find the submission
    const submission = await ProductSubmission.findById(id);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Teklif bulunamadı!' },
        { status: 404 }
      );
    }

    // Check if submission is rejected
    if (submission.status !== 'rejected') {
      return NextResponse.json(
        { success: false, message: 'Sadece reddedilen teklifler için yeniden teklif alınabilir!' },
        { status: 400 }
      );
    }

    // Reset submission to pending status and add reoffer note
    submission.status = 'pending';
    submission.rejectionReason = undefined;
    submission.rejectedAt = undefined;
    submission.customerResponse = undefined;
    submission.adminNotes = `YENİDEN TEKLİF TALEBİ: ${reofferNote.trim()}`;
    submission.updatedAt = new Date();

    await submission.save();

    return NextResponse.json({
      success: true,
      message: 'Yeniden teklif talebi başarıyla gönderildi!',
      submission: {
        _id: submission._id,
        status: submission.status,
        adminNotes: submission.adminNotes,
        updatedAt: submission.updatedAt
      }
    });

  } catch (error) {
    console.error('Reoffer submission error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.json(
      { 
        success: false, 
        message: 'Sunucu hatası!',
        error: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    );
  }
}
