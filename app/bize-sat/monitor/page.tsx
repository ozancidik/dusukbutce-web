"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';
import LoginRequiredCard from '../components/LoginRequiredCard';

export default function MonitorPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    screenSize: '',
    resolution: '',
    refreshRate: '',
    panelType: '',
    responseTime: '',
    ports: '',
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
    const savedFormData = localStorage.getItem('monitorFormData');
    if (savedFormData) {
          // JWT token al
    const token = localStorage.getItem('token');
    
    try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş monitör form verileri yüklendi');
      } catch (error) {
        console.error('Form verileri yüklenirken hata:', error);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleInputChange = (field: string, value: any) => {
    const newData = {
      ...formData,
      [field]: value
    };
    setFormData(newData);
    
    // Form verilerini localStorage'a kaydet
    localStorage.setItem('monitorFormData', JSON.stringify(newData));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const newImages: string[] = [];
      let processedCount = 0;
      
      fileArray.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            processedCount++;
            
            // Tüm dosyalar işlendiğinde state'i güncelle
            if (processedCount === fileArray.length) {
              setFormData(prev => {
                const updatedData = {
                  ...prev,
                  images: [...prev.images, ...newImages]
                };
                
                // localStorage'ı da güncelle
                localStorage.setItem('monitorFormData', JSON.stringify(updatedData));
                
                return updatedData;
              });
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      };
      
      // localStorage'ı da güncelle
      localStorage.setItem('monitorFormData', JSON.stringify(newData));
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login?returnUrl=' + encodeURIComponent('/bize-sat/monitor'));
      return;
    }

    setIsSubmitting(true);
    try {
      // JWT token al
      const token = localStorage.getItem('token');
      console.log('📝 Form Data before submit:', formData);
      
      // Timeout için AbortController kullan (MongoDB bağlantısı için yeterli süre)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 saniye timeout
      
      const response = await fetch('/api/monitor-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          category: 'monitor',
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
        setPopupMessage('Monitor ürününüz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        localStorage.removeItem('monitorFormData');
        
        setFormData({
          brand: '',
          model: '',
          screenSize: '',
          resolution: '',
          refreshRate: '',
          panelType: '',
          responseTime: '',
          ports: '',
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
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '24px' : '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 8px 0'
          }}>
            Monitör Sat
          </h1>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Monitörünüzü satın, en iyi fiyatı alın
          </p>
        </div>

        {/* Login Required Card */}
        {!isLoggedIn && <LoginRequiredCard isMobile={isMobile} returnUrl="/bize-sat/monitor" />}.map((_, index) => (
                <div key={`empty-${index}`} style={{
                  aspectRatio: '1',
                  borderRadius: '8px',
                  border: '2px dashed #d1d5db',
                  background: '#f9fafb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  position: 'relative',
                  width: isMobile ? '60px' : 'auto',
                  height: isMobile ? '60px' : 'auto',
                  minWidth: isMobile ? '60px' : 'auto',
                  minHeight: isMobile ? '60px' : 'auto'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#3b82f6';
                  e.currentTarget.style.background = '#eff6ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.background = '#f9fafb';
                }}
                onClick={() => {
                  const fileInput = document.createElement('input');
                  fileInput.type = 'file';
                  fileInput.accept = 'image/*';
                  fileInput.multiple = true;
                  fileInput.onchange = (e) => {
                    const target = e.target as HTMLInputElement;
                    if (target.files) {
                      handleImageUpload({ target } as React.ChangeEvent<HTMLInputElement>);
                    }
                  };
                  fileInput.click();
                }}
                >
                  <div style={{
                    textAlign: 'center',
                    color: '#6b7280'
                  }}>
                    <div style={{
                      fontSize: isMobile ? '16px' : '24px',
                      marginBottom: '2px'
                    }}>
                      📷
                    </div>
                    <div style={{
                      fontSize: isMobile ? '8px' : '12px',
                      fontWeight: '500'
                    }}>
                      {isMobile ? 'Ekle' : 'Fotoğraf Ekle'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dosya seçici (gizli) */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                display: 'none'
              }}
              id="image-upload-input"
            />
            
            {/* Bilgi metni */}
            <p style={{
              fontSize: isMobile ? '8px' : '12px',
              color: '#6b7280',
              margin: '8px 0 0 0',
              textAlign: 'center'
            }}>
              Maksimum 10 fotoğraf ekleyebilirsiniz. Her kareye tıklayarak fotoğraf seçebilirsiniz.
            </p>
          </div>

                    {/* Submit Button */}
          {isLoggedIn && (
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                }
              }}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'TEKLİF AL'}
            </button>
          )}
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              color: 'white',
              margin: '0 auto 16px'
            }}>
              ✅
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 8px 0'
            }}>
              Başarıyla Gönderildi!
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: '0 0 16px 0',
              lineHeight: '1.5'
            }}>
              Monitörünüz için teklif talebiniz alındı. En kısa sürede size ulaşacağız.
            </p>
            <p style={{
              fontSize: '13px',
              color: '#059669',
              margin: '0 0 24px 0',
              lineHeight: '1.5',
              fontWeight: '500',
              background: '#f0fdf4',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              💡 Teklif durumunuzu <strong>Tekliflerim</strong> sayfasından takip edebilirsiniz.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Tamam
            </button>
          </div>
        </div>
      )}
    {/* Popup */}
      <SubmissionPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        type={popupType}
        title={popupTitle}
        message={popupMessage}
        duration={0}
        redirectPath={popupType === 'success' ? '/tekliflerim' : undefined}
      />
    </div>
  );
} 


