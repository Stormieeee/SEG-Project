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
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBookingId: React.Dispatch<React.SetStateAction<string>>;
}
const BookingComponents = ({
  selectedRowIndex,
  setSelectedRowIndex,
  isCurrentBooking,
  bookings,
  setBookings,
  setShowForm,
  setSelectedBookingId,
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
    <div className="flex h-full" style={{ maxHeight: "70vh" }}>
      <div
        className={`flex flex-col ml-10 mr-5 h-full transition-width duration-500 ${isSelected ? "w-2/3" : "w-full"}`}
      >
        <BookingsTable
          bookings={bookings}
          setBookingStatus={setBookingStatus}
          setBookingDetails={setBookingDetails}
          selectedRowIndex={selectedRowIndex}
          setSelectedRowIndex={setSelectedRowIndex}
          setSelectedBookingId={setSelectedBookingId}
        />
      </div>
      <div
        className={`flex pl-5 h-full overflow-y-auto flex-shrink-0 border-l border-black-100 transform transition-transform duration-500 ${isSelected ? "translate-x-0 mr-5 w-1/3" : "translate-x-full"}`}
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
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};

export default BookingComponents;
