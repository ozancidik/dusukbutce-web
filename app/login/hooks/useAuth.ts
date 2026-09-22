"use client";
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getUserLoginStatus, validateAndCleanAdminToken } from '../utils/storageUtils';

/**
 * Kullanıcı authentication durumunu yöneten hook
 */
export const useAuth = (
  socialLoading: string,
  setSocialLoading: (value: string) => void
) => {
  const router = useRouter();
  const redirectExecutedRef = useRef(false);

  useEffect(() => {
    // Bu useEffect sadece login sayfasında çalışmalı
    const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';
    
    if (!isLoginPage) {
      return;
    }

    const checkUserStatus = () => {
      // Login sayfasında değilse hiçbir şey yapma
      if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
        return;
      }

      const { adminLoggedIn, adminEmail, adminToken, userLoggedIn, userEmail } = getUserLoginStatus();

      // Admin token kontrolü
      if (adminLoggedIn === "true" || adminEmail) {
        validateAndCleanAdminToken();
      }

      // Normal kullanıcı giriş yapmışsa returnUrl kontrolü yap
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      // KRİTİK: Admin kullanıcılar da isAdmin:true olan birer 'user' olduğu
      // için userLoggedIn her zaman 'true' olur — bu blok admin/normal
      // ayrımı yapmadan window.location.href = '/' ile HEMEN (senkron)
      // yönlendiriyordu. useLoginForm.ts'in admin girişi sonrası 1500ms
      // gecikmeli router.push('/admin') çağrısı bu senkron yönlendirmeden
      // SONRA geliyordu, yani hiçbir zaman çalışamıyordu — admin kullanıcılar
      // normal login formundan asla /admin'e ulaşamıyordu, hep ana sayfaya
      // düşüyordu. Admin girişiyse bu bloğu atla, useLoginForm.ts kendi
      // admin-specific yönlendirmesini yönetsin.
      if (adminLoggedIn === "true") {
        return;
      }
      if (userLoggedIn === "true" && userEmail && currentPath === '/login') {
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl');
        
        // Yönlendirme flag'ini set et
        redirectExecutedRef.current = true;
        
        // Event listener'ları hemen kaldır
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('localStorageChange', handleStorageChange);
        
        if (returnUrl) {
          window.location.href = decodeURIComponent(returnUrl);
        } else {
          window.location.href = "/";
        }
        return;
      } else if (userLoggedIn === "true" && userEmail && currentPath !== '/login') {
        // Login sayfasında değilse event listener'ları kaldır
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('localStorageChange', handleStorageChange);
        return;
      }
    };

    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      if (currentPath !== '/login') {
        return;
      }
      
      const { adminLoggedIn, adminEmail, userLoggedIn, userEmail } = getUserLoginStatus();
      
      // Eğer daha önce yönlendirme yapıldıysa, tekrar yapma
      if (redirectExecutedRef.current) {
        // Ama loading state'ini temizle
        if (socialLoading !== "") {
          setSocialLoading("");
        }
        return;
      }
      
      // Herhangi bir giriş yapıldıysa kontrol et
      if ((adminLoggedIn === "true" && adminEmail) || (userLoggedIn === "true" && userEmail)) {
        checkUserStatus();
      }
    };

    // İlk kontrol
    checkUserStatus();

    // Event listener'ları ekle
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    if (currentPath === '/login') {
      window.addEventListener('storage', handleStorageChange);
      window.addEventListener('localStorageChange', handleStorageChange);
    }

    return () => {
      // Cleanup
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [router, socialLoading, setSocialLoading]);

  return { redirectExecutedRef };
};

