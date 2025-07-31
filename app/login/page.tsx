"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe("pk_test_..."); // Stripe dashboard'dan test public key

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Backend'den bir PaymentIntent oluşturulmalı (ör. /api/create-payment-intent)
    const res = await fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 10000 }), // örnek: 100 TL
    });
    const { clientSecret } = await res.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!
      }
    });

    if (result.error) {
      setMessage(result.error.message || "Ödeme başarısız.");
    } else if (result.paymentIntent?.status === "succeeded") {
      setMessage("Ödeme başarılı!");
      // Ödeme başarılı olduktan sonra sipariş oluştur
      const orderRes = await fetch("http://localhost:3000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: result.paymentIntent.id }),
      });
      const { orderId } = await orderRes.json();
      setMessage(`Sipariş başarıyla oluşturuldu. Sipariş ID: ${orderId}`);
      router.push("/orders"); // Siparişler sayfasına yönlendir
    }
  };

  const handleOrder = async () => {
    // Sepet boşsa uyarı ver
    if (cart.length === 0) {
      setOrderMessage("Sepetiniz boş.");
      return;
    }
    // Ödeme sayfasına yönlendir
    router.push("/payment-stripe"); // veya "/payment-iyzico"
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto", padding: 24 }}>
      <CardElement options={{ style: { base: { fontSize: "18px" } } }} />
      <button type="submit" disabled={!stripe} style={{ marginTop: 16, padding: 12, width: "100%" }}>
        Ödemeyi Tamamla
      </button>
      {message && <div style={{ marginTop: 16 }}>{message}</div>}
    </form>
  );
}

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
} 