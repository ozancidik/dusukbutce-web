"use client";
import React from 'react';

interface CaseBasicInfoProps {
  isMobile: boolean;
  formData: {
    brand: string;
    model: string;
    size: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function CaseBasicInfo({ isMobile, formData, handleInputChange }: CaseBasicInfoProps) {
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
        🖥️ Temel Bilgiler
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
            <option value="Corsair">Corsair</option>
            <option value="NZXT">NZXT</option>
            <option value="Fractal Design">Fractal Design</option>
            <option value="Cooler Master">Cooler Master</option>
            <option value="Lian Li">Lian Li</option>
            <option value="Phanteks">Phanteks</option>
            <option value="be quiet!">be quiet!</option>
            <option value="Thermaltake">Thermaltake</option>
            <option value="Antec">Antec</option>
            <option value="Silverstone">Silverstone</option>
            <option value="Rosewill">Rosewill</option>
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
            placeholder="Örn: 4000D, H510, Define 7"
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
            Boyut *
          </label>
          <select
            required
            value={formData.size}
            onChange={(e) => handleInputChange('size', e.target.value)}
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
            <option value="">Boyut Seçiniz</option>
            <option value="Mini ITX">Mini ITX</option>
            <option value="Micro ATX">Micro ATX</option>
            <option value="ATX">ATX</option>
            <option value="E-ATX">E-ATX</option>
            <option value="Full Tower">Full Tower</option>
            <option value="Mid Tower">Mid Tower</option>
            <option value="Mini Tower">Mini Tower</option>
            <option value="SFF (Small Form Factor)">SFF (Small Form Factor)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
