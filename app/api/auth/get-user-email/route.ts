import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { token } = body;

    console.log('Get user email request:', { token: token ? 'token exists' : 'no token', tokenLength: token?.length });

    if (!token) {
      console.log('No token provided');
      return NextResponse.json(
        { error: 'Token gerekli' },
        { status: 400 }
      );
    }

    // Token ile kullanıcıyı bul (süresi dolmuş olsa bile)
    const user = await User.findOne({
      emailVerificationToken: token
    });

    console.log('User found for token:', { userFound: !!user, userEmail: user?.email });

    if (!user) {
      console.log('No user found for token');
      return NextResponse.json(
        { error: 'Geçersiz token' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { email: user.email },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user email error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    );
  }
}
