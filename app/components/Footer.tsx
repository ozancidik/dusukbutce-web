"use client";
import React from "react";

export default function Footer() {
  return (
    <footer style={{
      background: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
      color: "white",
      marginTop: "auto"
    }}>
      {/* Üst Footer - Özellikler */}
      <div className="py-6 px-4 md:py-8 md:px-6" style={{
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
      }}>
        <div
          className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-4 gap-3 min-[480px]:gap-4 md:gap-6"
          style={{
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >

          {/* Güvenilir Gönderim */}
          <div style={{
            textAlign: "center",
            padding: "20px 16px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{
              fontSize: "32px",
              marginBottom: "12px",
              color: "#fbbf24"
            }}>
              🚚
            </div>
            <h3 className="text-sm md:text-base" style={{
              margin: "0 0 8px 0",
              color: "#fbbf24",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              Güvenilir Gönderim
            </h3>
            <p className="text-xs md:text-sm" style={{
              margin: 0,
              color: "#e5e7eb",
              lineHeight: "1.4"
            }}>
              Hızlı ve güvenli gönderim
            </p>
          </div>

          {/* Müşteri Memnuniyeti */}
          <div style={{
            textAlign: "center",
            padding: "20px 16px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{
              fontSize: "32px",
              marginBottom: "12px",
              color: "#fbbf24"
            }}>
              😊 <span style={{ fontSize: "20px" }}>⭐⭐⭐⭐⭐</span>
            </div>
            <h3 className="text-sm md:text-base" style={{
              margin: "0 0 8px 0",
              color: "#fbbf24",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              Müşteri Memnuniyeti
            </h3>
            <p className="text-xs md:text-sm" style={{
              margin: 0,
              color: "#e5e7eb",
              lineHeight: "1.4"
            }}>
              Memnuniyetiniz önceliğimiz
            </p>
          </div>

          {/* Güvenli Ödeme */}
          <div style={{
            textAlign: "center",
            padding: "20px 16px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{
              fontSize: "32px",
              marginBottom: "12px",
              color: "#fbbf24"
            }}>
              💳🛡️
            </div>
            <h3 className="text-sm md:text-base" style={{
              margin: "0 0 8px 0",
              color: "#fbbf24",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              Güvenli Ödeme
            </h3>
            <p className="text-xs md:text-sm" style={{
              margin: 0,
              color: "#e5e7eb",
              lineHeight: "1.4"
            }}>
              %100 güvenli ödeme altyapısı
            </p>
          </div>

          {/* Kaliteli Markalar */}
          <div style={{
            textAlign: "center",
            padding: "20px 16px",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <div style={{
              fontSize: "32px",
              marginBottom: "12px",
              color: "#fbbf24"
            }}>
              ✅
            </div>
            <h3 className="text-sm md:text-base" style={{
              margin: "0 0 8px 0",
              color: "#fbbf24",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              Kaliteli Markalar
            </h3>
            <p className="text-xs md:text-sm" style={{
              margin: 0,
              color: "#e5e7eb",
              lineHeight: "1.4"
            }}>
              Sadece bilinen kaliteli markalar
            </p>
          </div>
        </div>
      </div>

      {/* Ana Footer İçeriği */}
      <div className="py-6 px-4 md:py-8 md:px-6">
        <div
          className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-4 gap-5 min-[480px]:gap-6 md:gap-8"
          style={{
            maxWidth: "1200px",
            margin: "0 auto"
          }}
        >

          {/* Kurumsal */}
          <div>
            <h4 className="text-sm md:text-base" style={{
              margin: "0 0 16px 0",
              color: "white",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              KURUMSAL
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <a href="/hakkimizda" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Hakkımızda</a>
              <a href="/banka-hesaplari" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Banka Hesaplarımız</a>
              <a href="/iletisim" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>İletişim</a>
            </div>
          </div>

          {/* Site Kullanımı */}
          <div>
            <h4 className="text-sm md:text-base" style={{
              margin: "0 0 16px 0",
              color: "white",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              SİTE KULLANIMI
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <a href="/gizlilik-politikasi" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>KVKK Bilgilendirme</a>
              <a href="/satis-sozlesmesi" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Satış Sözleşmesi</a>
              <a href="/kullanim-sartlari" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Şartlar ve Koşullar</a>
              <a href="/sss" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Sık Sorulan Sorular</a>
            </div>
          </div>

          {/* Hesap Bilgileri */}
          <div>
            <h4 className="text-sm md:text-base" style={{
              margin: "0 0 16px 0",
              color: "white",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              HESAP BİLGİLERİ
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px"
            }}>
              <a href="/profile" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Hesabım</a>
              <a href="/siparisler" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Sipariş Takibi</a>
              <a href="/karsilastir" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Karşılaştırma Listem</a>
              <a href="/favoriler" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Favori Ürünlerim</a>
              <a href="/tekliflerim" className="text-xs md:text-sm py-2 md:py-1 min-h-8 md:min-h-0" style={{
                color: "#e5e7eb",
                textDecoration: "none",
                transition: "color 0.2s",
                display: "block"
              }}>Tekliflerim</a>
            </div>
          </div>

          {/* Mağaza Adresi */}
          <div>
            <h4 className="text-sm md:text-base" style={{
              margin: "0 0 16px 0",
              color: "white",
              fontWeight: "700",
              textTransform: "uppercase"
            }}>
              MAĞAZA ADRESİMİZ
            </h4>
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              marginBottom: "16px"
            }}>
              <div style={{
                fontSize: "24px",
                color: "#ef4444"
              }}>
                📍
              </div>
              <div className="text-xs md:text-sm" style={{
                color: "#e5e7eb",
                lineHeight: "1.4"
              }}>
                <div>Atakent Mah. Yasemin Sokağı No:4</div>
                <div>34760 Ümraniye/İstanbul</div>
              </div>
            </div>

            {/* Sosyal Medya */}
            <div style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px"
            }}>
              <a href="https://www.facebook.com/dusukbutce/" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#1877f2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textDecoration: "none",
                transition: "transform 0.2s"
              }}>
                <img
                  src="/facebook-svgrepo-com.svg"
                  alt="Facebook"
                  style={{
                    width: "28px",
                    height: "28px"
                  }}
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textDecoration: "none",
                transition: "transform 0.2s"
              }}>
                <img
                  src="/Instagram_logo_2022.svg (1).webp"
                  alt="Instagram"
                  style={{
                    width: "28px",
                    height: "28px"
                  }}
                />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#ff0000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textDecoration: "none",
                transition: "transform 0.2s"
              }}>
                <img
                  src="/youtube-svgrepo-com.svg"
                  alt="YouTube"
                  style={{
                    width: "32px",
                    height: "32px"
                  }}
                />
              </a>
              <a href="https://wa.me/905385793412?text=Merhaba! Düşük Bütçe'den ürün hakkında bilgi almak istiyorum." target="_blank" rel="noopener noreferrer" style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#25D366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textDecoration: "none",
                transition: "transform 0.2s"
              }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="py-5 px-4 md:py-6 md:px-6 flex flex-col md:flex-row gap-4 md:gap-6" style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "14px",
            fontWeight: "700"
          }}>
            DB
          </div>
          <span className="text-sm md:text-base" style={{
            fontWeight: "700",
            color: "white"
          }}>
            Düşük Bütçe
          </span>
        </div>

        <div className="text-xs md:text-sm text-center md:text-right" style={{
          color: "#e5e7eb"
        }}>
          © {new Date().getFullYear()} Düşük Bütçe. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
