"use client";
import React from 'react';
import { Submission } from '../types';
import SubmissionCard from './SubmissionCard';

interface SubmissionListProps {
  submissions: Submission[];
  isMobile: boolean;
  onAction: (submission: Submission, action: 'offer' | 'listing' | 'reject' | 'delivery_completed') => void;
  onDelete: (submissionId: string) => void;
  onDetail: (submission: Submission) => void;
  onDeliveryInfo: (submission: Submission) => void;
  onReoffer: (submission: Submission) => void;
  formatDate: (dateString: string) => string;
}

export default function SubmissionList({
  submissions,
  isMobile,
  onAction,
  onDelete,
  onDetail,
  onDeliveryInfo,
  onReoffer,
  formatDate
}: SubmissionListProps) {
  if (submissions.length === 0) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '32px 20px' : '48px 40px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{
          fontSize: isMobile ? '48px' : '64px',
          marginBottom: '16px'
        }}>
          📭
        </div>
        <h3 style={{
          fontSize: isMobile ? '18px' : '24px',
          fontWeight: '600',
          color: '#374151',
          margin: '0 0 8px 0'
        }}>
          Henüz talep bulunmuyor
        </h3>
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: '#6b7280',
          margin: '0 0 24px 0',
          maxWidth: '400px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Bu kategoride henüz satış talebi bulunmuyor. Yeni talepler geldiğinde burada görünecek.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: '0 auto',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V1C4 0.447715 4.44772 0 5 0H19C19.5523 0 20 0.447715 20 1V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 4H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 9V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Sayfayı Yenile
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))',
      gap: '24px',
      marginBottom: '32px'
    }}>
      {submissions.map((submission) => (
        <SubmissionCard
          key={submission._id}
          submission={submission}
          isMobile={isMobile}
          onAction={onAction}
          onDelete={onDelete}
          onDetail={onDetail}
          onDeliveryInfo={onDeliveryInfo}
          onReoffer={onReoffer}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
}
