"use client";
import React from 'react';

interface PlayStationBasicInfoProps {
  isMobile: boolean;
  formData: {
    model: string;
    storageCapacity: string;
  };
  handleInputChange: (field: string, value: any) => void;
}

export default function PlayStationBasicInfo({ isMobile, formData, handleInputChange }: PlayStationBasicInfoProps) {
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
        🎮 Temel Bilgiler
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
            Model *
          </label>
          <select
            required
            value={formData.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
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
            <option value="">Model Seçiniz</option>
            <option value="PlayStation 5">PlayStation 5</option>
            <option value="PlayStation 5 Digital">PlayStation 5 Digital</option>
            <option value="PlayStation 4 Pro">PlayStation 4 Pro</option>
            <option value="PlayStation 4 Slim">PlayStation 4 Slim</option>
            <option value="PlayStation 4">PlayStation 4</option>
            <option value="PlayStation 3">PlayStation 3</option>
            <option value="PlayStation 2">PlayStation 2</option>
            <option value="PlayStation 1">PlayStation 1</option>
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
            Depolama Kapasitesi
          </label>
          <input
            type="text"
            value={formData.storageCapacity}
            onChange={(e) => handleInputChange('storageCapacity', e.target.value)}
            placeholder="Örn: 825GB, 1TB, 2TB"
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
      </div>
    </div>
  );
}
