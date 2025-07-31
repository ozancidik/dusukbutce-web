import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Form verilerini doğrula
    if (!formData.brand || !formData.model) {
      return NextResponse.json(
        { error: 'Marka ve model alanları zorunludur' },
        { status: 400 }
      );
    }

    // Resimleri base64 formatında kaydet
    const processedImages = [];
    if (formData.images && Array.isArray(formData.images)) {
      for (const imageData of formData.images) {
        if (imageData && imageData.startsWith('data:image')) {
          // Base64 formatındaki resmi kaydet
          processedImages.push({
            name: `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`,
            data: imageData,
            uploadedAt: new Date().toISOString()
          });
        }
      }
    }

    // Veritabanına kaydet
    const submission = {
      id: Date.now(),
      ...formData,
      images: processedImages, // Base64 formatında resimler
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Dosyaya kaydet
    const dataPath = path.join(process.cwd(), 'data', 'submissions.json');
    
    // data klasörü yoksa oluştur
    if (!fs.existsSync(path.dirname(dataPath))) {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
    }

    // Mevcut verileri oku
    let submissions = [];
    if (fs.existsSync(dataPath)) {
      submissions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }

    // Yeni submission'ı ekle
    submissions.push(submission);
    fs.writeFileSync(dataPath, JSON.stringify(submissions, null, 2));

    console.log('Yeni notebook submission:', {
      ...submission,
      images: `${processedImages.length} resim yüklendi`
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Form başarıyla gönderildi!',
        submissionId: submission.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Tüm submission'ları getir
    const dataPath = path.join(process.cwd(), 'data', 'submissions.json');
    
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ submissions: [] });
    }

    const submissions = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return NextResponse.json({ submissions });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Sunucu hatası oluştu' },
      { status: 500 }
    );
  }
} 