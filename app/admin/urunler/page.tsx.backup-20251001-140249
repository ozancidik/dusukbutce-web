"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  _id: string;
  name: string;
  category: string;
  brand: string;
  productModel: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  specifications: Record<string, any>;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
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
      fetchProducts();
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    checkAdminStatus();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [router]);

  const fetchProducts = async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin/products');
      const data = await response.json();
      
      if (response.ok && data.success) {
        setProducts(data.products || []);
      } else {
        const errorMessage = data.message || data.error || 'Bilinmeyen hata';
        console.error('Veri çekme hatası:', errorMessage);
        setError(errorMessage);
        setProducts([]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bağlantı hatası';
      console.error('API hatası:', errorMessage);
      setError(errorMessage);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleDeleteProduct = (productId: string) => {
    setDeleteTargetId(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      const response = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: deleteTargetId }),
      });

      const data = await response.json();

      if (data.success) {
        showToastMessage(data.message, 'success');
        setProducts(prev => prev.filter(product => product._id !== deleteTargetId));
      } else {
        showToastMessage(data.message || 'Ürün silinirken bir hata oluştu', 'error');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      showToastMessage('Bağlantı hatası oluştu', 'error');
    }

    setShowDeleteModal(false);
    setDeleteTargetId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTargetId(null);
  };

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productModel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            onClick={fetchProducts}
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
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
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
                  📦
                </div>
                Ürün Kataloğu Yönetimi
              </h1>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#6b7280',
                margin: 0
              }}>
                Tüm ürünleri yönetin, stok takibi yapın ve fiyatları güncelleyin
              </p>
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Link href="/admin" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
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
                  boxShadow: '0 2px 8px rgba(107, 114, 128, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(107, 114, 128, 0.3)';
                }}
                >
                  ← Geri Dön
                </button>
              </Link>
              
              <button
                onClick={() => setShowAddModal(true)}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: isMobile ? '8px 16px' : '12px 20px',
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
                ➕ Yeni Ürün Ekle
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filtreler ve Arama */}
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
              Kategori:
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
            </select>
            
            <input
              type="text"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: isMobile ? '14px' : '16px',
                background: 'white',
                minWidth: '200px'
              }}
            />
            
            <span style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#6b7280'
            }}>
              {filteredProducts.length} ürün bulundu
            </span>
          </div>
        </div>
      </div>

      {/* Ürün Listesi */}
      {filteredProducts.length === 0 ? (
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
            Henüz ürün bulunmuyor
          </h3>
          <p style={{
            color: '#6b7280',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            İlk ürününüzü eklemek için "Yeni Ürün Ekle" butonuna tıklayın.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: isMobile ? '20px' : '24px',
          maxWidth: isMobile ? '100%' : '1400px',
          margin: '0 auto'
        }}>
          {filteredProducts.map((product) => (
            <div key={product._id} style={{
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
                  switch (product.status) {
                    case 'active': return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
                    case 'inactive': return 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
                    case 'draft': return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
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
                  switch (product.status) {
                    case 'active': return '✅ Aktif';
                    case 'inactive': return '❌ Pasif';
                    case 'draft': return '📝 Taslak';
                    default: return product.status;
                  }
                })()}
              </div>

              {/* Ürün Bilgileri */}
              <div style={{
                display: 'flex',
                gap: isMobile ? '16px' : '24px',
                marginTop: isMobile ? '20px' : '24px'
              }}>
                {/* Ürün Resmi */}
                <div style={{
                  width: isMobile ? '80px' : '120px',
                  height: isMobile ? '80px' : '120px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#f9fafb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      fontSize: isMobile ? '24px' : '32px',
                      color: '#9ca3af'
                    }}>
                      📦
                    </div>
                  )}
                </div>

                {/* Ürün Detayları */}
                <div style={{
                  flex: 1,
                  minWidth: 0
                }}>
                  <h3 style={{
                    fontSize: isMobile ? '18px' : '20px',
                    fontWeight: '600',
                    color: '#374151',
                    margin: '0 0 8px 0',
                    lineHeight: '1.3'
                  }}>
                    {product.name}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '12px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#6b7280',
                      background: '#f1f5f9',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      textTransform: 'capitalize'
                    }}>
                      {product.category === 'graphics-card' ? 'Ekran Kartı' :
                       product.category === 'notebook' ? 'Dizüstü Bilgisayar' :
                       product.category === 'desktop' ? 'Masaüstü Bilgisayar' :
                       product.category === 'processor' ? 'İşlemci' :
                       product.category === 'monitor' ? 'Monitör' :
                       product.category === 'keyboard' ? 'Klavye' :
                       product.category === 'mouse' ? 'Fare' :
                       product.category === 'headphones' ? 'Kulaklık' :
                       product.category === 'ram' ? 'RAM' :
                       product.category === 'ssd' ? 'SSD' :
                       product.category === 'tablet' ? 'Tablet' :
                       product.category === 'audio-system' ? 'Ses Sistemi' :
                       product.category === 'case' ? 'Kasa' :
                       product.category === 'cooler' ? 'Soğutucu' :
                       product.category === 'gaming-wheel' ? 'Gaming Direksiyon' :
                       product.category}
                    </span>
                    <span style={{
                      fontSize: isMobile ? '12px' : '14px',
                      color: '#6b7280',
                      background: '#f1f5f9',
                      padding: '4px 8px',
                      borderRadius: '6px'
                    }}>
                      {product.brand} {product.productModel}
                    </span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                    gap: isMobile ? '8px' : '16px',
                    marginBottom: '16px'
                  }}>
                    <div>
                      <strong style={{ fontSize: isMobile ? '12px' : '14px', color: '#374151' }}>
                        Fiyat:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#059669',
                        marginLeft: '8px',
                        fontWeight: '600'
                      }}>
                        {product.price.toLocaleString('tr-TR')} TL
                      </span>
                    </div>
                    <div>
                      <strong style={{ fontSize: isMobile ? '12px' : '14px', color: '#374151' }}>
                        Stok:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: product.stock > 0 ? '#059669' : '#dc2626',
                        marginLeft: '8px',
                        fontWeight: '600'
                      }}>
                        {product.stock} adet
                      </span>
                    </div>
                    <div>
                      <strong style={{ fontSize: isMobile ? '12px' : '14px', color: '#374151' }}>
                        Resim:
                      </strong>
                      <span style={{ 
                        fontSize: isMobile ? '14px' : '16px', 
                        color: '#6b7280',
                        marginLeft: '8px'
                      }}>
                        {product.images?.length || 0} adet
                      </span>
                    </div>
                  </div>

                  <p style={{
                    fontSize: isMobile ? '13px' : '14px',
                    color: '#6b7280',
                    margin: '0 0 16px 0',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Aksiyon Butonları */}
              <div style={{
                display: 'flex',
                gap: isMobile ? '8px' : '12px',
                flexWrap: 'wrap',
                marginTop: '20px'
              }}>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowEditModal(true);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.3)';
                  }}
                >
                  ✏️ Düzenle
                </button>
                
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: isMobile ? '8px 12px' : '10px 16px',
                    fontSize: isMobile ? '12px' : '14px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(220, 38, 38, 0.3)';
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

      {/* Ürün Ekleme Modalı */}
      {showAddModal && (
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
            maxWidth: isMobile ? '100%' : '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb'
          }}>
            <ProductForm
              onSubmit={async (formData) => {
                try {
                  const response = await fetch('/api/admin/products', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                  });

                  const data = await response.json();

                  if (data.success) {
                    showToastMessage(data.message, 'success');
                    setShowAddModal(false);
                    fetchProducts();
                  } else {
                    showToastMessage(data.message || 'Ürün eklenirken bir hata oluştu', 'error');
                  }
                } catch (error) {
                  console.error('Error adding product:', error);
                  showToastMessage('Bağlantı hatası oluştu', 'error');
                }
              }}
              onCancel={() => setShowAddModal(false)}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}

      {/* Ürün Düzenleme Modalı */}
      {showEditModal && selectedProduct && (
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
            maxWidth: isMobile ? '100%' : '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e5e7eb'
          }}>
            <ProductForm
              product={selectedProduct}
              onSubmit={async (formData) => {
                try {
                  const response = await fetch('/api/admin/products', {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      productId: selectedProduct._id,
                      ...formData
                    }),
                  });

                  const data = await response.json();

                  if (data.success) {
                    showToastMessage(data.message, 'success');
                    setShowEditModal(false);
                    setSelectedProduct(null);
                    fetchProducts();
                  } else {
                    showToastMessage(data.message || 'Ürün güncellenirken bir hata oluştu', 'error');
                  }
                } catch (error) {
                  console.error('Error updating product:', error);
                  showToastMessage('Bağlantı hatası oluştu', 'error');
                }
              }}
              onCancel={() => {
                setShowEditModal(false);
                setSelectedProduct(null);
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
                Ürünü Sil
              </h2>
              <p style={{
                fontSize: isMobile ? '14px' : '16px',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.5'
              }}>
                Bu ürünü kalıcı olarak silmek istediğinizden emin misiniz?
              </p>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center'
            }}>
              <button
                onClick={cancelDelete}
                style={{
                  background: 'white',
                  color: '#374151',
                  border: '2px solid #d1d5db',
                  borderRadius: '12px',
                  padding: isMobile ? '12px 20px' : '14px 24px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#9ca3af';
                  e.currentTarget.style.background = '#f9fafb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.background = 'white';
                }}
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: isMobile ? '12px 20px' : '14px 24px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minWidth: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
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
        </div>
      )}
      </div>
    </>
  );
}

