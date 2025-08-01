"use client";
import React, { useState, useEffect } from 'react';
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
}

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    router.push('/admin/login');
  };

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
      padding: isMobile ? '20px 12px' : '40px', 
      maxWidth: isMobile ? '100%' : '1200px', 
      margin: '0 auto', 
      position: 'relative',
      background: '#f3f4f6',
      minHeight: '100vh'
    }}>
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: isMobile ? 20 : 40,
          right: isMobile ? 20 : 40,
          background: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: isMobile ? '8px 16px' : '10px 20px',
          fontSize: isMobile ? '12px' : '14px',
          cursor: 'pointer',
          fontWeight: '600',
          zIndex: 10
        }}
      >
        Çıkış Yap
      </button>

      <h1 style={{ 
        color: '#2563eb', 
        fontSize: isMobile ? '24px' : '32px', 
        marginBottom: isMobile ? '24px' : '40px', 
        paddingRight: isMobile ? '80px' : '120px',
        textAlign: isMobile ? 'center' : 'left'
      }}>
        Notebook Satış Talepleri
      </h1>

      {submissions.length === 0 ? (
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
          gap: isMobile ? '16px' : '24px'
        }}>
          {submissions.map((submission) => (
            <div key={submission._id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: isMobile ? '16px' : '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              {/* Başlık ve Tarih */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: isMobile ? '12px' : '16px',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '8px' : '0'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: 0
                }}>
                  {submission.brand} {submission.model}
                </h3>
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
                {submission.wattValue && (
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
                {submission.refreshRate && (
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
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? '8px' : '12px'
                  }}>
                    {submission.images.map((image, imgIndex) => {
                      // Eski format kontrolü (string array)
                      if (typeof image === 'string') {
                        return (
                          <div key={imgIndex} style={{
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            background: '#f9fafb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: isMobile ? '80px' : '100px'
                          }}>
                            <span style={{
                              fontSize: isMobile ? '12px' : '14px',
                              color: '#6b7280',
                              textAlign: 'center'
                            }}>
                              Eski format resim
                            </span>
                          </div>
                        );
                      }
                      
                      // Yeni format (object)
                      return (
                        <div key={imgIndex} style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          background: '#f9fafb'
                        }}>
                          <img
                            src={image}
                            alt={`Ürün resmi ${imgIndex + 1}`}
                            style={{
                              width: '100%',
                              height: isMobile ? '80px' : '100px',
                              objectFit: 'cover',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              // Resmi büyük göster
                              const modal = document.createElement('div');
                              modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;';
                              modal.onclick = () => document.body.removeChild(modal);
                              
                              const img = document.createElement('img');
                              img.src = image;
                              img.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 8px;';
                              img.onclick = (e) => e.stopPropagation();
                              
                              modal.appendChild(img);
                              document.body.appendChild(modal);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Aksiyon Butonları */}
              <div style={{
                display: 'flex',
                gap: isMobile ? '8px' : '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => alert('Teklif ver fonksiyonu eklenecek')}
                  style={{
                    background: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                >
                  Teklif Ver
                </button>
                <button
                  onClick={() => alert('İlan oluştur fonksiyonu eklenecek')}
                  style={{
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                >
                  İlan Oluştur
                </button>
                <button
                  onClick={() => alert('Reddet fonksiyonu eklenecek')}
                  style={{
                    background: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'background 0.2s'
                  }}
                >
                  Reddet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 