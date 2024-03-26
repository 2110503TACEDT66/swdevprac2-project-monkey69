"use client";

import { useSession } from "next-auth/react";

export default function App() {
  const { data: session } = useSession();

  return (
    <div className="mt-[100px]">
      <img
        src="/img/dentalClinic.jpg"
        alt="Dentist"
        style={{
          width: "100%",
          maxWidth: "500px",
          display: "block",
          margin: "auto",
        }}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h2 className="text-xl">Welcome to our Dentist Booking Service</h2>
        <p>
          We make booking appointments with dentists easy and convenient. Say
          goodbye to long waiting times!
        </p>
        {session ? (
          ""
        ) : (
          <button
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Get Started
          </button>
        )}
      </div>
    </div>
  );
}
