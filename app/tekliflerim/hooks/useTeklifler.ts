"use client";
import { useState, useEffect } from 'react';
import { Teklif } from '../types/Teklif';

export const useTeklifler = () => {
  const [teklifler, setTeklifler] = useState<Teklif[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeklifler = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const response = await fetch('/api/teklifler', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Teklifler yüklenemedi');
      }

      const data = await response.json();
      setTeklifler(data.teklifler || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
    } finally {
      setLoading(false);
    }
  };

  const updateTeklif = async (teklifId: string, updates: Partial<Teklif>) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/teklifler/${teklifId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        throw new Error('Teklif güncellenemedi');
      }

      await fetchTeklifler();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Güncelleme hatası');
    }
  };

  const deleteTeklif = async (teklifId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/teklifler/${teklifId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Teklif silinemedi');
      }

      await fetchTeklifler();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Silme hatası');
    }
  };

  useEffect(() => {
    fetchTeklifler();
  }, []);

  return {
    teklifler,
    loading,
    error,
    fetchTeklifler,
    updateTeklif,
    deleteTeklif
  };
};