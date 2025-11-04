"use client";
import React from 'react';

interface SsdBasicInfoProps {
  isMobile: boolean;
  formData: {
    brand: string;
    model: string;
    capacity: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function SsdBasicInfo({ isMobile, formData, handleInputChange }: SsdBasicInfoProps) {
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
        💾 Temel Bilgiler
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
            Marka *
          </label>
          <select
            required
            value={formData.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
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
            <option value="">Marka Seçiniz</option>
            <option value="Samsung">Samsung</option>
            <option value="Crucial">Crucial</option>
            <option value="Western Digital">Western Digital</option>
            <option value="Seagate">Seagate</option>
            <option value="Kingston">Kingston</option>
            <option value="SanDisk">SanDisk</option>
            <option value="Intel">Intel</option>
            <option value="Corsair">Corsair</option>
            <option value="ADATA">ADATA</option>
            <option value="Patriot">Patriot</option>
            <option value="PNY">PNY</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Model *
          </label>
          <input
            type="text"
            required
            value={formData.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            placeholder="Örn: 970 EVO Plus, MX500, Blue SN570"
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
          />
        </div>
        <div>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151',
            marginBottom: '6px'
          }}>
            Kapasite *
          </label>
          <select
            required
            value={formData.capacity}
            onChange={(e) => handleInputChange('capacity', e.target.value)}
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
            <option value="">Kapasite Seçiniz</option>
            <option value="120GB">120GB</option>
            <option value="240GB">240GB</option>
            <option value="250GB">250GB</option>
            <option value="480GB">480GB</option>
            <option value="500GB">500GB</option>
            <option value="960GB">960GB</option>
            <option value="1TB">1TB</option>
            <option value="2TB">2TB</option>
            <option value="4TB">4TB</option>
            <option value="8TB">8TB</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>
    </div>
  );
}