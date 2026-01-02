"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type ListingSubmission = {
  _id: string;
  category?: string;
  brand?: string;
  model?: string;
  cosmeticCondition?: string;
  hasWarranty?: boolean;
  warrantyDuration?: string;
  hasBox?: boolean;
  hasInvoice?: boolean;
  invoiceDate?: string;
  images?: string[];
  createdAt?: string;
  listing?: {
    price?: number;
    title?: string;
    description?: string;
    date?: string;
  };
};

export default function BizdenAlPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<ListingSubmission[]>([]);

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
    let isMounted = true;
    const loadListings = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch('/api/listings', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('İlanlar getirilemedi');
        }
        const data = await res.json();
        if (isMounted) {
          setListings(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : 'Bir hata oluştu');
          setListings([]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    loadListings();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: 'all', name: 'Tüm Kategoriler', icon: '🏠', color: '#3b82f6' },
    { id: 'notebook', name: 'Dizüstü Bilgisayar', icon: '💻', color: '#10b981' },
    { id: 'desktop', name: 'Masaüstü Bilgisayar', icon: '/case.png', color: '#f59e0b' },
    { id: 'graphics-card', name: 'Ekran Kartı', icon: '/graphic-card.png', color: '#f97316' },
    { id: 'processor', name: 'İşlemci', icon: '/cpu-tower.png', color: '#ec4899' },
    { id: 'monitor', name: 'Monitör', icon: '🖥️', color: '#8b5cf6' },
    { id: 'keyboard', name: 'Klavye', icon: '⌨️', color: '#ef4444' },
    { id: 'mouse', name: 'Fare', icon: '🖱️', color: '#06b6d4' },
    { id: 'headphones', name: 'Kulaklık', icon: '🎧', color: '#84cc16' },
    { id: 'ram', name: 'RAM', icon: '/ram.png', color: '#6366f1' },
    { id: 'ssd', name: 'SSD', icon: '/ssd.png', color: '#14b8a6' },
    { id: 'tablet', name: 'Tablet', icon: '/tablet.png', color: '#f43f5e' }
  ];

  const filteredListings = selectedCategory === 'all'
    ? listings
    : listings.filter((l) => (l.category || '') === selectedCategory);

  const getCategoryLabel = (categoryId?: string) => {
    if (!categoryId) return '-';
    const found = categories.find((c) => c.id === categoryId);
    return found?.name || categoryId;
  };

  const formatBool = (value?: boolean) => (value ? 'Var' : 'Yok');

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: isMobile ? '20px 12px' : '40px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: isMobile ? '32px 24px' : '48px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 20px 0',
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Satılık İlanlar
          </h1>
          <h2 style={{
            fontSize: isMobile ? '18px' : '22px',
            fontWeight: '600',
            color: '#374151',
            margin: '0 0 24px 0',
            lineHeight: '1.5',
            maxWidth: '700px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            2. El Alışverişte Güvenilir Adres, Kaliteli Ürünler, Uygun Fiyatlar
          </h2>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              ✓ Güvenli Ödeme
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              🚚 Hızlı Teslimat
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              🔒 Garanti
            </div>
          </div>
        </div>

        {/* Kategori Filtreleme */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 20px 0',
            textAlign: 'center'
          }}>
            Kategoriler
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  background: selectedCategory === category.id ? category.color : '#f9fafb',
                  color: selectedCategory === category.id ? 'white' : '#374151',
                  border: selectedCategory === category.id ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '16px 12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: selectedCategory === category.id ? '700' : '600'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{ fontSize: '24px' }}>
                  {category.icon.startsWith('/') ? (
                    <img 
                      src={category.icon} 
                      alt={category.name}
                      style={{ width: '24px', height: '24px' }}
                    />
                  ) : (
                    category.icon
                  )}
                </div>
                <div style={{ 
                  fontSize: isMobile ? '11px' : '12px',
                  textAlign: 'center',
                  lineHeight: '1.2'
                }}>
                  {category.name}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Ürün Listesi */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 24px 0',
            textAlign: 'center'
          }}>
            {selectedCategory === 'all' ? 'Satılık İlanlar' : `${categories.find(c => c.id === selectedCategory)?.name} İlanları`}
          </h2>
          
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              Yükleniyor...
            </div>
          )}

          {!isLoading && error && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#dc2626' }}>
              {error}
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {!isLoading && !error && filteredListings.map((item) => {
              const title = item.listing?.title || `${item.brand || ''} ${item.model || ''}`.trim() || 'İlan';
              const price = item.listing?.price;
              const imageSrc = item.images && item.images.length > 0 ? item.images[0] : '';

              return (
              <div
                key={item._id}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                }}
              >
                {/* Ürün Görseli */}
                <div style={{
                  width: '100%',
                  height: isMobile ? '160px' : '140px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden'
                }}>
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        background: '#f9fafb'
                      }}
                    />
                  ) : (
                    <div style={{ color: '#9ca3af', fontSize: '48px' }}>🖼️</div>
                  )}
                </div>

                {/* Ürün Bilgileri */}
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 8px 0',
                    lineHeight: '1.4'
                  }}>
                    {title}
                  </h3>
                  
                  {/* Fiyat */}
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#dc2626' }}>
                      {typeof price === 'number' ? `${price.toLocaleString('tr-TR')} TL` : 'Fiyat bilgisi yok'}
                    </span>
                  </div>
                </div>

                {/* İlan Bilgileri */}
                <div style={{
                  background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'grid',
                  gap: '10px'
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    📌 İlan Bilgileri
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px'
                  }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Kategori</div>
                      <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {getCategoryLabel(item.category)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Marka</div>
                      <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {item.brand || '-'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Model</div>
                      <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {item.model || '-'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Kozmetik Durum</div>
                      <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {item.cosmeticCondition || '-'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Garanti</div>
                      <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {formatBool(item.hasWarranty)}{item.hasWarranty && item.warrantyDuration ? ` (${item.warrantyDuration})` : ''}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Kutu</div>
                      <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {formatBool(item.hasBox)}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Fatura</div>
                      <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>
                        {formatBool(item.hasInvoice)}{item.hasInvoice && item.invoiceDate ? ` (${item.invoiceDate})` : ''}
                      </div>
                    </div>
                  </div>

                  {!!item.listing?.description && (
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Açıklama</div>
                      <div style={{ fontSize: '14px', color: '#334155', lineHeight: '1.5' }}>
                        {item.listing.description}
                      </div>
                    </div>
                  )}

                  {item.images && item.images.length > 1 && (
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>Fotoğraflar</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {item.images.slice(0, 6).map((src, idx) => (
                          <img
                            key={`${item._id}-thumb-${idx}`}
                            src={src}
                            alt={`${title} fotoğraf ${idx + 1}`}
                            style={{
                              width: '56px',
                              height: '56px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                              border: '1px solid #e5e7eb',
                              background: '#fff'
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              );
            })}
          </div>

          {!isLoading && !error && filteredListings.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p>Bu kategoride henüz ilan bulunmuyor.</p>
            </div>
          )}
        </div>

        {/* Alt Bilgi */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginTop: '32px',
          border: '1px solid #e5e7eb',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Neden Bizden Satın Almalısınız?
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '24px',
            marginTop: '24px'
          }}>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>💳</div>
              <h4 style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Güvenli Ödeme</h4>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                SSL sertifikalı güvenli ödeme sistemi
              </p>
            </div>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚚</div>
              <h4 style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Hızlı Teslimat</h4>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                24 saat içinde kargoya teslim
              </p>
            </div>
            <div>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔒</div>
              <h4 style={{ fontWeight: '600', margin: '0 0 8px 0' }}>Garanti</h4>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                Tüm ürünlerde 2 yıl garanti
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
