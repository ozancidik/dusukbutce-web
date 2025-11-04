'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserInfo {
  id: string;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  isAdmin: boolean;
}

export default function IptalIadeIslemlerimPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Mobile detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        
        if (userLoggedIn !== 'true') {
          console.log('🔍 Kullanıcı giriş yapmamış, login sayfasına yönlendiriliyor...');
          router.push('/login');
          return;
        }

        // Profile sayfasındaki gibi detaylı user data oluştur
        const userData = {
          id: localStorage.getItem('userId') || sessionStorage.getItem('userId'),
          email: localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail'),
          name: (() => {
            const name = localStorage.getItem('userName') || sessionStorage.getItem('userName');
            // Türkçe karakterleri düzelt
            if (name && name.includes('Ä±')) {
              return decodeURIComponent(escape(name));
            }
            return name;
          })(),
          phone: localStorage.getItem('userPhone') || sessionStorage.getItem('userPhone') || '',
          birthDate: localStorage.getItem('userBirthDate') || sessionStorage.getItem('userBirthDate') || '',
          isAdmin: localStorage.getItem('adminLoggedIn') === 'true' || sessionStorage.getItem('adminLoggedIn') === 'true'
        };
        
        console.log('🔍 İptal ve İade İşlemlerim sayfasında userData:', userData);
        
        // Eğer kullanıcı verileri yoksa, localStorage'ı temizle ve login sayfasına yönlendir
        if (!userData.id || !userData.email) {
          console.log('🔍 Kullanıcı verileri bulunamadı, localStorage temizleniyor ve login sayfasına yönlendiriliyor...');
          
          // Tüm localStorage'ı temizle
          localStorage.clear();
          sessionStorage.clear();
          
          // Özellikle userLoggedIn'i temizle
          localStorage.removeItem('userLoggedIn');
          sessionStorage.removeItem('userLoggedIn');
          
          // Sayfayı yenile ve login'e yönlendir
          window.location.href = '/login';
          return;
        }
        
        setUserInfo(userData as UserInfo);
      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/login');
        return;
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div>Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: isMobile ? '12px' : '20px'
    }}>
      {/* Breadcrumb */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: isMobile ? '12px 12px 0' : '20px 20px 0',
        marginBottom: isMobile ? '16px' : '20px'
      }}>
        <div style={{ 
          fontSize: isMobile ? '12px' : '16px',
          color: '#64748b'
        }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Anasayfa</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/profile" style={{ color: '#2563eb', textDecoration: 'none' }}>Profil</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>İptal ve İade İşlemlerim</span>
        </div>
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: isMobile ? '0 12px 20px' : '0 20px 20px'
      }}>
        {/* Ana İçerik */}
        <div style={{ 
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          {/* Başlık */}
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            padding: isMobile ? '20px' : '32px',
            color: 'white'
          }}>
            <h1 style={{
              margin: '0',
              fontSize: isMobile ? '24px' : '32px',
              fontWeight: '700'
            }}>
              🔄 İptal ve İade İşlemlerim
            </h1>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: isMobile ? '14px' : '16px',
              opacity: '0.9'
            }}>
              İptal ve iade taleplerinizi takip edin
            </p>
          </div>

          {/* İçerik */}
          <div style={{ padding: isMobile ? '20px' : '32px' }}>
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#64748b'
            }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔄</div>
              <h3 style={{
                margin: '0 0 12px 0',
                fontSize: isMobile ? '18px' : '24px',
                color: '#1e293b'
              }}>
                Henüz iptal veya iade işleminiz yok
              </h3>
              <p style={{
                margin: '0 0 24px 0',
                fontSize: isMobile ? '14px' : '16px'
              }}>
                İptal veya iade talepleriniz burada görünecek
              </p>
              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center'
              }}>
                <Link href="/siparisler" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 24px' : '16px 32px',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                  }}
                  >
                    📦 Siparişlerimi Görüntüle
                  </button>
                </Link>

                <Link href="/tekliflerim" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'white',
                    color: '#3b82f6',
                    border: '2px solid #3b82f6',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 24px' : '16px 32px',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3b82f6';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                  >
                    💰 Tekliflerimi Görüntüle
                  </button>
                </Link>
              </div>
            </div>

            {/* Bilgi Kartları */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
              gap: '20px',
              marginTop: '40px'
            }}>
              {/* İptal İşlemleri */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>❌</div>
                <h4 style={{
                  margin: '0 0 8px 0',
                  fontSize: isMobile ? '16px' : '18px',
                  color: '#1e293b',
                  fontWeight: '600'
                }}>
                  İptal İşlemleri
                </h4>
                <p style={{
                  margin: '0',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#64748b'
                }}>
                  Sipariş iptal taleplerinizi buradan takip edebilirsiniz
                </p>
              </div>

              {/* İade İşlemleri */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>↩️</div>
                <h4 style={{
                  margin: '0 0 8px 0',
                  fontSize: isMobile ? '16px' : '18px',
                  color: '#1e293b',
                  fontWeight: '600'
                }}>
                  İade İşlemleri
                </h4>
                <p style={{
                  margin: '0',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#64748b'
                }}>
                  Ürün iade taleplerinizi buradan yönetebilirsiniz
                </p>
              </div>

              {/* Durum Takibi */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📊</div>
                <h4 style={{
                  margin: '0 0 8px 0',
                  fontSize: isMobile ? '16px' : '18px',
                  color: '#1e293b',
                  fontWeight: '600'
                }}>
                  Durum Takibi
                </h4>
                <p style={{
                  margin: '0',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#64748b'
                }}>
                  İşlem durumlarınızı anlık olarak takip edin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
