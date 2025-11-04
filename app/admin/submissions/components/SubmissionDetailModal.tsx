"use client";
import React from 'react';

interface Submission {
  _id: string;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  screenSize: string;
  storage: string;
  status: string;
  adminNotes?: string;
  createdAt: string;
}

interface SubmissionDetailModalProps {
  isMobile: boolean;
  submission: Submission | null;
  onClose: () => void;
}

export default function SubmissionDetailModal({ isMobile, submission, onClose }: SubmissionDetailModalProps) {
  if (!submission) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '20px' : '40px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '20px' : '32px',
        maxWidth: isMobile ? '100%' : '600px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: 0
          }}>
            📋 Başvuru Detayları
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '4px',
              borderRadius: '4px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.color = '#374151';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            ✕
          </button>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '20px'
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Marka
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.brand}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Model
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.model}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              İşlemci
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.processor}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              RAM
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.ram}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Depolama
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.storage}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Ekran Boyutu
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {submission.screenSize}
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Durum
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              <span style={{
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '500',
                background: submission.status === 'pending' ? '#fef3c7' : 
                            submission.status === 'approved' ? '#dcfce7' : 
                            submission.status === 'rejected' ? '#fef2f2' : '#f3f4f6',
                color: submission.status === 'pending' ? '#92400e' : 
                       submission.status === 'approved' ? '#166534' : 
                       submission.status === 'rejected' ? '#dc2626' : '#374151'
              }}>
                {submission.status === 'pending' ? 'Beklemede' : 
                 submission.status === 'approved' ? 'Onaylandı' : 
                 submission.status === 'rejected' ? 'Reddedildi' : submission.status}
              </span>
            </div>
          </div>
          
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Başvuru Tarihi
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937'
            }}>
              {new Date(submission.createdAt).toLocaleDateString('tr-TR')}
            </div>
          </div>
        </div>
        
        {submission.adminNotes && (
          <div>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '6px'
            }}>
              Admin Notları
            </label>
            <div style={{
              padding: '12px',
              background: '#f9fafb',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#1f2937',
              minHeight: '80px',
              whiteSpace: 'pre-wrap'
            }}>
              {submission.adminNotes}
            </div>
          </div>
        )}
        
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '24px',
          gap: '12px'
        }}>
          <button
            onClick={onClose}
            style={{
              background: '#f3f4f6',
              color: '#374151',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
            }}
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
