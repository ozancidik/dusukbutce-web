"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessage('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.');
        setIsSuccess(true);
        setEmail("");
      } else {
        setMessage(data.error || 'Bir hata oluştu. Lütfen tekrar deneyin.');
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage('Bağlantı hatası. Lütfen internet bağlantınızı kontrol edin.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '20vh',
      background: '#f8fafc',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '60px 20px 60px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Header */}
                 <div style={{
           background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
           padding: '24px 24px 20px 24px',
           textAlign: 'center',
           position: 'relative'
         }}>
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: '0.3'
          }} />
          
          <h1 style={{
            margin: '0 0 0 0',
            color: 'white',
            fontSize: '28px',
            fontWeight: '700',
            position: 'relative',
            zIndex: 1
          }}>
            Şifremi Unuttum
          </h1>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '12px 0 0 0',
            fontSize: '16px',
            lineHeight: '1.5',
            position: 'relative',
            zIndex: 1
          }}>
            E-posta adresinizi girin, güvenli şifre sıfırlama bağlantısı gönderelim
          </p>
        </div>

        {/* Form */}
        <div style={{ padding: '40px 32px 16px 32px' }}>
          {!isSuccess ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="email" style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '600'
                }}>
                  E-posta Adresi
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
                    fontSize: '16px',
                    transition: 'all 0.2s',
                    boxSizing: 'border-box',
                    background: isLoading ? '#f9fafb' : 'white',
                    color: isLoading ? '#9ca3af' : '#374151'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
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
                    Gönderiliyor...
                  </div>
                ) : (
                  'Şifre Sıfırlama Bağlantısı Gönder'
                )}
              </button>

              {message && (
                <div style={{
                  padding: '16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  background: isSuccess ? '#f0fdf4' : '#fef2f2',
                  color: isSuccess ? '#166534' : '#dc2626',
                  border: `1px solid ${isSuccess ? '#bbf7d0' : '#fecaca'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ fontSize: '18px' }}>
                    {isSuccess ? '✅' : '❌'}
                  </span>
                  {message}
                </div>
              )}
            </form>
          ) : (
            <div style={{ textAlign: 'center' }}>
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
              
              <h3 style={{
                margin: '0 0 16px 0',
                color: '#059669',
                fontSize: '24px',
                fontWeight: '700'
              }}>
                E-posta Gönderildi!
              </h3>
              
              <p style={{
                color: '#6b7280',
                margin: '0 0 24px 0',
                fontSize: '16px',
                lineHeight: '1.6'
              }}>
                Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. 
                Lütfen gelen kutunuzu kontrol edin ve spam klasörünü de unutmayın.
              </p>
              
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setMessage("");
                }}
                style={{
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
                Başka E-posta Gönder
              </button>
            </div>
          )}

          {/* Footer */}
          <div style={{
            marginTop: '16px',
            paddingTop: '24px',
            borderTop: '1px solid #f3f4f6',
            textAlign: 'center'
          }}>
            <p style={{
              color: '#9ca3af',
              margin: '0 0 16px 0',
              fontSize: '14px'
            }}>
              Hatırladınız mı?{' '}
              <Link
                href="/login"
                style={{
                  color: '#2563eb',
                  textDecoration: 'underline',
                  fontWeight: '600',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#2563eb';
                }}
              >
                Giriş yapın
              </Link>
            </p>
            
            <Link
              href="/"
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
              ← Anasayfaya Dön
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