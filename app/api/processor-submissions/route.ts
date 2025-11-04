import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from "@/lib/mongodb";
import ProductSubmission from "@/models/ProductSubmission";
import User from "@/models/User";
import { sendNewSubmissionNotificationToAdmin } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // JWT token'dan userId al
    let userId = null;
    try {
      const token = request.headers.get('authorization')?.replace('Bearer ', '');
      if (token) {
        const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        userId = decoded.userId;
        console.log('Found userId from token:', userId);
      }
    } catch (error) {
      console.log('No valid token found, creating temporary userId');
    }

    const {
      brand,
      model,
      stokFan,
      cache,
      socket,
      description,
      cosmeticCondition,
      hasBox,
      hasInvoice,
      hasWarranty,
      warrantyDuration,
      invoiceDate,
      quantity,
      images,
      category
    } = body;

    await connectDB();

    const submission = new ProductSubmission({
      userId: userId || new mongoose.Types.ObjectId(),
      brand,
      model,
      stokFan,
      cache,
      socket,
      description,
      cosmeticCondition,
      hasBox,
      hasInvoice,
      hasWarranty,
      warrantyDuration,
      invoiceDate,
      quantity,
      images,
      category,
      status: "pending",
      createdAt: new Date(),
    });

    await submission.save();

    // Müşteri bilgilerini al
    let customerInfo = null;
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          customerInfo = {
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || ''
          };
        }
      } catch (error) {
        console.error('Müşteri bilgileri alınamadı:', error);
      }
    }

    // Submission'a müşteri bilgilerini ekle
    const submissionWithCustomerInfo = {
      ...submission.toObject(),
      customerInfo
    };

    // Send notification email to admin
    try {
      const emailSent = await sendNewSubmissionNotificationToAdmin(submissionWithCustomerInfo);
      if (emailSent) {
        console.log('✅ Yeni teklif bildirimi admin\'e gönderildi');
      } else {
        console.log('❌ Yeni teklif bildirimi gönderilemedi');
      }
    } catch (error) {
      console.error('Mail gönderme hatası:', error);
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error in processor-submissions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}