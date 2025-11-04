"use client";
import React from "react";
import Link from "next/link";

interface UserInfo {
  isLoggedIn: boolean;
  name: string;
  isAdmin: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userInfo: UserInfo;
  onLogout: () => void;
}

function MobileMenu({ isOpen, onClose, userInfo, onLogout }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      <div style={{
        width: '300px',
        height: '100%',
        backgroundColor: 'white',
        padding: '20px',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{ margin: 0, color: '#374151' }}>Menü</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Link href="/bize-sat" style={{
            textDecoration: 'none',
            color: '#374151',
            fontWeight: '500',
            padding: '12px 16px',
            borderRadius: '6px',
            backgroundColor: '#f3f4f6'
          }}>
            Bize Sat
          </Link>
          <Link href="/bizden-al" style={{
            textDecoration: 'none',
            color: '#374151',
            fontWeight: '500',
            padding: '12px 16px',
            borderRadius: '6px',
            backgroundColor: '#f3f4f6'
          }}>
            Bizden Al
          </Link>
          <Link href="/teknik-servis" style={{
            textDecoration: 'none',
            color: '#374151',
            fontWeight: '500',
            padding: '12px 16px',
            borderRadius: '6px',
            backgroundColor: '#f3f4f6'
          }}>
            Teknik Servis
          </Link>

          {userInfo.isLoggedIn ? (
            <>
              <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
              <div style={{ padding: '12px 16px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>Hoş geldin,</p>
                <p style={{ margin: 0, color: '#374151', fontWeight: '500' }}>{userInfo.name}</p>
              </div>
              <Link href="/profile" style={{
                textDecoration: 'none',
                color: '#374151',
                padding: '12px 16px',
                borderRadius: '6px',
                backgroundColor: '#f3f4f6'
              }}>
                Profilim
              </Link>
              <Link href="/siparisler" style={{
                textDecoration: 'none',
                color: '#374151',
                padding: '12px 16px',
                borderRadius: '6px',
                backgroundColor: '#f3f4f6'
              }}>
                Siparişlerim
              </Link>
              <Link href="/favoriler" style={{
                textDecoration: 'none',
                color: '#374151',
                padding: '12px 16px',
                borderRadius: '6px',
                backgroundColor: '#f3f4f6'
              }}>
                Favorilerim
              </Link>
              {userInfo.isAdmin && (
                <Link href="/admin" style={{
                  textDecoration: 'none',
                  color: '#dc2626',
                  fontWeight: '500',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  backgroundColor: '#fef2f2'
                }}>
                  Admin Panel
                </Link>
              )}
              <button
                onClick={onLogout}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
              <Link href="/login" style={{
                textDecoration: 'none',
                color: '#374151',
                padding: '12px 16px',
                borderRadius: '6px',
                backgroundColor: '#f3f4f6',
                textAlign: 'center'
              }}>
                Giriş Yap
              </Link>
              <Link href="/register" style={{
                textDecoration: 'none',
                color: 'white',
                backgroundColor: '#2563eb',
                padding: '12px 16px',
                borderRadius: '6px',
                textAlign: 'center'
              }}>
                Kayıt Ol
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;

