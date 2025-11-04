"use client";
import React from 'react';

const CompareHeader: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: '40px',
      paddingBottom: '20px',
      borderBottom: '2px solid #e5e7eb'
    }}>
      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 16px 0'
      }}>
        Ürün Karşılaştırma
      </h1>
      <p style={{
        fontSize: '18px',
        color: '#6b7280',
        margin: 0,
        lineHeight: '1.6'
      }}>
        Ürünleri detaylı olarak karşılaştırın ve en uygun olanı seçin
      </p>
    </div>
  );
};

export default CompareHeader;









