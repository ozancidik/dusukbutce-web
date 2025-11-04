"use client";
import React from 'react';

interface SocialLoginButtonsProps {
  isMobile: boolean;
  socialLoading: string;
  onGoogleLogin: () => void;
  onFacebookLogin: () => void;
}

export default function SocialLoginButtons({ 
  isMobile, 
  socialLoading, 
  onGoogleLogin, 
  onFacebookLogin 
}: SocialLoginButtonsProps) {
  return (
    <div style={{
      marginTop: '24px',
      paddingTop: '24px',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <div style={{
          flex: 1,
          height: '1px',
          background: '#e2e8f0'
        }}></div>
        <span style={{
          padding: '0 16px',
          color: '#64748b',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          veya
        </span>
        <div style={{
          flex: 1,
          height: '1px',
          background: '#e2e8f0'
        }}></div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {/* Google ile Giriş */}
        <button
          type="button"
          onClick={onGoogleLogin}
          disabled={socialLoading === "google"}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: 'white',
            color: '#374151',
            border: '2px solid #e2e8f0',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: socialLoading === "google" ? "not-allowed" : "pointer",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'all 0.2s',
            opacity: socialLoading === "google" ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (socialLoading !== "google") {
              e.currentTarget.style.borderColor = "#2563eb";
              e.currentTarget.style.background = "#f8fafc";
            }
          }}
          onMouseLeave={(e) => {
            if (socialLoading !== "google") {
              e.currentTarget.style.borderColor = "#e2e8f0";
              e.currentTarget.style.background = "white";
            }
          }}
        >
          {socialLoading === "google" ? (
            <div style={{ 
              width: "20px", 
              height: "20px", 
              border: "2px solid #e2e8f0", 
              borderTop: "2px solid #2563eb", 
              borderRadius: "50%", 
              animation: "spin 1s linear infinite" 
            }}></div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {socialLoading === "google" ? "Giriş yapılıyor..." : "Google ile Giriş Yap"}
        </button>
        
        {/* Facebook ile Giriş */}
        <button
          type="button"
          onClick={onFacebookLogin}
          disabled={socialLoading === "facebook"}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#1877f2',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: socialLoading === "facebook" ? "not-allowed" : "pointer",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            transition: 'background 0.2s',
            opacity: socialLoading === "facebook" ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (socialLoading !== "facebook") {
              e.currentTarget.style.background = "#166fe5";
            }
          }}
          onMouseLeave={(e) => {
            if (socialLoading !== "facebook") {
              e.currentTarget.style.background = "#1877f2";
            }
          }}
        >
          {socialLoading === "facebook" ? (
            <div style={{ 
              width: "20px", 
              height: "20px", 
              border: "2px solid rgba(255,255,255,0.3)", 
              borderTop: "2px solid white", 
              borderRadius: "50%", 
              animation: "spin 1s linear infinite" 
            }}></div>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          )}
          {socialLoading === "facebook" ? "Giriş yapılıyor..." : "Facebook ile Giriş Yap"}
        </button>
      </div>
    </div>
  );
}
