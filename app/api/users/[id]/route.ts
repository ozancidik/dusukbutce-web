import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from '../../../../models/User';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const user = await User.findById(id).select('-password');
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Kullanıcı bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        isAdmin: user.isAdmin || false,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    );
  }
}
