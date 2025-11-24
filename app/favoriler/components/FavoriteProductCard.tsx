"use client";
import React from 'react';

interface FavoriteProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  brand: string;
  image: string;
  isInStock: boolean;
  addedDate: string;
}

interface FavoriteProductCardProps {
  product: FavoriteProduct;
  onRemove: (productId: number) => void;
  formatDate: (dateString: string) => string;
  getDiscountPercentage: (originalPrice: number, currentPrice: number) => number;
}

const FavoriteProductCard: React.FC<FavoriteProductCardProps> = ({
  product,
  onRemove,
  formatDate,
  getDiscountPercentage
}) => {
  return (
    <div
      style={{
        background: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        transition: 'all 0.3s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Ürün Görseli ve Stok Durumu */}
      <div style={{
        height: '200px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '64px',
        position: 'relative'
      }}>
        {product.image}
        
        {/* Stok Durumu */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: product.isInStock ? '#059669' : '#dc2626',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          {product.isInStock ? '✅ Stokta' : '❌ Stokta Yok'}
        </div>

        {/* İndirim Etiketi */}
        {product.originalPrice && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#f59e0b',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            🔥 %{getDiscountPercentage(product.originalPrice, product.price)} İndirim
          </div>
        )}
      </div>

      {/* Ürün Bilgileri */}
      <div style={{ padding: '20px' }}>
        {/* Kategori ve Marka */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px'
        }}>
          <span style={{
            fontSize: '12px',
            color: '#6b7280',
            background: '#e5e7eb',
            padding: '4px 8px',
            borderRadius: '8px',
            fontWeight: '500'
          }}>
            {product.category}
          </span>
          <span style={{
            fontSize: '14px',
            color: '#2563eb',
            fontWeight: '600'
          }}>
            {product.brand}
          </span>
        </div>

        {/* Ürün Adı */}
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 12px 0',
          lineHeight: '1.4'
        }}>
          {product.name}
        </h3>

        {/* Fiyat */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#059669'
          }}>
            {product.price.toLocaleString('tr-TR')} ₺
          </span>
          {product.originalPrice && (
            <span style={{
              fontSize: '16px',
              color: '#6b7280',
              textDecoration: 'line-through',
              marginLeft: '12px'
            }}>
              {product.originalPrice.toLocaleString('tr-TR')} ₺
            </span>
          )}
        </div>

        {/* Eklenme Tarihi */}
        <p style={{
          fontSize: '12px',
          color: '#6b7280',
          margin: '0 0 16px 0'
        }}>
          ❤️ {formatDate(product.addedDate)} tarihinde eklendi
        </p>

        {/* Aksiyon Butonları */}
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
          <button
            style={{
              flex: 1,
              background: product.isInStock ? '#2563eb' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: product.isInStock ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s'
            }}
            disabled={!product.isInStock}
          >
            {product.isInStock ? '🛒 Sepete Ekle' : '📦 Stokta Yok'}
          </button>
          
          <button
            onClick={() => onRemove(product.id)}
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            ❌ Çıkar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProductCard;













