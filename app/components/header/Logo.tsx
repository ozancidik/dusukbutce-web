"use client";
import React from "react";
import Link from "next/link";

interface LogoProps {
  isMobile?: boolean;
}

export default function Logo({ isMobile = false }: LogoProps) {
  return (
    <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
      <img 
        src="/logo-copy.png" 
        alt="Düşük Bütçe" 
        width={isMobile ? 120 : 160} 
        height={isMobile ? 45 : 60} 
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





