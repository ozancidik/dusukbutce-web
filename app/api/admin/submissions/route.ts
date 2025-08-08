import { NextRequest } from "next/server";
import { NextResponse, NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductSubmission from '@/models/ProductSubmission';

const MONGODB_URI = process.env.MONGODB_URI;

export async function PUT(request: NextRequest) {
  try {
    const { submissionId, action, data } = await request.json();

    if (!MONGODB_URI) {
      return NextResponse.json({ success: false, message: 'Database not configured' }, { status: 500 });
    }

    await connectDB();

    let updateData: any = {};

    switch (action) {
      case 'updateStatus':
        updateData.status = data.status;
        if (data.adminNotes) {
          updateData.adminNotes = data.adminNotes;
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
        updateData.rejectionReason = data.reason;
        updateData.rejectedAt = new Date();
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
    console.error('Error updating submission:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!MONGODB_URI) {
      return NextResponse.json({ success: false, message: 'Database not configured' }, { status: 500 });
    }

    await connectDB();
    
    const submissions = await ProductSubmission.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      submissions: submissions 
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
} 