"use client";
import React from 'react';
import AdminMainHeader from './AdminMainHeader';
import ManagementToolbar from './ManagementToolbar';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from './LoadingSpinner';
import SubmissionList from './SubmissionList';
import ActionModal from './ActionModal';
import DeleteModal from './DeleteModal';
import SubmissionDetailModal from './SubmissionDetailModal';

interface AdminDashboardProps {
  isMobile: boolean;
  submissions: any[];
  loading: boolean;
  error: string | null;
  selectedSubmission: any;
  setSelectedSubmission: (submission: any) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  modalType: string | null;
  setModalType: (type: any) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  deleteModalType: string | null;
  setDeleteModalType: (type: any) => void;
  deleteTargetId: string | null;
  setDeleteTargetId: (id: string | null) => void;
  showToast: boolean;
  setShowToast: (show: boolean) => void;
  toastMessage: string;
  setToastMessage: (message: string) => void;
  toastType: string;
  setToastType: (type: any) => void;
  isDeletingAll: boolean;
  setIsDeletingAll: (deleting: boolean) => void;
  selectedCategory: string;
  isDeleting: boolean;
  setIsDeleting: (deleting: boolean) => void;
  setSelectedCategory: (category: string) => void;
  showDetailModal: boolean;
  setShowDetailModal: (show: boolean) => void;
  detailSubmission: any;
  setDetailSubmission: (submission: any) => void;
  onActionSubmit: (action: string, submissionId: string, notes?: string) => Promise<void>;
  onDeleteAll: () => Promise<void>;
  onDeleteSingle: (submissionId: string) => Promise<void>;
  onViewDetails: (submission: any) => void;
}

export default function AdminDashboard({
  isMobile,
  submissions,
  loading,
  error,
  selectedSubmission,
  setSelectedSubmission,
  showModal,
  setShowModal,
  modalType,
  setModalType,
  showDeleteModal,
  setShowDeleteModal,
  deleteModalType,
  setDeleteModalType,
  deleteTargetId,
  setDeleteTargetId,
  showToast,
  setShowToast,
  toastMessage,
  setToastMessage,
  toastType,
  setToastType,
  isDeletingAll,
  setIsDeletingAll,
  selectedCategory,
  setSelectedCategory,
  showDetailModal,
  setShowDetailModal,
  detailSubmission,
  setDetailSubmission,
  onActionSubmit,
  isDeleting,
  setIsDeleting,
  onDeleteAll,
  onDeleteSingle,
  onViewDetails
}: AdminDashboardProps) {
  const filteredSubmissions = selectedCategory === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.category === selectedCategory);

  return (
    <div style={{
      background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 75%, #64748b 100%)',
      padding: isMobile ? '20px 10px' : '40px 20px',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: isMobile ? '100%' : '1200px',
        margin: '0 auto'
      }}>
        <AdminMainHeader
          isMobile={isMobile}
          filteredSubmissions={filteredSubmissions}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onDeleteAll={onDeleteAll}
          isDeletingAll={isDeletingAll}
        />
        
        <ManagementToolbar
          isMobile={isMobile}
          submissionCount={submissions.length}
          onDeleteAll={onDeleteAll}
          onLogout={() => window.location.href = '/'}
        />
        
        <CategoryFilter
          isMobile={isMobile}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          submissionCount={submissions.length}
        />
        
        {loading && <LoadingSpinner isMobile={isMobile} />}
        
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            color: '#dc2626'
          }}>
            {error}
          </div>
        )}
        
        <SubmissionList
          isMobile={isMobile}
          submissions={filteredSubmissions}
          loading={loading}
          error={error}
          selectedSubmission={selectedSubmission}
          setSelectedSubmission={setSelectedSubmission}
          showModal={showModal}
          setShowModal={setShowModal}
          modalType={modalType}
          setModalType={setModalType}
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          deleteModalType={deleteModalType}
          setDeleteModalType={setDeleteModalType}
          deleteTargetId={deleteTargetId}
          setDeleteTargetId={setDeleteTargetId}
          isDeleting={isDeleting}
        />
        
        {showModal && selectedSubmission && (
          <ActionModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setSelectedSubmission(null);
              setModalType('');
            }}
            submission={selectedSubmission}
            onActionSubmit={onActionSubmit}
          />
        )}
        
        {showDeleteModal && (
          <DeleteModal
            showModal={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setDeleteTargetId(null);
              setDeleteModalType(null);
            }}
            onConfirm={() => {
              if (deleteModalType === 'all') {
                onDeleteAll();
              } else if (deleteTargetId) {
                onDeleteSingle(deleteTargetId);
              }
              setShowDeleteModal(false);
              setDeleteTargetId(null);
              setDeleteModalType(null);
            }}
            isMobile={isMobile}
            deleteModalType={deleteModalType}
            submissionTitle={deleteTargetId ? submissions.find(s => s._id === deleteTargetId)?.brand : undefined}
          />
        )}
        
        {showDetailModal && detailSubmission && (
          <SubmissionDetailModal
            isOpen={showDetailModal}
            onClose={() => {
              setShowDetailModal(false);
              setDetailSubmission(null);
            }}
            submission={detailSubmission}
          />
        )}
        
        {showToast && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: toastType === 'success' ? '#059669' : '#dc2626',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out'
          }}>
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
