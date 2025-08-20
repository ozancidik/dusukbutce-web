"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";

export default function Header() {
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
      zIndex: 1000,
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
                gap: "8px",
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
                Giriş Yap
              </button>
            </Link>
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
                gap: "8px",
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
          {/* Top Row: Logo + Buttons */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}>
            {/* Logo */}
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

            {/* Buttons */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}>
              <Link href="/login" style={{ textDecoration: "none", textAlign: "center" }}>
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
                  marginBottom: "4px",
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
                  marginLeft: "-2px",
                }}>
                  Giriş Yap
                </div>
              </Link>
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
                  marginBottom: "4px",
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
                  textAlign: "center",
                }}>
                  Sepet
                </div>
              </Link>
            </div>
          </div>

          {/* Bottom Row: Search Bar */}
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
