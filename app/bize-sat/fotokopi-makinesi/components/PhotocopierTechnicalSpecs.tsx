"use client";
import React from 'react';

interface PhotocopierTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    type: string;
    connectionType: string;
    copySpeed: string;
    resolution: string;
    color: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function PhotocopierTechnicalSpecs({ isMobile, formData, handleInputChange }: PhotocopierTechnicalSpecsProps) {
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
            Makine Tipi *
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
            <option value="Mono (Siyah-Beyaz)">Mono (Siyah-Beyaz)</option>
            <option value="Renkli">Renkli</option>
            <option value="Multifonksiyon">Multifonksiyon</option>
            <option value="A3 Boyut">A3 Boyut</option>
            <option value="A4 Boyut">A4 Boyut</option>
            <option value="Büro Tipi">Büro Tipi</option>
            <option value="Endüstriyel">Endüstriyel</option>
            <option value="Taşınabilir">Taşınabilir</option>
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
            Bağlantı Türü
          </label>
          <select
            value={formData.connectionType}
            onChange={(e) => handleInputChange('connectionType', e.target.value)}
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
            <option value="USB">USB</option>
            <option value="WiFi">WiFi</option>
            <option value="Ethernet">Ethernet</option>
            <option value="USB + WiFi">USB + WiFi</option>
            <option value="USB + Ethernet">USB + Ethernet</option>
            <option value="WiFi + Ethernet">WiFi + Ethernet</option>
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
            Kopya Hızı
          </label>
          <input
            type="text"
            value={formData.copySpeed}
            onChange={(e) => handleInputChange('copySpeed', e.target.value)}
            placeholder="Örn: 25 sayfa/dk, 35 ppm"
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
            Çözünürlük
          </label>
          <input
            type="text"
            value={formData.resolution}
            onChange={(e) => handleInputChange('resolution', e.target.value)}
            placeholder="Örn: 600x600 dpi, 1200x1200 dpi"
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
            Renk
          </label>
          <input
            type="text"
            value={formData.color}
            onChange={(e) => handleInputChange('color', e.target.value)}
            placeholder="Örn: Siyah, Beyaz, Renkli"
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
            placeholder="Fotokopi makinesi hakkında ek bilgiler, özellikler, kopya sayısı, aksesuarlar, kullanım durumu vb."
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
