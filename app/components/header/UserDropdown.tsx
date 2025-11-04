"use client";
import React from "react";
import Link from "next/link";

interface UserInfo {
  isLoggedIn: boolean;
  name: string;
  isAdmin: boolean;
}

interface UserDropdownProps {
  userInfo: UserInfo;
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  onLogout: () => void;
}

function UserDropdown({ userInfo, showDropdown, setShowDropdown, onLogout }: UserDropdownProps) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '6px',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {userInfo.name.charAt(0).toUpperCase()}
        </div>
        <span style={{ color: '#374151', fontWeight: '500' }}>
          {userInfo.name}
        </span>
        <span style={{ color: '#6b7280' }}>▼</span>
      </button>

      {showDropdown && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          minWidth: '200px',
          zIndex: 1000,
          marginTop: '4px'
        }}>
          <div style={{ padding: '8px 0' }}>
            <Link href="/profile" style={{
              display: 'block',
              padding: '12px 16px',
              textDecoration: 'none',
              color: '#374151',
              transition: 'background-color 0.2s'
            }}>
              Profilim
            </Link>
            <Link href="/siparisler" style={{
              display: 'block',
              padding: '12px 16px',
              textDecoration: 'none',
              color: '#374151',
              transition: 'background-color 0.2s'
            }}>
              Siparişlerim
            </Link>
            <Link href="/favoriler" style={{
              display: 'block',
              padding: '12px 16px',
              textDecoration: 'none',
              color: '#374151',
              transition: 'background-color 0.2s'
            }}>
              Favorilerim
            </Link>
            {userInfo.isAdmin && (
              <Link href="/admin" style={{
                display: 'block',
                padding: '12px 16px',
                textDecoration: 'none',
                color: '#dc2626',
                fontWeight: '500',
                transition: 'background-color 0.2s'
              }}>
                Admin Panel
              </Link>
            )}
            <hr style={{ margin: '8px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
            <button
              onClick={onLogout}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: '#dc2626',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDropdown;

