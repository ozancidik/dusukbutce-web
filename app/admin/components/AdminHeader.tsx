"use client";
import React from 'react';

interface AdminHeaderProps {
  isMobile: boolean;
  submissions: any[];
  onLogout: () => void;
}

export default function AdminHeader({ isMobile, submissions, onLogout }: AdminHeaderProps) {
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter(s => s.status === 'pending').length;
  const offeredSubmissions = submissions.filter(s => s.status === 'offered').length;
  const acceptedSubmissions = submissions.filter(s => s.status === 'accepted').length;

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '24px' : '32px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 8px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}>
              💻
            </div>
            Admin Paneli
          </h1>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Tüm kategorilerdeki satış taleplerini yönetin ve teklifler verin
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            color: 'white',
            padding: isMobile ? '8px 16px' : '12px 20px',
            borderRadius: '8px',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'white',
              animation: 'pulse 2s infinite'
            }}></div>
            {totalSubmissions} Talep
          </div>

          <button
            onClick={onLogout}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: isMobile ? '8px 12px' : '10px 16px',
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.3)';
            }}
          >
            🚪 Çıkış
          </button>
        </div>
      </div>
    </div>
  );
}