"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

function getAdminToken(): string | null {
  return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
}

export default function AdminTeknikServis() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [submissions, setSubmissions] = useState<TechnicalServiceSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<TechnicalServiceSubmission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const checkAdminStatus = () => {
      const adminLoggedIn = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
      const adminEmail = localStorage.getItem('adminEmail') || sessionStorage.getItem('adminEmail');
      
      if (!adminLoggedIn || !adminEmail) {
        console.log("🔒 Admin giriş yapılmamış, anasayfaya yönlendiriliyor...");
        router.push('/');
        return;
      }
      setIsAuthenticated(true);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    checkAdminStatus();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSubmissions();
    }
  }, [isAuthenticated]);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/technical-service-submissions', {
        headers: { Authorization: `Bearer ${getAdminToken()}` }
      });
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.submissions);
      }
    } catch (error) {
      console.error('Talepler çekilirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    window.location.reload();
  };

  const handleUpdateStatus = async (submissionId: string, status: string, adminNotes?: string) => {
    try {
      const response = await fetch('/api/technical-service-submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({
          submissionId,
          status,
          adminNotes
        })
      });

      const result = await response.json();

      if (result.success) {
        await fetchSubmissions();
        setShowModal(false);
        setSelectedSubmission(null);
        alert('Talep başarıyla güncellendi!');
      } else {
        alert(`Hata: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu!');
    }
  };

  const handleDeleteSubmission = async (submissionId: string) => {
    if (!confirm('Bu talebi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch('/api/technical-service-submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAdminToken()}`,
        },
        body: JSON.stringify({ submissionId })
      });

      const result = await response.json();

      if (result.success) {
        await fetchSubmissions();
        alert('Talep başarıyla silindi!');
      } else {
        alert(`Hata: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu!');
    }
  };

  const filteredSubmissions = statusFilter === 'all' 
    ? submissions 
    : submissions.filter(s => s.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', text: '#92400e' };
      case 'contacted': return { bg: '#dbeafe', text: '#1e40af' };
      case 'in-progress': return { bg: '#e0e7ff', text: '#3730a3' };
      case 'completed': return { bg: '#dcfce7', text: '#166534' };
      case 'cancelled': return { bg: '#fecaca', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '⏳ Beklemede';
      case 'contacted': return '📞 İletişimde';
      case 'in-progress': return '🔧 İşlemde';
      case 'completed': return '✅ Tamamlandı';
      case 'cancelled': return '❌ İptal Edildi';
      default: return status;
    }
  };

  const getDeliveryMethodText = (method: string) => {
    return method === 'evimden-al' ? '🏠 Evimden Al' : '📦 Kargo ile Gönder';
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: isMobile ? '20px 12px' : '40px'
      }}
    >
      <div style={{
        maxWidth: isMobile ? '100%' : '1400px',
        margin: '0 auto',
        position: 'relative'
      }}>
        {/* Header */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  ← Geri
                </button>
              </Link>
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
                  🔧 Teknik Servis Talepleri
                </h1>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Teknik servis taleplerini yönetin
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: isMobile ? '12px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
              }}
            >
              🚪 Çıkış
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '16px' : '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          marginBottom: '24px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: '600', marginRight: '8px' }}>Durum:</span>
            {['all', 'pending', 'contacted', 'in-progress', 'completed', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  background: statusFilter === status ? '#10b981' : '#f3f4f6',
                  color: statusFilter === status ? 'white' : '#374151',
                  transition: 'all 0.2s'
                }}
              >
                {status === 'all' ? 'Tümü' : getStatusText(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Submissions List */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '24px' : '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 24px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📋 Talepler ({filteredSubmissions.length})
          </h2>

          {loading ? (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              Yükleniyor...
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              Henüz talep bulunmuyor.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(450px, 1fr))'
            }}>
              {filteredSubmissions.map((submission) => {
                const statusColor = getStatusColor(submission.status);
                return (
                  <div
                    key={submission._id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '20px',
                      transition: 'all 0.2s'
                    }}
                  >
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '16px',
                      paddingBottom: '12px',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: '#1f2937',
                          margin: '0 0 4px 0'
                        }}>
                          {submission.name}
                        </h3>
                        <div style={{
                          fontSize: '13px',
                          color: '#6b7280',
                          margin: '4px 0'
                        }}>
                          📞 {submission.phone}
                        </div>
                        {submission.email && (
                          <div style={{
                            fontSize: '13px',
                            color: '#6b7280',
                            margin: '4px 0'
                          }}>
                            ✉️ {submission.email}
                          </div>
                        )}
                      </div>
                      <span style={{
                        background: statusColor.bg,
                        color: statusColor.text,
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        whiteSpace: 'nowrap'
                      }}>
                        {getStatusText(submission.status)}
                      </span>
                    </div>

                    {/* Details */}
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                        gap: '12px',
                        marginBottom: '12px'
                      }}>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Hizmet Tipi:</span>
                          <div style={{ fontSize: '14px', color: '#1f2937', marginTop: '4px' }}>{submission.serviceType}</div>
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Teslimat:</span>
                          <div style={{ fontSize: '14px', color: '#1f2937', marginTop: '4px' }}>
                            {getDeliveryMethodText(submission.deliveryMethod)}
                          </div>
                        </div>
                        <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Cihaz:</span>
                          <div style={{ fontSize: '14px', color: '#1f2937', marginTop: '4px' }}>{submission.deviceInfo}</div>
                        </div>
                        <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Problem:</span>
                          <div style={{ fontSize: '14px', color: '#1f2937', marginTop: '4px', lineHeight: '1.5' }}>
                            {submission.problemDescription}
                          </div>
                        </div>
                        <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                          <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Adres:</span>
                          <div style={{ fontSize: '14px', color: '#1f2937', marginTop: '4px' }}>
                            {submission.address}, {submission.district}, {submission.city}
                          </div>
                        </div>
                        {submission.preferredDate && submission.preferredTime && (
                          <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Tercih Edilen Randevu:</span>
                            <div style={{ fontSize: '14px', color: '#1f2937', marginTop: '4px' }}>
                              {new Date(submission.preferredDate).toLocaleDateString('tr-TR')} - {submission.preferredTime}
                            </div>
                          </div>
                        )}
                        {submission.shippingMethod && (
                          <div style={{ gridColumn: isMobile ? '1' : '1 / -1' }}>
                            <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Kargo Yöntemi:</span>
                            <div style={{ fontSize: '14px', color: '#1f2937', marginTop: '4px' }}>{submission.shippingMethod}</div>
                          </div>
                        )}
                      </div>

                      {submission.notes && (
                        <div style={{
                          background: '#eff6ff',
                          border: '1px solid #dbeafe',
                          borderRadius: '8px',
                          padding: '12px',
                          marginTop: '12px'
                        }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#1e40af',
                            fontWeight: '500',
                            marginBottom: '4px'
                          }}>
                            Ek Notlar:
                          </div>
                          <div style={{
                            fontSize: '14px',
                            color: '#1e40af'
                          }}>
                            {submission.notes}
                          </div>
                        </div>
                      )}

                      {submission.adminNotes && (
                        <div style={{
                          background: '#f0fdf4',
                          border: '1px solid #bbf7d0',
                          borderRadius: '8px',
                          padding: '12px',
                          marginTop: '12px'
                        }}>
                          <div style={{
                            fontSize: '12px',
                            color: '#166534',
                            fontWeight: '500',
                            marginBottom: '4px'
                          }}>
                            Admin Notu:
                          </div>
                          <div style={{
                            fontSize: '14px',
                            color: '#166534'
                          }}>
                            {submission.adminNotes}
                          </div>
                        </div>
                      )}

                      <div style={{
                        fontSize: '12px',
                        color: '#9ca3af',
                        marginTop: '12px'
                      }}>
                        Oluşturulma: {new Date(submission.createdAt).toLocaleString('tr-TR')}
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      justifyContent: 'flex-end',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setShowModal(true);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        ✏️ Güncelle
                      </button>
                      
                      <button
                        onClick={() => handleDeleteSubmission(submission._id)}
                        style={{
                          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '8px 12px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Update Modal */}
      {showModal && selectedSubmission && (
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
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '24px' : '32px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '600',
              color: '#1f2937',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ✏️ Talebi Güncelle
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <strong>Müşteri:</strong> {selectedSubmission.name} - {selectedSubmission.phone}
            </div>

            <UpdateForm 
              submission={selectedSubmission}
              onSubmit={handleUpdateStatus}
              onCancel={() => {
                setShowModal(false);
                setSelectedSubmission(null);
              }}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// UpdateForm Component
function UpdateForm({ submission, onSubmit, onCancel, isMobile }: {
  submission: TechnicalServiceSubmission;
  onSubmit: (submissionId: string, status: string, adminNotes?: string) => void;
  onCancel: () => void;
  isMobile: boolean;
}) {
  const [status, setStatus] = React.useState(submission.status);
  const [adminNotes, setAdminNotes] = React.useState(submission.adminNotes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(submission._id, status, adminNotes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          color: '#374151'
        }}>
          Durum
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          style={{
            width: '100%',
            padding: isMobile ? '10px' : '12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: isMobile ? '14px' : '16px',
            boxSizing: 'border-box'
          }}
        >
          <option value="pending">⏳ Beklemede</option>
          <option value="contacted">📞 İletişimde</option>
          <option value="in-progress">🔧 İşlemde</option>
          <option value="completed">✅ Tamamlandı</option>
          <option value="cancelled">❌ İptal Edildi</option>
        </select>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          color: '#374151'
        }}>
          Admin Notları
        </label>
        <textarea
          value={adminNotes}
          onChange={(e) => setAdminNotes(e.target.value)}
          style={{
            width: '100%',
            padding: isMobile ? '10px' : '12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: isMobile ? '14px' : '16px',
            boxSizing: 'border-box',
            minHeight: '100px',
            resize: 'vertical'
          }}
          placeholder="Talep hakkında notlar..."
        />
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end'
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '8px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          İptal
        </button>
        <button
          type="submit"
          style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: 'pointer',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
        >
          Güncelle
        </button>
      </div>
    </form>
  );
}

