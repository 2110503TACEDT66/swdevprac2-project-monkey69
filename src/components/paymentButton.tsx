"use client";

import { useState } from "react";

interface PaymentButtonProps {
  bookingId: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ bookingId }) => {
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      const linkRes = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: bookingId }),
      });
      const res = await linkRes.json();
      const link = res.sessionUrl;
      window.location.href = link;
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
      onClick={handleCheckout}
      disabled={processing}
    >
      {processing ? "Processing..." : "Checkout"}
    </button>
  );
};

export default PaymentButton;
