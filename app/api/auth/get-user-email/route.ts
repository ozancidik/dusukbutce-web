import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Token sızması durumunda süresiz email ifşasını yavaşlatan koruma
    // (token 32-byte kriptografik rastgele olduğu için asıl koruma budur).
    const limited = checkRateLimit(request, { name: 'get-user-email', limit: 20, windowMs: 15 * 60_000 });
    if (limited) return limited;

    await connectDB();

    const body = await request.json();
    const { token } = body;

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
