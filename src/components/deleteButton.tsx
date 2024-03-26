"use client";

import { useState } from "react";

interface deleteButtonProps {
  bookingid: string;
}

const DeleteButton: React.FC<deleteButtonProps> = ({ bookingid }) => {
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async () => {
    try {
      setProcessing(true);
      const linkRes = await fetch("/api/booking/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId: bookingid }),
      });
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <button
      className="px-4 py-2 bg-red-500 text-white rounded-md"
      onClick={handleCheckout}
      disabled={processing}
    >
      {processing ? "Processing..." : "Deleting"}
    </button>
  );
};

export default DeleteButton;
