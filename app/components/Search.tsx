'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  url: string;
  type?: 'product' | 'satilik-ilanlar' | 'bize-sat';
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  // Bize Sat ve Satılık İlanlar kategorileri (İngilizce eşleştirmeleri ile)
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
      path: '/bize-sat/desktop', 
      icon: '🖥️',
      keywords: ['desktop', 'masaüstü', 'bilgisayar', 'pc', 'computer']
    },
    { 
      name: 'İşlemci', 
      path: '/bize-sat/processor', 
      icon: '⚡',
      keywords: ['processor', 'cpu', 'işlemci', 'processor']
    },
    { 
      name: 'Ekran Kartı', 
      path: '/bize-sat/graphics-card', 
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
      path: '/bize-sat/cooler', 
      icon: '❄️',
      keywords: ['cooler', 'fan', 'soğutucu', 'fan', 'heatsink']
    },
    { 
      name: 'Boş Kasa', 
      path: '/bize-sat/case', 
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
      path: '/bize-sat/keyboard', 
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
      path: '/bize-sat/headphones', 
      icon: '🎧',
      keywords: ['headphones', 'headset', 'kulaklık', 'earphones']
    },
    { 
      name: 'Ses Sistemi', 
      path: '/bize-sat/sound-system', 
      icon: '🔊',
      keywords: ['sound system', 'speaker', 'ses sistemi', 'audio system']
    },
    { 
      name: 'Oyuncu Direksiyonu', 
      path: '/bize-sat/gaming-wheel', 
      icon: '🎮',
      keywords: ['gaming wheel', 'steering wheel', 'direksiyon', 'racing wheel', 'oyuncu direksiyonu']
    }
  ];

  // Search functionality
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Ürün araması
      const filteredProducts = mockProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Kategori araması (keywords dahil)
      const filteredSatilikIlanlar = satilikIlanlarCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      const filteredBizeSat = bizeSatCategories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      // Sonuçları birleştir
      const allResults: SearchResult[] = [
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
      setIsOpen(true);
      setLoading(false);
    }, 300);
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={searchRef} style={{ position: 'relative', width: '100%', zIndex: 10000 }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Ürün, kategori veya marka ara..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            padding: '12px 16px',
            paddingRight: '40px',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            fontSize: '16px',
            background: 'white',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            outline: 'none'
          }}
        />
        
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#64748b'
        }}>
          {loading ? '⏳' : '🔍'}
        </div>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 9999999,
          maxHeight: '400px',
          overflowY: 'auto',
          marginTop: '4px'
        }}>
          {/* Kategori Başlıkları */}
          {results.some(r => r.type === 'bize-sat') && (
            <div style={{
              padding: '8px 16px',
              backgroundColor: '#f0fdf4',
              borderBottom: '1px solid #dcfce7',
              fontSize: '12px',
              fontWeight: '600',
              color: '#166534'
            }}>
              🟢 Bize Sat Kategorileri
            </div>
          )}
          
          {results.some(r => r.type === 'satilik-ilanlar') && (
            <div style={{
              padding: '8px 16px',
              backgroundColor: '#fef2f2',
              borderBottom: '1px solid #fecaca',
              fontSize: '12px',
              fontWeight: '600',
              color: '#991b1b'
            }}>
              🔴 Satılık İlanlar Kategorileri
            </div>
          )}
          
          {results.some(r => r.type === 'product') && (
            <div style={{
              padding: '8px 16px',
              backgroundColor: '#eff6ff',
              borderBottom: '1px solid #dbeafe',
              fontSize: '12px',
              fontWeight: '600',
              color: '#1e40af'
            }}>
              🔵 Ürünler
            </div>
          )}

          {results.map((result) => (
            <a
              key={result.id}
              href={result.url}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                textDecoration: 'none',
                color: 'inherit',
                borderBottom: '1px solid #f1f5f9',
                transition: 'background-color 0.2s',
                backgroundColor: result.type === 'bize-sat' ? '#f0fdf4' : 
                               result.type === 'satilik-ilanlar' ? '#fef2f2' : 'white'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = result.type === 'bize-sat' ? '#dcfce7' : 
                                                     result.type === 'satilik-ilanlar' ? '#fecaca' : '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = result.type === 'bize-sat' ? '#f0fdf4' : 
                                                     result.type === 'satilik-ilanlar' ? '#fef2f2' : 'white';
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                borderRadius: '4px',
                fontSize: '24px',
                backgroundColor: result.type === 'bize-sat' ? '#dcfce7' : 
                               result.type === 'satilik-ilanlar' ? '#fecaca' : '#f1f5f9'
              }}>
                {result.type === 'product' ? (
                  <img
                    src={result.image}
                    alt={result.title}
                    style={{
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }}
                  />
                ) : (
                  result.image
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontWeight: '600',
                  fontSize: '14px',
                  marginBottom: '2px',
                  color: result.type === 'bize-sat' ? '#166534' : 
                         result.type === 'satilik-ilanlar' ? '#991b1b' : '#1f2937'
                }}>
                  {result.title}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: result.type === 'bize-sat' ? '#16a34a' : 
                         result.type === 'satilik-ilanlar' ? '#dc2626' : '#64748b'
                }}>
                  {result.category}
                </div>
              </div>
              <div style={{
                fontWeight: '700',
                color: result.type === 'satilik-ilanlar' ? '#dc2626' : 
                       result.type === 'bize-sat' ? '#22c55e' : '#2563eb',
                backgroundColor: result.type === 'bize-sat' ? '#dcfce7' : 
                               result.type === 'satilik-ilanlar' ? '#fecaca' : '#eff6ff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px'
              }}>
                {result.type === 'product' ? 
                  `${result.price.toLocaleString('tr-TR')} ₺` : 
                  result.type === 'satilik-ilanlar' ? 'Satılık İlanlar' : 'Bize Sat'
                }
              </div>
            </a>
          ))}
          
          {/* View All Results */}
          <div style={{
            padding: '12px 16px',
            textAlign: 'center',
            borderTop: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc'
          }}>
            <a
              href={`/search?q=${encodeURIComponent(query)}`}
              style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Tüm sonuçları görüntüle ({results.length})
            </a>
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 9999999,
          padding: '20px',
          textAlign: 'center',
          marginTop: '4px'
        }}>
          <div style={{ color: '#64748b', marginBottom: '8px' }}>
            "🔍"
          </div>
          <div style={{ fontWeight: '600', marginBottom: '4px' }}>
            Sonuç bulunamadı
          </div>
          <div style={{ fontSize: '14px', color: '#64748b' }}>
            "{query}" için ürün bulunamadı
          </div>
        </div>
      )}
    </div>
  );
} 