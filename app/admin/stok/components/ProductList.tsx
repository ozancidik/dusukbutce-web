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
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface ProductListProps {
  isMobile: boolean;
  products: Product[];
  loading: boolean;
  onUpdateStock: (product: Product) => void;
}

export default function ProductList({ isMobile, products, loading, onUpdateStock }: ProductListProps) {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Yükleniyor...
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Ürün bulunamadı
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    }}>
      <div style={{
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Ürün
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Kategori
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Fiyat
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Stok
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Durum
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {product.images && product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                    )}
                    <div>
                      <div style={{
                        fontWeight: '500',
                        color: '#1f2937'
                      }}>
                        {product.name}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        {product.brand} {product.productModel}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  {product.category}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  ₺{product.price.toLocaleString()}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: product.stock === 0 ? '#dc2626' : product.stock < 10 ? '#f59e0b' : '#059669'
                }}>
                  {product.stock}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px'
                }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500',
                    background: product.status === 'active' ? '#dcfce7' : product.status === 'inactive' ? '#fef3c7' : '#f3f4f6',
                    color: product.status === 'active' ? '#166534' : product.status === 'inactive' ? '#92400e' : '#374151'
                  }}>
                    {product.status === 'active' ? 'Aktif' : product.status === 'inactive' ? 'Pasif' : 'Taslak'}
                  </span>
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  textAlign: 'center'
                }}>
                  <button
                    onClick={() => onUpdateStock(product)}
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Stok Güncelle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
