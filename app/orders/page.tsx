"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // /orders sayfasına gelenleri /siparisler sayfasına yönlendir
    router.replace("/siparisler");
  }, [router]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
    }}>
      <div style={{
        textAlign: "center",
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{
          fontSize: "48px",
          marginBottom: "16px"
        }}>
          🔄
        </div>
        <h2 style={{
          color: "#1f293b",
          fontSize: "24px",
          fontWeight: "600",
          margin: "0 0 12px 0"
        }}>
          Yönlendiriliyor...
        </h2>
        <p style={{
          color: "#6b7280",
          fontSize: "16px",
          margin: "0"
        }}>
          Siparişler sayfasına yönlendiriliyorsunuz.
        </p>
      </div>
    </div>
  );
}
