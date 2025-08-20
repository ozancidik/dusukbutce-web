"use client";
import React, { useState, useEffect } from "react";

export default function BankAccountsPage() {
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

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Yapım Aşaması Uyarısı */}
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '2px solid #f59e0b',
          borderRadius: '12px',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            color: '#92400e',
            marginBottom: '16px'
          }}>
            🚧
          </div>
          <h2 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#92400e',
            margin: '0 0 16px 0'
          }}>
            Bu Sayfa Yapım Aşamasındadır
          </h2>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#92400e',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Banka hesap bilgilerimiz yakında burada yayınlanacaktır.
          </p>
        </div>
      </div>
    </div>
  );
}
