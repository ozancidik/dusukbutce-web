"use client";
import React, { useState } from "react";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "2024'te En İyi Gaming Laptop Seçenekleri",
    excerpt: "Gaming performansı için optimize edilmiş en iyi laptop modellerini ve özelliklerini keşfedin.",
    content: "Gaming laptop seçerken dikkat edilmesi gereken en önemli faktörler...",
    author: "Teknoloji Ekibi",
    date: "2024-08-15",
    category: "gaming",
    readTime: "5 dk",
    image: "🎮",
    tags: ["gaming", "laptop", "performans", "teknoloji"]
  },
  {
    id: 2,
    title: "SSD vs HDD: Hangi Depolama Türünü Seçmelisiniz?",
    excerpt: "Modern bilgisayarlarda SSD ve HDD arasındaki farkları ve hangisinin size uygun olduğunu öğrenin.",
    content: "Depolama teknolojileri sürekli gelişiyor ve kullanıcılar için daha fazla seçenek sunuyor...",
    author: "Donanım Uzmanı",
    date: "2024-08-12",
    category: "donanim",
    readTime: "7 dk",
    image: "💾",
    tags: ["ssd", "hdd", "depolama", "donanım"]
  },
  {
    id: 3,
    title: "Kripto Para Madenciliği için Ekran Kartı Seçimi",
    excerpt: "Mining işlemleri için en uygun ekran kartı modellerini ve özelliklerini inceleyin.",
    content: "Kripto para madenciliği, özellikle GPU tabanlı sistemlerde yüksek performans gerektirir...",
    author: "Mining Uzmanı",
    date: "2024-08-10",
    category: "mining",
    readTime: "6 dk",
    image: "⛏️",
    tags: ["mining", "ekran kartı", "kripto", "gpu"]
  },
  {
    id: 4,
    title: "Monitör Seçerken Dikkat Edilmesi Gerekenler",
    excerpt: "Gaming, iş ve genel kullanım için monitör seçiminde önemli kriterleri keşfedin.",
    content: "Monitör seçimi, bilgisayar deneyiminizi doğrudan etkileyen en önemli kararlardan biridir...",
    author: "Görsel Teknolojiler",
    date: "2024-08-08",
    category: "monitor",
    readTime: "8 dk",
    image: "🖥️",
    tags: ["monitör", "gaming", "çözünürlük", "refresh rate"]
  },
  {
    id: 5,
    title: "Bilgisayar Toplama Rehberi: Başlangıç Seviyesi",
    excerpt: "İlk kez bilgisayar toplayacaklar için detaylı rehber ve öneriler.",
    content: "Bilgisayar toplamak, özellikle ilk kez yapıyorsanız karmaşık görünebilir...",
    author: "Sistem Uzmanı",
    date: "2024-08-05",
    category: "rehber",
    readTime: "12 dk",
    image: "🔧",
    tags: ["bilgisayar toplama", "rehber", "donanım", "başlangıç"]
  },
  {
    id: 6,
    title: "Gaming Mouse Seçimi: DPI, Sensör ve Ergonomi",
    excerpt: "Gaming performansı için mouse seçiminde dikkat edilmesi gereken teknik detaylar.",
    content: "Gaming mouse seçimi sadece görsel tercih değil, performans ve konfor meselesidir...",
    author: "Gaming Uzmanı",
    date: "2024-08-03",
    category: "gaming",
    readTime: "6 dk",
    image: "🖱️",
    tags: ["gaming mouse", "dpi", "ergonomi", "performans"]
  }
];

const categories = [
  { id: "all", name: "Tümü", icon: "📋" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "donanim", name: "Donanım", icon: "🔧" },
  { id: "mining", name: "Mining", icon: "⛏️" },
  { id: "monitor", name: "Monitör", icon: "🖥️" },
  { id: "rehber", name: "Rehber", icon: "📚" }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            Blog
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Teknoloji dünyasından en güncel haberler ve rehberler
          </p>
        </div>

        {/* Arama ve Filtreler */}
        <div style={{
          marginBottom: '32px',
          padding: '24px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
          {/* Arama Kutusu */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Blog yazısı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          {/* Kategori Filtreleri */}
          <div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 16px 0',
              textAlign: 'center'
            }}>
              🔍 Kategorilere Göre Filtrele
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center'
            }}>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    background: selectedCategory === category.id ? '#2563eb' : 'white',
                    color: selectedCategory === category.id ? 'white' : '#374151',
                    border: `1px solid ${selectedCategory === category.id ? '#2563eb' : '#d1d5db'}`,
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Yazısı Sayısı */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '16px',
          background: '#f0f9ff',
          borderRadius: '8px',
          border: '1px solid '#0ea5e9'
        }}>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: 0,
            fontWeight: '500'
          }}>
            📊 {filteredPosts.length} blog yazısı bulundu
          </p>
        </div>

        {/* Blog Yazıları Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              style={{
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Blog Görseli */}
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '64px'
              }}>
                {post.image}
              </div>

              {/* Blog İçeriği */}
              <div style={{ padding: '24px' }}>
                {/* Kategori ve Okuma Süresi */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    background: '#e5e7eb',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    textTransform: 'uppercase',
                    fontWeight: '500'
                  }}>
                    {post.category}
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    ⏱️ {post.readTime}
                  </span>
                </div>

                {/* Başlık */}
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: '0 0 12px 0',
                  lineHeight: '1.4'
                }}>
                  {post.title}
                </h2>

                {/* Özet */}
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: '0 0 16px 0',
                  lineHeight: '1.6'
                }}>
                  {post.excerpt}
                </p>

                {/* Etiketler */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '16px'
                }}>
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        fontSize: '11px',
                        color: '#2563eb',
                        background: '#eff6ff',
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontWeight: '500'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Yazar ve Tarih */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#6b7280'
                }}>
                  <span>👤 {post.author}</span>
                  <span>📅 {formatDate(post.date)}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Boş Durum */}
        {filteredPosts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            background: '#f8fafc',
            borderRadius: '12px',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 12px 0'
            }}>
              Blog yazısı bulunamadı
            </h3>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0
            }}>
              Arama kriterlerinizi değiştirerek tekrar deneyin
            </p>
          </div>
        )}

        {/* Newsletter Aboneliği */}
        <div style={{
          textAlign: 'center',
          padding: '32px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '16px',
          color: 'white',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0 0 12px 0'
          }}>
            📧 Güncel Kalın
          </h3>
          <p style={{
            fontSize: '16px',
            margin: '0 0 20px 0',
            opacity: 0.9
          }}>
            En yeni blog yazılarımızdan haberdar olmak için e-bültenimize abone olun
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="E-posta adresiniz"
              style={{
                padding: '12px 16px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                outline: 'none',
                minWidth: '250px'
              }}
            />
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
              Abone Ol
            </button>
          </div>
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
