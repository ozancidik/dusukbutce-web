import { Submission } from '../types/Submission';
import { validateImageBase64 } from '../utils/submissionHelpers';
import { formatDate } from '../utils/formatDate';

interface SubmissionDetailsProps {
  submission: Submission;
  isMobile: boolean;
}

export default function SubmissionDetails({ submission, isMobile }: SubmissionDetailsProps) {
  const renderCategorySpecificFields = () => {
    switch (submission.category) {
      case 'notebook':
        return (
          <>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                İşlemci:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.processor}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                İşlemci Markası:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.processorBrand || 'Belirtilmemiş'}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Ekran Kartı:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.graphicsCard}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Ekran Kartı Watt:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.graphicsCardWatt || 'Belirtilmemiş'}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                RAM:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.ram}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                RAM Tipi:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.ramType || 'Belirtilmemiş'}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Depolama:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.storage}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Depolama Tipi:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.storageType || 'Belirtilmemiş'}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Ekran Boyutu:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.screenSize || 'Belirtilmemiş'}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Yenileme Hızı:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.refreshRate || 'Belirtilmemiş'}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Pil Durumu:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.batteryHealth || 'Belirtilmemiş'}
              </span>
            </div>
            {submission.description && (
              <div style={{ gridColumn: '1 / -1' }}>
                <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                  Açıklama:
                </strong>
                <span style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  color: '#6b7280',
                  marginLeft: '8px'
                }}>
                  {submission.description}
                </span>
              </div>
            )}
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Garanti:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: submission.hasWarranty ? '#059669' : '#dc2626',
                marginLeft: '8px'
              }}>
                {submission.hasWarranty ? (submission.warrantyDuration || 'Var') : 'Yok'}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Fatura Tarihi:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#374151',
                marginLeft: '8px'
              }}>
                {submission.invoiceDate || 'Belirtilmemiş'}
              </span>
            </div>
          </>
        );

      case 'graphics-card':
        return (
          <>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Bellek:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.memory} {submission.memoryType}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Core Clock:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.coreClock}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Boost Clock:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.boostClock}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Güç Tüketimi:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.powerConsumption}
              </span>
            </div>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                Portlar:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.ports}
              </span>
            </div>
          </>
        );

      default:
        return (
          <>
            <div>
              <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                İşlemci:
              </strong>
              <span style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: '#6b7280',
                marginLeft: '8px'
              }}>
                {submission.processor}
              </span>
            </div>
            {submission.graphicsCard && (
              <div>
                <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                  Ekran Kartı:
                </strong>
                <span style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  color: '#6b7280',
                  marginLeft: '8px'
                }}>
                  {submission.graphicsCard}
                </span>
              </div>
            )}
            {submission.ram && (
              <div>
                <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                  RAM:
                </strong>
                <span style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  color: '#6b7280',
                  marginLeft: '8px'
                }}>
                  {submission.ram}
                </span>
              </div>
            )}
            {submission.storage && (
              <div>
                <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
                  Depolama:
                </strong>
                <span style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  color: '#6b7280',
                  marginLeft: '8px'
                }}>
                  {submission.storage}
                </span>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: '12px',
      padding: isMobile ? '16px' : '20px',
      marginBottom: isMobile ? '16px' : '20px',
      border: '1px solid #e2e8f0',
      animation: 'fadeIn 0.3s ease-in-out'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: isMobile ? '12px' : '16px'
      }}>
        <div style={{
          background: '#3b82f6',
          color: 'white',
          width: isMobile ? '32px' : '40px',
          height: isMobile ? '32px' : '40px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px'
        }}>
          <span style={{ fontSize: isMobile ? '16px' : '20px' }}>💻</span>
        </div>
        <div>
          <h4 style={{
            fontSize: isMobile ? '16px' : '18px',
            fontWeight: '600',
            color: '#1e293b',
            margin: 0
          }}>
            Cihaz Bilgileri
          </h4>
          <p style={{
            fontSize: isMobile ? '12px' : '14px',
            color: '#64748b',
            margin: 0
          }}>
            Ürünün teknik özellikleri ve detayları
          </p>
        </div>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
        gap: isMobile ? '12px' : '16px'
      }}>
        <div>
          <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
            Marka:
          </strong>
          <span style={{ 
            fontSize: isMobile ? '14px' : '16px', 
            color: '#6b7280',
            marginLeft: '8px'
          }}>
            {submission.brand || 'Belirtilmemiş'}
          </span>
        </div>
        <div>
          <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
            Model:
          </strong>
          <span style={{ 
            fontSize: isMobile ? '14px' : '16px', 
            color: '#6b7280',
            marginLeft: '8px'
          }}>
            {submission.model || 'Belirtilmemiş'}
          </span>
        </div>
        
        {renderCategorySpecificFields()}
      </div>

      {/* Kullanıcı Profil Bilgileri */}
      {submission.userId && submission.userId.name && (
        <div style={{
          background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          border: '1px solid #f59e0b',
          borderRadius: '12px',
          padding: isMobile ? '16px' : '20px',
          marginTop: isMobile ? '16px' : '20px',
          boxShadow: '0 4px 12px rgba(245, 158, 11, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: isMobile ? '12px' : '16px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 'bold',
              marginRight: '12px',
              boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
            }}>
              👤
            </div>
            <div>
              <h4 style={{
                fontSize: isMobile ? '16px' : '18px',
                fontWeight: '700',
                color: '#92400e',
                margin: '0 0 4px 0'
              }}>
                Kullanıcı Profil Bilgileri
              </h4>
              <p style={{
                fontSize: isMobile ? '12px' : '14px',
                color: '#92400e',
                margin: 0,
                opacity: 0.8
              }}>
                Talep sahibinin detaylı bilgileri
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
            gap: isMobile ? '12px' : '16px'
          }}>
            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#0369a1',
                fontWeight: '600',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                AD SOYAD
              </div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: '#0c4a6e'
              }}>
                {submission.userId.name}
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#0369a1',
                fontWeight: '600',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                E-POSTA
              </div>
              <div style={{
                fontSize: isMobile ? '13px' : '14px',
                color: '#0c4a6e',
                wordBreak: 'break-all'
              }}>
                {submission.userId.email}
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#0369a1',
                fontWeight: '600',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                TELEFON
              </div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: '600',
                color: '#0c4a6e'
              }}>
                {submission.userId.phone || 'Belirtilmemiş'}
              </div>
            </div>

            <div style={{
              background: 'white',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #bae6fd',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{
                fontSize: isMobile ? '11px' : '12px',
                color: '#0369a1',
                fontWeight: '600',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                KULLANICI ID
              </div>
              <div style={{
                fontSize: isMobile ? '12px' : '13px',
                color: '#64748b',
                fontFamily: 'monospace',
                wordBreak: 'break-all'
              }}>
                {submission.userId._id || 'User ID bulunamadı'}
              </div>
            </div>
          </div>

          {/* İletişim Butonları */}
          <div style={{
            marginTop: '16px',
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            {submission.userId.email && (
              <a
                href={`mailto:${submission.userId.email}`}
                style={{
                  background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: isMobile ? '8px 12px' : '10px 16px',
                  borderRadius: '6px',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)'
                }}
              >
                📧 E-posta Gönder
              </a>
            )}
            
            {submission.userId.phone && (
              <a
                href={`tel:${submission.userId.phone}`}
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  color: 'white',
                  textDecoration: 'none',
                  padding: isMobile ? '8px 12px' : '10px 16px',
                  borderRadius: '6px',
                  fontSize: isMobile ? '12px' : '14px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.3)'
                }}
              >
                📞 Ara
              </a>
            )}
          </div>
        </div>
      )}

      {/* Durum ve Fiziksel Bilgiler */}
      <div style={{
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        borderRadius: '12px',
        padding: isMobile ? '16px' : '20px',
        marginTop: isMobile ? '16px' : '20px',
        border: '1px solid #d1d5db'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: isMobile ? '12px' : '16px'
        }}>
          <div style={{
            background: '#6b7280',
            color: 'white',
            width: isMobile ? '32px' : '40px',
            height: isMobile ? '32px' : '40px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '12px'
          }}>
            <span style={{ fontSize: isMobile ? '16px' : '20px' }}>📦</span>
          </div>
          <div>
            <h4 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: '#374151',
              margin: 0
            }}>
              Durum ve Fiziksel Bilgiler
            </h4>
            <p style={{
              fontSize: isMobile ? '12px' : '14px',
              color: '#6b7280',
              margin: 0
            }}>
              Ürünün fiziksel durumu ve belgeleri
            </p>
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: isMobile ? '12px' : '16px'
        }}>
          <div>
            <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
              Kozmetik Durum:
            </strong>
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: '#6b7280',
              marginLeft: '8px'
            }}>
              {submission.cosmeticCondition}
            </span>
          </div>
          <div>
            <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
              Kutu:
            </strong>
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: submission.hasBox ? '#059669' : '#dc2626',
              marginLeft: '8px'
            }}>
              {submission.hasBox ? 'Var' : 'Yok'}
            </span>
          </div>
          <div>
            <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
              Fatura:
            </strong>
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: submission.hasInvoice ? '#059669' : '#dc2626',
              marginLeft: '8px'
            }}>
              {submission.hasInvoice ? 'Var' : 'Yok'}
            </span>
          </div>
          <div>
            <strong style={{ fontSize: isMobile ? '14px' : '16px', color: '#374151' }}>
              Resim Sayısı:
            </strong>
            <span style={{ 
              fontSize: isMobile ? '14px' : '16px', 
              color: '#6b7280',
              marginLeft: '8px'
            }}>
              {(submission.images || []).length} adet
            </span>
          </div>
        </div>
      </div>

      {/* Resimler */}
      {(submission.images || []).length > 0 && (
        <div style={{ marginTop: isMobile ? '12px' : '16px' }}>
          <strong style={{ 
            fontSize: isMobile ? '14px' : '16px', 
            color: '#374151',
            display: 'block',
            marginBottom: isMobile ? '8px' : '12px'
          }}>
            Ürün Fotoğrafları:
          </strong>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(6, 1fr)' : 'repeat(12, 1fr)',
            gap: isMobile ? '4px' : '6px',
            maxWidth: '100%'
          }}>
            {(submission.images || []).map((image, imgIndex) => {
              if (validateImageBase64(image)) {
                return (
                  <div key={imgIndex} style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#f9fafb',
                    aspectRatio: '1',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      borderRadius: '6px',
                      padding: '1px 3px',
                      fontSize: isMobile ? '8px' : '9px',
                      fontWeight: '600',
                      zIndex: 1
                    }}>
                      {imgIndex + 1}
                    </div>
                    <img
                      src={image}
                      alt={`Ürün resmi ${imgIndex + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        cursor: 'pointer',
                        transition: 'transform 0.2s'
                      }}
                      onClick={() => {
                        // Resmi büyük göster
                        const modal = document.createElement('div');
                        modal.style.cssText = 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px;';
                        
                        const closeModal = () => {
                          if (modal.parentNode) {
                            document.body.removeChild(modal);
                          }
                        };
                        
                        modal.onclick = closeModal;
                        
                        const closeBtn = document.createElement('button');
                        closeBtn.innerHTML = '✕';
                        closeBtn.style.cssText = 'position: absolute; top: -15px; right: -15px; background: rgba(255, 255, 255, 0.95); border: 2px solid #fff; border-radius: 50%; width: 35px; height: 35px; font-size: 16px; font-weight: bold; color: #333; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 1001; transition: all 0.2s; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);';
                        closeBtn.onclick = (e) => {
                          e.stopPropagation();
                          closeModal();
                        };
                        
                        const imgContainer = document.createElement('div');
                        imgContainer.style.cssText = 'position: relative; display: inline-block;';
                        
                        const img = document.createElement('img');
                        img.src = image;
                        img.style.cssText = 'max-width: 90%; max-height: 90%; object-fit: contain; border-radius: 8px; display: block;';
                        img.onclick = (e) => e.stopPropagation();
                        
                        imgContainer.appendChild(img);
                        imgContainer.appendChild(closeBtn);
                        modal.appendChild(imgContainer);
                        document.body.appendChild(modal);
                      }}
                    />
                  </div>
                );
              }
              
              return (
                <div key={imgIndex} style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#f9fafb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  aspectRatio: '1',
                  position: 'relative'
                }}>
                  <span style={{
                    fontSize: isMobile ? '7px' : '8px',
                    color: '#6b7280',
                    textAlign: 'center',
                    padding: '4px'
                  }}>
                    Hata
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Müşteri Yanıtı */}
      {submission.customerResponse && (
        <div style={{
          background: submission.customerResponse.action === 'accepted' 
            ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)'
            : 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          borderRadius: '12px',
          padding: isMobile ? '16px' : '20px',
          marginTop: isMobile ? '16px' : '20px',
          border: submission.customerResponse.action === 'accepted' 
            ? '1px solid #6ee7b7'
            : '1px solid #fca5a5',
          boxShadow: submission.customerResponse.action === 'accepted' 
            ? '0 4px 12px rgba(16, 185, 129, 0.15)'
            : '0 4px 12px rgba(239, 68, 68, 0.15)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              background: submission.customerResponse.action === 'accepted' ? '#059669' : '#dc2626',
              color: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: 'bold',
              marginRight: '12px'
            }}>
              {submission.customerResponse.action === 'accepted' ? '✅' : '❌'}
            </div>
            <h4 style={{
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: '600',
              color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
              margin: 0
            }}>
              Müşteri Yanıtı
            </h4>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            <div>
              <span style={{ 
                fontSize: isMobile ? '12px' : '14px', 
                color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                fontWeight: '500'
              }}>
                Durum:
              </span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                fontWeight: '600',
                color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                marginTop: '4px'
              }}>
                {submission.customerResponse.action === 'accepted' ? 'Teklif Kabul Edildi' : 'Teklif Reddedildi'}
              </div>
            </div>
            <div>
              <span style={{ 
                fontSize: isMobile ? '12px' : '14px', 
                color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                fontWeight: '500'
              }}>
                Tarih:
              </span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                fontWeight: '500',
                color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                marginTop: '4px'
              }}>
                {formatDate(submission.customerResponse.date)}
              </div>
            </div>
          </div>
          {(submission.customerResponse.note || submission.customerResponse.reason) && (
            <div style={{ marginTop: '12px' }}>
              <span style={{ 
                fontSize: isMobile ? '12px' : '14px', 
                color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                fontWeight: '500'
              }}>
                {submission.customerResponse.action === 'accepted' ? 'Not:' : 'Sebep:'}
              </span>
              <div style={{ 
                fontSize: isMobile ? '14px' : '16px', 
                color: submission.customerResponse.action === 'accepted' ? '#065f46' : '#991b1b',
                marginTop: '4px',
                fontStyle: 'italic',
                lineHeight: '1.5'
              }}>
                {submission.customerResponse.note || submission.customerResponse.reason}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
