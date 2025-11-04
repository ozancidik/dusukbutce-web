import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ProductSubmission from '../../../models/ProductSubmission';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { sendNewSubmissionNotificationToAdmin } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    console.log('API received data:', body);
    
    // Get userId from JWT token (fast decode without verify)
    let userId = null;
    try {
      const token = request.headers.get('authorization')?.replace('Bearer ', '');
      if (token) {
        // Fast decode without verification (since token comes from our frontend)
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        userId = decoded.userId;
        console.log('Found userId from token:', userId);
      }
    } catch (error) {
      console.log('No valid token found, creating temporary userId');
    }
    
    // Add userId to submission data
    const submissionData = {
      ...body,
      userId: userId || new mongoose.Types.ObjectId() // Use real userId or create temporary one
    };
    
    // Create submission
    const submission = new ProductSubmission(submissionData);
    console.log('Submission before save:', submission);
    await submission.save();
    console.log('Submission after save:', submission);
    
    // Send notification email to admin
    try {
      const emailSent = await sendNewSubmissionNotificationToAdmin(submissionData);
      if (emailSent) {
        console.log('✅ Yeni teklif bildirimi admin\'e gönderildi');
      } else {
        console.log('❌ Yeni teklif bildirimi gönderilemedi');
      }
    } catch (error) {
      console.error('Mail gönderme hatası:', error);
    }
    
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
    const userId = searchParams.get('userId');
    
    let query = {};
    if (category) {
      query = { category };
    }
    
    // If userId is provided, filter by userId
    if (userId) {
      query = { ...query, userId: new mongoose.Types.ObjectId(userId) };
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

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { id, status, deliveryMethod, customerInfo } = body;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Submission ID is required' },
        { status: 400 }
      );
    }
    
    // Find and update the submission
    const submission = await ProductSubmission.findById(id);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }
    
    // Update submission fields
    if (status) {
      submission.status = status;
    }
    
    if (deliveryMethod !== undefined) {
      submission.deliveryMethod = deliveryMethod;
    }
    
    if (customerInfo !== undefined) {
      submission.customerInfo = customerInfo;
    }
    
    submission.updatedAt = new Date();
    
    await submission.save();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission updated successfully',
      submission: {
        _id: submission._id,
        status: submission.status,
        deliveryMethod: submission.deliveryMethod,
        customerInfo: submission.customerInfo,
        updatedAt: submission.updatedAt
      }
    });
  } catch (error) {
    console.error('Error updating submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update submission' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('id');
    
    if (!submissionId) {
      return NextResponse.json(
        { success: false, message: 'Submission ID is required' },
        { status: 400 }
      );
    }
    
    // Verify the submission exists and get user info
    const submission = await ProductSubmission.findById(submissionId);
    if (!submission) {
      return NextResponse.json(
        { success: false, message: 'Submission not found' },
        { status: 404 }
      );
    }
    
    // Get userId from JWT token to verify ownership
    let userId = null;
    try {
      const token = request.headers.get('authorization')?.replace('Bearer ', '');
      if (token) {
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        userId = decoded.userId;
      }
    } catch (error) {
      console.log('No valid token found for deletion');
    }
    
    // Check if user owns this submission (optional security check)
    if (userId && submission.userId && submission.userId.toString() !== userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized to delete this submission' },
        { status: 403 }
      );
    }
    
    // Delete the submission
    await ProductSubmission.findByIdAndDelete(submissionId);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting submission:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete submission' },
      { status: 500 }
    );
  }
} 