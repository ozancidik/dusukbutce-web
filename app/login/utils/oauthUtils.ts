"use client";
// OAuth utility fonksiyonları

import React from 'react';
import { UserData, saveUserData } from './storageUtils';

/**
 * Popup boyutlarını hesaplar (mobil uyumlu)
 */
export const getPopupDimensions = () => {
  if (typeof window === 'undefined') {
    return { width: 500, height: 600, left: 0, top: 0 }; // Default for SSR
  }
  
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
  if (typeof window === 'undefined') {
    return []; // Default for SSR
  }
  
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
  console.log('🚀 [processOAuthUser] Başlatılıyor...', { userEmail: user.email, returnUrl });
  
  // Yönlendirme flag'ini set et
  redirectExecutedRef.current = true;
  console.log('✅ [processOAuthUser] redirectExecutedRef set edildi');

  // Kullanıcı bilgilerini kaydet
  console.log('💾 [processOAuthUser] Kullanıcı bilgileri kaydediliyor...');
  saveUserData(user, token, false);
  console.log('✅ [processOAuthUser] Kullanıcı bilgileri kaydedildi');

  // Loading state'ini temizle
  setSocialLoading("");
  console.log('✅ [processOAuthUser] Loading state temizlendi');

  // localStorageChange event'ini tetikle
  console.log('📢 [processOAuthUser] localStorageChange event tetikleniyor...');
  window.dispatchEvent(new Event('localStorageChange'));
  console.log('✅ [processOAuthUser] localStorageChange event tetiklendi');

  // Yönlendir
  const finalUrl = decodeURIComponent(returnUrl);
  console.log('🔄 [processOAuthUser] Yönlendiriliyor:', finalUrl);
  console.log('🔄 [processOAuthUser] window.location.href:', window.location.href);
  window.location.href = finalUrl;
  console.log('✅ [processOAuthUser] window.location.href set edildi');
};

// processOAuthFallback kaldırıldı - artık sadece postMessage kullanıyoruz