// Product Form Component
function ProductForm({ product, onSubmit, onCancel, isMobile }: {
  product?: Product;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isMobile: boolean;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || '',
    brand: product?.brand || '',
    productModel: product?.productModel || '',
    price: product?.price || 0,
    stock: product?.stock || 0,
    description: product?.description || '',
    images: product?.images || [],
    specifications: product?.specifications || {},
    status: product?.status || 'draft'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...newImages]
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{
        fontSize: isMobile ? '20px' : '24px',
        fontWeight: '600',
        color: '#374151',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        {product ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Ürün Adı *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Örn: Dell Latitude E7450"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Kategori *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box',
              background: 'white'
            }}
          >
            <option value="">Kategori Seçin</option>
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
          </select>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Marka *
          </label>
          <input
            type="text"
            required
            value={formData.brand}
            onChange={(e) => handleInputChange('brand', e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Örn: Dell"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Model *
          </label>
          <input
            type="text"
            required
            value={formData.productModel}
            onChange={(e) => handleInputChange('productModel', e.target.value)}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Örn: Latitude E7450"
          />
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Fiyat (TL) *
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Örn: 5000"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            color: '#374151'
          }}>
            Stok *
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.stock}
            onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: isMobile ? '10px' : '12px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: isMobile ? '14px' : '16px',
              boxSizing: 'border-box'
            }}
            placeholder="Örn: 10"
          />
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          color: '#374151'
        }}>
          Açıklama *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          style={{
            width: '100%',
            padding: isMobile ? '10px' : '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: isMobile ? '14px' : '16px',
            boxSizing: 'border-box',
            minHeight: '100px',
            resize: 'vertical'
          }}
          placeholder="Ürün detayları, özellikler, durumu..."
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
          Durum
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          style={{
            width: '100%',
            padding: isMobile ? '10px' : '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: isMobile ? '14px' : '16px',
            boxSizing: 'border-box',
            background: 'white'
          }}
        >
          <option value="draft">Taslak</option>
          <option value="active">Aktif</option>
          <option value="inactive">Pasif</option>
        </select>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: '600',
          color: '#374151'
        }}>
          Ürün Resimleri
        </label>
        
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          style={{
            width: '100%',
            padding: isMobile ? '10px' : '12px',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: isMobile ? '14px' : '16px',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}
        />

        {formData.images.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
            gap: '8px',
            marginTop: '12px'
          }}>
            {formData.images.map((image, index) => (
              <div key={index} style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb'
              }}>
                <img
                  src={image}
                  alt={`Ürün resmi ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    background: 'rgba(220, 38, 38, 0.8)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end'
      }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s',
            opacity: isSubmitting ? 0.6 : 1
          }}
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: isSubmitting ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: isMobile ? '10px 16px' : '12px 20px',
            fontSize: isMobile ? '14px' : '16px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            transition: 'background 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isSubmitting && (
            <div style={{
              width: '16px',
              height: '16px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
          )}
          {isSubmitting ? 'Kaydediliyor...' : (product ? 'Güncelle' : 'Ekle')}
        </button>
      </div>
    </form>
  );
}
