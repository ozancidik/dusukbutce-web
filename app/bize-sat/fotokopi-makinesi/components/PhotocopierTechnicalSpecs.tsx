"use client";
import React from 'react';

interface PhotocopierTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    multifunction: string;
    paperSize: string;
    usageType: string;
    printColor: string;
    connectivity: string;
    speed: string;
    resolution: string;
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
      <div className="grid-cols-1 md:grid-cols-2" style={{
        display: 'grid',
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
            Renk Modu *
          </label>
          <select
            required
            value={formData.printColor}
            onChange={(e) => handleInputChange('printColor', e.target.value)}
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
            Çok İşlevli mi? (yazıcı + tarayıcı + fotokopi)
          </label>
          <select
            value={formData.multifunction}
            onChange={(e) => handleInputChange('multifunction', e.target.value)}
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
            <option value="">Seçin</option>
            <option value="Evet">Evet</option>
            <option value="Hayır">Hayır</option>
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
            Kağıt Boyutu
          </label>
          <select
            value={formData.paperSize}
            onChange={(e) => handleInputChange('paperSize', e.target.value)}
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
            <option value="">Seçin</option>
            <option value="A4">A4</option>
            <option value="A3">A3</option>
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
            Kullanım Tipi
          </label>
          <select
            value={formData.usageType}
            onChange={(e) => handleInputChange('usageType', e.target.value)}
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
            <option value="">Seçin</option>
            <option value="Büro">Büro</option>
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
            value={formData.speed}
            onChange={(e) => handleInputChange('speed', e.target.value)}
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
