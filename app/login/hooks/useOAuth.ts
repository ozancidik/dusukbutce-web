"use client";
import { useCallback } from 'react';
import { getPopupDimensions, getAllowedOrigins, isOriginAllowed, processOAuthUser, processOAuthFallback } from '../utils/oauthUtils';
import { UserData } from '../utils/storageUtils';

interface UseOAuthProps {
  socialLoading: string;
  setSocialLoading: (value: string) => void;
  setError: (error: string) => void;
  redirectExecutedRef: React.MutableRefObject<boolean>;
}

/**
 * OAuth (Google/Facebook) login logic'ini yöneten hook
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
      
      // Message listener
      const handleMessage = (event: MessageEvent) => {
        if (!isOriginAllowed(event.origin, allowedOrigins)) {
          return;
        }
        
        if (event.data?.type === 'GOOGLE_LOGIN_SUCCESS') {
          const user: UserData = event.data.user;
          const token = event.data.token;
          
          // Event listener'ları temizle
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
          
          // Popup'ı kapat
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          processOAuthUser(user, token, returnUrl, redirectExecutedRef, setSocialLoading);
        } else if (event.data?.type === 'GOOGLE_LOGIN_ERROR') {
          setError(event.data.error || "Google ile giriş yapılırken bir hata oluştu.");
          setSocialLoading("");
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Timeout
      const timeoutId = setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        try {
          if (popup) popup.close();
        } catch (e) {
          // COOP hatası
        }
        if (socialLoading === "google") {
          setSocialLoading("");
          setError("Giriş işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
      }, 120000);
      
      (handleMessage as any).timeoutId = timeoutId;
      
      // Fallback: localStorage kontrolü (gizli sekme için)
      let fallbackCheckCount = 0;
      const fallbackInterval = setInterval(() => {
        fallbackCheckCount++;
        const googleOAuthToken = localStorage.getItem('google_oauth_token');
        const googleOAuthUser = localStorage.getItem('google_oauth_user');
        
        if (googleOAuthToken && googleOAuthUser) {
          clearInterval(fallbackInterval);
          
          // Event listener'ları temizle
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
          
          // Popup'ı kapat
          try {
            if (popup) popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          processOAuthFallback(googleOAuthToken, googleOAuthUser, returnUrl, redirectExecutedRef, setSocialLoading);
        }
        
        if (fallbackCheckCount >= 10) {
          clearInterval(fallbackInterval);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Google login error:', error);
      setError("Google ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  }, [socialLoading, setSocialLoading, setError, redirectExecutedRef]);

  const handleFacebookLogin = useCallback(async () => {
    try {
      setSocialLoading("facebook");
      setError("");
      
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
      
      // Message listener
      const handleMessage = (event: MessageEvent) => {
        if (!isOriginAllowed(event.origin, allowedOrigins)) {
          return;
        }
        
        if (event.data?.type === 'FACEBOOK_LOGIN_SUCCESS') {
          const user: UserData = event.data.user;
          const token = event.data.token;
          
          // Event listener'ları temizle
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
          
          // Popup'ı kapat
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          processOAuthUser(user, token, returnUrl, redirectExecutedRef, setSocialLoading);
        } else if (event.data?.type === 'FACEBOOK_LOGIN_ERROR') {
          setError(event.data.error || "Facebook ile giriş yapılırken bir hata oluştu.");
          setSocialLoading("");
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
        }
      };
      
      window.addEventListener('message', handleMessage);
      
      // Timeout
      const timeoutId = setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        try {
          if (popup) popup.close();
        } catch (e) {
          // COOP hatası
        }
        if (socialLoading === "facebook") {
          setSocialLoading("");
          setError("Giriş işlemi zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
      }, 120000);
      
      (handleMessage as any).timeoutId = timeoutId;
      
      // Fallback: localStorage kontrolü (gizli sekme için)
      let fallbackCheckCount = 0;
      const fallbackInterval = setInterval(() => {
        fallbackCheckCount++;
        const facebookOAuthToken = localStorage.getItem('facebook_oauth_token');
        const facebookOAuthUser = localStorage.getItem('facebook_oauth_user');
        
        if (facebookOAuthToken && facebookOAuthUser) {
          clearInterval(fallbackInterval);
          
          // Event listener'ları temizle
          window.removeEventListener('message', handleMessage);
          if ((handleMessage as any).timeoutId) {
            clearTimeout((handleMessage as any).timeoutId);
          }
          
          // Popup'ı kapat
          try {
            if (popup) popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          processOAuthFallback(facebookOAuthToken, facebookOAuthUser, returnUrl, redirectExecutedRef, setSocialLoading);
        }
        
        if (fallbackCheckCount >= 10) {
          clearInterval(fallbackInterval);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Facebook login error:', error);
      setError("Facebook ile giriş yapılırken bir hata oluştu.");
      setSocialLoading("");
    }
  }, [socialLoading, setSocialLoading, setError, redirectExecutedRef]);

  return {
    handleGoogleLogin,
    handleFacebookLogin
  };
};

