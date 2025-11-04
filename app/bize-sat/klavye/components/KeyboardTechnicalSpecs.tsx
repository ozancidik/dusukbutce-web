"use client";
import React from 'react';

interface KeyboardTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    switchType: string;
    rgb: string;
    connectivity: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function KeyboardTechnicalSpecs({ isMobile, formData, handleInputChange }: KeyboardTechnicalSpecsProps) {
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
            Switch Türü *
          </label>
          <select
            required
            value={formData.switchType}
            onChange={(e) => handleInputChange('switchType', e.target.value)}
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
            <option value="">Switch Türü Seçiniz</option>
            <option value="Cherry MX Red">Cherry MX Red</option>
            <option value="Cherry MX Blue">Cherry MX Blue</option>
            <option value="Cherry MX Brown">Cherry MX Brown</option>
            <option value="Cherry MX Black">Cherry MX Black</option>
            <option value="Cherry MX Silver">Cherry MX Silver</option>
            <option value="Gateron Red">Gateron Red</option>
            <option value="Gateron Blue">Gateron Blue</option>
            <option value="Gateron Brown">Gateron Brown</option>
            <option value="Kailh Red">Kailh Red</option>
            <option value="Kailh Blue">Kailh Blue</option>
            <option value="Kailh Brown">Kailh Brown</option>
            <option value="Membrane">Membrane</option>
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
            RGB Aydınlatma
          </label>
          <select
            value={formData.rgb}
            onChange={(e) => handleInputChange('rgb', e.target.value)}
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
            <option value="">RGB Durumu</option>
            <option value="RGB">RGB Aydınlatma</option>
            <option value="Tek Renk">Tek Renk Aydınlatma</option>
            <option value="Yok">Aydınlatma Yok</option>
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
            <option value="USB">USB</option>
            <option value="USB-C">USB-C</option>
            <option value="Bluetooth">Bluetooth</option>
            <option value="USB + Bluetooth">USB + Bluetooth</option>
            <option value="USB-C + Bluetooth">USB-C + Bluetooth</option>
            <option value="Wireless">Wireless (2.4GHz)</option>
            <option value="PS/2">PS/2</option>
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
            placeholder="Klavye hakkında ek bilgiler, özellikler, kullanım durumu, aksesuarlar vb."
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
