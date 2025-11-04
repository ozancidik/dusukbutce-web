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

interface SubmissionsListProps {
  isMobile: boolean;
  submissions: Submission[];
  loading: boolean;
  onViewSubmission: (submission: Submission) => void;
  onUpdateStatus: (submission: Submission) => void;
}

export default function SubmissionsList({ isMobile, submissions, loading, onViewSubmission, onUpdateStatus }: SubmissionsListProps) {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Yükleniyor...
        </div>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Henüz başvuru bulunmuyor
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    }}>
      <div style={{
        overflowX: 'auto'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Marka/Model
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Özellikler
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Durum
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Tarih
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id} style={{
                borderBottom: '1px solid #f3f4f6'
              }}>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '500',
                      color: '#1f2937'
                    }}>
                      {submission.brand}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {submission.model}
                    </div>
                  </div>
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  <div style={{
                    fontSize: '12px',
                    lineHeight: '1.4'
                  }}>
                    <div>İşlemci: {submission.processor}</div>
                    <div>RAM: {submission.ram}</div>
                    <div>Depolama: {submission.storage}</div>
                    <div>Ekran: {submission.screenSize}</div>
                  </div>
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px'
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
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  fontSize: '14px',
                  color: '#6b7280'
                }}>
                  {new Date(submission.createdAt).toLocaleDateString('tr-TR')}
                </td>
                <td style={{
                  padding: isMobile ? '8px' : '12px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => onViewSubmission(submission)}
                      style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Görüntüle
                    </button>
                    <button
                      onClick={() => onUpdateStatus(submission)}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(16, 185, 129, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Güncelle
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
