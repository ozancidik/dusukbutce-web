"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface UserMenuProps {
  userInfo: {
    isLoggedIn: boolean;
    name: string;
    isAdmin: boolean;
  };
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  safeDecodeName: (name: string) => string;
}

export default function UserMenu({ userInfo, showDropdown, setShowDropdown, safeDecodeName }: UserMenuProps) {
  const handleLogout = () => {
    console.log('🚪 Çıkış yap butonuna tıklandı!');
    // Clear all auth-related storage
    localStorage.removeItem('token');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userIsAdmin');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userLoggedIn');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userIsAdmin');
    
    // Reload page to reset state
    window.location.href = '/';
  };

  if (!userInfo.isLoggedIn) {
    return (
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <Link
          href="/login"
          style={{
            background: "white",
            color: "#94a3b8",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            textDecoration: "none",
            border: "2px solid transparent",
            transition: "all 0.2s",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f1f5f9";
            e.currentTarget.style.borderColor = "white";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          Giriş Yap
        </Link>
        <Link
          href="/register"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            textDecoration: "none",
            border: "2px solid transparent",
            transition: "all 0.2s",
            boxShadow: "0 2px 8px rgba(102, 126, 234, 0.3)",
            whiteSpace: "nowrap"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 8px rgba(102, 126, 234, 0.3)";
          }}
        >
          Kayıt Ol
        </Link>
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }} data-dropdown>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          background: "white",
          color: "#94a3b8",
          padding: "10px 20px",
          borderRadius: "8px",
          fontWeight: "600",
          fontSize: "14px",
          border: "2px solid transparent",
          cursor: "pointer",
          transition: "all 0.2s",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#f1f5f9";
          e.currentTarget.style.borderColor = "white";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "white";
          e.currentTarget.style.borderColor = "transparent";
        }}
      >
        <Image 
          src="/user-icon.svg" 
          alt="User"
          width={18}
          height={18}
          style={{ filter: "invert(58%) sepia(14%) saturate(625%) hue-rotate(177deg) brightness(93%) contrast(87%)" }}
        />
        {safeDecodeName(userInfo.name)}
        <span style={{ fontSize: "10px" }}>{showDropdown ? "▲" : "▼"}</span>
      </button>

      {showDropdown && (
        <div 
          style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          right: 0,
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
          minWidth: "200px",
          overflow: "hidden",
          zIndex: 1000
        }}>
          <Link
            href="/profile"
            style={{
              display: "block",
              padding: "12px 16px",
              color: "#475569",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
              borderBottom: "1px solid #f1f5f9"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            👤 Profilim
          </Link>
          <Link
            href="/tekliflerim"
            style={{
              display: "block",
              padding: "12px 16px",
              color: "#475569",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
              borderBottom: "1px solid #f1f5f9"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            💼 Tekliflerim
          </Link>
          <Link
            href="/siparislerim"
            style={{
              display: "block",
              padding: "12px 16px",
              color: "#475569",
              textDecoration: "none",
              fontSize: "14px",
              transition: "background 0.2s",
              borderBottom: "1px solid #f1f5f9"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8fafc"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
          >
            🛍️ Siparişlerim
          </Link>
          {userInfo.isAdmin && (
            <Link
              href="/admin"
              style={{
                display: "block",
                padding: "12px 16px",
                color: "#7c3aed",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "600",
                transition: "background 0.2s",
                borderBottom: "1px solid #f1f5f9"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#faf5ff"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              ⚙️ Admin Panel
            </Link>
          )}
          <div
            onClick={handleLogout}
            onMouseEnter={(e) => {
              console.log('🚪 Çıkış yap butonu hover!');
              e.currentTarget.style.background = "#fef2f2";
            }}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            style={{
              display: "block",
              padding: "12px 16px",
              color: "#ef4444",
              background: "transparent",
              border: "none",
              textAlign: "left",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background 0.2s",
              width: "100%",
              boxSizing: "border-box"
            }}
          >
            🚪 Çıkış Yap
          </div>
        </div>
      )}
    </div>
  );
}



