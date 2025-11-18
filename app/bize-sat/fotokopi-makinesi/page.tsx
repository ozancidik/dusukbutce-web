"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';
import LoginRequiredCard from '../components/LoginRequiredCard';
import PhotocopierHeader from './components/PhotocopierHeader';
import PhotocopierBasicInfo from './components/PhotocopierBasicInfo';
import PhotocopierTechnicalSpecs from './components/PhotocopierTechnicalSpecs';
import PhotocopierCondition from './components/PhotocopierCondition';
import PhotocopierImages from './components/PhotocopierImages';
import PhotocopierSubmit from './components/PhotocopierSubmit';

export default function FotokopiMakinesiPage() {
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
    type: '',
    color: '',
    connectionType: '',
    copySpeed: '',
    resolution: '',
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
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // localStorage'dan kaydedilmiş form verilerini yükle
    const token = localStorage.getItem('token');
    
    try {
      const savedFormData = localStorage.getItem('copierFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş form verileri yüklendi');
      }
    } catch (error) {
      console.warn('localStorage\'dan veri yüklenirken hata:', error);
      try {
        localStorage.removeItem('copierFormData');
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
        localStorage.setItem('copierFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası:', error);
        const dataWithoutImages = { ...newData, images: [] };
        try {
          localStorage.setItem('copierFormData', JSON.stringify(dataWithoutImages));
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
      const remainingSlots = maxImages - (formData.images?.length || 0);
      
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
          if (e.target?.result) {
            try {
              const base64String = e.target.result as string;
              const compressedImage = await compressImage(base64String);
              
              newImages.push(compressedImage);
              if (newImages.length === filesToProcess.length) {
                setFormData(prev => {
                  const newData = {
                    ...prev,
                    images: [...(prev.images || []), ...newImages]
                  };
                  
                  try {
                    localStorage.setItem('copierFormData', JSON.stringify(newData));
                  } catch (error) {
                    console.warn('localStorage quota hatası:', error);
                  }
                  
                  return newData;
                });
              }
            } catch (error) {
              console.error('Resim işleme hatası:', error);
              newImages.push(e.target.result as string);
              if (newImages.length === filesToProcess.length) {
                setFormData(prev => {
                  const newData = {
                    ...prev,
                    images: [...(prev.images || []), ...newImages]
                  };
                  
                  try {
                    localStorage.setItem('copierFormData', JSON.stringify(newData));
                  } catch (error) {
                    console.warn('localStorage quota hatası:', error);
                  }
                  
                  return newData;
                });
              }
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const compressImage = (base64String: string): Promise<string> => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      return new Promise((resolve) => {
        img.onload = () => {
          const maxWidth = 800;
          const maxHeight = 600;
          
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
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
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
        localStorage.setItem('copierFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası:', error);
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login?returnUrl=' + encodeURIComponent('/bize-sat/fotokopi-makinesi'));
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
          category: 'fotokopi-makinesi',
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
        setPopupMessage('Fotokopi makineniz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        localStorage.removeItem('copierFormData');
        
        setFormData({
          brand: '',
          model: '',
          type: '',
          color: '',
          connectionType: '',
          copySpeed: '',
          resolution: '',
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
        <PhotocopierHeader isMobile={isMobile} />

        {!isLoggedIn && <LoginRequiredCard isMobile={isMobile} />}

        {/* Form */}
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
            ⚠️ <strong>Önemli:</strong> Sadece çalışır durumda olan fotokopi makineleri satın alınır. Toner durumu ve kopya sayısı fiyatı etkiler.
          </div>

          <PhotocopierBasicInfo 
            isMobile={isMobile} 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <PhotocopierTechnicalSpecs 
            isMobile={isMobile} 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <PhotocopierCondition 
            isMobile={isMobile} 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />

          <PhotocopierImages 
            isMobile={isMobile} 
            formData={formData} 
            handleImageUpload={handleImageUpload}
            removeImage={removeImage}
          />

          <PhotocopierSubmit 
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