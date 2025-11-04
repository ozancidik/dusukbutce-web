"use client";
import React from 'react';

interface SsdTechnicalSpecsProps {
  isMobile: boolean;
  formData: {
    type: string;
    readSpeed: string;
    writeSpeed: string;
    interface: string;
    description: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function SsdTechnicalSpecs({ isMobile, formData, handleInputChange }: SsdTechnicalSpecsProps) {
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
            SSD Türü *
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
            <option value="">SSD Türü Seçiniz</option>
            <option value="SATA SSD">SATA SSD</option>
            <option value="NVMe M.2">NVMe M.2</option>
            <option value="NVMe PCIe">NVMe PCIe</option>
            <option value="SATA M.2">SATA M.2</option>
            <option value="External SSD">External SSD</option>
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
            Okuma Hızı
          </label>
          <input
            type="text"
            value={formData.readSpeed}
            onChange={(e) => handleInputChange('readSpeed', e.target.value)}
            placeholder="Örn: 3500 MB/s, 560 MB/s"
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
            Yazma Hızı
          </label>
          <input
            type="text"
            value={formData.writeSpeed}
            onChange={(e) => handleInputChange('writeSpeed', e.target.value)}
            placeholder="Örn: 3000 MB/s, 530 MB/s"
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
            Arayüz
          </label>
          <select
            value={formData.interface}
            onChange={(e) => handleInputChange('interface', e.target.value)}
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
            <option value="">Arayüz Seçiniz</option>
            <option value="SATA III">SATA III</option>
            <option value="PCIe 3.0 x4">PCIe 3.0 x4</option>
            <option value="PCIe 4.0 x4">PCIe 4.0 x4</option>
            <option value="PCIe 5.0 x4">PCIe 5.0 x4</option>
            <option value="USB 3.0">USB 3.0</option>
            <option value="USB 3.1">USB 3.1</option>
            <option value="USB 3.2">USB 3.2</option>
            <option value="USB-C">USB-C</option>
            <option value="Thunderbolt">Thunderbolt</option>
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
            placeholder="SSD hakkında ek bilgiler, özellikler, kullanım durumu, aksesuarlar, performans vb."
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