"use client";
import React from 'react';

interface CompareEmptyProps {
  onShowProductSelector: () => void;
}

const CompareEmpty: React.FC<CompareEmptyProps> = ({ onShowProductSelector }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 40px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '2px dashed #d1d5db'
    }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔍</div>
      <h3 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 16px 0'
      }}>
        Henüz ürün seçilmedi
      </h3>
      <p style={{
        fontSize: '16px',
        color: '#6b7280',
        margin: '0 0 24px 0',
        maxWidth: '400px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        Karşılaştırmak istediğiniz ürünleri seçmek için "Ürün Ekle" butonuna tıklayın
      </p>
      <button
        onClick={onShowProductSelector}
        style={{
          background: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 24px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
      >
        ➕ Ürün Ekle
      </button>
    </div>
  );
};

export default CompareEmpty;














