"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Logo from "./Logo";
import DesktopUserMenu from "./DesktopUserMenu";
import MobileUserMenu from "./MobileUserMenu";
import CartButton from "./CartButton";

const Search = dynamic(() => import("../Search"), { 
  ssr: false,
  loading: () => (
    <div style={{ 
      minWidth: '300px', 
      height: '48px',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid #cbd5e1'
    }} />
  )
});

function HeaderMain() {
  const [userInfo, setUserInfo] = useState<{
    isLoggedIn: boolean;
    name: string;
    isAdmin: boolean;
  }>({
    isLoggedIn: false,
    name: '',
    isAdmin: false
  });

  // Güvenli Türkçe karakter decode fonksiyonu
  const safeDecodeName = (name: string): string => {
    if (!name) return '';
    if (!name.includes('Ä±') && !name.includes('Ä°') && !name.includes('Ä±')) {
      return name;
    }
    try {
      return decodeURIComponent(escape(name));
    } catch (error) {
      console.warn('Karakter decode hatası:', error);
      return name;
    }
  };

  const [showDropdown, setShowDropdown] = useState(false);

  // Kullanıcı giriş durumunu kontrol et - Güvenli useEffect
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const checkUserStatus = () => {
      try {
        const userLoggedIn = localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn');
        const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
        const userIsAdmin = localStorage.getItem('userIsAdmin') || sessionStorage.getItem('userIsAdmin');
        
        const newUserInfo = {
          isLoggedIn: userLoggedIn === 'true',
          name: userName || '',
          isAdmin: userIsAdmin === 'true'
        };
        
        setUserInfo(prevInfo => {
          if (JSON.stringify(prevInfo) !== JSON.stringify(newUserInfo)) {
            return newUserInfo;
          }
          return prevInfo;
        });
      } catch (error) {
        console.warn('Storage access error:', error);
        setUserInfo({
          isLoggedIn: false,
          name: '',
          isAdmin: false
        });
      }
    };

    // Biraz gecikmeyle çalıştır
    const timeoutId = setTimeout(checkUserStatus, 100);
    
    const handleStorageChange = () => {
      checkUserStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    window.addEventListener('profileUpdated', handleStorageChange);
    
    const interval = setInterval(checkUserStatus, 30000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
      window.removeEventListener('profileUpdated', handleStorageChange);
      clearInterval(interval);
    };
  }, []); // Dependency array boş - sonsuz döngü önlemek için

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <>
      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-header {
            display: none !important;
          }
          .mobile-header {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .desktop-header {
            display: flex !important;
          }
          .mobile-header {
            display: none !important;
          }
        }
      `}</style>
      <header style={{
        position: "sticky",
        top: "0",
        zIndex: 10001,
        background: "#94a3b8",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e2e8f0",
      }}
      suppressHydrationWarning={true}>
        <div style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "10px 24px",
        }}>
          {/* Desktop Layout */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="desktop-header">
            <Logo />

            {/* Search Bar */}
            <div style={{
              flex: 1,
              maxWidth: "1000px",
              position: "relative",
              margin: "0 24px",
              zIndex: 10001,
            }}>
              <Search />
            </div>

            {/* Buttons */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}>
              <DesktopUserMenu 
                isLoggedIn={userInfo.isLoggedIn}
                isAdmin={userInfo.isAdmin}
                userName={userInfo.name}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
                safeDecodeName={safeDecodeName}
              />
              <CartButton isAdmin={userInfo.isAdmin} />
            </div>
          </div>

          {/* Mobile Layout */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
          className="mobile-header">
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "12px",
            }}>
              <Logo isMobile={true} />
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <MobileUserMenu 
                  isLoggedIn={userInfo.isLoggedIn}
                  isAdmin={userInfo.isAdmin}
                  showDropdown={showDropdown}
                  setShowDropdown={setShowDropdown}
                />
                <CartButton isMobile={true} isAdmin={userInfo.isAdmin} />
              </div>
            </div>
            <div style={{
              width: "100%",
            }}>
              <Search />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeaderMain;
