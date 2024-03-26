"use client";

import { useState } from "react";
import { Button, Select, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DigitalClock, DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useSession } from "next-auth/react";
import Snackbar from "@mui/material/Snackbar";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Booking() {
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<Dayjs | null>(null);
  const { data: session } = useSession();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openFail, setOpenFail] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleFailClose = () => {
    setOpenFail(false);
  };

  const handleBooking = async () => {
    if (!selectedDentist || !selectedDate || !selectedTime) {
      console.log("Please select a dentist, date, and time.");
      return;
    }

    const Dentist = selectedDentist;
    const Time = dayjs(
      selectedDate.format("YYYY-MM-DD") +
        " " +
        selectedTime.format("HH:mm:ss A"),
      "YYYY-MM-DD hh:mm:ss A"
    )
      .utcOffset(420)
      .format("YYYY-MM-DDTHH:mm:ss[Z]");

    try {
      const profileResponse = await fetch("/api/getme", {
        method: "GET",
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        const userId = profileData._id;

        const bookingResponse = await fetch("/api/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: userId,
            dentistId: Dentist,
            bookDate: Time,
          }),
        });

        if (bookingResponse.ok) {
          setOpenSnackbar(true);
        } else {
          setOpenFail(true);
        }
      } else {
        console.error("Failed to fetch user data");
        setOpenFail(true);
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      setOpenFail(true);
    }
  };

  return (
    <main>
      <div
        className="container mx-auto p-4 mt-[65px] w-[700px]"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          borderRadius: "20px",
        }}
      >
        <h1 className="text-center text-2xl mb-4">Booking Form</h1>
        <div className="flex flex-col space-y-4 p-5">
          <h5 className="mb--15px">Select Dentist</h5>
          <Select
            value={selectedDentist}
            onChange={(e) => setSelectedDentist(e.target.value)}
          >
            <MenuItem value="">Select Dentist</MenuItem>
            <MenuItem value="65e2eabf92e255d9defc4d3a">Kankawin</MenuItem>
            <MenuItem value="65e2eb8bad555b2b58ba6819">Veeraphat</MenuItem>
            <MenuItem value="65e30fe9dd63a8b0081e275e">Schwynn</MenuItem>
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Book Date"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
            <DigitalClock
              value={selectedTime}
              onChange={(time) => setSelectedTime(time)}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            onClick={handleBooking}
            className="text-black"
          >
            Book Appointment
          </Button>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="Appointment booked successfully!"
        />
        <Snackbar
          open={openFail}
          autoHideDuration={6000}
          onClose={handleFailClose}
          message="Failed to book appointment!"
        />
      </div>
    </main>
  );
}
