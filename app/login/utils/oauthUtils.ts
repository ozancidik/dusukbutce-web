// OAuth utility fonksiyonları

import { UserData, saveUserData } from './storageUtils';

/**
 * Popup boyutlarını hesaplar (mobil uyumlu)
 */
export const getPopupDimensions = () => {
  if (window.innerWidth <= 768) {
    return {
      width: window.screen.width,
      height: window.screen.height,
      left: 0,
      top: 0
    };
  } else {
    return {
      width: 500,
      height: 600,
      left: window.screenX + (window.outerWidth - 500) / 2,
      top: window.screenY + (window.outerHeight - 600) / 2
    };
  }
};

/**
 * İzin verilen origin'leri döndürür
 */
export const getAllowedOrigins = (): string[] => {
  const currentOrigin = window.location.origin;
  return [
    currentOrigin,
    currentOrigin.replace('www.', ''),
    currentOrigin.includes('www.') ? currentOrigin : currentOrigin.replace('://', '://www.')
  ].filter((v, i, a) => a.indexOf(v) === i);
};

/**
 * Origin kontrolü yapar - daha esnek kontrol
 */
export const isOriginAllowed = (origin: string, allowedOrigins: string[]): boolean => {
  // Wildcard veya null origin'e izin ver
  if (origin === '*' || origin === 'null' || !origin) {
    return true;
  }
  
  // Tam eşleşme kontrolü
  if (allowedOrigins.includes(origin)) {
    return true;
  }
  
  // www ve non-www varyasyonlarını kontrol et
  const normalizedOrigin = origin.replace(/^https?:\/\/(www\.)?/, '');
  return allowedOrigins.some(allowed => {
    const normalizedAllowed = allowed.replace(/^https?:\/\/(www\.)?/, '');
    return normalizedOrigin === normalizedAllowed;
  });
};

/**
 * OAuth kullanıcı verilerini parse eder ve kaydeder
 */
export const processOAuthUser = (
  user: UserData,
  token: string,
  returnUrl: string,
  redirectExecutedRef: React.MutableRefObject<boolean>,
  setSocialLoading: (value: string) => void
): void => {
  // Yönlendirme flag'ini set et
  redirectExecutedRef.current = true;

  // Kullanıcı bilgilerini kaydet
  saveUserData(user, token, false);

  // Loading state'ini temizle
  setSocialLoading("");

  // localStorageChange event'ini tetikle
  window.dispatchEvent(new Event('localStorageChange'));

  // Yönlendir
  window.location.href = decodeURIComponent(returnUrl);
};

/**
 * OAuth fallback verilerini işler
 */
export const processOAuthFallback = (
  token: string,
  userDataString: string,
  returnUrl: string,
  redirectExecutedRef: React.MutableRefObject<boolean>,
  setSocialLoading: (value: string) => void
): void => {
  try {
    const userData: UserData = JSON.parse(userDataString);
    const loginTime = Date.now();
    
    // Kullanıcı bilgilerini kaydet
    saveUserData(userData, token, false);

    // OAuth token'larını temizle
    localStorage.removeItem('google_oauth_token');
    localStorage.removeItem('google_oauth_user');
    localStorage.removeItem('facebook_oauth_token');
    localStorage.removeItem('facebook_oauth_user');

    // Loading state'ini temizle
    setSocialLoading("");

    // Yönlendirme flag'ini set et
    redirectExecutedRef.current = true;

    // localStorageChange event'ini tetikle
    window.dispatchEvent(new Event('localStorageChange'));

    // Yönlendir
    window.location.href = decodeURIComponent(returnUrl);
  } catch (e) {
    console.error('OAuth fallback error:', e);
    setSocialLoading("");
  }
};

