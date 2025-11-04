'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserInfo {
  id: string | null;
  email: string | null;
  name: string | null;
  phone: string;
  birthDate: string;
  isAdmin: boolean;
}

export default function EvimdenAlPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadUserData = () => {
      const userLoggedIn = localStorage.getItem('userLoggedIn');
      
      if (userLoggedIn !== 'true') {
        router.push('/login');
        return;
      }

      const userData = {
        id: localStorage.getItem('userId'),
        email: localStorage.getItem('userEmail'),
        name: localStorage.getItem('userName'),
        phone: localStorage.getItem('userPhone') || '',
        birthDate: localStorage.getItem('userBirthDate') || '',
        isAdmin: localStorage.getItem('userIsAdmin') === 'true'
      };

      if (!userData.id || !userData.email) {
        localStorage.clear();
        sessionStorage.clear();
        router.push('/login');
        return;
      }

      setUserInfo(userData as UserInfo);
      setLoading(false);
    };

    loadUserData();

    const handleStorageChange = () => {
      loadUserData();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [router]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Yükleniyor...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#333' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#007bff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  DB
                </div>
                <span style={{ fontSize: '24px', fontWeight: 'bold' }}>Düşük Bütçe</span>
              </div>
            </Link>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link href="/profile" style={{ textDecoration: 'none', color: '#333' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                  <span>👤</span>
                  <span>{userInfo?.name}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav style={{ backgroundColor: '#fff', padding: '1rem 0', borderBottom: '1px solid #e9ecef' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px', color: '#666' }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#666' }}>Anasayfa</Link>
            <span>&gt;</span>
            <span>Evimden Al</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{
          backgroundColor: '#fff',
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🏠</div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333', marginBottom: '0.5rem' }}>
              Evimden Al
            </h1>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '2rem' }}>
              Ürününüzü evinizden teslim alıyoruz. Randevu oluşturun ve uzman ekibimiz size ulaşsın.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
            <div style={{
              padding: '1.5rem',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '1rem' }}>📅</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '0.5rem' }}>Randevu Oluştur</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>Size uygun tarih ve saat seçin</p>
              <button style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}>
                Randevu Oluştur
              </button>
            </div>

            <div style={{
              padding: '1.5rem',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '1rem' }}>📞</div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '0.5rem' }}>İletişim</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>WhatsApp ile hızlı iletişim</p>
              <a href="https://wa.me/905385793412?text=Evimden alım için randevu oluşturmak istiyorum." 
                 style={{
                   backgroundColor: '#25D366',
                   color: 'white',
                   textDecoration: 'none',
                   padding: '0.75rem 1.5rem',
                   borderRadius: '8px',
                   fontSize: '16px',
                   fontWeight: 'bold',
                   display: 'block',
                   width: '100%'
                 }}>
                WhatsApp ile İletişim
              </a>
            </div>
          </div>

          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
              Evimden Alım Süreci
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>1️⃣</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '0.25rem' }}>Randevu</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Tarih ve saat seçin</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>2️⃣</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '0.25rem' }}>Hazırlık</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Ürünü hazırlayın</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>3️⃣</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '0.25rem' }}>Teslim</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Uzman ekibimiz gelir</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>4️⃣</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '0.25rem' }}>Ödeme</h4>
                <p style={{ fontSize: '14px', color: '#666' }}>Anında ödeme alın</p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: '#e7f3ff',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #b3d9ff'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '1rem', color: '#0066cc' }}>
              💡 Evimden Alım Avantajları
            </h3>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#333' }}>
              <li style={{ marginBottom: '0.5rem' }}>Ücretsiz evinizden teslim alma</li>
              <li style={{ marginBottom: '0.5rem' }}>Uzman ekibimiz tarafından değerlendirme</li>
              <li style={{ marginBottom: '0.5rem' }}>Anında ödeme</li>
              <li style={{ marginBottom: '0.5rem' }}>Güvenli ve hızlı işlem</li>
              <li>İstanbul içi aynı gün teslim alma</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
