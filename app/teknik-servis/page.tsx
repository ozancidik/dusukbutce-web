"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TeknikServisPage() {
  const [isMobile, setIsMobile] = useState(false);

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

  const services = [
    {
      id: 1,
      title: "PC Onarım",
      description: "Masaüstü bilgisayar donanım ve yazılım sorunları",
      icon: "🖥️",
      features: ["Donanım değişimi", "Yazılım kurulumu", "Performans optimizasyonu", "Virüs temizleme"],
      price: "150 TL'den başlayan fiyatlarla"
    },
    {
      id: 2,
      title: "Laptop Tamiri",
      description: "Dizüstü bilgisayar onarım ve bakım hizmetleri",
      icon: "💻",
      features: ["Ekran değişimi", "Klavye tamiri", "Batarya değişimi", "Fan temizliği"],
      price: "200 TL'den başlayan fiyatlarla"
    },
    {
      id: 3,
      title: "Format Atma",
      description: "İşletim sistemi kurulumu ve veri kurtarma",
      icon: "💾",
      features: ["Windows kurulumu", "Driver kurulumu", "Veri yedekleme", "Program kurulumu"],
      price: "100 TL'den başlayan fiyatlarla"
    },
    {
      id: 4,
      title: "Parça Montajı",
      description: "Bilgisayar parçalarının montaj ve kurulumu",
      icon: "🔧",
      features: ["RAM takma", "SSD kurulumu", "Ekran kartı montajı", "Güç kaynağı değişimi"],
      price: "80 TL'den başlayan fiyatlarla"
    },
    {
      id: 5,
      title: "Telefon Onarım",
      description: "Akıllı telefon ekran ve donanım onarımları",
      icon: "📱",
      features: ["Ekran değişimi", "Batarya değişimi", "Kamera tamiri", "Su hasarı onarımı"],
      price: "250 TL'den başlayan fiyatlarla"
    },
    {
      id: 6,
      title: "Tablet Tamiri",
      description: "Tablet cihazların onarım ve bakım hizmetleri",
      icon: "📱",
      features: ["Ekran değişimi", "Batarya değişimi", "Şarj portu tamiri", "Yazılım güncelleme"],
      price: "300 TL'den başlayan fiyatlarla"
    },
    {
      id: 7,
      title: "PC Toplama",
      description: "İhtiyacınıza özel bilgisayar toplama hizmeti",
      icon: "⚙️",
      features: ["Parça seçimi", "Montaj hizmeti", "Test ve optimizasyon", "Garanti"],
      price: "500 TL'den başlayan fiyatlarla"
    },
    {
      id: 8,
      title: "Veri Kurtarma",
      description: "Silinen veya bozulan verilerin kurtarılması",
      icon: "💿",
      features: ["HDD kurtarma", "SSD kurtarma", "USB kurtarma", "Telefon veri kurtarma"],
      price: "400 TL'den başlayan fiyatlarla"
    },
    {
      id: 9,
      title: "Monitör Tamiri",
      description: "LCD, LED ve OLED monitör onarım hizmetleri",
      icon: "🖥️",
      features: ["Ekran değişimi", "Backlight tamiri", "Güç kaynağı değişimi", "HDMI port tamiri"],
      price: "300 TL'den başlayan fiyatlarla"
    }
  ];

  const advantages = [
    {
      icon: "🏆",
      title: "Uzman Teknisyenler",
      description: "10+ yıl deneyimli teknisyen kadromuz"
    },
    {
      icon: "⚡",
      title: "Hızlı Servis",
      description: "Aynı gün teslim, acil onarım hizmeti"
    },
    {
      icon: "🛡️",
      title: "Garanti",
      description: "Tüm onarımlarda 6 ay garanti"
    },
    {
      icon: "💰",
      title: "Uygun Fiyat",
      description: "Piyasanın en uygun fiyatları"
    },
    {
      icon: "🔧",
      title: "Orijinal Parça",
      description: "Sadece orijinal ve kaliteli parçalar"
    },
    {
      icon: "📞",
      title: "7/24 Destek",
      description: "Her zaman yanınızdayız"
    }
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: isMobile ? '20px 12px' : '40px'
    }}>
      <div style={{
        maxWidth: '1200px',
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
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Teknik Servis
          </h1>
          <h2 style={{
            fontSize: isMobile ? '18px' : '22px',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 16px 0',
            lineHeight: '1.5',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            Uzman teknisyenlerimizle güvenilir onarım hizmeti
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '500',
            color: '#10b981',
            margin: '0 0 24px 0',
            lineHeight: '1.4',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            padding: '12px 20px',
            borderRadius: '12px',
            border: '2px solid #bbf7d0',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)'
          }}>
            🚚 İstanbul içi aynı gün gelip teslim alalım
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              ✓ Uzman Teknisyen
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              ⚡ Hızlı Servis
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              🛡️ Garanti
            </div>
          </div>
        </div>

        {/* Hizmetler */}
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
            Hizmetlerimiz
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {services.map((service) => (
              <div
                key={service.id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  marginBottom: '16px'
                }}>
                  <div style={{
                    fontSize: '32px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
                  }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: '#1f2937',
                      margin: '0 0 4px 0'
                    }}>
                      {service.title}
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      margin: '0'
                    }}>
                      {service.description}
                    </p>
                  </div>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 8px 0'
                  }}>
                    Hizmetler:
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: '0',
                    margin: '0'
                  }}>
                    {service.features.map((feature, index) => (
                      <li key={index} style={{
                        fontSize: '13px',
                        color: '#6b7280',
                        marginBottom: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{ color: '#10b981' }}>•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '16px'
                }}>
                  <Link href={`/teknik-servis/evimden-al?service=${service.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
                    }}>
                      🏠 Evimden Al
                    </button>
                  </Link>
                  <Link href={`/teknik-servis/kargo-ile-gonder?service=${service.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                    <button style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '10px 8px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                    }}>
                      📦 Kargo ile Gönder
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avantajlar */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '32px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 24px 0'
          }}>
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px'
          }}>
            {advantages.map((advantage, index) => (
              <div key={index} style={{
                padding: '20px',
                borderRadius: '12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{advantage.icon}</div>
                <h4 style={{ fontWeight: '600', margin: '0 0 8px 0', color: '#1f2937' }}>{advantage.title}</h4>
                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* İletişim */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Hemen İletişime Geçin
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: '0 0 24px 0'
          }}>
            Teknik servis hizmetlerimiz için hemen bizimle iletişime geçin
          </p>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/iletisim" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
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
              }}>
                📞 İletişime Geç
              </button>
            </Link>
            <Link href="/bize-sat" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
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
              }}>
                🛒 Bize Sat
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
