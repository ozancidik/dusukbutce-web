'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  url: string;
  type?: 'product' | 'satilik-ilanlar' | 'bize-sat';
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mock data - gerçek uygulamada API'den gelecek
  const mockProducts: SearchResult[] = [
    {
      id: '1',
      title: 'iPhone 13 128 GB Siyah',
      category: 'Telefon',
      price: 33999,
      image: '/logo.png',
      url: '/products/iphone-13'
    },
    {
      id: '2',
      title: 'Asus Vivobook 15',
      category: 'Laptop',
      price: 12999,
      image: '/logo.png',
      url: '/products/asus-vivobook'
    },
    {
      id: '3',
      title: 'Samsung 75" Neo QLED',
      category: 'TV',
      price: 69959,
      image: '/logo.png',
      url: '/products/samsung-tv'
    },
    {
      id: '4',
      title: 'Lenovo Tab Plus 2',
      category: 'Tablet',
      price: 11949,
      image: '/logo.png',
      url: '/products/lenovo-tab'
    },
    {
      id: '5',
      title: 'Monster Abra A5',
      category: 'Laptop',
      price: 29999,
      image: '/logo.png',
      url: '/products/monster-abra'
    }
  ];

  // Bize Sat ve Satılık İlanlar kategorileri
  const satilikIlanlarCategories = [
    { 
      name: 'Dizüstü Bilgisayar', 
      path: '/satilik-ilanlar', 
      icon: '💻',
      keywords: ['notebook', 'laptop', 'dizüstü', 'bilgisayar', 'laptop bilgisayar']
    },
    { 
      name: 'Masaüstü Bilgisayar', 
      path: '/satilik-ilanlar', 
      icon: '🖥️',
      keywords: ['desktop', 'masaüstü', 'bilgisayar', 'pc', 'computer']
    },
    { 
      name: 'İşlemci', 
      path: '/satilik-ilanlar', 
      icon: '⚡',
      keywords: ['processor', 'cpu', 'işlemci', 'processor']
    },
    { 
      name: 'Ekran Kartı', 
      path: '/satilik-ilanlar', 
      icon: '🎮',
      keywords: ['graphics card', 'gpu', 'ekran kartı', 'video card', 'graphics']
    },
    { 
      name: 'RAM', 
      path: '/satilik-ilanlar', 
      icon: '🧠',
      keywords: ['ram', 'memory', 'bellek', 'ddr']
    },
    { 
      name: 'SSD', 
      path: '/satilik-ilanlar', 
      icon: '💾',
      keywords: ['ssd', 'hard disk', 'disk', 'sabit disk', 'storage']
    },
    { 
      name: 'Soğutucu', 
      path: '/satilik-ilanlar', 
      icon: '❄️',
      keywords: ['cooler', 'fan', 'soğutucu', 'fan', 'heatsink']
    },
    { 
      name: 'Boş Kasa', 
      path: '/satilik-ilanlar', 
      icon: '📦',
      keywords: ['case', 'kasa', 'computer case', 'pc case', 'boş kasa']
    },
    { 
      name: 'Monitör', 
      path: '/satilik-ilanlar', 
      icon: '🖥️',
      keywords: ['monitor', 'ekran', 'display', 'screen', 'monitör']
    },
    { 
      name: 'Klavye', 
      path: '/satilik-ilanlar', 
      icon: '⌨️',
      keywords: ['keyboard', 'klavye', 'keyboard']
    },
    { 
      name: 'Mouse', 
      path: '/satilik-ilanlar', 
      icon: '🖱️',
      keywords: ['mouse', 'fare', 'mouse']
    },
    { 
      name: 'Tablet', 
      path: '/satilik-ilanlar', 
      icon: '📱',
      keywords: ['tablet', 'tablet', 'ipad', 'android tablet']
    },
    { 
      name: 'Kulaklık', 
      path: '/satilik-ilanlar', 
      icon: '🎧',
      keywords: ['headphones', 'headset', 'kulaklık', 'earphones']
    },
    { 
      name: 'Ses Sistemi', 
      path: '/satilik-ilanlar', 
      icon: '🔊',
      keywords: ['sound system', 'speaker', 'ses sistemi', 'audio system']
    },
    { 
      name: 'Oyuncu Direksiyonu', 
      path: '/satilik-ilanlar', 
      icon: '🎮',
      keywords: ['gaming wheel', 'steering wheel', 'direksiyon', 'racing wheel', 'oyuncu direksiyonu']
    }
  ];

  const bizeSatCategories = [
    { 
      name: 'Dizüstü Bilgisayar', 
      path: '/bize-sat/notebook', 
      icon: '💻',
      keywords: ['notebook', 'laptop', 'dizüstü', 'bilgisayar', 'laptop bilgisayar']
    },
    { 
      name: 'Masaüstü Bilgisayar', 
      path: '/bize-sat/masaustu', 
      icon: '🖥️',
      keywords: ['desktop', 'masaüstü', 'bilgisayar', 'pc', 'computer']
    },
    { 
      name: 'İşlemci', 
      path: '/bize-sat/islemci', 
      icon: '⚡',
      keywords: ['processor', 'cpu', 'işlemci', 'processor']
    },
    { 
      name: 'Ekran Kartı', 
      path: '/bize-sat/ekran-karti', 
      icon: '🎮',
      keywords: ['graphics card', 'gpu', 'ekran kartı', 'video card', 'graphics']
    },
    { 
      name: 'RAM', 
      path: '/bize-sat/ram', 
      icon: '🧠',
      keywords: ['ram', 'memory', 'bellek', 'ddr']
    },
    { 
      name: 'SSD', 
      path: '/bize-sat/ssd', 
      icon: '💾',
      keywords: ['ssd', 'hard disk', 'disk', 'sabit disk', 'storage']
    },
    { 
      name: 'Soğutucu', 
      path: '/bize-sat/sogutucu', 
      icon: '❄️',
      keywords: ['cooler', 'fan', 'soğutucu', 'fan', 'heatsink']
    },
    { 
      name: 'Boş Kasa', 
      path: '/bize-sat/kasa', 
      icon: '📦',
      keywords: ['case', 'kasa', 'computer case', 'pc case', 'boş kasa']
    },
    { 
      name: 'Monitör', 
      path: '/bize-sat/monitor', 
      icon: '🖥️',
      keywords: ['monitor', 'ekran', 'display', 'screen', 'monitör']
    },
    { 
      name: 'Klavye', 
      path: '/bize-sat/klavye', 
      icon: '⌨️',
      keywords: ['keyboard', 'klavye', 'keyboard']
    },
    { 
      name: 'Mouse', 
      path: '/bize-sat/mouse', 
      icon: '🖱️',
      keywords: ['mouse', 'fare', 'mouse']
    },
    { 
      name: 'Tablet', 
      path: '/bize-sat/tablet', 
      icon: '📱',
      keywords: ['tablet', 'tablet', 'ipad', 'android tablet']
    },
    { 
      name: 'Kulaklık', 
      path: '/bize-sat/kulaklik', 
      icon: '🎧',
      keywords: ['headphones', 'headset', 'kulaklık', 'earphones']
    },
    { 
      name: 'Ses Sistemi', 
      path: '/bize-sat/ses-sistemi', 
      icon: '🔊',
      keywords: ['sound system', 'speaker', 'ses sistemi', 'audio system']
    },
    { 
      name: 'Oyuncu Direksiyonu', 
      path: '/bize-sat/gaming-direksiyon', 
      icon: '🎮',
      keywords: ['gaming wheel', 'steering wheel', 'direksiyon', 'racing wheel', 'oyuncu direksiyonu']
    }
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Search functionality
  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      const searchLower = query.toLowerCase();
      
      // Genel kategori araması (satılık, ilan, kategori gibi kelimeler için)
      let generalResults: SearchResult[] = [];
      
      if (searchLower.includes('satılık') || searchLower.includes('satilik') || searchLower.includes('ilan')) {
        generalResults.push({
          id: 'satilik-ilanlar-genel',
          title: 'Satılık İlanlar (Tüm Kategoriler)',
          category: 'Genel Kategori',
          price: 0,
          image: '📋',
          url: '/satilik-ilanlar',
          type: 'satilik-ilanlar' as const
        });
      }
      
      if (searchLower.includes('kategori') || searchLower.includes('category')) {
        generalResults.push({
          id: 'kategoriler-genel',
          title: 'Tüm Kategoriler',
          category: 'Genel Kategori',
          price: 0,
          image: '📂',
          url: '/bize-sat',
          type: 'bize-sat' as const
        });
      }
      
      if (searchLower.includes('bize') || searchLower.includes('sat')) {
        generalResults.push({
          id: 'bize-sat-genel',
          title: 'Bize Sat (Tüm Kategoriler)',
          category: 'Genel Kategori',
          price: 0,
          image: '💰',
          url: '/bize-sat',
          type: 'bize-sat' as const
        });
      }

      // Ürün araması
      const filteredProducts = mockProducts.filter(product =>
        product.title.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );

      // Kategori araması (keywords dahil)
      const filteredSatilikIlanlar = satilikIlanlarCategories.filter(category =>
        category.name.toLowerCase().includes(searchLower) ||
        category.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchLower)
        )
      );

      const filteredBizeSat = bizeSatCategories.filter(category =>
        category.name.toLowerCase().includes(searchLower) ||
        category.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchLower)
        )
      );

      // Sonuçları birleştir (genel sonuçlar önce)
      const allResults: SearchResult[] = [
        ...generalResults,
        ...filteredProducts.map(product => ({
          ...product,
          type: 'product' as const
        })),
        ...filteredSatilikIlanlar.map(category => ({
          id: `satilik-ilanlar-${category.name}`,
          title: `${category.name} (Satılık İlanlar)`,
          category: 'Kategori',
          price: 0,
          image: category.icon,
          url: category.path,
          type: 'satilik-ilanlar' as const
        })),
        ...filteredBizeSat.map(category => ({
          id: `bize-sat-${category.name}`,
          title: `${category.name} (Bize Sat)`,
          category: 'Kategori',
          price: 0,
          image: category.icon,
          url: category.path,
          type: 'bize-sat' as const
        }))
      ];
      
      setResults(allResults);
      setLoading(false);
    }, 500);
  }, [query]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: isMobile ? '20px' : '40px'
      }}>
        <div style={{
          maxWidth: isMobile ? '100%' : '1200px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '24px' : '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>
              Arama sonuçları yükleniyor...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '20px' : '40px'
    }}>
      <div style={{
        maxWidth: isMobile ? '100%' : '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '24px' : '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: isMobile ? '32px' : '48px',
          paddingBottom: isMobile ? '24px' : '32px',
          borderBottom: '2px solid #f1f5f9'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            color: 'white',
            width: isMobile ? '64px' : '80px',
            height: isMobile ? '64px' : '80px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isMobile ? '32px' : '40px',
            margin: '0 auto 20px auto'
          }}>
            🔍
          </div>
          <h1 style={{
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 12px 0'
          }}>
            Arama Sonuçları
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#6b7280',
            margin: '0 auto',
            maxWidth: isMobile ? '100%' : '500px'
          }}>
            "{query}" için {results.length} sonuç bulundu
          </p>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: isMobile ? '40px 20px' : '60px 40px',
            background: '#f8fafc',
            borderRadius: '16px',
            border: '2px dashed #cbd5e1'
          }}>
            <div style={{
              fontSize: isMobile ? '48px' : '64px',
              marginBottom: '16px'
            }}>
              🔍
            </div>
            <h3 style={{
              color: '#374151',
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '600',
              margin: '0 0 12px 0'
            }}>
              Sonuç Bulunamadı
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: isMobile ? '16px' : '18px',
              margin: '0 0 24px 0',
              lineHeight: '1.6'
            }}>
              "{query}" için ürün bulunamadı. Farklı anahtar kelimeler deneyebilir veya kategorileri inceleyebilirsiniz.
            </p>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: isMobile ? '14px 24px' : '16px 32px',
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
              }}>
                🏠 Ana Sayfaya Dön
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {/* Kategori Başlıkları */}
            {results.some(r => r.type === 'bize-sat') && (
              <div style={{
                padding: isMobile ? '12px 16px' : '16px 20px',
                backgroundColor: '#f0fdf4',
                border: '1px solid #dcfce7',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#166534',
                  margin: '0 0 8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🟢 Bize Sat Kategorileri
                </h3>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#16a34a',
                  margin: '0'
                }}>
                  Ürünlerinizi satmak için bu kategorileri kullanabilirsiniz
                </p>
              </div>
            )}
            
            {results.some(r => r.type === 'satilik-ilanlar') && (
              <div style={{
                padding: isMobile ? '12px 16px' : '16px 20px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#991b1b',
                  margin: '0 0 8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🔴 Satılık İlanlar Kategorileri
                </h3>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#dc2626',
                  margin: '0'
                }}>
                  Mevcut satılık ürünleri bu kategorilerde bulabilirsiniz
                </p>
              </div>
            )}
            
            {results.some(r => r.type === 'product') && (
              <div style={{
                padding: isMobile ? '12px 16px' : '16px 20px',
                backgroundColor: '#eff6ff',
                border: '1px solid #dbeafe',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: '#1e40af',
                  margin: '0 0 8px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  🔵 Ürünler
                </h3>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#2563eb',
                  margin: '0'
                }}>
                  Aradığınız ürünler bu kategoride listelenmiştir
                </p>
              </div>
            )}

            {/* Results Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: isMobile ? '16px' : '24px'
            }}>
              {results.map((result) => (
                <a
                  key={result.id}
                  href={result.url}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: 'inherit',
                    background: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: isMobile ? '16px' : '20px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      width: isMobile ? '48px' : '56px',
                      height: isMobile ? '48px' : '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px',
                      borderRadius: '8px',
                      fontSize: isMobile ? '28px' : '32px',
                      backgroundColor: result.type === 'bize-sat' ? '#dcfce7' : 
                                     result.type === 'satilik-ilanlar' ? '#fecaca' : '#f1f5f9'
                    }}>
                      {result.type === 'product' ? (
                        <img
                          src={result.image}
                          alt={result.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: '8px'
                          }}
                        />
                      ) : (
                        result.image
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: '600',
                        fontSize: isMobile ? '16px' : '18px',
                        marginBottom: '4px',
                        color: result.type === 'bize-sat' ? '#166534' : 
                               result.type === 'satilik-ilanlar' ? '#991b1b' : '#1f2937'
                      }}>
                        {result.title}
                      </div>
                      <div style={{
                        fontSize: isMobile ? '14px' : '16px',
                        color: result.type === 'bize-sat' ? '#16a34a' : 
                               result.type === 'satilik-ilanlar' ? '#dc2626' : '#64748b'
                      }}>
                        {result.category}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      fontWeight: '700',
                      color: result.type === 'satilik-ilanlar' ? '#dc2626' : 
                             result.type === 'bize-sat' ? '#22c55e' : '#2563eb',
                      backgroundColor: result.type === 'bize-sat' ? '#dcfce7' : 
                                     result.type === 'satilik-ilanlar' ? '#fecaca' : '#eff6ff',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: isMobile ? '14px' : '16px'
                    }}>
                      {result.type === 'product' ? 
                        `${result.price.toLocaleString('tr-TR')} ₺` : 
                        result.type === 'satilik-ilanlar' ? 'Satılık İlanlar' : 'Bize Sat'
                      }
                    </div>
                    
                    <div style={{
                      color: '#6b7280',
                      fontSize: isMobile ? '14px' : '16px'
                    }}>
                      {result.type === 'product' ? 'Ürün Detayı' : 'Kategoriye Git'} →
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: isMobile ? '32px' : '48px',
          paddingTop: isMobile ? '24px' : '32px',
          borderTop: '2px solid #f1f5f9'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: isMobile ? '14px 24px' : '16px 32px',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}>
              🏠 Ana Sayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div style={{ fontSize: '20px', fontWeight: '600', color: '#374151' }}>
            Sayfa yükleniyor...
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
