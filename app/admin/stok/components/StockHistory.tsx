"use client";
import React from 'react';

interface StockUpdate {
  _id: string;
  productId: string;
  productName: string;
  changeType: 'add' | 'remove' | 'set';
  previousStock: number;
  newStock: number;
  changeAmount: number;
  reason: string;
  updatedBy: string;
  updatedAt: string;
}

interface StockHistoryProps {
  isMobile: boolean;
  stockHistory: StockUpdate[];
  loading: boolean;
}

export default function StockHistory({ isMobile, stockHistory, loading }: StockHistoryProps) {
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

  if (stockHistory.length === 0) {
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
          Stok geçmişi bulunamadı
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
          📊 Stok Geçmişi
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
                İşlem
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Önceki Stok
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Yeni Stok
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
            {stockHistory.map((update) => (
              <tr key={update._id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151',
                  fontWeight: '500'
                }}>
                  {update.productName}
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
                    background: update.changeType === 'add' ? '#dcfce7' : update.changeType === 'remove' ? '#fef2f2' : '#f3f4f6',
                    color: update.changeType === 'add' ? '#166534' : update.changeType === 'remove' ? '#dc2626' : '#374151'
                  }}>
                    {update.changeType === 'add' ? 'Ekleme' : update.changeType === 'remove' ? 'Çıkarma' : 'Ayarlama'}
                  </span>
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  {update.previousStock}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  {update.newStock}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: update.changeAmount > 0 ? '#059669' : update.changeAmount < 0 ? '#dc2626' : '#374151',
                  fontWeight: '500'
                }}>
                  {update.changeAmount > 0 ? '+' : ''}{update.changeAmount}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  {update.reason}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {new Date(update.updatedAt).toLocaleDateString('tr-TR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
