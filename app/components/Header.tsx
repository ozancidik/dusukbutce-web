"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";

export default function Header() {
  const [userInfo, setUserInfo] = useState<{
    isLoggedIn: boolean;
    name: string;
    isAdmin: boolean;
  }>({
    isLoggedIn: false,
    name: '',
    isAdmin: false
  });

  // Güvenli Türkçe karakter decode fonksiyonu (profile sayfasından alındı)
  const safeDecodeName = (name: string): string => {
    if (!name) return '';
    
    try {
      // Önce escape ile encode et, sonra decode et
      return decodeURIComponent(escape(name));
    } catch (error) {
      console.warn('Karakter decode hatası:', error);
      // Hata durumunda orijinal ismi döndür
      return name;
    }
  };

  // Otomatik logout fonksiyonu
  const handleAutoLogout = (reason: string) => {
    console.log('Auto logout:', reason);
    
    // Remember Me değerlerini sakla
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberMe = localStorage.getItem('rememberMe');
    
    // Tüm kullanıcı verilerini temizle
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminEmail');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('rememberMe');
    
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('userPhone');
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminEmail');
    sessionStorage.removeItem('loginTime');
    sessionStorage.removeItem('rememberMe');
    
    // Remember Me değerlerini geri yükle
    if (rememberedEmail && rememberMe === 'true') {
      localStorage.setItem('rememberedEmail', rememberedEmail);
      localStorage.setItem('rememberMe', rememberMe);
    }
    
    // Kullanıcı durumunu güncelle
    setUserInfo({
      isLoggedIn: false,
      name: '',
      isAdmin: false
    });
    
    // Dropdown'ı kapat
    setShowDropdown(false);
    
    // Kullanıcıya bilgi ver
    alert(`Otomatik çıkış: ${reason}`);
    
    // Profile sayfasında kal (ana sayfaya yönlendirme yok)
    // Kullanıcı manuel olarak ana sayfaya gidebilir
  };
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  
  // Kullanıcı aktivitesini takip et - useRef'i component seviyesinde tanımla
  const updateActivityRef = useRef(() => {
    setLastActivity(Date.now());
  });

  // Kullanıcı giriş durumunu kontrol et
  useEffect(() => {
    const checkUserStatus = () => {
      const userLoggedIn = localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn');
      const userName = localStorage.getItem('userName') || sessionStorage.getItem('userName');
      const userIsAdmin = localStorage.getItem('userIsAdmin') || sessionStorage.getItem('adminLoggedIn');
      const loginTime = localStorage.getItem('loginTime') || sessionStorage.getItem('loginTime');
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      
      console.log('Header - User status check:', { userLoggedIn, userName, userIsAdmin, loginTime, rememberMe });
      
      // Session timeout kontrolü (24 saat normal, 30 gün remember me)
      if (loginTime) {
        const loginTimestamp = parseInt(loginTime);
        const currentTime = Date.now();
        const sessionDuration = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 30 gün veya 24 saat
        
        if (currentTime - loginTimestamp > sessionDuration) {
          console.log('Session expired, logging out...');
          handleAutoLogout(`Session süresi doldu (${rememberMe ? '30 gün' : '24 saat'})`);
          return;
        }
      }
      
      // Inactive timeout kontrolü (60 dakika)
      const inactiveDuration = 60 * 60 * 1000; // 60 dakika
      if (Date.now() - lastActivity > inactiveDuration) {
        console.log('User inactive for 60 minutes, logging out...');
        handleAutoLogout('60 dakika hareketsizlik nedeniyle çıkış yapıldı');
        return;
      }
      
      setUserInfo({
        isLoggedIn: userLoggedIn === 'true',
        name: userName || '',
        isAdmin: userIsAdmin === 'true'
      });
    };

    // İlk kontrol
    checkUserStatus();

    // localStorage değişikliklerini dinle
    const handleStorageChange = () => {
      checkUserStatus();
    };

    // Custom event'leri dinle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);
    
    // Profile güncelleme event'ini dinle
    window.addEventListener('profileUpdated', handleStorageChange);

    // Periyodik kontrol ekle (her 2 saniyede bir)
    const interval = setInterval(checkUserStatus, 2000);

    // Aktivite event'lerini dinle
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivityRef.current, true);
    });

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
      window.removeEventListener('profileUpdated', handleStorageChange);
      clearInterval(interval);
      
      // Aktivite event listener'larını temizle
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivityRef.current, true);
      });
    };
  }, []);

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
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
        position: "static",
        zIndex: 10001,
        background: "#94a3b8",
        boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
        borderBottom: "1px solid #e2e8f0",
      }}>
        <div style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "16px 24px",
        }}>
          {/* Desktop Layout */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="desktop-header">
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
              <Image 
                src="/logo.png" 
                alt="Düşük Bütçe" 
                width={160} 
                height={60} 
                priority
                style={{ 
                  objectFit: "contain",
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
              />
            </Link>

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
              {userInfo.isLoggedIn ? (
                <Link href="/profile" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 20px",
                    fontWeight: "600",
                    cursor: "pointer",
                    fontSize: "14px",
                    width: "auto",
                    minWidth: "140px",
                    maxWidth: "200px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    gap: "8px",
                    minHeight: "48px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    <span style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100px"
                    }}>
                      {userInfo.name ? (() => {
                        let displayName = '';
                        if (userInfo.name.length <= 20) {
                          displayName = userInfo.name;
                        } else {
                          // İsim ve soyisimi ayrı ayrı kısalt
                          const nameParts = userInfo.name.split(' ');
                          if (nameParts.length >= 2) {
                            const firstName = nameParts[0];
                            const lastName = nameParts[nameParts.length - 1];
                            if (firstName.length + lastName.length + 1 <= 20) {
                              displayName = `${firstName} ${lastName}`;
                            } else if (firstName.length <= 18) {
                              displayName = `${firstName} ${lastName.charAt(0)}.`;
                            } else {
                              displayName = `${firstName.substring(0, 18)}...`;
                            }
                          } else {
                            displayName = userInfo.name.substring(0, 20);
                          }
                        }
                        return safeDecodeName(displayName);
                      })() : 'Giriş Yap'}
                    </span>
                  </button>
                </Link>
              ) : (
                <div style={{ position: "relative" }} data-dropdown>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 20px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px",
                      width: "140px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      gap: "8px",
                      minHeight: "48px",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                      <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    Giriş Yap
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        marginLeft: "4px",
                        transition: "transform 0.2s",
                        transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)"
                      }}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div style={{
                      position: "absolute",
                      top: "100%",
                      left: "0",
                      right: "0",
                      background: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                      zIndex: 10002,
                      marginTop: "4px",
                      overflow: "hidden"
                    }}>
                      <Link href="/login" style={{ textDecoration: "none" }}>
                        <div style={{
                          padding: "12px 16px",
                          color: "#374151",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          borderBottom: "1px solid #f1f5f9",
                          transition: "background 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f8fafc";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                        }}
                        onClick={() => setShowDropdown(false)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                            <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                          </svg>
                          Giriş Yap
                        </div>
                      </Link>
                      
                      <Link href="/register" style={{ textDecoration: "none" }}>
                        <div style={{
                          padding: "12px 16px",
                          color: "#374151",
                          fontSize: "14px",
                          fontWeight: "500",
                          cursor: "pointer",
                          transition: "background 0.2s",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f8fafc";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                        }}
                        onClick={() => setShowDropdown(false)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          Kayıt Ol
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              )}
              <Link href="/sepet" style={{ textDecoration: "none" }}>
                <button style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px 20px",
                  fontWeight: "600",
                  cursor: "pointer",
                  fontSize: "14px",
                  width: "140px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  gap: "8px",
                  minHeight: "48px",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 3H4.5L6.5 8H19L17.5 12H8.5L7 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <path d="M8 21C8 21.5523 7.55228 22 7 22C6.44772 22 6 21.5523 6 21C6 20.4477 6.44772 20 7 20C7.55228 20 8 20.4477 8 21Z" fill="currentColor"/>
                    <path d="M20 21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21C18 20.4477 18.4477 20 19 20C19.5523 20 20 20.4477 20 21Z" fill="currentColor"/>
                    <path d="M6 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Sepet
                </button>
              </Link>
            </div>
          </div>

          {/* Mobile Layout */}
          <div style={{
            display: "none",
          }}
          className="mobile-header">
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px"
            }}>
              <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
                <Image 
                  src="/logo.png" 
                  alt="Düşük Bütçe" 
                  width={120} 
                  height={45} 
                  priority
                  style={{ 
                    objectFit: "contain",
                    cursor: "pointer",
                    transition: "transform 0.2s"
                  }}
                />
              </Link>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                {userInfo.isLoggedIn ? (
                  <Link href="/profile" style={{ textDecoration: "none", textAlign: "center" }}>
                    <button style={{
                      background: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "44px",
                      height: "44px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      marginBottom: "4px"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                    <div style={{
                      fontSize: "12px",
                      color: "white",
                      fontWeight: "500",
                      textAlign: "center",
                      marginLeft: "-2px"
                    }}>
                      Profil
                    </div>
                  </Link>
                ) : (
                  <div style={{ position: "relative", display: "flex", justifyContent: "flex-end", flexDirection: "column", alignItems: "center" }} data-dropdown>
                    <button 
                      onClick={() => setShowDropdown(!showDropdown)}
                      style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "44px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        marginBottom: "4px"
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </svg>
                    </button>
                    <div style={{
                      fontSize: "12px",
                      color: "white",
                      fontWeight: "500",
                      textAlign: "center"
                    }}>
                      Giriş
                    </div>
                    
                    {/* Mobil Dropdown Menu */}
                    {showDropdown && (
                      <div style={{
                        position: "absolute",
                        top: "100%",
                        right: "-60px",
                        background: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
                        zIndex: 10002,
                        marginTop: "4px",
                        overflow: "hidden",
                        minWidth: "160px",
                        maxWidth: "200px",
                        width: "auto"
                      }}>
                        <Link href="/login" style={{ textDecoration: "none" }}>
                          <div style={{
                            padding: "12px 16px",
                            color: "#374151",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            borderBottom: "1px solid #f1f5f9",
                            transition: "background 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "white";
                          }}
                          onClick={() => setShowDropdown(false)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                              <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                            </svg>
                            Giriş Yap
                          </div>
                        </Link>
                        
                        <Link href="/register" style={{ textDecoration: "none" }}>
                          <div style={{
                            padding: "12px 16px",
                            color: "#374151",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "background 0.2s",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#f8fafc";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "white";
                          }}
                          onClick={() => setShowDropdown(false)}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Kayıt Ol
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
                <Link href="/sepet" style={{ textDecoration: "none", textAlign: "center" }}>
                  <button style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    marginBottom: "4px"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3H4.5L6.5 8H19L17.5 12H8.5L7 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <path d="M8 21C8 21.5523 7.55228 22 7 22C6.44772 22 6 21.5523 6 21C6 20.4477 6.44772 20 7 20C7.55228 20 8 20.4477 8 21Z" fill="currentColor"/>
                      <path d="M20 21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21C18 20.4477 18.4477 20 19 20C19.5523 20 20 20.4477 20 21Z" fill="currentColor"/>
                      <path d="M6 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <div style={{
                    fontSize: "12px",
                    color: "white",
                    fontWeight: "500",
                    textAlign: "center"
                  }}>
                    Sepet
                  </div>
                </Link>
              </div>
            </div>
            <div style={{
              width: "100%",
              position: "relative",
              zIndex: 10001
            }}>
              <Search />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
