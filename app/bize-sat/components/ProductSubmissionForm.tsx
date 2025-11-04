"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';
import SubmissionPopup from '../../../components/SubmissionPopup';
import { ProductFormConfig } from '../types';
import { 
  saveFormData, 
  loadFormData, 
  clearFormData,
  handleImageUpload as uploadImages,
  removeImage as deleteImage
} from '../utils/formHelpers';

interface Props {
  config: ProductFormConfig;
}

export default function ProductSubmissionForm({ config }: Props) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [popupTitle, setPopupTitle] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [showImageSizeWarning, setShowImageSizeWarning] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>(config.defaultFormData);
  const [helpModals, setHelpModals] = useState<Record<string, boolean>>({});

  const storageKey = `${config.productType}FormData`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Load saved form data
    const savedData = loadFormData(storageKey);
    if (savedData) {
      setFormData(savedData);
      console.log(`📝 Kaydedilmiş ${config.productType} form verileri yüklendi`);
    }
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [storageKey, config.productType]);

  const handleInputChange = (field: string, value: any) => {
    const newData = {
      ...formData,
      [field]: value
    };
    setFormData(newData);
    saveFormData(storageKey, newData);
  };

  const handleImageUploadWrapper = (e: React.ChangeEvent<HTMLInputElement>) => {
    uploadImages(
      e.target.files,
      formData.images || [],
      (images) => {
        const newData = { ...formData, images };
        setFormData(newData);
        saveFormData(storageKey, newData);
      },
      (error) => {
        setPopupType('error');
        setPopupTitle('Resim Yükleme Hatası');
        setPopupMessage(error);
        setShowPopup(true);
      }
    );
  };

  const removeImageHandler = (index: number) => {
    const newImages = deleteImage(index, formData.images || []);
    const newData = { ...formData, images: newImages };
    setFormData(newData);
    saveFormData(storageKey, newData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...formData,
          category: config.category
        }),
      });

      if (response.ok) {
        setPopupType('success');
        setPopupTitle('Teklif Başarıyla Gönderildi!');
        setPopupMessage('Ürününüz için teklif talebiniz alındı. En kısa sürede size dönüş yapacağız.');
        setShowPopup(true);
        setFormData(config.defaultFormData);
        clearFormData(storageKey);
      } else {
        const errorData = await response.json();
        setPopupType('error');
        setPopupTitle('Hata Oluştu');
        setPopupMessage(errorData.error || 'Teklif talebiniz gönderilemedi. Lütfen tekrar deneyin.');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setPopupType('error');
      setPopupTitle('Bağlantı Hatası');
      setPopupMessage('Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.');
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleHelpModal = (fieldName: string) => {
    setHelpModals(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const renderField = (field: any) => {
    // Check dependencies
    if (field.dependsOn) {
      const dependencyValue = formData[field.dependsOn.field];
      if (dependencyValue !== field.dependsOn.value) {
        return null;
      }
    }

    const commonStyles = {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s',
      boxSizing: 'border-box' as const
    };

    const labelStyle = {
      display: 'block',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '6px'
    };

    switch (field.type) {
      case 'select':
        return (
          <div key={field.name} style={{ gridColumn: field.gridColumn === 'full' ? '1 / -1' : 'auto' }}>
            <label style={labelStyle}>
              {field.label} {field.required && '*'}
            </label>
            <select
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              style={commonStyles}
              onFocus={(e) => (e.target as HTMLSelectElement).style.borderColor = '#3b82f6'}
              onBlur={(e) => (e.target as HTMLSelectElement).style.borderColor = '#d1d5db'}
            >
              <option value="">{field.placeholder || `${field.label} seçin`}</option>
              {field.options?.map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>
              {field.label} {field.required && '*'}
            </label>
            <textarea
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              rows={4}
              style={{ ...commonStyles, resize: 'vertical' as const }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} style={{
            gridColumn: field.gridColumn === 'full' ? '1 / -1' : 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input
              type="checkbox"
              checked={formData[field.name] || false}
              onChange={(e) => handleInputChange(field.name, e.target.checked)}
              style={{ width: 'auto', cursor: 'pointer' }}
            />
            <label style={{ ...labelStyle, marginBottom: 0, cursor: 'pointer' }}>
              {field.label}
            </label>
          </div>
        );

      case 'number':
        return (
          <div key={field.name} style={{ gridColumn: field.gridColumn === 'full' ? '1 / -1' : 'auto' }}>
            <label style={labelStyle}>
              {field.label} {field.required && '*'}
            </label>
            <input
              type="number"
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, parseInt(e.target.value) || 0)}
              placeholder={field.placeholder}
              min="1"
              style={commonStyles}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        );

      default: // text
        return (
          <div key={field.name} style={{ gridColumn: field.gridColumn === 'full' ? '1 / -1' : 'auto' }}>
            <label style={{
              ...labelStyle,
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {field.label} {field.required && '*'}
              {field.showHelpModal && (
                <div
                  onMouseEnter={() => toggleHelpModal(field.name)}
                  onMouseLeave={() => toggleHelpModal(field.name)}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: '#6b7280',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    cursor: 'help',
                    fontWeight: 'bold',
                    position: 'relative'
                  }}
                >
                  ?
                  {helpModals[field.name] && field.helpText && (
                    <div style={{
                      position: 'absolute',
                      bottom: '25px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      padding: '16px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                      width: '280px',
                      zIndex: 1000,
                      fontSize: '13px',
                      lineHeight: '1.5',
                      color: '#374151',
                      fontWeight: 'normal',
                      whiteSpace: 'normal',
                      textAlign: 'left'
                    }}>
                      {field.helpText}
                    </div>
                  )}
                </div>
              )}
            </label>
            <input
              type="text"
              required={field.required}
              value={formData[field.name] || ''}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              style={commonStyles}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        );
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: isMobile ? '20px 16px' : '40px 20px'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          color: 'white'
        }}>
          <h1 style={{
            fontSize: isMobile ? '28px' : '36px',
            fontWeight: '700',
            margin: '0 0 12px 0',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}>
            {config.pageIcon} {config.pageTitle}
          </h1>
          <p style={{
            fontSize: isMobile ? '14px' : '16px',
            opacity: 0.95,
            margin: 0
          }}>
            Ürününüz için en iyi teklifi alın
          </p>
        </div>

        {/* Login Warning */}
        {!isLoggedIn && (
          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
            borderRadius: '12px',
            padding: isMobile ? '12px' : '20px',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.1)',
            marginBottom: '24px',
            border: '1px solid #fecaca',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: isMobile ? '13px' : '16px',
              fontWeight: '600',
              color: '#dc2626',
              margin: '0 0 12px 0'
            }}>
              Teklif Alabilmek İçin Giriş Yapmanız Gerekiyor
            </h3>
            <button
              type="button"
              onClick={() => router.push(`/login?returnUrl=${encodeURIComponent(config.returnUrl)}`)}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: isMobile ? '8px 12px' : '12px 20px',
                fontSize: isMobile ? '11px' : '14px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.2s ease'
              }}
            >
              🚀 Giriş Yap ve Teklif Al
            </button>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#991b1b',
              margin: '6px 0 0 0'
            }}>
              Hesabınız yok mu?{' '}
              <span 
                style={{ fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }} 
                onClick={() => router.push('/register')}
              >
                Kayıt olun
              </span>
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: 'white',
          borderRadius: '16px',
          padding: isMobile ? '24px' : '32px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          {config.sections.map((section, idx) => (
            <div key={idx} style={{ marginBottom: idx < config.sections.length - 1 ? '32px' : '0' }}>
              <h2 style={{
                fontSize: isMobile ? '18px' : '20px',
                fontWeight: '600',
                color: '#374151',
                margin: '0 0 20px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                {section.icon} {section.title}
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: '16px'
              }}>
                {section.fields.map(field => renderField(field))}
              </div>
            </div>
          ))}

          {/* Image Upload */}
          <div style={{ marginTop: '32px' }}>
            <h2 style={{
              fontSize: isMobile ? '18px' : '20px',
              fontWeight: '600',
              color: '#374151',
              margin: '0 0 20px 0'
            }}>
              📸 Ürün Görselleri
            </h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUploadWrapper}
              style={{ marginBottom: '16px' }}
            />
            {formData.images && formData.images.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                gap: '12px',
                marginTop: '16px'
              }}>
                {formData.images.map((img: string, idx: number) => (
                  <div key={idx} style={{ position: 'relative' }}>
                    <img 
                      src={img} 
                      alt={`Product ${idx + 1}`} 
                      style={{
                        width: '100%',
                        height: '150px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImageHandler(idx)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || !isLoggedIn}
            style={{
              width: '100%',
              padding: '16px',
              marginTop: '32px',
              background: isSubmitting || !isLoggedIn ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isSubmitting || !isLoggedIn ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {isSubmitting ? '⏳ Gönderiliyor...' : '🚀 Teklif Al'}
          </button>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <SubmissionPopup
          isOpen={showPopup}
          type={popupType}
          title={popupTitle}
          message={popupMessage}
          onClose={() => {
            setShowPopup(false);
            if (popupType === 'success') {
              router.push('/tekliflerim');
            }
          }}
        />
      )}
    </div>
  );
}


