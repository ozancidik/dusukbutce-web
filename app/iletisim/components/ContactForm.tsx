"use client";
import React from 'react';

interface ContactFormProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  isSubmitting,
  handleChange,
  handleSubmit
}) => {
  return (
    <div>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '600',
        color: '#2563eb',
        margin: '0 0 24px 0'
      }}>
        💬 Mesaj Gönder
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            Ad Soyad *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            placeholder="Adınız ve soyadınız"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            E-posta *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            Konu *
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
          >
            <option value="">Konu seçiniz</option>
            <option value="genel">Genel Bilgi</option>
            <option value="siparis">Sipariş Takibi</option>
            <option value="iade">İade/Değişim</option>
            <option value="oneri">Öneri/Şikayet</option>
            <option value="diger">Diğer</option>
          </select>
        </div>

        <div>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#374151'
          }}>
            Mesaj *
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s',
              resize: 'vertical'
            }}
            placeholder="Mesajınızı buraya yazın..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: isSubmitting ? '#9ca3af' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 24px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {isSubmitting ? '📤 Gönderiliyor...' : '📤 Mesaj Gönder'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;











