"use client";
import React from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  specs: Record<string, string>;
  image: string;
}

interface CompareControlsProps {
  selectedProducts: Product[];
  showProductSelector: boolean;
  setShowProductSelector: (value: boolean) => void;
  onClearComparison: () => void;
}

const CompareControls: React.FC<CompareControlsProps> = ({
  selectedProducts,
  showProductSelector,
  setShowProductSelector,
  onClearComparison
}) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      padding: '20px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      <div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0'
        }}>
          📊 Karşılaştırma Listesi
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b7280',
          margin: 0
        }}>
          {selectedProducts.length}/4 ürün seçildi
        </p>
      </div>
      
      <div style={{ display: 'flex', gap: '12px' }}>
        <button
          onClick={() => setShowProductSelector(!showProductSelector)}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {showProductSelector ? '✕ Kapat' : '➕ Ürün Ekle'}
        </button>
        
        {selectedProducts.length > 0 && (
          <button
            onClick={onClearComparison}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            🗑️ Temizle
          </button>
        )}
      </div>
    </div>
  );
};

export default CompareControls;

















