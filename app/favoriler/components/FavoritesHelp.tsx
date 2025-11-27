"use client";
import React from 'react';

const FavoritesHelp: React.FC = () => {
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
        💡 Favoriler Hakkında
      </h3>
      <p style={{
        fontSize: '16px',
        color: '#0c4a6e',
        margin: '0 0 20px 0'
      }}>
        Favori ürünlerinizdeki fiyat değişikliklerini takip edin, stok durumlarını kontrol edin 
        ve özel kampanyalardan haberdar olun.
      </p>
    </div>
  );
};

export default FavoritesHelp;

















