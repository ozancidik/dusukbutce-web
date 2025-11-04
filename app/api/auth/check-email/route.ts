import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { exists: false },
        { status: 200 }
      );
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { exists: false },
        { status: 200 }
      );
    }

    // Email var mı kontrol et
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    return NextResponse.json(
      { exists: !!existingUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Check email error:', error);
    return NextResponse.json(
      { exists: false },
      { status: 500 }
    );
  }
}
