"use client";
import React from 'react';

interface CaseTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    material: string;
    powerSupplyWatt: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function CaseTechnicalSpecs({ isMobile, formData, handleInputChange }: CaseTechnicalSpecsProps) {
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
            Malzeme
          </label>
          <select
            value={formData.material}
            onChange={(e) => handleInputChange('material', e.target.value)}
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
            <option value="">Malzeme Seçiniz</option>
            <option value="Çelik">Çelik</option>
            <option value="Alüminyum">Alüminyum</option>
            <option value="Plastik">Plastik</option>
            <option value="Cam">Cam</option>
            <option value="Çelik + Cam">Çelik + Cam</option>
            <option value="Alüminyum + Cam">Alüminyum + Cam</option>
            <option value="Çelik + Plastik">Çelik + Plastik</option>
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
            PSU Gücü
          </label>
          <input
            type="text"
            value={formData.powerSupplyWatt}
            onChange={(e) => handleInputChange('powerSupplyWatt', e.target.value)}
            placeholder="Örn: 650W, 750W, 850W"
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
            placeholder="Kasa hakkında ek bilgiler, özellikler, kullanım durumu, aksesuarlar, fan sayısı, RGB vb."
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
