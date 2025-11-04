"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { decodeJWT } from '../utils/jwtUtils';

interface User {
  _id: string;
  name: string;
  email: string;
}

export const useTeklifAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const decoded = decodeJWT(token);
        if (!decoded || decoded.exp < Date.now() / 1000) {
          localStorage.removeItem('token');
          router.push('/login');
          return;
        }

        setUser(decoded.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  };

  return { isAuthenticated, isLoading, user, logout };
};