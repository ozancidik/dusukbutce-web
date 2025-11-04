"use client";
import React from 'react';

interface AudioSystemBasicInfoProps {
  isMobile: boolean;
  formData: {
    brand: string;
    model: string;
    type: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function AudioSystemBasicInfo({ isMobile, formData, handleInputChange }: AudioSystemBasicInfoProps) {
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
        🔊 Temel Bilgiler
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
            <option value="Logitech">Logitech</option>
            <option value="Creative">Creative</option>
            <option value="Bose">Bose</option>
            <option value="JBL">JBL</option>
            <option value="Harman Kardon">Harman Kardon</option>
            <option value="Klipsch">Klipsch</option>
            <option value="Audio-Technica">Audio-Technica</option>
            <option value="Sennheiser">Sennheiser</option>
            <option value="Edifier">Edifier</option>
            <option value="Razer">Razer</option>
            <option value="Corsair">Corsair</option>
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
            placeholder="Örn: Z623, Inspire T12, SoundLink"
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
            Sistem Türü *
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
            <option value="">Sistem Türü Seçiniz</option>
            <option value="2.0 Stereo">2.0 Stereo</option>
            <option value="2.1 Stereo + Subwoofer">2.1 Stereo + Subwoofer</option>
            <option value="5.1 Surround">5.1 Surround</option>
            <option value="7.1 Surround">7.1 Surround</option>
            <option value="Bluetooth Hoparlör">Bluetooth Hoparlör</option>
            <option value="USB Hoparlör">USB Hoparlör</option>
            <option value="Gaming Ses Sistemi">Gaming Ses Sistemi</option>
            <option value="Hi-Fi Sistem">Hi-Fi Sistem</option>
            <option value="Diğer">Diğer</option>
          </select>
        </div>
      </div>
    </div>
  );
}
