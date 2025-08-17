"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SepetPage() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          marginBottom: '32px',
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Image 
              src="/logo.png" 
              alt="Düşük Bütçe" 
              width={140} 
              height={50} 
              style={{ 
                objectFit: 'contain', 
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </Link>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '24px 0 8px 0'
          }}>
            🛒 Sepetim
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Sepetinizdeki ürünleri görüntüleyin ve yönetin
          </p>
        </div>

        {/* Ana İçerik */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <div style={{
            padding: '60px 20px',
            color: '#6b7280'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '16px'
            }}>
              🛒
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 8px 0'
            }}>
              Sepetiniz Boş
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0 0 24px 0'
            }}>
              Henüz sepetinize ürün eklemediniz.
            </p>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2563eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#3b82f6';
              }}>
                🛍️ Alışverişe Başla
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
