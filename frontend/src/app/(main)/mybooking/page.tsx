"use client";
import React, { useState, useEffect } from "react";
import BookingSwitcher from "./BookingSwitcher";
import Sortbar from "./Sortbar";
import BookingComponents from "./BookingComponents";
import getEmailFromSessionStorage from "../../Components/CommonFunction";

const MyBookingPage = () => {
  const [isCurrentBooking, setIsCurrentBooking] = useState<boolean>(true);
  const [currentBookings, setCurrentBookings] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const [pastBookings, setPastBookings] = useState<string[][]>([]);

  const getBookings = async () => {
    try {
      const response = await fetch("http://localhost:8000/get_bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: getEmailFromSessionStorage() }),
      });

      if (response.ok) {
        const data = await response.json();
        const { currentBookings, pastBookings } = data;
        setCurrentBookings(currentBookings);
        setPastBookings(pastBookings);
      }
    } catch (error) {
      console.error("Error fetching booking requests: ", error);
      throw error;
    }
  };

  useEffect(() => {
    // getBookings();
    setCurrentBookings([
      ["1", "Room 1", "2021-09-01", "14:00", "16:00", "Approved"],
      ["2", "Room 2", "2021-09-02", "14:00", "16:00", "Pending"],
      ["3", "Room 3", "2021-09-03", "14:00", "16:00", "Rejected"],
    ]);
    setPastBookings([
      ["4", "Room 4", "2021-08-01", "14:00", "16:00", "Completed"],
      ["5", "Room 5", "2021-08-02", "14:00", "16:00", "Completed"],
      ["6", "Room 6", "2021-08-03", "14:00", "16:00", "Completed"],
    ]);
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex-auto flex items-center">
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <BookingSwitcher
            isCurrentBooking={isCurrentBooking}
            setIsCurrentBooking={setIsCurrentBooking}
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </div>
        <div className="absolute left-10">
          <Sortbar
            bookings={isCurrentBooking ? currentBookings : pastBookings}
            setBookings={
              isCurrentBooking ? setCurrentBookings : setPastBookings
            }
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </div>
        <div className="z-10">
          <BookingSwitcher
            isCurrentBooking={isCurrentBooking}
            setIsCurrentBooking={setIsCurrentBooking}
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </div>
      </div>
      <BookingComponents
        selectedRowIndex={selectedRowIndex}
        setSelectedRowIndex={setSelectedRowIndex}
        isCurrentBooking={isCurrentBooking}
        bookings={isCurrentBooking ? currentBookings : pastBookings}
        setBookings={isCurrentBooking ? setCurrentBookings : setPastBookings}
      />
    </div>
  );
};
export default MyBookingPage;
