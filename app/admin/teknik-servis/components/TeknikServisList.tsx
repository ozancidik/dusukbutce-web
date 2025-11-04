"use client";
import React from 'react';

interface TechnicalServiceSubmission {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  district: string;
  serviceType: string;
  deliveryMethod: 'evimden-al' | 'kargo-ile-gonder';
  deviceInfo: string;
  problemDescription: string;
  preferredDate?: string;
  preferredTime?: string;
  shippingMethod?: string;
  notes?: string;
  status: 'pending' | 'contacted' | 'in-progress' | 'completed' | 'cancelled';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

interface TeknikServisListProps {
  isMobile: boolean;
  submissions: TechnicalServiceSubmission[];
  loading: boolean;
  statusFilter: string;
  onViewSubmission: (submission: TechnicalServiceSubmission) => void;
  onUpdateStatus: (submission: TechnicalServiceSubmission) => void;
}

export default function TeknikServisList({ isMobile, submissions, loading, statusFilter, onViewSubmission, onUpdateStatus }: TeknikServisListProps) {
  const filteredSubmissions = statusFilter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === statusFilter);

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

  if (filteredSubmissions.length === 0) {
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
          {statusFilter === 'all' ? 'Henüz başvuru bulunmuyor' : 'Bu durumda başvuru bulunmuyor'}
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
                Müşteri
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Servis Tipi
              </th>
              <th style={{
                padding: isMobile ? '8px' : '12px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Cihaz
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
            {filteredSubmissions.map((submission) => (
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
                      {submission.name}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {submission.phone}
                    </div>
                    {submission.email && (
                      <div style={{
                        fontSize: '12px',
                        color: '#6b7280'
                      }}>
                        {submission.email}
                      </div>
                    )}
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
                    <div>{submission.serviceType}</div>
                    <div style={{
                      color: '#6b7280'
                    }}>
                      {submission.deliveryMethod === 'evimden-al' ? 'Evden Al' : 'Kargo ile Gönder'}
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
                    lineHeight: '1.4',
                    maxWidth: '150px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {submission.deviceInfo}
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
                                submission.status === 'contacted' ? '#dbeafe' : 
                                submission.status === 'in-progress' ? '#fef2f2' : 
                                submission.status === 'completed' ? '#dcfce7' : '#f3f4f6',
                    color: submission.status === 'pending' ? '#92400e' : 
                           submission.status === 'contacted' ? '#1e40af' : 
                           submission.status === 'in-progress' ? '#dc2626' : 
                           submission.status === 'completed' ? '#166534' : '#374151'
                  }}>
                    {submission.status === 'pending' ? 'Beklemede' : 
                     submission.status === 'contacted' ? 'İletişim Kuruldu' : 
                     submission.status === 'in-progress' ? 'Devam Ediyor' : 
                     submission.status === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}
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
