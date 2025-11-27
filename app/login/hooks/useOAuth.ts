"use client";
import { useCallback } from 'react';
import { getPopupDimensions, getAllowedOrigins, isOriginAllowed, processOAuthUser } from '../utils/oauthUtils';
import { UserData } from '../utils/storageUtils';

interface UseOAuthProps {
  socialLoading: string;
  setSocialLoading: (value: string) => void;
  setError: (error: string) => void;
  redirectExecutedRef: React.MutableRefObject<boolean>;
}

/**
 * OAuth (Google/Facebook) login logic'ini yöneten hook
 * Modern postMessage tabanlı mimari - COOP/COEP uyumlu
 */
export const useOAuth = ({ socialLoading, setSocialLoading, setError, redirectExecutedRef }: UseOAuthProps) => {
  const handleGoogleLogin = useCallback(async () => {
    setSocialLoading("google");
    setError("");
    
    try {
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
      const state = encodeURIComponent(JSON.stringify({ 
        random: Math.random().toString(36).substring(7),
        returnUrl: returnUrl
      }));
      
      const { width, height, left, top } = getPopupDimensions();
      
      const popup = window.open(
        `/api/auth/google?state=${state}`,
        'google-login',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );
      
      if (!popup) {
        setError("Popup açılamadı. Lütfen popup engelleyicinizi kapatın.");
        setSocialLoading("");
        return;
      }
      
      const allowedOrigins = getAllowedOrigins();
      
      console.log('🔍 [useOAuth] Google login started');
      console.log('🔍 [useOAuth] Allowed origins:', allowedOrigins);
      
      // Tek bir message listener - postMessage tabanlı
      const handleMessage = (event: MessageEvent) => {
        // Debug: Tüm mesajları logla
        console.log('📨 [useOAuth] Message received:', {
          origin: event.origin,
          type: event.data?.type,
          allowedOrigins: allowedOrigins,
          isAllowed: isOriginAllowed(event.origin, allowedOrigins)
        });
        
        // Origin kontrolü
        if (!isOriginAllowed(event.origin, allowedOrigins)) {
          console.warn('⚠️ [useOAuth] Message from disallowed origin:', event.origin);
          return;
        }
        
        if (event.data?.type === 'GOOGLE_LOGIN_SUCCESS') {
          console.log('✅ [useOAuth] GOOGLE_LOGIN_SUCCESS received');
          
          // Event listener'ı temizle
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          const user: UserData = event.data.user;
          const token = event.data.token;
          
          // Popup'ı kapatmayı dene (COOP hatası olabilir, görmezden gel)
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          processOAuthUser(user, token, returnUrl, redirectExecutedRef, setSocialLoading);
        } else if (event.data?.type === 'GOOGLE_LOGIN_ERROR') {
          console.error('❌ [useOAuth] GOOGLE_LOGIN_ERROR received:', event.data.error);
          
          // Event listener'ı temizle
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          setError(event.data.error || "Google ile giriş yapılırken bir hata oluştu.");
          setSocialLoading("");
          
          // Popup'ı kapatmayı dene
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Minimal timeout - sadece güvenlik için (5 dakika)
      const timeoutId = setTimeout(() => {
        console.warn('⏰ [useOAuth] Timeout reached (5 minutes)');
        window.removeEventListener('message', handleMessage);
        try {
          popup.close();
        } catch (e) {
          // COOP hatası - görmezden gel
        }
        if (socialLoading === "google") {
          setSocialLoading("");
          setError("Giriş işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
      }, 300000); // 5 dakika
      
    } catch (error) {
      console.error('❌ [useOAuth] Google login error:', error);
      setError("Google ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  }, [socialLoading, setSocialLoading, setError, redirectExecutedRef]);

  const handleFacebookLogin = useCallback(async () => {
    setSocialLoading("facebook");
    setError("");
    
    try {
      const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/';
      const facebookAuthUrl = `/api/auth/facebook?returnUrl=${encodeURIComponent(returnUrl)}`;
      
      const { width, height, left, top } = getPopupDimensions();
      
      const popup = window.open(
        facebookAuthUrl,
        'facebook-login',
        `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
      );
      
      if (!popup) {
        setError("Popup açılamadı. Lütfen popup engelleyicinizi kapatın.");
        setSocialLoading("");
        return;
      }
      
      const allowedOrigins = getAllowedOrigins();
      
      console.log('🔍 [useOAuth] Facebook login started');
      console.log('🔍 [useOAuth] Allowed origins:', allowedOrigins);
      
      // Tek bir message listener - postMessage tabanlı
      const handleMessage = (event: MessageEvent) => {
        // Origin kontrolü
        if (!isOriginAllowed(event.origin, allowedOrigins)) {
          return;
        }
        
        if (event.data?.type === 'FACEBOOK_LOGIN_SUCCESS') {
          console.log('✅ [useOAuth] FACEBOOK_LOGIN_SUCCESS received');
          
          // Event listener'ı temizle
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          const user: UserData = event.data.user;
          const token = event.data.token;
          
          // Popup'ı kapatmayı dene (COOP hatası olabilir, görmezden gel)
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          processOAuthUser(user, token, returnUrl, redirectExecutedRef, setSocialLoading);
        } else if (event.data?.type === 'FACEBOOK_LOGIN_ERROR') {
          console.error('❌ [useOAuth] FACEBOOK_LOGIN_ERROR received:', event.data.error);
          
          // Event listener'ı temizle
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          
          setError(event.data.error || "Facebook ile giriş yapılırken bir hata oluştu.");
          setSocialLoading("");
          
          // Popup'ı kapatmayı dene
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Minimal timeout - sadece güvenlik için (5 dakika)
      const timeoutId = setTimeout(() => {
        console.warn('⏰ [useOAuth] Timeout reached (5 minutes)');
        window.removeEventListener('message', handleMessage);
        try {
          popup.close();
        } catch (e) {
          // COOP hatası - görmezden gel
        }
        if (socialLoading === "facebook") {
          setSocialLoading("");
          setError("Giriş işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
      }, 300000); // 5 dakika
      
    } catch (error) {
      console.error('❌ [useOAuth] Facebook login error:', error);
      setError("Facebook ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  }, [socialLoading, setSocialLoading, setError, redirectExecutedRef]);

  return {
    handleGoogleLogin,
    handleFacebookLogin
  };
};
