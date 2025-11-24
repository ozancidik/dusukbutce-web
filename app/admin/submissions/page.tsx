"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  userId?: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    birthDate?: string;
    address?: string;
  };
}

export default function AdminSubmissions() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState<Submission['userId'] | null>(null);
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

    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/notebook-submissions');
        const data = await response.json();
        if (data.success) {
          setSubmissions(data.submissions);
        }
      } catch (error) {
        console.error('Submission\'lar çekilirken hata:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    checkAdminStatus();
    
    if (isAuthenticated) {
      fetchSubmissions();
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [router, isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    window.location.reload();
  };

  const handleSubmitAction = async (formData: any) => {
    if (!selectedSubmission) return;

    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: selectedSubmission._id,
          action: modalType === 'offer' ? 'addOffer' : 
                  modalType === 'listing' ? 'createListing' : 
                  modalType === 'reject' ? 'reject' : modalType,
          data: formData
        })
      });

      const result = await response.json();

      if (result.success) {
        // Submission listesini yenile
        const submissionsResponse = await fetch('/api/notebook-submissions');
        const submissionsData = await submissionsResponse.json();
        if (submissionsData.success) {
          setSubmissions(submissionsData.submissions);
        }

        // Modal'ı kapat
        setShowModal(false);
        setSelectedSubmission(null);
        setModalType('');

        // Toast mesajı göster
        if (modalType === 'offer') {
          alert('Teklifiniz kullanıcıya iletildi!');
        } else {
          const actionText = modalType === 'listing' ? 'İlan' : 
                            modalType === 'reject' ? 'Reddetme' : 'İşlem';
          alert(`${actionText} başarıyla tamamlandı!`);
        }
      } else {
        alert(`Hata: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu!');
    }
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
                  📋 Teklif Yönetimi
                </h1>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Notebook tekliflerini yönetin ve değerlendirin
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
            📋 Notebook Teklifleri ({submissions.length})
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
          ) : submissions.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              Henüz teklif bulunmuyor.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))'
            }}>
              {submissions.map((submission) => (
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
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 4px 0'
                      }}>
                        {submission.brand} {submission.model}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        margin: '0'
                      }}>
                        {submission.processor} - {submission.ram}GB RAM
                      </p>
                    </div>
                    <span style={{
                      background: (() => {
                        switch (submission.status) {
                          case 'pending': return '#fef3c7';
                          case 'offered': return '#dbeafe';
                          case 'listed': return '#dcfce7';
                          case 'rejected': return '#fecaca';
                          case 'accepted': return '#dcfce7';
                          case 'customer_rejected': return '#fecaca';
                          default: return '#f3f4f6';
                        }
                      })(),
                      color: (() => {
                        switch (submission.status) {
                          case 'pending': return '#92400e';
                          case 'offered': return '#1e40af';
                          case 'listed': return '#166534';
                          case 'rejected': return '#991b1b';
                          case 'accepted': return '#166534';
                          case 'customer_rejected': return '#991b1b';
                          default: return '#374151';
                        }
                      })(),
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {(() => {
                        switch (submission.status) {
                          case 'pending': return '⏳ Beklemede';
                          case 'offered': return '💰 Teklif Verildi';
                          case 'listed': return '📋 İlan Oluşturuldu';
                          case 'rejected': return '❌ Reddedildi';
                          case 'accepted': return '✅ Kabul Edildi';
                          case 'customer_rejected': return '❌ Müşteri Reddetti';
                          default: return submission.status;
                        }
                      })()}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <div>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Ekran:</span>
                      <div style={{ fontSize: '14px', color: '#1f2937' }}>{submission.screenSize}"</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>Depolama:</span>
                      <div style={{ fontSize: '14px', color: '#1f2937' }}>{submission.storage}</div>
                    </div>
                  </div>

                  {submission.adminNotes && (
                    <div style={{
                      background: '#eff6ff',
                      border: '1px solid #dbeafe',
                      borderRadius: '8px',
                      padding: '12px',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        fontSize: '12px',
                        color: '#1e40af',
                        fontWeight: '500',
                        marginBottom: '4px'
                      }}>
                        Admin Notu:
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#1e40af'
                      }}>
                        {submission.adminNotes}
                      </div>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap'
                  }}>
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setModalType('offer');
                        setShowModal(true);
                      }}
                      disabled={submission.status !== 'pending'}
                      style={{
                        background: submission.status === 'pending'
                          ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
                          : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        cursor: submission.status === 'pending' ? 'pointer' : 'not-allowed',
                        fontWeight: '500',
                        opacity: submission.status === 'pending' ? 1 : 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      💰 {submission.status === 'offered' ? 'Teklif Verildi' : 'Teklif Ver'}
                    </button>
                    
                    {submission.status === 'accepted' && (
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setModalType('listing');
                          setShowModal(true);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
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
                        📋 İlan Oluştur
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setModalType('reject');
                        setShowModal(true);
                      }}
                      disabled={submission.status !== 'pending' && submission.status !== 'offered'}
                      style={{
                        background: (submission.status === 'pending' || submission.status === 'offered')
                          ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                          : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        cursor: (submission.status === 'pending' || submission.status === 'offered') ? 'pointer' : 'not-allowed',
                        fontWeight: '500',
                        opacity: (submission.status === 'pending' || submission.status === 'offered') ? 1 : 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      ❌ {submission.status === 'rejected' ? 'Reddedildi' : 'Reddet'}
                    </button>
                    
                    <button
                      onClick={() => {
                        if (submission.userId) {
                          setSelectedUserInfo(submission.userId);
                          setShowUserInfoModal(true);
                        } else {
                          alert('Kullanıcı bilgileri bulunamadı.');
                        }
                      }}
                      disabled={!submission.userId}
                      style={{
                        background: submission.userId
                          ? 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)'
                          : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        cursor: submission.userId ? 'pointer' : 'not-allowed',
                        fontWeight: '500',
                        opacity: submission.userId ? 1 : 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      👤 Kullanıcı Bilgileri
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Teklif Verme Modal */}
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
              {modalType === 'offer' && '💰 Teklif Ver'}
              {modalType === 'listing' && '📋 İlan Oluştur'}
              {modalType === 'reject' && '❌ Talebi Reddet'}
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <strong>Ürün:</strong> {selectedSubmission.brand} {selectedSubmission.model}
            </div>

            <ActionForm 
              type={modalType} 
              onSubmit={handleSubmitAction}
              onCancel={() => {
                setShowModal(false);
                setSelectedSubmission(null);
                setModalType('');
              }}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}

      {/* Kullanıcı Bilgileri Modal */}
      {showUserInfoModal && selectedUserInfo && (
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
              margin: '0 0 24px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              👤 Kullanıcı Bilgileri
            </h2>

            <div style={{
              display: 'grid',
              gap: '16px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px'
                }}>
                  Ad Soyad
                </label>
                <div style={{
                  padding: '12px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1f2937',
                  border: '1px solid #e5e7eb'
                }}>
                  {selectedUserInfo.name || '-'}
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px'
                }}>
                  E-posta
                </label>
                <div style={{
                  padding: '12px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1f2937',
                  border: '1px solid #e5e7eb'
                }}>
                  {selectedUserInfo.email || '-'}
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#6b7280',
                  marginBottom: '6px'
                }}>
                  Telefon
                </label>
                <div style={{
                  padding: '12px',
                  background: '#f9fafb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1f2937',
                  border: '1px solid #e5e7eb'
                }}>
                  {selectedUserInfo.phone || '-'}
                </div>
              </div>

              {selectedUserInfo.birthDate && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '6px'
                  }}>
                    Doğum Tarihi
                  </label>
                  <div style={{
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#1f2937',
                    border: '1px solid #e5e7eb'
                  }}>
                    {typeof selectedUserInfo.birthDate === 'string' 
                      ? new Date(selectedUserInfo.birthDate).toLocaleDateString('tr-TR')
                      : selectedUserInfo.birthDate || '-'}
                  </div>
                </div>
              )}

              {selectedUserInfo.address && (
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#6b7280',
                    marginBottom: '6px'
                  }}>
                    Adres
                  </label>
                  <div style={{
                    padding: '12px',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#1f2937',
                    border: '1px solid #e5e7eb',
                    minHeight: '60px'
                  }}>
                    {selectedUserInfo.address || '-'}
                  </div>
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '24px',
              gap: '12px'
            }}>
              <button
                onClick={() => {
                  setShowUserInfoModal(false);
                  setSelectedUserInfo(null);
                }}
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
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ActionForm Component
function ActionForm({ type, onSubmit, onCancel, isMobile }: {
  type: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isMobile: boolean;
}) {
  const [formData, setFormData] = React.useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'offer' && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Teklif Tutarı (TL)
            </label>
            <input
              type="number"
              required
              value={formData.amount || ''}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value))}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Örn: 5000"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Notlar
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="Teklif hakkında notlar..."
            />
          </div>
        </>
      )}

      {type === 'listing' && (
        <>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Satış Fiyatı (TL)
            </label>
            <input
              type="number"
              required
              value={formData.price || ''}
              onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Örn: 7500"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              İlan Başlığı
            </label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Örn: Dell Inspiron 15 3000"
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Açıklama
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              style={{
                width: '100%',
                padding: isMobile ? '10px' : '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: isMobile ? '14px' : '16px',
                boxSizing: 'border-box',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="Ürün hakkında detaylı açıklama..."
            />
          </div>
        </>
      )}

      {type === 'reject' && (
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Reddetme Sebebi
          </label>
          <textarea
            required
            value={formData.reason || ''}
            onChange={(e) => handleInputChange('reason', e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box',
              minHeight: '80px',
              resize: 'vertical'
            }}
            placeholder="Neden reddedildiğini açıklayın..."
          />
        </div>
      )}

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
            background: type === 'offer' ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' :
                       type === 'listing' ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)' :
                       'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
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
          {type === 'offer' && 'Teklif Ver'}
          {type === 'listing' && 'İlan Oluştur'}
          {type === 'reject' && 'Reddet'}
        </button>
      </div>
    </form>
  );
}
