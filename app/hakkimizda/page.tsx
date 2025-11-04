"use client";
import React from "react";
import Link from "next/link";

export default function HakkimizdaPage() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Hakkımızda
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Düşük Bütçe olarak misyonumuz ve vizyonumuz
          </p>
        </div>

        {/* Ana İçerik */}
        <div style={{ lineHeight: '1.8' }}>
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              🎯 Misyonumuz
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: '0 0 16px 0'
            }}>
              Düşük Bütçe olarak, kaliteli <strong>2. el teknoloji ürünlerini</strong> uygun fiyatlarla 
              herkesin erişebileceği bir platform oluşturmayı hedefliyoruz. Müşterilerimizin bütçelerine uygun, 
              güvenilir ve kaliteli <strong>2. el ürünler</strong> bulabilmeleri için çalışıyoruz. 
              <strong>2. el teknoloji pazarında</strong> güven ve şeffaflık sağlayarak, 
              hem satıcılar hem de alıcılar için ideal bir ortam yaratıyoruz.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              🌟 Vizyonumuz
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: '0 0 16px 0'
            }}>
              Türkiye'nin en güvenilir ve tercih edilen <strong>2. el teknoloji alışveriş platformu</strong> 
              olmak. <strong>2. el ürün pazarında</strong> müşteri memnuniyetini ön planda tutarak, 
              sürdürülebilir büyüme ile sektörde lider konuma ulaşmak. 
              <strong>2. el teknoloji ürünlerinin</strong> değerini koruyarak, 
              çevre dostu ve ekonomik alışveriş deneyimi sunmak.
            </p>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              💎 Değerlerimiz
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }}>
              <div style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#059669',
                  margin: '0 0 12px 0'
                }}>
                  🛡️ Güvenilirlik
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  <strong>2. el ürünlerde</strong> müşterilerimizin güvenini kazanmak ve korumak en önemli önceliğimizdir. 
                  Tüm ürünlerimiz kalite kontrolünden geçer.
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#059669',
                  margin: '0 0 12px 0'
                }}>
                  🎯 Kalite
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Sadece kaliteli ve güvenilir <strong>2. el ürünleri</strong> sunuyoruz. 
                  Her ürün detaylı inceleme sonrası listelenir.
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#059669',
                  margin: '0 0 12px 0'
                }}>
                  💰 Uygun Fiyat
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  <strong>2. el ürünlerde</strong> en uygun fiyatlarla kaliteli ürünler sunmaya odaklanıyoruz. 
                  Bütçe dostu teknoloji erişimi sağlıyoruz.
                </p>
              </div>

              <div style={{
                padding: '20px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#059669',
                  margin: '0 0 12px 0'
                }}>
                  🚚 Hızlı Teslimat
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  margin: 0
                }}>
                  <strong>2. el ürünlerinizi</strong> en kısa sürede teslim etmek için çalışıyoruz. 
                  İstanbul içi aynı gün teslimat seçeneği mevcuttur.
                </p>
              </div>
            </div>
          </section>

          <section style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 16px 0'
            }}>
              📍 Hikayemiz
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: '0 0 16px 0'
            }}>
              2025 yılında İstanbul'da kurulan Düşük Bütçe, <strong>2. el teknoloji ürünleri</strong> 
              <strong> konusunda</strong> uzmanlaşmış bir e-ticaret platformudur. Müşterilerimizin bütçelerine uygun, 
              kaliteli <strong>2. el ürünler</strong> bulabilmeleri için sürekli gelişim gösteriyoruz.
            </p>
            <p style={{
              fontSize: '16px',
              color: '#374151',
              margin: 0
            }}>
              <strong>2. el teknoloji pazarında</strong> güven ve şeffaflık sağlayarak, 
              bugün binlerce müşterimize hizmet veriyor, <strong>2. el ürün</strong> dünyasında 
              güvenilir bir partner olmaya devam ediyoruz.
            </p>
          </section>
        </div>

        {/* Geri Dön Butonu */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              ← Anasayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
