"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [socialLoading, setSocialLoading] = useState("");
  const [isAdminForm, setIsAdminForm] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [redirectMessage, setRedirectMessage] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const router = useRouter();

  // Admin giriş kontrolü - daha güçlü kontrol
  React.useEffect(() => {
    const checkAdminStatus = () => {
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
      const adminEmail = localStorage.getItem("adminEmail") || sessionStorage.getItem("adminEmail");
      
      // Admin bilgileri varsa ve geçerliyse yönlendir
      if (adminLoggedIn === "true" && adminEmail) {
        console.log("🔒 Admin giriş yapmış, admin paneline yönlendiriliyor...");
        router.push("/admin");
        return;
      }
      
      // Admin bilgileri yoksa veya geçersizse, hiçbir şey yapma
      console.log("🔓 Admin giriş yapılmamış, login sayfasında kalınıyor...");
    };

    // İlk kontrol
    checkAdminStatus();

    // localStorage değişikliklerini dinle - sadece admin giriş yapıldığında
    const handleStorageChange = () => {
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
      const adminEmail = localStorage.getItem("adminEmail") || sessionStorage.getItem("adminEmail");
      
      // Sadece admin giriş yapıldıysa kontrol et
      if (adminLoggedIn === "true" && adminEmail) {
        checkAdminStatus();
      }
    };

    // Custom event'leri dinle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [router]);

  // Smart form detection - sadece gerçek admin email'leri için
  React.useEffect(() => {
    // Sadece gerçek admin email formatları için admin form tespiti
    if (email.includes("@admin.") || email.includes("admin@")) {
      setIsAdminForm(true);
    } else {
      setIsAdminForm(false);
    }
  }, [email]);

  // Rate limiting kontrolü
  React.useEffect(() => {
    const attempts = localStorage.getItem("loginAttempts") || "0";
    setLoginAttempts(parseInt(attempts));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting kontrolü
    if (loginAttempts >= 5) {
      const lastAttemptTime = localStorage.getItem("lastLoginAttempt");
      const now = Date.now();
      const timeDiff = now - (lastAttemptTime ? parseInt(lastAttemptTime) : 0);
      
      if (timeDiff < 15 * 60 * 1000) { // 15 dakika bekleme süresi
        const remainingTime = Math.ceil((15 * 60 * 1000 - timeDiff) / (60 * 1000));
        setError(`Çok fazla giriş denemesi. Lütfen ${remainingTime} dakika bekleyin.`);
        return;
      } else {
        // Süre dolmuş, sıfırla
        localStorage.setItem("loginAttempts", "0");
        setLoginAttempts(0);
      }
    }
    
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
        // Kullanıcı bilgilerini hem localStorage hem sessionStorage'a kaydet
        const loginTime = Date.now();
        const userData = {
          userLoggedIn: "true",
          userEmail: data.user.email,
          userName: data.user.name,
          userId: data.user.id,
          loginTime: loginTime.toString(),
          token: data.token || "login-token-" + Math.random().toString(36).substr(2, 9),
          user: JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            isAdmin: data.user.isAdmin
          })
        };
        
        // localStorage'a kaydet
        Object.entries(userData).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        
        // sessionStorage'a da kaydet (gizli sekme desteği için)
        Object.entries(userData).forEach(([key, value]) => {
          sessionStorage.setItem(key, value);
        });
        
        // Custom event'i tetikle
        window.dispatchEvent(new Event('localStorageChange'));
        
        // Rate limiting'i sıfırla
        localStorage.setItem("loginAttempts", "0");
        setLoginAttempts(0);
        
        if (data.user.isAdmin) {
          localStorage.setItem("adminLoggedIn", "true");
          localStorage.setItem("adminEmail", data.user.email);
          sessionStorage.setItem("adminLoggedIn", "true");
          sessionStorage.setItem("adminEmail", data.user.email);
          
          // Admin giriş sonrası özel mesaj ve yönlendirme
          setLoginSuccess(true);
          setRedirectMessage("Admin giriş başarılı! Admin paneline yönlendiriliyor...");
          
          setTimeout(() => {
            router.push("/admin");
          }, 2000);
        } else {
          // Normal kullanıcı yönlendirmesi - geldiği sayfaya geri dön
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
          
          setLoginSuccess(true);
          setRedirectMessage("Giriş başarılı! Yönlendiriliyor...");
          
          setTimeout(() => {
            router.push(returnUrl);
          }, 2000);
        }
      } else {
        // Hata durumunda rate limiting'i artır
        const newAttempts = loginAttempts + 1;
        localStorage.setItem("loginAttempts", newAttempts.toString());
        localStorage.setItem("lastLoginAttempt", Date.now().toString());
        setLoginAttempts(newAttempts);
        
        setError(data.message || "Giriş yapılırken bir hata oluştu.");
      }
    } catch (err) {
      // Hata durumunda rate limiting'i artır
      const newAttempts = loginAttempts + 1;
      localStorage.setItem("loginAttempts", newAttempts.toString());
      localStorage.setItem("lastLoginAttempt", Date.now().toString());
      setLoginAttempts(newAttempts);
      
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
          const userDataToStore = {
            userLoggedIn: "true",
            userEmail: userData.email,
            userName: userData.name,
            userId: userData.id,
            loginTime: loginTime.toString(),
            token: "google-oauth-token-" + Math.random().toString(36).substr(2, 9),
            user: JSON.stringify({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              isAdmin: userData.isAdmin
            })
          };
          
          // localStorage'a kaydet
          Object.entries(userDataToStore).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          
          // sessionStorage'a da kaydet (gizli sekme desteği için)
          Object.entries(userDataToStore).forEach(([key, value]) => {
            sessionStorage.setItem(key, value);
          });
          
          // Custom event'i tetikle
          window.dispatchEvent(new Event('localStorageChange'));
          
          if (userData.isAdmin) {
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", userData.email);
            sessionStorage.setItem("adminLoggedIn", "true");
            sessionStorage.setItem("adminEmail", userData.email);
          }
          
          popup?.close();
          window.removeEventListener('message', handleMessage);
          
          // returnUrl'e göre yönlendir
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
          router.push(returnUrl);
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

  // Facebook ile giriş (geçici olarak devre dışı)
  const handleFacebookLogin = async () => {
    setError("Facebook OAuth henüz yapılandırılmadı. Lütfen email/şifre ile giriş yapın.");
    
    // Eğer Facebook OAuth aktif olursa, burada da returnUrl kullanılacak
    // const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
    // router.push(returnUrl);
  };

  // Success state'inde loading ekranı göster
  if (loginSuccess) {
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
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>
            {isAdminForm ? "⚙️" : "✅"}
          </div>
          <h2 style={{ 
            color: isAdminForm ? "#7c3aed" : "#10b981", 
            fontSize: "24px", 
            fontWeight: "600", 
            margin: "0 0 16px 0" 
          }}>
            {isAdminForm ? "Admin Giriş Başarılı!" : "Giriş Başarılı!"}
          </h2>
          <p style={{ 
            color: "#64748b", 
            margin: "0 0 24px 0",
            fontSize: "16px"
          }}>
            {redirectMessage}
          </p>
          <div style={{
            width: "40px",
            height: "40px",
            border: `3px solid ${isAdminForm ? "#7c3aed" : "#10b981"}`,
            borderTop: "3px solid transparent",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite"
          }}></div>
        </div>
      </div>
    );
  }

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
          <h1 style={{ 
            color: isAdminForm ? "#7c3aed" : "#2563eb", 
            fontSize: "28px", 
            fontWeight: "700", 
            margin: "0 0 8px 0" 
          }}>
            {isAdminForm ? "⚙️ Admin Girişi" : "Giriş Yap"}
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            {isAdminForm ? "Admin hesabınıza giriş yapın" : "Hesabınıza giriş yapın"}
          </p>
          {isAdminForm && (
            <div style={{
              background: "rgba(124, 58, 237, 0.1)",
              border: "1px solid rgba(124, 58, 237, 0.3)",
              borderRadius: "8px",
              padding: "12px",
              marginTop: "16px",
              fontSize: "14px",
              color: "#7c3aed"
            }}>
              🔒 Admin girişi tespit edildi - Güvenlik kontrolleri aktif
            </div>
          )}
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
              placeholder={isAdminForm ? "admin@example.com" : "ornek@email.com"}
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
                e.target.style.borderColor = isAdminForm ? "#7c3aed" : "#2563eb";
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
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
                required
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  paddingRight: "48px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "8px",
                  fontSize: "16px",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = isAdminForm ? "#7c3aed" : "#2563eb";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "4px",
                  transition: "background-color 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#374151",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
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

          {/* Rate Limiting Uyarısı */}
          {loginAttempts > 0 && (
            <div
              style={{
                background: "#fef3c7",
                color: "#d97706",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                border: "1px solid #fed7aa",
              }}
            >
              ⚠️ {loginAttempts}/5 giriş denemesi kullanıldı. 5 deneme sonrası 15 dakika bekleme süresi aktif.
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              background: isAdminForm ? "#7c3aed" : "#2563eb",
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
                e.currentTarget.style.background = isAdminForm ? "#6d28d9" : "#1d4ed8";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = isAdminForm ? "#7c3aed" : "#2563eb";
              }
            }}
          >
            {isLoading ? (isAdminForm ? "Admin girişi yapılıyor..." : "Giriş yapılıyor...") : (isAdminForm ? "Admin Girişi" : "Giriş Yap")}
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
            onClick={handleFacebookLogin}
            disabled={socialLoading === "facebook"}
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
            {socialLoading === "facebook" ? "Giriş yapılıyor..." : "Facebook ile Giriş Yap"}
          </button>
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ color: "#64748b", margin: "0 0 16px 0" }}>
            Hesabınız yok mu?{" "}
            <Link
              href="/register"
              style={{
                color: "#2563eb",
                textDecoration: "underline",
                fontWeight: "600",
              }}
            >
              Kayıt olun
            </Link>
          </p>
          
          <Link
            href="/forgot-password"
            style={{
              color: "#2563eb",
              textDecoration: "underline",
              fontSize: "14px",
              fontWeight: "700",
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