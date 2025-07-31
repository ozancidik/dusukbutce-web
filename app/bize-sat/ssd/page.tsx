"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

export default function BuySSDPage() {
  const [hasBox, setHasBox] = useState(false);
  const [hasInvoice, setHasInvoice] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [cosmeticCondition, setCosmeticCondition] = useState("");
  const [showCosmeticTooltip, setShowCosmeticTooltip] = useState(false);
  const [images, setImages] = useState<(string | null)[]>(Array(10).fill(null));
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [brandValue, setBrandValue] = useState('');
  const [modelValue, setModelValue] = useState('');
  const [capacityValue, setCapacityValue] = useState('');
  const [manufacturingYearValue, setManufacturingYearValue] = useState('');
  const [batteryHealthValue, setBatteryHealthValue] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [isMobile, setIsMobile] = useState(false);
  const conditions = ["Kötü", "İyi", "Çok iyi", "Mükemmel"];

  const isFormValid = useMemo(() => {
    if (!brandValue || brandValue.trim().length < 2) return false;
    if (!modelValue || modelValue.trim().length < 2) return false;
    if (!capacityValue || capacityValue.trim().length < 2) return false;
    if (!manufacturingYearValue || manufacturingYearValue.trim().length < 2) return false;
    return true;
  }, [brandValue, modelValue, capacityValue, manufacturingYearValue]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleSubmit = async () => {
    if (!isFormValid) {
      alert('Lütfen tüm gerekli alanları doldurun.');
      return;
    }

    try {
      const formData = {
        hasBox,
        hasInvoice,
        invoiceDate,
        cosmeticCondition,
        brand: brandValue,
        model: modelValue,
        capacity: capacityValue,
        manufacturingYear: manufacturingYearValue,
        images: images.filter(img => img !== null)
      };

      const response = await fetch('/api/ssd-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Form başarıyla gönderildi! Teklifiniz en kısa sürede size ulaşacak.');
      } else {
        alert(`Hata: ${result.error}`);
      }

    } catch (error) {
      console.error('Form gönderme hatası:', error);
      alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const openPreview = (imageData: string) => {
    setPreviewImage(imageData);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
      padding: isMobile ? '16px 8px' : '40px 20px'
    }}>
      <div style={{
        maxWidth: isMobile ? '100%' : '1200px',
        margin: '0 auto',
        padding: isMobile ? '24px 16px' : '40px',
        background: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 100%)',
        borderRadius: isMobile ? '16px' : '24px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.05)',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        minHeight: '80vh',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: isMobile ? '24px' : '32px',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '16px' : '0'
        }}>
          <h1 style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: isMobile ? '28px' : '36px',
            margin: 0,
            fontWeight: '800',
            letterSpacing: '-0.025em',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            SSD Sat
          </h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <label style={{
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600',
                color: '#374151',
                whiteSpace: 'nowrap'
              }}>
                ADET:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1) {
                    setQuantity(value);
                  }
                }}
                style={{
                  width: '80px',
                  padding: '8px 12px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  textAlign: 'center',
                  backgroundColor: '#f8fafc',
                  color: '#374151',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            style={{
              background: isFormValid 
                ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' 
                : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: isMobile ? '14px 24px' : '18px 36px',
              fontSize: isMobile ? '16px' : '20px',
              fontWeight: '700',
              cursor: isFormValid ? 'pointer' : 'not-allowed',
              boxShadow: isFormValid 
                ? '0 8px 25px rgba(16, 185, 129, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)' 
                : '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              whiteSpace: 'nowrap',
              position: 'relative',
              overflow: 'hidden',
              opacity: isFormValid ? 1 : 0.6
            }}
          >
            TEKLİF AL
          </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '20px' : '32px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '10px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569',
                letterSpacing: '0.025em'
              }}>
                Marka
              </label>
              <input
                type="text"
                placeholder="Örn: Samsung, Kingston, Crucial..."
                value={brandValue}
                onChange={(e) => setBrandValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: isMobile ? '14px 16px' : '16px 20px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: isMobile ? '16px' : '18px',
                  boxSizing: 'border-box',
                  background: '#ffffff',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Model
              </label>
              <input
                type="text"
                placeholder="Örn: 870 EVO, A2000, MX500..."
                value={modelValue}
                onChange={(e) => setModelValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: isMobile ? '14px 16px' : '16px 20px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: isMobile ? '16px' : '18px',
                  boxSizing: 'border-box',
                  background: '#ffffff',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Kapasite
              </label>
              <input
                type="text"
                placeholder="Örn: 256GB, 512GB, 1TB..."
                value={capacityValue}
                onChange={(e) => setCapacityValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: isMobile ? '14px 16px' : '16px 20px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: isMobile ? '16px' : '18px',
                  boxSizing: 'border-box',
                  background: '#ffffff',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Üretim Yılı
              </label>
              <input
                type="text"
                placeholder="Örn: 2020, 2021, 2022, 2023..."
                value={manufacturingYearValue}
                onChange={(e) => setManufacturingYearValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: isMobile ? '14px 16px' : '16px 20px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: isMobile ? '16px' : '18px',
                  boxSizing: 'border-box',
                  background: '#ffffff',
                  transition: 'all 0.2s ease',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: isMobile ? '20px' : '32px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: isMobile ? '16px' : '20px'
          }}>
            <h3 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '700',
              color: '#374151',
              letterSpacing: '0.025em',
              margin: 0
            }}>
              Kozmetik Durumu
            </h3>
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                fontSize: '14px',
                fontWeight: 'bold',
                color: 'white',
                boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={() => setShowCosmeticTooltip(true)}
              onMouseLeave={() => setShowCosmeticTooltip(false)}
            >
              ?
              {showCosmeticTooltip && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '30px',
                  background: '#1f2937',
                  color: 'white',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  maxWidth: '350px',
                  minWidth: '320px',
                  zIndex: 1000,
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
                  lineHeight: '1.5'
                }}>
                  <div style={{ marginBottom: '12px', fontWeight: '600', fontSize: '15px' }}>
                    Kozmetik Durumu Nasıl Değerlendirilir?
                  </div>
                  <div style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                    <strong>Kötü:</strong> Çizikler, darbeler, renk değişimi, aşınma belirtileri
                  </div>
                  <div style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                    <strong>İyi:</strong> Hafif çizikler, minimal aşınma, genel durumu korunmuş
                  </div>
                  <div style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                    <strong>Çok İyi:</strong> Çok az çizik, neredeyse yeni görünüm
                  </div>
                  <div style={{ lineHeight: '1.4' }}>
                    <strong>Mükemmel:</strong> Hiç kullanılmamış gibi, kutusundan yeni çıkmış
                  </div>
                  <div style={{ 
                    position: 'absolute', 
                    top: '20px', 
                    left: '-8px', 
                    width: '0',
                    height: '0',
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent',
                    borderRight: '8px solid #1f2937'
                  }}></div>
                </div>
              )}
            </div>
          </div>
          <div style={{
            display: 'flex',
            gap: isMobile ? '8px' : '12px',
            flexWrap: 'wrap'
          }}>
            {conditions.map((condition) => (
              <button
                key={condition}
                onClick={() => setCosmeticCondition(condition)}
                style={{
                  background: cosmeticCondition === condition ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' : 'white',
                  color: cosmeticCondition === condition ? 'white' : '#374151',
                  border: cosmeticCondition === condition ? 'none' : '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: isMobile ? '10px 16px' : '12px 20px',
                  fontSize: isMobile ? '14px' : '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontWeight: cosmeticCondition === condition ? '600' : '500',
                  boxShadow: cosmeticCondition === condition ? '0 4px 12px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.05)'
                }}
              >
                {condition}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: isMobile ? '20px' : '32px' }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            marginBottom: isMobile ? '12px' : '16px',
            color: '#374151'
          }}>
            Kutu ve Fatura
          </h3>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '12px' : '16px'
          }}>
            <div style={{
              display: 'flex',
              gap: isMobile ? '24px' : '32px',
              flexWrap: 'wrap',
              alignItems: 'flex-start'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: isMobile ? '16px' : '18px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={hasBox}
                  onChange={(e) => setHasBox(e.target.checked)}
                  style={{ width: isMobile ? '18px' : '20px', height: isMobile ? '18px' : '20px' }}
                />
                Orijinal kutusu var
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: isMobile ? '16px' : '20px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: isMobile ? '16px' : '18px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={hasInvoice}
                    onChange={(e) => setHasInvoice(e.target.checked)}
                    style={{ width: isMobile ? '18px' : '20px', height: isMobile ? '18px' : '20px' }}
                  />
                  Faturası var
                </label>
                {hasInvoice && (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: isMobile ? '8px' : '12px',
                    marginLeft: isMobile ? '20px' : '40px'
                  }}>
                    <label style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '500',
                      color: '#374151',
                      whiteSpace: 'nowrap'
                    }}>
                      Fatura Tarihi
                    </label>
                    <input
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      style={{
                        padding: isMobile ? '10px 12px' : '12px 16px',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: isMobile ? '16px' : '18px',
                        minWidth: isMobile ? '120px' : '140px',
                        background: '#ffffff',
                        transition: 'all 0.2s ease',
                        outline: 'none'
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: isMobile ? '20px' : '32px' }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            marginBottom: isMobile ? '12px' : '16px',
            color: '#374151'
          }}>
            Ürün Fotoğrafları (Maksimum 10 adet)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(5, 1fr)' : 'repeat(10, 1fr)',
            gap: isMobile ? '8px' : '12px',
            marginTop: '16px'
          }}>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} style={{
                position: 'relative',
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '1',
                backgroundColor: '#f9fafb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => {
                if (!images[index]) {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const newImages = [...images];
                        newImages[index] = event.target?.result as string;
                        setImages(newImages);
                      };
                      reader.readAsDataURL(file);
                    }
                  };
                  input.click();
                }
              }}
              >
                {images[index] ? (
                  <>
                    <img
                      src={images[index]}
                      alt={`Resim ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openPreview(images[index]!);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: isMobile ? '20px' : '24px',
                        height: isMobile ? '20px' : '24px',
                        fontSize: isMobile ? '12px' : '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                      }}
                    >
                      ×
                    </button>
                  </>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280',
                    fontSize: isMobile ? '12px' : '14px'
                  }}>
                    <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '4px' }}>+</div>
                    <div>Resim {index + 1}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {previewImage && (
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
        }}
        onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
} 