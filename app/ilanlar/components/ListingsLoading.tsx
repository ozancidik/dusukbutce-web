"use client";
import React from 'react';

const ListingsLoading: React.FC = () => {
  return (
    <div style={{ 
      maxWidth: 1200, 
      margin: "40px auto", 
      padding: 32, 
      background: '#f8fafc', 
      borderRadius: 16, 
      boxShadow: '0 4px 32px #0001', 
      fontFamily: 'sans-serif',
      textAlign: 'center'
    }}>
      <div>Yükleniyor...</div>
    </div>
  );
};

export default ListingsLoading;














