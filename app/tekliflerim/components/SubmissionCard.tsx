"use client";
import React from "react";
import { Submission } from "../types";

interface SubmissionCardProps {
  submission: Submission;
  isMobile: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onDelete?: () => void;
  onReoffer?: () => void;
}

export default function SubmissionCard({ 
  submission, 
  isMobile, 
  onAccept, 
  onReject, 
  onDelete,
  onReoffer 
}: SubmissionCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'approved': return '#10b981';
      case 'rejected': return '#ef4444';
      case 'accepted': return '#3b82f6';
      case 'customer_rejected': return '#9ca3af';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'İnceleniyor';
      case 'approved': return 'Teklif Verildi';
      case 'rejected': return 'Reddedildi';
      case 'accepted': return 'Kabul Edildi';
      case 'customer_rejected': return 'Reddettiniz';
      default: return status;
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: isMobile ? '20px' : '24px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s'
    }}>
      {/* Status Badge */}
      <div style={{
        display: 'inline-block',
        padding: '6px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: '600',
        marginBottom: '16px',
        background: `${getStatusColor(submission.status)}20`,
        color: getStatusColor(submission.status)
      }}>
        {getStatusText(submission.status)}
      </div>

      {/* Product Info */}
      <h3 style={{
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: '#1f2937',
        margin: '0 0 8px 0'
      }}>
        {submission.brand} {submission.model}
      </h3>

      <p style={{
        fontSize: '14px',
        color: '#6b7280',
        margin: '0 0 16px 0'
      }}>
        Kategori: {submission.category}
      </p>

      {/* Images */}
      {submission.images && submission.images.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          {submission.images.slice(0, 3).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Product ${idx + 1}`}
              style={{
                width: '100%',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '8px'
              }}
            />
          ))}
        </div>
      )}

      {/* Offer Info */}
      {submission.offer && (
        <div style={{
          background: '#f0fdf4',
          border: '1px solid #86efac',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '16px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#166534',
            margin: '0 0 4px 0',
            fontWeight: '600'
          }}>
            💰 Teklif: {submission.offer.amount} TL
          </p>
          {submission.offer.notes && (
            <p style={{
              fontSize: '13px',
              color: '#15803d',
              margin: 0
            }}>
              {submission.offer.notes}
            </p>
          )}
        </div>
      )}

      {/* Rejection Reason */}
      {submission.status === 'rejected' && submission.rejectionReason && (
        <div style={{
          background: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          padding: '12px',
          marginTop: '16px'
        }}>
          <p style={{
            fontSize: '13px',
            color: '#991b1b',
            margin: 0
          }}>
            ❌ Red Sebebi: {submission.rejectionReason}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginTop: '16px',
        flexWrap: 'wrap'
      }}>
        {submission.status === 'approved' && !submission.customerResponse && (
          <>
            <button
              onClick={onAccept}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ✓ Kabul Et
            </button>
            <button
              onClick={onReject}
              style={{
                flex: 1,
                padding: '10px 16px',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              ✗ Reddet
            </button>
          </>
        )}
        
        {submission.status === 'rejected' && onReoffer && (
          <button
            onClick={onReoffer}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            🔄 Yeniden Teklif İste
          </button>
        )}

        {onDelete && (
          <button
            onClick={onDelete}
            style={{
              padding: '10px 16px',
              background: '#f3f4f6',
              color: '#6b7280',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            🗑️ Sil
          </button>
        )}
      </div>

      {/* Date */}
      <p style={{
        fontSize: '12px',
        color: '#9ca3af',
        margin: '12px 0 0 0'
      }}>
        {new Date(submission.createdAt).toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
    </div>
  );
}





