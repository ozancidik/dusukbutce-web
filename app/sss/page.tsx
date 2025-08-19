"use client";
import React, { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "Siparişimi nasıl takip edebilirim?",
    answer: "Siparişinizi takip etmek için 'Hesap Bilgileri' > 'Sipariş Takibi' bölümünü kullanabilir veya sipariş onay e-postanızdaki takip numarasını kullanabilirsiniz.",
    category: "siparis"
  },
  {
    question: "Ürün iadesi nasıl yapılır?",
    answer: "Ürün iadesi için sipariş tarihinden itibaren 14 gün içinde müşteri hizmetlerimizle iletişime geçmeniz gerekmektedir. Ürün orijinal ambalajında ve kullanılmamış olmalıdır.",
    category: "iade"
  },
  {
    question: "Kargo ücreti ne kadar?",
    answer: "150 TL ve üzeri alışverişlerde kargo ücretsizdir. 150 TL altındaki siparişlerde kargo ücreti 19.90 TL'dir. İstanbul içi aynı gün teslimat seçeneği de mevcuttur.",
    category: "kargo"
  },
  {
    question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    answer: "Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini sunuyoruz. Tüm ödeme işlemleriniz SSL sertifikası ile güvenli şekilde gerçekleştirilmektedir.",
    category: "odeme"
  },
  {
    question: "Ürün garantisi var mı?",
    answer: "Evet, tüm ürünlerimizde üretici garantisi bulunmaktadır. Garanti süreleri ürün kategorisine göre değişiklik göstermektedir. Detaylar için ürün sayfasını inceleyebilirsiniz.",
    category: "garanti"
  },
  {
    question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
    answer: "Müşteri hizmetlerimize 'İletişim' sayfasından, e-posta ile veya telefon ile ulaşabilirsiniz. Çalışma saatlerimiz: Pazartesi-Cuma 09:00-18:00, Cumartesi 09:00-14:00.",
    category: "iletisim"
  },
  {
    question: "Ürün stokta yoksa ne yapabilirim?",
    answer: "Stokta olmayan ürünler için 'Stok Bildirimi' yapabilirsiniz. Ürün stoka girdiğinde size e-posta ile bilgilendirme yapılacaktır.",
    category: "stok"
  },
  {
    question: "Kampanya ve indirimlerden nasıl haberdar olabilirim?",
    answer: "Kampanya ve indirimlerden haberdar olmak için e-bültenimize kayıt olabilir, sosyal medya hesaplarımızı takip edebilir veya mobil uygulamamızı kullanabilirsiniz.",
    category: "kampanya"
  },
  {
    question: "Ürün karşılaştırma özelliği var mı?",
    answer: "Evet, ürünleri karşılaştırmak için 'Karşılaştırma Listem' özelliğini kullanabilirsiniz. En fazla 4 ürünü aynı anda karşılaştırabilirsiniz.",
    category: "karsilastirma"
  },
  {
    question: "Favori ürünlerimi nasıl kaydedebilirim?",
    answer: "Ürün sayfasında kalp ikonuna tıklayarak ürünü favorilerinize ekleyebilirsiniz. Favori ürünlerinizi 'Favori Ürünlerim' sayfasından görüntüleyebilirsiniz.",
    category: "favori"
  }
];

const categories = [
  { id: "all", name: "Tümü", icon: "📋" },
  { id: "siparis", name: "Sipariş", icon: "📦" },
  { id: "iade", name: "İade", icon: "🔄" },
  { id: "kargo", name: "Kargo", icon: "🚚" },
  { id: "odeme", name: "Ödeme", icon: "💳" },
  { id: "garanti", name: "Garanti", icon: "🛡️" },
  { id: "iletisim", name: "İletişim", icon: "📞" }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openItems, setOpenItems] = useState<number[]>([]);
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

  const filteredFAQs = selectedCategory === "all" 
    ? faqData 
    : faqData.filter(faq => faq.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '900px',
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
            fontSize: isMobile ? '24px' : '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Sık Sorulan Sorular
          </h1>
          <p style={{
            fontSize: isMobile ? '16px' : '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Merak ettiğiniz soruların cevaplarını burada bulabilirsiniz
          </p>
        </div>

        {/* Kategori Filtreleri */}
        <div style={{
          marginBottom: '32px',
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e5e7eb'
        }}>
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

        {/* SSS Listesi */}
        <div style={{ marginBottom: '32px' }}>
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              style={{
                marginBottom: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
            >
              <button
                onClick={() => toggleItem(index)}
                style={{
                  width: '100%',
                  background: '#f8fafc',
                  border: 'none',
                  padding: '20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f1f5f9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f8fafc';
                }}
              >
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#374151'
                }}>
                  {faq.question}
                </span>
                <span style={{
                  fontSize: '20px',
                  color: '#6b7280',
                  transition: 'transform 0.2s',
                  transform: openItems.includes(index) ? 'rotate(45deg)' : 'rotate(0deg)'
                }}>
                  +
                </span>
              </button>
              
              {openItems.includes(index) && (
                <div style={{
                  padding: '20px',
                  background: 'white',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <p style={{
                    fontSize: '16px',
                    color: '#6b7280',
                    margin: 0,
                    lineHeight: '1.6'
                  }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Yardım Bölümü */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #0ea5e9'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0369a1',
            margin: '0 0 12px 0'
          }}>
            💡 Hala aradığınız cevabı bulamadınız mı?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: '0 0 20px 0'
          }}>
            Müşteri hizmetlerimizle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
          </p>
                                <Link href="/iletisim" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              📞 İletişime Geç
            </button>
          </Link>
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
