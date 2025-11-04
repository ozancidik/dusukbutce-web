import React from 'react';

interface ShippingOptionsSectionProps {
  isMobile: boolean;
  formData: any;
  handleInputChange: (e: any) => void;
}

const ShippingOptionsSection: React.FC<ShippingOptionsSectionProps> = ({ isMobile, formData, handleInputChange }) => {
  const shippingOptions = [
    { value: 'aras', label: 'Aras Kargo', price: '25 TL', time: '1-2 gün' },
    { value: 'mng', label: 'MNG Kargo', price: '30 TL', time: '1-2 gün' },
    { value: 'yurtici', label: 'Yurtiçi Kargo', price: '35 TL', time: '2-3 gün' },
    { value: 'ptt', label: 'PTT Kargo', price: '20 TL', time: '3-5 gün' }
  ];

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
        Kargo Seçenekleri
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '12px'
      }}>
        {shippingOptions.map((option) => (
          <label key={option.value} style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.background = '#f8fafc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.background = 'white';
          }}>
            <input
              type="radio"
              name="shippingMethod"
              value={option.value}
              checked={formData.shippingMethod === option.value}
              onChange={handleInputChange}
              style={{ marginRight: '12px' }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{option.label}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                {option.price} • {option.time}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingOptionsSection;
