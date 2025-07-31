"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";

export default function BuyNotebookPage() {
  // State'ler
  const [hasBox, setHasBox] = useState(false);
  const [hasInvoice, setHasInvoice] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState('');
  const [cosmeticCondition, setCosmeticCondition] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showCosmeticTooltip, setShowCosmeticTooltip] = useState(false);
  const [images, setImages] = useState<(string | null)[]>(Array(10).fill(null));
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [screenStatus, setScreenStatus] = useState("");
  const [deadPixelCount, setDeadPixelCount] = useState("");

  // Input değerlerini takip etmek için state'ler
  const [brandValue, setBrandValue] = useState('');
  const [modelValue, setModelValue] = useState('');
  const [graphicsCardValue, setGraphicsCardValue] = useState('');
  const [processorValue, setProcessorValue] = useState('');
  const [storageValue, setStorageValue] = useState('');
  const [ramValue, setRamValue] = useState('');
  const [refreshRateValue, setRefreshRateValue] = useState('');
  const [wattValue, setWattValue] = useState('');
  const [screenSizeValue, setScreenSizeValue] = useState('');
  const [batteryHealthValue, setBatteryHealthValue] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [isMobile, setIsMobile] = useState(false);

  const conditions = ["Kötü", "İyi", "Çok iyi", "Mükemmel"];
  const pixelCounts = ["1", "2", "3", "3+"];

  // Form geçerli mi kontrolü - useMemo ile optimize edildi
  const isFormValid = useMemo(() => {
    // Marka validasyonu
    if (!brandValue || brandValue.trim().length < 2) {
      return false;
    }
    
    // Model validasyonu
    if (!modelValue || modelValue.trim().length < 2) {
      return false;
    }
    
    // Ekran Kartı validasyonu
    if (!graphicsCardValue || graphicsCardValue.trim().length < 2) {
      return false;
    }
    
    // İşlemci validasyonu
    if (!processorValue || processorValue.trim().length < 2) {
      return false;
    }
    
    // Dahili Hafıza validasyonu
    if (!storageValue || storageValue.trim().length < 2) {
      return false;
    }
    
    // RAM validasyonu
    if (!ramValue || ramValue.trim().length < 2) {
      return false;
    }
    
    // Ekran Tazeleme Hızı validasyonu
    if (!refreshRateValue || refreshRateValue.trim().length < 2) {
      return false;
    }
    
    // Ekran Boyutu validasyonu
    if (!screenSizeValue || screenSizeValue.trim().length < 2) {
      return false;
    }
    
    // Pil Durumu validasyonu
    if (!batteryHealthValue || batteryHealthValue.trim().length < 2) {
      return false;
    }
    
    return true;
  }, [
    brandValue,
    modelValue,
    graphicsCardValue,
    processorValue,
    storageValue,
    ramValue,
    refreshRateValue,
    screenSizeValue,
    batteryHealthValue
  ]);

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

  // Form submit fonksiyonu
  const handleSubmit = async () => {
    // Form geçerli değilse gönderme
    if (!isFormValid) {
      alert('Lütfen tüm gerekli alanları doldurun.');
      return;
    }

    try {
      // Form verilerini topla
      const formData = {
        // Temel bilgiler
        hasBox,
        hasInvoice,
        invoiceDate,
        cosmeticCondition,
        screenStatus,
        deadPixelCount,
        
        // Notebook özellikleri
        brand: brandValue,
        model: modelValue,
        processor: processorValue,
        graphicsCard: graphicsCardValue,
        wattValue: wattValue,
        ram: ramValue,
        storage: storageValue,
        refreshRate: refreshRateValue,
        screenSize: screenSizeValue,
        batteryHealth: batteryHealthValue,
        
        // Resimler (base64 formatında)
        images: images.filter(img => img !== null)
      };

      // API'ye gönder
      const response = await fetch('/api/notebook-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Form başarıyla gönderildi! Teklifiniz en kısa sürede size ulaşacak.');
        // Formu temizle
        // setHasBox(false);
        // setHasInvoice(false);
        // ... diğer state'leri sıfırla
      } else {
        alert(`Hata: ${result.error}`);
      }

    } catch (error) {
      console.error('Form gönderme hatası:', error);
      alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  // ESC tuşu ile preview'i kapat
  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setPreviewImage(null);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = [...images];
      let imageIndex = 0;
      
      for (let i = 0; i < newImages.length && imageIndex < files.length; i++) {
        if (newImages[i] === null) {
          const file = files[imageIndex];
          // Dosyayı base64'e çevir
          const reader = new FileReader();
          reader.onload = (event) => {
            const base64Data = event.target?.result as string;
            newImages[i] = base64Data;
            setImages([...newImages]);
          };
          reader.readAsDataURL(file);
          imageIndex++;
        }
      }
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
        {/* Başlık ve TEKLİF AL butonu */}
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
            Dizüstü (Notebook) Sat
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
            onMouseEnter={(e) => {
              if (!isFormValid) return;
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(135deg, #047857 0%, #059669 100%)';
              target.style.transform = 'translateY(-3px) scale(1.02)';
              target.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4), 0 6px 15px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              if (!isFormValid) return;
              const target = e.target as HTMLButtonElement;
              target.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
              target.style.transform = 'translateY(0) scale(1)';
              target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3), 0 4px 10px rgba(0, 0, 0, 0.1)';
            }}
          >
            TEKLİF AL
          </button>
          </div>
        </div>

        {/* Form alanları */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '20px' : '32px'
        }}>
          {/* Sol sütun */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
            {/* Marka */}
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
                placeholder="Örn: Asus, Dell, HP, Monster..."
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Ekran Kartı */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Ekran Kartı
              </label>
              <input
                type="text"
                placeholder="Örn: RTX 4060, GTX 1650, RX 6600..."
                value={graphicsCardValue}
                onChange={(e) => setGraphicsCardValue(e.target.value)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* İşlemci */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                İşlemci
              </label>
              <input
                type="text"
                placeholder="Örn: Intel i5-12400, AMD Ryzen 5 5600H..."
                value={processorValue}
                onChange={(e) => setProcessorValue(e.target.value)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* RAM */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                RAM
              </label>
              <input
                type="text"
                placeholder="Örn: 8GB, 16GB, 32GB, 64GB..."
                value={ramValue}
                onChange={(e) => setRamValue(e.target.value)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Sağ sütun */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '24px' }}>
            {/* Model */}
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
                placeholder="Örn: Vivobook, Inspiron, Pavilion..."
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Watt Değeri */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Watt Değeri
              </label>
              <input
                type="text"
                placeholder="Örn: 40W, 100W, 140W..."
                value={wattValue}
                onChange={(e) => setWattValue(e.target.value)}
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

            {/* Dahili Hafıza */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Dahili Hafıza
              </label>
              <input
                type="text"
                placeholder="Örn: 512GB SSD, 1TB HDD..."
                value={storageValue}
                onChange={(e) => setStorageValue(e.target.value)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Ekran Tazeleme Hızı */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontSize: isMobile ? '16px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Ekran Tazeleme Hızı
              </label>
              <input
                type="text"
                placeholder="Örn: 60 Hz, 144 Hz, 240 Hz..."
                value={refreshRateValue}
                onChange={(e) => setRefreshRateValue(e.target.value)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Ekran Boyutu + Ekran Durumu ve Kozmetik Durumu + Pil Durumu */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '20px' : '32px',
          marginTop: isMobile ? '20px' : '32px'
        }}>
          {/* Sol Sütun: Ekran Boyutu + Ekran Durumu */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '20px' : '32px'
          }}>
            {/* Ekran Boyutu */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: isMobile ? '8px' : '10px',
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '600',
                color: '#475569'
              }}>
                Ekran Boyutu
              </label>
              <input
                type="text"
                placeholder="Örn: 13.3 inç, 15.6 inç, 17.3 inç..."
                value={screenSizeValue}
                onChange={(e) => setScreenSizeValue(e.target.value)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Ekran Durumu */}
            <div>
              <h3 style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '600',
                marginBottom: isMobile ? '12px' : '16px',
                color: '#374151'
              }}>
                Ekran Durumu
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? '12px' : '16px'
              }}>
                <div style={{
                  display: 'flex',
                  gap: isMobile ? '8px' : '12px',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start'
                }}>
                  <button
                    onClick={() => setScreenStatus('sağlam')}
                    style={{
                      background: screenStatus === 'sağlam' ? '#6366f1' : 'white',
                      color: screenStatus === 'sağlam' ? 'white' : '#374151',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: isMobile ? '8px 12px' : '12px 16px',
                      fontSize: isMobile ? '14px' : '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Sağlam
                  </button>
                  <button
                    onClick={() => setScreenStatus('çizikler var')}
                    style={{
                      background: screenStatus === 'çizikler var' ? '#6366f1' : 'white',
                      color: screenStatus === 'çizikler var' ? 'white' : '#374151',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: isMobile ? '8px 12px' : '12px 16px',
                      fontSize: isMobile ? '14px' : '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Çizikler var
                  </button>
                  <button
                    onClick={() => setScreenStatus('ölü piksel')}
                    style={{
                      background: screenStatus === 'ölü piksel' ? '#6366f1' : 'white',
                      color: screenStatus === 'ölü piksel' ? 'white' : '#374151',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: isMobile ? '8px 12px' : '12px 16px',
                      fontSize: isMobile ? '14px' : '16px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Ölü piksel var
                  </button>
                </div>
                {screenStatus === 'ölü piksel' && (
                  <div style={{
                    display: 'flex',
                    gap: isMobile ? '6px' : '8px',
                    marginTop: '8px',
                    justifyContent: 'flex-start',
                    width: '100%',
                    flexWrap: 'wrap',
                    paddingLeft: '225px'
                  }}>
                    {pixelCounts.map((count) => (
                      <button
                        key={count}
                        onClick={() => setDeadPixelCount(count)}
                        style={{
                          background: deadPixelCount === count ? '#10b981' : 'white',
                          color: deadPixelCount === count ? 'white' : '#374151',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: isMobile ? '6px 10px' : '8px 12px',
                          fontSize: isMobile ? '12px' : '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sağ Sütun: Kozmetik Durumu + Pil Durumu */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '20px' : '32px'
          }}>
            {/* Kozmetik Durumu */}
            <div>
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

            {/* Pil Durumu */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: isMobile ? '8px' : '10px'
              }}>
                <label style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#475569'
                }}>
                  Pil Durumu
                </label>
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
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  ?
                  {showTooltip && (
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
                        Pil Durumu Nasıl Hesaplanır?
                      </div>
                      <div style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                        <strong>Windows:</strong> Aygıt Yöneticisi → Pil → Sağ tık → Özellikler → Durum
                      </div>
                      <div style={{ marginBottom: '8px', lineHeight: '1.4' }}>
                        <strong>macOS:</strong> Sistem Ayarları → Pil → Pil Sağlığı
                      </div>
                      <div style={{ lineHeight: '1.4' }}>
                        <strong>Linux:</strong> Terminal → upower -i /org/freedesktop/UPower/devices/battery_BAT0
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
              <input
                type="text"
                placeholder="Örn: %80, %60, %40..."
                value={batteryHealthValue}
                onChange={(e) => setBatteryHealthValue(e.target.value)}
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
                onFocus={(e) => {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>

        {/* Kutu ve Fatura */}
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

        {/* Resim Yükleme */}
        <div style={{ marginTop: isMobile ? '20px' : '32px' }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            marginBottom: isMobile ? '12px' : '16px',
            color: '#374151'
          }}>
            Ürün Fotoğrafları (Maksimum 10 adet)
          </h3>
          {/* 10 tane resim kutucuğu */}
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

      {/* Resim Preview Modal */}
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