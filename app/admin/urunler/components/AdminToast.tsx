"use client";
import React from 'react';

interface AdminToastProps {
  isOpen: boolean;
  message: string;
  type: 'success' | 'error';
}

export default function AdminToast({ isOpen, message, type }: AdminToastProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? '#10b981' : '#ef4444',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      zIndex: 1000,
      fontSize: '14px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      animation: 'slideInRight 0.3s ease-out',
      maxWidth: '400px'
    }}>
      <span style={{ fontSize: '18px' }}>
        {type === 'success' ? '✅' : '❌'}
      </span>
      {message}
    </div>
  );
}
