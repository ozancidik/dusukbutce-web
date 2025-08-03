"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [socialLoading, setSocialLoading] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Kullanıcı bilgilerini localStorage'a kaydet
        const loginTime = Date.now();
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("loginTime", loginTime.toString());
        
        if (data.user.isAdmin) {
          localStorage.setItem("adminLoggedIn", "true");
          localStorage.setItem("adminEmail", data.user.email);
        }
        
        router.push("/"); // Anasayfaya yönlendir
      } else {
        setError(data.message || "Giriş yapılırken bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google ile giriş
  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    setError("");
    
    try {
      // Google OAuth popup açma
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        '/api/auth/google',
        'google-login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Popup mesajlarını dinle
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
          const userData = event.data.user;
          const loginTime = Date.now();
          localStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userId", userData.id);
          localStorage.setItem("loginTime", loginTime.toString());
          
          if (userData.isAdmin) {
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", userData.email);
          }
          
          popup?.close();
          window.removeEventListener('message', handleMessage);
          router.push("/");
        } else if (event.data.type === 'GOOGLE_LOGIN_ERROR') {
          setError(event.data.error || "Google ile giriş yapılırken bir hata oluştu.");
          popup?.close();
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Popup kapandığında loading'i durdur
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          setSocialLoading("");
        }
      }, 1000);
      
    } catch (err) {
      setError("Google ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  };

  // Facebook ile giriş
  const handleFacebookLogin = async () => {
    setSocialLoading("facebook");
    setError("");
    
    try {
      // Facebook OAuth popup açma
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      const popup = window.open(
        '/api/auth/facebook',
        'facebook-login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      // Popup mesajlarını dinle
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'FACEBOOK_LOGIN_SUCCESS') {
          const userData = event.data.user;
          localStorage.setItem("userLoggedIn", "true");
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userName", userData.name);
          localStorage.setItem("userId", userData.id);
          
          if (userData.isAdmin) {
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", userData.email);
          }
          
          popup?.close();
          window.removeEventListener('message', handleMessage);
          router.push("/");
        } else if (event.data.type === 'FACEBOOK_LOGIN_ERROR') {
          setError(event.data.error || "Facebook ile giriş yapılırken bir hata oluştu.");
          popup?.close();
          window.removeEventListener('message', handleMessage);
        }
      };

      window.addEventListener('message', handleMessage);
      
      // Popup kapandığında loading'i durdur
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          setSocialLoading("");
        }
      }, 1000);
      
    } catch (err) {
      setError("Facebook ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
          padding: "80px 20px 20px 20px",
        }}
      >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ color: "#2563eb", fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>
            Giriş Yap
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Hesabınıza giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                border: "1px solid #fecaca",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "#1d4ed8";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "#2563eb";
              }
            }}
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Sosyal Medya ile Giriş */}
        <div style={{ marginTop: "24px" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "16px" 
          }}>
            <div style={{ 
              flex: 1, 
              height: "1px", 
              background: "#e2e8f0" 
            }}></div>
            <span style={{ 
              padding: "0 16px", 
              color: "#64748b", 
              fontSize: "14px",
              fontWeight: "500"
            }}>
              veya
            </span>
            <div style={{ 
              flex: 1, 
              height: "1px", 
              background: "#e2e8f0" 
            }}></div>
          </div>

          {/* Google ile Giriş */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={socialLoading === "google"}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "white",
              color: "#374151",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: socialLoading === "google" ? "not-allowed" : "pointer",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "all 0.2s",
              opacity: socialLoading === "google" ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (socialLoading !== "google") {
                e.currentTarget.style.borderColor = "#2563eb";
                e.currentTarget.style.background = "#f8fafc";
              }
            }}
            onMouseLeave={(e) => {
              if (socialLoading !== "google") {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.background = "white";
              }
            }}
          >
            {socialLoading === "google" ? (
              <div style={{ width: "20px", height: "20px", border: "2px solid #e2e8f0", borderTop: "2px solid #2563eb", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {socialLoading === "google" ? "Giriş yapılıyor..." : "Google ile Giriş Yap"}
          </button>

          {/* Facebook ile Giriş */}
          <button
            type="button"
            onClick={() => alert("Facebook OAuth credentials gerekli. Yakında aktif olacak!")}
            disabled={true}
            style={{
              width: "100%",
              padding: "12px 16px",
              background: "#1877f2",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: socialLoading === "facebook" ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              transition: "background 0.2s",
              opacity: socialLoading === "facebook" ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (socialLoading !== "facebook") {
                e.currentTarget.style.background = "#166fe5";
              }
            }}
            onMouseLeave={(e) => {
              if (socialLoading !== "facebook") {
                e.currentTarget.style.background = "#1877f2";
              }
            }}
          >
            {socialLoading === "facebook" ? (
              <div style={{ width: "20px", height: "20px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            )}
            "Facebook ile Giriş Yap (Yakında)"
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ color: "#64748b", margin: "0 0 16px 0" }}>
            Hesabınız yok mu?{" "}
            <Link
              href="/register"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Kayıt olun
            </Link>
          </p>
          
          <Link
            href="/forgot-password"
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Şifremi unuttum
          </Link>
        </div>
      </div>
    </div>
    </>
  );
} 