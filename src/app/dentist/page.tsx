'use client'
import DentistCard from "@/components/DentistCard";
import { useState } from "react";

export default function Booking() {
  const [dentists, setDentists] = useState([
    { dentistName: "Veeraphat", imgSrc: "/img/Veeraphat.jpg" },
    { dentistName: "Schwynn", imgSrc: "/img/Schwynn.jpg" },
    { dentistName: "Kankawin", imgSrc: "/img/Kankawin.jpg" },
    { dentistName: "Kankawin", imgSrc: "/img/Kankawin.jpg" },
    { dentistName: "Schwynn", imgSrc: "/img/Schwynn.jpg" },
    { dentistName: "Kankawin", imgSrc: "/img/Kankawin.jpg" },
    { dentistName: "Kankawin", imgSrc: "/img/Kankawin.jpg" },
    { dentistName: "Schwynn", imgSrc: "/img/Schwynn.jpg" },
    // Add more dentists as needed
  ]);

  const dentistCards = dentists.map((dentist, index) => (
    <DentistCard key={index} dentistName={dentist.dentistName} imgSrc={dentist.imgSrc} />
  ));

  const dentistCardRows = [];
for (let i = 0; i < dentistCards.length; i += 4) {
  dentistCardRows.push(dentistCards.slice(i, i + 4));
}


  return (
    <main className="pt-[50px]">
      <div className="text-5xl text-center py-[25px] font-mono">Dentist List</div>
      <div style={{ margin: "20px", display: "flex", flexDirection: "column" }}>
        {dentistCardRows.map((row, index) => (
          <div key={index} style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
            {row}
          </div>
        ))}
      </div>
    </main>
  );
}
