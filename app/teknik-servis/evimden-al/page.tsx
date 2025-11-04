"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function EvimdenAlPageContent() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
    preferredDate: '',
    preferredTime: '',
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
          deliveryMethod: 'evimden-al'
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
          preferredDate: '',
          preferredTime: '',
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

  const handleAddressRedirect = () => {
    // Kullanıcıyı adres sayfasına yönlendir
    window.location.href = '/profile';
  };

  const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00',
    '17:00 - 18:00'
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
            🏠
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
            Evimden Al
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#6b7280',
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            Teknisyenimiz evinize gelerek cihazınızı alır ve onarım sonrası teslim eder
          </p>
          {selectedService && (
            <div style={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
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
            Teknik Servis Talebi
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
                    E-posta
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                Adres Bilgileri
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                gap: '16px'
              }}>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Şehir *
                    <div style={{
                      position: 'relative',
                      display: 'inline-block'
                    }}>
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#6b7280',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'help',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          const tooltip = document.createElement('div');
                          tooltip.id = 'tooltip-city';
                          tooltip.style.cssText = `
                            position: fixed;
                            background: #1f2937;
                            color: white;
                            padding: 8px 12px;
                            border-radius: 6px;
                            font-size: 12px;
                            z-index: 9999;
                            pointer-events: none;
                            white-space: nowrap;
                            top: ${e.clientY - 40}px;
                            left: ${e.clientX - 100}px;
                          `;
                          tooltip.textContent = 'Sadece İstanbul içinde hizmet vermekteyiz';
                          document.body.appendChild(tooltip);
                        }}
                        onMouseLeave={() => {
                          const tooltip = document.getElementById('tooltip-city');
                          if (tooltip) tooltip.remove();
                        }}
                      >
                        ?
                      </div>
                    </div>
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
                    <option value="">Şehir Seçin</option>
                    <option value="istanbul">İstanbul</option>
                  </select>
                </div>
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    İlçe *
                    <div style={{
                      position: 'relative',
                      display: 'inline-block'
                    }}>
                      <div 
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: '#6b7280',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'help',
                          position: 'relative'
                        }}
                        onMouseEnter={(e) => {
                          const tooltip = document.createElement('div');
                          tooltip.id = 'tooltip-district';
                          tooltip.style.cssText = `
                            position: fixed;
                            background: #1f2937;
                            color: white;
                            padding: 8px 12px;
                            border-radius: 6px;
                            font-size: 12px;
                            z-index: 9999;
                            pointer-events: none;
                            white-space: nowrap;
                            top: ${e.clientY - 40}px;
                            left: ${e.clientX - 120}px;
                          `;
                          tooltip.textContent = 'Bazı ilçeler hizmet kapsamı dışındadır (çok uzak mesafe)';
                          document.body.appendChild(tooltip);
                        }}
                        onMouseLeave={() => {
                          const tooltip = document.getElementById('tooltip-district');
                          if (tooltip) tooltip.remove();
                        }}
                      >
                        ?
                      </div>
                    </div>
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
                    <option value="esenler">Esenyurt</option>
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
                  onFocus={(e) => e.target.style.borderColor = '#10b981'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
              </div>
            </div>

            {/* Randevu Bilgileri */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 16px 0',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '8px'
              }}>
                Randevu Bilgileri
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
                    Tercih Edilen Tarih *
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
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
                    Tercih Edilen Saat *
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
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
                    <option value="">Saat Seçin</option>
                    {timeSlots.map((time, index) => (
                      <option key={index} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
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
                🏠 Teknik Servis Talebi Gönder
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
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              fontSize: '40px'
            }}>
              ✅
            </div>

            {/* Title */}
            <h2 style={{
              fontSize: isMobile ? '24px' : '28px',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0 0 16px 0'
            }}>
              Talebiniz Alındı!
            </h2>

            {/* Message */}
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              color: '#6b7280',
              margin: '0 0 32px 0',
              lineHeight: '1.6'
            }}>
              Teknik servis talebiniz başarıyla alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </p>

            {/* Additional Info */}
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
                📞 İletişim Bilgileri
              </div>
              <div style={{
                fontSize: '14px',
                color: '#6b7280'
              }}>
                Telefon: 0212 XXX XX XX<br />
                E-posta: info@dusukbutce.com
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <button
                onClick={handleAddressRedirect}
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                  flex: 1
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
                📍 Adres Bilgilerini Güncelle
              </button>
              <button
                onClick={() => setShowSuccessModal(false)}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  flex: 1
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
                Tamam
              </button>
            </div>
          </div>
        </div>
      )}

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

export default function EvimdenAlPage() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <EvimdenAlPageContent />
    </Suspense>
  );
}
