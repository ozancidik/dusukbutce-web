"use client";
import React from 'react';
import { FieldRenderer } from './FieldRenderer';

interface DeliveryInfoProps {
  submission: any;
  isMobile: boolean;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ submission, isMobile }) => {
  const customerInfo = (submission as any).customerInfo;
  const deliveryMethod = (submission as any).deliveryMethod;

  if (!customerInfo) {
    return (
      <div style={{
        gridColumn: isMobile ? '1' : '1 / -1',
        background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
        padding: '40px 20px',
        borderRadius: '12px',
        border: '2px solid #f59e0b',
        textAlign: 'center'
      }}>
        <div style={{
          background: '#f59e0b',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px',
          margin: '0 auto 20px'
        }}>
          ⏳
        </div>
        <h4 style={{
          fontSize: isMobile ? '18px' : '20px',
          fontWeight: '700',
          color: '#92400e',
          margin: '0 0 8px 0'
        }}>
          Teslimat Bilgileri Bekleniyor
        </h4>
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: '#92400e',
          margin: 0,
          lineHeight: '1.5'
        }}>
          Müşteri henüz teslimat bilgilerini göndermedi. Müşteri teklifi kabul ettikten sonra teslimat bilgilerini dolduracak.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Teslimat Yöntemi */}
      <div style={{
        gridColumn: isMobile ? '1' : '1 / -1',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #0ea5e9',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px'
        }}>
          <div style={{
            background: '#0ea5e9',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            {deliveryMethod === 'kargo' ? '📦' : '🏠'}
          </div>
          <div>
            <h4 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              color: '#0c4a6e',
              margin: '0 0 4px 0'
            }}>
              Teslimat Yöntemi
            </h4>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#0c4a6e',
              margin: 0,
              opacity: 0.8
            }}>
              {deliveryMethod === 'kargo' ? 'Kargo ile Gönder' : 'Evimden Teslim Al'}
            </p>
          </div>
        </div>
      </div>

      {/* Müşteri Bilgileri */}
      <div style={{
        gridColumn: isMobile ? '1' : '1 / -1',
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #22c55e',
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <div style={{
            background: '#22c55e',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px'
          }}>
            👤
          </div>
          <div>
            <h4 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              color: '#166534',
              margin: '0 0 4px 0'
            }}>
              Müşteri Bilgileri
            </h4>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#166534',
              margin: 0,
              opacity: 0.8
            }}>
              Teslimat için verilen bilgiler
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '16px'
        }}>
          <FieldRenderer 
            label="Ad" 
            value={customerInfo.firstName} 
            isImportant={true} 
            isMobile={isMobile} 
          />
          <FieldRenderer 
            label="Soyad" 
            value={customerInfo.lastName} 
            isImportant={true} 
            isMobile={isMobile} 
          />
          <FieldRenderer 
            label="E-posta" 
            value={customerInfo.email} 
            isImportant={true} 
            isMobile={isMobile} 
          />
          <FieldRenderer 
            label="Telefon" 
            value={customerInfo.phone} 
            isImportant={true} 
            isMobile={isMobile} 
          />
          <FieldRenderer 
            label="Şehir" 
            value={customerInfo.city} 
            isImportant={true} 
            isMobile={isMobile} 
          />
          <FieldRenderer 
            label="İlçe" 
            value={customerInfo.district} 
            isImportant={true} 
            isMobile={isMobile} 
          />
          <FieldRenderer 
            label="Detaylı Adres" 
            value={customerInfo.address} 
            isImportant={true} 
            isMobile={isMobile} 
          />
          <FieldRenderer 
            label="Ek Notlar" 
            value={customerInfo.notes} 
            isMobile={isMobile} 
          />
        </div>
      </div>
    </>
  );
};
