"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ActionModal from './components/ActionModal';
import LoadingSpinner from './components/LoadingSpinner';
import AdminMainHeader from './components/AdminMainHeader';
import ManagementToolbar from './components/ManagementToolbar';
import CategoryFilter from './components/CategoryFilter';
import SubmissionList from './components/SubmissionList';
import DeleteModal from './components/DeleteModal';
import SubmissionDetailModal from './components/SubmissionDetailModal';
import { useAdminState } from './hooks/useAdminState';
import { fetchSubmissions, submitAction, deleteAllSubmissions, deleteSingleSubmission, formatDate } from './utils/api';
import { Submission } from './types';

export default function AdminPage() {
  const {
    // Data
    submissions,
    setSubmissions,
    loading,
    setLoading,
    error,
    setError,
    
    // Auth
    isAuthenticated,
    setIsAuthenticated,
    
    // UI State
    isMobile,
    setIsMobile,
    selectedSubmission,
    setSelectedSubmission,
    
    // Modals
    showModal,
    setShowModal,
    modalType,
    setModalType,
    showDeleteModal,
    setShowDeleteModal,
    deleteModalType,
    setDeleteModalType,
    deleteTargetId,
    setDeleteTargetId,
    
    // Toast
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    toastType,
    setToastType,
    
    // Actions
    isDeletingAll,
    setIsDeletingAll,
    selectedCategory,
    setSelectedCategory,
    
    // Detail Modal
    showDetailModal,
    setShowDetailModal,
    detailSubmission,
    setDetailSubmission,
  } = useAdminState();
  const router = useRouter();

  useEffect(() => {
    console.log("🔍 Admin paneli useEffect çalışıyor...");
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const checkAdminStatus = () => {
      console.log("🔍 Admin durumu kontrol ediliyor...");
      const adminLoggedIn = localStorage.getItem('adminLoggedIn') || sessionStorage.getItem('adminLoggedIn');
      const adminEmail = localStorage.getItem('adminEmail') || sessionStorage.getItem('adminEmail');
      
      console.log("🔍 Admin bilgileri:", { adminLoggedIn, adminEmail });
      
      if (!adminLoggedIn || !adminEmail) {
        console.log("🔒 Admin giriş yapılmamış, anasayfaya yönlendiriliyor...");
        router.push('/');
        return;
      }
      console.log("✅ Admin giriş yapılmış, submissions yükleniyor...");
      setIsAuthenticated(true);
      loadSubmissions();
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // İlk admin durumu kontrolü
    checkAdminStatus();
    
    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      checkAdminStatus();
    };
    
    // Custom event'leri dinle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [router]);

  const handleLogout = () => {
    // Sadece admin bilgilerini temizle
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    
    // Custom event'i tetikle
    window.dispatchEvent(new Event('localStorageChange'));
    
    // Header'a logout mesajı gönder
    window.dispatchEvent(new CustomEvent('logout'));
    
    // Admin sayfasında kal (ana sayfaya yönlendirme yok)
    // Sayfayı yenile
    window.location.reload();
  };

  const loadSubmissions = async () => {
    console.log("🔍 loadSubmissions fonksiyonu çağrıldı...");
    try {
      setError(null);
      console.log("🔍 fetchSubmissions çağrılıyor...");
      const { submissions: data, error: apiError } = await fetchSubmissions();
      
      console.log("🔍 API yanıtı:", { data: data?.length, apiError });
      
      if (apiError) {
        console.log("❌ API hatası:", apiError);
        setError(apiError);
        setSubmissions([]);
      } else {
        console.log("✅ Submissions yüklendi:", data?.length);
        setSubmissions(data);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bağlantı hatası';
      console.error('❌ API hatası:', errorMessage);
      setError(errorMessage);
      setSubmissions([]);
    } finally {
      console.log("🔍 Loading false yapılıyor...");
      setLoading(false);
    }
  };

  // Filtrelenmiş submission'ları hesapla
  const filteredSubmissions = selectedCategory === 'all' 
    ? submissions 
    : submissions.filter(submission => submission.category === selectedCategory);


  const handleAction = (submission: Submission, action: 'offer' | 'listing' | 'reject' | 'delivery_completed') => {
    setSelectedSubmission(submission);
    setModalType(action);
    setShowModal(true);
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 6000);
  };

  const handleSubmitAction = async (formData: any) => {
    if (!selectedSubmission || !modalType) return;

    // Loading state başlat
    setLoading(true);
    
    try {
      const result = await submitAction(selectedSubmission._id, modalType, formData);

      if (result.success) {
        // Submissions listesini güncelle
        await loadSubmissions();
        setShowModal(false);
        setSelectedSubmission(null);
        setModalType(null);
        
        // Teklif verildiğinde özel popup göster
        if (modalType === 'offer') {
          setToastMessage('✅ Teklifiniz başarıyla müşteriye iletildi! Müşteri teklifinizi değerlendirecek.');
          setToastType('success');
          setShowToast(true);
        } else {
          // Diğer işlemler için normal mesaj
          const actionText = modalType === 'listing' ? 'İlan' : 
                            modalType === 'reject' ? 'Reddetme' : 'İşlem';
          showToastMessage(`${actionText} başarıyla tamamlandı!`, 'success');
        }
      } else {
        showToastMessage(`Hata: ${result.message}`, 'error');
      }
    } catch (error) {
      console.error('Action error:', error);
      showToastMessage('Bir hata oluştu!', 'error');
    } finally {
      // Loading state bitir
      setLoading(false);
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

  const handleDetailSubmission = (submission: Submission) => {
    setDetailSubmission(submission);
    setShowDetailModal(true);
  };

  const handleDeliveryInfo = (submission: Submission) => {
    setDetailSubmission(submission);
    setShowDetailModal(true);
    // Teslimat bilgileri tab'ını açmak için activeTab'ı set et
    setTimeout(() => {
      const teslimatTab = document.querySelector('[data-tab="teslimat"]') as HTMLButtonElement;
      if (teslimatTab) {
        teslimatTab.click();
      }
    }, 100);
  };

  const confirmDelete = async () => {
    if (deleteModalType === 'all') {
      setIsDeletingAll(true);
      const result = await deleteAllSubmissions();
      
      if (result.success) {
        showToastMessage(result.message, 'success');
          setSubmissions([]); // UI'dan da temizle
        } else {
        showToastMessage(result.message, 'error');
        }
        setIsDeletingAll(false);
    } else if (deleteModalType === 'single' && deleteTargetId) {
      const result = await deleteSingleSubmission(deleteTargetId);
      
      if (result.success) {
        showToastMessage(result.message, 'success');
          // UI'dan da temizle
          setSubmissions(prev => prev.filter(sub => sub._id !== deleteTargetId));
        } else {
        showToastMessage(result.message, 'error');
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
    return <LoadingSpinner isMobile={isMobile} />;
  }

  if (error) {
    return (
      <div style={{ 
        padding: isMobile ? '20px' : '40px', 
        textAlign: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #374151 0%, #6b7280 50%, #4b5563 100%)'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            ❌
          </div>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            color: '#dc2626',
            margin: '0 0 16px 0'
          }}>
            Veri Yüklenirken Hata Oluştu
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            margin: '0 0 24px 0',
            lineHeight: '1.5'
          }}>
            {error}
          </p>
          <button 
            onClick={fetchSubmissions}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3b82f6';
            }}
          >
            🔄 Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
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
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(5, 1fr)',
                gap: '12px'
              }}>
                <Link href="/satilik-ilanlar" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                  }}
                  >
                    📋 İlanları Görüntüle
                  </button>
                </Link>

                <Link href="/admin/urunler" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                  }}
                  >
                    📦 Ürün Kataloğu
                  </button>
                </Link>

                <Link href="/admin/stok" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(245, 158, 11, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                  }}
                  >
                    📊 Stok Takip
                  </button>
                </Link>

                <Link href="/admin/kategori" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 92, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                  }}
                  >
                    🏷️ Kategori
                  </button>
                </Link>

                <Link href="/admin/teknik-servis" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(236, 72, 153, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(236, 72, 153, 0.3)';
                  }}
                  >
                    🔧 Teknik Servis
                  </button>
                </Link>

                <Link href="/admin/fiyat" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(5, 150, 105, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
                  }}
                  >
                    💰 Fiyat Yönetimi
                  </button>
                </Link>

                <Link href="/admin/gorsel" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(236, 72, 153, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(236, 72, 153, 0.3)';
                  }}
                  >
                    🖼️ Görsel Yönetimi
                  </button>
                </Link>

                <Link href="/admin-users" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(124, 58, 237, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.3)';
                  }}
                  >
                    👥 Admin Kullanıcılar
                  </button>
                </Link>
                
                <button
                  onClick={handleDeleteAllSubmissions}
                  disabled={isDeletingAll}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: isDeletingAll ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                    opacity: isDeletingAll ? 0.7 : 1,
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    if (!isDeletingAll) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDeletingAll) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                    }
                  }}
                >
                  {isDeletingAll ? '🗑️ Siliniyor...' : '🗑️ Tüm İlanları Sil'}
                </button>

                {/* Talep Sayısı */}
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: isMobile ? '12px 16px' : '16px 20px',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                  width: '100%'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'white',
                    animation: 'pulse 2s infinite'
                  }}></div>
                  {(submissions || []).length} Talep
                </div>

                {/* Çıkış */}
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    fontSize: isMobile ? '13px' : '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                    width: '100%'
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
              {(filteredSubmissions || []).length} talep bulundu
            </span>
          </div>
        </div>
      </div>

      {/* Submission List */}
        <div style={{
          maxWidth: isMobile ? '100%' : '1400px',
          margin: '0 auto'
        }}>
        <SubmissionList
          submissions={filteredSubmissions || []}
          isMobile={isMobile}
          loading={loading}
          error={error}
          selectedSubmission={selectedSubmission}
          setSelectedSubmission={setSelectedSubmission}
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
          setModalType={setModalType}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteModalType={deleteModalType}
          setDeleteModalType={setDeleteModalType}
          deleteTargetId={deleteTargetId}
          setDeleteTargetId={setDeleteTargetId}
          isDeleting={isDeletingAll}
        />
              </div>








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
          maxWidth: isMobile ? 'calc(100vw - 40px)' : '500px',
          transform: 'translateX(0)',
          animation: 'slideInRight 0.3s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 'bold'
          }}>
            {toastType === 'success' ? '✅' : '❌'}
          </div>
          <div>
            <div style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              {toastType === 'success' ? '🎉 Başarılı!' : '❌ Hata!'}
            </div>
            <div style={{
              fontSize: isMobile ? '14px' : '16px',
              opacity: 0.95,
              lineHeight: '1.5',
              fontWeight: '500'
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
      <ActionModal
        showModal={showModal}
        selectedSubmission={selectedSubmission}
        modalType={modalType}
        isMobile={isMobile}
        loading={loading}
        onSubmit={handleSubmitAction}
        onCancel={() => {
          setShowModal(false);
          setSelectedSubmission(null);
          setModalType(null);
        }}
      />

      {/* Detail Modal */}
      <SubmissionDetailModal
        submission={detailSubmission}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setDetailSubmission(null);
        }}
        isMobile={isMobile}
      />

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
                  ? `Tüm ilanları (${(submissions || []).length} adet) kalıcı olarak silmek istediğinizden emin misiniz?`
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
    </>
  );
}

