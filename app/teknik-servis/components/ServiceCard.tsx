"use client";
import React from 'react';
import Link from 'next/link';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
}

interface ServiceCardProps {
  service: Service;
  isMobile: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isMobile }) => {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div style={{
          fontSize: '32px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
        }}>
          {service.icon}
        </div>
        <div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 4px 0'
          }}>
            {service.title}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: '0'
          }}>
            {service.description}
          </p>
        </div>
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0'
        }}>
          Hizmetler:
        </h4>
        <ul style={{
          listStyle: 'none',
          padding: '0',
          margin: '0'
        }}>
          {service.features.map((feature, index) => (
            <li key={index} style={{
              fontSize: '13px',
              color: '#6b7280',
              marginBottom: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ color: '#10b981' }}>•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '16px'
      }}>
        <Link href={`/teknik-servis/evimden-al?service=${service.id}`} style={{ flex: 1, textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 8px',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
          }}>
            🏠 Evimden Al
          </button>
        </Link>
        <Link href={`/teknik-servis/kargo-ile-gonder?service=${service.id}`} style={{ flex: 1, textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 8px',
            fontSize: '11px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
          }}>
            📦 Kargo ile Gönder
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;









