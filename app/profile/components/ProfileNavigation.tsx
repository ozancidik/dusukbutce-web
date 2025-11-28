"use client";
import React from 'react';
import Link from 'next/link';

interface ProfileNavigationProps {
  isMobile: boolean;
  isAdmin?: boolean;
}

export default function ProfileNavigation({ isMobile, isAdmin = false }: ProfileNavigationProps) {
  const menuItems = [
    { href: "/adreslerim", icon: "📍", text: "Adreslerim" },
    { href: "/sifre-degistir", icon: "🔐", text: "Şifre Değiştir" },
    { href: "/siparisler", icon: "📦", text: "Siparişlerim" },
    { href: "/tekliflerim", icon: "💰", text: "Tekliflerim" },
    { href: "/iptal-iade-islemlerim", icon: "🔄", text: "İptal ve İade İşlemlerim" },
    { href: "/bildirimler", icon: "🔔", text: "Bildirimler" },
    ...(isAdmin ? [{ href: "/admin", icon: "⚙️", text: "Admin Paneli" }] : [])
  ];

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {menuItems.map((item, index) => (
        <Link key={index} href={item.href} style={{ textDecoration: 'none' }}>
          <div style={{ 
            padding: isMobile ? '12px 20px' : '16px 24px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            borderBottom: index < menuItems.length - 1 ? '1px solid #f1f5f9' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
          >
            <div style={{ fontSize: '18px' }}>{item.icon}</div>
            <span style={{ 
              color: '#1e293b', 
              fontSize: isMobile ? '14px' : '15px',
              fontWeight: '500'
            }}>
              {item.text}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
