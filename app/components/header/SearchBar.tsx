"use client";
import React, { useState } from "react";
import Link from "next/link";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ position: 'relative' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        padding: '12px 16px',
        paddingRight: '40px',
        minWidth: '300px',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <input
          type="text"
          placeholder="Ürün, kategori veya marka ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: 'none',
            background: 'none',
            outline: 'none',
            flex: 1,
            fontSize: '16px',
            color: '#374151'
          }}
        />
        <div style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#64748b'
        }}>
          🔍
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
