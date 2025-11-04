"use client";
import React from 'react';

interface Product {
  _id: string;
  name: string;
  brand: string;
  productModel: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

interface FiyatStatsProps {
  isMobile: boolean;
  stats: {
    totalChanges: number;
    averageChange: number;
    totalIncrease: number;
    totalDecrease: number;
    increaseCount: number;
    decreaseCount: number;
  } | null;
}

export default function FiyatStats({ isMobile, stats }: FiyatStatsProps) {
  if (!stats) {
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
          İstatistikler yükleniyor...
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '20px' : '24px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      marginBottom: '24px',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 20px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📊 Fiyat İstatistikleri
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bae6fd'
        }}>
          <div style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#0369a1',
            marginBottom: '4px'
          }}>
            {stats.totalChanges}
          </div>
          <div style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#0369a1',
            fontWeight: '500'
          }}>
            Toplam Değişiklik
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0'
        }}>
          <div style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#166534',
            marginBottom: '4px'
          }}>
            {stats.increaseCount}
          </div>
          <div style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#166534',
            fontWeight: '500'
          }}>
            Artış Sayısı
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <div style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#dc2626',
            marginBottom: '4px'
          }}>
            {stats.decreaseCount}
          </div>
          <div style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#dc2626',
            fontWeight: '500'
          }}>
            Azalış Sayısı
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid #bae6fd'
        }}>
          <div style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#0369a1',
            marginBottom: '4px'
          }}>
            ₺{stats.totalIncrease.toLocaleString()}
          </div>
          <div style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#0369a1',
            fontWeight: '500'
          }}>
            Toplam Artış
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: '#fef2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <div style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#dc2626',
            marginBottom: '4px'
          }}>
            ₺{stats.totalDecrease.toLocaleString()}
          </div>
          <div style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#dc2626',
            fontWeight: '500'
          }}>
            Toplam Azalış
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: '#f3f4f6',
          borderRadius: '8px',
          border: '1px solid #d1d5db'
        }}>
          <div style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '4px'
          }}>
            ₺{stats.averageChange.toLocaleString()}
          </div>
          <div style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#374151',
            fontWeight: '500'
          }}>
            Ortalama Değişim
          </div>
        </div>
      </div>
    </div>
  );
}
