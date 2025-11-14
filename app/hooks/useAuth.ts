import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [refreshTimer, setRefreshTimer] = useState<NodeJS.Timeout | null>(null);

  // Token refresh fonksiyonu
  const refreshToken = async () => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success && data.refreshed && data.token) {
        // Yeni token'ı kaydet
        const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
        storage.setItem('token', data.token);
        
        // Event tetikle
        window.dispatchEvent(new Event('localStorageChange'));
      }
    } catch (error) {
      // Refresh hatası - sessizce devam et
      console.error('Token refresh error:', error);
    }
  };

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
        
        if ((token && userData) || (userLoggedIn === 'true' && userEmail)) {
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
          
          checkTokenAndLogout(); // Sadece token süresi kontrolü, otomatik logout yok
          startRefreshTimer();
        } else {
          setIsLoggedIn(false);
          setUser(null);
          clearRefreshTimer();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
        setUser(null);
        clearRefreshTimer();
      } finally {
        setIsLoading(false);
      }
    };

    // Logout fonksiyonu
    const handleLogout = () => {
      // Otomatik logout - hem localStorage hem sessionStorage'ı temizle
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      localStorage.removeItem('loginTime');
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      sessionStorage.removeItem('userLoggedIn');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('loginTime');
      sessionStorage.removeItem('adminLoggedIn');
      sessionStorage.removeItem('adminEmail');
      sessionStorage.removeItem('adminToken');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      
      // State'i güncelle
      setIsLoggedIn(false);
      setUser(null);
      
      // Event'leri tetikle
      window.dispatchEvent(new Event('localStorageChange'));
      window.dispatchEvent(new CustomEvent('logout'));
    };

    // Token süresini kontrol et
    const checkTokenExpiry = (token: string): number | null => {
      try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        
        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);
        
        if (payload.exp && payload.exp > now) {
          // Token geçerli, kalan süreyi döndür (milisaniye)
          return (payload.exp - now) * 1000;
        }
        
        return null; // Token süresi dolmuş
      } catch (error) {
        return null;
      }
    };

    // Token süresi kontrolü (otomatik logout yok, sadece token süresi dolduğunda kontrol)
    const checkTokenAndLogout = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (!token) {
        handleLogout();
        return;
      }
      
      // Token süresini kontrol et
      const remainingTime = checkTokenExpiry(token);
      
      if (!remainingTime) {
        // Token süresi dolmuş, logout yap
        handleLogout();
      }
    };

    // Token refresh timer fonksiyonları
    const startRefreshTimer = () => {
      // Önceki timer'ı temizle
      clearRefreshTimer();
      
      // Her 6 saatte bir token'ı refresh et (7 günün %80'i = 5.6 gün, güvenli aralık)
      // 6 saat = 6 * 60 * 60 * 1000 = 21,600,000 ms
      const timer = setInterval(() => {
        refreshToken();
      }, 6 * 60 * 60 * 1000);
      
      setRefreshTimer(timer);
    };

    const clearRefreshTimer = () => {
      if (refreshTimer) {
        clearInterval(refreshTimer);
        setRefreshTimer(null);
      }
    };

    checkAuthStatus();
    
    // Storage değişikliklerini dinle
    const handleStorageChange = () => {
      checkAuthStatus();
      // Token süresi kontrolü de yap
      checkTokenAndLogout();
    };

    // Custom event listener ekle
    const handleCustomStorageChange = () => {
      checkAuthStatus();
      // Token süresi kontrolü de yap
      checkTokenAndLogout();
    };

    // Sayfa focus olduğunda da kontrol et
    const handleFocus = () => {
      checkAuthStatus();
      // Token süresi kontrolü de yap
      checkTokenAndLogout();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange);
      window.removeEventListener('focus', handleFocus);
      clearRefreshTimer();
    };
  }, []);

  return { isLoggedIn, isLoading, user, showLoginModal, setShowLoginModal };
}; 