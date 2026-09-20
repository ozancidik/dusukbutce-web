import { NextRequest, NextResponse } from 'next/server';

const CATEGORIES = [
  { id: 'notebook', name: 'Notebook', description: 'Laptoplar ve Dizüstü Bilgisayarlar' },
  { id: 'desktop', name: 'Masaüstü', description: 'Masaüstü Bilgisayarlar' },
  { id: 'monitor', name: 'Monitor', description: 'Ekranlar' },
  { id: 'keyboard', name: 'Klavye', description: 'Klavyeler' },
  { id: 'mouse', name: 'Fare', description: 'Fareler' },
  { id: 'ram', name: 'RAM', description: 'Bellek Modülleri' },
  { id: 'ssd', name: 'SSD', description: 'Katı Hal Sürücüleri' },
  { id: 'hdd', name: 'HDD', description: 'Mekanik Sürücüler' },
  { id: 'gpu', name: 'GPU', description: 'Grafik Kartları' },
  { id: 'psu', name: 'PSU', description: 'Güç Kaynakları' },
  { id: 'case', name: 'Bilgisayar Kasası', description: 'Bilgisayar Kutuları' },
  { id: 'motherboard', name: 'Anakart', description: 'Anakartlar' },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        success: true,
        data: CATEGORIES,
        count: CATEGORIES.length
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Categories error:', error);
    return NextResponse.json(
      { error: 'Kategoriler yüklenirken hata oluştu' },
      { status: 500 }
    );
  }
}
