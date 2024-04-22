"use client";
import React from "react";
import editIcon from "../../../../public/Login-icon/edit_icon.svg";
import Image from "next/image";
import { useStateContext } from "./MyBookingContext";

const DetailsBar = () => {
  const {
    bookings,
    setBookings,
    bookingStatus,
    bookingDetails,
    selectedRowIndex,
    setSelectedRowIndex,
    isCurrentBooking,
    setTitle,
    setFeedback,
    isLoading,
    setIsLoading,
    setShowForm,
  } = useStateContext();
  const {
    request_capacity,
    room_capacity,
    description,
    comment,
    feedback_title,
    feedback_text,
  } = bookingDetails ?? {};

  // Remove request from table after approving/rejecting
  const handleRemoveItem = (indexToRemove: number) => {
    setBookings((bookings) =>
      bookings.filter((_, index) => index !== indexToRemove)
    );
  };
  const handleSubmit = async () => {
    const confirmed = window.confirm(
      bookingStatus === "Approved"
        ? "Are you sure you want to cancel this approved booking?"
        : "Are you sure you want to cancel this booking request?"
    );
    if (confirmed) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8000/cancel_booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: bookings[selectedRowIndex][0],
            reason: "User canceled",
          }),
        });

        if (response.ok) {
          if (selectedRowIndex >= 0 && bookings) {
            handleRemoveItem(selectedRowIndex);
            if (selectedRowIndex === bookings.length - 1) {
              setSelectedRowIndex(selectedRowIndex - 1);
            }
          }
        }
      } catch (error) {
        console.error("Error cancel booking/booking request:", error);
        throw error;
      }
      if (selectedRowIndex >= 0 && bookings) {
        handleRemoveItem(selectedRowIndex);
        if (selectedRowIndex === bookings.length - 1) {
          setSelectedRowIndex(selectedRowIndex - 1);
        }
      }
    }
    setIsLoading(false);
  };
  const handleEdit = () => {
    setTitle(feedback_title ? feedback_title : "");
    setFeedback(feedback_text ? feedback_text : "");
    setShowForm((prev) => !prev);
  };

  const subHeadingStyle = "text-lg font-bold text-stone-800 mt-3";
  return (
    <div className="flex flex-1 flex-col">
      <div className="justify-start text-2xl font-bold text-stone-900">
        Booking Details
      </div>
      <div className="border-neutral-400 flex-1 flex-col justify-start inline-flex">
        <div className={`${subHeadingStyle}`}>Booking Specific:</div>
        <ul className="pl-1 space-y-2 mt-2 text-base font-medium text-stone-700">
          <li>Room Capacity: {room_capacity}</li>
          <li>Request Capacity: {request_capacity}</li>
          <li>Purpose:</li>
          <ul className="list-disc pl-5 mt-1 w-[350px] text-m">
            <li className="leading-tight text-justify">{description} </li>
          </ul>
        </ul>
        {bookingStatus !== "Pending" && comment && (
          <>
            <div className={`${subHeadingStyle}`}>Comment:</div>
            <ul className="space-y-3 mt-1 text-l leading-tight italic text-justify font-medium text-stone-700">
              <li>{comment ? comment : "None"}</li>
            </ul>
          </>
        )}
        {bookingStatus === "Completed" && feedback_text && (
          <>
            <div
              className={`${subHeadingStyle} flex justify-between pr-20 items-center`}
            >
              Feedback:
              <span onClick={handleEdit}>
                <Image
                  src={editIcon}
                  alt="edit"
                  className="w-4 h-4 cursor-pointer"
                />
              </span>
            </div>
          </>
        )}
        {isCurrentBooking
          ? (bookingStatus === "Approved" || bookingStatus === "Pending") && (
              <div className="flex justify-center mt-5">
                <button
                  className="bg-red-500 w-[150px] h-[50px] hover:bg-red-700 text-white-50 rounded-md py-2 px-4 transition duration-200 ease-in-out"
                  onClick={handleSubmit}
                >
                  Cancel
                </button>
              </div>
            )
          : bookingStatus === "Completed" &&
            !feedback_text && (
              <div className="flex justify-center mt-5">
                <button
                  className="bg-primary-400 w-[150px] h-[50px] hover:bg-primary-600 text-white-50 rounded-md py-2 px-4 transition duration-200 ease-in-out"
                  onClick={() => {
                    setTitle("");
                    setFeedback("");
                    setShowForm(true);
                  }}
                >
                  Add Feedback
                </button>
              </div>
            )}
      </div>
    </div>
  );
};
export default DetailsBar;