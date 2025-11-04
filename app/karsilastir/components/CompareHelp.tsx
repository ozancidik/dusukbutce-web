"use client";
import React from 'react';

const CompareHelp: React.FC = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '24px',
      background: '#f0f9ff',
      borderRadius: '12px',
      border: '1px solid #0ea5e9',
      marginTop: '32px'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#0369a1',
        margin: '0 0 12px 0'
      }}>
        💡 Karşılaştırma Hakkında
      </h3>
      <p style={{
        fontSize: '16px',
        color: '#0c4a6e',
        margin: '0 0 20px 0'
      }}>
        En fazla 4 ürünü aynı anda karşılaştırabilirsiniz. Ürün özelliklerini detaylı olarak inceleyerek 
        size en uygun olanı seçebilirsiniz.
      </p>
    </div>
  );
};

export default CompareHelp;









