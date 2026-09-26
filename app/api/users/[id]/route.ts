import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from '../../../../models/User';
import { getVerifiedUser } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Kimlik doğrulama zorunlu: bir kullanıcı yalnızca KENDİ kaydını
    // görebilir; admin herkesi görebilir. Aksi halde bu uç, id enumerasyonu
    // ile tüm kullanıcıların e-posta/telefon/doğum tarihi gibi kişisel
    // verisini (KVKK) doğrulama olmadan sızdırıyordu.
    const verified = getVerifiedUser(request);
    if (!verified) {
      return NextResponse.json(
        { success: false, message: 'Yetkisiz erişim' },
        { status: 401 }
      );
    }
    if (!verified.isAdmin && verified.userId !== id) {
      return NextResponse.json(
        { success: false, message: 'Bu kaydı görüntüleme yetkiniz yok' },
        { status: 403 }
      );
    }

    await connectDB();

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
