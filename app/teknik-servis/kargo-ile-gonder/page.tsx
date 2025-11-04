"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function KargoIleGonderPageContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    district: '',
    serviceType: '',
    deviceInfo: '',
    problemDescription: '',
    shippingMethod: 'kargo',
    notes: ''
  });
  const searchParams = useSearchParams();

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

  useEffect(() => {
    const serviceId = searchParams.get('service');
    if (serviceId) {
      const services = [
        { id: '1', name: 'PC Onarım', icon: '🖥️' },
        { id: '2', name: 'Laptop Tamiri', icon: '💻' },
        { id: '3', name: 'Format Atma', icon: '💾' },
        { id: '4', name: 'Parça Montajı', icon: '🔧' },
        { id: '5', name: 'Telefon Onarım', icon: '📱' },
        { id: '6', name: 'Tablet Tamiri', icon: '📱' },
        { id: '7', name: 'PC Toplama', icon: '⚙️' },
        { id: '8', name: 'Veri Kurtarma', icon: '💿' }
      ];
      const service = services.find(s => s.id === serviceId);
      if (service) {
        setSelectedService(service);
        setFormData(prev => ({ ...prev, serviceType: service.name }));
      }
    }
  }, [searchParams]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/technical-service-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          deliveryMethod: 'kargo-ile-gonder'
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessModal(true);
        // Formu sıfırla
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          city: '',
          district: '',
          serviceType: selectedService?.name || '',
          deviceInfo: '',
          problemDescription: '',
          shippingMethod: 'kargo',
          notes: ''
        });
      } else {
        alert('Bir hata oluştu: ' + result.message);
      }
    } catch (error) {
      console.error('Form gönderilirken hata:', error);
      alert('Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const shippingOptions = [
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
            📦
          </div>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Kargo ile Gönder
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#6b7280',
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            Cihazınızı kargo ile gönderin, onarım sonrası adresinize teslim edelim
          </p>
          {selectedService && (
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              display: 'inline-block'
            }}>
              {selectedService.icon} {selectedService.name}
            </div>
          )}
        </div>

        {/* Kargo Süreci */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
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
            Kargo Süreci
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '24px',
                color: 'white'
              }}>
                1
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Form Doldur</h4>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Bilgilerinizi girin</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '24px',
                color: 'white'
              }}>
                2
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Kargo Bilgisi</h4>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Kargo detayları gönderilir</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '24px',
                color: 'white'
              }}>
                3
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Onarım</h4>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Cihazınız onarılır</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                fontSize: '24px',
                color: 'white'
              }}>
                4
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Teslimat</h4>
              <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Adresinize teslim</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}>
            Kargo ile Gönderim Talebi
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Kişisel Bilgiler */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 16px 0',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '8px'
              }}>
                Kişisel Bilgiler
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
                    Ad Soyad *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
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
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
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
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
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
                    E-posta *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
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
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
            </div>

            {/* Adres Bilgileri */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 16px 0',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '8px'
              }}>
                Teslimat Adresi
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
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  >
                    <option value="">Şehir Seçin</option>
                    <option value="istanbul">İstanbul</option>
                    <option value="ankara">Ankara</option>
                    <option value="izmir">İzmir</option>
                    <option value="bursa">Bursa</option>
                    <option value="antalya">Antalya</option>
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
                  <input
                    type="text"
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
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
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
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                </div>
              </div>
            </div>

            {/* Cihaz Bilgileri */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 16px 0',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '8px'
              }}>
                Cihaz Bilgileri
              </h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Cihaz Bilgileri *
                </label>
                <input
                  type="text"
                  name="deviceInfo"
                  value={formData.deviceInfo}
                  onChange={handleInputChange}
                  required
                  placeholder="Örn: MacBook Pro 13 inch, iPhone 12, Samsung Galaxy S21"
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
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Problem Açıklaması *
                </label>
                <textarea
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Cihazınızda yaşadığınız problemi detaylı olarak açıklayın..."
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
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>

            {/* Kargo Seçenekleri */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 16px 0',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '8px'
              }}>
                Kargo Seçenekleri
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                {shippingOptions.map((option) => (
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
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.background = 'white';
                  }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={option.value}
                      checked={formData.shippingMethod === option.value}
                      onChange={handleInputChange}
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
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 48px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
              >
                📦 Kargo ile Gönderim Talebi Gönder
              </button>
            </div>
          </form>
        </div>

        {/* Geri Dön */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/teknik-servis" style={{ textDecoration: 'none' }}>
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
              ← Teknik Servise Geri Dön
            </button>
          </Link>
        </div>

        {/* Success Modal */}
        {showSuccessModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '32px 24px' : '48px',
              maxWidth: '500px',
              width: '100%',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              position: 'relative',
              animation: 'modalSlideIn 0.3s ease-out'
            }}>
              {/* Success Icon */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '40px'
              }}>
                📦
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: isMobile ? '24px' : '28px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 16px 0'
              }}>
                Kargo Talebiniz Alındı!
              </h2>

              {/* Message */}
              <p style={{
                fontSize: isMobile ? '16px' : '18px',
                color: '#6b7280',
                margin: '0 0 32px 0',
                lineHeight: '1.6'
              }}>
                Kargo ile gönderim talebiniz başarıyla alındı. Kargo bilgileri e-posta ile gönderilecektir.
              </p>

              {/* Selected Kargo Info */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '12px',
                padding: '20px',
                margin: '0 0 32px 0',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  marginBottom: '8px',
                  fontWeight: '600'
                }}>
                  📦 Seçilen Kargo
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#1f2937',
                  fontWeight: '600'
                }}>
                  {shippingOptions.find(opt => opt.value === formData.shippingMethod)?.label || 'Kargo seçilmedi'}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '4px'
                }}>
                  {shippingOptions.find(opt => opt.value === formData.shippingMethod)?.price} • {shippingOptions.find(opt => opt.value === formData.shippingMethod)?.time}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  width: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                }}
              >
                Tamam
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default function KargoIleGonderPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <KargoIleGonderPageContent />
    </Suspense>
  );
}
