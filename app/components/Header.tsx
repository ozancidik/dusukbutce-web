"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Search from "./Search";

export default function Header() {
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
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
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
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13H17Z" stroke="currentColor" strokeWidth="2" fill="none"/>
                <circle cx="9" cy="20" r="1" fill="currentColor"/>
                <circle cx="15" cy="20" r="1" fill="currentColor"/>
              </svg>
              Sepet
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
