"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  images: string[]; // Base64 encoded images
  // Ekran kartı özel alanları
  memory?: string;
  memoryType?: string;
  coreClock?: string;
  boostClock?: string;
  powerConsumption?: string;
  ports?: string;
  // Interface alanı (ekran kartı için)
  interface?: string;
  customerResponse?: {
    action: 'accepted' | 'rejected';
    note?: string;
    reason?: string;
    date: string;
  };
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'offer' | 'listing' | 'reject' | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalType, setDeleteModalType] = useState<'single' | 'all' | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!adminLoggedIn) {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    fetchSubmissions();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('loginTime');
    
    // Header'a logout mesajı gönder
    window.dispatchEvent(new CustomEvent('logout'));
    
    router.push('/admin/login');
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions');
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

  // Filtrelenmiş submission'ları hesapla
  const filteredSubmissions = selectedCategory === 'all' 
    ? submissions 
    : submissions.filter(submission => submission.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAction = (submission: Submission, action: 'offer' | 'listing' | 'reject') => {
    setSelectedSubmission(submission);
    setModalType(action);
    setShowModal(true);
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
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
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Submissions listesini güncelle
        await fetchSubmissions();
        setShowModal(false);
        setSelectedSubmission(null);
        setModalType(null);
        
        // Başarı mesajını göster
        const actionText = modalType === 'offer' ? 'Teklif' : 
                          modalType === 'listing' ? 'İlan' : 
                          modalType === 'reject' ? 'Reddetme' : 'İşlem';
        showToastMessage(`${actionText} başarıyla tamamlandı!`, 'success');
      } else {
        showToastMessage(`Hata: ${result.message}`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showToastMessage('Bir hata oluştu!', 'error');
    }
  };

  const handleDeleteAllSubmissions = () => {
    setDeleteModalType('all');
    setShowDeleteModal(true);
  };

  const handleDeleteSubmission = (submissionId: string) => {
    setDeleteModalType('single');
    setDeleteTargetId(submissionId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteModalType === 'all') {
      setIsDeletingAll(true);
      try {
        const response = await fetch('/api/admin/submissions', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'deleteAll' }),
        });

        const data = await response.json();

        if (data.success) {
          showToastMessage(data.message, 'success');
          setSubmissions([]); // UI'dan da temizle
        } else {
          showToastMessage(data.message || 'İlanlar silinirken bir hata oluştu', 'error');
        }
      } catch (error) {
        console.error('Error deleting all submissions:', error);
        showToastMessage('Bağlantı hatası oluştu', 'error');
      } finally {
        setIsDeletingAll(false);
      }
    } else if (deleteModalType === 'single' && deleteTargetId) {
      try {
        const response = await fetch('/api/admin/submissions', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action: 'deleteOne', submissionId: deleteTargetId }),
        });

        const data = await response.json();

        if (data.success) {
          showToastMessage(data.message, 'success');
          // UI'dan da temizle
          setSubmissions(prev => prev.filter(sub => sub._id !== deleteTargetId));
        } else {
          showToastMessage(data.message || 'İlan silinirken bir hata oluştu', 'error');
        }
      } catch (error) {
        console.error('Error deleting submission:', error);
        showToastMessage('Bağlantı hatası oluştu', 'error');
      }
    }

    // Modal'ı kapat
    setShowDeleteModal(false);
    setDeleteModalType(null);
    setDeleteTargetId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteModalType(null);
    setDeleteTargetId(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div style={{ 
        padding: isMobile ? '20px' : '40px', 
        textAlign: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #4b5563 100%)'
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
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: isMobile ? '20px 12px' : '40px'
    }}>
      {/* Header */}
      <div style={{
        maxWidth: isMobile ? '100%' : '1400px',
        margin: '0 auto',
        position: 'relative'
      }}>
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
              <div style={{
                marginTop: '12px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <Link href="/listings" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
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
                    boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(5, 150, 105, 0.3)';
                  }}
                  >
                    📋 İlanları Görüntüle
                  </button>
                </Link>
                
                <button
                  onClick={handleDeleteAllSubmissions}
                  disabled={isDeletingAll}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    fontWeight: '600',
                    cursor: isDeletingAll ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)',
                    opacity: isDeletingAll ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!isDeletingAll) {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDeletingAll) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.3)';
                    }
                  }}
                >
                  {isDeletingAll ? '🗑️ Siliniyor...' : '🗑️ Tüm İlanları Sil'}
                </button>
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
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
                {submissions.length} Talep
              </div>
              
              <button
                onClick={handleLogout}
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
                  boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
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
                🚪 Çıkış
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Filtresi */}
      <div style={{
        maxWidth: isMobile ? '100%' : '1400px',
        margin: '0 auto 24px auto'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: isMobile ? '16px' : '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <span style={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Kategori Filtresi:
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: isMobile ? '14px' : '16px',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <option value="all">Tüm Kategoriler</option>
              <option value="notebook">Dizüstü Bilgisayar</option>
              <option value="desktop">Masaüstü Bilgisayar</option>
              <option value="graphics-card">Ekran Kartı</option>
              <option value="processor">İşlemci</option>
              <option value="monitor">Monitör</option>
              <option value="keyboard">Klavye</option>
              <option value="mouse">Fare</option>
              <option value="headphones">Kulaklık</option>
              <option value="ram">RAM</option>
              <option value="ssd">SSD</option>
              <option value="tablet">Tablet</option>
              <option value="audio-system">Ses Sistemi</option>
              <option value="case">Kasa</option>
              <option value="cooler">Soğutucu</option>
              <option value="gaming-wheel">Gaming Direksiyon</option>
              <option value="sound-system">Ses Sistemi</option>
            </select>
            <span style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#6b7280'
            }}>
              {filteredSubmissions.length} talep bulundu
            </span>
          </div>
        </div>
      </div>

      {filteredSubmissions.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: isMobile ? '40px 20px' : '80px 40px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: isMobile ? '18px' : '24px',
            color: '#374151',
            marginBottom: '16px'
          }}>
            Henüz talep bulunmuyor
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Müşterilerden gelen talepler burada görünecek.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: isMobile ? '20px' : '24px',
          maxWidth: isMobile ? '100%' : '1400px',
          margin: '0 auto'
        }}>
          {filteredSubmissions.map((submission) => (
            <div key={submission._id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: isMobile ? '24px' : '32px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
            >
              {/* Status Badge */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: (() => {
                  switch (submission.status) {
                    case 'pending': return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
                    case 'offered': return 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)';
                    case 'listed': return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
                    case 'rejected': return 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
                    case 'accepted': return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
                    case 'customer_rejected': return 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
                    default: return 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)';
                  }
                })(),
                color: 'white',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: isMobile ? '10px' : '11px',
                fontWeight: '600',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                zIndex: 10
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
              </div>
              {/* Başlık ve Tarih */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: isMobile ? '12px' : '16px',
                marginTop: isMobile ? '20px' : '24px',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '8px' : '0'
              }}>
                <div>
                  <h3 style={{
                    fontSize: isMobile ? '18px' : '20px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 4px 0'
                  }}>
                    {submission.brand} {submission.model}
                  </h3>
                  <span style={{
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#6b7280',
                    background: '#f1f5f9',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    textTransform: 'capitalize'
                  }}>
                    {submission.category === 'graphics-card' ? 'Ekran Kartı' :
                     submission.category === 'notebook' ? 'Dizüstü Bilgisayar' :
                     submission.category === 'desktop' ? 'Masaüstü Bilgisayar' :
                     submission.category === 'processor' ? 'İşlemci' :
                     submission.category === 'monitor' ? 'Monitör' :
                     submission.category === 'keyboard' ? 'Klavye' :
                     submission.category === 'mouse' ? 'Fare' :
                     submission.category === 'headphones' ? 'Kulaklık' :
                     submission.category === 'ram' ? 'RAM' :
                     submission.category === 'ssd' ? 'SSD' :
                     submission.category === 'tablet' ? 'Tablet' :
                     submission.category === 'audio-system' ? 'Ses Sistemi' :
                     submission.category === 'case' ? 'Kasa' :
                     submission.category === 'cooler' ? 'Soğutucu' :
                     submission.category === 'gaming-wheel' ? 'Gaming Direksiyon' :
                     submission.category === 'sound-system' ? 'Ses Sistemi' :
                     submission.category}
                  </span>
                </div>
                <span style={{
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#6b7280',
                  background: '#f3f4f6',
                  padding: isMobile ? '4px 8px' : '6px 12px',
                  borderRadius: '6px'
                }}>
                  {formatDate(submission.createdAt)}
                </span>
              </div>

              {/* Teknik Özellikler */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '12px' : '16px',
                marginBottom: isMobile ? '12px' : '16px'
              }}>
                {submission.category !== 'graphics-card' && (
                  <div>
                    <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                      İşlemci:
                    </strong>
                    <span style={{ 
                      fontSize: isMobile ? '14px' : '16px', 
                      color: '#6b7280',
                      marginLeft: '8px'
                    }}>
                      {submission.processor}
                    </span>
                  </div>
                )}
                {submission.category === 'graphics-card' && (
                  <>
                    <div>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                        Bellek:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {submission.memory} {submission.memoryType}
                      </span>
                    </div>
                    <div>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                        Core Clock:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {submission.coreClock}
                      </span>
                    </div>
                    <div>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                        Boost Clock:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {submission.boostClock}
                      </span>
                    </div>
                    <div>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                        Güç Tüketimi:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {submission.powerConsumption}
                      </span>
                    </div>
                    <div>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                        Portlar:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {submission.ports}
                      </span>
                    </div>
                  </>
                )}
                {submission.category !== 'graphics-card' && (
                  <div>
                    <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                      Ekran Kartı:
                    </strong>
                    <span style={{ 
                      fontSize: isMobile ? '14px' : '16px', 
                      color: '#6b7280',
                      marginLeft: '8px'
                    }}>
                      {submission.graphicsCard}
                    </span>
                  </div>
                )}
                {submission.category !== 'graphics-card' && (
                  <>
                    <div>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                        RAM:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {submission.ram}
                      </span>
                    </div>
                    <div>
                      <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                        Depolama:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {submission.storage}
                      </span>
                    </div>
                  </>
                )}
                {submission.category !== 'graphics-card' && submission.wattValue && (
                  <div>
                    <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                      Watt:
                    </strong>
                    <span style={{ 
                      fontSize: isMobile ? '14px' : '16px', 
                      color: '#6b7280',
                      marginLeft: '8px'
                    }}>
                      {submission.wattValue}
                    </span>
                  </div>
                )}
                {submission.category !== 'graphics-card' && submission.refreshRate && (
                  <div>
                    <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                      Tazeleme Hızı:
                    </strong>
                    <span style={{ 
                      fontSize: isMobile ? '14px' : '16px', 
                      color: '#6b7280',
                      marginLeft: '8px'
                    }}>
                      {submission.refreshRate}
                    </span>
                  </div>
                )}
              </div>

              {/* Durum Bilgileri */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '8px' : '12px',
                marginBottom: isMobile ? '12px' : '16px'
              }}>
                <div>
                  <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                    Kozmetik Durum:
                  </strong>
                  <span style={{ 
                    fontSize: isMobile ? '14px' : '16px', 
                    color: '#6b7280',
                    marginLeft: '8px'
                  }}>
                    {submission.cosmeticCondition}
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                    Kutu:
                  </strong>
                  <span style={{ 
                    fontSize: isMobile ? '14px' : '16px', 
                    color: submission.hasBox ? '#059669' : '#dc2626',
                    marginLeft: '8px'
                  }}>
                    {submission.hasBox ? 'Var' : 'Yok'}
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                    Fatura:
                  </strong>
                  <span style={{ 
                    fontSize: isMobile ? '14px' : '16px', 
                    color: submission.hasInvoice ? '#059669' : '#dc2626',
                    marginLeft: '8px'
                  }}>
                    {submission.hasInvoice ? 'Var' : 'Yok'}
                  </span>
                </div>
                <div>
                  <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                    Resim Sayısı:
                  </strong>
                  <span style={{ 
                    fontSize: isMobile ? '14px' : '16px', 
                    color: '#6b7280',
                    marginLeft: '8px'
                  }}>
                    {submission.images.length} adet
                  </span>
                </div>
              </div>

              {/* Resimler */}
              {submission.images.length > 0 && (
                <div style={{ marginTop: isMobile ? '12px' : '16px' }}>
                  <strong style={{ 
                    fontSize: isMobile ? '14px' : '16px', 
                    color: '#374151',
                    display: 'block',
                    marginBottom: isMobile ? '8px' : '12px'
                  }}>
                    Ürün Fotoğrafları:
                  </strong>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(6, 1fr)' : 'repeat(12, 1fr)',
                    gap: isMobile ? '4px' : '6px',
                    maxWidth: '100%'
                  }}>
                    {submission.images.map((image, imgIndex) => {
                      // Base64 string kontrolü
                      if (typeof image === 'string' && image.startsWith('data:image')) {
                        return (
                          <div key={imgIndex} style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '6px',
                            overflow: 'hidden',
                            background: '#f9fafb',
                            aspectRatio: '1',
                            position: 'relative'
                          }}>
                            {/* Fotoğraf Numarası */}
                            <div style={{
                              position: 'absolute',
                              top: '2px',
                              right: '2px',
                              background: 'rgba(0, 0, 0, 0.7)',
                              color: 'white',
                              borderRadius: '6px',
                              padding: '1px 3px',
                              fontSize: isMobile ? '8px' : '9px',
                              fontWeight: '600',
                              zIndex: 1
                            }}>
                              {imgIndex + 1}
                            </div>
                            <img
                              src={image}
                              alt={`Ürün resmi ${imgIndex + 1}`}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                                                          onClick={() => {
                              // Resmi büyük göster
                              const modal = document.createElement('div');
                              modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;';
                              
                              // Güvenli modal kapatma fonksiyonu
                              const closeModal = () => {
                                if (modal.parentNode) {
                                  document.body.removeChild(modal);
                                }
                              };
                              
                              modal.onclick = closeModal;
                              
                              // X butonu oluştur
                              const closeBtn = document.createElement('button');
                              closeBtn.innerHTML = '✕';
                              closeBtn.style.cssText = 'position: absolute; top: -15px; right: -15px; background: rgba(255, 255, 255, 0.95); border: 2px solid #fff; border-radius: 50%; width: 35px; height: 35px; font-size: 16px; font-weight: bold; color: #333; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1001; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);';
                              closeBtn.onmouseenter = () => {
                                closeBtn.style.background = 'rgba(255, 255, 255, 1)';
                                closeBtn.style.transform = 'scale(1.1)';
                              };
                              closeBtn.onmouseleave = () => {
                                closeBtn.style.background = 'rgba(255, 255, 255, 0.9)';
                                closeBtn.style.transform = 'scale(1)';
                              };
                              closeBtn.onclick = (e) => {
                                e.stopPropagation();
                                closeModal();
                              };
                              
                              // Resim container'ı oluştur
                              const imgContainer = document.createElement('div');
                              imgContainer.style.cssText = 'position: relative; display: inline-block;';
                              
                              const img = document.createElement('img');
                              img.src = image;
                              img.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 8px; display: block;';
                              img.onclick = (e) => e.stopPropagation();
                              
                              imgContainer.appendChild(img);
                              imgContainer.appendChild(closeBtn);
                              modal.appendChild(imgContainer);
                              document.body.appendChild(modal);
                            }}
                            />
                          </div>
                        );
                      }
                      
                      // Geçersiz format
                      return (
                        <div key={imgIndex} style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          background: '#f9fafb',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          aspectRatio: '1',
                          position: 'relative'
                        }}>
                          <span style={{
                            fontSize: isMobile ? '7px' : '8px',
                            color: '#6b7280',
                            textAlign: 'center',
                            padding: '4px'
                          }}>
                            Hata
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Müşteri Yanıtı */}
              {submission.customerResponse && (
                <div style={{
                  background: submission.customerResponse.action === 'accepted' 
                    ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
                    : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
                  borderRadius: '12px',
                  padding: isMobile ? '16px' : '20px',
                  marginBottom: '16px',
                  border: submission.customerResponse.action === 'accepted' 
                    ? '1px solid #6ee7b7'
                    : '1px solid #fca5a5'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <div style={{
                      background: submission.customerResponse.action === 'accepted' ? '#059669' : '#dc2626',
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
                      {submission.customerResponse.action === 'accepted' ? '✅' : '❌'}
                    </div>
                    <h4 style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '600',
                      color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                      margin: 0
                    }}>
                      Müşteri Yanıtı
                    </h4>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: isMobile ? '12px' : '14px', 
                        color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                        fontWeight: '500'
                      }}>
                        Durum:
                      </span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        fontWeight: '600',
                        color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                        marginTop: '4px'
                      }}>
                        {submission.customerResponse.action === 'accepted' ? 'Teklif Kabul Edildi' : 'Teklif Reddedildi'}
                      </div>
                    </div>
                    <div>
                      <span style={{ 
                        fontSize: isMobile ? '12px' : '14px', 
                        color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                        fontWeight: '500'
                      }}>
                        Tarih:
                      </span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        fontWeight: '500',
                        color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                        marginTop: '4px'
                      }}>
                        {formatDate(submission.customerResponse.date)}
                      </div>
                    </div>
                  </div>
                  {(submission.customerResponse.note || submission.customerResponse.reason) && (
                    <div style={{ marginTop: '12px' }}>
                      <span style={{ 
                        fontSize: isMobile ? '12px' : '14px', 
                        color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                        fontWeight: '500'
                      }}>
                        {submission.customerResponse.action === 'accepted' ? 'Not:' : 'Sebep:'}
                      </span>
                      <div style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                        marginTop: '4px',
                        fontStyle: 'italic',
                        lineHeight: '1.5'
                      }}>
                        {submission.customerResponse.note || submission.customerResponse.reason}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Aksiyon Butonları */}
              <div style={{
                display: 'flex',
                gap: isMobile ? '12px' : '16px',
                flexWrap: 'wrap',
                marginTop: '20px'
              }}>
                <button
                  onClick={() => handleAction(submission, 'offer')}
                  disabled={submission.status !== 'pending'}
                  style={{
                    background: submission.status === 'pending'
                      ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
                      : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '14px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    cursor: submission.status === 'pending' ? 'pointer' : 'not-allowed',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    opacity: submission.status === 'pending' ? 1 : 0.6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: submission.status === 'pending'
                      ? '0 4px 12px rgba(37, 99, 235, 0.3)'
                      : '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (submission.status === 'pending') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (submission.status === 'pending') {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                    }
                  }}
                >
                  💰 {submission.status === 'offered' ? 'Teklif Verildi' : 'Teklif Ver'}
                </button>
                <button
                  onClick={() => submission.status === 'accepted' ? handleAction(submission, 'listing') : null}
                  disabled={submission.status !== 'accepted'}
                  style={{
                    background: submission.status === 'accepted'
                      ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                      : submission.status === 'listed'
                      ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                      : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '14px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    cursor: submission.status === 'accepted' ? 'pointer' : 'not-allowed',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    opacity: submission.status === 'accepted' ? 1 : 0.6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: submission.status === 'accepted'
                      ? '0 4px 12px rgba(5, 150, 105, 0.3)'
                      : '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (submission.status === 'accepted') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (submission.status === 'accepted') {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                    }
                  }}
                >
                  📋 {submission.status === 'listed' ? '✅ İlan Oluşturuldu' : 'İlan Oluştur'}
                </button>
                <button
                  onClick={() => handleAction(submission, 'reject')}
                  disabled={submission.status !== 'pending' && submission.status !== 'offered'}
                  style={{
                    background: (submission.status === 'pending' || submission.status === 'offered')
                      ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
                      : 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '14px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    cursor: (submission.status === 'pending' || submission.status === 'offered') ? 'pointer' : 'not-allowed',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    opacity: (submission.status === 'pending' || submission.status === 'offered') ? 1 : 0.6,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: (submission.status === 'pending' || submission.status === 'offered')
                      ? '0 4px 12px rgba(220, 38, 38, 0.3)'
                      : '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    if (submission.status === 'pending' || submission.status === 'offered') {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (submission.status === 'pending' || submission.status === 'offered') {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                    }
                  }}
                >
                  ❌ {submission.status === 'rejected' ? 'Reddedildi' : 'Reddet'}
                </button>
                <button
                  onClick={() => handleDeleteSubmission(submission._id)}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '14px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
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
                  🗑️ Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: isMobile ? '20px' : '40px',
          right: isMobile ? '20px' : '40px',
          background: toastType === 'success' 
            ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
            : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
          color: 'white',
          padding: isMobile ? '16px 20px' : '20px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2), 0 4px 10px rgba(0, 0, 0, 0.1)',
          zIndex: 10000,
          maxWidth: isMobile ? 'calc(100vw - 40px)' : '400px',
          transform: 'translateX(0)',
          animation: 'slideInRight 0.3s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {toastType === 'success' ? '✓' : '✕'}
          </div>
          <div>
            <div style={{
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: '600',
              marginBottom: '2px'
            }}>
              {toastType === 'success' ? 'Başarılı!' : 'Hata!'}
            </div>
            <div style={{
              fontSize: isMobile ? '13px' : '14px',
              opacity: 0.9,
              lineHeight: '1.4'
            }}>
              {toastMessage}
            </div>
          </div>
          <button
            onClick={() => setShowToast(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold',
              marginLeft: 'auto'
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Action Modal */}
      {showModal && selectedSubmission && modalType && (
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
          padding: '20px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: isMobile ? '20px' : '32px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '500px',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <h2 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {modalType === 'offer' && 'Teklif Ver'}
              {modalType === 'listing' && 'İlan Oluştur'}
              {modalType === 'reject' && 'Talebi Reddet'}
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
                setModalType(null);
              }}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}

      {/* Silme Onay Modalı */}
      {showDeleteModal && (
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
            maxWidth: isMobile ? '100%' : '450px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb'
          }}>
            {/* İkon ve Başlık */}
            <div style={{
              textAlign: 'center',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '2px solid #fecaca'
              }}>
                <span style={{
                  fontSize: '32px',
                  color: '#dc2626'
                }}>
                  ⚠️
                </span>
              </div>
              <h2 style={{
                fontSize: isMobile ? '20px' : '24px',
                fontWeight: '700',
                color: '#1f2937',
                margin: '0 0 8px 0'
              }}>
                {deleteModalType === 'all' ? 'Tüm İlanları Sil' : 'İlanı Sil'}
              </h2>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {deleteModalType === 'all' 
                  ? `Tüm ilanları (${submissions.length} adet) kalıcı olarak silmek istediğinizden emin misiniz?`
                  : 'Bu ilanı kalıcı olarak silmek istediğinizden emin misiniz?'
                }
              </p>
            </div>

            {/* Uyarı Mesajı */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              border: '1px solid #fecaca',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{
                  fontSize: '20px',
                  color: '#dc2626',
                  marginTop: '2px'
                }}>
                  ⚠️
                </span>
                <div>
                  <p style={{
                    fontSize: isMobile ? '13px' : '14px',
                    color: '#991b1b',
                    margin: '0 0 4px 0',
                    fontWeight: '600'
                  }}>
                    Bu işlem geri alınamaz!
                  </p>
                  <p style={{
                    fontSize: isMobile ? '12px' : '13px',
                    color: '#7f1d1d',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {deleteModalType === 'all' 
                      ? 'Tüm ilanlar ve ilgili veriler kalıcı olarak silinecektir.'
                      : 'Bu ilan ve ilgili veriler kalıcı olarak silinecektir.'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Butonlar */}
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={cancelDelete}
                disabled={isDeletingAll}
                style={{
                  background: 'white',
                  color: '#374151',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  padding: isMobile ? '12px 20px' : '14px 24px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: isDeletingAll ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: isDeletingAll ? 0.6 : 1,
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  if (!isDeletingAll) {
                    e.currentTarget.style.borderColor = '#9ca3af';
                    e.currentTarget.style.background = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDeletingAll) {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeletingAll}
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: isMobile ? '12px 20px' : '14px 24px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: isDeletingAll ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: isDeletingAll ? 0.7 : 1,
                  minWidth: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  if (!isDeletingAll) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isDeletingAll) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                  }
                }}
              >
                {isDeletingAll ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    Siliniyor...
                  </>
                ) : (
                  <>
                    🗑️
                    {deleteModalType === 'all' ? 'Tümünü Sil' : 'Sil'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Action Form Component
function ActionForm({ type, onSubmit, onCancel, isMobile }: {
  type: 'offer' | 'listing' | 'reject';
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isMobile: boolean;
}) {
  const [formData, setFormData] = useState<any>({});

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
              placeholder="Örn: Dell Latitude E7450 - İyi Durumda"
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
              İlan Açıklaması
            </label>
            <textarea
              required
              value={formData.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
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
              placeholder="Ürün detayları, özellikler, durumu..."
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
            Reddetme Nedeni
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
              minHeight: '100px',
              resize: 'vertical'
            }}
            placeholder="Talebi neden reddettiğinizi açıklayın..."
          />
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '24px'
      }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s'
          }}
        >
          İptal
        </button>
        <button
          type="submit"
          style={{
            background: type === 'reject' ? '#dc2626' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s'
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