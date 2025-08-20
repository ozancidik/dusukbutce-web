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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        // Form'u temizle
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Bir hata oluştu. Lütfen tekrar deneyiniz.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Bağlantı hatası. Lütfen tekrar deneyiniz.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
                Atakent Mah. Yasemin Sokağı No:4<br />
                34760 Ümraniye/İstanbul
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
                +90 (530) 128 91 37
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
                <a href="https://www.facebook.com/dusukbutce/" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#1877f2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}>
                  <img 
                    src="/facebook-svgrepo-com.svg" 
                    alt="Facebook" 
                    style={{ 
                      width: '28px', 
                      height: '28px'
                    }} 
                  />
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
                  transition: 'transform 0.2s'
                }}>
                  <img 
                    src="/Instagram_logo_2022.svg (1).webp" 
                    alt="Instagram" 
                    style={{ 
                      width: '28px', 
                      height: '28px'
                    }} 
                  />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#ff0000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  transition: 'transform 0.2s'
                }}>
                  <img 
                    src="/youtube-svgrepo-com.svg" 
                    alt="YouTube" 
                    style={{ 
                      width: '32px', 
                      height: '32px'
                    }} 
                  />
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
                disabled={isSubmitting}
                style={{
                  background: isSubmitting ? '#9ca3af' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
              >
                {isSubmitting ? '📤 Gönderiliyor...' : '📤 Mesaj Gönder'}
              </button>

              {/* Status Messages */}
              {submitStatus.type && (
                <>
                  {/* Overlay */}
                  <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                  }}>
                    {/* Modal */}
                    <div style={{
                      background: 'white',
                      borderRadius: '20px',
                      padding: '40px',
                      maxWidth: '500px',
                      width: '100%',
                      textAlign: 'center',
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      animation: 'slideIn 0.3s ease-out',
                      position: 'relative'
                    }}>
                      {/* Close Button */}
                      <button
                        onClick={() => setSubmitStatus({ type: null, message: '' })}
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          background: 'none',
                          border: 'none',
                          fontSize: '24px',
                          cursor: 'pointer',
                          color: '#9ca3af',
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f3f4f6';
                          e.currentTarget.style.color = '#6b7280';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                          e.currentTarget.style.color = '#9ca3af';
                        }}
                      >
                        ×
                      </button>

                      {/* Icon */}
                      <div style={{
                        fontSize: '64px',
                        marginBottom: '24px',
                        animation: 'bounceIn 0.6s ease-out'
                      }}>
                        {submitStatus.type === 'success' ? '🎉' : '⚠️'}
                      </div>

                      {/* Title */}
                      <h3 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        margin: '0 0 16px 0',
                        color: submitStatus.type === 'success' ? '#059669' : '#dc2626'
                      }}>
                        {submitStatus.type === 'success' ? 'Mesaj Gönderildi!' : 'Hata Oluştu'}
                      </h3>

                      {/* Message */}
                      <p style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        margin: '0 0 32px 0',
                        lineHeight: '1.6'
                      }}>
                        {submitStatus.message}
                      </p>

                      {/* Action Button */}
                      <button
                        onClick={() => setSubmitStatus({ type: null, message: '' })}
                        style={{
                          background: submitStatus.type === 'success' 
                            ? 'linear-gradient(135deg, #059669 0%, #10b981 100%)'
                            : 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '16px 32px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px 0 rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(0, 0, 0, 0.1)';
                        }}
                      >
                        {submitStatus.type === 'success' ? 'Tamam' : 'Tekrar Dene'}
                      </button>
                    </div>
                  </div>

                  {/* CSS Animations */}
                  <style jsx>{`
                    @keyframes slideIn {
                      from {
                        opacity: 0;
                        transform: scale(0.9) translateY(-20px);
                      }
                      to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                      }
                    }
                    
                    @keyframes bounceIn {
                      0% {
                        opacity: 0;
                        transform: scale(0.3);
                      }
                      50% {
                        opacity: 1;
                        transform: scale(1.05);
                      }
                      70% {
                        transform: scale(0.9);
                      }
                      100% {
                        opacity: 1;
                        transform: scale(1);
                      }
                    }
                  `}</style>
                </>
              )}
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
