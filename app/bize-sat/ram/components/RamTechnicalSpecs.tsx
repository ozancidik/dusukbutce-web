"use client";
import React from 'react';

interface RamTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    capacity: string;
    speed: string;
    type: string;
    latency: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function RamTechnicalSpecs({ isMobile, formData, handleInputChange }: RamTechnicalSpecsProps) {
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
            <option value="">Seçiniz</option>
            <option value="4GB">4GB</option>
            <option value="8GB">8GB</option>
            <option value="16GB">16GB</option>
            <option value="32GB">32GB</option>
            <option value="64GB">64GB</option>
            <option value="128GB">128GB</option>
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
            Hız *
          </label>
          <select
            required
            value={formData.speed}
            onChange={(e) => handleInputChange('speed', e.target.value)}
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
            <option value="">Seçiniz</option>
            <option value="DDR3-1333">DDR3-1333</option>
            <option value="DDR3-1600">DDR3-1600</option>
            <option value="DDR3-1866">DDR3-1866</option>
            <option value="DDR3-2133">DDR3-2133</option>
            <option value="DDR4-2133">DDR4-2133</option>
            <option value="DDR4-2400">DDR4-2400</option>
            <option value="DDR4-2666">DDR4-2666</option>
            <option value="DDR4-3000">DDR4-3000</option>
            <option value="DDR4-3200">DDR4-3200</option>
            <option value="DDR4-3600">DDR4-3600</option>
            <option value="DDR4-4000">DDR4-4000</option>
            <option value="DDR5-4800">DDR5-4800</option>
            <option value="DDR5-5200">DDR5-5200</option>
            <option value="DDR5-5600">DDR5-5600</option>
            <option value="DDR5-6000">DDR5-6000</option>
            <option value="DDR5-6400">DDR5-6400</option>
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
            Tip *
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
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
            <option value="">Seçiniz</option>
            <option value="DDR3">DDR3</option>
            <option value="DDR4">DDR4</option>
            <option value="DDR5">DDR5</option>
            <option value="DDR3L">DDR3L (Low Voltage)</option>
            <option value="DDR4L">DDR4L (Low Voltage)</option>
            <option value="DDR5L">DDR5L (Low Voltage)</option>
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
            Gecikme (Latency)
          </label>
          <input
            type="text"
            value={formData.latency}
            onChange={(e) => handleInputChange('latency', e.target.value)}
            placeholder="Örn: CL16, CL18, CL19"
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
            placeholder="RAM hakkında ek bilgiler, özellikler, kullanım durumu, aksesuarlar vb."
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
