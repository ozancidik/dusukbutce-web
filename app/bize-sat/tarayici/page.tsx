"use client";
import React, { useState, useEffect } from 'react';
import { uploadImage } from '@/lib/uploadImage';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';
import LoginRequiredCard from '../components/LoginRequiredCard';
import ScannerHeader from './components/ScannerHeader';
import ScannerBasicInfo from './components/ScannerBasicInfo';
import ScannerTechnicalSpecs from './components/ScannerTechnicalSpecs';
import ScannerCondition from './components/ScannerCondition';
import ScannerImages from './components/ScannerImages';
import ScannerSubmit from './components/ScannerSubmit';

export default function TarayiciPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showImageSizeWarning, setShowImageSizeWarning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [submissionNumber, setSubmissionNumber] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    type: '',
    connectionType: '',
    resolution: '',
    scanSpeed: '',
    description: '',
    cosmeticCondition: 'Mükemmel',
    hasBox: false,
    hasInvoice: false,
    hasWarranty: false,
    warrantyDuration: '',
    invoiceDate: '',
    quantity: 1,
    images: [] as string[]
  });

  useEffect(() => {
    // Client-side only
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // localStorage'dan kaydedilmiş form verilerini yükle
    try {
      const savedFormData = localStorage.getItem('scannerFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş form verileri yüklendi');
      }
    } catch (error) {
      console.warn('localStorage\'dan veri yüklenirken hata:', error);
      try {
        localStorage.removeItem('scannerFormData');
      } catch (innerError) {
        console.error('localStorage temizlenemedi:', innerError);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      
      try {
        localStorage.setItem('scannerFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası:', error);
        const dataWithoutImages = { ...newData, images: [] };
        try {
          localStorage.setItem('scannerFormData', JSON.stringify(dataWithoutImages));
        } catch (innerError) {
          console.error('localStorage tamamen dolu:', innerError);
        }
      }
      
      return newData;
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(async (file) => {
      try {
        const url = await uploadImage(file);
        setFormData((prev: any) => ({ ...prev, images: [...prev.images, url] }));
      } catch (err) {
        console.error('Görsel yüklenemedi:', err);
        alert(err instanceof Error ? err.message : 'Görsel yüklenirken bir hata oluştu.');
      }
    });
  };

  const compressImage = (base64String: string): Promise<string> => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      return new Promise((resolve) => {
        img.onload = () => {
          // Maksimum boyutları belirle (daha yüksek çözünürlük için artırıldı)
          const maxWidth = 1600;
          const maxHeight = 1200;
          
          let { width, height } = img;
          
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = (width * maxHeight) / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          // Kaliteyi artır (0.9 = %90 kalite - daha net görüntü için)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.9);
          resolve(compressedBase64);
        };
        
        img.src = base64String;
      });
    } catch (error) {
      console.warn('Resim sıkıştırma hatası:', error);
      return Promise.resolve(base64String);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        images: (prev.images || []).filter((_, i) => i !== index)
      };
      
      try {
        localStorage.setItem('scannerFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası:', error);
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login?returnUrl=' + encodeURIComponent('/bize-sat/tarayici'));
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
          category: 'tarayici',
          cosmeticCondition: formData.cosmeticCondition || 'Mükemmel'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log('📥 Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        setSubmissionNumber(data.submissionNumber || '');
        console.log('📥 Response data:', data);
        
        setPopupType('success');
        setPopupTitle('Teklif Başarıyla Gönderildi!');
        setPopupMessage('Tarayıcınız için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        localStorage.removeItem('scannerFormData');
        
        setFormData({
          brand: '',
          model: '',
          type: '',
          connectionType: '',
          resolution: '',
          scanSpeed: '',
          description: '',
          cosmeticCondition: 'Mükemmel',
          hasBox: false,
          hasInvoice: false,
          hasWarranty: false,
          warrantyDuration: '',
          invoiceDate: '',
          quantity: 1,
          images: []
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
        <ScannerHeader isMobile={isMobile} />

        {!isLoggedIn && <LoginRequiredCard isMobile={isMobile} />}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '24px' : '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <ScannerBasicInfo 
            isMobile={isMobile} 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <ScannerTechnicalSpecs 
            isMobile={isMobile} 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <ScannerCondition 
            isMobile={isMobile} 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <ScannerImages 
            isMobile={isMobile} 
            formData={formData} 
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
          />

          <ScannerSubmit 
            isLoggedIn={isLoggedIn} 
            isSubmitting={isSubmitting} 
          />
        </form>
      </div>

      {/* Popup */}
      <SubmissionPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type={popupType}
        title={popupTitle}
        message={popupMessage}
        referenceNumber={submissionNumber}
      />

      {/* Image Size Warning */}
      {showImageSizeWarning && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            textAlign: 'center'
          }}>
            <h3 style={{
              color: '#dc2626',
              marginBottom: '12px'
            }}>
              ⚠️ Dosya Boyutu Hatası
            </h3>
            <p style={{
              color: '#374151',
              marginBottom: '16px'
            }}>
              Seçtiğiniz resim 2MB'dan büyük. Lütfen daha küçük bir resim seçin.
            </p>
            <button
              onClick={() => setShowImageSizeWarning(false)}
              style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer'
              }}
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}