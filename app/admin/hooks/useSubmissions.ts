import { useState } from 'react';
import { Submission } from '../types/Submission';

export const useSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin/submissions?limit=10');
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmissions(data.submissions || []);
      } else {
        const errorMessage = data.message || data.error || 'Bilinmeyen hata';
        console.error('Veri çekme hatası:', errorMessage);
        setError(errorMessage);
        setSubmissions([]);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Bağlantı hatası';
      console.error('API hatası:', errorMessage);
      setError(errorMessage);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubmission = async (submissionId: string) => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'deleteOne', submissionId }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmissions(prev => prev.filter(sub => sub._id !== submissionId));
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'İlan silinirken bir hata oluştu' };
      }
    } catch (error) {
      console.error('Error deleting submission:', error);
      return { success: false, message: 'Bağlantı hatası oluştu' };
    }
  };

  const deleteAllSubmissions = async () => {
    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'deleteAll' }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmissions([]);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'İlanlar silinirken bir hata oluştu' };
      }
    } catch (error) {
      console.error('Error deleting all submissions:', error);
      return { success: false, message: 'Bağlantı hatası oluştu' };
    }
  };

  return {
    submissions,
    loading,
    error,
    fetchSubmissions,
    deleteSubmission,
    deleteAllSubmissions,
    setSubmissions
  };
};
