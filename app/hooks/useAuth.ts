import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
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
    };
  }, []);

  return { isLoggedIn, isLoading, user, showLoginModal, setShowLoginModal };
}; 