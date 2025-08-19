"use client";
import React from "react";
import Link from "next/link";

export default function SalesAgreementPage() {
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
          Satış Sözleşmesi
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          color: '#6b7280',
          margin: 0,
          lineHeight: '1.6'
        }}>
          Düşük Bütçe Teknoloji A.Ş. ile müşteri arasındaki satış koşulları
        </p>
        </div>

        {/* Sözleşme İçeriği */}
        <div style={{ lineHeight: '1.8', fontSize: '16px', color: '#374151' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              1. Taraflar
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>SATICI:</strong> Düşük Bütçe Teknoloji A.Ş.<br />
              <strong>Adres:</strong> Ihlamurkuyu Mahallesi, Malazgirt Caddesi, No:32/A, 34771, Ümraniye / İstanbul<br />
              <strong>Vergi No:</strong> 1234567890<br />
              <strong>MERSİS No:</strong> 0123456789100001
            </p>
            <p style={{ margin: 0 }}>
              <strong>ALICI:</strong> Bu sözleşmeyi kabul eden ve sipariş veren müşteri
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              2. Sözleşmenin Konusu
            </h2>
            <p style={{ margin: 0 }}>
              Bu sözleşme, ALICI'nın SATICI'dan satın almak istediği ürünlerin satışına ilişkin koşulları 
              ve tarafların karşılıklı hak ve yükümlülüklerini düzenler.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              3. Ürün Bilgileri
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              Satışa konu ürünler, web sitemizde yer alan ürün sayfalarında detayları belirtilen 
              teknoloji ürünleridir. Ürün özellikleri, fiyatları ve stok durumları web sitemizde 
              güncel olarak yayınlanır.
            </p>
            <p style={{ margin: 0 }}>
              Ürün görselleri temsilidir ve gerçek ürünlerle küçük farklılıklar gösterebilir.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              4. Fiyat ve Ödeme
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>4.1.</strong> Ürün fiyatları, web sitemizde belirtilen fiyatlardır ve KDV dahildir.<br />
              <strong>4.2.</strong> Kargo ücreti, sipariş tutarına göre belirlenir ve ayrıca gösterilir.<br />
              <strong>4.3.</strong> Ödeme, kredi kartı, banka kartı, havale/EFT veya kapıda ödeme ile yapılabilir.<br />
              <strong>4.4.</strong> Havale/EFT işlemlerinde açıklama kısmına sipariş numarası yazılmalıdır.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              5. Sipariş ve Onay
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>5.1.</strong> Sipariş, web sitemiz üzerinden verilir ve ALICI tarafından onaylanır.<br />
              <strong>5.2.</strong> Sipariş onayı, ALICI'nın "Siparişi Onayla" butonuna tıklaması ile gerçekleşir.<br />
              <strong>5.3.</strong> Sipariş onayından sonra, SATICI tarafından sipariş onay e-postası gönderilir.<br />
              <strong>5.4.</strong> Sipariş onayı, bu sözleşmenin kabulü anlamına gelir.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              6. Teslimat
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>6.1.</strong> Teslimat, ALICI'nın belirttiği adrese yapılır.<br />
              <strong>6.2.</strong> Teslimat süresi, ürün stok durumuna ve teslimat yöntemine göre değişir.<br />
              <strong>6.3.</strong> İstanbul içi aynı gün teslimat seçeneği mevcuttur.<br />
              <strong>6.4.</strong> Teslimat sırasında ürün ambalajı kontrol edilmelidir.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              7. İade ve Değişim
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>7.1.</strong> ALICI, ürünü teslim aldığı tarihten itibaren 14 gün içinde iade edebilir.<br />
              <strong>7.2.</strong> İade edilecek ürün, orijinal ambalajında ve kullanılmamış olmalıdır.<br />
              <strong>7.3.</strong> İade işlemi için müşteri hizmetlerimizle iletişime geçilmelidir.<br />
              <strong>7.4.</strong> İade kargo ücreti ALICI'ya aittir.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              8. Garanti
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>8.1.</strong> Tüm ürünlerde üretici garantisi bulunur.<br />
              <strong>8.2.</strong> Garanti süreleri ürün kategorisine göre değişir.<br />
              <strong>8.3.</strong> Garanti kapsamı, üretici tarafından belirlenir.<br />
              <strong>8.4.</strong> Garanti işlemleri için üretici yetkili servisleri kullanılır.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              9. Gizlilik ve Kişisel Veriler
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>9.1.</strong> ALICI'nın kişisel verileri, KVKK kapsamında korunur.<br />
              <strong>9.2.</strong> Kişisel veriler, sadece sipariş işlemi için kullanılır.<br />
              <strong>9.3.</strong> Detaylı bilgi için Gizlilik Politikamızı inceleyebilirsiniz.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              10. Uyuşmazlık Çözümü
            </h2>
            <p style={{ margin: '0 0 16px 0' }}>
              <strong>10.1.</strong> Bu sözleşmeden doğan uyuşmazlıklar, Türk hukukuna tabidir.<br />
              <strong>10.2.</strong> Uyuşmazlık çözümünde İstanbul Mahkemeleri ve İcra Müdürlükleri yetkilidir.<br />
              <strong>10.3.</strong> Tüketici uyuşmazlıkları için Tüketici Hakem Heyetleri de yetkilidir.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              11. Sözleşmenin Yürürlüğe Girmesi
            </h2>
            <p style={{ margin: 0 }}>
              Bu sözleşme, ALICI'nın siparişi onaylaması ile yürürlüğe girer ve taraflar arasında 
              bağlayıcı hale gelir. Sözleşme, web sitemizde yayınlanan güncel haliyle geçerlidir.
            </p>
          </section>
        </div>

        {/* İletişim */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #0ea5e9',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0369a1',
            margin: '0 0 12px 0'
          }}>
            💬 Sözleşme hakkında sorularınız mı var?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: '0 0 20px 0'
          }}>
            Hukuki danışmanlık için bizimle iletişime geçin
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
