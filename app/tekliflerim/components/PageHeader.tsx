'use client';
import React from 'react';
import { Submission } from '../utils/types';

interface PageHeaderProps {
  submissions: Submission[];
  isMobile: boolean;
}

export default function PageHeader({ submissions, isMobile }: PageHeaderProps) {
  return (
    <div style={{
      textAlign: 'center',
      marginBottom: isMobile ? '30px' : '40px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '24px 20px' : '32px 40px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h1 style={{
          fontSize: isMobile ? '28px' : '36px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '12px'
        }}>
          Tekliflerim
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#6b7280',
          margin: '0 0 20px 0',
          lineHeight: '1.6'
        }}>
          Satış talepleriniz ve tekliflerinizi yönetin
        </p>
        
        {/* Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '16px' : '24px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
            padding: isMobile ? '12px 16px' : '16px 24px',
            borderRadius: '12px',
            border: '1px solid #bae6fd'
          }}>
            <div style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: '#0369a1'
            }}>
              {submissions.length}
            </div>
            <div style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#0284c7',
              fontWeight: '500'
            }}>
              Toplam Talep
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            padding: isMobile ? '12px 16px' : '16px 24px',
            borderRadius: '12px',
            border: '1px solid #bbf7d0'
          }}>
            <div style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: '#166534'
            }}>
              {submissions.filter(s => s.status === 'offered').length}
            </div>
            <div style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#16a34a',
              fontWeight: '500'
            }}>
              Teklif Bekleyen
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: isMobile ? '12px 16px' : '16px 24px',
            borderRadius: '12px',
            border: '1px solid #fcd34d'
          }}>
            <div style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: '#92400e'
            }}>
              {submissions.filter(s => s.customerResponse?.action === 'accepted').length}
            </div>
            <div style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#d97706',
              fontWeight: '500'
            }}>
              Kabul Edilen
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}











