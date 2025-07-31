"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe("pk_test_51RnFDC09EU2JaKTrKesvvGAFVYCFHi56SCHRG5h2vUZfyHazecgkmB3OPzb3rEvohckJlALiMYPEJ4ifFSuAkmBz00XBhJTnBL"); // Stripe dashboard'dan test public key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const res = await fetch("http://localhost:3000/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 10000 }), // 100 TL örnek
      });
      const { clientSecret } = await res.json();
      
      const cardNumberElement = elements.getElement(CardNumberElement);
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);
      
      if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
        setMessage("Kart bilgileri eksik.");
        return;
      }
      
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement
        }
      });
      
      if (result.error) {
        setMessage(result.error.message || "Ödeme başarısız.");
        setIsSuccess(false);
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage("Ödeme başarılı! Siparişiniz oluşturuluyor...");
        setIsSuccess(true);
        
        // Ödeme başarılı olduktan sonra sipariş oluştur
        setTimeout(async () => {
          try {
            const orderRes = await fetch("http://localhost:3000/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ paymentIntentId: result.paymentIntent.id }),
            });
            const { orderId } = await orderRes.json();
            setMessage(`Sipariş başarıyla oluşturuldu! Sipariş ID: ${orderId}`);
            
            // 3 saniye sonra siparişler sayfasına yönlendir
            setTimeout(() => {
              router.push("/orders");
            }, 3000);
          } catch (error) {
            setMessage("Ödeme başarılı ancak sipariş oluşturulamadı. Lütfen müşteri hizmetleri ile iletişime geçin.");
          }
        }, 2000);
      }
    } catch (error) {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
        padding: '40px',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Logo ve Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Logo" 
              width={120} 
              height={40} 
              style={{ objectFit: 'contain', cursor: 'pointer', marginBottom: '20px' }} 
            />
          </Link>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1a202c',
            margin: '0 0 8px 0'
          }}>
            Güvenli Ödeme
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '16px',
            margin: '0'
          }}>
            Kredi kartı bilgilerinizi güvenle girin
          </p>
        </div>

        {/* Ödeme Formu */}
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
          <div style={{
            background: '#f7fafc',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            transition: 'all 0.3s ease'
          }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '600',
                color: '#4a5568',
                marginBottom: '8px'
              }}>
                Kart Numarası
              </label>
              <CardNumberElement 
                options={{ 
                  style: { 
                    base: { 
                      fontSize: '16px',
                      color: '#2d3748',
                      '::placeholder': {
                        color: '#a0aec0'
                      }
                    } 
                  }
                }} 
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '8px'
                }}>
                  Son Kullanma Tarihi
                </label>
                <CardExpiryElement 
                  options={{ 
                    style: { 
                      base: { 
                        fontSize: '16px',
                        color: '#2d3748',
                        '::placeholder': {
                          color: '#a0aec0'
                        }
                      } 
                    }
                  }} 
                />
              </div>
              
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#4a5568',
                  marginBottom: '8px'
                }}>
                  CVC
                </label>
                <CardCvcElement 
                  options={{ 
                    style: { 
                      base: { 
                        fontSize: '16px',
                        color: '#2d3748',
                        '::placeholder': {
                          color: '#a0aec0'
                        }
                      } 
                    }
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Ödeme Butonu */}
          <button 
            type="submit" 
            disabled={!stripe || isLoading}
            style={{
              background: isLoading ? '#cbd5e0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 24px',
              width: '100%',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '8px'
                }}></div>
                İşleniyor...
              </div>
            ) : (
              'Ödemeyi Tamamla'
            )}
          </button>
        </form>

        {/* Mesaj Alanı */}
        {message && (
          <div style={{
            padding: '16px',
            borderRadius: '12px',
            marginTop: '20px',
            fontSize: '14px',
            fontWeight: '500',
            background: isSuccess ? '#c6f6d5' : '#fed7d7',
            color: isSuccess ? '#22543d' : '#c53030',
            border: `1px solid ${isSuccess ? '#9ae6b4' : '#feb2b2'}`,
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {/* Güvenlik Bilgileri */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          background: '#f7fafc',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              background: '#48bb78',
              borderRadius: '50%',
              marginRight: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>✓</span>
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>
              SSL Güvenlik Sertifikası
            </span>
          </div>
          <p style={{
            fontSize: '12px',
            color: '#718096',
            margin: '0'
          }}>
            Tüm ödeme bilgileriniz 256-bit SSL şifreleme ile korunmaktadır
          </p>
        </div>

        {/* Geri Dön Butonu */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/cart" style={{
            color: '#667eea',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
          }}>
            ← Sepete Geri Dön
          </Link>
        </div>
      </div>

      {/* CSS Animasyonları */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Stripe CardElement'i alt alta göster */
        :global(.StripeElement) {
          display: block !important;
        }
        
        :global(.StripeElement > div) {
          display: block !important;
        }
        
        :global(.StripeElement input) {
          display: block !important;
          width: 100% !important;
          margin: 8px 0 !important;
        }
      `}</style>
    </div>
  );
}

export default function PaymentStripePage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
} 