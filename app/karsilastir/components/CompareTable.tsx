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

interface CompareTableProps {
  selectedProducts: Product[];
  onRemoveFromComparison: (productId: number) => void;
  getAllSpecs: () => string[];
}

const CompareTable: React.FC<CompareTableProps> = ({
  selectedProducts,
  onRemoveFromComparison,
  getAllSpecs
}) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
      }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th style={{
              padding: '20px',
              textAlign: 'left',
              borderBottom: '1px solid #e5e7eb',
              fontSize: '16px',
              fontWeight: '600',
              color: '#374151',
              minWidth: '200px'
            }}>
              Özellik
            </th>
            {selectedProducts.map(product => (
              <th key={product.id} style={{
                padding: '20px',
                textAlign: 'center',
                borderBottom: '1px solid #e5e7eb',
                fontSize: '16px',
                fontWeight: '600',
                color: '#374151',
                minWidth: '250px'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{product.image}</div>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    {product.name}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0 0 8px 0'
                  }}>
                    {product.brand}
                  </p>
                  <p style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#059669',
                    margin: '0 0 8px 0'
                  }}>
                    {product.price.toLocaleString('tr-TR')} ₺
                  </p>
                  <button
                    onClick={() => onRemoveFromComparison(product.id)}
                    style={{
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    ✕ Çıkar
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getAllSpecs().map(spec => (
            <tr key={spec} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{
                padding: '16px 20px',
                background: '#f8fafc',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151',
                borderRight: '1px solid #e5e7eb'
              }}>
                {spec}
              </td>
              {selectedProducts.map(product => (
                <td key={product.id} style={{
                  padding: '16px 20px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {product.specs[spec] || '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareTable;









