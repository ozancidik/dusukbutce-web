"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';

export default function NotebookPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showImageSizeWarning, setShowImageSizeWarning] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    processor: '',
    processorBrand: '',
    graphicsCard: '',
    graphicsCardWatt: '',
    ram: '',
    ramType: '',
    storage: '',
    storageType: '',
    screenSize: '',
    refreshRate: '',
    batteryHealth: '',
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
        // JWT token al
    const token = localStorage.getItem('token');
    console.log('JWT Token:', token);
    
    try {
      const savedFormData = localStorage.getItem('notebookFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş form verileri yüklendi');
      }
    } catch (error) {
      console.warn('localStorage\'dan veri yüklenirken hata:', error);
      // localStorage'ı temizle
      try {
        localStorage.removeItem('notebookFormData');
      } catch (innerError) {
        console.error('localStorage temizlenemedi:', innerError);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleInputChange = (field: string, value: any) => {
    console.log(`🔄 Dropdown changed: ${field} = ${value}`);
    setFormData(prev => {
      const newData = {
        ...prev,
        [field]: value
      };
      
      // Form verilerini localStorage'a kaydet (hata yakalama ile)
      try {
        localStorage.setItem('notebookFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası, veriler kaydedilemedi:', error);
        // Resimleri olmadan kaydetmeyi dene
        const dataWithoutImages = { ...newData, images: [] };
        try {
          localStorage.setItem('notebookFormData', JSON.stringify(dataWithoutImages));
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
      const newImages: string[] = [];
      
      Array.from(files).forEach(async (file) => {
        // Resim boyutunu kontrol et (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          setShowImageSizeWarning(true);
          return;
        }
        
        const reader = new FileReader();
        reader.onload = async (e) => {
          if (e.target?.result) {
            try {
              // Base64 string'i sıkıştır
              const base64String = e.target.result as string;
              const compressedImage = await compressImage(base64String);
              
              newImages.push(compressedImage);
              if (newImages.length === files.length) {
                setFormData(prev => {
                  const newData = {
                    ...prev,
                    images: [...prev.images, ...newImages]
                  };
                  
                  // Form verilerini localStorage'a kaydet (hata yakalama ile)
                  try {
                    localStorage.setItem('notebookFormData', JSON.stringify(newData));
                  } catch (error) {
                    console.warn('localStorage quota hatası, veriler kaydedilemedi:', error);
                    // Eski resimleri temizle
                    const dataWithoutImages = { ...newData, images: [] };
                    try {
                      localStorage.setItem('notebookFormData', JSON.stringify(dataWithoutImages));
                    } catch (innerError) {
                      console.error('localStorage tamamen dolu:', innerError);
                    }
                  }
                  
                  return newData;
                });
              }
            } catch (error) {
              console.error('Resim işleme hatası:', error);
              // Hata durumunda orijinal resmi kullan
              newImages.push(e.target.result as string);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Resim sıkıştırma fonksiyonu
  const compressImage = (base64String: string): Promise<string> => {
    try {
      // Canvas kullanarak resmi sıkıştır
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      return new Promise((resolve) => {
        img.onload = () => {
          // Maksimum boyutları belirle
          const maxWidth = 800;
          const maxHeight = 600;
          
          let { width, height } = img;
          
          // Boyutları orantılı olarak küçült
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
          
          // Resmi çiz ve sıkıştır
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Kaliteyi düşür (0.7 = %70 kalite)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
          resolve(compressedBase64);
        };
        
        img.src = base64String;
      });
    } catch (error) {
      console.warn('Resim sıkıştırma hatası:', error);
      return Promise.resolve(base64String); // Hata durumunda orijinal resmi döndür
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      };
      
      // Form verilerini localStorage'a kaydet (hata yakalama ile)
      try {
        localStorage.setItem('notebookFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası, veriler kaydedilemedi:', error);
        // Resimleri olmadan kaydetmeyi dene
        const dataWithoutImages = { ...newData, images: [] };
        try {
          localStorage.setItem('notebookFormData', JSON.stringify(dataWithoutImages));
        } catch (innerError) {
          console.error('localStorage tamamen dolu:', innerError);
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // JWT token al
      const token = localStorage.getItem('token');
      console.log('JWT Token:', token);
      console.log('📝 Form Data before submit:', formData);
      console.log('🔍 Dropdown values:', {
        processorBrand: formData.processorBrand,
        ramType: formData.ramType,
        storageType: formData.storageType,
        graphicsCardWatt: formData.graphicsCardWatt
      });
      
      const response = await fetch('/api/notebook-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          category: 'notebook',
          cosmeticCondition: formData.cosmeticCondition || 'Mükemmel'
        }),
      });

      if (response.ok) {
        setPopupType('success');
        setPopupTitle('Teklif Başarıyla Gönderildi!');
        setPopupMessage('Notebook bilgisayarınız için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        // Form başarıyla gönderildikten sonra localStorage'ı temizle
        localStorage.removeItem('notebookFormData');
        
        setFormData({
          brand: '',
          model: '',
          processor: '',
          processorBrand: '',
          graphicsCard: '',
          graphicsCardWatt: '',
          ram: '',
          ramType: '',
          storage: '',
          storageType: '',
          screenSize: '',
          refreshRate: '',
          batteryHealth: '',
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
        setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage('Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
        setShowPopup(true);
      }
    } catch (error) {
      setPopupType('error');
      setPopupTitle('Hata Oluştu');
      setPopupMessage('Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
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
            Dizüstü Bilgisayar Sat
          </h1>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Dizüstü bilgisayarınızı satın, en iyi fiyatı alın
          </p>
        </div>

        {/* Login Required Card */}
        {!isLoggedIn && (
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            borderRadius: '12px',
            padding: isMobile ? '12px' : '20px',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.1)',
            marginBottom: '24px',
            border: '1px solid #fecaca',
            textAlign: 'center',
            marginLeft: isMobile ? '0' : '0',
            marginRight: isMobile ? '0' : '0'
          }}>
            <div style={{
              textAlign: 'center',
              marginBottom: isMobile ? '10px' : '16px'
            }}>
              <h3 style={{
                fontSize: isMobile ? '13px' : '16px',
                fontWeight: '600',
                color: '#dc2626',
                margin: 0,
                lineHeight: '1.2'
              }}>
                Teklif Alabilmek İçin Giriş Yapmanız Gerekiyor
              </h3>
            </div>
            
            <button
              type="button"
              onClick={() => router.push(`/login?returnUrl=${encodeURIComponent('/bize-sat/notebook')}`)}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '8px 12px' : '12px 20px',
                fontSize: isMobile ? '11px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
                width: '100%',
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.4)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.3)';
                e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
              }}
            >
              🚀 Giriş Yap ve Teklif Al
            </button>
            
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#991b1b',
              margin: '6px 0 0 0',
              opacity: 0.8,
              lineHeight: '1.2'
            }}>
              Hesabınız yok mu? <span style={{ fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => router.push('/register')}>Kayıt olun</span>
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '24px' : '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          {/* Temel Bilgiler */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              💻 Temel Bilgiler
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Marka *
                </label>
                <input
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(e) => handleInputChange('brand', e.target.value)}
                  placeholder="Örn: Asus, Dell, HP"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Model *
                </label>
                <input
                  type="text"
                  required
                  value={formData.model}
                  onChange={(e) => handleInputChange('model', e.target.value)}
                  placeholder="Örn: ROG Strix, Inspiron"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>
          </div>

          {/* Teknik Özellikler */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ⚙️ Teknik Özellikler
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    İşlemci
                  </label>
                  <input
                    type="text"
                    value={formData.processor}
                    onChange={(e) => handleInputChange('processor', e.target.value)}
                    placeholder="Örn: i7-12700H"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Marka
                  </label>
                  <select
                    value={formData.processorBrand}
                    onChange={(e) => handleInputChange('processorBrand', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  >
                    <option value="">Seçiniz</option>
                    <option value="Intel">Intel</option>
                    <option value="AMD">AMD</option>
                  </select>
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Ekran Kartı
                  </label>
                  <input
                    type="text"
                    value={formData.graphicsCard}
                    onChange={(e) => handleInputChange('graphicsCard', e.target.value)}
                    placeholder="Örn: RTX 4060"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Watt Değeri
                  </label>
                  <input
                    type="text"
                    value={formData.graphicsCardWatt}
                    onChange={(e) => handleInputChange('graphicsCardWatt', e.target.value)}
                    placeholder="Örn: 140W"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    RAM
                  </label>
                  <input
                    type="text"
                    value={formData.ram}
                    onChange={(e) => handleInputChange('ram', e.target.value)}
                    placeholder="Örn: 16GB"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    RAM Tipi
                  </label>
                  <select
                    value={formData.ramType}
                    onChange={(e) => handleInputChange('ramType', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  >
                    <option value="">Seçiniz</option>
                    <option value="DDR4">DDR4</option>
                    <option value="DDR5">DDR5</option>
                    <option value="DDR3">DDR3</option>
                    <option value="LPDDR4">LPDDR4</option>
                    <option value="LPDDR5">LPDDR5</option>
                  </select>
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Disk Kapasitesi
                  </label>
                  <input
                    type="text"
                    value={formData.storage}
                    onChange={(e) => handleInputChange('storage', e.target.value)}
                    placeholder="Örn: 512GB"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Disk Tipi
                  </label>
                  <select
                    value={formData.storageType}
                    onChange={(e) => handleInputChange('storageType', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  >
                    <option value="">Seçiniz</option>
                    <option value="SSD(SATA)">SSD(SATA)</option>
                    <option value="SSD(NVMe)">SSD(NVMe)</option>
                    <option value="HDD">HDD</option>
                    <option value="SSD(SATA)+HDD">SSD(SATA)+HDD</option>
                    <option value="SSD(NVMe)+HDD">SSD(NVMe)+HDD</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Ekran Boyutu
                </label>
                <input
                  type="text"
                  value={formData.screenSize}
                  onChange={(e) => handleInputChange('screenSize', e.target.value)}
                  placeholder={'Örn: 15.6", 17.3"'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Yenileme Hızı
                </label>
                <input
                  type="text"
                  value={formData.refreshRate}
                  onChange={(e) => handleInputChange('refreshRate', e.target.value)}
                  placeholder="Örn: 144Hz, 60Hz"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Pil Durumu
                </label>
                <input
                  type="text"
                  value={formData.batteryHealth}
                  onChange={(e) => handleInputChange('batteryHealth', e.target.value)}
                  placeholder="Örn: %85, %90"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Açıklama
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Ürün hakkında ek bilgiler, özellikler, kullanım durumu vb."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>
          </div>

          {/* Durum Bilgileri */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📋 Durum Bilgileri
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Kozmetik Durum *
                </label>
                <select
                  required
                  value={formData.cosmeticCondition}
                  onChange={(e) => handleInputChange('cosmeticCondition', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="Mükemmel">Mükemmel</option>
                  <option value="İyi">İyi</option>
                  <option value="Orta">Orta</option>
                  <option value="Kötü">Kötü</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Adet *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '16px',
              marginTop: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <input
                  type="checkbox"
                  checked={formData.hasBox}
                  onChange={(e) => handleInputChange('hasBox', e.target.checked)}
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
                <label style={{
                  fontSize: '16px',
                  color: '#374151'
                }}>
                  Kutusu var
                </label>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <input
                  type="checkbox"
                  checked={formData.hasInvoice}
                  onChange={(e) => handleInputChange('hasInvoice', e.target.checked)}
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
                <label style={{
                  fontSize: '16px',
                  color: '#374151'
                }}>
                  Faturası var
                </label>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <input
                  type="checkbox"
                  checked={formData.hasWarranty}
                  onChange={(e) => handleInputChange('hasWarranty', e.target.checked)}
                  style={{
                    width: '24px',
                    height: '24px'
                  }}
                />
                <label style={{
                  fontSize: '16px',
                  color: '#374151'
                }}>
                  Garanti
                </label>
                {formData.hasWarranty && (
                  <select
                    value={formData.warrantyDuration}
                    onChange={(e) => handleInputChange('warrantyDuration', e.target.value)}
                    style={{
                      marginLeft: '8px',
                      padding: '4px 8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: isMobile ? '8px' : '12px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Süre seçin</option>
                    <option value="1 yıl">1 yıl</option>
                    <option value="2 yıl">2 yıl</option>
                    <option value="3 yıl">3 yıl</option>
                    <option value="4 yıl">4 yıl</option>
                  </select>
                )}
              </div>
            </div>
            {formData.hasInvoice && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                gap: '16px',
                marginTop: '16px'
              }}>
                <div></div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '6px'
                  }}>
                    Fatura Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
                <div></div>
              </div>
            )}
          </div>

          {/* Fotoğraflar */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              📸 Fotoğraflar
            </h2>
            
            {/* Fotoğraf Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(5, 1fr)',
              gridTemplateRows: isMobile ? 'repeat(2, 1fr)' : 'auto',
              gap: isMobile ? '8px' : '12px',
              marginBottom: '16px'
            }}>
              {/* Mevcut fotoğraflar */}
              {formData.images.map((image, index) => (
                <div key={index} style={{
                  position: 'relative',
                  aspectRatio: '1',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb',
                  width: isMobile ? '60px' : 'auto',
                  height: isMobile ? '60px' : 'auto',
                  minWidth: isMobile ? '60px' : 'auto',
                  minHeight: isMobile ? '60px' : 'auto'
                }}>
                  <img
                    src={image}
                    alt={`Fotoğraf ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(220, 38, 38, 0.9)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: isMobile ? '18px' : '24px',
                      height: isMobile ? '18px' : '24px',
                      fontSize: isMobile ? '10px' : '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 1)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 0.9)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              
              {/* Boş fotoğraf alanları */}
              {Array.from({ length: Math.max(0, 10 - formData.images.length) }).map((_, index) => (
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

      {/* Image Size Warning Popup */}
      {showImageSizeWarning && (
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
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '32px',
            textAlign: 'center',
            maxWidth: '450px',
            width: '100%',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
            border: '1px solid #e5e7eb',
            animation: 'slideUp 0.3s ease-out',
            transform: 'translateY(0)'
          }}>
            {/* Warning Icon */}
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              color: 'white',
              margin: '0 auto 20px',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
            }}>
              ⚠️
            </div>
            
            {/* Title */}
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 12px 0',
              lineHeight: '1.3'
            }}>
              Resim Boyutu Çok Büyük
            </h3>
            
            {/* Description */}
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0 0 20px 0',
              lineHeight: '1.6'
            }}>
              Seçtiğiniz resim 2MB'dan büyük. Lütfen daha küçük boyutlu bir resim seçin.
            </p>
            
            {/* Info Box */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #fbbf24',
              margin: '0 0 24px 0'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#92400e',
                margin: 0,
                lineHeight: '1.5',
                fontWeight: '500'
              }}>
                💡 <strong>Önerilen:</strong> 800x600px boyutunda, 2MB altı resimler
              </p>
            </div>
            
            {/* Action Button */}
            <button
              onClick={() => setShowImageSizeWarning(false)}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '14px 28px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
              }}
            >
              Anladım
            </button>
          </div>
        </div>
      )}

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
              Dizüstü bilgisayarınız için teklif talebiniz alındı. En kısa sürede size ulaşacağız.
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


