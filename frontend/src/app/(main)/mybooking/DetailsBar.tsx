"use client";
import React from "react";
interface DetailsBarProps {
  bookings: string[][];
  setBookings: React.Dispatch<React.SetStateAction<string[][]>>;
  bookingStatus: string;
  selectedRowIndex: number;
  setSelectedRowIndex: React.Dispatch<React.SetStateAction<number>>;
  isCurrentBooking: boolean;
  user_id?: string;
  request_capacity?: number;
  room_capacity?: number;
  description?: string;
  comment?: string;
}

const DetailsBar = ({
  bookings,
  setBookings,
  bookingStatus,
  selectedRowIndex,
  setSelectedRowIndex,
  isCurrentBooking,
  user_id,
  request_capacity,
  room_capacity,
  description,
  comment,
}: DetailsBarProps) => {
  // Remove request from table after approving/rejecting
  const handleRemoveItem = (indexToRemove: number) => {
    const newData = bookings.filter((_, index) => index !== indexToRemove);
    setBookings(newData);
  };

  const handleSubmit = async () => {
    const confirmed = window.confirm(
      bookingStatus === "Approved"
        ? "Are you sure you want to cancel this approved booking?"
        : "Are you sure you want to cancel this booking request?"
    );
    if (confirmed) {
      //   try {
      //     const response = await fetch(
      //       "https://your-api-endpoint/cancel_booking",
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({
      //           booking_id: bookings[selectedRowIndex][0],
      //         }),
      //       }
      //     );

      //     if (response.ok) {
      //       if (selectedRowIndex >= 0 && bookings) {
      //         handleRemoveItem(selectedRowIndex);
      //         if (selectedRowIndex === bookings.length - 1) {
      //           setSelectedRowIndex(selectedRowIndex - 1);
      //         }
      //       }
      //     }
      //   } catch (error) {
      //     console.error("Error cancel booking/booking request:", error);
      //     throw error;
      //   }
      if (selectedRowIndex >= 0 && bookings) {
        handleRemoveItem(selectedRowIndex);
        if (selectedRowIndex === bookings.length - 1) {
          setSelectedRowIndex(selectedRowIndex - 1);
        }
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-neutral-400 justify-start text-2xl font-bold">
        Request Details
      </div>
      <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
        <div className="text-xl font-bold">From:</div>
        <div className="text-l mt-1">
          {user_id} ({"student"})
        </div>

        <div className="text-xl font-bold mt-5">Booking Specific:</div>
        <ul className="list-decimal pl-5 space-y-3 mt-1 text-l">
          <li>Room Capacity: {room_capacity}</li>
          <li>Request Capacity: {request_capacity}</li>
          <li>Purpose:</li>
          <ul className="list-disc pl-5 mt-1 w-[350px] text-m">
            <li className="leading-tight text-justify">{description} </li>
          </ul>
        </ul>

        <div className="text-xl font-bold mt-5">Comment:</div>
        <ul className="space-y-3 mt-1 text-l leading-tight italic text-justify">
          <li>{comment ? comment : "None"}</li>
        </ul>
        {isCurrentBooking &&
          (bookingStatus === "Approved" || bookingStatus === "Pending") && (
            <div className="flex justify-center mt-5">
              <button
                className="bg-red-500 w-[150px] h-[50px] hover:bg-red-700 text-white-50 rounded-md py-2 px-4 transition duration-200 ease-in-out"
                onClick={() => handleSubmit()}
              >
                Cancel
              </button>
            </div>
          )}
      </div>
    </div>
  );
};
export default DetailsBar;
