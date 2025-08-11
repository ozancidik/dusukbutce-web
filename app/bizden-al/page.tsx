"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BizdenAlPage() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  const categories = [
    { id: 'all', name: 'Tüm Kategoriler', icon: '🏠', color: '#3b82f6' },
    { id: 'notebook', name: 'Dizüstü Bilgisayar', icon: '💻', color: '#10b981' },
    { id: 'desktop', name: 'Masaüstü Bilgisayar', icon: '🖥️', color: '#f59e0b' },
    { id: 'monitor', name: 'Monitör', icon: '🖥️', color: '#8b5cf6' },
    { id: 'keyboard', name: 'Klavye', icon: '⌨️', color: '#ef4444' },
    { id: 'mouse', name: 'Fare', icon: '🖱️', color: '#06b6d4' },
    { id: 'headphones', name: 'Kulaklık', icon: '🎧', color: '#84cc16' },
    { id: 'graphics-card', name: 'Ekran Kartı', icon: '🎮', color: '#f97316' },
    { id: 'processor', name: 'İşlemci', icon: '⚡', color: '#ec4899' },
    { id: 'ram', name: 'RAM', icon: '🧠', color: '#6366f1' },
    { id: 'ssd', name: 'SSD', icon: '💾', color: '#14b8a6' },
    { id: 'tablet', name: 'Tablet', icon: '📱', color: '#f43f5e' }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'MacBook Air M2 13" 256GB',
      price: '32.999 TL',
      originalPrice: '39.999 TL',
      discount: '18%',
      image: '/logo.png',
      category: 'notebook',
      rating: 4.8,
      reviews: 127
    },
    {
      id: 2,
      name: 'Samsung 27" Odyssey G5 Gaming Monitor',
      price: '4.999 TL',
      originalPrice: '6.499 TL',
      discount: '23%',
      image: '/logo.png',
      category: 'monitor',
      rating: 4.6,
      reviews: 89
    },
    {
      id: 3,
      name: 'Logitech MX Master 3S Wireless Mouse',
      price: '1.299 TL',
      originalPrice: '1.599 TL',
      discount: '19%',
      image: '/logo.png',
      category: 'mouse',
      rating: 4.9,
      reviews: 234
    },
    {
      id: 4,
      name: 'Corsair K100 RGB Mechanical Keyboard',
      price: '2.899 TL',
      originalPrice: '3.299 TL',
      discount: '12%',
      image: '/logo.png',
      category: 'keyboard',
      rating: 4.7,
      reviews: 156
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? featuredProducts 
    : featuredProducts.filter(product => product.category === selectedCategory);

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
          <div style={{
            fontSize: isMobile ? '48px' : '64px',
            marginBottom: '16px'
          }}>
            🛒
          </div>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '800',
            color: '#1f2937',
            margin: '0 0 16px 0',
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Bizden Al
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#6b7280',
            margin: '0 auto 24px',
            lineHeight: '1.6',
            maxWidth: '600px'
          }}>
            Kaliteli ürünleri uygun fiyatlarla sizlere sunuyoruz. 
            Güvenilir alışveriş deneyimi için doğru adrestesiniz.
          </p>
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
                <div style={{ fontSize: '24px' }}>{category.icon}</div>
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
            {selectedCategory === 'all' ? 'Öne Çıkan Ürünler' : `${categories.find(c => c.id === selectedCategory)?.name} Ürünleri`}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
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
                  height: '200px',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e5e7eb'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain'
                    }}
                  />
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
                    {product.name}
                  </h3>
                  
                  {/* Fiyat */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#dc2626'
                    }}>
                      {product.price}
                    </span>
                    <span style={{
                      fontSize: '16px',
                      color: '#9ca3af',
                      textDecoration: 'line-through'
                    }}>
                      {product.originalPrice}
                    </span>
                    <span style={{
                      background: '#dc2626',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {product.discount} İndirim
                    </span>
                  </div>

                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '16px'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '2px'
                    }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{
                          color: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb',
                          fontSize: '16px'
                        }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span style={{
                      fontSize: '14px',
                      color: '#6b7280'
                    }}>
                      {product.rating} ({product.reviews} değerlendirme)
                    </span>
                  </div>
                </div>

                {/* Satın Al Butonu */}
                <button
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '14px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
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
                  🛒 Satın Al
                </button>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p>Bu kategoride henüz ürün bulunmuyor.</p>
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
            Neden Bizden Almalısınız?
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
