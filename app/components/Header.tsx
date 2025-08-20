"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      let userLoggedIn = localStorage.getItem("userLoggedIn");
      let userName = localStorage.getItem("userName");
      let adminLoggedIn = localStorage.getItem("adminLoggedIn");
      
      if (!userLoggedIn && !adminLoggedIn) {
        userLoggedIn = sessionStorage.getItem("userLoggedIn");
        userName = sessionStorage.getItem("userName");
        adminLoggedIn = sessionStorage.getItem("adminLoggedIn");
      }
      
      setIsLoggedIn(userLoggedIn === "true" || adminLoggedIn === "true");
      setUserName(userName || "");
      setAdminLoggedIn(adminLoggedIn === "true");
    };

    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  return (
    <header style={{
      position: "static",
      zIndex: 1000,
      background: "#94a3b8",
      boxShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
      borderBottom: "1px solid #e2e8f0",
    }}>
      <div style={{
        maxWidth: "1600px",
        margin: "0 auto",
        padding: isMobile ? "12px 16px" : "16px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        gap: isMobile ? "12px" : "24px",
      }}>
        {isMobile ? (
          <>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              marginBottom: "8px" 
            }}>
              <Link href="/" style={{ textDecoration: "none" }}>
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
              <div style={{ display: "flex", gap: "8px" }}>
                {isLoggedIn ? (
                  <>
                    <Link href="/tekliflerim" style={{ textDecoration: "none" }}>
                      <button style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}>
                        <span style={{ filter: "brightness(0) invert(1)" }}>💰</span>
                      </button>
                    </Link>
                    <Link href={adminLoggedIn ? "/admin" : "/profile"} style={{ textDecoration: "none" }}>
                      <button style={{
                        background: adminLoggedIn ? "#7c3aed" : "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}>
                        <span style={{ filter: "brightness(0) invert(1)" }}>{adminLoggedIn ? "⚙️" : "👤"}</span>
                      </button>
                    </Link>
                  </>
                ) : (
                  <Link href="/login" style={{ textDecoration: "none" }}>
                    <button style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "18px"
                    }}>
                      <span style={{ filter: "brightness(0) invert(1)" }}>👤</span>
                    </button>
                  </Link>
                )}
                <Link href="/sepet" style={{ textDecoration: "none" }}>
                  <button style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "18px"
                  }}>
                    <span style={{ filter: "brightness(0) invert(1)" }}>🛒</span>
                  </button>
                </Link>
              </div>
            </div>
            <div style={{ marginBottom: "8px" }}>
              <Search />
            </div>
          </>
        ) : (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flex: 1,
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
                flex: 1,
                maxWidth: "1000px",
                position: "relative",
                marginRight: "2px",
              }}>
                <Search />
              </div>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              flexShrink: 0,
            }}>
              {isLoggedIn ? (
                <>
                  <Link href="/tekliflerim" style={{ textDecoration: "none" }}>
                    <button style={{
                      background: "#f59e0b",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 20px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}>
                      💰 Tekliflerim
                    </button>
                  </Link>
                  <Link href={adminLoggedIn ? "/admin" : "/profile"} style={{ textDecoration: "none" }}>
                    <button style={{
                      background: adminLoggedIn ? "#7c3aed" : "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      padding: "12px 20px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}>
                      {adminLoggedIn ? "⚙️" : "👤"} {userName || (adminLoggedIn ? "Admin" : "Profil")}
                    </button>
                  </Link>
                </>
              ) : (
                <Link href="/login" style={{ textDecoration: "none" }}>
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
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                  }}>
                    👤 Giriş Yap
                  </button>
                </Link>
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
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                }}>
                  🛒 Sepet
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
