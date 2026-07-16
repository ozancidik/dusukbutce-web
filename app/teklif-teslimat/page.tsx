"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function TeklifTeslimatPageContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'kargo' | 'evden' | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'istanbul',
    district: '',
    notes: ''
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

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

  // URL parametrelerini al
  const submissionId = searchParams.get('submissionId');
  const status = searchParams.get('status');
  
  // Eğer submissionId yoksa tekliflerim sayfasına yönlendir
  useEffect(() => {
    if (!submissionId) {
      router.replace('/tekliflerim');
      return;
    }
  }, [submissionId, router]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Sadece rakam, parantez ve boşluk karakterlerine izin ver
      const phoneRegex = /^[0-9\s\(\)]*$/;
      if (phoneRegex.test(value)) {
        // Sadece rakamları al
        let digits = value.replace(/\s/g, '').replace(/[\(\)]/g, '');
        
        // Maksimum 10 rakam (alan kodu + 7 rakam)
        digits = digits.substring(0, 10);
        
        let formattedValue = '';
        
        if (digits.length > 0) {
          // İlk rakam 5 olmalı
          if (digits.length > 0 && digits[0] !== '5') {
            return; // 5 ile başlamıyorsa güncelleme yapma
          }
          
          // (5xx) xxx xx xx formatına çevir
          formattedValue = '(' + digits.substring(0, 3);
          
          if (digits.length > 3) {
            formattedValue += ') ' + digits.substring(3, 6);
          }
          
          if (digits.length > 6) {
            formattedValue += ' ' + digits.substring(6, 8);
          }
          
          if (digits.length > 8) {
            formattedValue += ' ' + digits.substring(8, 10);
          }
        }
        
        setFormData(prev => ({ ...prev, [name]: formattedValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const submissionId = searchParams.get('submissionId');
    
    // Validation: Teslimat yöntemi seçilmiş mi?
    if (!selectedMethod) {
      alert('Lütfen bir teslimat yöntemi seçin.');
      return;
    }
    
    console.log('🔍 Form validation geçti:', { selectedMethod, formData });
    
    // Validation: Gerekli alanlar doldurulmuş mu?
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      alert('Lütfen tüm gerekli alanları doldurun.');
      return;
    }
    
    try {
      // Teklif durumunu güncelle
      if (submissionId) {
        console.log('🚀 Form submit başladı:', {
          submissionId,
          selectedMethod,
          formData
        });
        
        const token = localStorage.getItem('token');
        const response = await fetch('/api/submissions', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            id: submissionId,
            status: 'delivery_confirmed',
            deliveryMethod: selectedMethod,
            customerInfo: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              district: formData.district,
              notes: formData.notes
            }
          }),
        });
        
        console.log('📡 API response:', response.status, response.ok);
        
        const responseData = await response.json();
        console.log('📡 API response data:', responseData);

        if (!response.ok) {
          throw new Error('Teklif durumu güncellenemedi');
        }
      }

      // Başarı mesajını göster
      if (selectedMethod === 'kargo') {
        setSuccessMessage(`Sayın ${formData.firstName} ${formData.lastName}, kargo bilgileri e-posta ile gönderilecektir!`);
      } else if (selectedMethod === 'evden') {
        setSuccessMessage(`Sayın ${formData.firstName} ${formData.lastName}, evimden teslim talebiniz alındı! En kısa sürede sizinle iletişime geçeceğiz.`);
      }
      
      setShowSuccessPopup(true);
      
      // 3 saniye sonra tekliflerim sayfasına yönlendir
      setTimeout(() => {
        window.location.href = '/tekliflerim';
      }, 3000);
      
    } catch (error) {
      console.error('Teslimat bilgileri kaydedilirken hata:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const kargoOptions = [
    { value: 'aras', label: 'Aras Kargo', price: '25 TL', time: '1-2 gün' },
    { value: 'mng', label: 'MNG Kargo', price: '30 TL', time: '1-2 gün' },
    { value: 'yurtici', label: 'Yurtiçi Kargo', price: '35 TL', time: '2-3 gün' },
    { value: 'ptt', label: 'PTT Kargo', price: '20 TL', time: '3-5 gün' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: isMobile ? '20px 12px' : '40px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: isMobile ? '32px 24px' : '48px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            🎉
          </div>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Teklifiniz Kabul Edildi!
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#6b7280',
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            Ürününüzü teslim etmek için aşağıdaki seçeneklerden birini seçin
          </p>
        </div>

        {/* Teslimat Seçenekleri */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}>
            Teslimat Seçenekleri
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {/* Kargo Seçeneği */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              background: selectedMethod === 'kargo' ? '#f0fdf4' : '#f9fafb',
              borderRadius: '12px',
              border: selectedMethod === 'kargo' ? '2px solid #10b981' : '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selectedMethod === 'kargo' ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
            }}>
              <input
                type="radio"
                name="delivery"
                value="kargo"
                checked={selectedMethod === 'kargo'}
                onChange={(e) => setSelectedMethod(e.target.value as 'kargo')}
                style={{
                  marginRight: '16px',
                  width: '20px',
                  height: '20px',
                  accentColor: '#10b981'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#065f46',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  📦 Kargo ile Gönder
                </div>
                <div style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#047857'
                }}>
                  Ürününüzü kargo ile gönderin, kargo ücreti tarafımızca karşılanır
                </div>
              </div>
            </label>

            {/* Evimden Teslim Seçeneği */}
            <label style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              background: selectedMethod === 'evden' ? '#f0fdf4' : '#f9fafb',
              borderRadius: '12px',
              border: selectedMethod === 'evden' ? '2px solid #10b981' : '2px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: selectedMethod === 'evden' ? '0 4px 12px rgba(16, 185, 129, 0.2)' : 'none'
            }}>
              <input
                type="radio"
                name="delivery"
                value="evden"
                checked={selectedMethod === 'evden'}
                onChange={(e) => setSelectedMethod(e.target.value as 'evden')}
                style={{
                  marginRight: '16px',
                  width: '20px',
                  height: '20px',
                  accentColor: '#10b981'
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#065f46',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🏠 Evimden Teslim Al
                </div>
                <div style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#047857'
                }}>
                  İstanbul için geçerli - Adresinizden ürünü teslim alırız
                </div>
              </div>
            </label>
          </div>

          {/* Form */}
          {selectedMethod && (
            <form onSubmit={handleSubmit}>
              {/* Kişisel Bilgiler */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 16px 0',
                  borderBottom: '2px solid #e5e7eb',
                  paddingBottom: '8px'
                }}>
                  İletişim Bilgileri
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Ad *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Adınızı girin"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Soyad *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Soyadınızı girin"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                  gap: '16px',
                  marginTop: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      E-posta *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="E-posta adresinizi girin"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#10b981'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      Telefon *
                    </label>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      background: 'white',
                      transition: 'border-color 0.2s'
                    }}>
                      <span style={{
                        padding: '12px 16px',
                        background: '#f8f9fa',
                        borderRight: '1px solid #d1d5db',
                        color: '#6b7280',
                        fontSize: '14px',
                        fontWeight: '500',
                        textAlign: 'center'
                      }}>
                        0
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123 45 67"
                        maxLength={15}
                        required
                        style={{
                          flex: 1,
                          padding: '12px 16px',
                          border: 'none',
                          outline: 'none',
                          fontSize: '14px',
                          background: 'transparent'
                        }}
                        onFocus={(e) => {
                          e.target.parentElement!.style.borderColor = '#10b981';
                        }}
                        onBlur={(e) => {
                          e.target.parentElement!.style.borderColor = '#d1d5db';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Kargo Seçenekleri */}
              {selectedMethod === 'kargo' && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 16px 0',
                    borderBottom: '2px solid #e5e7eb',
                    paddingBottom: '8px'
                  }}>
                    Kargo Firması Seçin
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                    gap: '12px'
                  }}>
                    {kargoOptions.map((option) => (
                      <label key={option.value} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '16px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#10b981';
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.background = 'white';
                      }}>
                        <input
                          type="radio"
                          name="kargoFirmasi"
                          value={option.value}
                          style={{ marginRight: '12px' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', marginBottom: '4px' }}>{option.label}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {option.price} • {option.time}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Adres Bilgileri */}
              {selectedMethod === 'evden' && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 16px 0',
                    borderBottom: '2px solid #e5e7eb',
                    paddingBottom: '8px'
                  }}>
                    Adres Bilgileri
                  </h3>
                  
                  {/* Bilgilendirme metni */}
                  <div style={{
                    background: '#f0f9ff',
                    border: '1px solid #0ea5e9',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: '#0369a1',
                      fontWeight: '500'
                    }}>
                      <span>ℹ️</span>
                      <span>Yalnızca İstanbul içi ürünleriniz teslim alınır.</span>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: '16px'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Şehir *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      >
                        <option value="istanbul">İstanbul</option>
                      </select>
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        İlçe *
                      </label>
                      <select
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      >
                        <option value="">İlçe Seçin</option>
                        <option value="atasehir">Ataşehir</option>
                        <option value="avcilar">Avcılar</option>
                        <option value="bagcilar">Bağcılar</option>
                        <option value="bahcelievler">Bahçelievler</option>
                        <option value="bakirkoy">Bakırköy</option>
                        <option value="basaksehir">Başakşehir</option>
                        <option value="bayrampasa">Bayrampaşa</option>
                        <option value="besiktas">Beşiktaş</option>
                        <option value="beykoz">Beykoz</option>
                        <option value="beylikduzu">Beylikdüzü</option>
                        <option value="beyoglu">Beyoğlu</option>
                        <option value="cekmekoy">Çekmeköy</option>
                        <option value="esenler">Esenler</option>
                        <option value="fatih">Fatih</option>
                        <option value="gaziosmanpasa">Gaziosmanpaşa</option>
                        <option value="gungoren">Güngören</option>
                        <option value="kadikoy">Kadıköy</option>
                        <option value="kagithane">Kağıthane</option>
                        <option value="kartal">Kartal</option>
                        <option value="kucukcekmece">Küçükçekmece</option>
                        <option value="maltepe">Maltepe</option>
                        <option value="pendik">Pendik</option>
                        <option value="sancaktepe">Sancaktepe</option>
                        <option value="sariyer">Sarıyer</option>
                        <option value="sultanbeyli">Sultanbeyli</option>
                        <option value="sultangazi">Sultangazi</option>
                        <option value="tuzla">Tuzla</option>
                        <option value="umraniye">Ümraniye</option>
                        <option value="uskudar">Üsküdar</option>
                        <option value="zeytinburnu">Zeytinburnu</option>
                      </select>
                    </div>
                    <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        Detaylı Adres *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #d1d5db',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                          resize: 'vertical'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#10b981'}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Ek Notlar */}
              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Ek Notlar
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Eklemek istediğiniz notlar..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '16px 48px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                  }}
                >
                  {selectedMethod === 'kargo' ? '📦 Kargo Talebi Gönder' : '🏠 Teslim Talebi Gönder'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Geri Dön */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/tekliflerim" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'transparent',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#9ca3af';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = '#d1d5db';
            }}>
              ← Tekliflerime Geri Dön
            </button>
          </Link>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
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
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '24px' : '32px',
            maxWidth: isMobile ? '90vw' : '500px',
            width: '100%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            animation: 'popupSlideIn 0.3s ease-out'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px auto',
              boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{
                fontSize: '36px',
                color: 'white'
              }}>
                ✓
              </div>
            </div>
            
            <h3 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 16px 0',
              lineHeight: '1.3'
            }}>
              Başarılı!
            </h3>
            
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#6b7280',
              margin: '0 0 16px 0',
              lineHeight: '1.6'
            }}>
              {successMessage}
            </p>
            
            <p style={{
              fontSize: isMobile ? '14px' : '16px',
              color: '#9ca3af',
              margin: '0 0 32px 0',
              lineHeight: '1.5',
              fontStyle: 'italic'
            }}>
              Otomatik olarak tekliflerim sayfasına yönlendirileceksiniz...
            </p>
            
            <button
              onClick={() => setShowSuccessPopup(false)}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: isMobile ? '14px 28px' : '16px 32px',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
              }}
            >
              Tamam
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes popupSlideIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function TeklifTeslimatPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <TeklifTeslimatPageContent />
    </Suspense>
  );
}
