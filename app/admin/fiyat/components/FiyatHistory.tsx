"use client";
import React from 'react';

interface PriceHistory {
  _id: string;
  productId: {
    _id: string;
    name: string;
    brand: string;
    productModel: string;
    category: string;
  };
  oldPrice: number;
  newPrice: number;
  changeType: string;
  changeReason?: string;
  changedBy: string;
  changedAt: string;
  priceDifference: number;
  percentageChange: number;
  isIncrease: boolean;
  isDecrease: boolean;
}

interface FiyatHistoryProps {
  isMobile: boolean;
  priceHistory: PriceHistory[];
  loading: boolean;
}

export default function FiyatHistory({ isMobile, priceHistory, loading }: FiyatHistoryProps) {
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

  if (priceHistory.length === 0) {
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
          Fiyat geçmişi bulunamadı
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
        padding: isMobile ? '16px' : '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h3 style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0
        }}>
          📈 Fiyat Geçmişi
        </h3>
      </div>
      
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
                Eski Fiyat
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Yeni Fiyat
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Değişim
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Sebep
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Tarih
              </th>
            </tr>
          </thead>
          <tbody>
            {priceHistory.map((history) => (
              <tr key={history._id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '500',
                      color: '#1f2937'
                    }}>
                      {history.productId.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {history.productId.brand} {history.productId.productModel}
                    </div>
                  </div>
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  ₺{history.oldPrice.toLocaleString()}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '600'
                }}>
                  ₺{history.newPrice.toLocaleString()}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{
                      color: history.isIncrease ? '#059669' : history.isDecrease ? '#dc2626' : '#374151',
                      fontWeight: '500'
                    }}>
                      {history.isIncrease ? '+' : history.isDecrease ? '-' : ''}₺{Math.abs(history.priceDifference).toLocaleString()}
                    </span>
                    <span style={{
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background: history.isIncrease ? '#dcfce7' : history.isDecrease ? '#fef2f2' : '#f3f4f6',
                      color: history.isIncrease ? '#166534' : history.isDecrease ? '#dc2626' : '#374151'
                    }}>
                      {history.isIncrease ? '+' : history.isDecrease ? '-' : ''}{Math.abs(history.percentageChange).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  {history.changeReason || 'Belirtilmemiş'}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {new Date(history.changedAt).toLocaleDateString('tr-TR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
