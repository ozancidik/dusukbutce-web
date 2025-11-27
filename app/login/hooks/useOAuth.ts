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
      
      console.log('✅ [useOAuth] Popup opened:', popup);
      
      // Popup durumunu kontrol et
      const checkPopupStatus = setInterval(() => {
        try {
          if (popup.closed) {
            console.log('🔒 [useOAuth] Popup closed - checking localStorage immediately...');
            clearInterval(checkPopupStatus);
            
            // Popup kapandıktan sonra localStorage'ı kontrol et
            // Callback sayfası popup kapandıktan sonra localStorage'a yazmış olabilir
            setTimeout(() => {
              const googleOAuthToken = localStorage.getItem('google_oauth_token');
              const googleOAuthUser = localStorage.getItem('google_oauth_user');
              
              console.log('🔍 [useOAuth] Post-popup-close check:', {
                hasToken: !!googleOAuthToken,
                hasUser: !!googleOAuthUser
              });
              
              if (googleOAuthToken && googleOAuthUser) {
                console.log('✅ [useOAuth] Found data after popup closed!');
                window.removeEventListener('message', handleMessage);
                window.removeEventListener('message', debugMessageHandler);
                if ((handleMessage as any).timeoutId) {
                  clearTimeout((handleMessage as any).timeoutId);
                }
                
                processOAuthFallback(googleOAuthToken, googleOAuthUser, returnUrl, redirectExecutedRef, setSocialLoading);
              } else {
                console.warn('⚠️ [useOAuth] No data found after popup closed');
              }
            }, 500);
          } else {
            try {
              console.log('🔄 [useOAuth] Popup still open, location:', popup.location?.href || 'unknown');
            } catch (e) {
              // Cross-origin hatası - popup başka bir sayfada
              console.log('🌐 [useOAuth] Popup is on different origin (expected during OAuth)');
            }
          }
        } catch (e) {
          // Cross-origin hatası - popup başka bir sayfada
          console.log('🌐 [useOAuth] Popup is on different origin (expected during OAuth)');
        }
      }, 1000);
      
      const allowedOrigins = getAllowedOrigins();
      
      console.log('🔍 [useOAuth] Google login started');
      console.log('🔍 [useOAuth] Allowed origins:', allowedOrigins);
      console.log('🔍 [useOAuth] Current origin:', window.location.origin);
      console.log('🔍 [useOAuth] Message listener will be added...');
      
      // Message listener
      const handleMessage = (event: MessageEvent) => {
        console.log('📨 [useOAuth] Message received:', {
          origin: event.origin,
          type: event.data?.type,
          data: event.data,
          allowed: isOriginAllowed(event.origin, allowedOrigins)
        });
        
        if (!isOriginAllowed(event.origin, allowedOrigins)) {
          console.warn('⚠️ [useOAuth] Message from disallowed origin:', event.origin, 'Allowed:', allowedOrigins);
          return;
        }
        
        if (event.data?.type === 'GOOGLE_LOGIN_SUCCESS') {
          console.log('✅ [useOAuth] GOOGLE_LOGIN_SUCCESS received');
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
      console.log('✅ [useOAuth] Message listener added to window');
      
      // Tüm message event'lerini logla (debug için)
      const debugMessageHandler = (event: MessageEvent) => {
        console.log('🔍 [useOAuth] ALL messages (debug):', {
          origin: event.origin,
          type: event.data?.type,
          source: event.source
        });
      };
      window.addEventListener('message', debugMessageHandler);
      
      // Timeout
      const timeoutId = setTimeout(() => {
        console.warn('⏰ [useOAuth] Timeout reached (120 seconds)');
        window.removeEventListener('message', handleMessage);
        window.removeEventListener('message', debugMessageHandler);
        clearInterval(checkPopupStatus);
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
      
      // Fallback: localStorage kontrolü (gizli sekme için) - daha agresif
      console.log('🔄 [useOAuth] Starting localStorage fallback check...');
      
      // Storage event listener ekle (localStorage değişikliklerini dinle)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'google_oauth_token' || e.key === 'google_oauth_user') {
          console.log('📦 [useOAuth] Storage event detected:', e.key);
          const googleOAuthToken = localStorage.getItem('google_oauth_token');
          const googleOAuthUser = localStorage.getItem('google_oauth_user');
          
          if (googleOAuthToken && googleOAuthUser) {
            console.log('✅ [useOAuth] Fallback data found via storage event!');
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(fallbackInterval);
            clearInterval(checkPopupStatus);
            
            // Event listener'ları temizle
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('message', debugMessageHandler);
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
        }
      };
      window.addEventListener('storage', handleStorageChange);
      
      let fallbackCheckCount = 0;
      const fallbackInterval = setInterval(() => {
        fallbackCheckCount++;
        const googleOAuthToken = localStorage.getItem('google_oauth_token');
        const googleOAuthUser = localStorage.getItem('google_oauth_user');
        
        if (fallbackCheckCount % 5 === 0) {
          console.log('🔄 [useOAuth] Fallback check:', fallbackCheckCount, {
            hasToken: !!googleOAuthToken,
            hasUser: !!googleOAuthUser,
            tokenPreview: googleOAuthToken ? googleOAuthToken.substring(0, 20) + '...' : null
          });
        }
        
        if (googleOAuthToken && googleOAuthUser) {
          console.log('✅ [useOAuth] Fallback data found, processing...');
          clearInterval(fallbackInterval);
          clearInterval(checkPopupStatus);
          window.removeEventListener('storage', handleStorageChange);
          
          // Event listener'ları temizle
          window.removeEventListener('message', handleMessage);
          window.removeEventListener('message', debugMessageHandler);
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
        
        // 30 saniye boyunca kontrol et (30 kez, 1 saniye aralıkla)
        if (fallbackCheckCount >= 30) {
          console.warn('⚠️ [useOAuth] Fallback timeout reached');
          clearInterval(fallbackInterval);
          clearInterval(checkPopupStatus);
          window.removeEventListener('storage', handleStorageChange);
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
      
      console.log('🔍 [useOAuth] Facebook login started');
      console.log('🔍 [useOAuth] Allowed origins:', allowedOrigins);
      
      // Message listener
      const handleMessage = (event: MessageEvent) => {
        console.log('📨 [useOAuth] Message received:', {
          origin: event.origin,
          type: event.data?.type,
          allowed: isOriginAllowed(event.origin, allowedOrigins)
        });
        
        if (!isOriginAllowed(event.origin, allowedOrigins)) {
          console.warn('⚠️ [useOAuth] Message from disallowed origin:', event.origin);
          return;
        }
        
        if (event.data?.type === 'FACEBOOK_LOGIN_SUCCESS') {
          console.log('✅ [useOAuth] FACEBOOK_LOGIN_SUCCESS received');
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
      
      // Fallback: localStorage kontrolü (gizli sekme için) - daha agresif
      console.log('🔄 [useOAuth] Starting localStorage fallback check for Facebook...');
      
      // Storage event listener ekle
      const handleStorageChangeFB = (e: StorageEvent) => {
        if (e.key === 'facebook_oauth_token' || e.key === 'facebook_oauth_user') {
          console.log('📦 [useOAuth] Storage event detected for Facebook:', e.key);
          const facebookOAuthToken = localStorage.getItem('facebook_oauth_token');
          const facebookOAuthUser = localStorage.getItem('facebook_oauth_user');
          
          if (facebookOAuthToken && facebookOAuthUser) {
            console.log('✅ [useOAuth] Fallback data found via storage event!');
            window.removeEventListener('storage', handleStorageChangeFB);
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
        }
      };
      window.addEventListener('storage', handleStorageChangeFB);
      
      let fallbackCheckCount = 0;
      const fallbackInterval = setInterval(() => {
        fallbackCheckCount++;
        const facebookOAuthToken = localStorage.getItem('facebook_oauth_token');
        const facebookOAuthUser = localStorage.getItem('facebook_oauth_user');
        
        if (fallbackCheckCount % 5 === 0) {
          console.log('🔄 [useOAuth] Fallback check:', fallbackCheckCount, {
            hasToken: !!facebookOAuthToken,
            hasUser: !!facebookOAuthUser
          });
        }
        
        if (facebookOAuthToken && facebookOAuthUser) {
          console.log('✅ [useOAuth] Fallback data found, processing...');
          clearInterval(fallbackInterval);
          window.removeEventListener('storage', handleStorageChangeFB);
          
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
        
        // 30 saniye boyunca kontrol et (30 kez, 1 saniye aralıkla)
        if (fallbackCheckCount >= 30) {
          console.warn('⚠️ [useOAuth] Fallback timeout reached');
          clearInterval(fallbackInterval);
          window.removeEventListener('storage', handleStorageChangeFB);
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

