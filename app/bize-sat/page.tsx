"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BizeSatPage() {
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

  const leftCategories = [
    { name: 'Dizüstü (Notebook)', path: '/bize-sat/dizustu', icon: '💻' },
    { name: 'Masaüstü (Kasa)', path: '/bize-sat/masaustu', icon: '🖥️' },
    { name: 'Ekran Kartı', path: '/bize-sat/ekran-karti', icon: '🎮' },
    { name: 'İşlemci', path: '/bize-sat/islemci', icon: '⚡' },
    { name: 'RAM', path: '/bize-sat/ram', icon: '🧠' },
    { name: 'SSD', path: '/bize-sat/ssd', icon: '💾' },
    { name: 'Soğutucu', path: '/bize-sat/sogutucu', icon: '❄️' },
    { name: 'Boş Kasa', path: '/bize-sat/kasa', icon: '📦' }
  ];

  const rightCategories = [
    { name: 'Monitör', path: '/bize-sat/monitor', icon: '🖥️' },
    { name: 'Klavye', path: '/bize-sat/klavye', icon: '⌨️' },
    { name: 'Mouse', path: '/bize-sat/fare', icon: '🖱️' },
    { name: 'Tablet', path: '/bize-sat/tablet', icon: '📱' },
    { name: 'Kulaklık', path: '/bize-sat/kulaklik', icon: '🎧' },
    { name: 'Ses Sistemi', path: '/bize-sat/ses-sistemi', icon: '🔊' },
    { name: 'Oyuncu Direksiyonu', path: '/bize-sat/gaming-direksiyon', icon: '🎮' }
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? '32px' : '48px',
          alignItems: 'start'
        }}>
          {/* Sol Taraf - Bilgisayar Bileşenleri */}
          <div>
            <h2 style={{
              color: '#374151',
              fontSize: isMobile ? '20px' : '24px',
              marginBottom: isMobile ? '16px' : '24px',
              textAlign: 'center',
              fontWeight: '600'
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
                    color: '#374151'
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
                    <span style={{ 
                      fontSize: isMobile ? '20px' : '24px', 
                      marginRight: isMobile ? '12px' : '16px' 
                    }}>
                      {category.icon}
                    </span>
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
              fontSize: isMobile ? '20px' : '24px',
              marginBottom: isMobile ? '16px' : '24px',
              textAlign: 'center',
              fontWeight: '600'
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
                    color: '#374151'
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
                    <span style={{ 
                      fontSize: isMobile ? '20px' : '24px', 
                      marginRight: isMobile ? '12px' : '16px' 
                    }}>
                      {category.icon}
                    </span>
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