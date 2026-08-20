"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LogEntry {
  _id: string;
  adminEmail: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: Record<string, unknown>;
  createdAt: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString('tr-TR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

function actionLabel(action: string) {
  const map: Record<string, string> = {
    submission_offer: '💰 Teklif verildi',
    submission_reject: '❌ Reddedildi',
    submission_list: '📋 İlana eklendi',
    submission_delivery_completed: '🚚 Teslimat tamamlandı',
    submission_confirm_payment: '💸 Ödeme onaylandı',
    submission_delete: '🗑️ Silindi',
    submission_delete_all: '🗑️ Tümü silindi',
    submission_updateStatus: '🔄 Durum güncellendi',
    submission_addOffer: '💰 Teklif verildi',
    submission_createListing: '📋 İlana eklendi',
  };
  return map[action] || action;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") || sessionStorage.getItem("adminLoggedIn");
    if (adminLoggedIn === "true") {
      setIsAdmin(true);
      setCheckingAuth(false);
      fetchLogs();
    } else {
      setIsAdmin(false);
      setCheckingAuth(false);
    }
  }, []);

  const fetchLogs = async () => {
    try {
      const adminToken = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
      const response = await fetch('/api/admin/audit-log', {
        headers: { 'Authorization': `Bearer ${adminToken}` }
      });
      const data = await response.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (error) {
      console.error('İşlem geçmişi yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Yükleniyor...</div>;
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <p>Bu sayfaya erişim için admin girişi gereklidir.</p>
        <Link href="/admin">Admin Paneline Dön</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>
          📜 İşlem Geçmişi
        </h1>
        <Link href="/admin" style={{
          background: '#f3f4f6', color: '#374151', padding: '8px 16px',
          borderRadius: '6px', textDecoration: 'none', fontSize: '14px'
        }}>
          ← Admin Paneline Dön
        </Link>
      </div>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : logs.length === 0 ? (
        <p style={{ color: '#6b7280' }}>Henüz kayıtlı bir işlem yok.</p>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Tarih</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Admin</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>İşlem</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Hedef ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Detay</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {formatDate(log.createdAt)}
                  </td>
                  <td style={{ padding: '12px' }}>{log.adminEmail}</td>
                  <td style={{ padding: '12px' }}>{actionLabel(log.action)}</td>
                  <td style={{ padding: '12px', fontFamily: 'monospace', fontSize: '12px', color: '#6b7280' }}>
                    {log.targetId}
                  </td>
                  <td style={{ padding: '12px', color: '#6b7280', fontSize: '13px', maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {log.details ? JSON.stringify(log.details) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
