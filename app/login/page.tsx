"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./hooks/useAuth";
import { useOAuth } from "./hooks/useOAuth";
import { useLoginForm } from "./hooks/useLoginForm";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";
import SocialLoginButtons from "./components/SocialLoginButtons";
import LoginSuccess from "./components/LoginSuccess";
import RegisterLink from "./components/RegisterLink";

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
  useEffect(() => {
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

  // OAuth fallback kontrolü (URL parametresinden)
  useEffect(() => {
    const checkOAuthFallback = async (provider: 'google' | 'facebook') => {
      const urlParams = new URLSearchParams(window.location.search);
      const oauthSuccess = urlParams.get(`${provider}_oauth_success`);
      const tokenFromUrl = urlParams.get('token');
      
      if (oauthSuccess === 'true' && tokenFromUrl) {
        try {
          const res = await fetch('/api/auth/verify-token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: tokenFromUrl }),
          });
          
          const data = await res.json();
          
          if (data.success && data.user) {
            const userData = {
              id: data.user._id || data.user.id,
              email: data.user.email,
              name: data.user.name || '',
              phone: data.user.phone || '',
              birthDate: data.user.birthDate || '',
              isAdmin: data.user.isAdmin || false
            };
            
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
              token: tokenFromUrl,
              user: JSON.stringify(userData)
            };
            
            Object.entries(userDataToStore).forEach(([key, value]) => {
              localStorage.setItem(key, value);
              sessionStorage.setItem(key, value);
            });
            
            if (userData.isAdmin) {
              localStorage.setItem("adminLoggedIn", "true");
              localStorage.setItem("adminEmail", userData.email);
              localStorage.setItem("adminToken", tokenFromUrl);
              sessionStorage.setItem("adminLoggedIn", "true");
              sessionStorage.setItem("adminEmail", userData.email);
              sessionStorage.setItem("adminToken", tokenFromUrl);
            }
            
            const returnUrl = urlParams.get('returnUrl') || '/';
            window.history.replaceState({}, '', '/login');
            
            window.dispatchEvent(new Event('localStorageChange'));
            setTimeout(() => {
              router.push(decodeURIComponent(returnUrl));
            }, 100);
          } else {
            setError('Giriş işlemi tamamlanamadı. Lütfen tekrar deneyin.');
            setSocialLoading("");
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Giriş işlemi tamamlanamadı. Lütfen tekrar deneyin.');
          setSocialLoading("");
        }
      }
    };

    checkOAuthFallback('facebook');
    checkOAuthFallback('google');
  }, [router]);

  // Auth hook
  useAuth(socialLoading, setSocialLoading);

  // OAuth hook
  const { handleGoogleLogin, handleFacebookLogin } = useOAuth({
    socialLoading,
    setSocialLoading,
    setError,
    redirectExecutedRef
  });

  // Login form hook
  const { handleSubmit } = useLoginForm({
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
    setEmailVerificationError,
    setRequiresPasswordSetup,
    redirectExecutedRef
  });

  // Smart form detection - sadece gerçek admin email'leri için
  useEffect(() => {
    if (email.includes("@admin.") || email.includes("admin@")) {
      setIsAdminForm(true);
    } else {
      setIsAdminForm(false);
    }
  }, [email]);

  // Rate limiting kontrolü
  useEffect(() => {
    const attempts = localStorage.getItem("loginAttempts") || "0";
    const lastAttemptTime = localStorage.getItem("lastLoginAttempt");
    const now = Date.now();
    
    if (lastAttemptTime) {
      const timeDiff = now - parseInt(lastAttemptTime);
      if (timeDiff >= 15 * 60 * 1000) { // 15 dakika
        localStorage.setItem("loginAttempts", "0");
        localStorage.removeItem("lastLoginAttempt");
        setLoginAttempts(0);
      } else {
        const isRealPasswordAttempt = localStorage.getItem("isRealPasswordAttempt") === "true";
        if (isRealPasswordAttempt) {
          setLoginAttempts(parseInt(attempts));
        } else {
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
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    const rememberMe = localStorage.getItem("rememberMe");
    
    if (rememberedEmail && rememberMe === "true") {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

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

  // Success state'inde loading ekranı göster
  if (loginSuccess) {
    return <LoginSuccess isAdminForm={isAdminForm} redirectMessage={redirectMessage} />;
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
          <LoginHeader isAdminForm={isAdminForm} />

          <LoginForm
            email={email}
            password={password}
            showPassword={showPassword}
            isLoading={isLoading}
            isAdminForm={isAdminForm}
            rememberMe={rememberMe}
            error={error}
            emailVerificationError={emailVerificationError}
            isEmailSent={isEmailSent}
            isResendingEmail={isResendingEmail}
            loginAttempts={loginAttempts}
            requiresPasswordSetup={requiresPasswordSetup}
            setEmail={setEmail}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            setRememberMe={setRememberMe}
            handleSubmit={handleSubmit}
            handleResendVerificationEmail={handleResendVerificationEmail}
          />

          <SocialLoginButtons
            socialLoading={socialLoading}
            handleGoogleLogin={handleGoogleLogin}
            handleFacebookLogin={handleFacebookLogin}
          />

          <RegisterLink />
        </div>
      </div>
    </>
  );
}
