"use client";
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { saveUserData, resetRateLimiting } from '../utils/storageUtils';

interface UseLoginFormProps {
  email: string;
  password: string;
  rememberMe: boolean;
  csrfToken: string | null;
  loginAttempts: number;
  setIsLoading: (value: boolean) => void;
  setError: (error: string) => void;
  setLoginSuccess: (value: boolean) => void;
  setRedirectMessage: (message: string) => void;
  setLoginAttempts: (attempts: number) => void;
  setIsRealPasswordAttempt: (value: boolean) => void;
  setEmailVerificationError: (value: boolean) => void;
  setRequiresPasswordSetup: (value: boolean) => void;
  redirectExecutedRef: React.MutableRefObject<boolean>;
}

/**
 * Login form logic'ini yöneten hook
 */
export const useLoginForm = ({
  email,
  password,
  rememberMe,
  csrfToken,
  loginAttempts,
  setIsLoading,
  setError,
  setLoginSuccess,
  setRedirectMessage,
  setLoginAttempts,
  setIsRealPasswordAttempt,
  setEmailVerificationError,
  setRequiresPasswordSetup,
  redirectExecutedRef
}: UseLoginFormProps) => {
  const router = useRouter();

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
        // Kullanıcı bilgilerini kaydet
        const userData = {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          phone: data.user.phone || '',
          birthDate: data.user.birthDate || '',
          isAdmin: data.user.isAdmin
        };

        const token = data.token || "login-token-" + Math.random().toString(36).substr(2, 9);
        saveUserData(userData, token, rememberMe);
        
        // Rate limiting'i sıfırla
        resetRateLimiting();
        setLoginAttempts(0);
        setIsRealPasswordAttempt(false);
        
        // Yönlendirme flag'ini set et
        redirectExecutedRef.current = true;
        
        if (data.user.isAdmin) {
          // Admin giriş sonrası özel mesaj ve yönlendirme
          setLoginSuccess(true);
          setRedirectMessage("Admin giriş başarılı! Admin paneline yönlendiriliyor...");
          
          // Loading'i hemen durdur
          setIsLoading(false);
          
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.location.pathname === '/login') {
              router.push("/admin");
            }
          }, 1500);
        } else {
          // Normal kullanıcı yönlendirmesi
          const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
          
          if (returnUrl) {
            setLoginSuccess(true);
            setRedirectMessage("Giriş başarılı! Yönlendiriliyorsunuz...");
            
            setTimeout(() => {
              if (typeof window !== 'undefined' && window.location.pathname === '/login') {
                router.push(decodeURIComponent(returnUrl));
              }
            }, 2000);
          } else {
            setLoginSuccess(true);
            setRedirectMessage("Giriş başarılı! Anasayfaya yönlendiriliyor...");
            
            setTimeout(() => {
              if (typeof window !== 'undefined' && window.location.pathname === '/login') {
                router.push("/");
              }
            }, 2000);
          }
        }
        
        // Custom event'i tetikle
        window.dispatchEvent(new Event('localStorageChange'));
      } else {
        // Email doğrulama hatası ise rate limiting'i artırma ve sayacı sıfırla
        if (data.requiresVerification) {
          setEmailVerificationError(true);
          setRequiresPasswordSetup(false);
          setError(data.message || "Email adresinizi doğrulamanız gerekiyor. Email kutunuzu kontrol edin.");
          resetRateLimiting();
          setLoginAttempts(0);
          setIsRealPasswordAttempt(false);
        } else if (data.requiresPasswordSetup) {
          // OAuth kullanıcısı için şifre oluşturma yönlendirmesi
          setRequiresPasswordSetup(true);
          setEmailVerificationError(false);
          setError(data.message || "Şifre ile giriş yapmak için önce şifre oluşturmanız gerekiyor.");
          resetRateLimiting();
          setLoginAttempts(0);
          setIsRealPasswordAttempt(false);
        } else {
          setRequiresPasswordSetup(false);
          // Sadece yanlış şifre hatası için rate limiting'i artır
          if (data.message && data.message.includes("Email veya şifre hatalı")) {
            // Mevcut loginAttempts değerini localStorage'dan oku (başka sayfadan dönmüş olabilir)
            const currentAttempts = parseInt(localStorage.getItem("loginAttempts") || "0");
            const newAttempts = currentAttempts + 1;
            localStorage.setItem("loginAttempts", newAttempts.toString());
            localStorage.setItem("lastLoginAttempt", Date.now().toString());
            localStorage.setItem("isRealPasswordAttempt", "true");
            setLoginAttempts(newAttempts);
            setIsRealPasswordAttempt(true);
          } else {
            // Diğer hatalar için sayacı sıfırla
            resetRateLimiting();
            setLoginAttempts(0);
            setIsRealPasswordAttempt(false);
          }
          
          setError(data.message || "Giriş yapılırken bir hata oluştu.");
        }
      }
    } catch (err) {
      // Bağlantı hatası durumunda sayacı sıfırla
      resetRateLimiting();
      setLoginAttempts(0);
      setIsRealPasswordAttempt(false);
      setError("Bağlantı hatası oluştu.");
    } finally {
      setIsLoading(false);
    }
  }, [
    email,
    password,
    rememberMe,
    csrfToken,
    loginAttempts,
    setIsLoading,
    setError,
    setLoginSuccess,
    setRedirectMessage,
    setLoginAttempts,
    setIsRealPasswordAttempt,
    setEmailVerificationError,
    setRequiresPasswordSetup,
    redirectExecutedRef,
    router
  ]);

  return { handleSubmit };
};

