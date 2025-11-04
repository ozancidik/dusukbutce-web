"use client";
import React from "react";
import Link from "next/link";

interface CartButtonProps {
  isMobile?: boolean;
  isAdmin?: boolean;
}

export default function CartButton({ isMobile = false, isAdmin = false }: CartButtonProps) {
  if (isMobile) {
    return (
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
    );
  }

  return (
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
  );
}


