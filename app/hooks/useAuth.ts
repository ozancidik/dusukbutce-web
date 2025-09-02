import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        // Önce localStorage'dan kontrol et, yoksa sessionStorage'dan
        let token = localStorage.getItem('token');
        let userData = localStorage.getItem('user');
        let userLoggedIn = localStorage.getItem('userLoggedIn');
        let userEmail = localStorage.getItem('userEmail');
        let userName = localStorage.getItem('userName');
        let userId = localStorage.getItem('userId');
        
        // localStorage'da yoksa sessionStorage'dan al
        if (!userLoggedIn && !token) {
          token = sessionStorage.getItem('token');
          userData = sessionStorage.getItem('user');
          userLoggedIn = sessionStorage.getItem('userLoggedIn');
          userEmail = sessionStorage.getItem('userEmail');
          userName = sessionStorage.getItem('userName');
          userId = sessionStorage.getItem('userId');
        }
        
        // Sadece userLoggedIn === 'true' ve userEmail varsa giriş yapmış say
        if (userLoggedIn === 'true' && userEmail) {
          setIsLoggedIn(true);
          
          if (userData) {
            setUser(JSON.parse(userData));
          } else if (userEmail) {
            setUser({
              id: userId,
              email: userEmail,
              name: userName,
              isAdmin: localStorage.getItem('adminLoggedIn') === 'true' || sessionStorage.getItem('adminLoggedIn') === 'true'
            });
          }
          
          startLogoutTimer();
        } else {
          setIsLoggedIn(false);
          setUser(null);
          clearLogoutTimer();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
        setUser(null);
        clearLogoutTimer();
      } finally {
        setIsLoading(false);
      }
    };

    // Timer fonksiyonları
    const startLogoutTimer = () => {
      // Önceki timer'ı temizle
      clearLogoutTimer();
      
      // 60 dakika = 60 * 60 * 1000 = 3,600,000 ms
      const timer = setTimeout(() => {
        // Otomatik logout - hem localStorage hem sessionStorage'ı temizle
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        sessionStorage.removeItem('userLoggedIn');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('loginTime');
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminEmail');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        
        // State'i güncelle
        setIsLoggedIn(false);
        setUser(null);
        
        // Event'leri tetikle
        window.dispatchEvent(new Event('localStorageChange'));
        window.dispatchEvent(new CustomEvent('logout'));
        
        // Timer'ı temizle
        setLogoutTimer(null);
      }, 60 * 60 * 1000);
      
      setLogoutTimer(timer);
    };

    const clearLogoutTimer = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
        setLogoutTimer(null);
      }
    };

    checkAuthStatus();
    
    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Custom event listener ekle
    const handleCustomStorageChange = () => {
      checkAuthStatus();
    };

    // Sayfa focus olduğunda da kontrol et
    const handleFocus = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
      window.removeEventListener('focus', handleFocus);
      clearLogoutTimer();
    };
  }, []);

  return { isLoggedIn, isLoading, user, showLoginModal, setShowLoginModal };
}; 