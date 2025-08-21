"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Siparişler örnek
  const orders: any[] = [];
  
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)",
      padding: isMobile ? "16px" : "24px"
    }}>
      <div style={{
        maxWidth: isMobile ? "100%" : "900px",
        margin: "0 auto",
        background: "white",
        borderRadius: isMobile ? "16px" : "20px",
        padding: isMobile ? "32px" : "48px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1), 0 8px 25px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.2)"
      }}>
        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: isMobile ? "40px" : "60px",
          paddingBottom: isMobile ? "24px" : "40px",
          borderBottom: "2px solid #f1f5f9"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
            width: isMobile ? "60px" : "80px",
            height: isMobile ? "60px" : "80px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)"
          }}>
            <span style={{ fontSize: isMobile ? "24px" : "32px", color: "white" }}>📦</span>
          </div>
          <h1 style={{
            color: "#1e293b",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "800",
            margin: "0 0 16px 0",
            letterSpacing: "-0.025em"
          }}>
            Siparişlerim
          </h1>
          <p style={{
            color: "#64748b",
            fontSize: isMobile ? "16px" : "18px",
            fontWeight: "500",
            margin: "0 auto",
            maxWidth: isMobile ? "100%" : "500px"
          }}>
            Tüm siparişlerinizi ve sipariş geçmişinizi buradan takip edebilirsiniz
          </p>
        </div>

        {/* Sipariş İçeriği */}
        {orders.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: isMobile ? "40px 20px" : "60px 40px",
            background: "#f8fafc",
            borderRadius: "16px",
            border: "2px dashed #cbd5e1"
          }}>
            <div style={{
              fontSize: isMobile ? "48px" : "64px",
              marginBottom: "16px"
            }}>
              📋
            </div>
            <h3 style={{
              color: "#374151",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "600",
              margin: "0 0 12px 0"
            }}>
              Henüz Siparişiniz Yok
            </h3>
            <p style={{
              color: "#6b7280",
              fontSize: isMobile ? "16px" : "18px",
              margin: "0 0 24px 0",
              lineHeight: "1.6"
            }}>
              İlk siparişinizi vermek için ürünlerimizi keşfedin
            </p>
            <Link href="/" style={{ textDecoration: "none" }}>
              <button style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: isMobile ? "14px 24px" : "16px 32px",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(37, 99, 235, 0.3)";
              }}>
                🛍️ Alışverişe Başla
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ marginBottom: "32px" }}>
            <div style={{
              background: "#f8fafc",
              padding: isMobile ? "20px" : "24px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
              marginBottom: "24px"
            }}>
              <h3 style={{
                color: "#1e293b",
                fontSize: isMobile ? "18px" : "20px",
                fontWeight: "600",
                margin: "0 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                📊 Sipariş Özeti
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: "16px"
              }}>
                <div style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: "700",
                    color: "#2563eb",
                    marginBottom: "4px"
                  }}>
                    {orders.length}
                  </div>
                  <div style={{
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#64748b"
                  }}>
                    Toplam Sipariş
                  </div>
                </div>
                <div style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: "700",
                    color: "#059669",
                    marginBottom: "4px"
                  }}>
                    {orders.filter(order => order.status === 'completed').length}
                  </div>
                  <div style={{
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#64748b"
                  }}>
                    Tamamlanan
                  </div>
                </div>
                <div style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #e2e8f0"
                }}>
                  <div style={{
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: "700",
                    color: "#dc2626",
                    marginBottom: "4px"
                  }}>
                    {orders.filter(order => order.status === 'pending').length}
                  </div>
                  <div style={{
                    fontSize: isMobile ? "14px" : "16px",
                    color: "#64748b"
                  }}>
                    Bekleyen
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: "#f8fafc",
              padding: isMobile ? "20px" : "24px",
              borderRadius: "16px",
              border: "1px solid #e2e8f0"
            }}>
              <h3 style={{
                color: "#1e293b",
                fontSize: isMobile ? "18px" : "20px",
                fontWeight: "600",
                margin: "0 0 20px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                📋 Sipariş Listesi
              </h3>
              <div style={{
                display: "grid",
                gap: "16px"
              }}>
                {orders.map((order, index) => (
                  <div key={order.id} style={{
                    background: "white",
                    padding: isMobile ? "16px" : "20px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                      gap: "16px",
                      alignItems: "center"
                    }}>
                      <div>
                        <div style={{
                          fontSize: isMobile ? "14px" : "16px",
                          fontWeight: "600",
                          color: "#374151",
                          marginBottom: "4px"
                        }}>
                          Sipariş #{order.id}
                        </div>
                        <div style={{
                          fontSize: isMobile ? "12px" : "14px",
                          color: "#6b7280"
                        }}>
                          {order.date}
                        </div>
                      </div>
                      <div style={{
                        fontSize: isMobile ? "14px" : "16px",
                        fontWeight: "600",
                        color: "#059669"
                      }}>
                        {order.total} TL
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <span style={{
                          background: order.status === 'completed' ? '#dcfce7' : '#fef3c7',
                          color: order.status === 'completed' ? '#059669' : '#d97706',
                          padding: "4px 12px",
                          borderRadius: "20px",
                          fontSize: isMobile ? "12px" : "14px",
                          fontWeight: "500"
                        }}>
                          {order.status === 'completed' ? '✅ Tamamlandı' : '⏳ Bekliyor'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Yardım Bölümü */}
        <div style={{
          textAlign: "center",
          padding: isMobile ? "24px" : "32px",
          background: "#f0f9ff",
          borderRadius: "16px",
          border: "1px solid #0ea5e9",
          marginBottom: "32px"
        }}>
          <h3 style={{
            fontSize: isMobile ? "18px" : "20px",
            fontWeight: "600",
            color: "#0369a1",
            margin: "0 0 12px 0"
          }}>
            💡 Sipariş hakkında sorunuz mu var?
          </h3>
          <p style={{
            fontSize: isMobile ? "14px" : "16px",
            color: "#0c4a6e",
            margin: "0 0 20px 0"
          }}>
            Müşteri hizmetlerimizle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
          </p>
          <Link href="/iletisim" style={{ textDecoration: "none" }}>
            <button style={{
              background: "#0ea5e9",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: isMobile ? "12px 20px" : "14px 24px",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background 0.2s"
            }}>
              📞 İletişime Geç
            </button>
          </Link>
        </div>

        {/* Ana Sayfa Butonu */}
        <div style={{
          textAlign: "center",
          paddingTop: "24px",
          borderTop: "2px solid #f1f5f9"
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <button style={{
              background: "linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: isMobile ? "14px 24px" : "16px 32px",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(107, 114, 128, 0.3)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(107, 114, 128, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(107, 114, 128, 0.3)";
            }}>
              🏠 Ana Sayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 