"use client";
import React from 'react';

interface FieldRendererProps {
  label: string;
  value: any;
  isImportant?: boolean;
  isMobile: boolean;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({ 
  label, 
  value, 
  isImportant = false, 
  isMobile 
}) => {
  if (!value || value === '' || value === 'undefined') return null;
  
  return (
    <div style={{
      background: isImportant ? '#ffffff' : '#f8fafc',
      padding: '12px',
      borderRadius: '8px',
      border: isImportant ? '2px solid #e2e8f0' : '1px solid #e2e8f0',
      marginBottom: '8px'
    }}>
      <span style={{ 
        fontSize: isMobile ? '12px' : '14px', 
        color: '#64748b', 
        fontWeight: '600',
        display: 'block',
        marginBottom: '4px'
      }}>
        {label}:
      </span>
      <div style={{ 
        fontSize: isMobile ? '14px' : '16px', 
        fontWeight: isImportant ? '600' : '500', 
        color: '#1e293b'
      }}>
        {value}
      </div>
    </div>
  );
};

interface BooleanFieldRendererProps {
  label: string;
  value: boolean;
  isMobile: boolean;
}

export const BooleanFieldRenderer: React.FC<BooleanFieldRendererProps> = ({ 
  label, 
  value, 
  isMobile 
}) => {
  return (
    <div style={{
      background: '#f8fafc',
      padding: '12px',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}>
      <span style={{ 
        fontSize: isMobile ? '12px' : '14px', 
        color: '#64748b', 
        fontWeight: '600'
      }}>
        {label}:
      </span>
      <div style={{
        background: value ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: isMobile ? '12px' : '14px',
        fontWeight: '600'
      }}>
        {value ? 'Evet' : 'Hayır'}
      </div>
    </div>
  );
};
