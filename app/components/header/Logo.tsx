"use client";
import React from "react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
      <img 
        src="/logo-copy.png" 
        alt="Düşük Bütçe" 
        width={160} 
        height={60} 
        style={{ 
          objectFit: "contain",
          cursor: "pointer",
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      />
    </Link>
  );
}





