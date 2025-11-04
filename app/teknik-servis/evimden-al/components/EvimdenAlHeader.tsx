"use client";
import React from 'react';

interface EvimdenAlHeaderProps {
  isMobile: boolean;
  selectedService: any;
}

const EvimdenAlHeader: React.FC<EvimdenAlHeaderProps> = ({ isMobile, selectedService }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: isMobile ? '32px 24px' : '48px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '48px',
        marginBottom: '16px'
      }}>
        🏠
      </div>
      <h1 style={{
        fontSize: isMobile ? '28px' : '36px',
        fontWeight: '800',
        color: '#1f2937',
        margin: '0 0 16px 0',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        Evimden Al
      </h1>
      <p style={{
        fontSize: isMobile ? '16px' : '18px',
        color: '#6b7280',
        margin: '0 0 24px 0',
        lineHeight: '1.5'
      }}>
        Teknisyenimiz evinize gelerek cihazınızı alır ve onarım sonrası teslim eder
      </p>
      {selectedService && (
        <div style={{
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: '600',
          display: 'inline-block'
        }}>
          {selectedService.icon} {selectedService.name}
        </div>
      )}
    </div>
  );
};

export default EvimdenAlHeader;
