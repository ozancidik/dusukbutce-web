"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';

export default function SteeringWheelPage() {
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
    platform: '',
    connectivity: '',
    description: '',
    cosmeticCondition: 'İyi',
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
    const savedFormData = localStorage.getItem('steeringWheelFormData');
    if (savedFormData) {
          // JWT token al
    const token = localStorage.getItem('token');
    
    try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş direksiyon form verileri yüklendi');
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
    localStorage.setItem('steeringWheelFormData', JSON.stringify(newData));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              const newData = {
                ...formData,
                images: [...formData.images, ...newImages]
              };
              setFormData(newData);
              
              // Form verilerini localStorage'a kaydet
              localStorage.setItem('steeringWheelFormData', JSON.stringify(newData));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const newData = {
      ...formData,
      images: formData.images.filter((_, i) => i !== index)
    };
    setFormData(newData);
    
    // Form verilerini localStorage'a kaydet
    localStorage.setItem('steeringWheelFormData', JSON.stringify(newData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // JWT token al
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/notebook-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          category: 'steering-wheel'
        }),
      });

      if (response.ok) {
        setPopupType('success');
        setPopupTitle('Teklif Başarıyla Gönderildi!');
        setPopupMessage('Ürününüz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        // Form verilerini localStorage'dan temizle
        localStorage.removeItem('steeringWheelFormData');
        
        setFormData({
          brand: '',
          model: '',
          platform: '',
          connectivity: '',
          description: '',
          cosmeticCondition: 'İyi',
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
            Oyuncu Direksiyonu Sat
          </h1>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Oyuncu direksiyonunuzu satın, en iyi fiyatı alın
          </p>
        </div>

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
              🎮 Temel Bilgiler
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
                  placeholder="Örn: Logitech, Thrustmaster, Fanatec"
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
                  placeholder="Örn: G29, T300, CSL Elite"
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
                  Platform
                </label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => handleInputChange('platform', e.target.value)}
                  placeholder="Örn: PC, PS4, PS5, Xbox"
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
                  Bağlantı Tipi
                </label>
                <input
                  type="text"
                  value={formData.connectivity}
                  onChange={(e) => handleInputChange('connectivity', e.target.value)}
                  placeholder="Örn: USB, Bluetooth, Kablolu"
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
              Oyuncu direksiyonunuz için teklif talebiniz alındı. En kısa sürede size ulaşacağız.
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


