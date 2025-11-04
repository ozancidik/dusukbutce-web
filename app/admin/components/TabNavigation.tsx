"use client";
import React from 'react';

interface TabNavigationProps {
  activeTab: 'temel' | 'teknik' | 'teslimat';
  setActiveTab: (tab: 'temel' | 'teknik' | 'teslimat') => void;
  hasDeliveryInfo: boolean;
  isMobile: boolean;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
  activeTab, 
  setActiveTab, 
  hasDeliveryInfo, 
  isMobile 
}) => {
  const tabs = [
    { id: 'temel' as const, label: '📋 Temel Bilgiler' },
    { id: 'teknik' as const, label: '⚙️ Teknik Özellikler' },
    ...(hasDeliveryInfo ? [{ id: 'teslimat' as const, label: '🚚 Teslimat Bilgileri' }] : [])
  ];

  return (
    <div style={{
      display: 'flex',
      borderBottom: '2px solid #e5e7eb',
      marginBottom: '24px'
    }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            background: activeTab === tab.id ? '#3b82f6' : 'transparent',
            color: activeTab === tab.id ? 'white' : '#6b7280',
            border: 'none',
            padding: '12px 24px',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: '600',
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
