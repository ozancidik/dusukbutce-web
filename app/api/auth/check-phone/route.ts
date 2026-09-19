import { NextRequest } from "next/server";
import connectDB from "@/lib/mongodb";
import { NextResponse } from "next/server";
import User from '@/models/User';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    // Kimlik doğrulaması olmayan, toplu telefon enumeration'a karşı koruma.
    const limited = checkRateLimit(request, { name: 'check-phone', limit: 20, windowMs: 15 * 60_000 });
    if (limited) return limited;

    await connectDB();

    const body = await request.json();
    const { phone } = body;

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { exists: false },
        { status: 200 }
      );
    }

    // Telefon numarasını temizle ve formatla
    const cleanedPhone = phone.replace(/\s/g, '').replace(/[\(\)]/g, '');
    const formattedPhone = cleanedPhone.startsWith('0') ? cleanedPhone : '0' + cleanedPhone;

    // Telefon numarası var mı kontrol et
    const existingUser = await User.findOne({ phone: formattedPhone });

    return NextResponse.json(
      { exists: !!existingUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Check phone error:', error);
    return NextResponse.json(
      { exists: false },
      { status: 500 }
    );
  }
}
