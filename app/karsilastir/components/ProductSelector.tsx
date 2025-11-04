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

interface ProductSelectorProps {
  products: Product[];
  selectedProducts: Product[];
  onAddToComparison: (product: Product) => void;
  onRemoveFromComparison: (productId: number) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProducts,
  onAddToComparison,
  onRemoveFromComparison
}) => {
  return (
    <div style={{
      marginBottom: '32px',
      padding: '24px',
      background: '#f8fafc',
      borderRadius: '12px',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{
        fontSize: '20px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 20px 0'
      }}>
        🔍 Karşılaştırmak İstediğiniz Ürünleri Seçin
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {products.map(product => (
          <div
            key={product.id}
            style={{
              padding: '20px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div style={{ fontSize: '32px' }}>{product.image}</div>
            <div style={{ flex: 1 }}>
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
                {product.brand} • {product.category}
              </p>
              <p style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#059669',
                margin: 0
              }}>
                {product.price.toLocaleString('tr-TR')} ₺
              </p>
            </div>
            
            {selectedProducts.find(p => p.id === product.id) ? (
              <button
                onClick={() => onRemoveFromComparison(product.id)}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Çıkar
              </button>
            ) : (
              <button
                onClick={() => onAddToComparison(product)}
                style={{
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Ekle
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSelector;









