'use client';

import { useState, useEffect } from 'react';
import { Submission } from './utils/types';
import { decodeJWT } from './utils/jwtHelper';
import { formatDate, formatPrice, getStatusInfo, getStatusText } from './utils/helpers';
import PageHeader from './components/PageHeader';
import EmptyState from './components/EmptyState';
import SubmissionCardFull from './components/SubmissionCardFull';
import ActionModal from './components/modals/ActionModal';
import DeleteModal from './components/modals/DeleteModal';
import ReofferModal from './components/modals/ReofferModal';
import SuccessModal from './components/modals/SuccessModal';
import RejectModal from './components/modals/RejectModal';
import GeneralPopup from './components/modals/GeneralPopup';

export default function TekliflerimPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [actionType, setActionType] = useState<'accept' | 'reject' | 'delete' | null>(null);
  const [actionNote, setActionNote] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'kargo' | 'evden' | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showReofferModal, setShowReofferModal] = useState(false);
  const [reofferNote, setReofferNote] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [currentSubmissionId, setCurrentSubmissionId] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    fetchSubmissions();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchSubmissions = async () => {
    try {
      // Get userId from localStorage token
      let userId = null;
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = decodeJWT(token);
          userId = decoded?.userId;
          console.log('🔍 Token decoded userId:', userId);
        }
      } catch (error) {
        console.log('No valid token found');
      }

      const url = userId ? `/api/submissions?userId=${userId}` : '/api/submissions';
      console.log('🔍 Fetching submissions from:', url);
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('🔍 API response:', data);
      console.log('🔍 Submissions count:', data.submissions?.length || 0);
      
      if (response.ok) {
        const submissions = data.submissions || [];
        console.log('🔍 Submissions with statuses:', submissions.map((s: Submission) => ({ id: s._id, status: s.status })));
        setSubmissions(submissions);
      } else {
        console.error('Veri çekme hatası:', data.error);
      }
    } catch (error) {
      console.error('API hatası:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleAction = (submission: Submission, type: 'accept' | 'reject' | 'delete') => {
    setSelectedSubmission(submission);
    setActionType(type);
    setActionNote('');
    if (type === 'delete') {
      setShowDeleteModal(true);
    } else {
      setShowActionModal(true);
    }
  };

  const handleSubmitAction = async () => {
    if (!selectedSubmission || !actionType) return;

    try {
      const response = await fetch(`/api/submissions/${selectedSubmission._id}/response`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: actionType === 'accept' ? 'accepted' : 'rejected',
          note: actionNote,
          reason: actionType === 'reject' ? actionNote : undefined,
        }),
      });

      const result = await response.json();
      console.log('📦 API Response:', result);
      console.log('📋 Submission status from API:', result.submission?.status);

      if (result.success) {
        // Update local state with API response
        const newStatus = result.submission?.status || (actionType === 'accept' ? 'customer_accepted' : 'customer_rejected');
        console.log('✅ Setting status to:', newStatus);
        
        setSubmissions(prev => {
          const updated = prev.map(sub => 
            sub._id === selectedSubmission._id 
              ? { 
                  ...sub, 
                  ...(result.submission || {}),
                  customerResponse: result.submission?.customerResponse || {
                    action: actionType === 'accept' ? 'accepted' : 'rejected',
                    note: actionNote,
                    reason: actionType === 'reject' ? actionNote : undefined,
                    date: new Date().toISOString(),
                  },
                  status: newStatus
                }
              : sub
          );
          console.log('🔄 Updated submissions:', updated.find(s => s._id === selectedSubmission._id)?.status);
          return updated;
        });
        
        setShowActionModal(false);
        setSelectedSubmission(null);
        setActionType(null);
        setActionNote('');
        
        // Submission listesini yeniden yükle (status'un doğru geldiğinden emin olmak için)
        setTimeout(() => {
          fetchSubmissions();
        }, 500);
        
        // Show success message and redirect
        if (actionType === 'accept') {
          // Müşteri teklifi kabul ettiğinde teslimat seçenekleri modalını aç
          setCurrentSubmissionId(selectedSubmission._id);
          setShowSuccessModal(true);
        } else {
          setShowRejectModal(true);
        }
      } else {
        setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage(result.message);
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupType('error');
      setPopupTitle('Hata Oluştu');
      setPopupMessage('Bir hata oluştu!');
      setShowPopup(true);
    }
  };

  const handleDeleteSubmission = async () => {
    if (!selectedSubmission) return;

    try {
      // Get token for authorization
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/submissions?id=${selectedSubmission._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      const result = await response.json();

      if (result.success) {
        // Remove from local state
        setSubmissions(prev => prev.filter(sub => sub._id !== selectedSubmission._id));
        
        setShowDeleteModal(false);
        setSelectedSubmission(null);
        setActionType(null);
        
        setPopupType('success');
        setPopupTitle('Başarılı');
        setPopupMessage('Teklif başarıyla silindi!');
        setShowPopup(true);
      } else {
        setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage(result.message);
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setPopupType('error');
      setPopupTitle('Hata Oluştu');
      setPopupMessage('Bir hata oluştu!');
      setShowPopup(true);
    }
  };

  const handleReofferSubmission = async () => {
    if (!selectedSubmission || !reofferNote.trim()) {
      setPopupType('error');
      setPopupTitle('Hata');
      setPopupMessage('Lütfen açıklama/talep alanını doldurun!');
      setShowPopup(true);
      return;
    }

    try {
      // Get token for authorization
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/submissions/${selectedSubmission._id}/reoffer`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          reofferNote: reofferNote.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Update local state - reset status to pending
        setSubmissions(prev => 
          prev.map(sub => 
            sub._id === selectedSubmission._id 
              ? { 
                  ...sub, 
                  status: 'pending',
                  rejectionReason: undefined,
                  rejectedAt: undefined,
                  customerResponse: undefined,
                  adminNotes: `YENİDEN TEKLİF TALEBİ: ${reofferNote.trim()}`
                }
              : sub
          )
        );
        
        setShowReofferModal(false);
        setSelectedSubmission(null);
        setReofferNote('');
        
        setPopupType('success');
        setPopupTitle('Başarılı');
        setPopupMessage('Yeniden teklif talebiniz gönderildi. En kısa sürede talebiniz değerlendirilecektir.');
        setShowPopup(true);
      } else {
        setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage(result.message || 'Bilinmeyen hata!');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Reoffer Error:', error);
      setPopupType('error');
      setPopupTitle('Hata Oluştu');
      setPopupMessage(error instanceof Error ? error.message : 'Bir hata oluştu!');
      setShowPopup(true);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        padding: isMobile ? '20px' : '40px', 
        textAlign: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
      }}>
        <h2 style={{
          fontSize: isMobile ? '20px' : '24px',
          color: '#374151'
        }}>
          Yükleniyor...
        </h2>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: isMobile ? '20px 12px' : '40px', 
      maxWidth: isMobile ? '100%' : '1200px', 
      margin: '0 auto', 
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      minHeight: '100vh'
    }}>
      <PageHeader submissions={submissions} isMobile={isMobile} />

      {submissions.length === 0 ? (
        <EmptyState isMobile={isMobile} />
      ) : (
        <div style={{
          display: 'grid',
          gap: isMobile ? '16px' : '24px'
        }}>
          {submissions.map((submission) => (
            <SubmissionCardFull
              key={submission._id}
              submission={submission}
              isMobile={isMobile}
              onAccept={(sub) => handleAction(sub, 'accept')}
              onReject={(sub) => handleAction(sub, 'reject')}
              onDelete={(sub) => handleAction(sub, 'delete')}
              onReoffer={(sub) => {
                setSelectedSubmission(sub);
                setReofferNote('');
                setShowReofferModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <ActionModal
        show={showActionModal}
        submission={selectedSubmission}
        actionType={actionType}
        actionNote={actionNote}
        isMobile={isMobile}
        onClose={() => {
          setShowActionModal(false);
          setSelectedSubmission(null);
          setActionType(null);
          setActionNote('');
        }}
        onSubmit={handleSubmitAction}
        onNoteChange={setActionNote}
      />

      <DeleteModal
        show={showDeleteModal}
        submission={selectedSubmission}
        isMobile={isMobile}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedSubmission(null);
          setActionType(null);
        }}
        onConfirm={handleDeleteSubmission}
      />

      <ReofferModal
        show={showReofferModal}
        submission={selectedSubmission}
        reofferNote={reofferNote}
        isMobile={isMobile}
        onClose={() => {
          setShowReofferModal(false);
          setSelectedSubmission(null);
          setReofferNote('');
        }}
        onNoteChange={setReofferNote}
        onSubmit={handleReofferSubmission}
      />

      <SuccessModal
        show={showSuccessModal}
        isMobile={isMobile}
        deliveryMethod={deliveryMethod}
        currentSubmissionId={currentSubmissionId}
        onClose={() => {
          setShowSuccessModal(false);
          setDeliveryMethod(null);
        }}
        onDeliveryChange={setDeliveryMethod}
        onConfirm={() => {
          if (deliveryMethod) {
            window.location.href = `/teklif-teslimat?submissionId=${currentSubmissionId}&status=accepted`;
          }
        }}
      />

      <RejectModal
        show={showRejectModal}
        isMobile={isMobile}
        onClose={() => setShowRejectModal(false)}
      />

      <GeneralPopup
        show={showPopup}
        type={popupType}
        title={popupTitle}
        message={popupMessage}
        isMobile={isMobile}
        onClose={() => setShowPopup(false)}
      />
    </div>
  );
} 