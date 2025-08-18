"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', cep_telefonu: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Admin giriş kontrolü
  React.useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
    if (adminLoggedIn === "true") {
      window.location.href = "/admin";
      return;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'firstName' || name === 'lastName') {
      // Sadece Türkçe harfler, boşluk ve tire (-) karakterine izin ver
      const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s-]*$/;
      
      // 20 karakter sınırı (her alan için)
      if (value.length <= 20 && (nameRegex.test(value) || value === '')) {
        setForm({ ...form, [name]: value });
      }
    } else if (name === 'email') {
      // Email için sadece geçerli karakterlere izin ver
      const emailRegex = /^[a-zA-Z0-9@._-]*$/;
      if (emailRegex.test(value) || value === '') {
        setForm({ ...form, [name]: value.toLowerCase() });
      }
    } else if (name === 'cep_telefonu') {
      // Sadece rakam, parantez ve boşluk karakterlerine izin ver
      const phoneRegex = /^[0-9\s\(\)]*$/;
      if (phoneRegex.test(value)) {
        // Sadece rakamları al
        let digits = value.replace(/\s/g, '').replace(/[\(\)]/g, '');
        
        // Maksimum 10 rakam (alan kodu + 7 rakam)
        digits = digits.substring(0, 10);
        
        let formattedValue = '';
        
        if (digits.length > 0) {
          // İlk rakam 5 olmalı
          if (digits.length > 0 && digits[0] !== '5') {
            return; // 5 ile başlamıyorsa güncelleme yapma
          }
          
          // (5xx) xxx xx xx formatına çevir
          formattedValue = '(' + digits.substring(0, 3);
          
          if (digits.length > 3) {
            formattedValue += ') ' + digits.substring(3, 6);
          }
          
          if (digits.length > 6) {
            formattedValue += ' ' + digits.substring(6, 8);
          }
          
          if (digits.length > 8) {
            formattedValue += ' ' + digits.substring(8, 10);
          }
        }
        
        setForm({ ...form, [name]: formattedValue });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Ad validasyonu
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s-]+$/;
    if (!nameRegex.test(form.firstName.trim())) {
      setError('Ad sadece harf, boşluk ve tire (-) içerebilir.');
      return;
    }
    
    if (form.firstName.trim().length < 2) {
      setError('Ad en az 2 karakter olmalıdır.');
      return;
    }
    
    if (form.firstName.trim().length > 20) {
      setError('Ad en fazla 20 karakter olabilir.');
      return;
    }
    
    // Soyad validasyonu
    if (!nameRegex.test(form.lastName.trim())) {
      setError('Soyad sadece harf, boşluk ve tire (-) içerebilir.');
      return;
    }
    
    if (form.lastName.trim().length < 2) {
      setError('Soyad en az 2 karakter olmalıdır.');
      return;
    }
    
    if (form.lastName.trim().length > 20) {
      setError('Soyad en fazla 20 karakter olabilir.');
      return;
    }
    
    // Email validasyonu
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(form.email.trim())) {
      setError('Geçerli bir email adresi giriniz.');
      return;
    }
    
    // Email uzunluk kontrolü
    if (form.email.trim().length > 100) {
      setError('Email adresi çok uzun.');
      return;
    }
    
    // Telefon validasyonu - (5xx) xxx xx xx formatı
    const phoneRegex = /^\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/;
    if (!phoneRegex.test(form.cep_telefonu)) {
      setError('Geçerli bir telefon numarası giriniz. Örn: (555) 123 45 67');
      return;
    }
    
    // Alan kodu 5 ile başlamalı
    const areaCode = form.cep_telefonu.substring(1, 4); // Parantez içindeki 3 rakam
    if (!areaCode.startsWith('5')) {
      setError('Telefon numarası 5 ile başlamalıdır. Örn: (555) 123 45 67');
      return;
    }
    
    try {
      const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.firstName.trim() + ' ' + form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          phone: '0' + form.cep_telefonu.replace(/\s/g, '').replace(/[\(\)]/g, '')
        }),
      });
      
    const data = await res.json();
      
      if (data.success) {
        setSuccess('Kayıt başarılı! Giriş yapabilirsiniz.');
        setForm({ firstName: '', lastName: '', email: '', password: '', cep_telefonu: '' });
      } else {
        setError(data.message || 'Bir hata oluştu.');
      }
    } catch (error) {
      setError('Bağlantı hatası oluştu.');
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
            Kayıt Ol
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Hesabınızı oluşturun
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Ad Soyad
            </label>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Ad"
                  maxLength={20}
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
              <div style={{ flex: 1 }}>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Soyad"
                  maxLength={20}
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
            </div>
          </div>

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
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Örn: kullanici@email.com"
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

          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="cep_telefonu"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Telefon
            </label>
            <div style={{ 
              display: "flex", 
              alignItems: "center",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              transition: "border-color 0.2s",
            }}>
              <span style={{
                padding: "12px 0 12px 16px",
                fontSize: "16px",
                color: "#374151",
                fontWeight: "600",
                userSelect: "none",
                minWidth: "16px",
                textAlign: "center"
              }}>
                0
              </span>
              <input
                id="cep_telefonu"
                name="cep_telefonu"
                type="tel"
                value={form.cep_telefonu}
                onChange={handleChange}
                placeholder="(555) 123 45 67"
                maxLength={15}
                required
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  background: "transparent",
                }}
                onFocus={(e) => {
                  e.target.parentElement!.style.borderColor = "#2563eb";
                }}
                onBlur={(e) => {
                  e.target.parentElement!.style.borderColor = "#e2e8f0";
                }}
              />
            </div>
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
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="off"
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

          <button
            type="submit"
            style={{
              width: "100%",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2563eb";
            }}
          >
            Kayıt Ol
          </button>
        </form>

        {error && (
          <div style={{ 
            color: "#dc2626", 
            marginTop: "16px", 
            padding: "12px", 
            background: "#fef2f2", 
            border: "1px solid #fecaca", 
            borderRadius: "8px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}
        
        {success && (
          <div style={{ 
            color: "#059669", 
            marginTop: "16px", 
            padding: "12px", 
            background: "#f0fdf4", 
            border: "1px solid #bbf7d0", 
            borderRadius: "8px",
            fontSize: "14px"
          }}>
            {success}
          </div>
        )}

        <div style={{ 
          marginTop: "24px", 
          textAlign: "center", 
          color: "#64748b", 
          fontSize: "14px" 
        }}>
          Zaten hesabınız var mı?{" "}
          <Link 
            href="/login" 
            style={{ 
              color: "#2563eb", 
              fontWeight: "600", 
              textDecoration: "none" 
            }}
          >
            Giriş Yap
        </Link>
      </div>
      </div>
    </div>
  );
} 