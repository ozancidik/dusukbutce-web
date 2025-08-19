"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
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
            İletişim
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px'
        }}>
          {/* İletişim Bilgileri */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 24px 0'
            }}>
              📍 İletişim Bilgileri
            </h2>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0'
              }}>
                🏢 Adres
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Ihlamurkuyu Mahallesi<br />
                Malazgirt Caddesi, No:32/A<br />
                34771, Ümraniye / İstanbul
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0'
              }}>
                📞 Telefon
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0
              }}>
                +90 (212) XXX XX XX
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0'
              }}>
                ✉️ E-posta
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0
              }}>
                info@dusukbutce.com
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 12px 0'
              }}>
                🕒 Çalışma Saatleri
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.6'
              }}>
                Pazartesi - Cuma: 09:00 - 18:00<br />
                Cumartesi: 09:00 - 14:00<br />
                Pazar: Kapalı
              </p>
            </div>

            {/* Sosyal Medya */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 16px 0'
              }}>
                🌐 Sosyal Medya
              </h3>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#1877f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  transition: 'transform 0.2s'
                }}>
                  f
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '20px',
                  transition: 'transform 0.2s'
                }}>
                  📷
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#0077b5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'transform 0.2s'
                }}>
                  in
                </a>
              </div>
            </div>
          </div>

          {/* İletişim Formu */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#2563eb',
              margin: '0 0 24px 0'
            }}>
              💬 Mesaj Gönder
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  E-posta *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Konu *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <option value="">Konu seçiniz</option>
                  <option value="genel">Genel Bilgi</option>
                  <option value="siparis">Sipariş Takibi</option>
                  <option value="iade">İade/Değişim</option>
                  <option value="oneri">Öneri/Şikayet</option>
                  <option value="diger">Diğer</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Mesaj *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    resize: 'vertical'
                  }}
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                📤 Mesaj Gönder
              </button>
            </form>
          </div>
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
              background: '#6b7280',
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
