"use client";
import React from 'react';
import ServiceCard from './ServiceCard';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  price: string;
}

interface ServicesSectionProps {
  services: Service[];
  isMobile: boolean;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services, isMobile }) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: '700',
        color: '#1f2937',
        margin: '0 0 24px 0',
        textAlign: 'center'
      }}>
        Hizmetlerimiz
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '24px'
      }}>
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            isMobile={isMobile}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;









