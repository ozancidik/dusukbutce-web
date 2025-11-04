"use client";
import React from 'react';

interface AddressCardProps {
  address: {
    _id: string;
    title: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    district: string;
    postalCode: string;
    isDefault: boolean;
  };
  isMobile: boolean;
  onEdit: (address: any) => void;
  onDelete: (addressId: string) => void;
}

export default function AddressCard({ address, isMobile, onEdit, onDelete }: AddressCardProps) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s ease',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    }}
    >
      {/* Varsayılan Badge */}
      {address.isDefault && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '10px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Varsayılan
        </div>
      )}
      
      {/* Adres Başlığı */}
      <div style={{
        marginBottom: '12px'
      }}>
        <h3 style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          color: '#1f2937',
          margin: '0 0 4px 0'
        }}>
          {address.title}
        </h3>
        
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: '#6b7280',
          margin: '0 0 8px 0',
          fontWeight: '500'
        }}>
          {address.fullName}
        </p>
      </div>
      
      {/* Adres Detayları */}
      <div style={{
        marginBottom: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '16px', color: '#6b7280', marginTop: '2px' }}>📍</span>
          <div>
            <p style={{
              fontSize: isMobile ? '13px' : '14px',
              color: '#374151',
              margin: '0 0 4px 0',
              lineHeight: '1.4'
            }}>
              {address.address}
            </p>
            <p style={{
              fontSize: isMobile ? '12px' : '13px',
              color: '#6b7280',
              margin: '0'
            }}>
              {address.district}, {address.city} {address.postalCode}
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <span style={{ fontSize: '16px', color: '#6b7280' }}>📞</span>
          <span style={{
            fontSize: isMobile ? '13px' : '14px',
            color: '#374151'
          }}>
            {address.phone}
          </span>
        </div>
      </div>
      
      {/* Aksiyon Butonları */}
      <div style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end'
      }}>
        <button
          onClick={() => onEdit(address)}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '8px 12px' : '10px 16px',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
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
          onClick={() => onDelete(address._id)}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '8px 12px' : '10px 16px',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
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
  );
}
