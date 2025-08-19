"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Listing {
  _id: string;
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
  images: string[];
  offer?: {
    amount: number;
    notes?: string;
  };
  createdAt: string;
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/listings');
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        setError('İlanlar yüklenemedi');
      }
    } catch (error) {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  const filteredListings = listings.filter(listing => {
    const searchTerm = search.toLowerCase();
    const searchableText = [
      listing.brand,
      listing.model,
      listing.processor,
      listing.graphicsCard,
      listing.ram,
      listing.storage,
      listing.cosmeticCondition,
      listing.screenStatus,
      listing.deadPixelCount,
      listing.wattValue,
      listing.refreshRate,
      listing.screenSize,
      listing.batteryHealth
    ].filter(Boolean).join(' ').toLowerCase();
    
    return searchableText.includes(searchTerm);
  });

  if (loading) {
    return (
      <div style={{ 
        maxWidth: 1200, 
        margin: "40px auto", 
        padding: 32, 
        background: '#f8fafc', 
        borderRadius: 16, 
        boxShadow: '0 4px 32px #0001', 
        fontFamily: 'sans-serif',
        textAlign: 'center'
      }}>
        <div>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: 1400, 
        margin: "0 auto"
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: isMobile ? '8px' : '12px',
          padding: isMobile ? '12px' : '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: isMobile ? '16px' : '20px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            margin: 0, 
            color: '#2563eb',
            fontSize: isMobile ? '28px' : '44px',
            fontWeight: '700'
          }}>
            Satılık İlanlar
          </h1>
        </div>

        {/* Arama Kutusu */}
        <div style={{
          background: 'white',
          borderRadius: isMobile ? '8px' : '12px',
          padding: isMobile ? '16px' : '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
          marginBottom: isMobile ? '16px' : '24px',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '8px' : '12px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              width: isMobile ? '32px' : '40px',
              height: isMobile ? '32px' : '40px',
              borderRadius: isMobile ? '8px' : '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '14px' : '18px',
              color: 'white'
            }}>
              🔍
            </div>
            <input
              type="text"
              placeholder={isMobile ? "Ara..." : "Marka, model veya özellik ara..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ 
                flex: 1,
                padding: isMobile ? '10px 12px' : '12px 16px', 
                borderRadius: isMobile ? '6px' : '8px', 
                border: '1px solid #e5e7eb', 
                fontSize: isMobile ? '14px' : '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
              }}
            />
          </div>
        </div>

      {error && (
        <div style={{ 
          background: '#fee2e2', 
          color: '#dc2626', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 16 
        }}>
          {error}
        </div>
      )}

      {filteredListings.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: 40, 
          color: '#64748b' 
        }}>
          {search ? 'Arama kriterlerine uygun ilan bulunamadı' : 'Henüz ilan bulunmuyor'}
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))', 
          gap: isMobile ? 16 : 24 
        }}>
          {filteredListings.map((listing) => (
            <div key={listing._id} style={{
              background: 'white',
              borderRadius: isMobile ? '12px' : '16px',
              padding: isMobile ? '16px' : '24px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
            >
              {/* Ürün Başlığı */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: isMobile ? '16px' : '20px',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '8px' : '0'
              }}>
                <h3 style={{ 
                  fontSize: isMobile ? '18px' : '20px', 
                  fontWeight: '700', 
                  color: '#1f2937', 
                  margin: 0 
                }}>
                  {listing.brand} {listing.model}
                </h3>
                <span style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  padding: isMobile ? '4px 8px' : '6px 12px',
                  borderRadius: '20px',
                  fontSize: isMobile ? '10px' : '12px',
                  fontWeight: '600',
                  alignSelf: isMobile ? 'flex-start' : 'auto'
                }}>
                  ✅ Kabul Edildi
                </span>
              </div>

              {/* Teklif Fiyatı */}
              {listing.offer && (
                <div style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                    {formatPrice(listing.offer.amount)}
                  </div>
                  {listing.offer.notes && (
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      {listing.offer.notes}
                    </div>
                  )}
                </div>
              )}

              {/* Teknik Özellikler */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{
                  fontSize: isMobile ? '15px' : '16px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ⚙️ Teknik Özellikler
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                  gap: isMobile ? '8px' : '12px',
                  fontSize: isMobile ? '13px' : '14px'
                }}>
                  {listing.processor && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>İşlemci:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.processor}</div>
                    </div>
                  )}
                  {listing.graphicsCard && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>Ekran Kartı:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.graphicsCard}</div>
                    </div>
                  )}
                  {listing.ram && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>RAM:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.ram}</div>
                    </div>
                  )}
                  {listing.storage && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>Depolama:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.storage}</div>
                    </div>
                  )}
                  {listing.wattValue && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>Güç:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.wattValue}W</div>
                    </div>
                  )}
                  {listing.refreshRate && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>Tazeleme:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.refreshRate}Hz</div>
                    </div>
                  )}
                  {listing.screenSize && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>Ekran:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.screenSize}"</div>
                    </div>
                  )}
                  {listing.batteryHealth && (
                    <div style={{
                      background: '#f8fafc',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <strong style={{ color: '#374151' }}>Batarya:</strong>
                      <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.batteryHealth}%</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Durum Bilgileri */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{
                  fontSize: isMobile ? '15px' : '16px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  📋 Durum Bilgileri
                </h4>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                  gap: isMobile ? '8px' : '12px',
                  fontSize: isMobile ? '13px' : '14px'
                }}>
                  <div style={{
                    background: '#f8fafc',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <strong style={{ color: '#374151' }}>Kozmetik Durum:</strong>
                    <div style={{ 
                      color: listing.cosmeticCondition === 'Mükemmel' ? '#059669' : 
                             listing.cosmeticCondition === 'İyi' ? '#f59e0b' : '#dc2626',
                      marginTop: '2px',
                      fontWeight: '500'
                    }}>
                      {listing.cosmeticCondition}
                    </div>
                  </div>
                  <div style={{
                    background: '#f8fafc',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <strong style={{ color: '#374151' }}>Kutu:</strong>
                    <div style={{ 
                      color: listing.hasBox ? '#059669' : '#dc2626',
                      marginTop: '2px',
                      fontWeight: '500'
                    }}>
                      {listing.hasBox ? '✅ Var' : '❌ Yok'}
                    </div>
                  </div>
                  <div style={{
                    background: '#f8fafc',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <strong style={{ color: '#374151' }}>Fatura:</strong>
                    <div style={{ 
                      color: listing.hasInvoice ? '#059669' : '#dc2626',
                      marginTop: '2px',
                      fontWeight: '500'
                    }}>
                      {listing.hasInvoice ? '✅ Var' : '❌ Yok'}
                    </div>
                  </div>
                  <div style={{
                    background: '#f8fafc',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb'
                  }}>
                    <strong style={{ color: '#374151' }}>Adet:</strong>
                    <div style={{ color: '#6b7280', marginTop: '2px' }}>
                      {listing.quantity} adet
                    </div>
                  </div>
                </div>
              </div>

              {/* Ekran Durumu */}
              {(listing.screenStatus || listing.deadPixelCount) && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: isMobile ? '15px' : '16px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    🖥️ Ekran Durumu
                  </h4>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                    gap: isMobile ? '8px' : '12px',
                    fontSize: isMobile ? '13px' : '14px'
                  }}>
                    {listing.screenStatus && (
                      <div style={{
                        background: '#f8fafc',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <strong style={{ color: '#374151' }}>Ekran Durumu:</strong>
                        <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.screenStatus}</div>
                      </div>
                    )}
                    {listing.deadPixelCount && (
                      <div style={{
                        background: '#f8fafc',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb'
                      }}>
                        <strong style={{ color: '#374151' }}>Ölü Piksel:</strong>
                        <div style={{ color: '#6b7280', marginTop: '2px' }}>{listing.deadPixelCount}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ürün Fotoğrafları */}
              {listing.images.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{
                    fontSize: isMobile ? '15px' : '16px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    📸 Ürün Fotoğrafları ({listing.images.length} adet)
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? '6px' : '8px'
                  }}>
                    {listing.images.slice(0, 4).map((image, index) => (
                      <div key={index} style={{
                        aspectRatio: '1',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                      >
                        <img
                          src={image}
                          alt={`Ürün resmi ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Alt Bilgiler */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                fontSize: isMobile ? '12px' : '14px',
                color: '#6b7280',
                paddingTop: '16px',
                borderTop: '1px solid #e5e7eb',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '8px' : '0'
              }}>
                <div>
                  İlan Tarihi: {formatDate(listing.createdAt)}
                </div>
                <div style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white',
                  padding: isMobile ? '4px 8px' : '6px 12px',
                  borderRadius: '20px',
                  fontSize: isMobile ? '10px' : '12px',
                  fontWeight: '600'
                }}>
                  🏷️ İlan No: {listing._id.slice(-6)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
}