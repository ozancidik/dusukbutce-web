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

export default function SifreDegistirPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [showMessage, setShowMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

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
        
        console.log('🔍 Şifre Değiştir sayfasında userData:', userData);
        
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setShowMessage(false);

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setMessage('Lütfen tüm alanları doldurun.');
      setMessageType('error');
      setShowMessage(true);
      setIsSubmitting(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Yeni şifreler eşleşmiyor.');
      setMessageType('error');
      setShowMessage(true);
      setIsSubmitting(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage('Yeni şifre en az 6 karakter olmalıdır.');
      setMessageType('error');
      setShowMessage(true);
      setIsSubmitting(false);
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setMessage('Yeni şifre mevcut şifre ile aynı olamaz.');
      setMessageType('error');
      setShowMessage(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Şifreniz başarıyla değiştirildi.');
        setMessageType('success');
        setShowMessage(true);
        
        // Form'u temizle
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });

        // 3 saniye sonra mesajı gizle
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
      } else {
        setMessage(data.message || 'Şifre değiştirme işlemi başarısız.');
        setMessageType('error');
        setShowMessage(true);
      }
    } catch (error) {
      setMessage('Bağlantı hatası oluştu.');
      setMessageType('error');
      setShowMessage(true);
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <span>Şifre Değiştir</span>
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
              🔐 Şifre Değiştir
            </h1>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: isMobile ? '14px' : '16px',
              opacity: '0.9'
            }}>
              Hesap güvenliğiniz için şifrenizi güncelleyin
            </p>
          </div>

          {/* Form */}
          <div style={{ padding: isMobile ? '20px' : '32px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: isMobile ? '14px' : '16px',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  style={{
                    width: '100%',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: isMobile ? '14px' : '16px',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <p style={{
                  margin: '8px 0 0 0',
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#64748b'
                }}>
                  En az 6 karakter olmalıdır
                </p>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  Yeni Şifre Tekrar
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  style={{
                    width: '100%',
                    padding: isMobile ? '12px 16px' : '16px 20px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: isMobile ? '14px' : '16px',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Mesaj */}
              {showMessage && (
                <div style={{
                  padding: isMobile ? '12px 16px' : '16px 20px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  background: messageType === 'success' ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${messageType === 'success' ? '#bbf7d0' : '#fecaca'}`,
                  color: messageType === 'success' ? '#166534' : '#dc2626',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '500'
                }}>
                  {messageType === 'success' ? '✅' : '❌'} {message}
                </div>
              )}

              {/* Butonlar */}
              <div style={{
                display: 'flex',
                gap: '16px',
                flexDirection: isMobile ? 'column' : 'row'
              }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: '1',
                    background: isSubmitting 
                      ? '#94a3b8' 
                      : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '14px 24px' : '16px 32px',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSubmitting 
                      ? 'none' 
                      : '0 4px 12px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
                    }
                  }}
                >
                  {isSubmitting ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
                </button>

                <Link href="/profile" style={{ textDecoration: 'none', flex: '1' }}>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      background: 'white',
                      color: '#64748b',
                      border: '2px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: isMobile ? '14px 24px' : '16px 32px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.color = '#3b82f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#e2e8f0';
                      e.currentTarget.style.color = '#64748b';
                    }}
                  >
                    İptal
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
