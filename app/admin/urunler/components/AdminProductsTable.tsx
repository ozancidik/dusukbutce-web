"use client";
import React from 'react';

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  productModel: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  specifications: Record<string, any>;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface AdminProductsTableProps {
  products: Product[];
  isMobile: boolean;
  loading: boolean;
  error: string | null;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function AdminProductsTable({
  products,
  isMobile,
  loading,
  error,
  onEditProduct,
  onDeleteProduct
}: AdminProductsTableProps) {
  if (loading) {
    return (
      <div style={{
        maxWidth: isMobile ? '100%' : '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
        <div style={{ fontSize: '18px', color: '#6b7280' }}>Ürünler yükleniyor...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: isMobile ? '100%' : '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
        <div style={{ fontSize: '18px', color: '#dc2626' }}>Hata: {error}</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{
        maxWidth: isMobile ? '100%' : '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
        <h3 style={{ fontSize: '20px', color: '#374151', margin: '0 0 8px 0' }}>
          Henüz ürün bulunmuyor
        </h3>
        <p style={{ fontSize: '16px', color: '#6b7280', margin: 0 }}>
          İlk ürününüzü eklemek için "Yeni Ürün Ekle" butonuna tıklayın.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: isMobile ? '100%' : '1400px',
      margin: '0 auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        {products.map((product, index) => (
          <div
            key={product._id}
            style={{
              padding: isMobile ? '16px' : '20px',
              borderBottom: index < products.length - 1 ? '1px solid #f3f4f6' : 'none',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f9fafb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
          >
            {/* Ürün Bilgileri */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '12px' : '16px'
            }}>
              {/* Ürün Resmi */}
              <div style={{
                width: isMobile ? '80px' : '120px',
                height: isMobile ? '80px' : '120px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <span style={{ fontSize: isMobile ? '24px' : '32px', color: '#9ca3af' }}>
                    📦
                  </span>
                )}
              </div>

              {/* Ürün Detayları */}
              <div style={{
                flex: 1,
                minWidth: 0
              }}>
                <h3 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 4px 0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {product.name}
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: isMobile ? '8px' : '12px',
                  marginBottom: '8px'
                }}>
                  <span style={{
                    background: '#e0e7ff',
                    color: '#3730a3',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {product.category}
                  </span>
                  <span style={{
                    background: '#f0fdf4',
                    color: '#166534',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {product.brand}
                  </span>
                  <span style={{
                    background: product.status === 'active' ? '#f0fdf4' : '#fef2f2',
                    color: product.status === 'active' ? '#166534' : '#dc2626',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {product.status === 'active' ? 'Aktif' : product.status === 'inactive' ? 'Pasif' : 'Taslak'}
                  </span>
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: isMobile ? '12px' : '16px',
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#6b7280'
                }}>
                  <span>💰 {product.price.toLocaleString('tr-TR')} ₺</span>
                  <span>📦 Stok: {product.stock}</span>
                  <span>📅 {new Date(product.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div style={{
                display: 'flex',
                gap: '8px',
                flexShrink: 0
              }}>
                <button
                  onClick={() => onEditProduct(product)}
                  style={{
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#2563eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#3b82f6';
                  }}
                >
                  ✏️ Düzenle
                </button>
                
                <button
                  onClick={() => onDeleteProduct(product._id)}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#b91c1c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#dc2626';
                  }}
                >
                  🗑️ Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
