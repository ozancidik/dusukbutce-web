"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';

export default function XboxPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [formData, setFormData] = useState({
    model: '',
    condition: '',
    cosmeticCondition: '',
    accessories: '',
    hasBox: false,
    hasInvoice: false,
    hasWarranty: false,
    warrantyDuration: '',
    invoiceDate: '',
    quantity: 1,
    color: '',
    images: [] as string[],
    description: ''
  });
  const { isLoggedIn } = useAuth();
  const router = useRouter();

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
      const savedFormData = localStorage.getItem('xboxFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş form verileri yüklendi');
      }
    } catch (error) {
      console.warn('localStorage\'dan veri yüklenirken hata:', error);
      // localStorage'ı temizle
      try {
        localStorage.removeItem('xboxFormData');
      } catch (innerError) {
        console.error('localStorage temizlenemedi:', innerError);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login?returnUrl=' + encodeURIComponent('/bize-sat/xbox'));
      return;
    }

    setIsSubmitting(true);
    try {
      // JWT token al
      const token = localStorage.getItem('token');
      console.log('JWT Token:', token);
      
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          category: 'xbox',
          brand: 'xbox',
          ...formData
        }),
      });

      if (response.ok) {
        setPopupType('success');
        setPopupTitle('Teklif Başarıyla Gönderildi!');
        setPopupMessage('$1 ürününüz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        // Form başarıyla gönderildikten sonra localStorage'ı temizle
        localStorage.removeItem('xboxFormData');
        
        setFormData({
          model: '',
          condition: '',
          cosmeticCondition: '',
          accessories: '',
          hasBox: false,
          hasInvoice: false,
          hasWarranty: false,
          warrantyDuration: '',
          invoiceDate: '',
          quantity: 1,
          color: '',
          images: [],
          description: ''
        });
      } else {
        setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage('Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage('Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
        setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Form verilerini localStorage'a kaydet (hata yakalama ile)
      try {
        localStorage.setItem('xboxFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası, veriler kaydedilemedi:', error);
        // Resimleri olmadan kaydetmeyi dene
        const dataWithoutImages = { ...newData, images: [] };
        try {
          localStorage.setItem('xboxFormData', JSON.stringify(dataWithoutImages));
        } catch (innerError) {
          console.error('localStorage tamamen dolu:', innerError);
        }
      }
      
      return newData;
    });
  };

  return (
    <div style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)',
      padding: isMobile ? '20px 10px' : '40px 20px',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: isMobile ? '100%' : '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: isMobile ? '12px' : '16px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.1)',
        padding: isMobile ? '24px 16px' : '48px',
        fontFamily: 'sans-serif'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '32px' : '48px'
        }}>
          <h1 style={{
            color: '#2563eb',
            fontSize: isMobile ? '28px' : '36px',
            marginBottom: '16px',
            fontWeight: 'bold'
          }}>
            Xbox Konsol Sat
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: isMobile ? '16px' : '18px',
            lineHeight: '1.6'
          }}>
            Xbox konsolunuzu değerinde satın, hızlı ödeme alın
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
              onClick={() => router.push(`/login?returnUrl=${encodeURIComponent('/bize-sat/xbox')}`)}
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
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '20px' : '24px'
        }}>
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Xbox Modeli *
            </label>
            <select
              name="model"
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              required
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                backgroundColor: 'white',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Model seçin</option>
              <option value="Xbox Series X">Xbox Series X</option>
              <option value="Xbox Series S">Xbox Series S</option>
              <option value="Xbox One X">Xbox One X</option>
              <option value="Xbox One S">Xbox One S</option>
              <option value="Xbox One">Xbox One</option>
              <option value="Xbox 360">Xbox 360</option>
              <option value="Xbox">Xbox (İlk Nesil)</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Durum *
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={(e) => handleInputChange('condition', e.target.value)}
              required
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                backgroundColor: 'white',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Durum seçin</option>
              <option value="Sıfır">Sıfır (Hiç kullanılmamış)</option>
              <option value="Çok İyi">Çok İyi (Az kullanılmış)</option>
              <option value="İyi">İyi (Normal kullanım)</option>
              <option value="Orta">Orta (Görünür kullanım izleri)</option>
              <option value="Kötü">Kötü (Hasarlı)</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Kozmetik Durum
            </label>
            <select
              name="cosmeticCondition"
              value={formData.cosmeticCondition}
              onChange={(e) => handleInputChange('cosmeticCondition', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                backgroundColor: 'white',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Kozmetik durum seçin</option>
              <option value="Mükemmel">Mükemmel (Hiç çizik yok)</option>
              <option value="Çok İyi">Çok İyi (Minimal çizikler)</option>
              <option value="İyi">İyi (Hafif kullanım izleri)</option>
              <option value="Orta">Orta (Görünür çizikler)</option>
              <option value="Kötü">Kötü (Çok çizikli)</option>
            </select>
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Aksesuarlar
            </label>
            <input
              type="text"
              name="accessories"
              value={formData.accessories}
              onChange={(e) => handleInputChange('accessories', e.target.value)}
              placeholder="Kumanda, oyun, kablo vb."
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Miktar
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
              min="1"
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Renk
            </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              placeholder="Örn: Siyah, Beyaz, Kırmızı"
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Kutu, Fatura, Garanti Checkbox'ları */}
          <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
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
                    fontSize: '12px',
                    color: '#6b7280',
                    marginBottom: '4px'
                  }}>
                    Fatura Tarihi
                  </label>
                  <input
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => handleInputChange('invoiceDate', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div></div>
              </div>
            )}
          </div>

          <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Açıklama
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              placeholder="Konsol hakkında detaylı bilgi verin..."
              style={{
                width: '100%',
                padding: isMobile ? '12px' : '16px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: isMobile ? '14px' : '16px',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Fotoğraflar */}
          <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Fotoğraflar (Maksimum 10 adet)
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '8px',
              marginBottom: '16px'
            }}>
              {Array.from({ length: 10 }, (_, index) => (
                <div
                  key={index}
                  style={{
                    aspectRatio: '1',
                    border: '2px dashed #d1d5db',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: formData.images[index] ? '#f3f4f6' : '#fafafa',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        if (file.size > 2 * 1024 * 1024) {
                          alert('Dosya boyutu 2MB\'dan küçük olmalıdır');
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          const result = e.target?.result as string;
                          const newImages = [...formData.images];
                          newImages[index] = result;
                          setFormData(prev => ({ ...prev, images: newImages }));
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                >
                  {formData.images[index] ? (
                    <img
                      src={formData.images[index]}
                      alt={`Upload ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
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
                  )}
                </div>
              ))}
            </div>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0'
            }}>
              Her fotoğraf maksimum 2MB olmalıdır. JPG, PNG formatları desteklenir.
            </p>
          </div>

          {isLoggedIn && (
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: isMobile ? '16px' : '20px',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                opacity: isSubmitting ? 0.7 : 1,
                gridColumn: isMobile ? '1' : '1 / -1'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4)';
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



