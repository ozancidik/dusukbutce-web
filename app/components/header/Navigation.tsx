"use client";
import React from "react";
import Link from "next/link";

const navigationLinks = [
  { href: "/bize-sat", label: "🏪 Bize Sat", color: "#3b82f6" },
  { href: "/satin-al", label: "🛒 Satın Al", color: "#10b981" },
  { href: "/tekliflerim", label: "💼 Tekliflerim", color: "#f59e0b" },
  { href: "/iletisim", label: "📞 İletişim", color: "#8b5cf6" },
];

export default function Navigation() {
  return (
    <nav style={{
      display: "flex",
      gap: "12px",
      alignItems: "center",
      flexWrap: "wrap",
    }}>
      {navigationLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "14px",
            padding: "10px 16px",
            borderRadius: "8px",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
            border: "2px solid transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "transparent";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}





