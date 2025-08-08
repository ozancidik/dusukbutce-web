import { NextResponse } from "next/server";
import ProductSubmission from '../../../models/ProductSubmission';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Create submission
    const submission = new ProductSubmission(body);
    await submission.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission saved successfully',
      id: submission._id 
    });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save submission' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category) {
      query = { category };
    }
    
    const submissions = await ProductSubmission.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ 
      success: true, 
      submissions 
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 