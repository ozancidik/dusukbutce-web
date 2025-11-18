"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../bize-sat/utils/testAPIs'; // Test utility'sini yükle (browser konsolunda erişilebilir)

export default function BizeSatPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1200);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const leftCategories = [
    { name: 'Dizüstü (Notebook)', path: '/bize-sat/notebook', icon: '💻' },
    { name: 'Masaüstü (Kasa)', path: '/bize-sat/masaustu', icon: '🖥️' },
    { name: 'Ekran Kartı', path: '/bize-sat/ekran-karti', icon: '/graphic-card.png' },
    { name: 'İşlemci', path: '/bize-sat/islemci', icon: '/cpu-tower.png' },
    { name: 'RAM', path: '/bize-sat/ram', icon: '/ram.png' },
    { name: 'SSD', path: '/bize-sat/ssd', icon: '/ssd.png' },
    { name: 'Soğutucu', path: '/bize-sat/sogutucu', icon: '/sogutucu.png' },
    { name: 'Boş Kasa', path: '/bize-sat/kasa', icon: '/case.png' }
  ];

  const rightCategories = [
    { name: 'Cep Telefonu', path: '/bize-sat/cep-telefonu', icon: '📱' },
    { name: 'Monitör', path: '/bize-sat/monitor', icon: '🖥️' },
    { name: 'Klavye', path: '/bize-sat/klavye', icon: '⌨️' },
    { name: 'Mouse', path: '/bize-sat/mouse', icon: '🖱️' },
    { name: 'Tablet', path: '/bize-sat/tablet', icon: '/tablet.png' },
    { name: 'Kulaklık', path: '/bize-sat/kulaklik', icon: '🎧' },
    { name: 'Ses Sistemi', path: '/bize-sat/ses-sistemi', icon: '/sound-system.png' },
    { name: 'Oyuncu Direksiyonu', path: '/bize-sat/gaming-direksiyon', icon: '/steering-wheel.png' },
    { name: 'Yazıcı', path: '/bize-sat/yazici', icon: '🖨️' },
    { name: 'Tarayıcı', path: '/bize-sat/tarayici', icon: '🔍' },
    { name: 'Fotokopi Makinesi', path: '/bize-sat/fotokopi-makinesi', icon: '📄' }
  ];

  const gamingCategories = [
    { name: 'PlayStation', path: '/bize-sat/playstation', icon: '/playstation.png' },
    { name: 'Gamepad/Joystick', path: '/bize-sat/gamepad', icon: '/gamepad.png' },
    { name: 'Xbox', path: '/bize-sat/xbox', icon: '/xbox.png' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)',
      padding: isMobile ? '20px 10px' : '40px 20px'
    }}>
      <div style={{
        maxWidth: isMobile ? '100%' : '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: isMobile ? '12px' : '16px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.1)',
        padding: isMobile ? '24px 16px' : '48px',
        fontFamily: 'sans-serif'
      }}>
        <h1 style={{
          color: '#2563eb',
          fontSize: isMobile ? '32px' : '48px',
          textAlign: 'center',
          marginBottom: isMobile ? '32px' : '48px',
          fontWeight: 'bold'
        }}>
          Ne satmak istiyorsun?
        </h1>

        <div className="category-grid" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
          gap: isMobile ? '32px' : '32px',
          alignItems: 'start'
        }}>
          {/* Sol Taraf - Bilgisayar Bileşenleri */}
          <div>
            <h2 style={{
              color: '#374151',
              fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
              marginBottom: isMobile ? '16px' : '24px',
              textAlign: 'left',
              fontWeight: '600',
              paddingLeft: isMobile ? '8px' : '12px',
              lineHeight: '1.2'
            }}>
              Bilgisayar Bileşenleri
            </h2>
            <div style={{
              display: 'grid',
              gap: isMobile ? '12px' : '16px'
            }}>
              {leftCategories.map((category) => (
                <Link key={category.path} href={category.path} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: '500',
                    color: '#374151',
                    height: isMobile ? '56px' : '64px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#eff6ff';
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    {category.icon.startsWith('/') ? (
                      <img 
                        src={category.icon} 
                        alt={category.name}
                        style={{ 
                          width: isMobile ? '28px' : '32px',
                          height: isMobile ? '28px' : '32px',
                          marginRight: isMobile ? '12px' : '16px',
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <span style={{ 
                        fontSize: isMobile ? '20px' : '24px', 
                        marginRight: isMobile ? '12px' : '16px' 
                      }}>
                        {category.icon}
                      </span>
                    )}
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Çevre Birimleri */}
          <div>
            <h2 style={{
              color: '#374151',
              fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
              marginBottom: isMobile ? '16px' : '24px',
              textAlign: 'left',
              fontWeight: '600',
              paddingLeft: isMobile ? '8px' : '12px',
              lineHeight: '1.2'
            }}>
              Çevre Birimleri
            </h2>
            <div style={{
              display: 'grid',
              gap: isMobile ? '12px' : '16px'
            }}>
              {rightCategories.map((category) => (
                <Link key={category.path} href={category.path} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: '500',
                    color: '#374151',
                    height: isMobile ? '56px' : '64px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#eff6ff';
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    {category.icon.startsWith('/') ? (
                      <img 
                        src={category.icon} 
                        alt={category.name}
                        style={{ 
                          width: isMobile ? '28px' : '32px',
                          height: isMobile ? '28px' : '32px',
                          marginRight: isMobile ? '12px' : '16px',
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <span style={{ 
                        fontSize: isMobile ? '20px' : '24px', 
                        marginRight: isMobile ? '12px' : '16px' 
                      }}>
                        {category.icon}
                      </span>
                    )}
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Oyun Konsolları */}
          <div>
            <h2 style={{
              color: '#374151',
              fontSize: isMobile ? '16px' : isTablet ? '18px' : '20px',
              marginBottom: isMobile ? '16px' : '24px',
              textAlign: 'left',
              fontWeight: '600',
              paddingLeft: isMobile ? '8px' : '12px',
              lineHeight: '1.2'
            }}>
              Oyun Konsolları
            </h2>
            <div style={{
              display: 'grid',
              gap: isMobile ? '12px' : '16px'
            }}>
              {gamingCategories.map((category) => (
                <Link key={category.path} href={category.path} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e2e8f0',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: '500',
                    color: '#374151',
                    height: isMobile ? '56px' : '64px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#eff6ff';
                    e.currentTarget.style.borderColor = '#2563eb';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#f8fafc';
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    {category.icon.startsWith('/') ? (
                      <img 
                        src={category.icon} 
                        alt={category.name}
                        style={{ 
                          width: isMobile ? '28px' : '32px',
                          height: isMobile ? '28px' : '32px',
                          marginRight: isMobile ? '12px' : '16px',
                          objectFit: 'contain'
                        }}
                      />
                    ) : (
                      <span style={{ 
                        fontSize: isMobile ? '20px' : '24px', 
                        marginRight: isMobile ? '12px' : '16px' 
                      }}>
                        {category.icon}
                      </span>
                    )}
                    {category.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 