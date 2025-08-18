'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Offer {
  amount: number;
  notes: string;
  date: string;
}

interface Submission {
  _id: string;
  category: string;
  brand: string;
  model: string;
  processor?: string;
  graphicsCard?: string;
  wattValue?: string;
  ram?: string;
  storage?: string;
  refreshRate?: string;
  screenSize?: string;
  batteryHealth?: string;
  cosmeticCondition: string;
  screenStatus?: string;
  deadPixelCount?: string;
  hasBox: boolean;
  hasInvoice: boolean;
  invoiceDate?: string;
  quantity: number;
  createdAt: string;
  status: string;
  adminNotes?: string;
  images: string[];
  offer?: Offer;
  listing?: {
    price: number;
    title: string;
    description: string;
    date: string;
  };
  rejectionReason?: string;
  rejectedAt?: string;
}

export default function TekliflerimPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [actionType, setActionType] = useState<'accept' | 'reject' | null>(null);
  const [actionNote, setActionNote] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    fetchSubmissions();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/notebook-submissions');
      const data = await response.json();
      
      if (response.ok) {
        setSubmissions(data.submissions || []);
      } else {
        console.error('Veri çekme hatası:', data.error);
      }
    } catch (error) {
      console.error('API hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Beklemede';
      case 'offered': return 'Teklif Verildi';
      case 'listed': return 'İlan Oluşturuldu';
      case 'rejected': return 'Reddedildi';
      case 'approved': return 'Onaylandı';
      case 'accepted': return 'Teklif Kabul Edildi';
      case 'customer_rejected': return 'Teklif Reddedildi';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'offered': return '#2563eb';
      case 'listed': return '#059669';
      case 'rejected': return '#dc2626';
      case 'approved': return '#059669';
      case 'accepted': return '#059669';
      case 'customer_rejected': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const handleAction = (submission: Submission, type: 'accept' | 'reject') => {
    setSelectedSubmission(submission);
    setActionType(type);
    setActionNote('');
    setShowActionModal(true);
  };

  const handleSubmitAction = async () => {
    if (!selectedSubmission || !actionType) return;

    try {
      const response = await fetch('/api/notebook-submissions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submissionId: selectedSubmission._id,
          action: actionType === 'accept' ? 'customerAccept' : 'customerReject',
          data: {
            note: actionNote
          }
        }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchSubmissions();
        setShowActionModal(false);
        setSelectedSubmission(null);
        setActionType(null);
        setActionNote('');
        alert(actionType === 'accept' ? 'Teklif başarıyla kabul edildi!' : 'Teklif reddedildi!');
      } else {
        alert('Hata: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Bir hata oluştu!');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: isMobile ? '20px' : '40px', 
        textAlign: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
      }}>
        <h2 style={{
          fontSize: isMobile ? '20px' : '24px',
          color: '#374151'
        }}>
          Yükleniyor...
        </h2>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: isMobile ? '20px 12px' : '40px', 
      maxWidth: isMobile ? '100%' : '1200px', 
      margin: '0 auto', 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: isMobile ? '30px' : '40px'
      }}>
        <h1 style={{
          fontSize: isMobile ? '24px' : '32px',
          fontWeight: '700',
          color: '#1f2937',
          marginBottom: '8px'
        }}>
          Tekliflerim
        </h1>
        <p style={{
          fontSize: isMobile ? '14px' : '16px',
          color: '#6b7280',
          margin: 0
        }}>
          Satış talepleriniz ve teklifleriniz
        </p>
      </div>

      {submissions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '40px 20px' : '60px 40px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{
            fontSize: isMobile ? '48px' : '64px',
            marginBottom: '16px'
          }}>
            📝
          </div>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '8px'
          }}>
            Henüz talebiniz yok
          </h3>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            marginBottom: '24px'
          }}>
            Satış talebi oluşturmak için aşağıdaki butona tıklayın
          </p>
          <button
            onClick={() => router.push('/bize-sat')}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: isMobile ? '12px 24px' : '16px 32px',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
          >
            Satış Talebi Oluştur
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: isMobile ? '16px' : '24px'
        }}>
          {submissions.map((submission) => (
            <div key={submission._id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: isMobile ? '20px' : '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '16px',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h3 style={{
                    fontSize: isMobile ? '16px' : '18px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    {submission.brand} {submission.model}
                  </h3>
                  <p style={{
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    Talep Tarihi: {formatDate(submission.createdAt)}
                  </p>
                </div>
                <div style={{
                  background: getStatusColor(submission.status),
                  color: 'white',
                  padding: isMobile ? '6px 12px' : '8px 16px',
                  borderRadius: '20px',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: '500'
                }}>
                  {getStatusText(submission.status)}
                </div>
              </div>

              {/* Product Details */}
              <div style={{
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '8px',
                padding: isMobile ? '16px' : '20px',
                marginBottom: '16px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <div style={{
                    background: '#64748b',
                    color: 'white',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginRight: '10px'
                  }}>
                    💻
                  </div>
                  <h4 style={{
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    color: '#334155',
                    margin: 0
                  }}>
                    Ürün Özellikleri
                  </h4>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: isMobile ? '12px' : '16px'
                }}>
                  {/* Marka & Model - En Önemli */}
                  <div style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>MARKA & MODEL</span>
                    <div style={{ 
                      fontSize: isMobile ? '15px' : '16px', 
                      fontWeight: '600', 
                      color: '#1e293b',
                      marginTop: '4px'
                    }}>
                      {submission.brand} {submission.model}
                    </div>
                  </div>

                  {/* İşlemci - Kritik */}
                  {submission.processor && (
                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>İŞLEMCİ</span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '15px', 
                        fontWeight: '500', 
                        color: '#1e293b',
                        marginTop: '4px'
                      }}>
                        {submission.processor}
                      </div>
                    </div>
                  )}

                  {/* Ekran Kartı - Kritik */}
                  {submission.graphicsCard && (
                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>EKRAN KARTI</span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '15px', 
                        fontWeight: '500', 
                        color: '#1e293b',
                        marginTop: '4px'
                      }}>
                        {submission.graphicsCard}
                      </div>
                    </div>
                  )}

                  {/* RAM - Önemli */}
                  {submission.ram && (
                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>RAM</span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '15px', 
                        fontWeight: '500', 
                        color: '#1e293b',
                        marginTop: '4px'
                      }}>
                        {submission.ram}
                      </div>
                    </div>
                  )}

                  {/* Depolama - Önemli */}
                  {submission.storage && (
                    <div style={{
                      background: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>DEPOLAMA</span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '15px', 
                        fontWeight: '500', 
                        color: '#1e293b',
                        marginTop: '4px'
                      }}>
                        {submission.storage}
                      </div>
                    </div>
                  )}

                  {/* Durum - Kritik */}
                  <div style={{
                    background: 'white',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0'
                  }}>
                    <span style={{ fontSize: isMobile ? '11px' : '12px', color: '#64748b', fontWeight: '500' }}>DURUM</span>
                    <div style={{ 
                      fontSize: isMobile ? '14px' : '15px', 
                      fontWeight: '500', 
                      color: '#1e293b',
                      marginTop: '4px'
                    }}>
                      {submission.cosmeticCondition}
                    </div>
                  </div>
                </div>
              </div>

              {/* Offer Section */}
              {submission.status === 'offered' && (
                <div style={{
                  background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
                  borderRadius: '8px',
                  padding: isMobile ? '16px' : '20px',
                  marginBottom: '16px',
                  border: '1px solid #93c5fd'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      background: '#2563eb',
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginRight: '12px'
                    }}>
                      💰
                    </div>
                    <div>
                      <h4 style={{
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: '600',
                        color: '#1e40af',
                        margin: 0
                      }}>
                        💰 Teklifiniz
                      </h4>
                      <p style={{
                        fontSize: isMobile ? '12px' : '14px',
                        color: '#1e40af',
                        margin: '4px 0 0 0',
                        opacity: 0.8
                      }}>
                        Size özel fiyat teklifimiz
                      </p>
                    </div>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '16px'
                  }}>
                    <div>
                      <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#1e40af', fontWeight: '600' }}>Teklif Tutarı:</span>
                      <div style={{ 
                        fontSize: isMobile ? '20px' : '24px', 
                        fontWeight: '700', 
                        color: '#1e40af',
                        marginTop: '8px',
                        background: 'rgba(255, 255, 255, 0.3)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        border: '2px solid rgba(255, 255, 255, 0.5)'
                      }}>
                        {(() => {
                          const match = submission.adminNotes?.match(/TEKLİF: (\d+) TL/);
                          return match ? formatPrice(parseInt(match[1])) : 'Belirtilmemiş';
                        })()}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#1e40af', fontWeight: '600' }}>Teklif Tarihi:</span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        fontWeight: '500', 
                        color: '#1e40af',
                        marginTop: '8px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '8px 12px',
                        borderRadius: '6px'
                      }}>
                        {formatDate(submission.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#1e40af', fontWeight: '600' }}>Teklif Notları:</span>
                    <div style={{ 
                      fontSize: isMobile ? '14px' : '16px', 
                      color: '#1e40af',
                      marginTop: '8px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '16px',
                      borderRadius: '8px',
                      lineHeight: '1.6',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                      {(() => {
                        const match = submission.adminNotes?.match(/TEKLİF: \d+ TL - (.+)/);
                        return match ? match[1] : 'Not bulunmuyor';
                      })()}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {submission.status === 'offered' && (
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      marginTop: '20px',
                      flexWrap: 'wrap'
                    }}>
                      <button
                        onClick={() => handleAction(submission, 'accept')}
                        style={{
                          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: isMobile ? '12px 20px' : '14px 24px',
                          fontSize: isMobile ? '14px' : '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                        }}
                      >
                        ✅ Teklifi Kabul Et
                      </button>
                      <button
                        onClick={() => handleAction(submission, 'reject')}
                        style={{
                          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: isMobile ? '12px 20px' : '14px 24px',
                          fontSize: isMobile ? '14px' : '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                        }}
                      >
                        ❌ Teklifi Reddet
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Listing Section */}
              {submission.listing && (
                <div style={{
                  background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
                  borderRadius: '8px',
                  padding: isMobile ? '16px' : '20px',
                  marginBottom: '16px',
                  border: '1px solid #6ee7b7'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      background: '#059669',
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginRight: '12px'
                    }}>
                      📋
                    </div>
                    <h4 style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '600',
                      color: '#065f46',
                      margin: 0
                    }}>
                      İlan Detayları
                    </h4>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    <div>
                      <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#065f46' }}>İlan Başlığı:</span>
                      <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '500', color: '#065f46' }}>
                        {submission.listing.title}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#065f46' }}>İlan Fiyatı:</span>
                      <div style={{ 
                        fontSize: isMobile ? '18px' : '20px', 
                        fontWeight: '700', 
                        color: '#065f46',
                        marginTop: '4px'
                      }}>
                        {formatPrice(submission.listing.price)}
                      </div>
                    </div>
                  </div>
                  {submission.listing.description && (
                    <div style={{ marginTop: '12px' }}>
                      <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#065f46' }}>Açıklama:</span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#065f46',
                        marginTop: '4px'
                      }}>
                        {submission.listing.description}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Rejection Section */}
              {submission.rejectionReason && (
                <div style={{
                  background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  borderRadius: '8px',
                  padding: isMobile ? '16px' : '20px',
                  marginBottom: '16px',
                  border: '1px solid #fca5a5'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      background: '#dc2626',
                      color: 'white',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      marginRight: '12px'
                    }}>
                      ❌
                    </div>
                    <h4 style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '600',
                      color: '#991b1b',
                      margin: 0
                    }}>
                      Reddetme Sebebi
                    </h4>
                  </div>
                  <div style={{ 
                    fontSize: isMobile ? '14px' : '16px', 
                    color: '#991b1b'
                  }}>
                    {submission.rejectionReason}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              {submission.adminNotes && (
                <div style={{
                  background: '#f9fafb',
                  borderRadius: '8px',
                  padding: isMobile ? '16px' : '20px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h4 style={{
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 8px 0'
                  }}>
                    Admin Notları:
                  </h4>
                  <p style={{
                    fontSize: isMobile ? '14px' : '16px',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {submission.adminNotes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && selectedSubmission && actionType && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: isMobile ? '24px' : '32px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '550px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.15)',
            animation: 'slideInUp 0.3s ease-out',
            position: 'relative'
          }}>
            {/* Close Button */}
            <button
              onClick={() => {
                setShowActionModal(false);
                setSelectedSubmission(null);
                setActionType(null);
                setActionNote('');
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#f3f4f6',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '18px',
                color: '#6b7280',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{
              textAlign: 'center',
              marginBottom: '24px',
              paddingTop: '8px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: actionType === 'accept' 
                  ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                  : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                fontSize: '28px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
              }}>
                {actionType === 'accept' ? '✅' : '❌'}
              </div>
              <h2 style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                {actionType === 'accept' ? 'Teklifi Kabul Et' : 'Teklifi Reddet'}
              </h2>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {actionType === 'accept' 
                  ? 'Bu teklifi kabul etmek istediğinizden emin misiniz?' 
                  : 'Bu teklifi reddetmek istediğinizden emin misiniz?'}
              </p>
            </div>

            {/* Product Info */}
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <div style={{
                  background: '#64748b',
                  color: 'white',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  marginRight: '12px'
                }}>
                  💻
                </div>
                <h3 style={{
                  fontSize: isMobile ? '16px' : '18px',
                  fontWeight: '600',
                  color: '#334155',
                  margin: 0
                }}>
                  Ürün Bilgileri
                </h3>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '12px'
              }}>
                <div>
                  <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#64748b', fontWeight: '500' }}>Marka & Model:</span>
                  <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: '#1e293b' }}>
                    {selectedSubmission.brand} {selectedSubmission.model}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#64748b', fontWeight: '500' }}>Teklif Tutarı:</span>
                  <div style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: '600', color: '#1e293b' }}>
                    {(() => {
                      const match = selectedSubmission.adminNotes?.match(/TEKLİF: (\d+) TL/);
                      return match ? formatPrice(parseInt(match[1])) : 'Belirtilmemiş';
                    })()}
                  </div>
                </div>
              </div>
            </div>

            {/* Note Input */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: '#374151'
              }}>
                {actionType === 'accept' ? 'Kabul Notu (Opsiyonel):' : 'Reddetme Sebebi:'}
              </label>
              <textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: isMobile ? '14px' : '16px',
                  boxSizing: 'border-box',
                  minHeight: '100px',
                  resize: 'vertical',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit'
                }}
                placeholder={actionType === 'accept' 
                  ? 'Kabul notunuzu yazabilirsiniz (opsiyonel)...' 
                  : 'Reddetme sebebinizi yazın...'}
                onFocus={(e) => {
                  e.target.style.borderColor = actionType === 'accept' ? '#10b981' : '#ef4444';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setSelectedSubmission(null);
                  setActionType(null);
                  setActionNote('');
                }}
                style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: isMobile ? '14px 24px' : '16px 32px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e5e7eb';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                İptal
              </button>
              <button
                onClick={handleSubmitAction}
                style={{
                  background: actionType === 'accept' 
                    ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                    : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: isMobile ? '14px 24px' : '16px 32px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: actionType === 'accept' 
                    ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                    : '0 4px 12px rgba(220, 38, 38, 0.3)',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = actionType === 'accept' 
                    ? '0 6px 20px rgba(5, 150, 105, 0.4)'
                    : '0 6px 20px rgba(220, 38, 38, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = actionType === 'accept' 
                    ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                    : '0 4px 12px rgba(220, 38, 38, 0.3)';
                }}
              >
                {actionType === 'accept' ? '✅ Kabul Et' : '❌ Reddet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 