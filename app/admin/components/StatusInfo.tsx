"use client";
import React from 'react';
import { FieldRenderer, BooleanFieldRenderer } from './FieldRenderer';

interface StatusInfoProps {
  submission: any;
  isMobile: boolean;
}

export const StatusInfo: React.FC<StatusInfoProps> = ({ submission, isMobile }) => {
  return (
    <div style={{
      background: '#f8fafc',
      padding: '20px',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      marginBottom: '24px'
    }}>
      <h3 style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: '#374151',
        margin: '0 0 16px 0',
        paddingBottom: '8px',
        borderBottom: '2px solid #e5e7eb'
      }}>
        📦 Durum Bilgileri
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px'
      }}>
        <BooleanFieldRenderer 
          label="Kutu" 
          value={submission.hasBox || false} 
          isMobile={isMobile} 
        />
        <BooleanFieldRenderer 
          label="Fatura" 
          value={submission.hasInvoice || false} 
          isMobile={isMobile} 
        />
        <BooleanFieldRenderer 
          label="Garanti" 
          value={submission.hasWarranty || false} 
          isMobile={isMobile} 
        />
        <FieldRenderer 
          label="Garanti Süresi" 
          value={submission.warrantyDuration} 
          isMobile={isMobile} 
        />
        <FieldRenderer 
          label="Fatura Tarihi" 
          value={submission.invoiceDate} 
          isMobile={isMobile} 
        />
        <FieldRenderer 
          label="Ekran Durumu" 
          value={submission.screenStatus} 
          isMobile={isMobile} 
        />
        <FieldRenderer 
          label="Ölü Piksel Sayısı" 
          value={submission.deadPixelCount} 
          isMobile={isMobile} 
        />
      </div>
    </div>
  );
};
