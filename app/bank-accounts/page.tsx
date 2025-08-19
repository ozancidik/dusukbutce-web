"use client";
import React from "react";
import Link from "next/link";

interface BankAccount {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
  iban: string;
  branchCode: string;
  accountType: string;
  currency: string;
}

const bankAccounts: BankAccount[] = [
  {
    bankName: "Ziraat Bankası",
    accountHolder: "DÜŞÜK BÜTÇE TEKNOLOJİ A.Ş.",
    accountNumber: "12345678",
    iban: "TR12 0001 0002 3456 7890 1234 56",
    branchCode: "001",
    accountType: "TL Hesabı",
    currency: "TRY"
  },
  {
    bankName: "İş Bankası",
    accountHolder: "DÜŞÜK BÜTÇE TEKNOLOJİ A.Ş.",
    accountNumber: "87654321",
    iban: "TR64 0006 4000 0011 2233 4455 66",
    branchCode: "4000",
    accountType: "TL Hesabı",
    currency: "TRY"
  },
  {
    bankName: "Garanti BBVA",
    accountHolder: "DÜŞÜK BÜTÇE TEKNOLOJİ A.Ş.",
    accountNumber: "11223344",
    iban: "TR33 0006 2000 0000 1122 3344 55",
    branchCode: "2000",
    accountType: "TL Hesabı",
    currency: "TRY"
  }
];

export default function BankAccountsPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '40px 20px',
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          paddingBottom: '20px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1f2937',
            margin: '0 0 16px 0'
          }}>
            Banka Hesaplarımız
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Güvenli ödeme için banka hesap bilgilerimiz
          </p>
        </div>

        {/* Bilgi Kutusu */}
        <div style={{
          padding: '20px',
          background: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #0ea5e9',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#0369a1',
            margin: '0 0 12px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            💡 Önemli Bilgi
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: 0,
            lineHeight: '1.6'
          }}>
            Havale/EFT işlemlerinizde açıklama kısmına <strong>sipariş numaranızı</strong> yazmayı unutmayın. 
            Bu sayede ödemeniz hızlıca eşleştirilir ve siparişiniz işleme alınır.
          </p>
        </div>

        {/* Banka Hesapları */}
        <div style={{ marginBottom: '32px' }}>
          {bankAccounts.map((account, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                marginBottom: '20px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Banka Adı */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                gap: '12px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 'bold'
                }}>
                  🏦
                </div>
                <div>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 4px 0'
                  }}>
                    {account.bankName}
                  </h3>
                  <span style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    background: '#e5e7eb',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: '500'
                  }}>
                    {account.accountType}
                  </span>
                </div>
              </div>

              {/* Hesap Detayları */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px'
              }}>
                <div>
                  <label style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Hesap Sahibi
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#374151',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {account.accountHolder}
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Hesap Numarası
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#374151',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {account.accountNumber}
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Şube Kodu
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#374151',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {account.branchCode}
                  </p>
                </div>

                <div>
                  <label style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    textTransform: 'uppercase',
                    fontWeight: '600',
                    marginBottom: '4px',
                    display: 'block'
                  }}>
                    Para Birimi
                  </label>
                  <p style={{
                    fontSize: '16px',
                    color: '#374151',
                    margin: 0,
                    fontWeight: '500'
                  }}>
                    {account.currency}
                  </p>
                </div>
              </div>

              {/* IBAN */}
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'white',
                borderRadius: '8px',
                border: '1px solid #d1d5db'
              }}>
                <label style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  marginBottom: '8px',
                  display: 'block'
                }}>
                  IBAN
                </label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <code style={{
                    fontSize: '18px',
                    color: '#1f2937',
                    fontWeight: '600',
                    background: '#f3f4f6',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontFamily: 'monospace',
                    letterSpacing: '1px'
                  }}>
                    {account.iban}
                  </code>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(account.iban);
                      alert('IBAN kopyalandı!');
                    }}
                    style={{
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                  >
                    📋 Kopyala
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ödeme Talimatları */}
        <div style={{
          padding: '24px',
          background: '#fef3c7',
          borderRadius: '12px',
          border: '1px solid #f59e0b',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#92400e',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            📋 Ödeme Talimatları
          </h3>
          <ol style={{
            margin: 0,
            paddingLeft: '20px',
            color: '#92400e',
            lineHeight: '1.8'
          }}>
            <li>Havale/EFT yaparken yukarıdaki hesap bilgilerinden birini kullanın</li>
            <li>Açıklama kısmına <strong>sipariş numaranızı</strong> mutlaka yazın</li>
            <li>Ödeme sonrası dekontunuzu saklayın</li>
            <li>Ödeme işlemi 1-2 iş günü içinde onaylanır</li>
            <li>Herhangi bir sorun yaşarsanız müşteri hizmetlerimizle iletişime geçin</li>
          </ol>
        </div>

        {/* İletişim */}
        <div style={{
          textAlign: 'center',
          padding: '24px',
          background: '#f0f9ff',
          borderRadius: '12px',
          border: '1px solid #0ea5e9',
          marginBottom: '32px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#0369a1',
            margin: '0 0 12px 0'
          }}>
            💬 Sorularınız mı var?
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#0c4a6e',
            margin: '0 0 20px 0'
          }}>
            Ödeme işlemleri hakkında detaylı bilgi için bizimle iletişime geçin
          </p>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#0ea5e9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              📞 İletişime Geç
            </button>
          </Link>
        </div>

        {/* Geri Dön Butonu */}
        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '2px solid #e5e7eb'
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}>
              ← Anasayfaya Dön
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
