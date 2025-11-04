"use client";
import React from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface TeklifHeaderProps {
  user: User | null;
  isMobile: boolean;
  onLogout: () => void;
}

export default function TeklifHeader({ user, isMobile, onLogout }: TeklifHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tekliflerim</h1>
            <p className="text-gray-600 mt-1">
              Size gelen teklifleri yönetin
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            )}
            
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}