"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';
import LoginRequiredCard from '../components/LoginRequiredCard';
import PhoneHeader from './components/PhoneHeader';
import PhoneBasicInfo from './components/PhoneBasicInfo';
import PhoneCondition from './components/PhoneCondition';
import PhoneImages from './components/PhoneImages';
import PhoneSubmit from './components/PhoneSubmit';

export default function CepTelefonuPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageSizeWarning, setShowImageSizeWarning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    storage: '',
    ram: '',
    batteryHealth: '',
    screenSize: '',
    color: '',
    registrationType: '',
    description: '',
    cosmeticCondition: 'Mükemmel',
    hasBox: false,
    hasInvoice: false,
    hasWarranty: false,
    warrantyDuration: '',
    invoiceDate: '',
    quantity: 1,
    images: [] as string[],
    powersOn: true,
    cameraWorks: true,
    faceIdWorks: true
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // localStorage'dan kaydedilmiş form verilerini yükle
    const token = localStorage.getItem('token');
    
    try {
      const savedFormData = localStorage.getItem('phoneFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş form verileri yüklendi');
      }
    } catch (error) {
      console.warn('localStorage\'dan veri yüklenirken hata:', error);
      try {
        localStorage.removeItem('phoneFormData');
      } catch (innerError) {
        console.error('localStorage temizlenemedi:', innerError);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => {
      const newData = {
        ...prev,
        [field]: value
      };
      
      try {
        localStorage.setItem('phoneFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası:', error);
        const dataWithoutImages = { ...newData, images: [] };
        try {
          localStorage.setItem('phoneFormData', JSON.stringify(dataWithoutImages));
        } catch (innerError) {
          console.error('localStorage tamamen dolu:', innerError);
        }
      }
      
      return newData;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const maxImages = 10;
      const remainingSlots = maxImages - formData.images.length;
      
      if (remainingSlots <= 0) {
        return; // Maksimum görsel sayısına ulaşıldı
      }
      
      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      const newImages: string[] = [];
      
      filesToProcess.forEach(async (file) => {
        // Resim boyutunu kontrol et (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          setShowImageSizeWarning(true);
          setTimeout(() => setShowImageSizeWarning(false), 3000);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
            const base64String = e.target?.result as string;
              const compressedImage = await compressImage(base64String);
              newImages.push(compressedImage);
              if (newImages.length === filesToProcess.length) {
              setFormData((prev: any) => ({
                    ...prev,
                images: [...prev.images, ...newImages]
              }));
              }
            } catch (error) {
            console.error('Resim sıkıştırma hatası:', error);
            newImages.push(e.target?.result as string);
            if (newImages.length === filesToProcess.length) {
              setFormData((prev: any) => ({
                ...prev,
                images: [...prev.images, ...newImages]
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      images: prev.images.filter((_: any, i: number) => i !== index)
    }));
  };

  const compressImage = async (base64String: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64String;
        img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1600;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;
          
          if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
            }
          } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
          canvas.width = width;
          canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.9)); // 90% quality
        } else {
          reject(new Error('Canvas context not available'));
        }
      };
      img.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login?returnUrl=' + encodeURIComponent('/bize-sat/cep-telefonu'));
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      console.log('📝 Form Data before submit:', formData);
      
      // Timeout için AbortController kullan (MongoDB bağlantısı için yeterli süre)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 saniye timeout
      
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          category: 'cep-telefonu',
          cosmeticCondition: formData.cosmeticCondition || 'Mükemmel'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log('📥 Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('📥 Response data:', data);
        
        setPopupType('success');
        setPopupTitle('Teklif Başarıyla Gönderildi!');
        setPopupMessage('Cep telefonunuz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        localStorage.removeItem('phoneFormData');
        
        setFormData({
          brand: '',
          model: '',
          storage: '',
          ram: '',
          batteryHealth: '',
          screenSize: '',
          color: '',
          registrationType: '',
          description: '',
          cosmeticCondition: 'Mükemmel',
          hasBox: false,
          hasInvoice: false,
          hasWarranty: false,
          warrantyDuration: '',
          invoiceDate: '',
          quantity: 1,
          images: [],
          powersOn: true,
          cameraWorks: true,
          faceIdWorks: true
        });
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Bilinmeyen hata' }));
        console.error('❌ API Error:', errorData);
        setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage(errorData.message || 'Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
        setShowPopup(true);
      }
    } catch (error: any) {
      console.error('❌ Submit Error:', error);
      setPopupType('error');
      setPopupTitle('Hata Oluştu');
      
      if (error.name === 'AbortError') {
        setPopupMessage('İstek zaman aşımına uğradı. Lütfen tekrar deneyin.');
      } else if (error.message) {
        setPopupMessage(error.message);
      } else {
        setPopupMessage('Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
      }
      
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: isMobile ? '20px 12px' : '40px'
    }}>
      <div style={{
        maxWidth: isMobile ? '100%' : '800px',
        margin: '0 auto'
      }}>
        <PhoneHeader isMobile={isMobile} />

        {!isLoggedIn && <LoginRequiredCard isMobile={isMobile} />}

        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '24px' : '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Bilgilendirme */}
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: isMobile ? '13px' : '14px',
            color: '#92400e',
            lineHeight: '1.5'
          }}>
            ⚠️ <strong>Önemli:</strong> Kayıp/çalıntı olarak bildirilen, IMEI'si kara listede olan veya kilitli cihazlar satın alınmaz.
          </div>

          <PhoneBasicInfo 
            isMobile={isMobile}
            formData={formData}
            onInputChange={handleInputChange}
          />

          <PhoneCondition
            isMobile={isMobile}
            formData={formData}
            onInputChange={handleInputChange}
          />

          <PhoneImages
            isMobile={isMobile}
            images={formData.images}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />

          <PhoneSubmit
            isSubmitting={isSubmitting}
          />
        </form>
      </div>

      {showPopup && (
        <SubmissionPopup
          isOpen={showPopup}
          type={popupType}
          title={popupTitle}
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}