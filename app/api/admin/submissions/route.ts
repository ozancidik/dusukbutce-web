import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductSubmission from '@/models/ProductSubmission';
import User from '@/models/User';
import mongoose from 'mongoose';
import { AdminAuthError, ensureAdminRequest, handleAdminAuthError } from "../utils/requireAdmin";

// Ensure User model is registered
if (mongoose.models.User === undefined) {
  mongoose.model('User', User.schema);
}

const MONGODB_URI = process.env.MONGODB_URI;

export async function PUT(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    const { submissionId, action, data } = await request.json();

    if (!MONGODB_URI) {
      return NextResponse.json({ success: false, message: 'Database not configured' }, { status: 500 });
    }

    try {
      await connectDB();
    } catch (dbError) {
      console.error('❌ MongoDB connection error:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.',
        error: 'Database connection failed'
      }, { status: 503 });
    }

    let updateData: any = {};

    switch (action) {
      case 'updateStatus':
        updateData.status = data.status;
        if (data.adminNotes) {
          updateData.adminNotes = data.adminNotes;
        }
        if (data.userId) {
          updateData.userId = data.userId;
        }
        break;
      
      case 'addOffer':
        updateData.status = 'offered';
        updateData.adminNotes = `TEKLİF: ${data.amount} TL - ${data.notes}`;
        updateData.offer = {
          amount: data.amount,
          notes: data.notes,
          date: new Date()
        };
        console.log('Adding offer:', updateData);
        break;
      
      case 'createListing':
        updateData.status = 'listed';
        updateData.listing = {
          price: data.price,
          title: data.title,
          description: data.description,
          date: new Date()
        };
        break;
      
      case 'reject':
        updateData.status = 'rejected';
        updateData.rejectionReason = data.rejectReason || data.reason;
        updateData.rejectedAt = new Date();
        updateData.adminNotes = `REDDEDİLDİ: ${data.rejectReason || data.reason}`;
        break;
      
      default:
        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }

    console.log('Updating with data:', updateData);
    const updatedSubmission = await ProductSubmission.findByIdAndUpdate(
      submissionId,
      updateData,
      { new: true }
    );
    console.log('Updated submission:', updatedSubmission);

    if (!updatedSubmission) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Submission updated successfully',
      submission: updatedSubmission
    });

  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('Error updating submission:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    const body = await request.json();
    const { action, submissionId } = body;
    
    try {
      await connectDB();
    } catch (dbError) {
      console.error('❌ MongoDB connection error:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.',
        error: 'Database connection failed'
      }, { status: 503 });
    }
    
    if (action === 'deleteAll') {
      console.log('🗑️ Tüm submissions siliniyor...');
      const result = await ProductSubmission.deleteMany({});
      console.log(`✅ ${result.deletedCount} submission silindi`);
      
      return NextResponse.json({ 
        success: true, 
        message: `${result.deletedCount} submission silindi`,
        deletedCount: result.deletedCount
      });
    } else if (action === 'deleteOne' && submissionId) {
      console.log(`🗑️ Tek submission siliniyor: ${submissionId}`);
      const result = await ProductSubmission.findByIdAndDelete(submissionId);
      
      if (!result) {
        return NextResponse.json({ 
          success: false, 
          message: 'İlan bulunamadı' 
        }, { status: 404 });
      }
      
      console.log(`✅ Submission silindi: ${submissionId}`);
      return NextResponse.json({ 
        success: true, 
        message: 'İlan başarıyla silindi',
        deletedSubmission: result
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Geçersiz işlem veya eksik parametreler' 
      }, { status: 400 });
    }
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('❌ Error deleting submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete submissions' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    console.log('🔍 GET /api/admin/submissions called');
    
    if (!MONGODB_URI) {
      console.error('❌ MONGODB_URI not defined');
      return NextResponse.json({ success: false, message: 'Database not configured' }, { status: 500 });
    }

    console.log('🔗 Connecting to MongoDB...');
    // MongoDB'ye bağlan (connectDB zaten bağlantıyı garanti eder)
    try {
      await connectDB();
      console.log('✅ MongoDB connected successfully');
    } catch (dbError) {
      console.error('❌ MongoDB connection error:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Veritabanı bağlantı hatası. Lütfen daha sonra tekrar deneyin.',
        error: 'Database connection failed'
      }, { status: 503 });
    }
    
    // Query parametrelerini al
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    console.log('📊 Fetching submissions with limit:', limit);
    
    const submissions = await ProductSubmission.find({})
      .populate({
        path: 'userId',
        select: 'name email phone',
        options: { strictPopulate: false }
      })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    console.log('✅ Found submissions:', submissions.length);
    
    return NextResponse.json({ 
      success: true, 
      submissions: submissions 
    });

  } catch (error) {
    if (error instanceof AdminAuthError) {
      return handleAdminAuthError(error);
    }
    console.error('❌ Error fetching submissions:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ 
      success: false, 
      message: errorMessage,
      error: errorMessage
    }, { status: 500 });
  }
}

