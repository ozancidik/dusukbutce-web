"use client";
import { useEffect, useState } from "react";

export default function IyzicoPage() {
  const [checkoutToken, setCheckoutToken] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/iyzico-checkout-token", { method: "POST" })
      .then(res => res.json())
      .then(data => setCheckoutToken(data.token));
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2>iyzico ile Güvenli Ödeme</h2>
      {checkoutToken ? (
        <iframe
          src={`https://sandbox-merchant.iyzipay.com/payform/v1/${checkoutToken}`}
          width="100%"
          height="600"
          frameBorder="0"
          title="iyzico"
        />
      ) : (
        <div>Yükleniyor...</div>
      )}
    </div>
  );
} 