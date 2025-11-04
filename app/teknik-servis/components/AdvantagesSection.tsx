"use client";
import React from 'react';

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

interface AdvantagesSectionProps {
  advantages: Advantage[];
  isMobile: boolean;
}

const AdvantagesSection: React.FC<AdvantagesSectionProps> = ({ advantages, isMobile }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 24px 0'
      }}>
        Neden Bizi Tercih Etmelisiniz?
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '24px'
      }}>
        {advantages.map((advantage, index) => (
          <div key={index} style={{
            padding: '20px',
            borderRadius: '12px',
            background: '#f9fafb',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{advantage.icon}</div>
            <h4 style={{ fontWeight: '600', margin: '0 0 8px 0', color: '#1f2937' }}>{advantage.title}</h4>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              {advantage.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantagesSection;









