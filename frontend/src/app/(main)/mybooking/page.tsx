"use client";
import React, { useState, useEffect } from "react";
import BookingSwitcher from "./BookingSwitcher";
import Sortbar from "./Sortbar";
import BookingsTable from "./BookingsTable";
import DetailsBar from "./DetailsBar";
import { getEmailFromSessionStorage } from "@/app/auth/page";

const MyBookingPage = () => {
  const [isCurrentBooking, setIsCurrentBooking] = useState<boolean>(true);
  const [currentBookings, setCurrentBookings] = useState<string[][]>([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);
  const isSelected = selectedRowIndex >= 0;
  const [bookingStatus, setBookingStatus] = useState<string>(""); // ["Pending", "Approved", "Rejected", "Completed"]
  const [pastBookings, setPastBookings] = useState<string[][]>([]);
  const [bookingDetails, setBookingDetails] = useState<{
    index: number;
    user_id: string;
    request_capacity: number;
    room_capacity: number;
    description: string;
    comment: string;
  } | null>(null);

  const getBookings = async () => {
    try {
      const response = await fetch("https://your-api-endpoint/get_bookings", {
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
    getBookings();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <div className="relative flex-1 flex items-center">
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
      </div>
      <div className="flex">
        <div
          className={`flex ml-10 mr-5 overflow-y h-[550px] transition-width duration-500 ${isSelected ? "w-2/3" : "w-full"}`}
        >
          <BookingsTable
            bookings={isCurrentBooking ? currentBookings : pastBookings}
            setBookingStatus={setBookingStatus}
            setBookingDetails={setBookingDetails}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
          />
        </div>
        <div
          className={`flex pl-5 overflow-y-auto flex-shrink-0 h-[550px] border-l border-black-100 transform transition-transform duration-500 ${isSelected ? "translate-x-0 mr-5 w-1/3" : "translate-x-full"}`}
        >
          {isSelected && (
            <DetailsBar
              bookings={isCurrentBooking ? currentBookings : pastBookings}
              setBookings={
                isCurrentBooking ? setCurrentBookings : setPastBookings
              }
              bookingStatus={bookingStatus}
              selectedRowIndex={selectedRowIndex}
              setSelectedRowIndex={setSelectedRowIndex}
              isCurrentBooking={isCurrentBooking}
              {...bookingDetails}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default MyBookingPage;
