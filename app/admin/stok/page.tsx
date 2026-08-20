"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StockUpdateModal from '../../../components/StockUpdateModal';
import BulkStockUpdateModal from '../../../components/BulkStockUpdateModal';

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
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
  updatedAt: string;
}

interface StockUpdate {
  _id: string;
  productId: string;
  productName: string;
  changeType: 'add' | 'remove' | 'set';
  previousStock: number;
  newStock: number;
  changeAmount: number;
  reason: string;
  updatedBy: string;
  updatedAt: string;
}

function getAdminToken(): string | null {
  return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
}

export default function AdminStockPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stockHistory, setStockHistory] = useState<StockUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const router = useRouter();

  // Kategoriler listesi
  const categories = [
    'notebook', 'desktop', 'graphics-card', 'processor', 'monitor',
    'keyboard', 'mouse', 'headphones', 'ram', 'ssd', 'tablet',
    'audio-system', 'case', 'cooler', 'gaming-wheel'
  ];

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
      fetchStockHistory();
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
      const response = await fetch('/api/admin/products', {
        headers: { 'Authorization': `Bearer ${getAdminToken()}` }
      });
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

  const fetchStockHistory = async () => {
    try {
      const response = await fetch('/api/admin/stock/history', {
        headers: { 'Authorization': `Bearer ${getAdminToken()}` }
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        setStockHistory(data.history || []);
      }
    } catch (error) {
      console.error('Stok geçmişi çekme hatası:', error);
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const handleStockUpdateClick = (product: Product) => {
    setSelectedProduct(product);
    setShowUpdateModal(true);
  };

  const handlePriceUpdateClick = (product: Product) => {
    // Fiyat güncelleme sayfasına yönlendir
    window.location.href = `/admin/fiyat?productId=${product._id}`;
  };

  const handleBulkUpdate = () => {
    setShowBulkUpdateModal(true);
  };

  const handleStockUpdate = async (updateData: any) => {
    try {
      const response = await fetch('/api/admin/stock/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAdminToken()}`
        },
        body: JSON.stringify(updateData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        showToastMessage(data.message, 'success');
        fetchProducts();
      } else {
        showToastMessage(data.message || 'Stok güncellenirken bir hata oluştu', 'error');
      }
    } catch (error) {
      console.error('Stok güncelleme hatası:', error);
      showToastMessage('Bağlantı hatası oluştu', 'error');
    }
  };

  const handleBulkStockUpdate = async (updateData: any) => {
    try {
      const response = await fetch('/api/admin/stock/bulk-update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAdminToken()}`
        },
        body: JSON.stringify(updateData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        showToastMessage(`${data.summary.successful} ürün başarıyla güncellendi`, 'success');
        fetchProducts();
      } else {
        showToastMessage(data.message || 'Toplu stok güncelleme sırasında bir hata oluştu', 'error');
      }
    } catch (error) {
      console.error('Toplu stok güncelleme hatası:', error);
      showToastMessage('Bağlantı hatası oluştu', 'error');
    }
  };

  // Filtrelenmiş ürünler
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.productModel.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStock = true;
    if (stockFilter === 'low') {
      matchesStock = product.stock <= lowStockThreshold;
    } else if (stockFilter === 'out') {
      matchesStock = product.stock === 0;
    } else if (stockFilter === 'in') {
      matchesStock = product.stock > 0;
    }
    
    return matchesCategory && matchesSearch && matchesStock;
  });

  // Düşük stok ürünleri
  const lowStockProducts = products.filter(product => product.stock <= lowStockThreshold);
  const outOfStockProducts = products.filter(product => product.stock === 0);

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
                    background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
                  }}>
                    📊
                  </div>
                  Stok Takip Sistemi
                </h1>
                <p style={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Stok durumunu takip edin, güncelleyin ve uyarıları yönetin
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
                  onClick={handleBulkUpdate}
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)',
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
                    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(124, 58, 237, 0.3)';
                  }}
                >
                  📦 Toplu Güncelleme
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stok Özet Kartları */}
        <div style={{
          maxWidth: isMobile ? '100%' : '1400px',
          margin: '0 auto 24px auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: isMobile ? '16px' : '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '24px' : '32px',
              marginBottom: '8px'
            }}>
              📦
            </div>
            <h3 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 4px 0'
            }}>
              Toplam Ürün
            </h3>
            <p style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: '#2563eb',
              margin: 0
            }}>
              {products.length}
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: isMobile ? '16px' : '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '24px' : '32px',
              marginBottom: '8px'
            }}>
              ⚠️
            </div>
            <h3 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 4px 0'
            }}>
              Düşük Stok
            </h3>
            <p style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: '#f59e0b',
              margin: 0
            }}>
              {lowStockProducts.length}
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: isMobile ? '16px' : '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '24px' : '32px',
              marginBottom: '8px'
            }}>
              ❌
            </div>
            <h3 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 4px 0'
            }}>
              Stokta Yok
            </h3>
            <p style={{
              fontSize: isMobile ? '20px' : '24px',
              fontWeight: '700',
              color: '#dc2626',
              margin: 0
            }}>
              {outOfStockProducts.length}
            </p>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: isMobile ? '16px' : '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: isMobile ? '24px' : '32px',
              marginBottom: '8px'
            }}>
              💰
            </div>
            <h3 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 4px 0'
            }}>
              Toplam Değer
            </h3>
            <p style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '700',
              color: '#059669',
              margin: 0
            }}>
              {products.reduce((total, product) => total + (product.price * product.stock), 0).toLocaleString('tr-TR')} TL
            </p>
          </div>
        </div>

        {/* Filtreler */}
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
              
              <span style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: '#374151'
              }}>
                Stok:
              </span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: isMobile ? '14px' : '16px',
                  background: 'white',
                  cursor: 'pointer'
                }}
              >
                <option value="all">Tümü</option>
                <option value="low">Düşük Stok</option>
                <option value="out">Stokta Yok</option>
                <option value="in">Stokta Var</option>
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
              Ürün bulunamadı
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: isMobile ? '14px' : '16px'
            }}>
              Arama kriterlerinize uygun ürün bulunamadı.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: isMobile ? '16px' : '20px',
            maxWidth: isMobile ? '100%' : '1400px',
            margin: '0 auto'
          }}>
            {filteredProducts.map((product) => (
              <div key={product._id} style={{
                background: 'white',
                borderRadius: '12px',
                padding: isMobile ? '20px' : '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb',
                transition: 'all 0.2s',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
              >
                {/* Stok Durumu Badge */}
                <div style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: (() => {
                    if (product.stock === 0) return 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
                    if (product.stock <= lowStockThreshold) return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
                    return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
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
                    if (product.stock === 0) return '❌ Stokta Yok';
                    if (product.stock <= lowStockThreshold) return '⚠️ Düşük Stok';
                    return '✅ Stokta Var';
                  })()}
                </div>

                <div style={{
                  display: 'flex',
                  gap: isMobile ? '12px' : '16px',
                  marginTop: isMobile ? '20px' : '24px'
                }}>
                  {/* Ürün Resmi */}
                  <div style={{
                    width: isMobile ? '60px' : '80px',
                    height: isMobile ? '60px' : '80px',
                    borderRadius: '8px',
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
                        fontSize: isMobile ? '20px' : '24px',
                        color: '#9ca3af'
                      }}>
                        📦
                      </div>
                    )}
                  </div>

                  {/* Ürün Bilgileri */}
                  <div style={{
                    flex: 1,
                    minWidth: 0
                  }}>
                    <h3 style={{
                      fontSize: isMobile ? '16px' : '18px',
                      fontWeight: '600',
                      color: '#374151',
                      margin: '0 0 8px 0',
                      lineHeight: '1.3'
                    }}>
                      {product.name}
                    </h3>
                    
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '12px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: isMobile ? '11px' : '12px',
                        color: '#6b7280',
                        background: '#f1f5f9',
                        padding: '3px 6px',
                        borderRadius: '4px',
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
                        fontSize: isMobile ? '11px' : '12px',
                        color: '#6b7280',
                        background: '#f1f5f9',
                        padding: '3px 6px',
                        borderRadius: '4px'
                      }}>
                        {product.brand} {product.productModel}
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                      gap: isMobile ? '8px' : '12px',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <strong style={{ fontSize: isMobile ? '11px' : '12px', color: '#374151' }}>
                          Fiyat:
                        </strong>
                        <span style={{ 
                          fontSize: isMobile ? '12px' : '14px', 
                          color: '#059669',
                          marginLeft: '4px',
                          fontWeight: '600'
                        }}>
                          {product.price.toLocaleString('tr-TR')} TL
                        </span>
                      </div>
                      <div>
                        <strong style={{ fontSize: isMobile ? '11px' : '12px', color: '#374151' }}>
                          Stok:
                        </strong>
                        <span style={{ 
                          fontSize: isMobile ? '12px' : '14px', 
                          color: product.stock > 0 ? '#059669' : '#dc2626',
                          marginLeft: '4px',
                          fontWeight: '600'
                        }}>
                          {product.stock} adet
                        </span>
                      </div>
                      <div>
                        <strong style={{ fontSize: isMobile ? '11px' : '12px', color: '#374151' }}>
                          Değer:
                        </strong>
                        <span style={{ 
                          fontSize: isMobile ? '12px' : '14px', 
                          color: '#6b7280',
                          marginLeft: '4px'
                        }}>
                          {(product.price * product.stock).toLocaleString('tr-TR')} TL
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fiyat ve Stok Güncelleme Butonları */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px',
                  marginTop: '16px'
                }}>
                  <button
                    onClick={() => handlePriceUpdateClick(product)}
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
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
                    💰 Fiyat Güncelle
                  </button>
                  
                  <button
                    onClick={() => handleStockUpdateClick(product)}
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
                    ✏️ Stok Güncelle
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

        {/* Stok Güncelleme Modalı */}
        {showUpdateModal && selectedProduct && (
          <StockUpdateModal
            product={selectedProduct}
            onClose={() => {
              setShowUpdateModal(false);
              setSelectedProduct(null);
            }}
            onUpdate={handleStockUpdate}
            isMobile={isMobile}
          />
        )}

        {/* Toplu Stok Güncelleme Modalı */}
        {showBulkUpdateModal && (
          <BulkStockUpdateModal
            onClose={() => setShowBulkUpdateModal(false)}
            onUpdate={handleBulkStockUpdate}
            isMobile={isMobile}
            categories={categories}
          />
        )}
      </div>
    </>
  );
}
