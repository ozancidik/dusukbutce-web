"use client";
import React from 'react';

interface MonitorTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    screenSize: string;
    resolution: string;
    refreshRate: string;
    panelType: string;
    responseTime: string;
    ports: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function MonitorTechnicalSpecs({ isMobile, formData, handleInputChange }: MonitorTechnicalSpecsProps) {
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
            Ekran Boyutu *
          </label>
          <select
            required
            value={formData.screenSize}
            onChange={(e) => handleInputChange('screenSize', e.target.value)}
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
            <option value="19 inç">19 inç</option>
            <option value="21 inç">21 inç</option>
            <option value="22 inç">22 inç</option>
            <option value="23 inç">23 inç</option>
            <option value="24 inç">24 inç</option>
            <option value="27 inç">27 inç</option>
            <option value="32 inç">32 inç</option>
            <option value="34 inç">34 inç</option>
            <option value="43 inç">43 inç</option>
            <option value="49 inç">49 inç</option>
            <option value="55 inç">55 inç</option>
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
            Çözünürlük *
          </label>
          <select
            required
            value={formData.resolution}
            onChange={(e) => handleInputChange('resolution', e.target.value)}
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
            <option value="1366x768 (HD)">1366x768 (HD)</option>
            <option value="1920x1080 (Full HD)">1920x1080 (Full HD)</option>
            <option value="2560x1440 (2K QHD)">2560x1440 (2K QHD)</option>
            <option value="3440x1440 (Ultrawide)">3440x1440 (Ultrawide)</option>
            <option value="3840x2160 (4K UHD)">3840x2160 (4K UHD)</option>
            <option value="5120x1440 (Super Ultrawide)">5120x1440 (Super Ultrawide)</option>
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
            Yenileme Hızı
          </label>
          <select
            value={formData.refreshRate}
            onChange={(e) => handleInputChange('refreshRate', e.target.value)}
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
            <option value="60Hz">60Hz</option>
            <option value="75Hz">75Hz</option>
            <option value="120Hz">120Hz</option>
            <option value="144Hz">144Hz</option>
            <option value="165Hz">165Hz</option>
            <option value="240Hz">240Hz</option>
            <option value="360Hz">360Hz</option>
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
            Panel Tipi
          </label>
          <select
            value={formData.panelType}
            onChange={(e) => handleInputChange('panelType', e.target.value)}
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
            <option value="TN">TN</option>
            <option value="IPS">IPS</option>
            <option value="VA">VA</option>
            <option value="OLED">OLED</option>
            <option value="Mini LED">Mini LED</option>
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
            Yanıt Süresi
          </label>
          <input
            type="text"
            value={formData.responseTime}
            onChange={(e) => handleInputChange('responseTime', e.target.value)}
            placeholder="Örn: 1ms, 5ms"
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
            Bağlantı Portları
          </label>
          <input
            type="text"
            value={formData.ports}
            onChange={(e) => handleInputChange('ports', e.target.value)}
            placeholder="Örn: HDMI, DisplayPort, USB-C"
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
            placeholder="Monitör hakkında ek bilgiler, özellikler, kullanım durumu, aksesuarlar vb."
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