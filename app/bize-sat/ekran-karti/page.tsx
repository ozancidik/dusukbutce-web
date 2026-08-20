"use client";
import React, { useState, useEffect } from 'react';
import { uploadImage } from '@/lib/uploadImage';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';
import LoginRequiredCard from '../components/LoginRequiredCard';
import { compressImage } from '../utils/imageUtils';
import { saveFormData, loadFormData, clearFormData } from '../utils/formHelpers';
import { submitProductOffer } from '../utils/submissionHelper';

export default function GraphicsCardPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [submissionNumber, setSubmissionNumber] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFurmarkHelp, setShowFurmarkHelp] = useState(false);
  const [showCoilWhineHelp, setShowCoilWhineHelp] = useState(false);
  const [showOxidationHelp, setShowOxidationHelp] = useState(false);
  const [showWarrantyStickerHelp, setShowWarrantyStickerHelp] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    chipSet: '',
    model: '',
    memory: '',
    memoryType: '',
    ports: '',
    dviOutput: '',
    furmarkResult: '',
    opened: '',
    thermalPadChanged: '',
    miningUsed: '',
    miningDuration: '',
    warrantySticker: '',
    coilWhine: 'Yok',
    oxidation: 'Yok',
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
    const savedFormData = loadFormData('graphicsCardFormData');
    if (savedFormData) {
      setFormData(savedFormData);
      console.log('📝 Kaydedilmiş ekran kartı form verileri yüklendi');
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
      
      // Mining yapılmadı seçilirse mining süresini temizle
      if (field === 'miningUsed' && value === 'Hayır') {
        newData.miningDuration = '';
      }
      
      // Form verilerini localStorage'a kaydet
      saveFormData('graphicsCardFormData', newData);
      
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

  const removeImage = (index: number) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      };
      
      // Form verilerini localStorage'a kaydet
      saveFormData('graphicsCardFormData', newData);
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push('/login?returnUrl=' + encodeURIComponent('/bize-sat/ekran-karti'));
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      
      const result = await submitProductOffer({
        apiEndpoint: '/api/graphics-card-submissions',
        category: 'graphics-card',
        formData,
        token,
        successMessage: 'Ekran kartı ürününüz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.',
        localStorageKey: 'graphicsCardFormData'
      });

      if (result.success) {
        setPopupType('success');
        setPopupTitle('Teklif Başarıyla Gönderildi!');
        setPopupMessage(result.message || 'Ekran kartı ürününüz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setSubmissionNumber(result.data?.submissionNumber || '');
        setShowPopup(true);
        
        // Form başarıyla gönderildikten sonra formu sıfırla
        setFormData({
          brand: '',
          chipSet: '',
          model: '',
          memory: '',
          memoryType: '',
          ports: '',
          dviOutput: '',
          furmarkResult: '',
          opened: '',
          thermalPadChanged: '',
          miningUsed: '',
          miningDuration: '',
          warrantySticker: '',
          coilWhine: 'Yok',
          oxidation: 'Yok',
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
        setPopupMessage(result.message || 'Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
        setShowPopup(true);
      }
    } catch (error: any) {
      console.error('❌ Submit Error:', error);
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
            Ekran Kartı Sat
          </h1>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Ekran kartınızı satın, en iyi fiyatı alın
          </p>
        </div>

        {/* Login Required Card */}
        {!isLoggedIn && <LoginRequiredCard isMobile={isMobile} returnUrl="/bize-sat/ekran-karti" />}

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
                  placeholder="Örn: ASUS, MSI, GIGABYTE, PNY, ZOTAC"
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
                  Chip Set *
                </label>
                <select
                  required
                  value={formData.chipSet}
                  onChange={(e) => handleInputChange('chipSet', e.target.value)}
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
                  <option value="">Chip Set seçin</option>
                  <option value="NVIDIA">NVIDIA</option>
                  <option value="AMD">AMD</option>
                  <option value="Intel">Intel</option>
                </select>
              </div>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '16px'
            }}>
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
                  placeholder="Örn: RTX 4070, RX 6700 XT, ARC B580"
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
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Bellek Miktarı
                </label>
                <input
                  type="text"
                  value={formData.memory}
                  onChange={(e) => handleInputChange('memory', e.target.value)}
                  placeholder="Örn: 8GB, 12GB"
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
                  Bit Değeri
                </label>
                <input
                  type="text"
                  value={formData.memoryType}
                  onChange={(e) => handleInputChange('memoryType', e.target.value)}
                  placeholder="Örn: 128-bit, 256-bit"
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
                  Portlar
                </label>
                <input
                  type="text"
                  value={formData.ports}
                  onChange={(e) => handleInputChange('ports', e.target.value)}
                  placeholder="Örn: 3x DP, 1x HDMI"
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
                  DVI Çıkışı
                </label>
                <select
                  value={formData.dviOutput}
                  onChange={(e) => handleInputChange('dviOutput', e.target.value)}
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
                  <option value="">DVI Çıkışı seçin</option>
                  <option value="Var">Var</option>
                  <option value="Yok">Yok</option>
                </select>
              </div>
            </div>
            
            {/* Test Sonuçları ve Açıklama */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '16px'
            }}>
              <div>
                <label style={{
                  display: 'flex',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  Furmark Test Sonucu
                  <div
                    onMouseEnter={() => setShowFurmarkHelp(true)}
                    onMouseLeave={() => setShowFurmarkHelp(false)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#6b7280',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      cursor: 'help',
                      fontWeight: 'bold',
                      position: 'relative'
                    }}
                  >
                    ?
                    {showFurmarkHelp && (
                      <div style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        width: '280px',
                        zIndex: 1000,
                        fontSize: '13px',
                        lineHeight: '1.5'
                      }}>
                        <div style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          width: '12px',
                          height: '12px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderTop: 'none',
                          borderLeft: 'none',
                          transform: 'translateX(-50%) rotate(45deg)'
                        }}></div>
                        <h4 style={{
                          margin: '0 0 8px 0',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          🔥 Furmark Test Rehberi
                        </h4>
                        <div style={{ color: '#374151' }}>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>1.</strong> Furmark programını indirin (ücretsiz)
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>2.</strong> GPU stres testini başlatın
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>3.</strong> 5-10 dakika çalıştırın
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>4.</strong> 1920x1080 çözünürlükte test yapın
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>5.</strong> Sıcaklık (°C) ve FPS değerlerini not edin
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                <input
                  type="text"
                  value={formData.furmarkResult}
                  onChange={(e) => handleInputChange('furmarkResult', e.target.value)}
                  placeholder="Örn: 85°C, 98%"
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
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px',
                  gap: '8px'
                }}>
                  Garanti Etiketi Duruyor mu
                  <div
                    onMouseEnter={() => setShowWarrantyStickerHelp(true)}
                    onMouseLeave={() => setShowWarrantyStickerHelp(false)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#6b7280',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      cursor: 'help',
                      fontWeight: 'bold',
                      position: 'relative'
                    }}
                  >
                    ?
                    {showWarrantyStickerHelp && (
                      <div style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        width: '280px',
                        zIndex: 1000,
                        fontSize: '13px',
                        lineHeight: '1.5'
                      }}>
                        <div style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          width: '12px',
                          height: '12px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderTop: 'none',
                          borderLeft: 'none',
                          transform: 'translateX(-50%) rotate(45deg)'
                        }}></div>
                        <h4 style={{
                          margin: '0 0 8px 0',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          🏷️ Garanti Etiketi
                        </h4>
                        <div style={{ color: '#374151' }}>
                          <p style={{ margin: '0 0 8px 0' }}>
                            Garanti etiketi, ekran kartının üzerinde bulunan ve ürünün orijinal olduğunu gösteren etikettir.
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Önemli:</strong> Etiketin durumu (sağlam, yırtılmış veya yok) ürünün garanti kapsamında olup olmadığını etkileyebilir.
                          </p>
                          <p style={{ margin: '0' }}>
                            Etiket yırtılmış veya yoksa, ürünün garanti kapsamı dışında kalabilir.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
                <select
                  value={formData.warrantySticker}
                  onChange={(e) => handleInputChange('warrantySticker', e.target.value)}
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
                  <option value="">Seçin</option>
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
                </select>
              </div>

            </div>
            
            {/* Ürün Geçmişi */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  İçi Açıldı mı
                </label>
                <select
                  value={formData.opened}
                  onChange={(e) => handleInputChange('opened', e.target.value)}
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
                  <option value="">Seçin</option>
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
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
                  Termal Ped Değişti mi
                </label>
                <select
                  value={formData.thermalPadChanged}
                  onChange={(e) => handleInputChange('thermalPadChanged', e.target.value)}
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
                  <option value="">Seçin</option>
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
                </select>
              </div>
            </div>
            
            {/* Ürün Geçmişi - 2. Satır */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  marginBottom: '6px'
                }}>
                  Mining Yapıldı mı
                </label>
                <select
                  value={formData.miningUsed}
                  onChange={(e) => handleInputChange('miningUsed', e.target.value)}
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
                  <option value="">Seçin</option>
                  <option value="Evet">Evet</option>
                  <option value="Hayır">Hayır</option>
                </select>
              </div>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: formData.miningUsed === 'Hayır' ? '#9ca3af' : '#374151',
                  marginBottom: '6px'
                }}>
                  Mining Süresi
                </label>
                <input
                  type="text"
                  value={formData.miningDuration}
                  onChange={(e) => handleInputChange('miningDuration', e.target.value)}
                  placeholder="Örn: 6 ay, 1 yıl"
                  disabled={formData.miningUsed === 'Hayır'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    backgroundColor: formData.miningUsed === 'Hayır' ? '#f3f4f6' : 'white',
                    color: formData.miningUsed === 'Hayır' ? '#9ca3af' : '#374151',
                    cursor: formData.miningUsed === 'Hayır' ? 'not-allowed' : 'text'
                  }}
                  onFocus={(e) => {
                    if (formData.miningUsed !== 'Hayır') {
                      e.target.style.borderColor = '#3b82f6';
                    }
                  }}
                  onBlur={(e) => {
                    if (formData.miningUsed !== 'Hayır') {
                      e.target.style.borderColor = '#d1d5db';
                    }
                  }}
                />
              </div>
            </div>
            
            {/* Ürün Geçmişi - 3. Satır */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: '16px',
              marginTop: '16px'
            }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    CW (Coil Whine)
                  </label>
                                    <div
                    onMouseEnter={() => setShowCoilWhineHelp(true)}
                    onMouseLeave={() => setShowCoilWhineHelp(false)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#6b7280',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      cursor: 'help',
                      fontWeight: 'bold',
                      position: 'relative'
                    }}
                  >
                    ?
                    {showCoilWhineHelp && (
                      <div style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        width: '280px',
                        zIndex: 1000,
                        fontSize: '13px',
                        lineHeight: '1.5'
                      }}>
                        <div style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          width: '12px',
                          height: '12px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderTop: 'none',
                          borderLeft: 'none',
                          transform: 'translateX(-50%) rotate(45deg)'
                        }}></div>
                        <h4 style={{
                          margin: '0 0 8px 0',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          🔊 Coil Whine (CW) Nedir?
                        </h4>
                        <div style={{ color: '#374151' }}>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Coil Whine:</strong> Ekran kartında yük altında oluşan yüksek frekanslı ses. Genellikle elektrik bileşenlerinin (indüktörler, kapasitörler) titreşiminden kaynaklanır.
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Yok:</strong> Hiç ses yok
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Az:</strong> Çok hafif, sadece yakından duyulur
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Orta:</strong> Normal mesafeden duyulur
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Çok:</strong> Yüksek ses, rahatsız edici
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <select
                  value={formData.coilWhine}
                  onChange={(e) => handleInputChange('coilWhine', e.target.value)}
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
                  <option value="Yok">Yok</option>
                  <option value="Az">Az</option>
                  <option value="Orta">Orta</option>
                  <option value="Çok">Çok</option>
                </select>
              </div>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '6px'
                }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    Oksit/Korozyon
                  </label>
                  <div
                    onMouseEnter={() => setShowOxidationHelp(true)}
                    onMouseLeave={() => setShowOxidationHelp(false)}
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: '#6b7280',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      cursor: 'help',
                      fontWeight: 'bold',
                      position: 'relative'
                    }}
                  >
                    ?
                    {showOxidationHelp && (
                      <div style={{
                        position: 'absolute',
                        bottom: '25px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                        width: '280px',
                        zIndex: 1000,
                        fontSize: '13px',
                        lineHeight: '1.5'
                      }}>
                        <div style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          width: '12px',
                          height: '12px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderTop: 'none',
                          borderLeft: 'none',
                          transform: 'translateX(-50%) rotate(45deg)'
                        }}></div>
                        <h4 style={{
                          margin: '0 0 8px 0',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1f2937'
                        }}>
                          🦠 Oksit/Korozyon Nedir?
                        </h4>
                        <div style={{ color: '#374151' }}>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Oksit/Korozyon:</strong> Ekran kartında metal bileşenlerin oksijen ve nem ile tepkimeye girerek oluşturduğu paslanma ve aşınma durumu.
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Yok:</strong> Hiç oksit/korozyon yok
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Az:</strong> Çok hafif, sadece yakından görülür
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Orta:</strong> Normal mesafeden görülür
                          </p>
                          <p style={{ margin: '0 0 8px 0' }}>
                            <strong>Çok:</strong> Belirgin oksit/korozyon, dikkat gerekir
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <select
                  value={formData.oxidation}
                  onChange={(e) => handleInputChange('oxidation', e.target.value)}
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
                  <option value="Yok">Yok</option>
                  <option value="Az">Az</option>
                  <option value="Orta">Orta</option>
                  <option value="Çok">Çok</option>
                </select>
              </div>
            </div>
            
            {/* Açıklama */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(1, 1fr)',
              gap: '16px',
              marginTop: '16px'
            }}>
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
              Ekran kartınız için teklif talebiniz alındı. En kısa sürede size ulaşacağız.
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
        referenceNumber={submissionNumber}
        duration={0}
        redirectPath={popupType === 'success' ? '/tekliflerim' : undefined}
      />
    </div>
  );
} 


