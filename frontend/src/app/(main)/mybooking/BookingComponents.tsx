"use client";
import React, { useState } from "react";
import BookingsTable from "./BookingsTable";
import DetailsBar from "./DetailsBar";
interface BookingComponentsProps {
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  isCurrentBooking: boolean;
  bookings: string[][];
  setBookings: React.Dispatch<React.SetStateAction<string[][]>>;
}
const BookingComponents = ({
  selectedRowIndex,
  setSelectedRowIndex,
  isCurrentBooking,
  bookings,
  setBookings,
}: BookingComponentsProps) => {
  const isSelected = selectedRowIndex >= 0;
  const [bookingStatus, setBookingStatus] = useState<string>(""); // ["Pending", "Approved", "Rejected", "Completed"]
  const [bookingDetails, setBookingDetails] = useState<{
    index: number;
    user_id: string;
    request_capacity: number;
    room_capacity: number;
    description: string;
    comment: string;
  } | null>(null);
  return (
    <div className="flex">
      <div
        className={`flex ml-10 mr-5 overflow-y-auto h-[550px] transition-all transform ease-in duration-500 ${isSelected ? "transform transition-all ease-in duration-500 w-2/3 " : "w-full"}`}
      >
        <BookingsTable
          bookings={bookings}
          setBookingStatus={setBookingStatus}
          setBookingDetails={setBookingDetails}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
        />
      </div>
      <div
        className={`flex overflow-y-hidden flex-shrink-0 rounded-md bg-white-400 p-2 pl-3 mb-5 transform transition-transform duration-500 ${isSelected ? "translate-x-0 mr-5 w-1/3" : "translate-x-full"}`}
      >
        {isSelected && (
          <DetailsBar
            bookings={bookings}
            setBookings={setBookings}
            bookingStatus={bookingStatus}
            selectedRowIndex={selectedRowIndex}
            setSelectedRowIndex={setSelectedRowIndex}
            isCurrentBooking={isCurrentBooking}
            {...bookingDetails}
          />
        )}
      </div>
    </div>
  );
};

export default BookingComponents;
