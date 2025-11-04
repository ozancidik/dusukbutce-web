"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading');
  const [message, setMessage] = useState('');
  const [resendStatus, setResendStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setStatus('error');
      setMessage('Geçersiz doğrulama bağlantısı.');
      return;
    }

    verifyEmail(token);
  }, []);

  const verifyEmail = async (token: string) => {
    try {
      console.log('Verifying email with token:', token.substring(0, 10) + '...');
      
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setStatus('success');
        setMessage(data.message);
      } else {
        if (data.error.includes('süresi dolmuş')) {
          setStatus('expired');
          // Token'dan email adresini almak için backend'den bilgi al
          fetchUserEmailFromToken(token);
        } else {
          setStatus('error');
        }
        setMessage(data.error);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const fetchUserEmailFromToken = async (token: string) => {
    try {
      console.log('Fetching user email for token:', token.substring(0, 10) + '...');
      
      const response = await fetch('/api/auth/get-user-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      console.log('Get user email response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('User email fetched:', data.email);
        setUserEmail(data.email);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch user email:', errorData);
      }
    } catch (error) {
      console.error('Failed to fetch user email:', error);
    }
  };

  const handleResendVerification = async () => {
    console.log('Resend verification clicked, userEmail:', userEmail);
    
    if (!userEmail) {
      console.log('No user email available');
      setResendStatus('error');
      setMessage('Email adresi bulunamadı. Lütfen tekrar kayıt olun.');
      return;
    }

    setResendStatus('loading');
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setResendStatus('success');
        setMessage('Yeni doğrulama kodu email adresinize gönderildi. Lütfen email kutunuzu kontrol edin.');
      } else {
        setResendStatus('error');
        setMessage(data.error || 'Doğrulama kodu gönderilemedi.');
      }
    } catch (error) {
      setResendStatus('error');
      setMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        {status === 'loading' && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "3px solid #ffffff",
                  borderTop: "3px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
            <h1 style={{ color: "#2563eb", fontSize: "24px", fontWeight: "700", margin: "0 0 12px 0" }}>
              Email Doğrulanıyor...
            </h1>
            <p style={{ color: "#64748b", margin: 0 }}>
              Lütfen bekleyin, email adresiniz doğrulanıyor.
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: "white" }}
              >
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h1 style={{ color: "#059669", fontSize: "24px", fontWeight: "700", margin: "0 0 12px 0" }}>
              Email Doğrulandı! ✅
            </h1>
            <p style={{ color: "#374151", margin: "0 0 24px 0", lineHeight: "1.6" }}>
              {message}
            </p>
            <Link href="/login">
              <button
                style={{
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Giriş Yap
              </button>
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(239, 68, 68, 0.3)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: "white" }}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="9"
                  x2="9"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1="9"
                  y1="9"
                  x2="15"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1 style={{ color: "#dc2626", fontSize: "24px", fontWeight: "700", margin: "0 0 12px 0" }}>
              Doğrulama Başarısız ❌
            </h1>
            <p style={{ color: "#374151", margin: "0 0 24px 0", lineHeight: "1.6" }}>
              {message}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <Link href="/register">
                <button
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  Tekrar Kayıt Ol
                </button>
              </Link>
              <Link href="/login">
                <button
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Giriş Yap
                </button>
              </Link>
            </div>
          </>
        )}

        {status === 'expired' && (
          <>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(245, 158, 11, 0.3)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: "white" }}
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <polyline points="12,6 12,12 16,14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 style={{ color: "#d97706", fontSize: "24px", fontWeight: "700", margin: "0 0 12px 0" }}>
              Doğrulama Süresi Dolmuş ⏰
            </h1>
            <p style={{ color: "#374151", margin: "0 0 24px 0", lineHeight: "1.6" }}>
              {message}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => handleResendVerification()}
                disabled={resendStatus === 'loading'}
                style={{
                  background: resendStatus === 'loading' ? "#9ca3af" : "#f59e0b",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: resendStatus === 'loading' ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                {resendStatus === 'loading' ? 'Gönderiliyor...' : 'Tekrar Doğrulama Kodu Al'}
              </button>
              <Link href="/login">
                <button
                  style={{
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Giriş Yap
                </button>
              </Link>
            </div>
          </>
        )}
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
