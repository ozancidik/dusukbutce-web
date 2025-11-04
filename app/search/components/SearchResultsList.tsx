"use client";
import React from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  price: number;
  image: string;
  url: string;
  type?: 'product' | 'satilik-ilanlar' | 'bize-sat';
}

interface SearchResultsListProps {
  isMobile: boolean;
  results: SearchResult[];
  loading: boolean;
}

export default function SearchResultsList({ isMobile, results, loading }: SearchResultsListProps) {
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '18px',
          color: '#6b7280'
        }}>
          Arama yapılıyor...
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            marginBottom: '16px'
          }}>
            🔍
          </div>
          <h3 style={{
            fontSize: isMobile ? '18px' : '20px',
            fontWeight: '600',
            color: '#1f2937',
            margin: '0 0 8px 0'
          }}>
            Sonuç bulunamadı
          </h3>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            color: '#6b7280',
            margin: 0
          }}>
            Arama kriterlerinizi değiştirerek tekrar deneyin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: isMobile ? '16px' : '24px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h2 style={{
          fontSize: isMobile ? '16px' : '18px',
          fontWeight: '600',
          color: '#1f2937',
          margin: 0
        }}>
          {results.length} sonuç bulundu
        </h2>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
        padding: isMobile ? '16px' : '24px'
      }}>
        {results.map((result) => (
          <Link
            key={result.id}
            href={result.url}
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
              transition: 'all 0.2s',
              cursor: 'pointer',
              background: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            >
              <div style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <img
                  src={result.image}
                  alt={result.title}
                  style={{
                    width: '80px',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    background: '#f3f4f6'
                  }}
                />
                <div style={{
                  flex: 1,
                  minWidth: 0
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0',
                    lineHeight: '1.4',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {result.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: '0 0 8px 0'
                  }}>
                    {result.category}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#059669'
                    }}>
                      ₺{result.price.toLocaleString()}
                    </span>
                    {result.type && (
                      <span style={{
                        fontSize: '12px',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        background: result.type === 'product' ? '#eff6ff' : 
                                    result.type === 'satilik-ilanlar' ? '#fef3c7' : '#f0fdf4',
                        color: result.type === 'product' ? '#1d4ed8' : 
                               result.type === 'satilik-ilanlar' ? '#d97706' : '#166534',
                        fontWeight: '500'
                      }}>
                        {result.type === 'product' ? 'Ürün' : 
                         result.type === 'satilik-ilanlar' ? 'Satılık İlan' : 'Bize Sat'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
