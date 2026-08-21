'use client';

import { useEffect } from 'react';

// httpOnly auth-token cookie'si süresi dolduğunda (7 gün) veya geçersiz
// olduğunda, localStorage'daki "giriş yapılmış" bayrağı bundan habersiz
// kalır — kullanıcı arayüzde hâlâ giriş yapmış görünür ama her istek 401
// döner. Bunu her sayfada ayrı ayrı ele almak yerine window.fetch'i burada
// tek bir yerden sarmalayıp, giriş yapmış bir kullanıcı customer-auth
// gerektiren bir uçtan 401 aldığında otomatik olarak çıkış yaptırıp
// login'e yönlendiriyoruz.
const EXCLUDED_PATH_PREFIXES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/csrf-token',
  '/api/auth/logout',
  '/api/auth/verify-email',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
  '/api/auth/send-email-verification',
  '/api/admin/', // admin paneli ayrı bir token sistemi kullanır, buraya dahil değil
];

let sessionExpiredHandled = false;

export default function SessionGuard() {
  useEffect(() => {
    if (typeof window === 'undefined' || (window as any).__sessionGuardInstalled) {
      return;
    }
    (window as any).__sessionGuardInstalled = true;

    const originalFetch = window.fetch.bind(window);

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      const response = await originalFetch(...args);

      if (response.status === 401 && !sessionExpiredHandled) {
        const requestUrl =
          typeof args[0] === 'string'
            ? args[0]
            : args[0] instanceof URL
              ? args[0].toString()
              : (args[0] as Request).url;

        let pathname: string;
        try {
          pathname = new URL(requestUrl, window.location.origin).pathname;
        } catch {
          pathname = requestUrl;
        }

        const isSameOriginApiCall = pathname.startsWith('/api/');
        const isExcluded = EXCLUDED_PATH_PREFIXES.some((p) => pathname.startsWith(p));
        const wasLoggedIn =
          localStorage.getItem('userLoggedIn') === 'true' ||
          sessionStorage.getItem('userLoggedIn') === 'true';

        if (isSameOriginApiCall && !isExcluded && wasLoggedIn) {
          sessionExpiredHandled = true;
          localStorage.removeItem('userLoggedIn');
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          localStorage.removeItem('userEmail');
          sessionStorage.removeItem('userLoggedIn');
          sessionStorage.removeItem('token');
          window.location.href = '/login?sessionExpired=1';
        }
      }

      return response;
    };
  }, []);

  return null;
}
