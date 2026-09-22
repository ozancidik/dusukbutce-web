"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '', cep_telefonu: '', birthDate: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [ageTooYoung, setAgeTooYoung] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);
  const [acceptKvkk, setAcceptKvkk] = useState(false);
  const emailFormatRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneFormatRegex = /^\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/;

  // Admin giriş kontrolü
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
    if (adminLoggedIn === "true") {
      window.location.href = "/admin";
      return;
    }
  }, []);

  // Mobil kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Telefon numarası kontrolü için debounced function
  const checkPhoneExists = useCallback(async (phone: string) => {
    if (!phone || phone.length < 10) {
      setPhoneExists(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/check-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone }),
      });

      if (response.ok) {
        const data = await response.json();
        setPhoneExists(data.exists);
      }
    } catch (error) {
      console.error('Phone check error:', error);
    }
  }, []);

  // Email kontrolü için debounced function
  const checkEmailExists = useCallback(async (email: string) => {
    if (!email || !email.includes('@')) {
      setEmailExists(false);
      console.log('[P5-2 DEBUG] Email check skipped:', { email });
      return;
    }

    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('[P5-2 DEBUG] Email check result:', { email, exists: data.exists });
        setEmailExists(data.exists);
      }
    } catch (error) {
      console.error('Email check error:', error);
    }
  }, []);

  // Telefon numarası değiştiğinde kontrol et (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.cep_telefonu) {
        checkPhoneExists(form.cep_telefonu);
      } else {
        setPhoneExists(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [form.cep_telefonu, checkPhoneExists]);

  // Email değiştiğinde kontrol et (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (form.email) {
        console.log('[P5-2 DEBUG] Email debounce triggered:', { email: form.email });
        checkEmailExists(form.email);
      } else {
        setEmailExists(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [form.email, checkEmailExists]);

  // Log emailExists changes
  useEffect(() => {
    console.log('[P5-2 DEBUG] emailExists state changed:', { emailExists });
  }, [emailExists]);

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
    } else if (name === 'birthDate') {
      // Doğum tarihi için sadece geçerli tarih formatına izin ver
      setForm({ ...form, [name]: value });
      
      // Yaş kontrolü (real-time)
      if (value) {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        setAgeTooYoung(age < 13);
      } else {
        setAgeTooYoung(false);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
    
    // Şifre eşleşme kontrolü (real-time)
    if (name === 'password' || name === 'passwordConfirm') {
      const newForm = { ...form, [name]: value };
      if (newForm.password && newForm.passwordConfirm) {
        setPasswordMismatch(newForm.password !== newForm.passwordConfirm);
      } else {
        setPasswordMismatch(false);
      }
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
    
    // Doğum tarihi validasyonu
    if (!form.birthDate) {
      setError('Doğum tarihi gereklidir.');
      return;
    }
    
    // Doğum tarihi format kontrolü (YYYY-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(form.birthDate)) {
      setError('Geçerli bir doğum tarihi giriniz. Örn: 1990-01-15');
      return;
    }
    
    // Doğum tarihi geçerlilik kontrolü
    const birthDate = new Date(form.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (birthDate > today) {
      setError('Doğum tarihi gelecekte olamaz.');
      return;
    }
    
    if (age < 13) {
      setError('13 yaşından küçük kullanıcılar kayıt olamaz.');
      return;
    }
    
    if (age > 120) {
      setError('Geçerli bir doğum tarihi giriniz.');
      return;
    }
    
    // Email kayıtlı mı kontrol et
    if (emailExists) {
      setError('Bu email adresi zaten kayıtlı. Lütfen farklı bir email adresi kullanın.');
      return;
    }
    
    // Telefon numarası kayıtlı mı kontrol et
    if (phoneExists) {
      setError('Bu telefon numarası zaten kayıtlı. Lütfen farklı bir telefon numarası kullanın.');
      return;
    }
    
    // KVKK onayı kontrolü
    if (!acceptKvkk) {
      setError('KVKK aydınlatma metnini onaylamalısınız.');
      return;
    }

    // Şifre eşleşme kontrolü
    if (form.password !== form.passwordConfirm) {
      setError('Şifreler eşleşmiyor.');
      return;
    }
    
    // Şifre uzunluk kontrolü
    if (form.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return;
    }
    
    if (form.password.length > 50) {
      setError('Şifre en fazla 50 karakter olabilir.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          cep_telefonu: form.cep_telefonu.replace(/\s/g, '').replace(/[\(\)]/g, ''),
          birth_date: form.birthDate,
          acceptNewsletter: acceptNewsletter,
          kvkkApproved: acceptKvkk
        }),
      });
      
    const data = await res.json();
      
      if (res.ok) {
        setShowSuccessPopup(true);
        setForm({ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '', cep_telefonu: '', birthDate: '' });
        setAcceptNewsletter(false);
        setAcceptKvkk(false);
      } else {
        setError(data.error || 'Bir hata oluştu.');
      }
    } catch (error) {
      setError('Bağlantı hatası oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled =
    isLoading ||
    form.firstName.trim().length < 2 ||
    form.lastName.trim().length < 2 ||
    !emailFormatRegex.test(form.email.trim()) ||
    !phoneFormatRegex.test(form.cep_telefonu) ||
    !form.birthDate ||
    ageTooYoung ||
    passwordMismatch ||
    form.password.length < 6 ||
    form.password !== form.passwordConfirm ||
    emailExists ||
    phoneExists ||
    !acceptKvkk;

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes popupSlideIn {
          0% { 
            opacity: 0;
            transform: scale(0.8) translateY(-20px);
          }
          100% { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
          padding: "60px 20px 60px 20px",
        }}
      >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 4px 32px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <h1 style={{ color: "#2563eb", fontSize: "28px", fontWeight: "700", margin: "0 0 8px 0" }}>
            Kayıt Ol
          </h1>
          <p style={{ color: "#64748b", margin: 0 }}>
            Hesabınızı oluşturun
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 1. Satır: Ad ve Soyad */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ 
              display: "flex", 
              gap: isMobile ? "0" : "12px",
              flexDirection: isMobile ? "column" : "row"
            }}>
              <div style={{ flex: 1, marginBottom: isMobile ? "20px" : "0" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Ad
                </label>
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
                <label
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Soyad
                </label>
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

          {/* 2. Satır: Email ve Telefon */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ 
              display: "flex", 
              gap: isMobile ? "0" : "12px",
              flexDirection: isMobile ? "column" : "row"
            }}>
              <div style={{ flex: 1, marginBottom: isMobile ? "20px" : "0" }}>
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
                    border: emailExists ? "2px solid #dc2626" : "2px solid #e2e8f0",
                    borderRadius: "8px",
                    fontSize: "16px",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = emailExists ? "#dc2626" : "#2563eb";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = emailExists ? "#dc2626" : "#e2e8f0";
                  }}
                />
                {emailExists && (
                  <div style={{
                    color: "#dc2626",
                    marginTop: "8px",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    Bu email adresi zaten kayıtlı
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
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
                  border: phoneExists ? "2px solid #dc2626" : "2px solid #e2e8f0",
                  borderRadius: "8px",
                  transition: "border-color 0.2s",
                  width: "100%",
                  boxSizing: "border-box",
                }}>
                  <span style={{
                    padding: "12px 0 12px 16px",
                    fontSize: "16px",
                    color: "#374151",
                    fontWeight: "600",
                    userSelect: "none",
                    minWidth: "20px",
                    textAlign: "center",
                    flexShrink: 0
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
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      e.target.parentElement!.style.borderColor = phoneExists ? "#dc2626" : "#2563eb";
                    }}
                    onBlur={(e) => {
                      e.target.parentElement!.style.borderColor = phoneExists ? "#dc2626" : "#e2e8f0";
                    }}
                  />
                </div>
                {phoneExists && (
                  <div style={{
                    color: "#dc2626",
                    marginTop: "8px",
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    Bu telefon numarası zaten kayıtlı
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Satır: Doğum Tarihi */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="birthDate"
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#374151",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              Doğum Tarihi
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="date"
              value={form.birthDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                border: ageTooYoung ? "2px solid #dc2626" : "2px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "16px",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = ageTooYoung ? "#dc2626" : "#2563eb";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = ageTooYoung ? "#dc2626" : "#e2e8f0";
              }}
            />
            {ageTooYoung && (
              <div style={{ 
                color: "#dc2626", 
                marginTop: "8px", 
                fontSize: "14px",
                fontWeight: "500"
              }}>
                13 yaşından küçük kullanıcılar kayıt olamaz
              </div>
            )}
          </div>

          {/* 4. Satır: Şifre ve Şifre Tekrar */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ 
              display: "flex", 
              gap: isMobile ? "0" : "12px",
              flexDirection: isMobile ? "column" : "row"
            }}>
              <div style={{ flex: 1, marginBottom: isMobile ? "20px" : "0" }}>
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
                <div style={{ 
                  position: "relative",
                  border: passwordMismatch ? "2px solid #dc2626" : "2px solid #e2e8f0",
                  borderRadius: "8px",
                  transition: "border-color 0.2s",
                }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 50px 12px 16px",
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      boxSizing: "border-box",
                      background: "transparent",
                    }}
                    onFocus={(e) => {
                      e.target.parentElement!.style.borderColor = passwordMismatch ? "#dc2626" : "#2563eb";
                    }}
                    onBlur={(e) => {
                      e.target.parentElement!.style.borderColor = passwordMismatch ? "#dc2626" : "#e2e8f0";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label
                  htmlFor="passwordConfirm"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#374151",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Şifre Tekrar
                </label>
                <div style={{ 
                  position: "relative",
                  border: passwordMismatch ? "2px solid #dc2626" : "2px solid #e2e8f0",
                  borderRadius: "8px",
                  transition: "border-color 0.2s",
                }}>
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    type={showPasswordConfirm ? "text" : "password"}
                    value={form.passwordConfirm}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    style={{
                      width: "100%",
                      padding: "12px 50px 12px 16px",
                      border: "none",
                      outline: "none",
                      fontSize: "16px",
                      boxSizing: "border-box",
                      background: "transparent",
                    }}
                    onFocus={(e) => {
                      e.target.parentElement!.style.borderColor = passwordMismatch ? "#dc2626" : "#2563eb";
                    }}
                    onBlur={(e) => {
                      e.target.parentElement!.style.borderColor = passwordMismatch ? "#dc2626" : "#e2e8f0";
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {showPasswordConfirm ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ color: "#6b7280" }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
            {passwordMismatch && (
              <div style={{ 
                color: "#dc2626", 
                marginTop: "8px", 
                fontSize: "14px",
                fontWeight: "500"
              }}>
                Şifreler eşleşmiyor
              </div>
            )}
          </div>

          {/* Newsletter Checkbox */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#374151",
              userSelect: "none"
            }}>
              <input
                type="checkbox"
                checked={acceptNewsletter}
                onChange={(e) => setAcceptNewsletter(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  accentColor: "#2563eb",
                  cursor: "pointer",
                  flexShrink: 0
                }}
              />
              <span>
                Kampanya ve duyurulardan E-Posta ile haberdar olmak istiyorum.
              </span>
            </label>
          </div>

          {/* KVKK Checkbox */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "8px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#374151",
              lineHeight: "1.4",
              userSelect: "none"
            }}>
              <input
                type="checkbox"
                checked={acceptKvkk}
                onChange={(e) => setAcceptKvkk(e.target.checked)}
                style={{
                  width: "20px",
                  height: "20px",
                  marginTop: "2px",
                  accentColor: "#2563eb",
                  cursor: "pointer",
                  flexShrink: 0
                }}
              />
              <span>
                KVKK kapsamında{" "}
                <Link 
                  href="/kvkk"
                  style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}
                  target="_blank"
                >
                  Aydınlatma Metni
                </Link>{" "}
                ve{" "}
                <Link 
                  href="/gizlilik-politikasi"
                  style={{ color: "#2563eb", fontWeight: "600", textDecoration: "none" }}
                  target="_blank"
                >
                  Gizlilik Politikası
                </Link>
                ’nı okudum, kişisel verilerimin işlenmesine onay veriyorum.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              width: "100%",
              background: isSubmitDisabled ? "#9ca3af" : "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "12px 16px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              if (!isSubmitDisabled) {
                e.currentTarget.style.background = "#1d4ed8";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSubmitDisabled) {
                e.currentTarget.style.background = "#2563eb";
              }
            }}
          >
            {isLoading && (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid #ffffff",
                  borderTop: "2px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            )}
            {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          </button>
        </form>

        {error && (
          <div
            data-testid="register-error-message"
            style={{
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

      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
          onClick={() => setShowSuccessPopup(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "40px",
              maxWidth: "600px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              animation: "popupSlideIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Success Icon */}
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 24px auto",
                boxShadow: "0 8px 32px rgba(16, 185, 129, 0.3)",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: "white" }}
              >
                <path
                  d="M9 12l2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Success Message */}
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#1f2937",
                margin: "0 0 12px 0",
              }}
            >
              Kayıt Başarılı! 🎉
            </h2>
            
            <p
              style={{
                fontSize: "16px",
                color: "#6b7280",
                margin: "0 0 16px 0",
                lineHeight: "1.5",
              }}
            >
              Hesabınız başarıyla oluşturuldu! Email adresinizi doğrulamanız gerekiyor. Email kutunuzu kontrol edin.
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#9ca3af",
                margin: "0 0 32px 0",
                fontWeight: "500",
              }}
            >
              Giriş yapmak için aşağıdaki butonu kullanabilir ya da bu pencereyi kapatabilirsiniz.
            </p>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setShowSuccessPopup(false)}
                style={{
                  padding: "12px 24px",
                  background: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                }}
              >
                Kapat
              </button>
              
              <Link href="/login">
                <button
                  style={{
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  Giriş Yap
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
} 