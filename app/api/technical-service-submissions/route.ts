import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import TechnicalServiceSubmission from '@/models/TechnicalServiceSubmission';
import { AdminAuthError, ensureAdminRequest, ensureFullAdminRequest, handleAdminAuthError } from '@/app/api/admin/utils/requireAdmin';

const MONGODB_URI = process.env.MONGODB_URI;

// POST - Yeni teknik servis talebi oluştur
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!MONGODB_URI) {
      return NextResponse.json({ 
        success: false, 
        message: 'Veritabanı yapılandırılmamış' 
      }, { status: 500 });
    }

    await connectDB();

    // Yeni submission oluştur
    const submission = new TechnicalServiceSubmission({
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      address: data.address,
      city: data.city,
      district: data.district,
      serviceType: data.serviceType,
      deliveryMethod: data.deliveryMethod,
      deviceInfo: data.deviceInfo,
      problemDescription: data.problemDescription,
      preferredDate: data.preferredDate || '',
      preferredTime: data.preferredTime || '',
      shippingMethod: data.shippingMethod || '',
      notes: data.notes || '',
      status: 'pending',
    });

    await submission.save();

    console.log('✅ Yeni teknik servis talebi oluşturuldu:', submission._id);

    return NextResponse.json({ 
      success: true, 
      message: 'Teknik servis talebiniz başarıyla alındı',
      submissionId: submission._id
    });

  } catch (error) {
    console.error('❌ Teknik servis talebi oluşturulurken hata:', error);
    const errorMessage = error instanceof Error ? error.message : 'Sunucu hatası';
    return NextResponse.json({ 
      success: false, 
      message: errorMessage
    }, { status: 500 });
  }
}

// GET - Tüm teknik servis taleplerini getir (Admin için)
export async function GET(request: NextRequest) {
  try {
    ensureAdminRequest(request);

    if (!MONGODB_URI) {
      return NextResponse.json({ 
        success: false, 
        message: 'Veritabanı yapılandırılmamış' 
      }, { status: 500 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const status = searchParams.get('status');

    let query: any = {};
    if (status) {
      query.status = status;
    }

    const submissions = await TechnicalServiceSubmission.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ 
      success: true, 
      submissions: submissions,
      count: submissions.length
    });

  } catch (error) {
    if (error instanceof AdminAuthError) return handleAdminAuthError(error);
    console.error('❌ Teknik servis talepleri getirilirken hata:', error);
    const errorMessage = error instanceof Error ? error.message : 'Sunucu hatası';
    return NextResponse.json({
      success: false,
      message: errorMessage
    }, { status: 500 });
  }
}

// PUT - Teknik servis talebini güncelle (Admin için)
export async function PUT(request: NextRequest) {
  try {
    // Durum değiştiren yazma işlemi — salt-okunur (viewer) admin yapamaz.
    ensureFullAdminRequest(request);

    const { submissionId, status, adminNotes } = await request.json();

    if (!MONGODB_URI) {
      return NextResponse.json({ 
        success: false, 
        message: 'Veritabanı yapılandırılmamış' 
      }, { status: 500 });
    }

    await connectDB();

    const updateData: any = { updatedAt: new Date() };
    
    if (status) updateData.status = status;
    if (adminNotes !== undefined) updateData.adminNotes = adminNotes;

    const updatedSubmission = await TechnicalServiceSubmission.findByIdAndUpdate(
      submissionId,
      updateData,
      { new: true }
    );

    if (!updatedSubmission) {
      return NextResponse.json({ 
        success: false, 
        message: 'Talep bulunamadı' 
      }, { status: 404 });
    }

    console.log('✅ Teknik servis talebi güncellendi:', submissionId);

    return NextResponse.json({ 
      success: true, 
      message: 'Talep başarıyla güncellendi',
      submission: updatedSubmission
    });

  } catch (error) {
    if (error instanceof AdminAuthError) return handleAdminAuthError(error);
    console.error('❌ Teknik servis talebi güncellenirken hata:', error);
    const errorMessage = error instanceof Error ? error.message : 'Sunucu hatası';
    return NextResponse.json({
      success: false,
      message: errorMessage
    }, { status: 500 });
  }
}

// DELETE - Teknik servis talebini sil (Admin için)
export async function DELETE(request: NextRequest) {
  try {
    // Kalıcı silme — salt-okunur (viewer) admin yapamaz.
    ensureFullAdminRequest(request);

    const { submissionId } = await request.json();

    if (!MONGODB_URI) {
      return NextResponse.json({ 
        success: false, 
        message: 'Veritabanı yapılandırılmamış' 
      }, { status: 500 });
    }

    await connectDB();

    const deletedSubmission = await TechnicalServiceSubmission.findByIdAndDelete(submissionId);

    if (!deletedSubmission) {
      return NextResponse.json({ 
        success: false, 
        message: 'Talep bulunamadı' 
      }, { status: 404 });
    }

    console.log('✅ Teknik servis talebi silindi:', submissionId);

    return NextResponse.json({ 
      success: true, 
      message: 'Talep başarıyla silindi'
    });

  } catch (error) {
    if (error instanceof AdminAuthError) return handleAdminAuthError(error);
    console.error('❌ Teknik servis talebi silinirken hata:', error);
    const errorMessage = error instanceof Error ? error.message : 'Sunucu hatası';
    return NextResponse.json({
      success: false, 
      message: errorMessage
    }, { status: 500 });
  }
}

