"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Kullanıcı bilgilerini localStorage'a kaydet
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userId", data.user.id);
        
        if (data.user.isAdmin) {
          localStorage.setItem("adminLoggedIn", "true");
          localStorage.setItem("adminEmail", data.user.email);
        }
        
        router.push("/"); // Anasayfaya yönlendir
      } else {
        setError(data.message || "Giriş yapılırken bir hata oluştu.");
      }
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
        padding: "80px 20px 20px 20px",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ color: "#2563eb", fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>
            Giriş Yap
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Hesabınıza giriş yapın
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
              }}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#2563eb";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e2e8f0";
              }}
            />
          </div>

          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px",
                border: "1px solid #fecaca",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "#1d4ed8";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = "#2563eb";
              }
            }}
          >
            {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <p style={{ color: "#64748b", margin: "0 0 16px 0" }}>
            Hesabınız yok mu?{" "}
            <Link
              href="/register"
              style={{
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Kayıt olun
            </Link>
          </p>
          
          <Link
            href="/forgot-password"
            style={{
              color: "#64748b",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Şifremi unuttum
          </Link>
        </div>
      </div>
    </div>
  );
} 