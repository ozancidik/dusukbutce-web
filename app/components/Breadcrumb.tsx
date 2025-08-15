"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Anasayfa ise breadcrumb gösterme
  if (pathname === '/') {
    return null;
  }

  // Path'i parçalara ayır
  const pathSegments = pathname.split('/').filter(segment => segment);
  
  // Breadcrumb items oluştur
  const breadcrumbItems = [];
  
  // Anasayfa linki
  breadcrumbItems.push({
    name: 'Anasayfa',
    path: '/',
    isActive: false
  });

  // Diğer segmentler
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    
    // Segment adını Türkçe'ye çevir
    let displayName = segment;
    
    // Bize-sat sayfaları için özel isimler
    if (segment === 'bize-sat') {
      displayName = 'Bize Sat';
    } else if (segment === 'notebook') {
      displayName = 'Dizüstü Bilgisayar';
    } else if (segment === 'desktop') {
      displayName = 'Masaüstü Bilgisayar';
    } else if (segment === 'graphics-card') {
      displayName = 'Ekran Kartı';
    } else if (segment === 'processor') {
      displayName = 'İşlemci';
    } else if (segment === 'ram') {
      displayName = 'RAM';
    } else if (segment === 'ssd') {
      displayName = 'SSD';
    } else if (segment === 'cooler') {
      displayName = 'Soğutucu';
    } else if (segment === 'case') {
      displayName = 'Boş Kasa';
    } else if (segment === 'monitor') {
      displayName = 'Monitör';
    } else if (segment === 'keyboard') {
      displayName = 'Klavye';
    } else if (segment === 'mouse') {
      displayName = 'Mouse';
    } else if (segment === 'tablet') {
      displayName = 'Tablet';
    } else if (segment === 'headphones') {
      displayName = 'Kulaklık';
    } else if (segment === 'audio-system') {
      displayName = 'Ses Sistemi';
    } else if (segment === 'gaming-wheel') {
      displayName = 'Oyuncu Direksiyonu';
    } else if (segment === 'steering-wheel') {
      displayName = 'Direksiyon';
    } else if (segment === 'sound-system') {
      displayName = 'Ses Sistemi';
    } else if (segment === 'buy') {
      displayName = 'Al';
    } else if (segment === 'sell') {
      displayName = 'Sat';
    } else if (segment === 'cart') {
      displayName = 'Sepet';
    } else if (segment === 'profile') {
      displayName = 'Profil';
    } else if (segment === 'login') {
      displayName = 'Giriş Yap';
    } else if (segment === 'register') {
      displayName = 'Kayıt Ol';
    } else if (segment === 'tekliflerim') {
      displayName = 'Tekliflerim';
    } else if (segment === 'satilik-ilanlar') {
      displayName = 'Satılık İlanlar';
    } else if (segment === 'listings') {
      displayName = 'İlanlar';
    } else if (segment === 'products') {
      displayName = 'Ürünler';
    } else if (segment === 'orders') {
      displayName = 'Siparişler';
    } else if (segment === 'notifications') {
      displayName = 'Bildirimler';
    } else if (segment === 'admin') {
      displayName = 'Admin';
    } else if (segment === 'admin-users') {
      displayName = 'Admin Kullanıcılar';
    } else if (segment === 'access-denied') {
      displayName = 'Erişim Reddedildi';
    } else if (segment === 'forgot-password') {
      displayName = 'Şifremi Unuttum';
    } else if (segment === 'privacy-policy') {
      displayName = 'Gizlilik Politikası';
    } else if (segment === 'terms') {
      displayName = 'Kullanım Şartları';
    } else if (segment === 'data-deletion') {
      displayName = 'Veri Silme';
    } else if (segment === 'what-is-my-ip') {
      displayName = 'IP Adresim';
    } else if (segment === 'payment-iyzico') {
      displayName = 'Ödeme';
    } else if (segment === 'robots.txt') {
      displayName = 'Robots';
    } else if (segment === 'sitemap.xml') {
      displayName = 'Site Haritası';
    } else {
      // Segment adını capitalize et
      displayName = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
    }
    
    breadcrumbItems.push({
      name: displayName,
      path: currentPath,
      isActive: index === pathSegments.length - 1
    });
  });

  return (
    <nav
      style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 24px',
        fontSize: '14px'
      }}
    >
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}
      >
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={item.path}>
            {index > 0 && (
              <span style={{ color: '#9ca3af', margin: '0 4px' }}>
                {'>'}
              </span>
            )}
            {item.isActive ? (
              <span
                style={{
                  color: '#374151',
                  fontWeight: '500'
                }}
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.path}
                style={{
                  color: '#6b7280',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
}
