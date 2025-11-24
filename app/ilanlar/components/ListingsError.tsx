"use client";
import React from 'react';

interface ListingsErrorProps {
  error: string;
}

const ListingsError: React.FC<ListingsErrorProps> = ({ error }) => {
  return (
    <div style={{ 
      background: '#fee2e2', 
      color: '#dc2626', 
      padding: 12, 
      borderRadius: 8, 
      marginBottom: 16 
    }}>
      {error}
    </div>
  );
};

export default ListingsError;













