import { useState } from 'react';
import { Submission, ModalType, DeleteModalType, ToastType } from '../types';

export function useAdminState() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalType, setDeleteModalType] = useState<DeleteModalType>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailSubmission, setDetailSubmission] = useState<Submission | null>(null);
  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState<Submission['userId'] | null>(null);

  return {
    // Data
    submissions,
    setSubmissions,
    loading,
    setLoading,
    error,
    setError,
    
    // Auth
    isAuthenticated,
    setIsAuthenticated,
    
    // UI State
    isMobile,
    setIsMobile,
    selectedSubmission,
    setSelectedSubmission,
    
    // Modals
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
    
    // Toast
    showToast,
    setShowToast,
    toastMessage,
    setToastMessage,
    toastType,
    setToastType,
    
    // Actions
    isDeletingAll,
    setIsDeletingAll,
    selectedCategory,
    setSelectedCategory,
    
    // Detail Modal
    showDetailModal,
    setShowDetailModal,
    detailSubmission,
    setDetailSubmission,
    
    // User Info Modal
    showUserInfoModal,
    setShowUserInfoModal,
    selectedUserInfo,
    setSelectedUserInfo,
  };
}
