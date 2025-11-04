import React from 'react';

interface DeviceInfoSectionProps {
  formData: any;
  handleInputChange: (e: any) => void;
}

const DeviceInfoSection: React.FC<DeviceInfoSectionProps> = ({ formData, handleInputChange }) => {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 16px 0',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '8px'
      }}>
        Cihaz Bilgileri
      </h3>
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Cihaz Bilgileri *
        </label>
        <input
          type="text"
          name="deviceInfo"
          value={formData.deviceInfo}
          onChange={handleInputChange}
          required
          placeholder="Örn: MacBook Pro 13 inch, iPhone 12, Samsung Galaxy S21"
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
          fontWeight: '600',
          color: '#374151',
          marginBottom: '8px'
        }}>
          Problem Açıklaması *
        </label>
        <textarea
          name="problemDescription"
          value={formData.problemDescription}
          onChange={handleInputChange}
          required
          rows={4}
          placeholder="Cihazınızda yaşadığınız problemi detaylı olarak açıklayın..."
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.2s',
            resize: 'vertical'
          }}
          onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
      </div>
    </div>
  );
};

export default DeviceInfoSection;
