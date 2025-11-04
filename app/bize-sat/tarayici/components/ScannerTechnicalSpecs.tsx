"use client";
import React from 'react';

interface ScannerTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    type: string;
    connectionType: string;
    resolution: string;
    scanSpeed: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function ScannerTechnicalSpecs({ isMobile, formData, handleInputChange }: ScannerTechnicalSpecsProps) {
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
            Tarayıcı Tipi *
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
            <option value="Flatbed (Düz Yatak)">Flatbed (Düz Yatak)</option>
            <option value="Sheet-fed (Sayfa Beslemeli)">Sheet-fed (Sayfa Beslemeli)</option>
            <option value="Handheld (El Tipi)">Handheld (El Tipi)</option>
            <option value="Drum (Tambur)">Drum (Tambur)</option>
            <option value="Film">Film</option>
            <option value="Slide">Slide</option>
            <option value="Document">Document</option>
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
            <option value="USB 2.0">USB 2.0</option>
            <option value="USB 3.0">USB 3.0</option>
            <option value="USB-C">USB-C</option>
            <option value="WiFi">WiFi</option>
            <option value="Ethernet">Ethernet</option>
            <option value="Firewire">Firewire</option>
            <option value="SCSI">SCSI</option>
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
            Çözünürlük
          </label>
          <input
            type="text"
            value={formData.resolution}
            onChange={(e) => handleInputChange('resolution', e.target.value)}
            placeholder="Örn: 2400x4800 dpi, 4800x9600 dpi"
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
            Tarama Hızı
          </label>
          <input
            type="text"
            value={formData.scanSpeed}
            onChange={(e) => handleInputChange('scanSpeed', e.target.value)}
            placeholder="Örn: 25 sayfa/dk, 50 ppm"
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
            placeholder="Tarayıcı hakkında ek bilgiler, özellikler, kullanım durumu, aksesuarlar vb."
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
