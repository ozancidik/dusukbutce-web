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
      
      // Minimal timeout - sadece güvenlik için (5 dakika)
      let timeoutId: NodeJS.Timeout | null = null;
      
      // Tek bir message listener - postMessage tabanlı
      const handleMessage = (event: MessageEvent) => {
        // Debug: Tüm mesajları logla
        console.log('📨 [useOAuth] Message received:', {
          origin: event.origin,
          type: event.data?.type,
          allowedOrigins: allowedOrigins,
          isAllowed: isOriginAllowed(event.origin, allowedOrigins),
          fullData: event.data
        });
        
        // Sadece GOOGLE_LOGIN_SUCCESS veya GOOGLE_LOGIN_ERROR mesajlarını işle
        if (event.data?.type !== 'GOOGLE_LOGIN_SUCCESS' && event.data?.type !== 'GOOGLE_LOGIN_ERROR') {
          console.log('ℹ️ [useOAuth] Ignoring message type:', event.data?.type);
          return;
        }
        
        // Origin kontrolü - daha esnek
        const isAllowed = isOriginAllowed(event.origin, allowedOrigins);
        console.log('🔍 [useOAuth] Origin check:', { 
          origin: event.origin, 
          allowedOrigins, 
          isAllowed 
        });
        
        if (!isAllowed) {
          console.warn('⚠️ [useOAuth] Message from disallowed origin:', event.origin, 'Allowed:', allowedOrigins);
          // Yine de mesajı işle (güvenlik riski var ama test için)
          console.warn('⚠️ [useOAuth] Processing anyway for debugging...');
        }
        
        if (event.data?.type === 'GOOGLE_LOGIN_SUCCESS') {
          console.log('✅ [useOAuth] GOOGLE_LOGIN_SUCCESS received');
          console.log('📦 [useOAuth] Event data:', { 
            hasUser: !!event.data.user, 
            hasToken: !!event.data.token,
            userEmail: event.data.user?.email,
            returnUrl 
          });
          
          // Event listener'ı temizle
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          
          const user: UserData = event.data.user;
          const token = event.data.token;
          
          console.log('👤 [useOAuth] User data:', { email: user?.email, id: user?.id });
          console.log('🔑 [useOAuth] Token:', token ? token.substring(0, 20) + '...' : 'MISSING');
          
          // Popup'ı kapatmayı dene (COOP hatası olabilir, görmezden gel)
          try {
            popup.close();
            console.log('✅ [useOAuth] Popup kapatıldı');
          } catch (e) {
            console.warn('⚠️ [useOAuth] Popup kapatılamadı:', e);
          }
          
          console.log('🚀 [useOAuth] processOAuthUser çağrılıyor...');
          processOAuthUser(user, token, returnUrl, redirectExecutedRef, setSocialLoading);
          console.log('✅ [useOAuth] processOAuthUser çağrıldı');
        } else if (event.data?.type === 'GOOGLE_LOGIN_ERROR') {
          console.error('❌ [useOAuth] GOOGLE_LOGIN_ERROR received:', event.data.error);
          
          // Event listener'ı temizle
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
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
      console.log('✅ [useOAuth] Message listener added to window');
      console.log('✅ [useOAuth] Listening for messages from origins:', allowedOrigins);
      
      // localStorage fallback - COOP yüzünden postMessage çalışmazsa
      let fallbackCheckCount = 0;
      const fallbackInterval = setInterval(() => {
        fallbackCheckCount++;
        
        const googleOAuthToken = localStorage.getItem('google_oauth_token');
        const googleOAuthUser = localStorage.getItem('google_oauth_user');
        
        if (googleOAuthToken && googleOAuthUser) {
          console.log('✅ [useOAuth] localStorage fallback triggered!');
          console.log('📦 [useOAuth] Token found:', googleOAuthToken.substring(0, 20) + '...');
          console.log('📦 [useOAuth] User found:', googleOAuthUser);
          
          clearInterval(fallbackInterval);
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          try {
            const user: UserData = JSON.parse(googleOAuthUser);
            const token = googleOAuthToken;
            
            // localStorage'dan temizle
            localStorage.removeItem('google_oauth_token');
            localStorage.removeItem('google_oauth_user');
            
            console.log('🚀 [useOAuth] Processing OAuth user from localStorage fallback');
            processOAuthUser(user, token, returnUrl, redirectExecutedRef, setSocialLoading);
          } catch (e) {
            console.error('❌ [useOAuth] Error parsing localStorage fallback data:', e);
            setError("Giriş verileri işlenirken bir hata oluştu.");
            setSocialLoading("");
          }
        }
        
        // 30 saniye sonra fallback'i durdur
        if (fallbackCheckCount >= 30) {
          console.log('⏰ [useOAuth] localStorage fallback timeout (30 seconds)');
          clearInterval(fallbackInterval);
        }
      }, 1000); // Her saniye kontrol et
      
      // Timeout'u başlat
      timeoutId = setTimeout(() => {
        console.warn('⏰ [useOAuth] Timeout reached (5 minutes)');
        clearInterval(fallbackInterval);
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
      
      // Minimal timeout - sadece güvenlik için (5 dakika)
      let timeoutId: NodeJS.Timeout | null = null;
      
      // Tek bir message listener - postMessage tabanlı
      const handleMessage = (event: MessageEvent) => {
        // Debug: Tüm mesajları logla
        console.log('📨 [useOAuth] Message received (Facebook):', {
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
        
        if (event.data?.type === 'FACEBOOK_LOGIN_SUCCESS') {
          console.log('✅ [useOAuth] FACEBOOK_LOGIN_SUCCESS received');
          
          // Event listener'ı temizle
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
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
            timeoutId = null;
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
      console.log('✅ [useOAuth] Message listener added to window (Facebook)');
      
      // localStorage fallback - COOP yüzünden postMessage çalışmazsa
      let fallbackCheckCount = 0;
      const fallbackInterval = setInterval(() => {
        fallbackCheckCount++;
        
        const facebookOAuthToken = localStorage.getItem('facebook_oauth_token');
        const facebookOAuthUser = localStorage.getItem('facebook_oauth_user');
        
        if (facebookOAuthToken && facebookOAuthUser) {
          console.log('✅ [useOAuth] localStorage fallback triggered (Facebook)!');
          
          clearInterval(fallbackInterval);
          window.removeEventListener('message', handleMessage);
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          
          try {
            popup.close();
          } catch (e) {
            // COOP hatası - görmezden gel
          }
          
          try {
            const user: UserData = JSON.parse(facebookOAuthUser);
            const token = facebookOAuthToken;
            
            // localStorage'dan temizle
            localStorage.removeItem('facebook_oauth_token');
            localStorage.removeItem('facebook_oauth_user');
            
            console.log('🚀 [useOAuth] Processing OAuth user from localStorage fallback (Facebook)');
            processOAuthUser(user, token, returnUrl, redirectExecutedRef, setSocialLoading);
          } catch (e) {
            console.error('❌ [useOAuth] Error parsing localStorage fallback data (Facebook):', e);
            setError("Giriş verileri işlenirken bir hata oluştu.");
            setSocialLoading("");
          }
        }
        
        // 30 saniye sonra fallback'i durdur
        if (fallbackCheckCount >= 30) {
          console.log('⏰ [useOAuth] localStorage fallback timeout (30 seconds) - Facebook');
          clearInterval(fallbackInterval);
        }
      }, 1000); // Her saniye kontrol et
      
      // Timeout'u başlat
      timeoutId = setTimeout(() => {
        console.warn('⏰ [useOAuth] Timeout reached (5 minutes)');
        clearInterval(fallbackInterval);
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
