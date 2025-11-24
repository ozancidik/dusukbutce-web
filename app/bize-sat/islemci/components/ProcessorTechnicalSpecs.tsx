"use client";
import React from 'react';

interface ProcessorTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    stokFan: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function ProcessorTechnicalSpecs({ isMobile, formData, handleInputChange }: ProcessorTechnicalSpecsProps) {
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
            Stok Fan
          </label>
          <input
            type="text"
            value={formData.stokFan}
            onChange={(e) => handleInputChange('stokFan', e.target.value)}
            placeholder="Örn: Var, Yok, Özel Soğutucu"
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
        <div style={{ gridColumn: isMobile ? 'auto' : 'span 1' }}>
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
            placeholder="İşlemci hakkında ek bilgiler, özellikler, kullanım durumu, overclock vb."
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
