import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Notebook submission başlatılıyor...');
    
    const body = await request.json();
    console.log('📝 Gelen veri:', JSON.stringify(body, null, 2));
    
    // MongoDB bağlantısı kontrolü
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ MongoDB URI tanımlı değil, veri console\'a yazdırılıyor:');
      console.log('📊 Submission Data:', {
        ...body,
        category: 'notebook',
        timestamp: new Date().toISOString()
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Notebook submission received (MongoDB not configured)',
        data: body
      });
    }
    
    // MongoDB bağlantısı varsa normal işlemi yap
    const { default: connectDB } = await import('../../../lib/mongodb');
    const { default: ProductSubmission } = await import('../../../models/ProductSubmission');
    
    console.log('🔗 MongoDB bağlantısı kuruluyor...');
    await connectDB();
    console.log('✅ MongoDB bağlantısı başarılı');
    
    // Create submission with category and additional fields
    const submission = new ProductSubmission({
      ...body,
      category: 'notebook',
      status: 'pending', // Yeni talep durumu
      createdAt: new Date(),
      adminNotes: '' // Admin notları için boş alan
    });
    
    console.log('💾 Veritabanına kaydediliyor...');
    await submission.save();
    console.log('✅ Veri başarıyla kaydedildi, ID:', submission._id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Notebook submission saved successfully',
      id: submission._id 
    });
  } catch (error: any) {
    console.error('❌ Error saving notebook submission:', error);
    console.error('❌ Error details:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });
    return NextResponse.json(
      { success: false, message: 'Failed to save submission', error: error?.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ 
        success: true, 
        message: 'MongoDB not configured',
        submissions: []
      });
    }
    
    const { default: connectDB } = await import('../../../lib/mongodb');
    const { default: ProductSubmission } = await import('../../../models/ProductSubmission');
    
    await connectDB();
    
    const submissions = await ProductSubmission.find({ 
      category: 'notebook' 
    }).sort({ createdAt: -1 });
    
    console.log('📊 Notebook submissions fetched:', submissions.length);
    
    return NextResponse.json({ 
      success: true, 
      submissions 
    });
  } catch (error) {
    console.error('Error fetching notebook submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { submissionId, action, data } = await request.json();

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ success: false, message: 'Database not configured' }, { status: 500 });
    }

    const { default: connectDB } = await import('../../../lib/mongodb');
    const { default: ProductSubmission } = await import('../../../models/ProductSubmission');
    
    await connectDB();

    let updateData: any = {};

    switch (action) {
      case 'customerAccept':
        updateData.status = 'accepted';
        updateData.customerResponse = {
          action: 'accepted',
          note: data.note,
          date: new Date()
        };
        break;
      
      case 'customerReject':
        updateData.status = 'customer_rejected';
        updateData.customerResponse = {
          action: 'rejected',
          reason: data.note,
          date: new Date()
        };
        break;
      
      default:
        return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
    }

    const updatedSubmission = await ProductSubmission.findByIdAndUpdate(
      submissionId,
      updateData,
      { new: true }
    );

    if (!updatedSubmission) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Submission updated successfully',
      submission: updatedSubmission
    });

  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
} 