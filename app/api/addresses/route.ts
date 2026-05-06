import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 MONGODB_URI:', process.env.MONGODB_URI);
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { message: 'Kullanıcı ID gereklidir.' },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { message: 'Geçersiz kullanıcı ID formatı.' },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      addresses: user.addresses || []
    });

  } catch (error) {
    console.error('Get addresses error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, fullName, phone, address, city, district, postalCode, isDefault, userId } = await request.json();

    // Validation
    if (!title || !fullName || !phone || !address || !city || !district || !userId) {
      return NextResponse.json(
        { message: 'Tüm zorunlu alanları doldurun.' },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { message: 'Geçersiz kullanıcı ID formatı.' },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );
    }

    // Eğer varsayılan adres olarak işaretleniyorsa, diğer adresleri varsayılan olmaktan çıkar
    if (isDefault) {
      user.addresses.forEach((addr: any) => {
        addr.isDefault = false;
      });
    }

    const newAddress = {
      title,
      fullName,
      phone,
      address,
      city,
      district,
      postalCode: postalCode || '',
      isDefault: isDefault || false,
      createdAt: new Date()
    };

    user.addresses.push(newAddress);
    await user.save();

    return NextResponse.json(
      { message: 'Adres başarıyla eklendi.', address: newAddress },
      { status: 201 }
    );

  } catch (error) {
    console.error('Add address error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { addressId, title, fullName, phone, address, city, district, postalCode, isDefault, userId } = await request.json();

    // Validation
    if (!addressId || !title || !fullName || !phone || !address || !city || !district || !userId) {
      return NextResponse.json(
        { message: 'Tüm zorunlu alanları doldurun.' },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { message: 'Geçersiz kullanıcı ID formatı.' },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );
    }

    const addressIndex = user.addresses.findIndex((addr: any) => addr._id.toString() === addressId);
    
    if (addressIndex === -1) {
      return NextResponse.json(
        { message: 'Adres bulunamadı.' },
        { status: 404 }
      );
    }

    // Eğer varsayılan adres olarak işaretleniyorsa, diğer adresleri varsayılan olmaktan çıkar
    if (isDefault) {
      user.addresses.forEach((addr: any, index: number) => {
        if (index !== addressIndex) {
          addr.isDefault = false;
        }
      });
    }

    user.addresses[addressIndex] = {
      ...user.addresses[addressIndex],
      title,
      fullName,
      phone,
      address,
      city,
      district,
      postalCode: postalCode || '',
      isDefault: isDefault || false
    };

    await user.save();

    return NextResponse.json(
      { message: 'Adres başarıyla güncellendi.', address: user.addresses[addressIndex] },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update address error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const addressId = searchParams.get('addressId');
    const userId = searchParams.get('userId');

    if (!addressId || !userId) {
      return NextResponse.json(
        { message: 'Adres ID ve kullanıcı ID gereklidir.' },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(userId)) {
      return NextResponse.json(
        { message: 'Geçersiz kullanıcı ID formatı.' },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await User.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Kullanıcı bulunamadı.' },
        { status: 404 }
      );
    }

    const addressIndex = user.addresses.findIndex((addr: any) => addr._id.toString() === addressId);
    
    if (addressIndex === -1) {
      return NextResponse.json(
        { message: 'Adres bulunamadı.' },
        { status: 404 }
      );
    }

    user.addresses.splice(addressIndex, 1);
    await user.save();

    return NextResponse.json(
      { message: 'Adres başarıyla silindi.' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete address error:', error);
    return NextResponse.json(
      { message: 'Sunucu hatası oluştu.' },
      { status: 500 }
    );
  }
}
