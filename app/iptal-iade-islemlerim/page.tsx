'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Submission } from '../tekliflerim/utils/types';
import { formatDate, getStatusInfo } from '../tekliflerim/utils/helpers';

interface UserInfo {
  id: string;
  email: string;
  name: string;
  phone: string;
  birthDate: string;
  isAdmin: boolean;
}

// Bir talep, admin henüz kabul/ilan/ödeme aşamasına geçirmediyse (pending/
// offered) müşteri tarafından iptal talebi olarak gönderilebilir. Bu liste
// app/api/submissions/[id]/cancel/route.ts içindeki CANCELLABLE_STATUSES ile
// aynı olmalı.
const CANCELLABLE_STATUSES = ['pending', 'offered'];
const CANCELLATION_STATUSES = ['cancel_requested', 'cancelled'];

export default function IptalIadeIslemlerimPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState<Submission | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchSubmissions = async () => {
    try {
      setSubmissionsLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/submissions', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await response.json();
      if (response.ok) {
        setSubmissions(data.submissions || []);
      }
    } catch (error) {
      console.error('İptal/iade: talepler alınamadı', error);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  useEffect(() => {
    const loadUserData = () => {
      try {
        const userLoggedIn = localStorage.getItem('userLoggedIn');

        if (userLoggedIn !== 'true') {
          router.push('/login');
          return;
        }

        const userData = {
          id: localStorage.getItem('userId') || sessionStorage.getItem('userId'),
          email: localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail'),
          name: (() => {
            const name = localStorage.getItem('userName') || sessionStorage.getItem('userName');
            if (name && name.includes('Ä±')) {
              return decodeURIComponent(escape(name));
            }
            return name;
          })(),
          phone: localStorage.getItem('userPhone') || sessionStorage.getItem('userPhone') || '',
          birthDate: localStorage.getItem('userBirthDate') || sessionStorage.getItem('userBirthDate') || '',
          isAdmin: localStorage.getItem('adminLoggedIn') === 'true' || sessionStorage.getItem('adminLoggedIn') === 'true'
        };

        if (!userData.id || !userData.email) {
          localStorage.clear();
          sessionStorage.clear();
          window.location.href = '/login';
          return;
        }

        setUserInfo(userData as UserInfo);
        fetchSubmissions();
      } catch (error) {
        console.error('Error loading user data:', error);
        router.push('/login');
        return;
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [router]);

  const openCancelModal = (submission: Submission) => {
    setCancelTarget(submission);
    setCancelReason('');
    setMessage(null);
  };

  const submitCancelRequest = async () => {
    if (!cancelTarget) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/submissions/${cancelTarget._id}/cancel`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ reason: cancelReason.trim() }),
      });
      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: data.message || 'İptal talebiniz alındı' });
        setCancelTarget(null);
        await fetchSubmissions();
      } else {
        setMessage({ type: 'error', text: data.message || 'İptal talebi gönderilemedi' });
      }
    } catch (error) {
      console.error('İptal talebi hatası:', error);
      setMessage({ type: 'error', text: 'Bir hata oluştu, lütfen tekrar deneyin' });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{ textAlign: 'center', color: '#64748b' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div>Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return null;
  }

  const cancellableSubmissions = submissions.filter(
    (s) => CANCELLABLE_STATUSES.includes(s.status) && s.payment?.status !== 'paid'
  );
  const cancellationHistory = submissions.filter((s) => CANCELLATION_STATUSES.includes(s.status));
  const isEmpty = cancellableSubmissions.length === 0 && cancellationHistory.length === 0;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      padding: isMobile ? '12px' : '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: isMobile ? '12px 12px 0' : '20px 20px 0',
        marginBottom: isMobile ? '16px' : '20px'
      }}>
        <div style={{ fontSize: isMobile ? '12px' : '16px', color: '#64748b' }}>
          <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>Anasayfa</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <Link href="/profile" style={{ color: '#2563eb', textDecoration: 'none' }}>Profil</Link>
          <span style={{ margin: '0 8px' }}>›</span>
          <span>İptal ve İade İşlemlerim</span>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '0 12px 20px' : '0 20px 20px' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            padding: isMobile ? '20px' : '32px',
            color: 'white'
          }}>
            <h1 style={{ margin: 0, fontSize: isMobile ? '24px' : '32px', fontWeight: '700' }}>
              🔄 İptal ve İade İşlemlerim
            </h1>
            <p style={{ margin: '8px 0 0 0', fontSize: isMobile ? '14px' : '16px', opacity: 0.9 }}>
              Satış taleplerinizin iptalini isteyin ve durumunu takip edin
            </p>
          </div>

          <div style={{ padding: isMobile ? '20px' : '32px' }}>
            {message && (
              <div style={{
                background: message.type === 'success' ? '#ecfdf5' : '#fef2f2',
                border: `1px solid ${message.type === 'success' ? '#10b981' : '#ef4444'}`,
                color: message.type === 'success' ? '#065f46' : '#991b1b',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '20px',
                fontSize: isMobile ? '14px' : '15px'
              }}>
                {message.text}
              </div>
            )}

            {submissionsLoading ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Talepler yükleniyor...</div>
            ) : isEmpty ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🔄</div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: isMobile ? '18px' : '24px', color: '#1e293b' }}>
                  Henüz iptal işleminiz yok
                </h3>
                <p style={{ margin: '0 0 24px 0', fontSize: isMobile ? '14px' : '16px' }}>
                  İptal talepleriniz burada görünecek
                </p>
                <Link href="/tekliflerim" style={{ textDecoration: 'none' }}>
                  <button style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: isMobile ? '12px 24px' : '16px 32px',
                    fontSize: isMobile ? '14px' : '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}>
                    💰 Tekliflerimi Görüntüle
                  </button>
                </Link>
              </div>
            ) : (
              <>
                {cancellableSubmissions.length > 0 && (
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: isMobile ? '16px' : '18px', color: '#1e293b', marginBottom: '16px' }}>
                      İptal Edilebilir Taleplerim
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cancellableSubmissions.map((submission) => {
                        const status = getStatusInfo(submission.status);
                        return (
                          <div key={submission._id} style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '12px',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}>
                            <div>
                              <div style={{ fontWeight: 700, color: '#1e293b' }}>
                                {submission.brand} {submission.model}
                              </div>
                              <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                                {submission.submissionNumber && <span>{submission.submissionNumber} · </span>}
                                <span style={{ color: status.color }}>{status.icon} {status.text}</span>
                                {' · '}{formatDate(submission.createdAt)}
                              </div>
                            </div>
                            <button
                              onClick={() => openCancelModal(submission)}
                              style={{
                                background: '#fef2f2',
                                color: '#dc2626',
                                border: '2px solid #dc2626',
                                borderRadius: '10px',
                                padding: '10px 18px',
                                fontSize: '14px',
                                fontWeight: 600,
                                cursor: 'pointer',
                              }}
                            >
                              İptal Talebi Gönder
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {cancellationHistory.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: isMobile ? '16px' : '18px', color: '#1e293b', marginBottom: '16px' }}>
                      İptal Durumum
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {cancellationHistory.map((submission) => {
                        const status = getStatusInfo(submission.status);
                        return (
                          <div key={submission._id} style={{
                            border: '1px solid #e2e8f0',
                            borderRadius: '12px',
                            padding: '16px',
                            background: '#f8fafc'
                          }}>
                            <div style={{ fontWeight: 700, color: '#1e293b' }}>
                              {submission.brand} {submission.model}
                            </div>
                            <div style={{ fontSize: '13px', color: status.color, marginTop: '4px', fontWeight: 600 }}>
                              {status.icon} {status.text}
                            </div>
                            {submission.cancellation?.reason && (
                              <div style={{ fontSize: '13px', color: '#475569', marginTop: '8px' }}>
                                <strong>Sizin sebebiniz:</strong> {submission.cancellation.reason}
                              </div>
                            )}
                            {submission.cancellation?.adminNote && (
                              <div style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                                <strong>Not:</strong> {submission.cancellation.adminNote}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {cancelTarget && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px'
        }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '24px', maxWidth: '480px', width: '100%' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>İptal Talebi Gönder</h3>
            <p style={{ margin: '0 0 16px 0', color: '#64748b', fontSize: '14px' }}>
              <strong>{cancelTarget.brand} {cancelTarget.model}</strong> için gönderdiğiniz talebin iptalini istiyorsunuz. Talebiniz admin tarafından değerlendirilecek.
            </p>
            <textarea
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              rows={4}
              placeholder="İptal sebebinizi yazabilirsiniz (opsiyonel)"
              style={{
                width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '10px',
                fontSize: '14px', resize: 'vertical', marginBottom: '16px'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setCancelTarget(null)}
                disabled={submitting}
                style={{
                  background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '10px',
                  padding: '10px 18px', fontSize: '14px', fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer'
                }}
              >
                Vazgeç
              </button>
              <button
                onClick={submitCancelRequest}
                disabled={submitting}
                style={{
                  background: '#dc2626', color: 'white', border: 'none', borderRadius: '10px',
                  padding: '10px 18px', fontSize: '14px', fontWeight: 600,
                  cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1
                }}
              >
                {submitting ? 'Gönderiliyor...' : 'İptal Talebini Gönder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
