"use client";
import React from 'react';

interface LoginFormProps {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  isAdminForm: boolean;
  rememberMe: boolean;
  error: string;
  emailVerificationError: boolean;
  isEmailSent: boolean;
  isResendingEmail: boolean;
  loginAttempts: number;
  isRealPasswordAttempt: boolean;
  requiresPasswordSetup?: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setShowPassword: (show: boolean) => void;
  setRememberMe: (remember: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  handleResendVerificationEmail: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  showPassword,
  isLoading,
  isAdminForm,
  rememberMe,
  error,
  emailVerificationError,
  isEmailSent,
  isResendingEmail,
  loginAttempts,
  isRealPasswordAttempt,
  requiresPasswordSetup = false,
  setEmail,
  setPassword,
  setShowPassword,
  setRememberMe,
  handleSubmit,
  handleResendVerificationEmail
}) => {
  return (
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
          placeholder={isAdminForm ? "admin@example.com" : "ornek@email.com"}
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
            e.target.style.borderColor = isAdminForm ? "#7c3aed" : "#2563eb";
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
        <div style={{ position: "relative" }}>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            style={{
              width: "100%",
              padding: "12px 16px",
              paddingRight: "48px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = isAdminForm ? "#7c3aed" : "#2563eb";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e2e8f0";
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
              borderRadius: "4px",
              transition: "background-color 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#374151",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Remember Me Checkbox & Şifremi Unuttum */}
      <div style={{ 
        marginBottom: "24px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "nowrap"
      }}>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            fontSize: "14px",
            color: "#374151",
          }}
        >
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{
              marginRight: "8px",
              width: "16px",
              height: "16px",
              accentColor: isAdminForm ? "#7c3aed" : "#2563eb",
            }}
          />
          <span>Beni Hatırla</span>
        </label>
        
        <a
          href="/sifremi-unuttum"
          style={{
            color: "#2563eb",
            textDecoration: "underline",
            fontSize: "14px",
            fontWeight: "600",
            marginLeft: "auto",
            whiteSpace: "nowrap"
          }}
        >
          Şifremi unuttum
        </a>
      </div>

      {error && (
        <div
          style={{
            background: isEmailSent ? "#f0fdf4" : emailVerificationError ? "#fef3c7" : "#fef2f2",
            color: isEmailSent ? "#166534" : emailVerificationError ? "#d97706" : "#dc2626",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "14px",
            border: isEmailSent ? "1px solid #bbf7d0" : emailVerificationError ? "1px solid #fed7aa" : "1px solid #fecaca",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ lineHeight: "1.5" }}>
            {emailVerificationError ? (
              <>
                Email adresinizi doğrulamanız gerekiyor.<br />
                Email kutunuzu kontrol edin.
              </>
            ) : (
              error
            )}
          </div>
          {requiresPasswordSetup && (
            <div style={{ marginTop: "8px" }}>
              <a
                href="/sifremi-unuttum"
                style={{
                  color: "#2563eb",
                  textDecoration: "underline",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "inline-block",
                }}
              >
                Şifre oluşturmak için "Şifremi Unuttum" sayfasını kullanın →
              </a>
            </div>
          )}
          {emailVerificationError && !isEmailSent && (
            <button
              type="button"
              onClick={handleResendVerificationEmail}
              disabled={isResendingEmail}
              style={{
                background: "#d97706",
                border: "none",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: isResendingEmail ? "not-allowed" : "pointer",
                opacity: isResendingEmail ? 0.7 : 1,
                transition: "opacity 0.2s",
                alignSelf: "flex-start",
              }}
              onMouseEnter={(e) => {
                if (!isResendingEmail) {
                  e.currentTarget.style.opacity = "0.9";
                }
              }}
              onMouseLeave={(e) => {
                if (!isResendingEmail) {
                  e.currentTarget.style.opacity = "1";
                }
              }}
            >
              {isResendingEmail ? "Gönderiliyor..." : "Tekrar Mail Gönder"}
            </button>
          )}
        </div>
      )}

      {/* Rate Limiting Uyarısı - sadece gerçek şifre denemesi yapıldığında ve email doğrulama hatası yoksa göster */}
      {loginAttempts > 0 && !emailVerificationError && isRealPasswordAttempt && (
        <div
          style={{
            background: "#fef3c7",
            color: "#d97706",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "14px",
            border: "1px solid #fed7aa",
          }}
        >
          ⚠️ {loginAttempts}/5 giriş denemesi kullanıldı. 5 deneme sonrası 15 dakika bekleme süresi aktif.
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: "100%",
          padding: "14px",
          background: isAdminForm ? "#7c3aed" : "#2563eb",
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
            e.currentTarget.style.background = isAdminForm ? "#6d28d9" : "#1d4ed8";
          }
        }}
        onMouseLeave={(e) => {
          if (!isLoading) {
            e.currentTarget.style.background = isAdminForm ? "#7c3aed" : "#2563eb";
          }
        }}
      >
        {isLoading ? (isAdminForm ? "Admin girişi yapılıyor..." : "Giriş yapılıyor...") : (isAdminForm ? "Admin Girişi" : "Giriş Yap")}
      </button>
    </form>
  );
};

export default LoginForm;
