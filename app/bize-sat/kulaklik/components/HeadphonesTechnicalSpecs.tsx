"use client";
import React from 'react';

interface HeadphonesTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    connectivity: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function HeadphonesTechnicalSpecs({ isMobile, formData, handleInputChange }: HeadphonesTechnicalSpecsProps) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontSize: isMobile ? '18px' : '20px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        ⚙️ Teknik Özellikler
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Bağlantı Türü *
          </label>
          <select
            required
            value={formData.connectivity}
            onChange={(e) => handleInputChange('connectivity', e.target.value)}
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
            <option value="">Bağlantı Türü Seçiniz</option>
            <option value="Kablolu">Kablolu</option>
            <option value="Bluetooth">Bluetooth</option>
            <option value="Kablolu + Bluetooth">Kablolu + Bluetooth</option>
            <option value="USB">USB</option>
            <option value="USB-C">USB-C</option>
            <option value="Wireless (2.4GHz)">Wireless (2.4GHz)</option>
            <option value="RF">RF (Radyo Frekansı)</option>
          </select>
        </div>
        <div style={{ gridColumn: isMobile ? 'auto' : 'span 2' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Açıklama
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Kulaklık hakkında ek bilgiler, özellikler, kullanım durumu, aksesuarlar, ses kalitesi vb."
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              minHeight: '80px',
              resize: 'vertical'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>
      </div>
    </div>
  );
}
