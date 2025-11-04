"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Subscriber {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  emailVerified: boolean;
  createdAt: string;
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState({ current: 0, total: 0 });
  const [sendResult, setSendResult] = useState<{ success: number; failed: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    try {
      const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
      
      if (adminLoggedIn === "true") {
        setIsAdmin(true);
        setCheckingAuth(false);
        fetchSubscribers();
      } else {
        setIsAdmin(false);
        setCheckingAuth(false);
      }
    } catch (error) {
      console.error('Admin kontrol hatası:', error);
      setIsAdmin(false);
      setCheckingAuth(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter-subscribers');
      const data = await response.json();
      
      if (data.success) {
        setSubscribers(data.subscribers);
      }
    } catch (error) {
      console.error('Aboneler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNewsletter = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      alert('Lütfen konu ve mesaj alanlarını doldurun.');
      return;
    }

    if (!confirm(`${subscribers.length} aboneye mail göndermek üzeresiniz. Onaylıyor musunuz?`)) {
      return;
    }

    setIsSending(true);
    setSendProgress({ current: 0, total: subscribers.length });
    setSendResult(null);

    try {
      const response = await fetch('/api/admin/send-newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: emailSubject,
          message: emailMessage,
          subscribers: subscribers.map(s => ({ email: s.email, name: s.name }))
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSendResult({ success: data.sent, failed: data.failed });
        setEmailSubject("");
        setEmailMessage("");
      } else {
        alert('Mail gönderimi başarısız: ' + (data.error || 'Bilinmeyen hata'));
      }
    } catch (error) {
      console.error('Mail gönderimi hatası:', error);
      alert('Mail gönderimi sırasında hata oluştu.');
    } finally {
      setIsSending(false);
    }
  };

  if (checkingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Yetki kontrol ediliyor...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <h1 style={{ color: '#dc2626', fontSize: '24px', marginBottom: '16px' }}>Erişim Engellendi</h1>
          <p style={{ color: '#64748b', marginBottom: '24px' }}>Bu sayfaya erişim yetkiniz yok.</p>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>Anasayfaya Dön</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ color: "#2563eb", margin: 0, fontSize: "28px", fontWeight: "700" }}>
          📧 Newsletter Yönetimi
        </h1>
        <Link href="/admin" style={{ 
          background: "#64748b", 
          color: "white", 
          padding: "10px 20px", 
          borderRadius: "8px", 
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "14px"
        }}>
          ← Admin Paneli
        </Link>
      </div>

      {/* İstatistikler */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          borderRadius: "12px",
          padding: "20px",
          color: "white",
          boxShadow: "0 4px 6px rgba(37, 99, 235, 0.3)"
        }}>
          <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
            {subscribers.length}
          </div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>Toplam Abone</div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          borderRadius: "12px",
          padding: "20px",
          color: "white",
          boxShadow: "0 4px 6px rgba(5, 150, 105, 0.3)"
        }}>
          <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
            {subscribers.filter(s => s.emailVerified).length}
          </div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>Email Doğrulanmış</div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
          borderRadius: "12px",
          padding: "20px",
          color: "white",
          boxShadow: "0 4px 6px rgba(220, 38, 38, 0.3)"
        }}>
          <div style={{ fontSize: "36px", fontWeight: "700", marginBottom: "8px" }}>
            {subscribers.filter(s => !s.emailVerified).length}
          </div>
          <div style={{ fontSize: "14px", opacity: 0.9 }}>Email Doğrulanmamış</div>
        </div>
      </div>

      {/* Mail Gönderme Formu */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        marginBottom: "24px"
      }}>
        <h2 style={{ margin: "0 0 20px 0", color: "#374151", fontSize: "20px", fontWeight: "600" }}>
          ✉️ Toplu Mail Gönder
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            color: "#374151",
            fontWeight: "600",
            fontSize: "14px"
          }}>
            Konu
          </label>
          <input
            type="text"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            placeholder="Örn: Yeni Kampanya Duyurusu"
            disabled={isSending}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{
            display: "block",
            marginBottom: "8px",
            color: "#374151",
            fontWeight: "600",
            fontSize: "14px"
          }}>
            Mesaj
          </label>
          <textarea
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
            placeholder="Mail içeriğinizi buraya yazın..."
            disabled={isSending}
            rows={8}
            style={{
              width: "100%",
              padding: "12px 16px",
              border: "2px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "16px",
              boxSizing: "border-box",
              fontFamily: "inherit",
              resize: "vertical"
            }}
          />
        </div>

        <div style={{
          background: "#fef3c7",
          border: "1px solid #fcd34d",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "20px",
          fontSize: "13px",
          color: "#92400e"
        }}>
          ⚠️ <strong>Dikkat:</strong> Bu mail {subscribers.length} aboneye gönderilecektir. 
          {subscribers.filter(s => !s.emailVerified).length > 0 && (
            <> {subscribers.filter(s => !s.emailVerified).length} abone email doğrulaması yapmamış.</>
          )}
        </div>

        {sendResult && (
          <div style={{
            background: "#f0fdf4",
            border: "1px solid #86efac",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#166534"
          }}>
            ✅ <strong>Gönderim Tamamlandı:</strong> {sendResult.success} başarılı, {sendResult.failed} başarısız
          </div>
        )}

        <button
          onClick={handleSendNewsletter}
          disabled={isSending || !emailSubject.trim() || !emailMessage.trim()}
          style={{
            background: isSending ? "#9ca3af" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 24px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: isSending ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => {
            if (!isSending && emailSubject.trim() && emailMessage.trim()) {
              e.currentTarget.style.background = "#1d4ed8";
            }
          }}
          onMouseLeave={(e) => {
            if (!isSending) {
              e.currentTarget.style.background = "#2563eb";
            }
          }}
        >
          {isSending ? (
            <>
              <div style={{
                width: "16px",
                height: "16px",
                border: "2px solid white",
                borderTop: "2px solid transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite"
              }}></div>
              Gönderiliyor... ({sendProgress.current}/{sendProgress.total})
            </>
          ) : (
            <>📧 Toplu Mail Gönder ({subscribers.length} kişi)</>
          )}
        </button>
      </div>

      {/* Abone Listesi */}
      <div style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden"
      }}>
        <div style={{
          padding: "20px",
          borderBottom: "1px solid #e2e8f0",
          background: "#f8fafc"
        }}>
          <h2 style={{ margin: 0, color: "#374151", fontSize: "18px", fontWeight: "600" }}>
            Newsletter Aboneleri ({subscribers.length})
          </h2>
        </div>

        {loading ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
            Yükleniyor...
          </div>
        ) : subscribers.length === 0 ? (
          <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
            <h3>Henüz abone yok</h3>
            <p>Kullanıcılar kayıt olurken newsletter checkbox'ını işaretledikçe burada görünecek.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px"
            }}>
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Ad Soyad</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Email</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Telefon</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Email Durumu</th>
                  <th style={{ padding: "12px", textAlign: "left", borderBottom: "1px solid #e2e8f0" }}>Kayıt Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr key={subscriber._id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px" }}>{subscriber.name}</td>
                    <td style={{ padding: "12px" }}>{subscriber.email}</td>
                    <td style={{ padding: "12px" }}>{subscriber.phone || "-"}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{
                        background: subscriber.emailVerified ? "#059669" : "#dc2626",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px"
                      }}>
                        {subscriber.emailVerified ? "✅ Doğrulandı" : "❌ Doğrulanmadı"}
                      </span>
                    </td>
                    <td style={{ padding: "12px" }}>
                      {new Date(subscriber.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

