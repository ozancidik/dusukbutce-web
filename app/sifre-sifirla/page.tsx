"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordValidation from "../register/components/PasswordValidation";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false
  });
  
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mobil kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Şifre validasyonu - şifre değiştiğinde
  useEffect(() => {
    if (password) {
      const errors = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
      };
      setPasswordErrors(errors);
    } else {
      setPasswordErrors({
        length: false,
        uppercase: false,
        lowercase: false,
        special: false
      });
    }
  }, [password]);

  // Şifre eşleşme kontrolü
  useEffect(() => {
    if (password && confirmPassword) {
      setPasswordMismatch(password !== confirmPassword);
    } else {
      setPasswordMismatch(false);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
      checkTokenValidity(tokenFromUrl);
    } else {
      setIsCheckingToken(false);
      setMessage("Geçersiz şifre sıfırlama bağlantısı.");
    }
  }, [searchParams]);

  const checkTokenValidity = async (resetToken: string) => {
    try {
      const response = await fetch('/api/auth/verify-reset-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: resetToken }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsValidToken(true);
      } else {
        setMessage("Şifre sıfırlama bağlantısı geçersiz veya süresi dolmuş.");
      }
    } catch (error) {
      setMessage("Token doğrulama sırasında bir hata oluştu.");
    } finally {
      setIsCheckingToken(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    
    // Şifre eşleşme kontrolü
    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor.");
      return;
    }

    // Şifre uzunluk kontrolü
    if (password.length < 8) {
      setMessage("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    if (password.length > 50) {
      setMessage("Şifre en fazla 50 karakter olabilir.");
      return;
    }

    // Şifre karmaşıklık kontrolleri
    if (!/[A-Z]/.test(password)) {
      setMessage("Şifre en az bir büyük harf (A-Z) içermelidir.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setMessage("Şifre en az bir küçük harf (a-z) içermelidir.");
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setMessage("Şifre en az bir özel karakter (!@#$%^&* vb.) içermelidir.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token: token,
          password: password 
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        setMessage("Şifreniz başarıyla güncellendi!");
      } else {
        setMessage(data.error || "Şifre güncellenirken bir hata oluştu.");
      }
    } catch (error) {
      setMessage("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingToken) {
    return (
      <div style={{
        minHeight: '20vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #2563eb',
            borderRadius: '50%',
            margin: '0 auto 20px auto',
            animation: 'spin 1s linear infinite'
          }} />
          <h2 style={{ color: '#374151', margin: '0 0 16px 0' }}>
            Güvenlik Kontrolü Yapılıyor...
          </h2>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Şifre sıfırlama bağlantınız güvenlik kontrolünden geçiriliyor. Lütfen kısa bir süre bekleyin.
          </p>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div style={{
        minHeight: '20vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto'
          }}>
            <span style={{ fontSize: '36px', color: 'white' }}>❌</span>
          </div>
          
          <h2 style={{ color: '#dc2626', margin: '0 0 16px 0' }}>
            Geçersiz Bağlantı
          </h2>
          
          <p style={{ color: '#6b7280', margin: '0 0 24px 0', lineHeight: '1.6' }}>
            {message}
          </p>
          
          <Link href="/sifremi-unuttum" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 24px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
            >
              Yeni Şifre Sıfırlama Talebi
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div style={{
        minHeight: '20vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px auto',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)'
          }}>
            <span style={{ fontSize: '36px', color: 'white' }}>✓</span>
          </div>
          
          <h2 style={{ color: '#059669', margin: '0 0 16px 0' }}>
            Şifre Güncellendi!
          </h2>
          
          <p style={{ color: '#6b7280', margin: '0 0 24px 0', lineHeight: '1.6' }}>
            Yeni şifreniz başarıyla kaydedildi. Artık bu şifre ile giriş yapabilirsiniz.
          </p>
          
          <Link href="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 24px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
            }}
            >
              Giriş Yap
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
          padding: '24px 24px 20px 24px',
          textAlign: 'center',
          position: 'relative'
        }}>
          <h1 style={{
            margin: '0 0 0 0',
            color: 'white',
            fontSize: '28px',
            fontWeight: '700'
          }}>
            Yeni Şifre Belirle
          </h1>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '12px 0 0 0',
            fontSize: '16px',
            lineHeight: '1.5'
          }}>
            Güvenli bir şifre seçin ve hesabınıza erişim sağlayın
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '40px 32px 32px 32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="password" style={{
                display: 'block',
                marginBottom: '8px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Yeni Şifre
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    paddingRight: '48px',
                    borderRadius: '12px',
                    border: (password && (passwordErrors.length === false || passwordErrors.uppercase === false || passwordErrors.lowercase === false || passwordErrors.special === false)) ? '2px solid #dc2626' : '2px solid #e5e7eb',
                    fontSize: '16px',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                    background: isLoading ? '#f9fafb' : 'white',
                    color: isLoading ? '#9ca3af' : '#374151'
                  }}
                  onFocus={(e) => {
                    const hasError = password && (passwordErrors.length === false || passwordErrors.uppercase === false || passwordErrors.lowercase === false || passwordErrors.special === false);
                    e.target.style.borderColor = hasError ? '#dc2626' : '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    const hasError = password && (passwordErrors.length === false || passwordErrors.uppercase === false || passwordErrors.lowercase === false || passwordErrors.special === false);
                    e.target.style.borderColor = hasError ? '#dc2626' : '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#374151',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Şifre validasyon gösterimi */}
              {password && (
                <PasswordValidation 
                  password={password} 
                  passwordErrors={passwordErrors} 
                  isMobile={isMobile} 
                />
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" style={{
                display: 'block',
                marginBottom: '8px',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Şifre Tekrarı
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    paddingRight: '48px',
                    borderRadius: '12px',
                    border: passwordMismatch && confirmPassword ? '2px solid #dc2626' : '2px solid #e5e7eb',
                    fontSize: '16px',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                    background: isLoading ? '#f9fafb' : 'white',
                    color: isLoading ? '#9ca3af' : '#374151'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = passwordMismatch && confirmPassword ? '#dc2626' : '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = passwordMismatch && confirmPassword ? '#dc2626' : '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#374151',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                  title={showConfirmPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                >
                  {showConfirmPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* Şifre eşleşme hatası */}
              {passwordMismatch && confirmPassword && (
                <p style={{
                  margin: '8px 0 0 0',
                  color: '#dc2626',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span>❌</span>
                  Şifreler eşleşmiyor
                </p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              style={{
                background: isLoading ? '#9ca3af' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 0',
                fontWeight: '600',
                fontSize: '16px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: isLoading ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                }
              }}
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  Şifre Güncelleniyor...
                </div>
              ) : (
                'Şifreyi Güncelle'
              )}
            </button>

            {message && (
              <div style={{
                padding: '16px',
                borderRadius: '12px',
                fontSize: '14px',
                lineHeight: '1.5',
                background: message.includes('başarıyla') ? '#f0fdf4' : '#fef2f2',
                color: message.includes('başarıyla') ? '#166534' : '#dc2626',
                border: `1px solid ${message.includes('başarıyla') ? '#bbf7d0' : '#fecaca'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <span style={{ fontSize: '18px' }}>
                  {message.includes('başarıyla') ? '✅' : '❌'}
                </span>
                {message}
              </div>
            )}
          </form>

          {/* Footer */}
          <div style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid #f3f4f6',
            textAlign: 'center'
          }}>
            <Link
              href="/login"
              style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ← Giriş Sayfasına Dön
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '20vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        <div style={{
          maxWidth: '420px',
          width: '100%',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #2563eb',
            borderRadius: '50%',
            margin: '0 auto 20px auto',
            animation: 'spin 1s linear infinite'
          }} />
          <h2 style={{ color: '#374151', margin: '0 0 16px 0' }}>
            Yükleniyor...
          </h2>
          <p style={{ color: '#6b7280', margin: 0 }}>
            Lütfen bekleyin, sayfa yükleniyor.
          </p>
        </div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
