import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import ProductSubmission from '../../../models/ProductSubmission';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Create submission with category
    const submission = new ProductSubmission({
      ...body,
      category: 'notebook'
    });
    
    await submission.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Notebook submission saved successfully',
      id: submission._id 
    });
  } catch (error) {
    console.error('Error saving notebook submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const submissions = await ProductSubmission.find({ 
      category: 'notebook' 
    }).sort({ createdAt: -1 });
    
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