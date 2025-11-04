"use client";
import React from "react";
import Link from "next/link";

interface DesktopUserMenuProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userName: string;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  safeDecodeName: (name: string) => string;
}

export default function DesktopUserMenu({ 
  isLoggedIn, 
  isAdmin, 
  userName, 
  showDropdown, 
  setShowDropdown,
  safeDecodeName 
}: DesktopUserMenuProps) {
  
  if (!isLoggedIn) {
    return (
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
            <Link href="/login?returnUrl=%2F" style={{ textDecoration: "none" }}>
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
    );
  }

  return (
    <div style={{ position: "relative" }} data-dropdown>
      <button 
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: isAdmin ? "#dc2626" : "#16a34a",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 20px",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: "14px",
          width: "auto",
          minWidth: isAdmin ? "160px" : "140px",
          maxWidth: isAdmin ? "220px" : "200px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap",
          gap: "8px",
          minHeight: "48px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
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
          {isAdmin ? 'Admin' : (userName ? (() => {
            let displayName = '';
            const fixedName = userName.includes('Ä±') ? 
              decodeURIComponent(escape(userName)) : userName;
            
            if (fixedName.length <= 20) {
              displayName = fixedName;
            } else {
              const nameParts = fixedName.split(' ');
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
                displayName = fixedName.substring(0, 20);
              }
            }
            return safeDecodeName(displayName);
          })() : 'Giriş Yap')}
        </span>
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
          <Link href="/profile" style={{ textDecoration: "none" }}>
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
              Profilim
            </div>
          </Link>
          
          <Link href="/tekliflerim" style={{ textDecoration: "none" }}>
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
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tekliflerim
            </div>
          </Link>
          
          <Link href="/siparisler" style={{ textDecoration: "none" }}>
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
                <path d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Siparişlerim
            </div>
          </Link>
          
          {isAdmin && (
            <Link href="/admin" style={{ textDecoration: "none" }}>
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
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                </svg>
                Admin Paneli
              </div>
            </Link>
          )}
          
          <div 
            onClick={() => {
              console.log('🚪 Çıkış yap butonuna tıklandı!');
              
              // Tüm login ile ilgili storage değerlerini temizle
              const keysToRemove = [
                'token', 'userLoggedIn', 'userName', 'userIsAdmin', 'userEmail', 
                'userId', 'userPhone', 'userBirthDate', 'user', 'loginTime',
                'adminLoggedIn', 'adminEmail', 'adminToken'
              ];
              
              keysToRemove.forEach(key => {
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
              });
              
              // Cookie'yi de temizle
              document.cookie = 'adminToken=; path=/; max-age=0';
              
              console.log('✅ Tüm storage temizlendi, anasayfaya yönlendiriliyor...');
              
              // Reload page to reset state
              window.location.href = '/';
            }}
            style={{
              padding: "12px 16px",
              color: "#ef4444",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fef2f2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "white";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Çıkış Yap
          </div>
        </div>
      )}
    </div>
  );
}










