"use client";
import React, { useState, useRef } from "react";
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
  const [rememberMe, setRememberMe] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [emailVerificationError, setEmailVerificationError] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [requiresPasswordSetup, setRequiresPasswordSetup] = useState(false);
  const redirectExecutedRef = useRef(false);
  const router = useRouter();

  // CSRF token al
  React.useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch('/api/auth/csrf-token');
        const data = await response.json();
        if (data.success && data.csrfToken) {
          setCsrfToken(data.csrfToken);
        }
      } catch (error) {
        console.error('CSRF token alınamadı:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  // Google OAuth fallback kontrolü (localStorage'dan ve message event'inden)
  React.useEffect(() => {
    const checkGoogleOAuthFallback = () => {
      const googleOAuthToken = localStorage.getItem('google_oauth_token');
      const googleOAuthUser = localStorage.getItem('google_oauth_user');
      const urlParams = new URLSearchParams(window.location.search);
      const googleOAuthSuccess = urlParams.get('google_oauth_success');
      
      if (googleOAuthSuccess === 'true' && googleOAuthToken && googleOAuthUser) {
        console.log('✅ Google OAuth fallback detected, processing...');
        try {
          const userData = JSON.parse(googleOAuthUser);
          const loginTime = Date.now();
          const userDataToStore = {
            userLoggedIn: "true",
            userEmail: userData.email,
            userName: userData.name,
            userId: userData.id,
            userPhone: userData.phone || '',
            userBirthDate: userData.birthDate || '',
            userIsAdmin: userData.isAdmin.toString(),
            loginTime: loginTime.toString(),
            token: googleOAuthToken,
            user: JSON.stringify({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              phone: userData.phone || '',
              birthDate: userData.birthDate || '',
              isAdmin: userData.isAdmin
            })
          };
          
          // localStorage'a kaydet
          Object.entries(userDataToStore).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          
          // sessionStorage'a da kaydet
          Object.entries(userDataToStore).forEach(([key, value]) => {
            sessionStorage.setItem(key, value);
          });
          
          // Cleanup
          localStorage.removeItem('google_oauth_token');
          localStorage.removeItem('google_oauth_user');
          
          // Loading state'ini temizle
          setSocialLoading("");
          
          // Custom event'i tetikle
          window.dispatchEvent(new Event('localStorageChange'));
          
          // URL'den google_oauth_success parametresini kaldır
          const newUrl = window.location.pathname + (urlParams.get('returnUrl') ? `?returnUrl=${urlParams.get('returnUrl')}` : '');
          window.history.replaceState({}, '', newUrl);
          
          // Yönlendir
          const returnUrl = urlParams.get('returnUrl') || '/';
          router.push(decodeURIComponent(returnUrl));
        } catch (e) {
          console.error('❌ Error processing Google OAuth fallback:', e);
        }
      }
    };
    
    // Message event listener for fallback (from popup)
    const handleFallbackMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'GOOGLE_OAUTH_FALLBACK') {
        console.log('✅ Google OAuth fallback message received');
        try {
          const userData = event.data.user;
          const token = event.data.token;
          const loginTime = Date.now();
          const userDataToStore = {
            userLoggedIn: "true",
            userEmail: userData.email,
            userName: userData.name,
            userId: userData.id,
            userPhone: userData.phone || '',
            userBirthDate: userData.birthDate || '',
            userIsAdmin: userData.isAdmin.toString(),
            loginTime: loginTime.toString(),
            token: token,
            user: JSON.stringify({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              phone: userData.phone || '',
              birthDate: userData.birthDate || '',
              isAdmin: userData.isAdmin
            })
          };
          
          // localStorage'a kaydet
          Object.entries(userDataToStore).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          
          // sessionStorage'a da kaydet
          Object.entries(userDataToStore).forEach(([key, value]) => {
            sessionStorage.setItem(key, value);
          });
          
          // Custom event'i tetikle
          window.dispatchEvent(new Event('localStorageChange'));
          
          // Yönlendir
          const urlParams = new URLSearchParams(window.location.search);
          const returnUrl = urlParams.get('returnUrl') || '/';
          router.push(decodeURIComponent(returnUrl));
        } catch (e) {
          console.error('❌ Error processing Google OAuth fallback message:', e);
        }
      }
    };
    
    window.addEventListener('message', handleFallbackMessage);
    checkGoogleOAuthFallback();
    
    return () => {
      window.removeEventListener('message', handleFallbackMessage);
    };
  }, [router]);

  // Kullanıcı ve admin giriş kontrolü
  React.useEffect(() => {
    // Bu useEffect sadece login sayfasında çalışmalı
    // Eğer login sayfasında değilse, hemen çık ve event listener'ları ekleme
    const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';
    
    if (!isLoginPage) {
      console.log("👤 [LOGIN PAGE] useEffect çalıştı ama login sayfasında değil, işlem yapılmıyor. Mevcut sayfa:", typeof window !== 'undefined' ? window.location.pathname : 'N/A');
      return () => {
        // Cleanup - hiçbir şey yapma çünkü event listener eklemedik
      };
    }
    
    console.log("👤 [LOGIN PAGE] useEffect çalıştı, login sayfasında, event listener'lar ekleniyor...");

    const checkUserStatus = () => {
      // Login sayfasında değilse hiçbir şey yapma
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        console.log("👤 [LOGIN PAGE] checkUserStatus çağrıldı ama login sayfasında değil, işlem yapılmıyor. Mevcut sayfa:", window.location.pathname);
        return;
      }
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
      const adminEmail = localStorage.getItem("adminEmail") || sessionStorage.getItem("adminEmail");
      const adminToken = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
      const userLoggedIn = localStorage.getItem("userLoggedIn") || sessionStorage.getItem("userLoggedIn");
      const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
      
      // Login sayfasında admin kontrolü yapma - kullanıcı login yapmak istiyor
      // Eğer admin bilgileri varsa ama token geçersizse temizle
      if (adminLoggedIn === "true" || adminEmail) {
        // Token kontrolü yap
        if (!adminToken) {
          // Token yok, admin bilgilerini temizle
          console.log("🔒 Admin token eksik, admin bilgileri temizleniyor...");
          localStorage.removeItem("adminLoggedIn");
          localStorage.removeItem("adminEmail");
          localStorage.removeItem("adminToken");
          sessionStorage.removeItem("adminLoggedIn");
          sessionStorage.removeItem("adminEmail");
          sessionStorage.removeItem("adminToken");
        } else {
          // Token var, geçerliliğini kontrol et
          try {
            const tokenParts = adminToken.split('.');
            if (tokenParts.length === 3) {
              const payload = JSON.parse(atob(tokenParts[1]));
              const now = Math.floor(Date.now() / 1000);
              // Token süresi dolmuşsa temizle
              if (payload.exp && payload.exp <= now) {
                console.log("🔒 Admin token süresi dolmuş, temizleniyor...");
                localStorage.removeItem("adminLoggedIn");
                localStorage.removeItem("adminEmail");
                localStorage.removeItem("adminToken");
                sessionStorage.removeItem("adminLoggedIn");
                sessionStorage.removeItem("adminEmail");
                sessionStorage.removeItem("adminToken");
              }
              // Token geçerliyse bile login sayfasında kal - kullanıcı login yapmak istiyor
            } else {
              // Token formatı geçersiz, temizle
              console.log("🔒 Admin token formatı geçersiz, temizleniyor...");
              localStorage.removeItem("adminLoggedIn");
              localStorage.removeItem("adminEmail");
              localStorage.removeItem("adminToken");
              sessionStorage.removeItem("adminLoggedIn");
              sessionStorage.removeItem("adminEmail");
              sessionStorage.removeItem("adminToken");
            }
          } catch (error) {
            // Token parse edilemedi, temizle
            console.log("🔒 Admin token parse edilemedi, temizleniyor...");
            localStorage.removeItem("adminLoggedIn");
            localStorage.removeItem("adminEmail");
            localStorage.removeItem("adminToken");
            sessionStorage.removeItem("adminLoggedIn");
            sessionStorage.removeItem("adminEmail");
            sessionStorage.removeItem("adminToken");
          }
        }
      }
      
      // Normal kullanıcı giriş yapmışsa returnUrl kontrolü yap (sadece login sayfasındaysa)
      // window.location.pathname kontrolü ekleyerek, sadece login sayfasındayken yönlendirme yap
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      if (userLoggedIn === "true" && userEmail && currentPath === '/login') {
        // returnUrl parametresi varsa oraya yönlendir
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
        
        // Yönlendirme flag'ini set et (tekrar yönlendirme yapılmasını önlemek için)
        redirectExecutedRef.current = true;
        
        // Event listener'ları hemen kaldır (yönlendirmeden önce)
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('localStorageChange', handleStorageChange);
        
        if (returnUrl) {
          console.log("👤 [LOGIN PAGE] Kullanıcı giriş yapmış, returnUrl'e yönlendiriliyor:", returnUrl);
          // Yönlendirmeyi hemen yap (setTimeout gereksiz)
          router.push(decodeURIComponent(returnUrl));
        } else {
          console.log("👤 [LOGIN PAGE] Kullanıcı giriş yapmış, anasayfaya yönlendiriliyor...");
          // Yönlendirmeyi hemen yap (setTimeout gereksiz)
          router.push("/");
        }
        return;
      } else if (userLoggedIn === "true" && userEmail && currentPath !== '/login') {
        // Login sayfasında değilse hiçbir şey yapma
        console.log("👤 [LOGIN PAGE] Kullanıcı giriş yapmış ama login sayfasında değil, yönlendirme yapılmıyor. Mevcut sayfa:", currentPath);
        // Event listener'ları kaldır (login sayfasında değilsek)
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('localStorageChange', handleStorageChange);
        return;
      }
      
      // Hiçbir giriş yoksa login sayfasında kal
      console.log("🔓 Giriş yapılmamış, login sayfasında kalınıyor...");
    };

    // İlk kontrol
    checkUserStatus();

    // localStorage değişikliklerini dinle (sadece login sayfasındayken)
    const handleStorageChange = () => {
      // Eğer daha önce yönlendirme yapıldıysa, tekrar yapma
      if (redirectExecutedRef.current) {
        console.log("👤 [LOGIN PAGE] Yönlendirme zaten yapıldı, tekrar yönlendirme yapılmıyor.");
        return;
      }
      
      // Sadece login sayfasındayken yönlendirme yap
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      if (currentPath !== '/login') {
        console.log("👤 [LOGIN PAGE] localStorageChange event'i alındı ama login sayfasında değil, yönlendirme yapılmıyor. Mevcut sayfa:", currentPath);
        return;
      }
      
      console.log("👤 [LOGIN PAGE] localStorageChange event'i alındı, login sayfasında, kontrol ediliyor...");
      
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
      const adminEmail = localStorage.getItem("adminEmail") || sessionStorage.getItem("adminEmail");
      const userLoggedIn = localStorage.getItem("userLoggedIn") || sessionStorage.getItem("userLoggedIn");
      const userEmail = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
      
      // Herhangi bir giriş yapıldıysa kontrol et
      if ((adminLoggedIn === "true" && adminEmail) || (userLoggedIn === "true" && userEmail)) {
        checkUserStatus();
      }
    };

    // Custom event'leri dinle - sadece login sayfasındayken
    // Her pathname değişikliğinde kontrol et
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    if (currentPath === '/login') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('localStorageChange', handleStorageChange);
    }

    return () => {
      // Cleanup - event listener'ları kaldır
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

  // Rate limiting kontrolü - sadece gerçek yanlış şifre girişlerinde göster
  React.useEffect(() => {
    const attempts = localStorage.getItem("loginAttempts") || "0";
    const lastAttemptTime = localStorage.getItem("lastLoginAttempt");
    const now = Date.now();
    
    // 15 dakika geçmişse sayacı sıfırla
    if (lastAttemptTime) {
      const timeDiff = now - parseInt(lastAttemptTime);
      if (timeDiff >= 15 * 60 * 1000) { // 15 dakika
        localStorage.setItem("loginAttempts", "0");
        localStorage.removeItem("lastLoginAttempt");
        setLoginAttempts(0);
      } else {
        // Sadece gerçek yanlış şifre girişi varsa göster
        const isRealPasswordAttempt = localStorage.getItem("isRealPasswordAttempt") === "true";
        if (isRealPasswordAttempt) {
          setLoginAttempts(parseInt(attempts));
        } else {
          // Gerçek yanlış şifre girişi değilse sayacı sıfırla
          localStorage.setItem("loginAttempts", "0");
          localStorage.removeItem("lastLoginAttempt");
          setLoginAttempts(0);
        }
      }
    } else {
      setLoginAttempts(0);
    }
  }, []);

  // Remember Me için email hatırlama
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberMe = localStorage.getItem("rememberMe");
    
    if (rememberedEmail && rememberMe === "true") {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
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
    
    // CSRF token kontrolü
    if (!csrfToken) {
      setError('Güvenlik hatası: Lütfen sayfayı yenileyin.');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, csrfToken }),
        credentials: 'include', // Cookie'leri gönder
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
          userPhone: data.user.phone || '',
          userBirthDate: data.user.birthDate || '',
          userIsAdmin: data.user.isAdmin.toString(),
          loginTime: loginTime.toString(),
          rememberMe: rememberMe.toString(),
          token: data.token || "login-token-" + Math.random().toString(36).substr(2, 9),
          user: JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            phone: data.user.phone || '',
            birthDate: data.user.birthDate || '',
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
        
        // Remember Me değerini de kaydet
        localStorage.setItem("rememberMe", rememberMe.toString());
        sessionStorage.setItem("rememberMe", rememberMe.toString());
        
        // Remember Me işaretliyse email'i hatırla
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", data.user.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        // Rate limiting'i sıfırla
        localStorage.setItem("loginAttempts", "0");
        localStorage.removeItem("lastLoginAttempt");
        localStorage.removeItem("isRealPasswordAttempt");
        setLoginAttempts(0);
        
        // Yönlendirme flag'ini set et (useEffect içindeki yönlendirmeyi önlemek için)
        // Bu flag'i yönlendirmeden ÖNCE set ediyoruz, böylece localStorageChange event'i
        // tetiklendiğinde useEffect içindeki handleStorageChange tekrar yönlendirme yapmayacak
        redirectExecutedRef.current = true;
        
        if (data.user.isAdmin) {
          localStorage.setItem("adminLoggedIn", "true");
          localStorage.setItem("adminEmail", data.user.email);
          localStorage.setItem("adminToken", data.token);
          sessionStorage.setItem("adminLoggedIn", "true");
          sessionStorage.setItem("adminEmail", data.user.email);
          sessionStorage.setItem("adminToken", data.token);
          
          // Admin giriş sonrası özel mesaj ve yönlendirme
          setLoginSuccess(true);
          setRedirectMessage("Admin giriş başarılı! Admin paneline yönlendiriliyor...");
          
          // Loading'i hemen durdur
          setIsLoading(false);
          
          setTimeout(() => {
            // Yönlendirme yapmadan önce hala login sayfasında mıyız kontrol et
            if (typeof window !== 'undefined' && window.location.pathname === '/login') {
              router.push("/admin");
            }
          }, 1500); // 2 saniyeden 1.5 saniyeye düşürdük
        } else {
          // Normal kullanıcı yönlendirmesi - returnUrl varsa oraya, yoksa profile sayfasına git
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
          
          if (returnUrl) {
            setLoginSuccess(true);
            setRedirectMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
            
            setTimeout(() => {
              // Yönlendirme yapmadan önce hala login sayfasında mıyız kontrol et
              if (typeof window !== 'undefined' && window.location.pathname === '/login') {
                router.push(decodeURIComponent(returnUrl));
              }
            }, 2000);
          } else {
            setLoginSuccess(true);
            setRedirectMessage("Giriş başarılı! Anasayfaya yönlendiriliyor...");
            
            setTimeout(() => {
              // Yönlendirme yapmadan önce hala login sayfasında mıyız kontrol et
              if (typeof window !== 'undefined' && window.location.pathname === '/login') {
                router.push("/");
              }
            }, 2000);
          }
        }
        
        // Custom event'i tetikle (yönlendirme flag'ini set ettikten SONRA)
        // Böylece useEffect içindeki handleStorageChange, redirectExecutedRef.current = true olduğunu görecek
        window.dispatchEvent(new Event('localStorageChange'));
      } else {
        // Email doğrulama hatası ise rate limiting'i artırma ve sayacı sıfırla
        if (data.requiresVerification) {
          setEmailVerificationError(true);
          setRequiresPasswordSetup(false);
          setError(data.message || "Email adresinizi doğrulamanız gerekiyor. Email kutunuzu kontrol edin.");
          // Email doğrulama hatası durumunda sayacı sıfırla
          localStorage.setItem("loginAttempts", "0");
          localStorage.removeItem("lastLoginAttempt");
          localStorage.removeItem("isRealPasswordAttempt");
          setLoginAttempts(0);
        } else if (data.requiresPasswordSetup) {
          // OAuth kullanıcısı için şifre oluşturma yönlendirmesi
          setRequiresPasswordSetup(true);
          setEmailVerificationError(false);
          setError(data.message || "Şifre ile giriş yapmak için önce şifre oluşturmanız gerekiyor.");
          // Şifre oluşturma hatası durumunda sayacı sıfırla
          localStorage.setItem("loginAttempts", "0");
          localStorage.removeItem("lastLoginAttempt");
          localStorage.removeItem("isRealPasswordAttempt");
          setLoginAttempts(0);
        } else {
          setRequiresPasswordSetup(false);
          // Sadece yanlış şifre hatası için rate limiting'i artır
          if (data.message && data.message.includes("Email veya şifre hatalı")) {
            const newAttempts = loginAttempts + 1;
            localStorage.setItem("loginAttempts", newAttempts.toString());
            localStorage.setItem("lastLoginAttempt", Date.now().toString());
            localStorage.setItem("isRealPasswordAttempt", "true");
            setLoginAttempts(newAttempts);
          } else {
            // Diğer hatalar için sayacı sıfırla
            localStorage.setItem("loginAttempts", "0");
            localStorage.removeItem("lastLoginAttempt");
            localStorage.removeItem("isRealPasswordAttempt");
            setLoginAttempts(0);
          }
          
          setError(data.message || "Giriş yapılırken bir hata oluştu.");
        }
      }
    } catch (err) {
      // Bağlantı hatası durumunda sayacı sıfırla (gerçek yanlış şifre değil)
      localStorage.setItem("loginAttempts", "0");
      localStorage.removeItem("lastLoginAttempt");
      localStorage.removeItem("isRealPasswordAttempt");
      setLoginAttempts(0);
      
      setError("Bağlantı hatası oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  // Email doğrulama için tekrar mail gönder
  const handleResendVerificationEmail = async () => {
    if (!email) {
      setError("Lütfen email adresinizi girin.");
      return;
    }

    setIsResendingEmail(true);
    setError("");

    try {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setError("Doğrulama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edin.");
        setEmailVerificationError(false);
        setIsEmailSent(true);
        
        // 5 saniye sonra başarı mesajını temizle
        setTimeout(() => {
          setError("");
          setIsEmailSent(false);
        }, 5000);
      } else {
        setError(data.error || "E-posta gönderilemedi. Lütfen tekrar deneyin.");
        setIsEmailSent(false);
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setIsResendingEmail(false);
    }
  };

  // Google ile giriş
  const handleGoogleLogin = async () => {
    setSocialLoading("google");
    setError("");
    
    try {
      // Google OAuth popup açma (mobil uyumlu)
      let width, height, left, top;
      
      // Mobil cihaz kontrolü
      if (window.innerWidth <= 768) {
        // Mobil için tam ekran popup
        width = window.screen.width;
        height = window.screen.height;
        left = 0;
        top = 0;
      } else {
        // Desktop için ortalanmış popup
        width = 500;
        height = 600;
        left = window.screenX + (window.outerWidth - width) / 2;
        top = window.screenY + (window.outerHeight - height) / 2;
      }
      
      const popup = window.open(
        '/api/auth/google',
        'google-login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        setError("Popup penceresi açılamadı. Lütfen popup engelleyicisini kapatıp tekrar deneyin.");
        setSocialLoading("");
        return;
      }

      console.log('🔓 Popup opened, waiting for messages...');

      // Popup mesajlarını dinle
      const handleMessage = (event: MessageEvent) => {
        console.log('📨 Message received:', {
          type: event.data?.type,
          fromOrigin: event.origin,
          currentOrigin: window.location.origin,
          hasData: !!event.data,
          dataType: typeof event.data
        });
        
        // Tüm mesajları log'la (debug için)
        if (event.data && event.data.type) {
          console.log('📨 Message type:', event.data.type);
        }
        
        // Origin kontrolü - production'da www ve non-www farklı olabilir
        const currentOrigin = window.location.origin;
        const eventOrigin = event.origin;
        const currentHost = window.location.hostname;
        
        // Güvenlik: Sadece kendi domain'imizden gelen mesajları kabul et
        // Wildcard '*' artık kullanılmıyor - spesifik origin kontrolü yapıyoruz
        const allowedOrigins = [
          'https://www.dusukbutce.com',
          'https://dusukbutce.com',
          'http://localhost:3000',
          'https://dusukbutce-web.vercel.app'
        ];
        
        // Origin kontrolü - www ve non-www farkını göz ardı et
        let isAllowedOrigin = false;
        
        if (eventOrigin === '*') {
          // Wildcard origin - güvenlik riski, reddet
          console.log('🔒 Message from wildcard origin rejected (security risk)');
          return;
        }
        
        try {
          const eventHost = eventOrigin ? new URL(eventOrigin).hostname : '';
          const normalizedCurrentHost = currentHost.replace(/^www\./, '');
          const normalizedEventHost = eventHost.replace(/^www\./, '');
          
          // Allowed origins listesinde var mı kontrol et
          isAllowedOrigin = allowedOrigins.some(allowed => {
            try {
              const allowedHost = new URL(allowed).hostname.replace(/^www\./, '');
              return normalizedEventHost === allowedHost || normalizedEventHost === normalizedCurrentHost;
            } catch {
              return false;
            }
          });
          
          // Aynı domain kontrolü (fallback)
          if (!isAllowedOrigin) {
            isAllowedOrigin = normalizedCurrentHost === normalizedEventHost || 
                            eventOrigin.includes(currentHost) || 
                            currentHost.includes(eventHost);
          }
          
          if (!isAllowedOrigin) {
            console.log('🔒 Message origin rejected:', {
              eventOrigin,
              eventHost,
              currentHost,
              normalizedEventHost,
              normalizedCurrentHost,
              allowedOrigins
            });
            return;
          }
          
          console.log('✅ Message origin accepted:', eventOrigin);
        } catch (e) {
          // URL parse hatası - origin kontrolü yapamıyoruz, reddet (güvenlik için)
          console.log('🔒 Could not parse origin, rejecting message for security:', eventOrigin);
          return;
        }
        
        if (!event.data || !event.data.type) {
          console.log('⚠️ Invalid message data:', event.data);
          return;
        }
        
        console.log('✅ Message accepted, processing:', event.data.type);
        
        if (event.data.type === 'GOOGLE_LOGIN_SUCCESS') {
          const userData = event.data.user;
          const token = event.data.token;
          const loginTime = Date.now();
          const userDataToStore = {
            userLoggedIn: "true",
            userEmail: userData.email,
            userName: userData.name,
            userId: userData.id,
            userPhone: userData.phone || '',
            userBirthDate: userData.birthDate || '',
            userIsAdmin: userData.isAdmin.toString(),
            loginTime: loginTime.toString(),
            token: token,
            user: JSON.stringify({
              id: userData.id,
              email: userData.email,
              name: userData.name,
              phone: userData.phone || '',
              birthDate: userData.birthDate || '',
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
          
          // Remember Me işaretliyse email'i hatırla
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", userData.email);
            localStorage.setItem("rememberMe", "true");
            sessionStorage.setItem("rememberMe", "true");
          }
          
          // Custom event'i tetikle
          window.dispatchEvent(new Event('localStorageChange'));
          
          if (userData.isAdmin) {
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", userData.email);
            localStorage.setItem("adminToken", token);
            sessionStorage.setItem("adminLoggedIn", "true");
            sessionStorage.setItem("adminEmail", userData.email);
            sessionStorage.setItem("adminToken", token);
          }
          
          popup?.close();
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
          if ((handleMessage as any).popupCheckInterval) {
            clearInterval((handleMessage as any).popupCheckInterval);
          }
          
          console.log('✅ Google login successful, redirecting...');
          
          // returnUrl'e göre yönlendir
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
          
          // Başarı mesajı göster
          setLoginSuccess(true);
          setRedirectMessage("Google ile giriş başarılı! Yönlendiriliyorsunuz...");
          
          setTimeout(() => {
            router.push(decodeURIComponent(returnUrl));
          }, 1000);
        } else if (event.data.type === 'GOOGLE_LOGIN_ERROR') {
          console.error('❌ Google login error:', event.data.error);
          setError(event.data.error || "Google ile giriş yapılırken bir hata oluştu.");
          popup?.close();
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
          if ((handleMessage as any).popupCheckInterval) {
            clearInterval((handleMessage as any).popupCheckInterval);
          }
          setSocialLoading("");
        }
      };

      console.log('👂 Adding message listener for Google OAuth');
      console.log('👂 Current page origin:', window.location.origin);
      console.log('👂 Current page URL:', window.location.href);
      
      // Message listener'ı ekle
      window.addEventListener('message', handleMessage);
      
      // Popup'un kapandığını kontrol et (COOP nedeniyle sınırlı)
      let popupCheckInterval: NodeJS.Timeout;
      let popupCheckCount = 0;
      const maxPopupChecks = 60; // 30 saniye (500ms * 60)
      
      popupCheckInterval = setInterval(() => {
        popupCheckCount++;
        try {
          // Popup kapandıysa ve mesaj gelmediyse loading'i durdur
          if (popup && popup.closed) {
            console.log('🔒 Popup closed, cleaning up...');
            clearInterval(popupCheckInterval);
            window.removeEventListener('message', handleMessage);
            // Eğer hala loading durumundaysa, kullanıcı popup'ı kapattı demektir
            if (socialLoading === "google") {
              setSocialLoading("");
              setError("Giriş işlemi iptal edildi.");
            }
            return;
          }
        } catch (e) {
          // COOP hatası - görmezden gel, sadece sayacı artır
        }
        
        // Maksimum kontrol sayısına ulaşıldıysa temizle
        if (popupCheckCount >= maxPopupChecks) {
          console.log('⏱️ Popup check timeout - cleaning up');
          clearInterval(popupCheckInterval);
          // Loading'i durdur ama hata gösterme (kullanıcı hala işlem yapıyor olabilir)
          if (socialLoading === "google") {
            setSocialLoading("");
          }
        }
      }, 500);
      
      // COOP nedeniyle popup.closed kontrolü yapamıyoruz - sadece message listener'a güveniyoruz
      // Message listener başarılı/hatalı durumları handle edecek
      let timeoutId: NodeJS.Timeout;
      
      // 2 dakika sonra timeout (güvenlik için - daha kısa süre)
      timeoutId = setTimeout(() => {
        console.log('⏱️ Google OAuth timeout - cleaning up');
        clearInterval(popupCheckInterval);
        window.removeEventListener('message', handleMessage);
        try {
          if (popup) {
            popup.close();
          }
        } catch (e) {
          // COOP hatası - görmezden gel
        }
        if (socialLoading === "google") {
          setSocialLoading("");
          setError("Giriş işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
      }, 120000); // 2 dakika
      
      // handleMessage içinde timeout'u temizlemek için referans sakla
      (handleMessage as any).timeoutId = timeoutId;
      (handleMessage as any).popupCheckInterval = popupCheckInterval;
      
    } catch (err) {
      setError("Google ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  };

  // Facebook ile giriş
  const handleFacebookLogin = async () => {
    try {
      setSocialLoading("facebook");
      setError("");
      
      // Return URL'i al
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
      
      // Facebook OAuth URL'ini aç
      const facebookAuthUrl = `/api/auth/facebook?returnUrl=${encodeURIComponent(returnUrl)}`;
      
      // Popup window'u ekranın ortasında aç (mobil uyumlu)
      let width, height, left, top;
      
      // Mobil cihaz kontrolü
      if (window.innerWidth <= 768) {
        // Mobil için tam ekran popup
        width = window.screen.width;
        height = window.screen.height;
        left = 0;
        top = 0;
      } else {
        // Desktop için ortalanmış popup
        width = 500;
        height = 600;
        left = (window.screen.width - width) / 2;
        top = (window.screen.height - height) / 2;
      }
      
      const popup = window.open(
        facebookAuthUrl,
        'facebook-login',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );
      
      // Popup mesajlarını dinle
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === 'FACEBOOK_LOGIN_SUCCESS') {
          const user = event.data.user;
          const token = event.data.token;
          
          // Kullanıcı bilgilerini localStorage'a kaydet
          localStorage.setItem('userLoggedIn', 'true');
          localStorage.setItem('userEmail', user.email);
          localStorage.setItem('userName', user.name);
          localStorage.setItem('userId', user.id);
          localStorage.setItem('userPhone', user.phone || '');
          localStorage.setItem('userBirthDate', user.birthDate || '');
          localStorage.setItem('userIsAdmin', user.isAdmin.toString());
          localStorage.setItem('token', token);
          
          // Admin ise admin bilgilerini de kaydet
          if (user.isAdmin) {
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminEmail', user.email);
            localStorage.setItem('adminToken', token);
            sessionStorage.setItem('adminLoggedIn', 'true');
            sessionStorage.setItem('adminEmail', user.email);
            sessionStorage.setItem('adminToken', token);
          }
          
          // Custom event tetikle
          window.dispatchEvent(new Event('localStorageChange'));
          
          // Popup'ı kapat
          if (popup) popup.close();
          
          // Timeout'u temizle
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
          
          // Loading'i kapat
          setSocialLoading("");
          
          // Başarı mesajı göster
          setLoginSuccess(true);
          setRedirectMessage("Facebook ile giriş başarılı! Yönlendiriliyorsunuz...");
          
          // 2 saniye sonra yönlendir
          setTimeout(() => {
            router.push(decodeURIComponent(returnUrl));
          }, 2000);
          
          // Event listener'ı kaldır
          window.removeEventListener('message', handleMessage);
          
        } else if (event.data.type === 'FACEBOOK_LOGIN_ERROR') {
          setError(event.data.error || 'Facebook ile giriş yapılırken bir hata oluştu.');
          setSocialLoading("");
          
          if (popup) popup.close();
          window.removeEventListener('message', handleMessage);
          
          // Timeout'u temizle
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // COOP nedeniyle window.closed kullanamıyoruz - sadece timeout ile temizle
      let facebookTimeoutId: NodeJS.Timeout;
      
      // 5 dakika sonra timeout (güvenlik için)
      facebookTimeoutId = setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        try {
          if (popup) {
            popup.close();
          }
        } catch (e) {
          // COOP hatası - görmezden gel
        }
        setSocialLoading("");
        setError("Giriş işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.");
      }, 300000); // 5 dakika
      
      // handleMessage içinde timeout'u temizlemek için referans sakla
      (handleMessage as any).timeoutId = facebookTimeoutId;
      
    } catch (error) {
      console.error('Facebook login error:', error);
      setError("Facebook ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  };

  // Success state'inde loading ekranı göster
  if (loginSuccess) {
    return (
      <div
        style={{
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
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
          padding: "60px 20px 40px 20px",
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
        <div style={{ textAlign: "center", marginBottom: "24px", marginTop: "-20px" }}>
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

          {/* Remember Me & Forgot Password */}
          <div style={{ 
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "14px",
                color: "#374151",
              }}
            >
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  marginRight: "8px",
                  width: "16px",
                  height: "16px",
                  accentColor: isAdminForm ? "#7c3aed" : "#2563eb",
                }}
              />
              <span>Beni Hatırla</span>
            </label>

            <Link
              href="/sifremi-unuttum"
              style={{
                marginLeft: "auto",
                color: "#2563eb",
                textDecoration: "underline",
                fontSize: "14px",
                fontWeight: "600",
                whiteSpace: "nowrap"
              }}
            >
              Şifremi unuttum
            </Link>
          </div>

          {error && (
            <div
              style={{
                background: isEmailSent ? "#f0fdf4" : emailVerificationError ? "#fef3c7" : requiresPasswordSetup ? "#e0e7ff" : "#fef2f2",
                color: isEmailSent ? "#166534" : emailVerificationError ? "#d97706" : requiresPasswordSetup ? "#4338ca" : "#dc2626",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                border: isEmailSent ? "1px solid #bbf7d0" : emailVerificationError ? "1px solid #fed7aa" : requiresPasswordSetup ? "1px solid #c7d2fe" : "1px solid #fecaca",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{ lineHeight: "1.5" }}>{error}</div>
              {requiresPasswordSetup && (
                <div>
                  <Link
                    href="/sifremi-unuttum"
                    style={{
                      color: "#4338ca",
                      textDecoration: "underline",
                      fontSize: "14px",
                      fontWeight: "600",
                      display: "inline-block",
                    }}
                  >
                    Şifre oluşturmak için "Şifremi Unuttum" sayfasını kullanın →
                  </Link>
                </div>
              )}
              {emailVerificationError && !isEmailSent && (
                <button
                  type="button"
                  onClick={handleResendVerificationEmail}
                  disabled={isResendingEmail}
                  style={{
                    background: "transparent",
                    border: "1px solid #d97706",
                    color: "#d97706",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    cursor: isResendingEmail ? "not-allowed" : "pointer",
                    marginLeft: "8px",
                    opacity: isResendingEmail ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isResendingEmail) {
                      e.currentTarget.style.background = "#d97706";
                      e.currentTarget.style.color = "white";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isResendingEmail) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#d97706";
                    }
                  }}
                >
                  {isResendingEmail ? "Gönderiliyor..." : "Tekrar Mail Gönder"}
                </button>
              )}
            </div>
          )}

          {/* Rate Limiting Uyarısı - sadece email doğrulama hatası yoksa göster */}
          {loginAttempts > 0 && !emailVerificationError && (
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

        <div style={{ textAlign: "center", marginTop: "16px" }}>
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
        </div>
      </div>
    </div>
    </>
  );
} 