"use client";
import React from 'react';

const ContactInfo: React.FC = () => {
  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#2563eb',
        margin: '0 0 24px 0'
      }}>
        📍 İletişim Bilgileri
      </h2>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 12px 0'
        }}>
          🏢 Adres
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0,
          lineHeight: '1.6'
        }}>
          Atakent Mah. Yasemin Sokağı No:4<br />
          34760 Ümraniye/İstanbul
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 12px 0'
        }}>
          📞 Telefon
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0
        }}>
          +90 (530) 128 91 37
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 12px 0'
        }}>
          ✉️ E-posta
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0
        }}>
          info@dusukbutce.com
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 12px 0'
        }}>
          🕒 Çalışma Saatleri
        </h3>
        <p style={{
          fontSize: '16px',
          color: '#6b7280',
          margin: 0,
          lineHeight: '1.6'
        }}>
          Pazartesi - Cuma: 09:00 - 18:00<br />
          Cumartesi: 09:00 - 14:00<br />
          Pazar: Kapalı
        </p>
      </div>

      {/* Sosyal Medya */}
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 16px 0'
        }}>
          🌐 Sosyal Medya
        </h3>
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <a href="https://www.facebook.com/dusukbutce/" target="_blank" rel="noopener noreferrer" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#1877f2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <img 
              src="/facebook-svgrepo-com.svg" 
              alt="Facebook" 
              style={{ 
                width: '28px', 
                height: '28px'
              }} 
            />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <img 
              src="/Instagram_logo_2022.svg (1).webp" 
              alt="Instagram" 
              style={{ 
                width: '28px', 
                height: '28px'
              }} 
            />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: '#ff0000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            textDecoration: 'none',
            transition: 'transform 0.2s'
          }}>
            <img 
              src="/youtube-svgrepo-com.svg" 
              alt="YouTube" 
              style={{ 
                width: '32px', 
                height: '32px'
              }} 
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;














