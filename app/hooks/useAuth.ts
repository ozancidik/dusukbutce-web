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
        // Yeni format: token ve user
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        // Eski format: userLoggedIn, userEmail, userName
        const userLoggedIn = localStorage.getItem('userLoggedIn');
        const userEmail = localStorage.getItem('userEmail');
        const userName = localStorage.getItem('userName');
        const userId = localStorage.getItem('userId');
        
        if ((token && userData) || (userLoggedIn === 'true' && userEmail)) {
          setIsLoggedIn(true);
          
          if (userData) {
            setUser(JSON.parse(userData));
          } else if (userEmail) {
            setUser({
              id: userId,
              email: userEmail,
              name: userName,
              isAdmin: localStorage.getItem('adminLoggedIn') === 'true'
            });
          }
          
          // 60 dakika sonra otomatik logout
          startLogoutTimer();
        } else {
          setIsLoggedIn(false);
          setUser(null);
          // Timer'ı temizle
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
        // Otomatik logout
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('loginTime');
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
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
    
    // Local storage değişikliklerini dinle
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Custom event listener ekle
    const handleCustomStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange);
    
    // Sayfa focus olduğunda da kontrol et
    const handleFocus = () => {
      checkAuthStatus();
    };
    
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