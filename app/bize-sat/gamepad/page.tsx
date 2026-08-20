"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';
import LoginRequiredCard from '../components/LoginRequiredCard';

export default function GamepadPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [submissionNumber, setSubmissionNumber] = useState('');
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
    
    try {
      const savedFormData = localStorage.getItem('gamepadFormData');
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
        console.log('📝 Kaydedilmiş form verileri yüklendi');
      }
    } catch (error) {
      console.warn('localStorage\'dan veri yüklenirken hata:', error);
      // localStorage'ı temizle
      try {
        localStorage.removeItem('gamepadFormData');
      } catch (innerError) {
        console.error('localStorage temizlenemedi:', innerError);
      }
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Resim sıkıştırma fonksiyonu
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login?returnUrl=' + encodeURIComponent('/bize-sat/gamepad'));
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
      
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          category: 'gamepad',
          brand: 'Gamepad',
          ...formData,
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
        setPopupMessage('Gamepad/Joystick ürününüz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        
        // Form başarıyla gönderildikten sonra localStorage'ı temizle
        localStorage.removeItem('gamepadFormData');
        
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

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Form verilerini localStorage'a kaydet (hata yakalama ile)
      try {
        localStorage.setItem('gamepadFormData', JSON.stringify(newData));
      } catch (error) {
        console.warn('localStorage quota hatası, veriler kaydedilemedi:', error);
        // Resimleri olmadan kaydetmeyi dene
        const dataWithoutImages = { ...newData, images: [] };
        try {
          localStorage.setItem('gamepadFormData', JSON.stringify(dataWithoutImages));
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
            Gamepad/Joystick Sat
          </h1>
          <p style={{
            color: '#6b7280',
            fontSize: isMobile ? '16px' : '18px',
            lineHeight: '1.6'
          }}>
            Gamepad ve joystick'lerinizi değerinde satın, hızlı ödeme alın
          </p>
        </div>

        {/* Login Required Card */}
        {!isLoggedIn && <LoginRequiredCard isMobile={isMobile} returnUrl="/bize-sat/gamepad" />}

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
              Gamepad/Joystick Modeli *
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
              <option value="PlayStation DualSense">PlayStation DualSense</option>
              <option value="PlayStation DualShock 4">PlayStation DualShock 4</option>
              <option value="Xbox Elite Controller">Xbox Elite Controller</option>
              <option value="Xbox Wireless Controller">Xbox Wireless Controller</option>
              <option value="Nintendo Switch Pro Controller">Nintendo Switch Pro Controller</option>
              <option value="Nintendo Joy-Con">Nintendo Joy-Con</option>
              <option value="Steam Controller">Steam Controller</option>
              <option value="Logitech Gamepad">Logitech Gamepad</option>
              <option value="Razer Gamepad">Razer Gamepad</option>
              <option value="Thrustmaster Joystick">Thrustmaster Joystick</option>
              <option value="Saitek Joystick">Saitek Joystick</option>
              <option value="Diğer">Diğer</option>
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
              placeholder="Kablo, şarj cihazı, kılıf vb."
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
              placeholder="Gamepad/joystick hakkında detaylı bilgi verin..."
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

          {/* Fotoğraf Ekleme */}
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
              gap: '12px',
              marginBottom: '16px'
            }}>
              {Array.from({ length: 10 }).map((_, index) => (
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
                        reader.onload = async (e) => {
                          const result = e.target?.result as string;
                          try {
                            const compressedImage = await compressImage(result);
                            const newImages = [...formData.images];
                            newImages[index] = compressedImage;
                            handleInputChange('images', newImages);
                          } catch (error) {
                            console.error('Resim işleme hatası:', error);
                            const newImages = [...formData.images];
                            newImages[index] = result;
                            handleInputChange('images', newImages);
                          }
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
                        objectFit: 'cover',
                        borderRadius: '6px'
                      }}
                    />
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      color: '#9ca3af',
                      fontSize: '12px'
                    }}>
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>📷</div>
                      <div>Fotoğraf {index + 1}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p style={{
              fontSize: '12px',
              color: '#6b7280',
              margin: '0',
              textAlign: 'center'
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
        referenceNumber={submissionNumber}
        duration={0}
        redirectPath={popupType === 'success' ? '/tekliflerim' : undefined}
      />
    </div>
  );
}



