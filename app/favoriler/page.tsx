"use client";
import React, { useState } from "react";
import Link from "next/link";

interface FavoriteProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  brand: string;
  image: string;
  isInStock: boolean;
  addedDate: string;
}

const sampleFavorites: FavoriteProduct[] = [
  {
    id: 1,
    name: "ASUS ROG Strix G15 Gaming Laptop",
    category: "Gaming Laptop",
    price: 25999,
    originalPrice: 28999,
    brand: "ASUS",
    image: "💻",
    isInStock: true,
    addedDate: "2024-08-15"
  },
  {
    id: 2,
    name: "MSI RTX 4070 Gaming X Trio",
    category: "Ekran Kartı",
    price: 18999,
    brand: "MSI",
    image: "🎮",
    isInStock: true,
    addedDate: "2024-08-14"
  },
  {
    id: 3,
    name: "Samsung 970 EVO Plus 1TB SSD",
    category: "SSD",
    price: 899,
    originalPrice: 1199,
    brand: "Samsung",
    image: "💾",
    isInStock: false,
    addedDate: "2024-08-13"
  },
  {
    id: 4,
    name: "Logitech G Pro X Superlight",
    category: "Gaming Mouse",
    price: 2499,
    brand: "Logitech",
    image: "🖱️",
    isInStock: true,
    addedDate: "2024-08-12"
  },
  {
    id: 5,
    name: "LG 27GL850-B Gaming Monitor",
    category: "Monitör",
    price: 8999,
    originalPrice: 10999,
    brand: "LG",
    image: "🖥️",
    isInStock: true,
    addedDate: "2024-08-11"
  }
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>(sampleFavorites);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const categories = [
    { id: "all", name: "Tümü", icon: "📋" },
    { id: "gaming-laptop", name: "Gaming Laptop", icon: "💻" },
    { id: "ekran-karti", name: "Ekran Kartı", icon: "🎮" },
    { id: "ssd", name: "SSD", icon: "💾" },
    { id: "gaming-mouse", name: "Gaming Mouse", icon: "🖱️" },
    { id: "monitor", name: "Monitör", icon: "🖥️" }
  ];

  const filteredFavorites = favorites.filter(product => {
    if (selectedCategory === "all") return true;
    return product.category.toLowerCase().includes(selectedCategory.replace("-", " "));
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case "price":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "date":
      default:
        return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
    }
  });

  const removeFromFavorites = (productId: number) => {
    setFavorites(favorites.filter(p => p.id !== productId));
  };

  const clearAllFavorites = () => {
    if (confirm('Tüm favorileri silmek istediğinizden emin misiniz?')) {
      setFavorites([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Favori Ürünlerim
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Beğendiğiniz ürünleri takip edin ve fırsatları kaçırmayın
          </p>
        </div>

        {/* Kontroller */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 8px 0'
            }}>
              ❤️ Favori Ürünler
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              margin: 0
            }}>
              {favorites.length} ürün favorilerinizde
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Kategori Filtresi */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>

            {/* Sıralama */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none'
              }}
            >
              <option value="date">📅 Eklenme Tarihi</option>
              <option value="price">💰 Fiyat (Düşük → Yüksek)</option>
              <option value="price-desc">💰 Fiyat (Yüksek → Düşük)</option>
              <option value="name">📝 İsim (A-Z)</option>
            </select>

            {favorites.length > 0 && (
              <button
                onClick={clearAllFavorites}
                style={{
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                🗑️ Tümünü Temizle
              </button>
            )}
          </div>
        </div>

        {/* Favori Ürünler */}
        {sortedFavorites.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {sortedFavorites.map((product) => (
              <div
                key={product.id}
                style={{
                  background: '#f8fafc',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  overflow: 'hidden',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Ürün Görseli ve Stok Durumu */}
                <div style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '64px',
                  position: 'relative'
                }}>
                  {product.image}
                  
                  {/* Stok Durumu */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: product.isInStock ? '#059669' : '#dc2626',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {product.isInStock ? '✅ Stokta' : '❌ Stokta Yok'}
                  </div>

                  {/* İndirim Etiketi */}
                  {product.originalPrice && (
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#f59e0b',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      🔥 %{getDiscountPercentage(product.originalPrice, product.price)} İndirim
                    </div>
                  )}
                </div>

                {/* Ürün Bilgileri */}
                <div style={{ padding: '20px' }}>
                  {/* Kategori ve Marka */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280',
                      background: '#e5e7eb',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontWeight: '500'
                    }}>
                      {product.category}
                    </span>
                    <span style={{
                      fontSize: '14px',
                      color: '#2563eb',
                      fontWeight: '600'
                    }}>
                      {product.brand}
                    </span>
                  </div>

                  {/* Ürün Adı */}
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 12px 0',
                    lineHeight: '1.4'
                  }}>
                    {product.name}
                  </h3>

                  {/* Fiyat */}
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      fontSize: '24px',
                      fontWeight: '700',
                      color: '#059669'
                    }}>
                      {product.price.toLocaleString('tr-TR')} ₺
                    </span>
                    {product.originalPrice && (
                      <span style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        textDecoration: 'line-through',
                        marginLeft: '12px'
                      }}>
                        {product.originalPrice.toLocaleString('tr-TR')} ₺
                      </span>
                    )}
                  </div>

                  {/* Eklenme Tarihi */}
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    margin: '0 0 16px 0'
                  }}>
                    ❤️ {formatDate(product.addedDate)} tarihinde eklendi
                  </p>

                  {/* Aksiyon Butonları */}
                  <div style={{
                    display: 'flex',
                    gap: '8px'
                  }}>
                    <button
                      style={{
                        flex: 1,
                        background: product.isInStock ? '#2563eb' : '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: product.isInStock ? 'pointer' : 'not-allowed',
                        transition: 'background 0.2s'
                      }}
                      disabled={!product.isInStock}
                    >
                      {product.isInStock ? '🛒 Sepete Ekle' : '📦 Stokta Yok'}
                    </button>
                    
                    <button
                      onClick={() => removeFromFavorites(product.id)}
                      style={{
                        background: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '10px 16px',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                      }}
                    >
                      ❌ Çıkar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Boş Durum */
          <div style={{
            textAlign: 'center',
            padding: '60px 40px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '2px dashed #d1d5db'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>❤️</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 16px 0'
            }}>
              Henüz favori ürününüz yok
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: '0 0 24px 0',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Beğendiğiniz ürünleri favorilerinize ekleyerek daha sonra kolayca bulabilirsiniz
            </p>
            <Link href="/products" style={{ textDecoration: 'none' }}>
              <button style={{
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}>
                🛍️ Ürünleri Keşfet
              </button>
            </Link>
          </div>
        )}

        {/* Yardım */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid '#0ea5e9',
          marginTop: '32px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0369a1',
            margin: '0 0 12px 0'
          }}>
            💡 Favoriler Hakkında
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: '0 0 20px 0'
          }}>
            Favori ürünlerinizdeki fiyat değişikliklerini takip edin, stok durumlarını kontrol edin 
            ve özel kampanyalardan haberdar olun.
          </p>
        </div>

        {/* Geri Dön Butonu */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              ← Anasayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
